'use client'
import Navbar from "../components/Navbar";
import { useMetaMask } from "../context/MetaMaskContext";
const  Home = () => {
    const { isConnected,account,balance,identity,
        contract,connectWallet,disconnectWallet,provider} = useMetaMask();
  return (<div>
        <Navbar account={account} connect={connectWallet}/>
  </div> );

};

export default Home;