import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  console.log("🚀 Deploying Voting contract...");
  const voting = await Voting.deploy();

  // tunggu kontrak benar-benar ter-deploy
  await voting.waitForDeployment();

  console.log("✅ Voting deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
