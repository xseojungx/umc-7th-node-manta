import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const writeReview = async (data) => {
  const newReviewId = await addReview({
    storeId: data.storeId,
    userId: data.userId,
    title: data.title,
    content: data.content,
    isPhoto: data.isPhoto,
    photoLink: data.photoLink,
    rate: data.rate,
  });

  const review = await getReview(newReviewId);

  return responseFromReview({ review });
};

export const listUserReviews = (data) => {};
