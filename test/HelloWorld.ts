import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", function() {
    it("should say hi", async function() {
        // 1. setup
        // 2. deploy our contract
        // 3. call our functions to test

        // 2.
        const Helloworld = await ethers.getContractFactory("HelloWorld");
        const hello = await Helloworld.deploy();
        await hello.deployed();

        expect(await hello.hello()).to.equal("Hello, World");
    });
});

