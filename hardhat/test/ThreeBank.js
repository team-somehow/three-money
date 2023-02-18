const { ethers } = require("hardhat");
const { expect } = require("chai");

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
        repaymentStatus: "on_time",
    },
    employmentInformation: {
        employerName: "Mera Employer",
        occupation: "SDE",
        incomePerYear: 100000,
        startTime: "",
        endTime: "",
    },
};

describe("ThreeBank", () => {
    let threeBank, threeCredit;
    let owner, account1, account2;

    before(async function () {
        const ThreeCredit = await ethers.getContractFactory(
            "contracts/ThreeCredit.sol:ThreeCredit"
        );
        // and deploy it
        threeCredit = await ThreeCredit.deploy();
        await threeCredit.deployed();

        const ThreeBank = await ethers.getContractFactory(
            "contracts/ThreeBank.sol:ThreeBank"
        );
        threeBank = await ThreeBank.deploy(threeCredit.address);
        await threeBank.deployed();

        const [_owner, _account1, _account2, account3] =
            await ethers.getSigners();
        owner = _owner;
        account1 = _account1;
        account2 = _account2;

        await threeCredit.connect(_owner).addAuthorized(threeBank.address);
        await threeCredit.connect(_owner).addAuthorized(account3.address);

        await threeCredit
            .connect(account3)
            .addPersonalInformation(
                financialData.personalInformation.panNumber,
                financialData.personalInformation
            );
        await threeCredit
            .connect(account3)
            .addEmploymentInformation(
                financialData.personalInformation.panNumber,
                financialData.employmentInformation
            );
        await threeCredit
            .connect(account3)
            .addLoanRepaymentHistory(
                financialData.personalInformation.panNumber,
                financialData.loanDeets
            );
    });

    it("Enroll user", async () => {
        await threeBank
            .connect(account1)
            .enroll(
                financialData.personalInformation,
                financialData.personalInformation.panNumber
            );
    });

    it("Deposit", async () => {
        await threeBank
            .connect(account1)
            .deposit(financialData.personalInformation.panNumber, {
                value: ethers.utils.parseEther("1000"),
            });
    });

    it("Get balance", async () => {
        await threeBank
            .connect(account1)
            .getBalance(financialData.personalInformation.panNumber);
    });

    it("Withdraw", async () => {
        await threeBank
            .connect(account1)
            .withdraw(
                ethers.utils.parseEther("10"),
                financialData.personalInformation.panNumber
            );
    });

    it("Request Loan", async () => {
        await threeBank
            .connect(account1)
            .requestLoan(
                financialData.personalInformation.panNumber,
                financialData.loanDeets
            );
    });

    it("Approve Loan", async () => {
        const approvalString = await threeBank
            .connect(account1)
            .approveLoan(financialData.personalInformation.panNumber);

        expect(approvalString).to.equal("approved");
    });

    it("Make Loan Payment", async () => {
        await threeBank
            .connect(account1)
            .makeLoanPayment(
                financialData.personalInformation.panNumber,
                ethers.utils.parseEther("150")
            );
    });
});
