import axiosInstance from "../utils/axiosInstance";

class AdmissionFormService {
  static async fetchAdmissionForms(page = 1, query = "") {
    try {
      const response = await axiosInstance.get(
        "/api/admin/admission-forms-preview",
        {
          params: { page, limit: 20, search: query },
        }
      );
      return {
        data: response.data.data,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      };
    } catch (error) {
      console.error("Error fetching admission forms:", error);
      throw new Error("Failed to load admission forms.");
    }
  }

  static async markFormAsReviewed(formId) {
    try {
      const response = await axiosInstance.put(
        `/api/admin/admission-form-reviewed/${formId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error marking form as reviewed:", error);
      throw new Error("Failed to mark the form as reviewed.");
    }
  }
}
