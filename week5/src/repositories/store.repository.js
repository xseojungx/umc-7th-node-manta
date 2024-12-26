import { prisma } from "../db.config.js";

// 새로운 가게 등록
export const addStore = async (data) => {
  const location = await prisma.location.findUnique({
    where: { id: data.locationId },
  });

  if (!location) {
    return null;
  }

  const createdStore = await prisma.store.create({
    data: {
      storeName: data.storeName,
      locationId: data.locationId,
      ownerId: data.ownerId,
    },
  });

  return createdStore.id; // 새로 등록된 가게의 ID 반환

  // const conn = await pool.getConnection();

  // try {
  //   const [confirm] = await pool.query(
  //     `SELECT EXISTS(SELECT * FROM location WHERE id = ?) as isExistLocation;`,
  //     [data.locationId]
  //   );
  //   if (confirm[0].isExistLocation) {
  //     return null;
  //   }

  //   const [result] = await pool.query(
  //     `INSERT INTO store (store_name, location_id, owner_id)
  //      VALUES (?, ?, ?);`,
  //     [data.storeName, data.locationId, data.ownerId]
  //   );
  //   return result.insertId; // 새로 등록된 가게의 ID 반환
  // } catch (err) {
  //   throw new Error(`가게 등록 중 오류가 발생했어요. (${err.message})`);
  // } finally {
  //   conn.release();
  // }
};

// 가게 정보 가져오기
export const getStore = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: {
      id: true,
      storeName: true,
      locationId: true,
      ownerId: true,
    },
  });

  return store;

  // const conn = await pool.getConnection();

  // try {
  //   // 해당 위치에 있는 가게 정보 조회
  //   const [store] = await pool.query(
  //     `SELECT id, store_name, location_id, owner_id
  //        FROM store
  //        WHERE id = ?;`,
  //     [storeId]
  //   );

  //   return store;
  // } catch (err) {
  //   throw new Error(
  //     `해당 가게 정보를 가져오는 중 오류가 발생했어요. (${err.message})`
  //   );
  // } finally {
  //   conn.release();
  // }
};

// 특정 지역의 가게 정보 가져오기
export const getStoresByLocation = async (locationId) => {
  const stores = await prisma.store.findMany({
    where: {
      locationId: locationId,
      deletedAt: null,
      status: "active",
    },
    orderBy: { createdAt: "desc" },
  });

  return stores;

  // const conn = await pool.getConnection();

  // try {
  //   // 해당 위치에 있는 가게 정보 조회
  //   const [stores] = await pool.query(
  //     `SELECT *
  //      FROM store
  //      WHERE location_id = ? AND deleted_at IS NULL AND status = 'active'
  //      ORDER BY created_at DESC;`,
  //     [locationId]
  //   );

  //   return stores;
  // } catch (err) {
  //   throw new Error(
  //     `해당 위치의 가게 정보를 가져오는 중 오류가 발생했어요. (${err.message})`
  //   );
  // } finally {
  //   conn.release();
  // }
};

// 미션 추가하기
export const addMission = async (data) => {
  const createdMission = await prisma.mission.create({
    data: {
      minPrice: data.minPrice,
      reward: data.reward,
      storeId: data.storeId,
    },
  });

  return createdMission.id;

  // const conn = await pool.getConnection();

  // try {
  //   const [result] = await pool.query(
  //     `INSERT INTO mission (min_price, reward, store_id)
  //        VALUES (?, ?, ?);`,
  //     [data.minPrice, data.reward, data.storeId]
  //   );

  //   return result.insertId;
  // } catch (err) {
  //   throw new Error(`미션 도전 중 오류가 발생했어요. (${err.message})`);
  // } finally {
  //   conn.release();
  // }
};

// 하나 미션 정보 가져오기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
  });

  return mission;

  // const conn = await pool.getConnection();

  // try {
  //   const [mission] = await pool.query(
  //     `SELECT *
  //        FROM mission
  //        WHERE id = ?;`,
  //     [missionId]
  //   );

  //   return mission;
  // } catch (err) {
  //   throw new Error(
  //     `사용자의 미션 정보를 가져오는 중 오류가 발생했어요. (${err.message})`
  //   );
  // } finally {
  //   conn.release();
  // }
};
