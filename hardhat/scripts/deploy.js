// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // We get the contract to deploy
    const ThreeCredit = await hre.ethers.getContractFactory(
        "contracts/ThreeCredit.sol:ThreeCredit"
    );

    const threeCredit = await ThreeCredit.deploy();

    await threeCredit.deployed();

    console.log("ThreeCredit deployed to:", threeCredit.address);

    // We get the contract to deploy
    const ThreeBank = await hre.ethers.getContractFactory(
        "contracts/ThreeBank.sol:ThreeBank"
    );

    const threeBank = await ThreeBank.deploy(threeCredit.address);

    await threeBank.deployed();

    console.log("ThreeBank deployed to:", threeBank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
