import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AssetRowProps {
  id: number;
  name: string;
  username?: string;
  avatar?: string;
  balance?: number;
  available?: number;
  apy: string;
  collateral?: boolean;
  actionLabel: string;
  assetIcon: string;
  onActionClick: () => void;
}

const AssetRow: React.FC<AssetRowProps> = ({
  id,
  name,
  username,
  avatar,
  balance,
  available,
  apy,
  collateral,
  actionLabel,
  assetIcon,
  onActionClick,
}) => {
  const navigate = useNavigate();

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-100 transition-colors">
      {username && avatar && (
        <td className="py-4 px-6 flex items-center">
          <img src={avatar} alt={username} className="h-8 w-8 rounded-full mr-2" />
          {username}
        </td>
      )}
      <td className="py-4 px-6 flex items-center">
        <img src={assetIcon} alt={name} className="h-6 w-6 mr-2" />
        {name}
      </td>
      <td className="py-4 px-6">{balance !== undefined ? balance : available}</td>
      <td className="py-4 px-6">{apy}</td>
      {collateral !== undefined && (
        <td className="py-4 px-6">{collateral ? '✔' : '✘'}</td>
      )}
      <td className="py-4 px-6">
        <button
          onClick={onActionClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      </td>
    </tr>
  );
};

export default AssetRow;
