interface ApiResponse {
  isSuccess: boolean;
  timeGenerated: string;
  errorMessage?: string;
  result?: any;
}

interface ProfileData {
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  cardNumber: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;

export const profileApi = {
  async createProfile(data: ProfileData): Promise<ApiResponse> {
    try {
      // Convert the date string to UTC format
      const dateOfBirth = new Date(data.dateOfBirth);
      const utcDateOfBirth = dateOfBirth.toISOString();

      const headers = {
        'Content-Type': 'application/json',
        'X-Register-Secret': API_SECRET_KEY || '',
      };

      const response = await fetch(`${API_BASE_URL}/PreApplicationUser/Add`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          dob: utcDateOfBirth,
          gender: data.gender,
          cardNumber: data.cardNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      return {
        isSuccess: false,
        timeGenerated: new Date().toISOString(),
        errorMessage: 'Network error. Please check your connection and try again.',
      };
    }
  },
};