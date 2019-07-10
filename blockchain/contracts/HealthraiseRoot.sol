pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";

contract HealthraiseRoot is Ownable {

    event AccountAdded(uint id, string name, address publicAddress);

    struct Account {
        string name;
        uint id;
        uint raised;
        uint32 upvote;
        uint32 downvote;
    }

    Account[] public accounts;

    mapping (address => uint) accountCount;
    mapping (uint => address) public accountToOwner;

    function createAccount(string _name) public {
        require(accountCount[msg.sender] == 0);
        uint id = accounts.push(Account(_name, id, 0, 0, 0)) - 1;
        accountCount[msg.sender]++;
        accountToOwner[id] = msg.sender;
        emit AccountAdded(id, _name, msg.sender);
    }

}