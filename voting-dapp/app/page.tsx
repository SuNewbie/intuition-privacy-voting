"use client";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x4B919F316F53DF59979e0C182b17E5C99d82c50d";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "candidate1Votes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidate2Votes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "candidate", "type": "uint8" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [votes1, setVotes1] = useState(0);
  const [votes2, setVotes2] = useState(0);

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      loadVotes(provider);
    } else {
      alert("Install MetaMask first!");
    }
  }

  async function loadVotes(provider) {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const v1 = await contract.candidate1Votes();
    const v2 = await contract.candidate2Votes();
    setVotes1(v1.toString());
    setVotes2(v2.toString());
  }

  async function castVote(candidate) {
    if (!window.ethereum) return alert("No wallet found!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.vote(candidate);
    await tx.wait();
    loadVotes(provider);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🗳 Privacy Voting DApp</h1>

      {account ? (
        <p className="mb-4">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          Connect Wallet
        </button>
      )}

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Candidate 1</h2>
          <p className="text-2xl">{votes1}</p>
          <button
            onClick={() => castVote(1)}
            className="mt-3 px-3 py-2 bg-green-500 text-white rounded-lg"
          >
            Vote 1
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Candidate 2</h2>
          <p className="text-2xl">{votes2}</p>
          <button
            onClick={() => castVote(2)}
            className="mt-3 px-3 py-2 bg-purple-500 text-white rounded-lg"
          >
            Vote 2
          </button>
        </div>
      </div>
    </main>
  );
}
