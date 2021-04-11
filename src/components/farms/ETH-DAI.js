import React from 'react';

// deposit function from contract
const depositETHDAI = async (amount) => {
  await masterChefContract.methods
    .deposit('0x1c5dee94a34d795f9eeef830b68b80e44868d316') // eth-dai pool address
    .send({ value: amount.toString(), from: account });
};

export default depositETHDAI;
