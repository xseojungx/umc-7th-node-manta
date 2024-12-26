import { StatusCodes } from "http-status-codes";
import {
  bodyToMyMission,
  bodyToMyMissionUsingToken,
} from "../dtos/mission.dto.js";
import {
  challengeMission,
  listUserMissions,
  listStoreMissions,
  missionSuccess,
} from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await challengeMission(bodyToMyMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleMissionSuccess = async (req, res, next) => {
  console.log("미션 성공을 요청했습니다");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await missionSuccess(
    bodyToMyMissionUsingToken(req.userId, req.body)
  );
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleListUserMissions = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 미션 목록 조회 API';
  #swagger.responses[200] = {
    description: "사용자 미션 목록 조회 성공 응답",
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
                mission: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 1 },
                      requestApproval: { type: "boolean", example: true },
                      userId: { type: "number", example: 1 },
                      missionId: { type: "number", example: 1 },
                      verifyNumber: { type: "number", example: 12345 },
                      status: { type: "string", example: "success" },
                      createdAt: { 
                        type: "string", 
                        format: "date-time", 
                        example: "2024-11-10T22:12:40.000Z" 
                      },
                      updatedAt: { 
                        type: "string", 
                        format: "date-time", 
                        example: "2024-11-10T13:20:30.578Z" 
                      },
                      deletedAt: { 
                        type: "string", 
                        nullable: true, 
                        example: null 
                      },
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          minPrice: { type: "number", example: 10000 },
                          reward: { type: "number", example: 12.5 },
                          status: { type: "string", example: "active" },
                          storeId: { type: "number", example: 4 },
                          createdAt: { 
                            type: "string", 
                            format: "date-time", 
                            example: "2024-11-10T22:11:29.000Z" 
                          },
                          updatedAt: { 
                            type: "string", 
                            format: "date-time", 
                            example: "2024-11-10T22:11:29.000Z" 
                          },
                          deletedAt: { 
                            type: "string", 
                            nullable: true, 
                            example: null 
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
    }
  };
*/

  try {
    const missions = await listUserMissions(req.userId); // req.userId에서 userId를 가져옴
    // res.status(StatusCodes.OK).json(missions);
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '특정 상점의 미션 목록 조회 API';
  #swagger.parameters['id'] = {
    in: 'path',
    description: '조회할 상점의 ID',
    required: true,
    schema: { type: 'number', example: 2 }
  };
  #swagger.responses[200] = {
    description: "특정 상점의 미션 목록 조회 성공 응답",
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
                mission: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 2 },
                      minPrice: { type: "number", example: 5000 },
                      reward: { type: "number", example: 8.75 },
                      status: { type: "string", example: "active" },
                      storeId: { type: "number", example: 2 },
                      createdAt: { 
                        type: "string", 
                        format: "date-time", 
                        example: "2024-11-10T22:11:29.000Z" 
                      },
                      updatedAt: { 
                        type: "string", 
                        format: "date-time", 
                        example: "2024-11-10T22:11:29.000Z" 
                      },
                      deletedAt: { 
                        type: "string", 
                        nullable: true, 
                        example: null 
                      },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 2 },
                          storeName: { type: "string", example: "스타벅스" },
                          locationId: { type: "number", example: 1 },
                          ownerId: { type: "number", example: 2 },
                          createdAt: { 
                            type: "string", 
                            format: "date-time", 
                            example: "2024-11-10T22:11:29.000Z" 
                          },
                          updatedAt: { 
                            type: "string", 
                            format: "date-time", 
                            example: "2024-11-10T22:11:29.000Z" 
                          },
                          deletedAt: { 
                            type: "string", 
                            nullable: true, 
                            example: null 
                          },
                          status: { type: "string", example: "active" }
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
  #swagger.responses[404] = {
    description: "요청한 상점의 미션 목록을 찾을 수 없음",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: { 
              type: "object", 
              example: { 
                message: "Store missions not found" 
              } 
            },
            success: { type: "null", example: null }
          }
        }
      }
    }
  };
*/

  try {
    const missions = await listStoreMissions(req.params.storeId);
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    console.log(error);
  }
};
