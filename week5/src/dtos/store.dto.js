export const bodyToStore = (body) => {
  return {
    storeName: body.storeName,
    locationId: body.locationId,
    ownerId: body.ownerId,
  };
};

export const responseFromStore = ({ store }) => {
  return {
    store: store.map((data) => data),
  };
};

export const bodyToRegMission = (body) => {
  return {
    minPrice: body.minPrice,
    reward: body.reward,
    storeId: body.storeId,
  };
};

export const responseFromMission = ({ mission }) => {
  return {
    mission: mission.map((data) => data),
  };
};
