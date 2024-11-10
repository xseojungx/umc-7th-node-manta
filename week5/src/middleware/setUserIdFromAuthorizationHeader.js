// 임시 미들웨어로 userId 설정
export const setUserIdFromAuthorizationHeader = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const userId = authorizationHeader.split(" ")[1]; // "Bearer <userId>" 형식에서 userId만 추출
    req.userId = parseInt(userId, 10); // userId를 정수로 변환하여 req.userId에 설정
  }

  next();
};
