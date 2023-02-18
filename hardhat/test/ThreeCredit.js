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
        await threeCredit.connect(_owner).addAuthorized(authorized.address);
    });

    it("should add personal information", async () => {
        const personalInformationJson = financialData.personalInformation;

        // Add personal information
        await threeCredit
            .connect(authorized)
            .addPersonalInformation(pan, personalInformationJson);

        // Retrieve the personal information from the contract
        const financialDataFromContract = await threeCredit
            .connect(authorized)
            .getFinancialData(pan);

        // Verify that the information is correct
        expect(financialDataFromContract[0][0]).to.equal(
            personalInformationJson.name
        );
        expect(financialDataFromContract[0][1]).to.equal(
            personalInformationJson.dateOfBirth
        );
        expect(financialDataFromContract[0][2]).to.equal(
            personalInformationJson.gender
        );
        expect(financialDataFromContract[0][3]).to.equal(
            personalInformationJson.panNumber
        );
    });

    it("should add employment information", async () => {
        const employmentInformationJson =
            financialData.employmentInformation[0];

        // Add employment information
        await threeCredit
            .connect(authorized)
            .addEmploymentInformation(pan, employmentInformationJson);

        // Retrieve the employment information from the contract
        const financialDataFromContract = await threeCredit
            .connect(authorized)
            .getFinancialData(pan);

        // Verify that the information is correct
        expect(financialDataFromContract[1][0][0]).to.equal(
            employmentInformationJson.employerName
        );
        expect(financialDataFromContract[1][0][1]).to.equal(
            employmentInformationJson.occupation
        );
        expect(financialDataFromContract[1][0][2]).to.equal(
            employmentInformationJson.incomePerYear
        );
        expect(financialDataFromContract[1][0][3]).to.equal(
            employmentInformationJson.startTime
        );
        expect(financialDataFromContract[1][0][4]).to.equal(
            employmentInformationJson.endTime
        );
    });

    it("should add loan repayment history", async () => {
        const loanRepaymentHistoryJson =
            financialData.creditHistory.loanRepaymentHistory[0];

        // Add loan repayment information
        await threeCredit
            .connect(authorized)
            .addLoanRepaymentHistory(pan, loanRepaymentHistoryJson);

        // Retrieve the loan repayment information from the contract
        const financialDataFromContract = await threeCredit
            .connect(authorized)
            .getFinancialData(pan);

        const loanRepaymentHistoryFromContract =
            financialDataFromContract[2][0][0];

        // Verify that the information is correct
        expect(loanRepaymentHistoryFromContract[0]).to.equal(
            loanRepaymentHistoryJson.loanType
        );
        expect(loanRepaymentHistoryFromContract[1]).to.equal(
            loanRepaymentHistoryJson.loanAmount
        );
        expect(loanRepaymentHistoryFromContract[2]).to.equal(
            loanRepaymentHistoryJson.loanTenure
        );
        expect(loanRepaymentHistoryFromContract[3]).to.equal(
            loanRepaymentHistoryJson.repaymentStatus
        );
    });
});
