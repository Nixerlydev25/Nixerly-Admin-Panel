import instance from '../api';

export default class JobReportsService {
  static async getJobReports({
    page = 1,
    limit = 10,
    search,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const response = await instance.get('/admin/report/get-job-reports', {
        params: {
          page: String(page),
          limit: String(limit),
          search,
          startDate,
          endDate,
        },
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
      const response = await instance.patch(
        `/admin/jobs/toggle-block/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
