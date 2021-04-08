import React, { useEffect, useState } from 'react'
import Footer from './components/footer/Footer.js'
import Header from './components/header/Header.js'
import Web3 from 'web3';
import './App.css';


const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [account, setAccount] = useState(undefined)
  const [balance, setBalance] = useState(undefined)
  const [ovenContract, setOvenContract] = useState(undefined)
  const [sugarBarContract, setSugarBarContract] = useState(undefined)
  const [masterChefContract, setMasterChefContract] = useState(undefined)

  
  useEffect(() => {
    const init = async() => {
      if(typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum)
        const netId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()

        // load balance
        if(typeof accounts[0] !== 'undefined') {
          const balance = await web3.eth.getBalance(accounts[0])
          setAccount(accounts[0])
          setBalance(balance)
          setWeb3(web3)
        } else {
          window.alert('Please login with Metamask')
        }

        // sets contracts
        try {
          setOvenContract(new web3.eth.Contract(OvenToken.abi, OvenToken.networks[netId].address))
          setSugarBarContract(new web3.eth.Contract(SugarBar.abi, SugarBar.networks[netId].address))
          setMasterChefContract(new web3.eth.Contract(MasterChef.abi, MasterChef.networks[netId].address))
        } catch (e) {
          window.alert("Contracts not deployed to the current network")
        }

      } else {
        window.alert('Please install Metamask')
      }
    }
    init()
  }, [])

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <h1>Welcome to EasyBake, {account}</h1>
        <h2>Current ether balance: {balance}</h2>
      </div>
      <Footer />
    </div>
  );
}

export default App;
