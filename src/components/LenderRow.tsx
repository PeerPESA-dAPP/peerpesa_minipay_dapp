import React from 'react';

type LenderRowProps = {
  id: number;
  username: string;
  avatar: string;
  rating: number;
  interestRate: string;
  amount: string;
  duration: string;
  asset: string;
  assetIcon: string;
  onActionClick: () => void;
};

const LenderRow: React.FC<LenderRowProps> = ({
  username,
  avatar,
  rating,
  interestRate,
  amount,
  duration,
  asset,
  assetIcon,
  onActionClick,
}) => {
  return (
    <tr>
      <td className="py-2 flex items-center">
        <img src={avatar} alt={username} className="h-8 w-8 rounded-full mr-2" />
        {username}
      </td>
      <td className="py-2">{rating.toFixed(1)}</td>
      <td className="py-2">{interestRate}</td>
      <td className="py-2">{amount}</td>
      <td className="py-2">{duration}</td>
      <td className="py-2 flex items-center">
        <img src={assetIcon} alt={asset} className="h-6 w-6 mr-2" />
        {asset}
      </td>
      <td className="py-2">
        <button
          className="bg-indigo-600 text-white py-1 px-2 rounded hover:bg-indigo-500"
          onClick={onActionClick}>
          Lend
        </button>
      </td>
    </tr>
  );
};

export default LenderRow;
