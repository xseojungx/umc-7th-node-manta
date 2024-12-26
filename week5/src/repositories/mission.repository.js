import { prisma } from "../db.config.js";

// 미션 도전 (my_mission 테이블에 데이터 삽입)
export const addMissionChallenge = async (userId, missionId) => {
  const mission = await prisma.myMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
    },
  });

  if (mission) {
    console.log("이미 도전중인 미션입니다");
    return null;
  }

  const createdMission = await prisma.myMission.create({
    data: {
      requestApproval: false,
      userId: userId,
      missionId: missionId,
    },
  });

  return createdMission.id;
};

//미션 성공으로 바꾸기. 로직 어떻게 작동하는지 몰라서 일단 사람 아이디랑 미션 아이디 맞으면 성공으로 바꾸게 함
export const changeUserMissionToSuccess = async (userId, myMissionId) => {
  const mission = await prisma.myMission.findFirst({
    where: {
      userId: userId,
      id: myMissionId,
    },
  });
  console.log(mission);

  if (mission.status === "ongoing") {
    const updateResult = await prisma.myMission.updateMany({
      where: {
        userId: userId,
        id: myMissionId,
      },
      data: {
        status: "success",
      },
    });
    if (updateResult.count > 0) {
      const updatedMission = await prisma.myMission.findUnique({
        where: {
          userId: userId,
          id: myMissionId,
          status: "success",
        },
      });
      return updatedMission;
    }
  } else {
    return null;
  }
};

// 하나 미션 도전 정보 가져오기
export const getUserMissionInfo = async (myMissionId) => {
  const mission = await prisma.myMission.findUnique({
    where: { id: myMissionId },
  });
  return mission;
};

// 특정 사용자 미션 도전 정보 가져오기
export const getUserMissionsByUserId = async (userId) => {
  const missions = await prisma.myMission.findMany({
    where: {
      userId: userId,
    },
    include: {
      mission: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return missions;
};

//특정 가게 미션 리스트 가져오기
// 특정 사용자 미션 도전 정보 가져오기
export const getStoreMissionsByStoreId = async (storeId) => {
  const missions = await prisma.mission.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      store: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return missions;
};
