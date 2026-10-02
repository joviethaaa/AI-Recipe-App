import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { PreferredTypeProvider } from "@/context/PreferredTypeContext";

export default function RootLayout() {
  return (
    <PreferredTypeProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </PreferredTypeProvider>
  );
}

