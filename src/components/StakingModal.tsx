import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AmountInput from './AmountInput'; // Adjust the import path as needed

interface StakingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  assetName: string;
  assetIcon: string;
  availableAssets: string[];
  interestRate: string;
}

const currencyLogos: { [key: string]: string } = {
  USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
  USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
  CUSD: 'https://cryptologos.cc/logos/celo-cusd-logo.png?v=022',
  SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022',
  ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022',
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022',
  CLIX: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022'
};

const StakingModal: React.FC<StakingModalProps> = ({
  isOpen,
  onRequestClose,
  assetName,
  assetIcon,
  availableAssets,
  interestRate
}) => {
  const [borrowAmount, setBorrowAmount] = useState('');
  const [collateralCurrency, setCollateralCurrency] = useState(availableAssets[0]);
  const [collateralAmount, setCollateralAmount] = useState('');

  const collateralRate = 1.5; // Example collateral rate

  useEffect(() => {
    if (borrowAmount) {
      const collateral = (parseFloat(borrowAmount) * collateralRate).toFixed(2);
      setCollateralAmount(collateral);
    } else {
      setCollateralAmount('');
    }
  }, [borrowAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle staking submission
    alert('Staking successful!');
  };

  const estimatedInterest = (parseFloat(borrowAmount) * parseFloat(interestRate) / 100).toFixed(2);
  const totalPayable = (parseFloat(borrowAmount) + parseFloat(estimatedInterest)).toFixed(2);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Take Loan"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Borrow {assetName}</h2>
        <div className="flex items-center mb-4">
          <img src={assetIcon} alt={assetName} className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold">{assetName}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Amount to Borrow</label>
            <AmountInput
              amount={borrowAmount}
              setAmount={setBorrowAmount}
              currency={assetName}
              setCurrency={() => {}}
              currencies={[assetName]} // Keep the currency fixed for borrowing amount
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Collateral Amount</label>
            <AmountInput
              amount={collateralAmount}
              setAmount={setCollateralAmount}
              currency={collateralCurrency}
              setCurrency={setCollateralCurrency}
              currencies={availableAssets}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
            <div className="mt-1">
              <input
                type="text"
                value={interestRate}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Estimated Interest</label>
            <div className="mt-1">
              <input
                type="text"
                value={`${estimatedInterest} ${assetName}`}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Total Payable Amount</label>
            <div className="mt-1">
              <input
                type="text"
                value={`${totalPayable} ${assetName}`}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            By proceeding, you agree to the
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
              terms and conditions
            </a>.
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onRequestClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default StakingModal;
