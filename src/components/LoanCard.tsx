import React from 'react';

interface LoanCardProps {
  title: string;
  amount: number;
  duration: string;
  asset: string;
  assetIcon: string;
  onPreview: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ title, amount, duration, asset, assetIcon, onPreview }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img src={assetIcon} alt={asset} className="h-8 w-8 mr-2" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-700 mb-2">Amount: {amount} {asset}</p>
      <p className="text-gray-700 mb-4">Duration: {duration}</p>
      <button
        onClick={onPreview}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700 transition-colors duration-300"
      >
        Preview
      </button>
    </div>
  );
};

export default LoanCard;
