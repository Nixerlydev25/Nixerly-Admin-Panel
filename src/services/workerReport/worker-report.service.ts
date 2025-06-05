import instance from '../api';

export default class WorkerReportService {
  static async fetchWorkers({
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
      const response = await instance.get(`/admin/report/get-worker-reports`, {
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

  static async getWorkerById(workerId: string) {
    try {
      const response = await instance.get(
        `/admin/report/get-single-worker-report/${workerId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching worker by id:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch worker by id'
      );
    }
  }

  static async toggleBlockWorker(workerId: string) {
    try {
      const response = await instance.patch(`/admin/worker/toggle-block/${workerId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        'Error toggling worker block status:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to toggle worker block status'
      );
    }
  }
}
