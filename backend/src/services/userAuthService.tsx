import { useAuth } from "@clerk/clerk-react";

export const useAuthService = () => {
  const { getToken, userId } = useAuth();

  const getCurrentToken = async () => {
    try {
      const token = await getToken();
      console.log('Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  const getUserId = () => {
    return userId || null;
  };

  return {
    getToken: getCurrentToken,
    getUserId,
  };
};