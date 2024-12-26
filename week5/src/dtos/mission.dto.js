export const bodyToMyMission = (body) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

export const bodyToMyMissionUsingToken = (userId, body) => {
  return {
    userId: userId,
    myMissionId: body.myMissionId,
  };
};

export const responseFromMyMission = ({ mission }) => {
  return {
    mission: mission.map((data) => data),
  };
};
