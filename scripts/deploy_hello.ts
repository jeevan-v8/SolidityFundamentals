import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat"

async function deploy(){
  const Helloworld = await ethers.getContractFactory("HelloWorld");
  const hello = await Helloworld.deploy();
  await hello.deployed();

  return hello;
}
//@ts-ignore
async function sayhello(hello) {
    console.log("sayhello : ", await hello.hello() );
    
}

deploy().then(sayhello);
