import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x4B919F316F53DF59979e0C182b17E5C99d82c50d";

// ABI sesuai Voting.sol
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "candidate1Votes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "candidate2Votes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "candidate", "type": "uint8" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

// RPC Intuition testnet
const RPC_URL = "https://testnet.rpc.intuition.systems/http";

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const code = await provider.getCode(CONTRACT_ADDRESS);
  console.log("Contract bytecode at address:", code);

  if (code === "0x") {
    console.log("❌ Kontrak tidak ditemukan di alamat ini di jaringan tersebut!");
    return;
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const v1 = await contract.candidate1Votes();
    const v2 = await contract.candidate2Votes();
    console.log("✅ candidate1Votes:", v1.toString());
    console.log("✅ candidate2Votes:", v2.toString());
  } catch (err) {
    console.error("⚠️ Error panggil function:", err);
  }
}

main();
