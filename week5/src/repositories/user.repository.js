// import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }
  const created = await prisma.user.create({ data: data });
  return created.id;
};

export const updateUserInfo = async (data) => {
  const user = await prisma.user.findFirst({ where: { id: data.userId } });

  if (!user) {
    return null;
  } else {
    const upadateResult = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        nickname: data.nickname,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
      },
    });
    return upadateResult;
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
  // const conn = await pool.getConnection();

  // try {
  //   const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

  //   console.log(user);

  //   if (user.length == 0) {
  //     return null;
  //   }

  //   return user;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.MyPreferences.create({
    data: {
      userId: userId,
      preferencesId: foodCategoryId,
    },
  });
  // const conn = await pool.getConnection();

  // try {
  //   await pool.query(
  //     `INSERT INTO my_preferences (user_id, preferences_id) VALUES (?, ?);`,
  //     [userId, foodCategoryId]
  //   );

  //   return;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
};

// 사용자 선호 카테고리 반환

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.MyPreferences.findMany({
    select: {
      userId: true,
      preferencesId: true,
    },
    where: { userId: userId },
    orderBy: { preferencesId: "asc" },
  });
  return preferences;

  // const conn = await pool.getConnection();

  // try {
  //   const [preferences] = await pool.query(
  //     "SELECT mp.preferences_id, mp.user_id, p.food_type " +
  //       "FROM my_preferences mp " +
  //       "JOIN preferences p ON mp.preferences_id = p.id " +
  //       "WHERE mp.user_id = ? ORDER BY mp.preferences_id;",
  //     [userId]
  //   );

  //   return preferences;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
};
