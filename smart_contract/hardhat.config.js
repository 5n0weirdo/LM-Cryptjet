// https://eth-goerli.alchemyapi.io/v2/E2bLG3PR89rewIzxB_anysvFYcr2r5vd

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/E2bLG3PR89rewIzxB_anysvFYcr2r5vd',
      accounts: ['69e2535f1e9540eeacfc28a43cfbf7e65b280c43eb0923a33ce9f142e84fcd8c']
    }
  }
}