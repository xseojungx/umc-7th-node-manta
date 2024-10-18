import {
  addMissionChallenge,
  getUserMissionInfo,
} from "../repositories/mission.repository.js";
import { responseFromMyMission } from "../dtos/mission.dto.js";

export const challengeMission = async (data) => {
  // 미션 도전 추가
  const myMissionId = await addMissionChallenge(data.userId, data.missionId);

  if (!myMissionId === null) {
    throw new Error("이미 도전 중인 미션이거나 오류가 발생했습니다.");
  }

  const mission = await getUserMissionInfo(myMissionId);

  // 도전 정보 반환 (사용자 정보와 함께)
  return responseFromMyMission({ mission });
};
