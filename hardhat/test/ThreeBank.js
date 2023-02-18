const { ethers } = require("hardhat");

const financialData = {
    personalInformation: {
        name: "Hussain",
        dateOfBirth: "09-09-2001",
        gender: "Male",
        panNumber: "HussainPan0",
    },
    loanDeets: {
        loanType: "Home Loan",
        loanAmount: ethers.utils.parseEther("200"),
        loanTenure: 60,
        repaymentStatus: "Delayed",
    },
};

describe("ThreeBank", () => {
    let threebank;
    let owner, account1, account2;

    before(async function () {
        const ThreeBank = await ethers.getContractFactory(
            "contracts/ThreeBank.sol:ThreeBank"
        );
        threebank = await ThreeBank.deploy();
        await threebank.deployed();
        const [_owner, _account1, _account2] = await ethers.getSigners();
        owner = _owner;
        account1 = _account1;
        account2 = _account2;
    });

    it("Enroll user", async () => {
        await threebank
            .connect(account1)
            .enroll(
                financialData.personalInformation,
                financialData.personalInformation.panNumber
            );
    });

    it("Deposit", async () => {
        await threebank
            .connect(account1)
            .deposit(financialData.personalInformation.panNumber, {
                value: ethers.utils.parseEther("1000"),
            });
    });

    it("Withdraw", async () => {
        await threebank
            .connect(account1)
            .withdraw(
                ethers.utils.parseEther("10"),
                financialData.personalInformation.panNumber
            );
    });
});
