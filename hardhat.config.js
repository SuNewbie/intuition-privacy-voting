import { config as dotenvConfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenvConfig();

const config = {
  solidity: "0.8.20",
  networks: {
    intuitionTestnet: {
      url: "https://testnet.rpc.intuition.systems/http",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 13579,
    },
  },
  etherscan: {
    customChains: [
      {
        network: "intuitionTestnet",
        chainId: 13579,
        urls: {
          apiURL: "https://testnet.explorer.intuition.systems/api",
          browserURL: "https://testnet.explorer.intuition.systems",
        },
      },
    ],
    apiKey: {
      intuitionTestnet: "abc", // dummy key, hardhat butuh field ini
    },
  },
};

export default config;
