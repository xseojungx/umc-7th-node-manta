import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as KakaoStrategy } from "passport-kakao";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  //아이디??????
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  //닉네임,
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "female",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
    scope: ["account_email", "profile_nickname"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return kakaoVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const kakaoVerify = async (profile) => {
  console.log(profile._json);
  const email = profile._json?.kakao_account?.email;
  console.log(email);
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  //아이디??????
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  //닉네임,
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.username,
      gender: "female",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
