import instance from '../api';

export default class BusinessService {
  static async fetchBusinesses({
    pageParam = 1,
    search,
    limit = 10,
    status,
    country,
  }: {
    pageParam?: number;
    search?: string;
    limit?: number;
    status?: string;
    country?: string;
  }) {
    try {
      const params: Record<string, any> = {
        page: pageParam,
        limit,
      };

      if (search) params.search = search;
      if (status) params.status = status;
      if (country) params.country = country;

      const response = await instance.get(
        `/admin/business/get-all-businesses`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching businesses:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch businesses'
      );
    }
  }

  static async fetchBusinessById(id: string) {
    try {
      const response = await instance.get(
        `/business/business-profile-details/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching business by id:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch business by id'
      );
    }
  }

  static async toggleBlockBusiness(businessId: string) {
    try {
      const response = await instance.post(
        `/admin/business/toggle-block/${businessId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error toggling business block status:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message ||
          'Failed to toggle business block status'
      );
    }
  }
}
