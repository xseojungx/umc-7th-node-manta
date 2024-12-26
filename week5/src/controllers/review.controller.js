import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { writeReview, listUserReviews } from "../services/review.service.js";

export const handleWriteReview = async (req, res, next) => {
  console.log("리뷰를 작성했습니다");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await writeReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  review: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        userId: { type: "number", example: 1 },
                        reviewId: { type: "number", example: 1 },
                        review: {
                          type: "object",
                          properties: {
                            id: { type: "number", example: 1 },
                            storeId: { type: "number", example: 1 },
                            userId: { type: "number", example: 1 },
                            title: { type: "string", example: "Great food!" },
                            content: { 
                              type: "string", 
                              example: "The food was excellent and service was fast." 
                            },
                            isPhoto: { type: "boolean", example: true },
                            photoLink: { 
                              type: "string", 
                              nullable: true, 
                              example: "link_to_photo1.jpg" 
                            },
                            rate: { type: "string", example: "4.5" },
                            createdAt: { 
                              type: "string", 
                              format: "date-time", 
                              example: "2024-11-10T22:11:29.000Z" 
                            },
                            updatedAt: { 
                              type: "string", 
                              nullable: true, 
                              example: null 
                            },
                            deletedAt: { 
                              type: "string", 
                              nullable: true, 
                              example: null 
                            },
                            status: { type: "string", example: "published" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const reviews = await listUserReviews(req.userId); // req.userId에서 userId를 가져옴
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error);
  }
};
