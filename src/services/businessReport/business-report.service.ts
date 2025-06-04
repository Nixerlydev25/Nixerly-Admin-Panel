import instance from '../api';

export default class BusinessReportService {
  static async fetchBusinessReports({
    pageParam = 1,
    search,
    limit = 1,
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
      const response = await instance.get(`/admin/report/get-business-reports`, {
        params: {
          page: pageParam,
          limit,
          search,
          status,
          country,
        },
      });
      return response.data.data;
    } catch (error: any) {
      console.error(
        'Error fetching workers:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch workers'
      );
    }
  }

  static async getBusinessById(businessId: string) {
    try {
      const response = await instance.get(
        `/admin/report/get-single-business-report/${businessId}`
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
        `/admin/report/toggle-block-business-by-report/${businessId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error toggling business block status:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to toggle business block status'
      );
    }
  }
}
