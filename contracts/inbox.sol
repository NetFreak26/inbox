// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Inbox {

    string message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function getMessage() view public returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}