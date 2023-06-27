require("@nomicfoundation/hardhat-toolbox");

// require("dotenv").config();
// /** @type import('hardhat/config').HardhatUserConfig */

// const SEPOLIA_URL = process.env.SEPOLIA_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// module.exports = {
//   solidity: "0.8.18",
//   networks: {
//     sepolia: {
//       url: SEPOLIA_URL,
//       accounts: [PRIVATE_KEY]
//     }
//   }
// };
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/jdjNMNIH2LrY-_MjP06uON7C2d4g2hKW",
      accounts: ["83534e5da46bf5c92d412ffb54f3899bd9e7f7c1d597ad4a3eee4798db1f5b25"],
    }
  }
};
