import React, { useEffect, useState } from 'react';
import { useAppHelper } from '../../../../utils/helpers';

// Define the type for the props
interface AssetImageProps {
  selectedAsset: string; // Adjust the type based on the actual type of the asset
}

const AssetImage: React.FC<AssetImageProps> = ({ selectedAsset }) => { // Updated to use the defined props

  const { getAssetIcon } = useAppHelper<string>();
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      const url = await getAssetIcon(selectedAsset);
      setIconUrl(url);
    };

    if (selectedAsset) {
      fetchIcon();
    }
  }, [selectedAsset, getAssetIcon]);




  return (
    <div className="flex items-center space-x-2">
      {iconUrl && <img src={iconUrl} alt={selectedAsset} className="h-6 w-6 mr-2" />}
      {/* Additional rendering logic here */}
    </div>
  );
};

export default AssetImage;
