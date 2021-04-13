import React, { useState } from 'react';
import MasterChefABI from '../../abis/MasterChefABI.json';
import Web3 from 'web3';

const [isConnected, setConnection] = useState(false);

const getBlockchain = async () => {
  if (window.ethereum) {
    if (!isConnected) {
      // pop up metamask
      window.ethereum.enable();
      setConnetion(true);
    } else {
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
              MasterChefABI,
              '0xc6deeacf599d97761cd03ce0aac45964daebc234'
            )
          );
        } catch (e) {
          window.alert(
            `Contracts not deployed to the current network: ${netId}`
          );
        }
      }
    }
  } else {
    window.alert('Unable to detect MetaMask, please install');
  }
};

export default getBlockchain;
