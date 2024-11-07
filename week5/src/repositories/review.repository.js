import { prisma } from "../db.config.js";

// 가게에 리뷰 추가하기
export const addReview = async (data) => {
  const store = await prisma.store.findUnique({
    where: { id: data.storeId },
  });

  if (!store) {
    return null;
  }

  const createdReview = await prisma.review.create({
    data: {
      storeId: data.storeId,
      userId: data.userId,
      title: data.title,
      content: data.content,
      isPhoto: data.isPhoto,
      photoLink: data.photoLink,
      rate: data.rate,
    },
  });

  return createdReview.id;

  // const conn = await pool.getConnection();

  // try {
  //   const [confirm] = await pool.query(
  //     `SELECT EXISTS(SELECT * FROM store WHERE id = ?) as isExistStore;`,
  //     [data.store_id]
  //   );
  //   if (confirm[0].isExistStore) {
  //     return null;
  //   }

  //   const [result] = await pool.query(
  //     `INSERT INTO review (store_id, user_id, title, content, is_photo, photo_link, rate) VALUES (?, ?, ?, ?, ?, ?, ?);`,
  //     [
  //       data.storeId,
  //       data.userId,
  //       data.title,
  //       data.content,
  //       data.isPhoto,
  //       data.photoLink,
  //       data.rate,
  //     ]
  //   );

  //   return result.insertId;
  // } catch (err) {
  //   throw new Error(`오류가 발생했어요. (${err})`);
  // } finally {
  //   conn.release();
  // }
};

// 리뷰 정보 가져오기
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    return null;
  }

  return review;

  // const conn = await pool.getConnection();

  // try {
  //   const [review] = await pool.query(
  //     `SELECT * FROM review WHERE id = ?;`,
  //     reviewId
  //   );

  //   console.log(reviewId);

  //   if (review.length == 0) {
  //     return null;
  //   }

  //   return review;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
};
