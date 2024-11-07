export const bodyToMyMission = (body) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

export const responseFromMyMission = ({ mission }) => {
  return {
    mission: mission.map((data) => data),
  };
};
