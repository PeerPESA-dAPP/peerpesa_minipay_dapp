import { useContext } from 'react';
import { InvestmentContextType } from '../@types/App';
import {InvestmentContext} from '../context/investmentsContext';

export const useInvestment = (): InvestmentContextType => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};