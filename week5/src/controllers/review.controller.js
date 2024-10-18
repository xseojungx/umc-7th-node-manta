import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { writeReview } from "../services/review.service.js";

export const handleWriteReview = async (req, res, next) => {
  console.log("리뷰를 작성했습니다");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await writeReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};
