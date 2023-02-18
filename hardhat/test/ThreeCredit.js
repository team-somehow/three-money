const { expect } = require("chai");
const { ethers } = require("hardhat");

let financialData = {
    personalInformation: {
        name: "Hussain Pettiwala",
        dateOfBirth: "04/03/2001",
        gender: "Male",
        panNumber: "1234",
    },
    employmentInformation: [
        {
            employerName: "Mera Employer",
            occupation: "SDE",
            incomePerYear: 100000,
            startTime: "",
            endTime: "",
        },
    ],
    creditHistory: {
        loanRepaymentHistory: [
            {
                loanType: "Personal Loan",
                loanAmount: 200000,
                loanTenure: 36,
                repaymentStatus: "on_time",
            },
            {
                loanType: "Home Loan",
                loanAmount: 500000,
                loanTenure: 60,
                repaymentStatus: "delayed",
            },
        ],
    },
};

describe("ThreeCredit", function () {
    let threeCredit, pan;
    let owner, authorized, unauthorized;

    before(async function () {
        // use ethers to get our contract
        const ThreeCredit = await ethers.getContractFactory(
            "contracts/ThreeCredit.sol:ThreeCredit"
        );
        // and deploy it
        threeCredit = await ThreeCredit.deploy();
        await threeCredit.deployed();

        pan = "1234";

        const [_owner, _authorized, _unauthorized] = await ethers.getSigners();
        owner = _owner;
        authorized = _authorized;
        unauthorized = _unauthorized;

        // verify address
    });
});
