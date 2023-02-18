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
    }

    struct FinancialData {
        PersonalInformation personalInformation;
        EmploymentInformation[] employmentInformation;
        CreditHistory creditHistory;
    }

    mapping(string => FinancialData) private financialDataMap;

    function addPersonalInformation(
        string memory panNumber,
        PersonalInformation memory personalInformation
    ) public {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.personalInformation = personalInformation;
    }

    function addEmploymentInformation(
        string memory panNumber,
        EmploymentInformation memory employmentInformation
    ) public {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.employmentInformation.push(employmentInformation);
    }

    function addLoanRepaymentHistory(
        string memory panNumber,
        LoanRepaymentHistory memory loanRepaymentHistory
    ) public {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.creditHistory.loanRepaymentHistory.push(
            loanRepaymentHistory
        );
    }

    function getFinancialData(
        string memory panNumber
    )
        public
        view
        returns (
            PersonalInformation memory,
            EmploymentInformation[] memory,
            CreditHistory memory
        )
    {
        FinancialData memory financialData = financialDataMap[panNumber];
        return (
            financialData.personalInformation,
            financialData.employmentInformation,
            financialData.creditHistory
        );
    }
}
