import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../utils/constants";

export const TransactionContext = React.createContext();

const {ethereum} = window;

    // -----------------------------------------
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

   return transactionContract;
}
    // -----------------------------------------

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");

    // where the form data passes through
    const [formData, setFormData] = useState({addressTo: "", amount: "",keyword: "", message: ""});

  // add loading state to hash contract
    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));


    // it's gonna dynamically update the form data
    const handleChange = (e, name) => {
      setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }


    // -----------------------------------------
    // check if metamask wallet is connected at start
    const checkIfWalletIsConnected = async() => {
      try {
        // if metamask is installed
        if(!ethereum) return alert("Please install metamask");
  
        const accounts = await ethereum.request({method: `eth_accounts`});
  
        // check account length
        if(accounts.length) {
          setCurrentAccount(accounts[0])
  
          // getAllTransactions();
        } else {
          console.log("No accounts found.")
        }
        
      } catch (error) {
        console.log(error)

        throw new Error("No ethereum object.")
      }
        
    }
    // -----------------------------------------



    // -----------------------------------------
    // check if wallet is connected
    const connectWallet = async () => {
      try {
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: `eth_requestAccounts`});
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log(error)

        throw new Error("No ethereum object.")
      }
    }
    // -----------------------------------------


    // -----------------------------------------
   const sendTransaction = async () => {
      // send and store transactions on blockchain

      try {
        if(!ethereum) return alert("Please install metamask");

        // get data from the form
        const {addressTo, amount, keyword, message} = formData;
       
        const transactionContract = getEthereumContract();

        const parsedAmount = ethers.utils.parseEther(amount);

        // send ETH from one account to another
        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', //21000 GWEI
            value: parsedAmount._hex,
          }]
        });

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`)

        await transactionHash.wait();

        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`)

        const transactionCount = await transactionContract.getTransactionCount();

        setTransactionCount(transactionCount.toNumber());



      } catch (error) {
        console.log(error)

        throw new Error("No ethereum object.")
      }
   }
    // -----------------------------------------


    useEffect(() => {
       checkIfWalletIsConnected();
    }, [])


    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}