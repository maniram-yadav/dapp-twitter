const hre = require("hardhat");

async function main() {
  const Twitter = await ethers.getContractFactory("Tweet");
  const twitter = await Twitter.deploy();

  const de = await twitter.waitForDeployment();
  console.log(`Twitter deployed to ${await twitter.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});