import { responseFromStore, responseFromMission } from "../dtos/store.dto.js";
import {
  addStore,
  getStore,
  addMission,
  getMission,
} from "../repositories/store.repository.js";

export const registerStore = async (data) => {
  // 새로운 가게 등록
  const storeId = await addStore({
    storeName: data.storeName,
    locationId: data.locationId,
    ownerId: data.ownerId,
  });

  if (!storeId) {
    throw new Error("가게 등록 중 오류가 발생했습니다.");
  }

  // 등록한 가게 정보
  const store = await getStore(storeId);

  // 등록된 가게 정보 반환 (지역 정보와 함께)
  return responseFromStore({ store });
};

//미션 등록
export const registerMission = async (data) => {
  // 새로운 미션 등록
  const missionId = await addMission({
    minPrice: data.minPrice,
    reward: data.reward,
    storeId: data.storeId,
  });

  if (!missionId) {
    throw new Error("가게 등록 중 오류가 발생했습니다.");
  }

  // 등록한 미션 정보
  const mission = await getMission(missionId);

  // 등록된 미션 정보 반환
  return responseFromMission({ mission });
};
