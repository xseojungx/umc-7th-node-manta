import { pool } from "../db.config.js";

// 미션 도전 (my_mission 테이블에 데이터 삽입)
export const addMissionChallenge = async (userId, missionId) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT * FROM my_mission WHERE user_id = ? and mission_id = ?) as isExistMyMission;`,
      [userId, missionId]
    );

    if (confirm[0].isExistMyMission) {
      console.log("이미 도전중인 미션입니다");
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO my_mission (request_approval, user_id, mission_id) 
       VALUES (?, ?, ?);`,
      [false, userId, missionId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`미션 도전 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};

// 하나 미션 도전 정보 가져오기
export const getUserMissionInfo = async (myMissionId) => {
  const conn = await pool.getConnection();

  try {
    // 사용자의 미션 도전 정보 조회
    const [mission] = await pool.query(
      `SELECT * 
       FROM my_mission 
       WHERE id = ?;`,
      [myMissionId]
    );

    return mission;
  } catch (err) {
    throw new Error(
      `사용자의 미션 정보를 가져오는 중 오류가 발생했어요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};

// 특정 사용자 미션 도전 정보 가져오기
export const getUserMissionsByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    // 사용자의 미션 도전 정보 조회
    const [missions] = await pool.query(
      `SELECT *
       FROM my_mission mm 
       JOIN mission m ON mm.mission_id = m.id 
       WHERE mm.user_id = ? AND mm.deleted_at IS NULL 
       ORDER BY mm.created_at DESC;`,
      [userId]
    );

    return missions;
  } catch (err) {
    throw new Error(
      `사용자의 미션 정보를 가져오는 중 오류가 발생했어요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};
