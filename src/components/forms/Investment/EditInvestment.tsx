// components/AddTodo.tsx
import * as React from 'react';
//saveAInvestment, updateAInvestment 
import { InvestmentContextType, AInvestment } from '../../../@types/App';


const FormBlock: React.FC = () => {

  const [formData, setFormData] = React.useState<AInvestment | {}>();
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  
  const handleSaveContent = (e: React.FormEvent, formData: AInvestment | any) => {
    e.preventDefault();
  };

  return (
    <form className="Form" onSubmit={(e) => handleSaveContent(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} type="text" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Investment</button>
    </form>
  );
};

export default FormBlock;