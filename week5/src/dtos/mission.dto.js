export const bodyToMyMission = (body) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

export const responseFromMyMission = ({ mission }) => {
  const missionData = mission[0];
  return {
    mission: mission.map((data) => data),
  };
};
