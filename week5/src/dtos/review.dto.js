export const bodyToReview = (body) => {
  return {
    storeId: body.storeId,
    userId: body.userId,
    nickname: body.title,
    content: body.content,
    isPhoto: body.isPhoto || "0",
    photoLink: body.photoLink || "",
    rate: body.rate,
  };
};

//store참고해서 값 반환되게 수정 필요
export const responseFromReview = ({ review }) => {
  return {
    review: review.map((data) => data),
  };
};
