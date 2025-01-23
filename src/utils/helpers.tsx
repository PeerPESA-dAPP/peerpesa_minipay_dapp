import { useState } from 'react';

// Define ApiResponse and ApiRequestState types generically
type ApiResponse<T> = {
  state: "success" | "error";
  data: T | null; // Make data generic and nullable
};

type ApiRequestState<T> = {
  data: T | null; // Make data generic and nullable
  error: string | null; // Error should be a string or null
  loading: boolean;
};

// Rename appApi to useAppHelper to follow React Hook naming conventions
export const useAppHelper = <T,>() => {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  // Function to get the asset icon based on the asset string
  const getAssetIcon = async (asset: string): Promise<string> => {
    setState({ data: null, error: null, loading: true });
    try {
      const currencyLogos: { [key: string]: string } = {
        USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
        USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
        CUSD: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=022',
        SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022',
        ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022',
        BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022',
        CLIX: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022',
      };

      // Retrieve the icon URL and check if it exists
      const iconUrl = currencyLogos[asset.toUpperCase()];
      if (!iconUrl) {
        throw new Error(`Icon not found for asset: ${asset}`);
      }

      // Update state with the icon URL
      setState({ data: iconUrl as T, error: null, loading: false });
      return iconUrl; // Return the icon URL

    } catch (e) {
      const errorMessage = (e instanceof Error) ? e.message : 'Unknown error occurred';
      setState({ data: null, error: errorMessage, loading: false }); // Update state with the error
      return ''; // Return an empty string on error
    }
  };

  return { state, getAssetIcon };
};
