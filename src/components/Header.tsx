import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/components/Header.css';
import { SolanaProvider, ConnectWebWallet } from './ConnectWebWallet'; // Import the SolanaProvider and ConnectWallet components
import '@solana/wallet-adapter-react-ui/styles.css';
import logo from '../assets/large-logo.png';  

const Header: React.FC = () => {

    const [selectedChain, setSelectedChain] = useState<'solana' | 'stellar' | 'celo'>('solana');
    return (
        <SolanaProvider>
            <header className="text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center menu_items">
                        <img src={logo} alt="PesaLoans" className="h-8 mr-4" />
                        <nav className="flex space-x-4 nav">
                          <Link to="/" className="hover:underline">Home</Link>
                          <Link to="/about" className="hover:underline">About</Link>
                          <Link to="/about" className="hover:underline">P2P</Link>
                          <Link to="/about" className="hover:underline">Support</Link>
                          <Link to="/about" className="hover:underline">FAQs</Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <select
                            value={selectedChain}
                            onChange={(e) => setSelectedChain(e.target.value as 'solana' | 'stellar' | 'celo')}
                            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                          <option value="solana">Solana</option>
                          <option value="stellar">Stellar</option>
                          <option value="celo">Celo</option>
                        </select>
                        <ConnectWebWallet chain={selectedChain} />
                    </div>


                </div>
            </header>
        </SolanaProvider>
    );
};

export default Header;
