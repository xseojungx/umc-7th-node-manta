import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import {
  handleWriteReview,
  handleListUserReviews,
} from "./controllers/review.controller.js";
import {
  handleChallengeMission,
  handleListUserMissions,
  handleListStoreMissions,
  handleMissionSuccess,
} from "./controllers/mission.controller.js";
import {
  handleRegisterStore,
  handleRegisterMission,
} from "./controllers/store.controller.js";
import { setUserIdFromAuthorizationHeader } from "./middleware/setUserIdFromAuthorizationHeader.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();

//우리가 사용한 로그인 방식
passport.use(googleStrategy);
//세션 정보 저장, 세션 정보 가져오는 함수
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

//9주차 google auth
//sid를 프엔에 저장, 이에 연결되는 사용자 데이터는 디비에 저장
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.initialize());
//사용자 요청에 sid 값이 있아면 디비에서 찾아서 req.user
app.use(passport.session());

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/review", handleWriteReview);
app.post("/api/v1/missions/challenge", handleChallengeMission);
app.post("/api/v1/stores/registration", handleRegisterStore);
app.post("/api/v1/stores/add-mission", handleRegisterMission);
app.put(
  "/api/v1/missions/user/mission-success",
  setUserIdFromAuthorizationHeader,
  handleMissionSuccess
);

// app.get("/api/v1/my-mission/:userId/list", handleListUserMissions);
app.get(
  "/api/v1/missions/user/list",
  setUserIdFromAuthorizationHeader,
  handleListUserMissions
);

app.get(
  "/api/v1/user/reviews/list",
  setUserIdFromAuthorizationHeader,
  handleListUserReviews
);

app.get("/api/vi/missions/:storeId/list", handleListStoreMissions);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
