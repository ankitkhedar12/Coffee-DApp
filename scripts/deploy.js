// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Account ${counter} (${address}) balance: ${await getBalances(address)}`);
    counter++;
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`Memo from ${name} (${from}) at ${timestamp}: ${message}`);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const chaiContract = await chai.deploy();

  console.log("owner is : ", owner.address);

  await chaiContract.deployed();
  // consoleBalances( chaiContract.address);
  const addresses=[owner.address, from1.address, from2.address, from3.address];

  console.log("Before Buying Chai");
  await consoleBalances(addresses);
  // await contract.buyChai({value: hre.ethers.utils.parseEther("1.0")});
  const amount = {value:hre.ethers.utils.parseEther("1")};
  await chaiContract.connect(from1).buyChai("from1", "very nice chai", amount);
  await chaiContract.connect(from2).buyChai("from2", "very nice chai2", amount);
  await chaiContract.connect(from3).buyChai("from3", "very nice chai3", amount);

  console.log("After Buying Chai");
  await consoleBalances(addresses);

  const memos = await chaiContract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
