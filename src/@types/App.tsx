// @types.todo.ts
export interface ITodo {
  id?: number;
  title?: string;
  description?: string;
  status?: boolean;
}

export type TodoContextType = {
  todos: ITodo[];
  saveTodo: (todo: ITodo) => void;
  updateTodo: (id: number) => void;
};

export interface AInvestment {
  request_id?: string;
  loan_asset?: string;
  user_id?:string;
  loan_amount?: number;
  interest_rate?: number;
  interest_period?: string;
  duration?: number;
  duration_period?: string;
  collateral_amount_percentage?: number;
  collateral_assets?: any;
  liquidation_point?: number;
  default_penalty?: number;
  rating?: string;
  min_loan_amount?: number;
  max_loan_amount?: any;

  avatar?: any,
  investment_id?: any,
  username?: any,
  asset_id?: any,
  allowed_collateral_assets?: any,
  loan_currency?: any, 
  interest_rate_per_month?: any
}

export interface ALoanRequest {
  request_id?: string;
  investment_id?: string;
  loan_asset_id?: string;
  loan_amount?: number;
  duration?: number;
  duration_period?: string;
  collateral_asset?: string;
  collateral_amount?: number;
  status?: string;
}

export interface ALoanApprove {
  request_id?: string;
  loan_id?: string;
}

export interface ALoanRepay {
  request_id?: string;
  loan_id?: string;
  amount?: number;
}

export interface AUser {
  username?: string;
  email?: string;
  password?: string;
}

export type LoginContextType = {
  user: AUser;
  login: (account: AUser) => void;
  register: (user: AUser) => void;
};

export type UserContextType = {
  user: AUser;
  getAllUsers: (users: any) => void;
  getAUser: (id: number) => void;
  updateAUser: (id: number) => void;
  deleteAUser: (id: number) => void;
};

export type InvestmentContextType = {
  investment?: AInvestment;
  saveAInvestment?: (investment: AInvestment) => void;
  updateAInvestment?: (investment: AInvestment) => void;
  getAllInvestments?: () => void;
};

export type LoanContextType = {
  loan: ALoanRequest;
  saveALoanRequest: (loan: ALoanRequest) => void;
  updateALoanRequest: (loan: ALoanRequest) => void;
  updateALoanApprove: (loan: ALoanApprove) => void;
  updateALoanRepay: (loan: ALoanRepay) => void;
};


export  type CollateralOption = {
  value: string;
  label: string;
  icon: string;
};


// Define a type for the context data
export interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}



// Define a type for the context data
export interface ConnectWalletProps {
  chain: 'solana' | 'stellar' | 'celo'
}





