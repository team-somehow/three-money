// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

struct Loan {
    string loanType;
    uint256 loanAmount;
    uint256 loanTenure;
    string repaymentStatus;
}

interface ThreeCredit {
    function addLoanRepaymentHistory(
        string memory panNumber,
        Loan memory loanRepaymentHistory
    ) external;

    function calculateCreditScore(
        string memory pan
    ) external view returns (uint256);
}

contract ThreeBank {
    struct PersonalInformation {
        string name;
        string dateOfBirth;
        string gender;
        string panNumber;
    }

    mapping(string => PersonalInformation) users;

    mapping(string => uint256) public balance;
    mapping(string => bool) public enrolled;
    mapping(string => Loan) public loans;

    uint256 minCreditScore = 500;
    uint256 maxLoanLimitForNewCustomer = 2000;

    uint256 totalBalance = 0;
    ThreeCredit threeCredit;

    constructor(address contractAddress) {
        threeCredit = ThreeCredit(contractAddress);
    }

    function getBalance(
        string memory panNumber
    ) public view onlyEnrolled(panNumber) returns (uint256) {
        return balance[panNumber];
    }

    function enroll(
        PersonalInformation memory personalInformation,
        string memory panNumber
    ) public {
        enrolled[panNumber] = true;
        users[panNumber] = personalInformation;
    }

    modifier onlyEnrolled(string memory panNumber) {
        require(enrolled[panNumber], "User not enrolled");
        _;
    }

    function deposit(
        string memory panNumber
    ) public payable onlyEnrolled(panNumber) {
        balance[panNumber] += msg.value;
        totalBalance += msg.value;
    }

    function withdraw(
        uint256 amount,
        string memory panNumber
    ) public onlyEnrolled(panNumber) {
        require(balance[panNumber] >= amount, "Insufficient Balance");
        balance[panNumber] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function requestLoan(
        string memory panNumber,
        Loan memory loanDeets
    ) public onlyEnrolled(panNumber) returns (string memory) {
        require(
            loanDeets.loanAmount <= totalBalance,
            "Not enough funds in bank"
        );
        require(
            loans[panNumber].loanAmount == 0,
            "You already have a loan active"
        );

        console.log(threeCredit.calculateCreditScore(panNumber));
        console.log(minCreditScore);
        console.log(
            minCreditScore > threeCredit.calculateCreditScore(panNumber)
        );

        string memory result = "0";

        if (minCreditScore > threeCredit.calculateCreditScore(panNumber)) {
            console.log("idhar kaise aana hua");
            result = "8";
        } else {
            console.log("idhar to pohoch gaya");

            balance[panNumber] += loanDeets.loanAmount;
            loans[panNumber] = loanDeets;
            result = "9";
        }

        console.log("result ye hai", result);

        return result;
    }

    function makeLoanPayment(
        string memory panNumber,
        uint256 amount
    ) public onlyEnrolled(panNumber) {
        console.log(loans[panNumber].loanAmount);
        // require(loans[panNumber].loanAmount > 0, "You dont have a loan");
        require(balance[panNumber] >= amount, "You dont have that much money");
        require(amount > 0, "Payment should be positive");

        if (amount >= loans[panNumber].loanAmount) {
            amount = loans[panNumber].loanAmount;
            loans[panNumber].loanAmount = 0;
        } else {
            loans[panNumber].loanAmount -= amount;
        }
        balance[panNumber] -= amount;
    }
}
