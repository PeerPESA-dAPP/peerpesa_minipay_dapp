// export default TodoContextType = () => {

//     REACT_APP_WEB3_PROVIDER_URL: 'https://your-web3-provider-url',
//     REACT_APP_API_KEY: 'your-api-key',
//     REACT_APP_API_URL: 'https://api.example.com',
// };
//6442402de332c19a8310238a4e45d959

// import { http, createConfig } from 'wagmi'
import { celo, mainnet, optimism } from "wagmi/chains";
// import {  metaMask, injected, safe, walletConnect } from 'wagmi/connectors'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// const projectId = '6442402de332c19a8310238a4e45d959'

// export const config = createConfig({
//   chains: [mainnet, celo],
//   connectors: [
//     injected(),
//     metaMask(),
//     walletConnect({ projectId }),
//     safe(),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [celo.id]: http(),
//     [optimism.id]: http(),
//   },
// })

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "6442402de332c19a8310238a4e45d959",
  chains: [mainnet, optimism, celo],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
