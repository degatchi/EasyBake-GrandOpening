import React, { useEffect, useState } from 'react';
import ethers from 'ethers';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import OvenTokenABI from './abis/OvenToken.json';
import SugarBarABI from './abis/SugarBar.json';
import MasterChefABI from './abis/MasterChef.json';
import Web3 from 'web3';
import './App.css';

const App = ({ depositAmount, withdrawAmount }) => {
  const [web3, setWeb3] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  // const [ovenContract, setOvenContract] = useState(undefined);
  // const [sugarBarContract, setSugarBarContract] = useState(undefined);
  const [masterChefContract, setMasterChefContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        // const web3 = new Web3(window.ethereum)
        let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        const netId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();

        // load balance
        if (typeof accounts[0] !== 'undefined') {
          const balance = await web3.eth.getBalance(accounts[0]);
          setAccount(accounts[0]);
          setBalance(balance);
          setWeb3(web3);
        } else {
          window.alert('Please login with Metamask');
        }

        // sets contracts
        try {
          // setOvenContract(
          //   new web3.eth.Contract(
          //     OvenTokenABI,
          //     OvenTokenABI.networks[netId].address.toString()
          //   )
          // );
          // setSugarBarContract(
          //   new web3.eth.Contract(
          //     SugarBarABI,
          //     SugarBarABI.networks[netId].address.toString()
          //   )
          // );
          setMasterChefContract(
            new web3.eth.Contract(
              MasterChefABI,
              SugarBarABI.networks[netId].address.toString()
            )
          );
        } catch (e) {
          window.alert('Contracts not deployed to the current network');
        }
      } else {
        window.alert('Please install Metamask');
      }
    };
    init();
  }, []);

  // deposit to ETH-DAI pool
  const depositETHDAI = async (amount) => {
    await masterChefContract.methods
      .deposit('0x1c5dee94a34d795f9eeef830b68b80e44868d316')
      .send({ value: amount.toString(), from: account });
  };

  // withdraw from ETH-DAI pool
  const withdrawETHDAI = async (amount) => {
    await masterChefContract.methods
      .withdraw('0x1c5dee94a34d795f9eeef830b68b80e44868d316', amount)
      .send({ from: account });
  };

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Header />
        <h1>Welcome to EasyBake, {account}</h1>
        <h2>Current ether balance: {balance}</h2>
        <hr />
        <p> Please enter amount to deposit to ETH-DAI pool: </p>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page refresh
            let amount = depositAmount.value;
            amount = amount * 10 ** 18; // convert to wei
            depositETHDAI(amount);
          }}
        >
          <div className='form-group mr-sm-2'>
            <br />
            <input
              id='depositAmount'
              step='0.01' // amount to change per click
              type='number'
              className='form-control form-control-md'
              placeholder='amount to deposit...'
              required
              ref={(input) => {
                depositAmount = input;
              }}
            />
          </div>
        </form>
        <p> Please enter amount to withdraw from ETH-DAI pool: </p>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page refresh
            let amount = withdrawAmount.value;
            amount = amount * 10 ** 18; // convert to wei
            withdrawETHDAI(amount);
          }}
        >
          <div className='form-group mr-sm-2'>
            <br />
            <input
              id='withdrawAmount'
              step='0.01'
              type='number'
              className='form-control form-control-md'
              placeholder='amount to withdraw...'
              required
              ref={(input) => {
                withdrawAmount = input;
              }}
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default App;
