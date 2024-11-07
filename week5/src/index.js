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
} from "./controllers/mission.controller.js";
import {
  handleRegisterStore,
  handleRegisterMission,
} from "./controllers/store.controller.js";
import { setUserIdFromAuthorizationHeader } from "./middleware/setUserIdFromAuthorizationHeader.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/review", handleWriteReview);
app.post("/api/v1/missions/challenge", handleChallengeMission);
app.post("/api/v1/stores/registration", handleRegisterStore);
app.post("/api/v1/stores/add-mission", handleRegisterMission);

// app.get("/api/v1/my-mission/:userId/list", handleListUserMissions);
app.get(
  "/api/v1/my-mission/list",
  setUserIdFromAuthorizationHeader,
  handleListUserMissions
);

app.get(
  "/api/v1//user/reviews/list",
  setUserIdFromAuthorizationHeader,
  handleListUserReviews
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
