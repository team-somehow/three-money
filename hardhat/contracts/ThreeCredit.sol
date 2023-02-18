// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract ThreeCredit {
    struct PersonalInformation {
        string name;
        string dateOfBirth;
        string gender;
        string panNumber;
    }

    struct EmploymentInformation {
        string employerName;
        string occupation;
        uint256 incomePerYear;
        string startTime;
        string endTime;
    }

    struct LoanRepaymentHistory {
        string loanType;
        uint256 loanAmount;
        uint256 loanTenure;
        string repaymentStatus;
    }

    struct CreditCardHistory {
        string cardIssuer;
        uint256 cardLimit;
        uint256 spending;
        string repaymentStatus;
    }

    struct CreditHistory {
        LoanRepaymentHistory[] loanRepaymentHistory;
        CreditCardHistory[] creditCardHistory;
    }

    struct FinancialData {
        PersonalInformation personalInformation;
        EmploymentInformation[] employmentInformation;
        CreditHistory creditHistory;
    }
}
