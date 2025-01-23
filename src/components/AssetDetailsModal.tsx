import React from 'react';
import Modal from 'react-modal';

//Modal.setAppElement('#root'); // Make sure to set this for accessibility

interface AssetDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  assetName: string;
  assetIcon: string;
  network: string;
  balance: number;
  estimatedTime: string;
  fee: string;
}

const AssetDetailsModal: React.FC<AssetDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  assetName,
  assetIcon,
  network,
  balance,
  estimatedTime,
  fee
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Asset Details"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Asset Details</h2>
        <div className="flex items-center mb-4">
          <img src={assetIcon} alt={assetName} className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold">{assetName}</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Network</label>
          <div className="mt-1">
            <input
              type="text"
              value={network}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Balance</label>
          <div className="mt-1">
            <input
              type="text"
              value={`${balance} ${assetName}`}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
          <div className="mt-1">
            <input
              type="text"
              value={estimatedTime}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fee</label>
          <div className="mt-1">
            <input
              type="text"
              value={fee}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssetDetailsModal;
