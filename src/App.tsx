import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { publicRoutes } from "./routes";
import { AppProvider } from "@/contexts/appContext";
import { useAppContext } from "@/contexts/appContext";
import { WagmiProvider } from "wagmi";
import { config } from "../src/config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  //getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppProvider>
            <Main />
          </AppProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const Main = () => {
  const { isDark } = useAppContext();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <RouterProvider router={publicRoutes} />
    </ConfigProvider>
  );
};

export default App;
