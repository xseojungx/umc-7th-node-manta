import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUserInfo,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../errors.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    nickname: data.nickname,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preferences of data.preferences) {
    await setPreference(joinUserId, preferences);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const userSignUpInfo = async (data) => {
  const updateUserInfoResult = await updateUserInfo({
    userId: data.userId,
    nickname: data.nickname,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
  });
  //에러코드 수정하기
  if (updateUserInfoResult === null) {
    throw new DuplicateUserEmailError("실패.", data);
  }

  for (const preferences of data.preferences) {
    await setPreference(data.userId, preferences);
  }

  const user = await getUser(data.userId);
  const preferences = await getUserPreferencesByUserId(data.userId);

  return responseFromUser({ user, preferences });
};
