import React, { useEffect, useState } from 'react';
// import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import MasterChefABI from './abis/MasterChefABI.json';
import EthDaiABI from './abis/EthDaiABI.json';

import './App.css';

const App = ({ depositAmount, withdrawAmount, poolId }) => {
  const [account, setAccount] = useState(undefined);
  const [_pendingOven, setPendingOven] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [MasterChef, setMasterChef] = useState(undefined);
  const [EthDaiLPT, setEthDaiLPT] = useState(undefined);

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
          window.ethereum.enable();
          window.alert('Please login & refresh');
        }

        // sets contract(s)
        try {
          setMasterChef(
            new web3.eth.Contract(
              MasterChefABI,
              '0xc6deeacf599d97761cd03ce0aac45964daebc234'
            )
          );
          setEthDaiLPT(
            new web3.eth.Contract(
              EthDaiABI,
              '0x1c5DEe94a34D795f9EEeF830B68B80e44868d316'
            )
          );
        } catch (e) {
          window.alert(
            `Contracts not deployed to the current network: ${netId}`
          );
        }
      }
    };
    init();
  }, []);

  // const allowanceETHDAI = async () => {
  //   const allowance = await EthDaiLPT.methods
  //     .allowance(MasterChef, account)
  //     .call();
  // };

  // [ ] Need to fix
  const pendingOven = async (pId) => {
    try {
      const returnValue = await MasterChef.methods
        .pendingOven(pId, account)
        .call();
      setPendingOven(returnValue);
    } catch (err) {
      window.alert(err);
    }
  };

  const approveETHDAI = async (amount) => {
    await EthDaiLPT.methods
      .approve('0xc6deeacf599d97761cd03ce0aac45964daebc234', amount)
      .send({ from: account });
  };

  const depositETHDAI = async (amount) => {
    await approveETHDAI(amount);
    // window.ethereum.enable();
    await MasterChef.methods.deposit('2', amount).send({ from: account });
  };

  const withdrawETHDAI = async (amount) => {
    await MasterChef.methods.withdraw('2', amount).send({ from: account });
  };

  // [ ] Need to fix button to pop-up metamask
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Header />
        <br />
        {/* <button type='submit' onClick={connect()}>
          Connect Wallet
        </button> */}
        <hr />
        <h3>
          <strong>Welcome to EasyBake,</strong> <em>{account}</em>
        </h3>
        <h4>
          <strong>Your current Ether balance is,</strong>{' '}
          <em>{balance / 10 ** 18}</em>
        </h4>
        <hr />
        <p> Please enter amount to deposit to ETH-DAI pool: </p>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page refresh
            const amount = (depositAmount.value * 10 ** 18).toString();
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
            // prevents page refresh
            e.preventDefault();
            // uses input from `ref` & converts to wei
            const amount = (withdrawAmount.value * 10 ** 18).toString();
            withdrawETHDAI(amount);
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
            e.preventDefault();
            pendingOven(poolId.value);
          }}
        >
          <p>
            Your pending Oven for the provided pool Id is:{' '}
            <em>{_pendingOven / 10 ** 18}</em>
          </p>
          <div className='form-group'>
            <input
              id='poolId'
              type='number'
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
