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
    mapping (address => uint) accountId;
    mapping (uint => address) public accountToOwner;

    function createAccount(string _name) public {
        require(accountCount[msg.sender] == 0);
        uint id = accounts.push(Account(_name, id, 0, 0, 0)) - 1;
        accountCount[msg.sender]++;
        accountId[msg.sender] = id;
        accountToOwner[id] = msg.sender;
        emit AccountAdded(id, _name, msg.sender);
    }

    function sponsor(address _to, uint amount) public {
        uint id = accountId[_to];
        accounts[id].raised = accounts[id].raised + amount;
    }

    // do something to make sure each person can only vote on one entity once
    function rate(address _to, bool _positive) public {
        uint id = accountId[_to];
        if (_positive) {
            accounts[id].upvote++;
        } else {
            accounts[id].downvote++;
        }
    }
}