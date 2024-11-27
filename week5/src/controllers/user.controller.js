import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserInfo } from "../dtos/user.dto.js";
import { userSignUp, userSignUpInfo } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 회원가입 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string", example: "testewr@example.com" },
            name: { type: "string", example: "엘빈" },
            nickname: { type: "string", example: "엘빈이" },
            gender: { type: "string", enum: ["male", "female"], example: "male" },
            birth: { type: "string", format: "date", example: "2000-02-03" },
            address: { type: "string", example: "주소1" },
            detailAddress: { type: "string", example: "세부주소1" },
            preferences: { 
              type: "array", 
              items: { type: "number" }, 
              example: [1, 2, 5] 
            }
          },
          required: ["email", "name", "nickname", "gender", "birth", "address", "preferences"]
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "회원가입 성공 응답",
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
                email: { type: "string", example: "testewr@example.com" },
                name: { type: "string", example: "엘빈" },
                preferences: { 
                  type: "array", 
                  items: { type: "number" }, 
                  example: [1, 2, 5] 
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터로 인해 실패한 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: { 
              type: "object", 
              example: { 
                message: "Invalid email format or missing required fields" 
              } 
            },
            success: { type: "null", example: null }
          }
        }
      }
    }
  };
*/

  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleUserInfo = async (req, res, next) => {
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const userInfo = await userSignUpInfo(bodyToUserInfo(req.userId, req.body));
  res.status(StatusCodes.OK).success(userInfo);
};
