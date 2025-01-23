// components/AddTodo.tsx
import React, { useContext, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers, ErrorMessage  } from 'formik';
import * as Yup from "yup";
import { InvestmentContextType, AInvestment, CollateralOption } from '../../../@types/App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AmountInput from '../../../components/AmountInput';
import {useInvestment} from '../../../hooks/useInvestment';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { ethers } from 'ethers';



// Define the type for the props
interface LoanRequestData {
    data: AInvestment;
}
  
const InvestmentDetails: React.FC<LoanRequestData> = ({ data }) => { 
  

  const {saveAInvestment, updateAInvestment} = useInvestment();
  const [formData, setFormData] = useState<Partial<AInvestment>>({});
  const [tokenType, setTokenType] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [processing, setProcessing] = useState(false);
  const [duration, setDuration] = useState('');


  const [interestRate, setInterestRate] = useState('');
  const [collateral, setCollateral] = useState<CollateralOption[]>([]);
  const [interestPeriods, setInterestPeriod] = useState<CollateralOption[]>([]);
  const [durationPeriods, setDurationPeriod] = useState<CollateralOption[]>([]);
  const [penaltyRate, setPenaltyRate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
     
    
     const intRun = () => {
       
       const investmentPeriodCollection: any  = [{ value: 'monthly', label: 'Monthly'}, { value: 'weekly', label: 'Weekly'}]; 
       setInterestPeriod(investmentPeriodCollection) 
       
       const durteationPeriodCollection: any  = [{ value: 'days', label: 'Days'}, { value: 'weeks', label: 'Weeks'}]; 
       setDurationPeriod(durteationPeriodCollection) 
     }
     intRun();
  }, [amount])

  const currencies = ['USDT', 'USDC', 'CUSD','CLIX'];
  const collaterals = [
    { value: 'SOL', label: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022'},
    { value: 'ETH', label: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022'},
    { value: 'BTC', label: 'Bitcoin', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    { value: 'CLIX', label: 'Chainlink', icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022'},
    { value: 'CUSD', label: 'Celo Dollars', icon: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=022'},
    { value: 'USDT', label: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022'},
    { value: 'USDC', label: 'USDC', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022'}
  ];
  const durations = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   alert(JSON.stringify(formData))
  //   // if (formData) saveAInvestment(formData as AInvestment);
  //};

  const formatOptionLabel = ({ value, label, icon }: CollateralOption) => (
    <div className="flex items-center">
      <img src={icon} alt={label} className="h-6 w-6 mr-2" />
      {label}
    </div>
  );

  const handleCollateralChange = (
    newValue: MultiValue<CollateralOption>,
    actionMeta: ActionMeta<CollateralOption>
  ) => {
    setCollateral(newValue as CollateralOption[]);
  };

  return (
    <div>
      <div className="border-b border-gray-300 pb-4">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Investment Details</h3>
        <p className="mt-1 text-sm leading-6 text-gray-600">Details about placed investment.</p>
      </div>
    </div>
  );

};
export default InvestmentDetails;
