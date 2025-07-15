"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import Tweet from '../artifacts/contracts/Tweet.sol/Tweet.json';

const MetaMaskContext = createContext({
  isConnected: false,
  account: null,
  balance: null,
  identity: null,
  contract: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  // createIdentity: () => {},
  // updateIdentity: () => {},
  // deleteIdentity: () => {},
  // refreshIdentity: () => {},
  provider: null,
});

export const MetaMaskProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [logEnabled , setLogEnabled] = useState(true);
  
  const contractAddress = "0xd63265eDCd3803FA8C3213fDA702A89259F32705";

  useEffect(() => {
    const initialize = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(provider);
        // const accounts = await provider.request({ method: 'eth_requestAccounts' });
        // logEnabled && console.log('accounts ',accounts);
        // if (accounts.length > 0) {
        //   await handleConnection(accounts[0], provider);
        // }
        
        provider.on('accountsChanged', handleAccountsChanged);
        provider.on('chainChanged', () => window.location.reload());
      }
    };
    
    logEnabled && console.log('contractAddress',contractAddress);
    initialize();
    
    return () => {
      if (provider) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', () => window.location.reload());
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
        logEnabled && console.log('disconnect');
      disconnectWallet();
    } else {
      handleConnection(accounts[0], provider);
    }
  };

  const handleConnection = async (account, provider) => {
    setAccount(account);
    setIsConnected(true);
    const web3Provider = new ethers.BrowserProvider(provider);
    const balance = await web3Provider.getBalance(account);
    setBalance(ethers.formatEther(balance));
    
    const signer = await web3Provider.getSigner();
    logEnabled && console.log('signer ',signer);
    const identityContract = new ethers.Contract(
      contractAddress,
      Tweet.abi,
      signer
    );
    setContract(identityContract);
   logEnabled && console.log('contract ',identityContract);
    // Check if identity exists
    await refreshIdentity(identityContract, account);
  };

  const connectWallet = async () => {
    try {
      if (!provider) {
        alert('MetaMask is not installed. Please install it to use this feature.');
        return;
      }
      
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      await handleConnection(accounts[0], provider);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setIdentity(null);
    setContract(null);
    setIsConnected(false);
  };

  const refreshIdentity = async (contractInstance, accountAddress) => {
    try {
      const tweets = await contractInstance.GetTweets();
      const tweetCount = await contractInstance.GetTweetLength();
      logEnabled && console.log('Tweet List ',tweets,tweetCount);
    } catch (error) {
      console.error("Error fetching identity:", error);
      setIdentity(null);
    }
  };


  return (
    <MetaMaskContext.Provider
      value={{
        isConnected,
        account,
        balance,
        identity,
        contract,
        connectWallet,
        disconnectWallet,
        provider,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);

// c88-edi-service,
// EDI stands of Electronic Data interchange and it is a protocol to exchange mesaages over api call like JSON and XML. Generating EDI request and processing api response data  is very much challenging, because there is very much irregularity in tha data and no standard library exists so far to manipulate the data. I have worked on EDI service for request generating, response processing, response categorization from scratch.