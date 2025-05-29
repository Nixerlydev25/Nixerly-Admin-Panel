import instance from '../api';

export default class JobsService {
  static async fetchJobs({
    pageParam = 1,
    search,
    limit = 10,
    status,
    employmentType,
    jobType,
  }: {
    pageParam?: number;
    search?: string;
    limit?: number;
    status?: string;
    employmentType?: string;
    jobType?: string;
  }) {
    try {
      const response = await instance.get(`/v1/admin/jobs/get-all-jobs`, {
        params: {
          page: pageParam,
          limit,
          search,
          status,
          employmentType,
          jobType,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching jobs:',
        error?.response?.data?.message || error.message
      );
      throw new Error(error?.response?.data?.message || 'Failed to fetch jobs');
    }
  }

  static async getJobById(jobId: string) {
    try {
      const response = await instance.get(`/v1/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching job by id:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch job by id'
      );
    }
  }

  static async getJobApplications(jobId: string) {
    try {
      const response = await instance.get(
        `/v1/jobs/get-applicants-of-job/${jobId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching job applications:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch job applications'
      );
    }
  }

  static async toggleBlockJob(jobId: string) {
    try {
      const response = await instance.post(
        `/v1/admin/jobs/toggle-block/${jobId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error toggling job block status:',
        error?.response?.data?.message || error.message
      );
      throw new Error(
        error?.response?.data?.message || 'Failed to toggle job block status'
      );
    }
  }
}
