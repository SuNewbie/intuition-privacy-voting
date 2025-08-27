// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    mapping(uint256 => uint256) public votes;

    event Voted(uint256 indexed option, address indexed voter);

    function vote(uint256 option) external {
        votes[option] += 1;
        emit Voted(option, msg.sender);
    }
}
