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

interface Values {
                    loan_amount: string;
                    loan_currency: string;
                    request_id: string;
                    user_id: string;
                    interest_rate_per_month: string;
                    min_loan_amount: string;
                    max_loan_amount: string;
                    liquidation_point: string;
                    default_penalty: string;
                    interest_period: string;
                    interest_rate: string; 
                    duration: string;
                    duration_period: string;
                    collateral_amount_percentage: string; 
                    collateral_assets: string;
                 } 

const AddInvestment: React.FC = () => {
  
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
          loan_amount: '',
          loan_currency: '',
          request_id: '',
          user_id: '',
          interest_rate_per_month: '',
          min_loan_amount: '',
          max_loan_amount: '',
          liquidation_point: '', 
          default_penalty: '', 
          interest_period: '', 
          interest_rate: '', 
          duration: '', 
          duration_period: '', 
          collateral_amount_percentage: '', 
          collateral_assets: '',
          rating: ''
        }}

        // validationSchema={validationSchema}
        onSubmit={(values: any, {setSubmitting}) => {
          setTimeout(async () => {

              const collectionNiew       = collateral.map(item => item.value.toLowerCase());
              values.loan_currency       = currency.toLowerCase();
              values.loan_amount         = parseFloat(amount);
              values.loan_asset          = currency.toLowerCase();
              values.duration            = duration;
              values.liquidation_point   = parseFloat(values.liquidation_point);
              values.collateral_assets   = collectionNiew;
              values.user_id             = "30202370340445";
              
              if(parseFloat(values.min_loan_amount) > parseFloat(amount)){
                return toast.error("Min loan amount must be less or equal to loan amount");
              }

              if(parseFloat(values.max_loan_amount) > parseFloat(amount)){
                return toast.error("Max loan amount must be less than loan amount");
              }

              if(parseFloat(values.min_loan_amount) > parseFloat(values?.max_loan_amount)){
                return toast.error("Max loan amount must be greater than min loan amount");
              }

              setProcessing(true);
              const responseData: any = await saveAInvestment?.(values);
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
          <Form className="space-y-4 the-form-details" onSubmit={handleSubmit}>
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Investment Details</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide the details for your investment.</p>
            </div>
            <div>
              <label htmlFor="requestId">Loan Amount</label>
              <AmountInput
                    amount={amount}
                    setAmount={setAmount}
                    currency={currency}
                    setCurrency={setCurrency}
                    currencies={currencies} />


              <ErrorMessage name="loan_amount" component="div" className="error-message" />
              <ErrorMessage name="loan_currency" component="div" className="error-message" />
            </div>


            {/* <div  className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="requestId">Request Id</label>
              <Field type="text" name="request_id" error={Boolean(touched.request_id && errors.request_id)} />
              <ErrorMessage name="request_id" component="div" className="error-message" />
            </div>
            
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="userId">User Id</label>
              <Field type="text" name="user_id" error={Boolean(touched.user_id && errors.user_id)} />
              <ErrorMessage name="user_id" component="div" className="error-message" />
            </div> */}


            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="MinLoanAmount">Min Loan Amount</label>
              <Field type="text" name="min_loan_amount" />
              <ErrorMessage name="min_loan_amount" component="div" className="error-message"/>
            </div>
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="MaxLoanAmount">Max Loan Amount</label>
              <Field type="text" name="max_loan_amount" />
              <ErrorMessage name="max_loan_amount" component="div" className="error-message" />
            </div>


            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="InterestRatePerMonth">Interest Rate Per Month (%)</label>
              <Field type="text" name="interest_rate_per_month" error={Boolean(touched.interest_rate_per_month && errors.interest_rate_per_month)} />
              <ErrorMessage name="interest_rate_per_month" component="div" className="error-message" />
            </div>
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="LiquidationPoint">Liquidation Point</label>
              <Field type="text" name="liquidation_point" />
              <ErrorMessage name="liquidation_point" component="div" className="error-message" />
            </div>
          
            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="InterestRate">Interest Rate</label>
              <Field type="text" name="interest_rate" />
              <ErrorMessage name="interest_rate" component="div" className="error-message" />
            </div>
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="InterestPeriod">Interest Period</label>
              <select
                    id="interest_period"
                    name="interest_period"
                    value={values?.interest_period}
                    onChange={(e) => setFieldValue("interest_period", e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Select interest period</option>
                    {interestPeriods.map((interestPeriod: any) => (
                      <option key={interestPeriod?.value} value={interestPeriod?.label}>
                        {interestPeriod?.label}
                      </option>
                    ))}
              </select>
              <ErrorMessage name="interest_period" component="div" className="error-message" />
            </div>

            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="Duration">Duration </label>
              <select
                    id="duration"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Select duration</option>
                    {durations.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
              <ErrorMessage name="duration" component="div" className="error-message" />
            </div> 

            <div  className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="DurationPeriod">Duration Period </label>
              <select
                    id="duration_period"
                    name="duration_period"
                    value={values?.duration_period}
                    onChange={(e) => setFieldValue("duration_period", e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Select duration period</option>
                    {durationPeriods.map((duration: any) => (
                      <option key={duration?.value} value={duration?.label}>
                        {duration?.label}
                      </option>
                    ))}
              </select>
              <ErrorMessage name="duration_period" component="div" className="error-message" />
            </div>
            
            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="CollateralAmountPercentage">Collateral Amount Percentage</label>
              <Field type="text" name="collateral_amount_percentage" />
              <ErrorMessage name="collateral_amount_percentage" component="div" className="error-message" />
            </div>
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="CollateralAssets">Collateral Assets</label>
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
              <ErrorMessage name="CollateralAssets" component="div" className="error-message" />
            </div>




            <div className="width-50-half padding-right-8 padding-bottom-10">
              <label htmlFor="InterestRatePerMonth">Rating (%)</label>
              <select
                    id="rating"
                    name="rating"
                    value={values?.rating}
                    onChange={(e) => setFieldValue("rating", e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="" disabled>Select rating</option>
                    {durations.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
              </select>
              <ErrorMessage name="interest_rate_per_month" component="div" className="error-message" />
            </div>
            <div className="width-50-half padding-left-8 padding-bottom-10">
              <label htmlFor="DefaultPenalty">Default Penalty</label>
              <Field type="text" name="default_penalty" />
              <ErrorMessage name="default_penalty" component="div" className="error-message" />
            </div>

            



            <div className="mt-6 flex items-center justify-end gap-x-6 clearfix">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button type="button" className={(!processing)? "hidden":"text-sm font-semibold leading-6 text-gray-900 loading-text"}>
                Saving ....
              </button>
              <button
                type="submit"
                className={(processing)? "hidden":"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>
                Create Investment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

};
export default AddInvestment;
