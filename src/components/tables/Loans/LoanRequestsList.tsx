// components/AddTodo.tsx
import React, { useContext, useState, useEffect } from 'react';
import { InvestmentContextType, AInvestment, CollateralOption } from '../../../@types/App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StakingModal from '../../../components/StakingModal';
import { FaStar } from 'react-icons/fa';
import AmountInput from '../../AmountInput';
import {useInvestment} from '../../../hooks/useInvestment';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { useAppHelper } from '../../../utils/helpers';
import AssetImage from '../../../components/tables/Investment/items/asset';
import InvestmentDetails from '../../../components/tables/Investment/InvestmentDetails';
import RequestLoan from '../../../components/forms/Loans/RequestLoan';


const ListInvestment: React.FC = () => {
  
  const {getAllInvestments}      = useInvestment();
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [search, setSearch]      = useState('');
  const [filter, setFilter]      = useState('');
  const [loans, setLoans]        = useState<any>([]);
  const [prevData, setFormData]  = useState<any>({});
  const [selectedIntestment, setSelectedIntestment]  = useState("");


  const { getAssetIcon } = useAppHelper<null>();
  const durations = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const formatOptionLabel = ({ value, label, icon }: CollateralOption) => (
    <div className="flex items-center">
      <img src={icon} alt={label} className="h-6 w-6 mr-2" />
      {label}
    </div>
  );

  const handleStakeClick = (asset: any) => {
    if(selectedIntestment === asset?.investment_id){
      setSelectedIntestment("");
    }else{
      setSelectedIntestment(asset?.investment_id);
    }

    //setSelectedAsset(asset);
    //setIsStakingModalOpen(true);
  };

  useEffect(() => {

    const initLoansList = async() => {
      try {

        const response:any = await getAllInvestments?.();
        if(response?.status === 'success' || response?.data?.status === 100 ){
          setLoans(response?.data?.data)
        }
        //await new Promise((r) => setTimeout(r, 400));
      } catch (err) {
         
        console.log("err", err);
        return "";
      }
    }
    initLoansList();
  }, []);


  return (
    <div>

      <section className="my-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Loan Requests</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="">All Networks</option>
              <option value="Solana">Solana</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Bitcoin">Bitcoin</option>
            </select>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600">Lender</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 ">Asset</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600">Loan Amount</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600">APY</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600">Max Duration</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 flex space-x-2">Accepted Collateral</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>

          {loans.length > 0 && loans?.map((asset: AInvestment) => (
            <React.Fragment key={asset?.investment_id}>
             <tr  className="border-t border-gray-200">
              <td className="px-6 py-4 whitespace-no-wrap flex items-center">
                <img src={`${asset?.avatar}`} alt={`lenderDove9`} className="h-10 w-10 rounded-full mr-2" />
                <div>
                  <div className="font-semibold">{`${asset?.username}`}</div>
                  <div className="flex items-center">
                    {[...Array(Math.floor(0))].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 h-4 w-4" />
                    ))}

                    {0 % 1 !== 0 && <FaStar className="text-yellow-500 h-4 w-4" />}
                    <span className="ml-1 text-gray-600">({0})</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">  
                  <AssetImage selectedAsset={asset?.asset_id?.toUpperCase()} />
                  {asset?.asset_id?.toUpperCase()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">  
                  {asset?.min_loan_amount}-{asset?.max_loan_amount} {asset?.asset_id?.toUpperCase()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">  
                  {(asset?.interest_rate !== null)? `${asset?.interest_rate} %`: ``}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">  
                  {asset?.duration} {asset?.duration_period}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">
                {Object.values(asset?.allowed_collateral_assets ?? {}).map((selectedAsset: any) => (
                      <div key={selectedAsset} className="flex items-center space-x-2">
                        
                        <AssetImage selectedAsset={selectedAsset?.toUpperCase()} />
                      </div>
                    ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap flex items-center space-x-2">
                  {/*<button
                    onClick={() => handleStakeClick(asset)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    > Borrow </button> */}
                  <button
                    onClick={() => handleStakeClick(asset)}
                    className="bg-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-400">
                      Details
                  </button>
               </td>
              </tr>

              <tr className={(selectedIntestment === asset?.investment_id)? "border-t border-gray-200  selected-loan-details" : "hidden" }>
                <td colSpan={7} className="clearfix selected-loan-detail-inner">
                 
                  <div className="investment-details-min-show">
                    <InvestmentDetails data={asset} /> 
                  </div>
                  <div className="investment-details-min-show">
                    <RequestLoan data={asset} />  
                  </div>

                </td>
              </tr>
             </React.Fragment>  
            ))}
          </tbody>
        </table>
      </section>

      {selectedAsset && (
        <StakingModal
          isOpen={isStakingModalOpen}
          onRequestClose={() => setIsStakingModalOpen(false)}
          assetName={selectedAsset.name}
          assetIcon={selectedAsset.assetIcon}
          availableAssets={['USDT', 'USDC', 'CUSD', 'SOL', 'ETH', 'BTC', 'CLIX']}
          interestRate={selectedAsset.apy}
        />
      )}
      
    </div>
  );

};
export default ListInvestment;
