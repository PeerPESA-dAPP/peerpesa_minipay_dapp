import React, { useState } from 'react';

type AmountInputProps = {
  amount: string;
  setAmount: (amount: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  currencies: string[];
};

const currencyLogos: { [key: string]: string } = {
                                                    USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
                                                    USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
                                                    CUSD: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=022',
                                                    SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022',
                                                    ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022',
                                                    BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022',
                                                    CLIX: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022'
                                                  };

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, currency, setCurrency, currencies }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCurrencySelect = (currency: string) => {
    setCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center border rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      />
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="block w-24 rounded-none rounded-r-md border-0 bg-gray-100 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 appearance-none pr-8 flex items-center justify-between"
          style={{ WebkitAppearance: 'none' }}
        >
          {currencyLogos[currency] && (
            <img
              src={currencyLogos[currency]}
              alt={currency}
              className="h-6 w-6 mr-2"
            />
          )}
          <span>{currency}</span>
          <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.292 7.292a1 1 0 011.416 0L10 10.586l3.292-3.294a1 1 0 011.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z" />
          </svg>
        </button>

        
        {isDropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {currencies.map((curr) => (
              <li
                key={curr}
                className="flex items-center px-4 py-2 text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCurrencySelect(curr)}
              >
                {currencyLogos[curr] && (
                  <img
                    src={currencyLogos[curr]}
                    alt={curr}
                    className="h-6 w-6 mr-2"
                  />
                )}
                <span>{curr}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountInput;
