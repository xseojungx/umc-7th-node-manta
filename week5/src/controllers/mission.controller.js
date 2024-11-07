import { StatusCodes } from "http-status-codes";
import { bodyToMyMission } from "../dtos/mission.dto.js";
import {
  challengeMission,
  listUserMissions,
} from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await challengeMission(bodyToMyMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

// export const handleListUserMissions = async (req, res, next) => {
//   console.log("Received userId:", req.params.userId); // userId 값 확인용 콘솔 로그

//   const missions = await listUserMissions(parseInt(req.params.userId));
//   res.status(StatusCodes.OK).json(missions);
// };

export const handleListUserMissions = async (req, res, next) => {
  try {
    const missions = await listUserMissions(req.userId); // req.userId에서 userId를 가져옴
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    next(error);
  }
};
