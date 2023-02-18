// SPDX-License-Identifier: UNLICENSED
import "hardhat/console.sol";

pragma solidity ^0.8.0;

struct Loan {
    string loanType;
    uint256 loanAmount;
    uint256 loanTenure;
    string repaymentStatus;
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
}
