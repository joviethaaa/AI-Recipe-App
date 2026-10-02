import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "LOCAL_USER_ID";

export const getLocalUserId = async () => {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);

    if (!userId) {
      userId = "user-" + Date.now();
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }

    return userId;
  } catch (error) {
    console.error("Error getting local user ID:", error);
    return "unknown";
  }
};
