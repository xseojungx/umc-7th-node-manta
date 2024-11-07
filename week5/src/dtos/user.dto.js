export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    nickname: body.nickname,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map((pref) => pref.preferencesId);
  return {
    email: user.email,
    name: user.name,
    preferences: preferFoods,
    // user: {
    //   id: userData.id,
    //   name: userData.name,
    //   nickname: userData.nickname,
    //   email: userData.email,
    //   gender: userData.gender,
    //   birth: userData.birth,
    //   address: userData.address,
    //   detailAddress: userData.detail_address,
    //   preferences: preferences.preferences,
    // },
    // preferences: preferences.map((pref) => pref.food_type),
  };
};
