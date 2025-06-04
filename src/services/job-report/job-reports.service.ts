import instance from '../api';

export default class JobReportsService {
  static async getJobReports({
    page,
    limit,
    search,
    status,
    country,
  }: {
    page: number;
    limit: number;
    search: string;
    status: string;
    country: string;
  }) {
    try {
      const response = await instance.get('/admin/report/get-job-reports', {
        params: { page, limit, search, status, country },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getJobReportById(id: string) {
    try {
      const response = await instance.get(
        `/admin/report/get-single-job-report/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async toggleBlockJob(id: string) {
    try {
      const response = await instance.post(
        `/admin/report/toggle-block-job-by-report/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
