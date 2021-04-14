import React, { useEffect, useReducer } from 'react';
import Web3 from 'web3';
import MasterChefABI from './abis/MasterChefABI.json';
import EthDaiABI from './abis/EthDaiABI.json';

const reducer = (state, action) => {};

const loadBlockchain = () => {
  const [userState, dispatch] = useReducer(reducer, { userState: undefined });
};
