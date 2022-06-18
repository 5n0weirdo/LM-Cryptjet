const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => {
  try {
    await main();
    // 0 means was a success
    process.exit(0);
  } catch (error) {
    console.error(error);
    // 1 means was an error
    process.exit(1);
  }
}

runMain();