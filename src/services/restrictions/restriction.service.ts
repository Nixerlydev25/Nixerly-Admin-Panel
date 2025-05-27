import instance from "../api";

export default class RestrictionService {
  static async addRestriction(userId: string, restrictionType: string) {
    return instance.post(`/restrictions`, { userId, restrictionType });
  }

  static async removeRestriction(userId: string, restrictionType: string) {
    return instance.delete(`/restrictions`, {
      data: { userId, restrictionType },
    });
  }
}
