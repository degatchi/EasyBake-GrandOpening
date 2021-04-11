import React, { useEffect, useState } from 'react';
import ethers from 'ethers';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import MasterChefABI from './abis/MasterChefABI.json';
import Web3 from 'web3';
import './App.css';

const App = ({ depositAmount, withdrawAmount, poolId }) => {
  const [account, setAccount] = useState(undefined);
  const [_pendingOven, setPendingOven] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [MasterChef, setMasterChef] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        const netId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();

        // load balance
        if (typeof accounts[0] !== 'undefined') {
          const balance = await web3.eth.getBalance(accounts[0]);
          setAccount(accounts[0]);
          setBalance(balance);
          web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        } else {
          window.alert('Please login with Metamask');
        }

        // sets contract(s)
        try {
          setMasterChef(
            new web3.eth.Contract(
              MasterChefABI.abi,
              MasterChefABI.networks[netId].address
            )
          );
        } catch (e) {
          window.alert(
            `Contracts not deployed to the current network: ${netId}`
          );
        }
      } else {
        window.alert('Please install Metamask');
      }
    };
    init();
  }, []);

  // deposit to ETH-DAI pool
  const depositETHDAI = async (amount) => {
    await MasterChef.methods
      .deposit('0x1c5dee94a34d795f9eeef830b68b80e44868d316')
      .send({ value: amount.toString(), from: account });
  };

  // withdraw from ETH-DAI pool
  const withdrawETHDAI = async (amount) => {
    await MasterChef.methods
      .withdraw('0x1c5dee94a34d795f9eeef830b68b80e44868d316', amount)
      .send({ from: account });
  };

  // allows user to check their pending oven from poolId
  const pendingOven = async (poolId) => {
    await MasterChef.methods
      .pendingOven(poolId, account)
      .call({ from: account })
      .then(setPendingOven());
  };

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Header />
        <h3>
          <strong>Welcome to EasyBake,</strong> <em>{account}</em>
        </h3>
        <h4>
          <strong>Your current Ether balance is,</strong> <em>{balance}</em>
        </h4>
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
          <div className='form-group'>
            <input
              id='depositAmount'
              step='0.01' // amount to change per click
              type='number'
              placeholder='amount to deposit...'
              required
              ref={(input) => {
                depositAmount = input;
              }}
            />
          </div>
        </form>
        <br />
        <p> Please enter amount to withdraw from ETH-DAI pool: </p>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page refresh
            let amount = withdrawAmount.value; // uses input from `ref`
            amount = amount * 10 ** 18; // convert to wei
            withdrawETHDAI(amount); // call function with converted amount
          }}
        >
          <div className='form-group'>
            <input
              id='withdrawAmount'
              step='0.01'
              type='number'
              placeholder='amount to withdraw...'
              required
              // stores user input & sends to onSubmit form
              ref={(input) => {
                withdrawAmount = input;
              }}
            />
          </div>
        </form>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page refresh
            pendingOven(poolId);
          }}
        >
          <p>
            Your pending Oven for pool Id {poolId} is: {_pendingOven}
          </p>
          <div className='form-group'>
            <input
              id='poolId'
              type='text'
              placeholder='pool Id to query...'
              required
              ref={(input) => {
                poolId = input;
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
