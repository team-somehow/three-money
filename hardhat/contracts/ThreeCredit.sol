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

    // keep track of owner
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can access this function."
        );
        _;
    }

    // authorization
    address[] public authorized;

    modifier onlyAuthorized() {
        require(isAuthorized(), "Caller is not an auhorized");
        _;
    }

    function isAuthorized() internal view returns (bool) {
        for (uint i = 0; i < authorized.length; i++) {
            if (authorized[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function addAuthorized(address _authorized) public onlyOwner {
        authorized.push(_authorized);
    }

    // remaining contract
    mapping(string => FinancialData) private financialDataMap;

    function addPersonalInformation(
        string memory panNumber,
        PersonalInformation memory personalInformation
    ) public onlyAuthorized {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.personalInformation = personalInformation;
    }

    function addEmploymentInformation(
        string memory panNumber,
        EmploymentInformation memory employmentInformation
    ) public onlyAuthorized {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.employmentInformation.push(employmentInformation);
    }

    function addLoanRepaymentHistory(
        string memory panNumber,
        LoanRepaymentHistory memory loanRepaymentHistory
    ) public onlyAuthorized {
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
        onlyAuthorized
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

    function calculateCreditScore(
        string memory pan
    ) public view onlyAuthorized returns (uint256) {
        FinancialData memory data = financialDataMap[pan];

        EmploymentInformation[] memory employmentInfo = data
            .employmentInformation;
        LoanRepaymentHistory[] memory loanHistory = data
            .creditHistory
            .loanRepaymentHistory;

        uint256 incomeDelta = 0;

        // Calculate score based on employment information
        if (employmentInfo[0].incomePerYear >= 500000) {
            incomeDelta += 250;
        } else if (employmentInfo[0].incomePerYear >= 250000) {
            incomeDelta += 100;
        } else if (employmentInfo[0].incomePerYear >= 100000) {
            incomeDelta += 50;
        }

        uint256 score = 0;
        uint256 totalLoanAmount = 0;

        // Calculate score based on loan repayment history
        for (uint256 i = 0; i < loanHistory.length; i++) {
            totalLoanAmount += loanHistory[i].loanAmount;
            if (
                keccak256(bytes(loanHistory[i].repaymentStatus)) ==
                keccak256(bytes("on_time"))
            ) {
                score += 3 * loanHistory[i].loanAmount;
            } else if (
                keccak256(bytes(loanHistory[i].repaymentStatus)) ==
                keccak256(bytes("semi_delayed"))
            ) {
                score += 2 * loanHistory[i].loanAmount;
            } else if (
                keccak256(bytes(loanHistory[i].repaymentStatus)) ==
                keccak256(bytes("delayed"))
            ) {
                score += 1 * loanHistory[i].loanAmount;
            }
        }

        uint256 creditScore = 0;
        if (score == 0) {
            creditScore = 500;
        } else {
            creditScore = ((score * 600) / (3 * totalLoanAmount)) + incomeDelta;
        }

        // Return the final credit score
        return creditScore;
    }
}
