import { Platform } from "react-native";

const DEFAULT_API_URL =
  Platform.OS === "web"
    ? "http://localhost:5001"
    : "http://10.0.2.2:5001";

export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

export const API_URL = `${BASE_URL}/api`;

export const PREDICT_URL = `${BASE_URL}/predict`;