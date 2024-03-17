// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Counter {
    uint32 counter;

    event CounterInc(uint counter);

    function count() public {
        counter++;
        console.log("counter is now", counter);
        emit CounterInc(counter);
    }

    function getcounter() public view returns (uint32) {
        return counter;
    }
}
