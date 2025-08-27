# Intuition Privacy Voting Skeleton

This is a minimal project skeleton for building a privacy-preserving voting dApp 
on **Intuition Testnet** using Semaphore.

## Structure
- `contracts/` : Hardhat project with Voting.sol and deploy script.
- `frontend/`  : Vite + React frontend with basic UI.
- `zk/`        : Placeholder for zero-knowledge circuits & verifier.

## Quickstart
1. Install deps in contracts and frontend:
   ```bash
   cd contracts && npm install
   cd ../frontend && npm install
   ```

2. Compile contracts & run deploy script:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deployVoting.ts --network intuitionTestnet
   ```

3. Run frontend locally:
   ```bash
   cd frontend
   npm run dev
   ```
