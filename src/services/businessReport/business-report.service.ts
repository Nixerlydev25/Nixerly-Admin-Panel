import instance from '../api';

export default class BusinessReportService {
  static async fetchBusinessReports({
    pageParam = 1,
    search,
    limit = 10,
    startDate,
    endDate,
  }: {
    pageParam?: number;
    search?: string;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const params: Record<string, any> = {
        page: pageParam,
        limit,
      };

      if (search) params.search = search;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await instance.get(`/admin/report/get-business-reports`, {
        params,
      });
      return response.data.data;
    } catch (error: any) {
      console.error(
        'Error fetching business reports:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch business reports'
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
      const response = await instance.patch(
        `/admin/business/toggle-block/${businessId}`
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
