import { StatusCodes } from "http-status-codes";
import { bodyToMyMission } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await challengeMission(bodyToMyMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};
