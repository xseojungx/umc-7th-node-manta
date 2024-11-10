import {
  addMissionChallenge,
  getUserMissionInfo,
  getUserMissionsByUserId,
  getStoreMissionsByStoreId,
  changeUserMissionToSuccess,
} from "../repositories/mission.repository.js";
import { responseFromMyMission } from "../dtos/mission.dto.js";

export const challengeMission = async (data) => {
  // 미션 도전 추가
  const myMissionId = await addMissionChallenge(data.userId, data.myMissionId);

  if (!myMissionId === null) {
    throw new Error("이미 도전 중인 미션이거나 오류가 발생했습니다.");
  }

  const mission = await getUserMissionInfo(myMissionId);

  // 도전 정보 반환 (사용자 정보와 함께)
  return responseFromMyMission({ mission });
};

export const missionSuccess = async (data) => {
  // 미션 완료 요청
  const mission = await changeUserMissionToSuccess(
    data.userId,
    data.myMissionId
  );
  if (!mission) {
    throw new Error("오류가 발생했습니다.");
  }
  console.log(mission);
  // 도전 정보 반환 (사용자 정보와 함께)
  return { mission };
};

//본인 미션 리스트 조회
export const listUserMissions = async (userId) => {
  const mission = await getUserMissionsByUserId(parseInt(userId));
  return responseFromMyMission({ mission });
};

//특정 가게 미션 리스트 조회
export const listStoreMissions = async (storeId) => {
  const mission = await getStoreMissionsByStoreId(parseInt(storeId));
  return responseFromMyMission({ mission });
};
