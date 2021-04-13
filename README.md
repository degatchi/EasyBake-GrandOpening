## Quick Start

`npm i` installs all dependencies

`npm start` runs our dev server

## Dependencies

Using `npm i @metamask/detect-provider` (https://www.npmjs.com/package/@metamask/detect-provider) to detect the MetaMask Ethereum provider, or any provider injected at window.ethereum.

## Future features

- https://docs.metamask.io/guide/ethereum-provider.html#events (Used to call init() after a connected event after login popup)
- Have approve function appear & only after approved replace the approve functuon with the deposit function. Have a check to see whether the user has already approved, if so, show deposit, not approve function.
