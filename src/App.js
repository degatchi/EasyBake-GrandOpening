import React, { useEffect, useState } from 'react';
// import { BigNumber, ethers } from 'ethers';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import getBlockchain from './components/blockchain/getBlockchain.js';
// import Web3Modal from 'web3modal';
import './App.css';

const App = ({ depositAmount, withdrawAmount, poolId }) => {
  const [account, setAccount] = useState(undefined);
  const [_pendingOven, setPendingOven] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [MasterChef, setMasterChef] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      getBlockchain();
    };
    init();
  });

  const depositETHDAI = async (amount) => {
    await MasterChef.methods.deposit('2', amount).send({ from: account });
  };

  const withdrawETHDAI = async (amount) => {
    await MasterChef.methods.withdraw('2', amount).send({ from: account });
  };

  // [ ] Need to fix
  const pendingOven = async (poolId) => {
    try {
      await MasterChef.methods
        .pendingOven(poolId, account)
        .call()
        .on('confirmation', function (receipt) {
          setPendingOven(receipt);
        });
    } catch (err) {
      window.alert(err);
    }
  };

  // [ ] Need to fix button to pop-up metamask
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Header />
        <br />
        {/* <button type='submit' onClick={window.ethereum.enable()}>
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
            pendingOven(poolId);
          }}
        >
          <p>
            Your pending Oven for pool Id <em>{poolId}</em> is:{' '}
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
