const { ethers } = require("hardhat");

const financialData = {
    personalInformation: {
        name: "John Doe",
        dateOfBirth: "01-01-1980",
        gender: "Male",
        panNumber: "ABCDEF1234G",
    },
    loanDeets: {
        loanType: "Home Loan",
        loanAmount: ethers.utils.parseEther("200"),
        loanTenure: 60,
        repaymentStatus: "Delayed",
    },
};

describe("ThreeBank", () => {
    let threebank, threeCredit;
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
});
