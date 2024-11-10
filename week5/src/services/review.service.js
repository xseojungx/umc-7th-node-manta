import {
  addReview,
  getReview,
  getUserReviewsByUserId,
} from "../repositories/review.repository.js";
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

  const reviews = await getReview(newReviewId);

  return responseFromReview({ reviews });
};

export const listUserReviews = async (userId) => {
  const reviews = await getUserReviewsByUserId(parseInt(userId));
  return responseFromReview({ reviews });
};
