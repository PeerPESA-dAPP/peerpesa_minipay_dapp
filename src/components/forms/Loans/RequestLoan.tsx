// components/AddTodo.tsx
import React, { useContext, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers, ErrorMessage  } from 'formik';
import * as Yup from "yup";
import { InvestmentContextType, AInvestment, CollateralOption } from '../../../@types/App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AmountInput from '../../../components/AmountInput';
import {useLoan} from '../../../hooks/useLoan';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { ethers } from 'ethers';

// Define the type for the props
interface LoanRequestData {

    data: AInvestment;
}


  
const RequestLoan: React.FC<LoanRequestData> = ({ data }) => { // Updated to use the defined props
  

  // const {saveALoanRequest} = useLoan();
  const [formData, setFormData] = useState<Partial<AInvestment>>({});
  const [selectedData, setData] = useState<Partial<AInvestment>>(data);
  const [processing, setProcessing] = useState(false);
  const [collateral, setCollateral] = useState<CollateralOption[]>([]);

  const collaterals = [
    { value: 'SOL', label: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022'},
    { value: 'ETH', label: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022'},
    { value: 'BTC', label: 'Bitcoin', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'},
    { value: 'CLIX', label: 'Chainlink', icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022'},
    { value: 'CUSD', label: 'Celo Dollars', icon: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=022'},
    { value: 'USDT', label: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022'},
    { value: 'USDC', label: 'USDC', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022'}
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };
  
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

  const validationSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Amount is required'),
      // .min(2, 'Amount must be at least 2 characters long'),
    currency: Yup.string()
      .required('Currency is required')
      // .min(2, 'Currency must be at least 2 characters long')
  });

  return (
    <div>
      <Formik
        initialValues={{
                          request_id: "11202420158220",
                          investment_id: selectedData?.investment_id,
                          loan_amount: '',
                          collateral_asset: '',
                          collateral_amount: ''
                       }}
                       
        onSubmit={(values: any, {setSubmitting}) => {
          setTimeout(async () => {


              const collectionNiew      = collateral.map(item => item.value.toLowerCase());
              values.collateral_asset   = collectionNiew[0];
              values.user_id            = "30202370340445";
              if(collectionNiew.length > 1){
                return toast.error("Select a single collateral as security");
              }

              setProcessing(true);
              const responseData: any = {} //await saveALoanRequest?.(values);
              await new Promise((r)   => setTimeout(r, 1200));

              setProcessing(false)
              const dataCollection: any = responseData?.data
              if(dataCollection?.status == 100){

                toast.success(dataCollection?.message);
                values = {};
              } else {

                toast.error(`${dataCollection?.message}`);
              }
              setSubmitting(false);

          }, 500);
        }}
      >
      {({ errors, resetForm, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form className="space-y-4 the-form-details the-form-details-apply-loan" onSubmit={handleSubmit}>
            <div className="border-gray-300 pb-4">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Apply for a Loan</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide the required amount details to get a loan.</p>
            </div>

            <div className="padding-bottom-10">
              <label htmlFor="loanAmount">Loan Amount</label>
              <Field type="text" name="loan_amount" value={values.loan_amount}/>
              <ErrorMessage name="loan_amount"  component="div" className="error-message" />
            </div>
            <div className="padding-bottom-10">
              <label htmlFor="collateral_asset">Collateral Asset</label>
              <Select
                isMulti
                name="collateral"
                options={collaterals}
                value={collateral}
                onChange={handleCollateralChange}
                formatOptionLabel={formatOptionLabel}
                className="mt-1 block w-full"
                classNamePrefix="select"
              />
              <ErrorMessage name="collateral_asset" component="div" className="error-message" />
            </div>

            <div className="padding-bottom-10">
              <label htmlFor="DefaultPenalty">Collateral Amount</label>
              <Field type="text" name="collateral_amount" />
              <ErrorMessage name="collateral_amount" component="div" className="error-message" />
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 clearfix">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button type="button" className={(!processing)? "hidden":"width-70 text-sm font-semibold leading-6 text-gray-900 loading-text"}>
                 Saving ....
              </button>
              <button type="submit" className={(processing)? "hidden":"width-70 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>
                Submit Request 
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

};
export default RequestLoan;
