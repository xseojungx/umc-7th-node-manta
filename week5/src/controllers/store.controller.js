import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToRegMission } from "../dtos/store.dto.js";
import { registerStore, registerMission } from "../services/store.service.js";

export const handleRegisterStore = async (req, res, next) => {
  console.log("가게 등록을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await registerStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};

export const handleRegisterMission = async (req, res, next) => {
  console.log("미션 등록을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await registerMission(bodyToRegMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};
