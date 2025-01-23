import { useContext } from 'react';
import { LoanContextType } from '../@types/App';
import {LoanContext} from '../context/loansContext';

export const useLoan = (): LoanContextType => {

  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};