import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json"

function getEth() {
  const eth = (window as any).ethereum;
  if (!eth) throw new Error("Get metamask acc");

  return eth;
}

async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];

  return accounts && accounts.length;
}

async function requestAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts && accounts.length;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts()))
    throw new Error("Please check metamask");

  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    Counter.abi,
    new ethers.providers.Web3Provider(getEth()).getSigner()
  )
  const el = document.createElement("div");
    async function setCounter(count?) {
        
        el.innerHTML =count || await counter.getcounter()
    }
    setCounter();

    const button = document.createElement("button");
    button.innerText = "increment";
    button.onclick = async function() {
        await counter.count();
    
    }

    counter.on(counter.filters.CounterInc(), function(count){
        setCounter(count);
    });
    document.body.append(el);
    document.body.append(button);  

}

run()


// import { ethers } from "ethers";

// async function hasSigners(): Promise<boolean> {
//     //@ts-ignore
//     const metamask = window.ethereum;
//     const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
//     return signers.length > 0;
// }

// async function requestAccess(): Promise<boolean> {
//     //@ts-ignore
//     const result = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
//     return result && result.length > 0;
// }

// async function getContract() {
//     const address = process.env.CONTRACT_ADDRESS;

//     if (!(await hasSigners()) && !(await requestAccess())) {
//         console.log("You are in trouble, no one wants to play");
//     }

//     // @ts-ignore
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const contract = new ethers.Contract(
//         process.env.CONTRACT_ADDRESS,
//         [
//             "function count() public",
//             "function getcounter() public view returns (uint)"
//         ], // abi
//         provider
//     );

//     // console.log("We have done it, time to call");
//     // console.log(await contract.hello());
//     const el = document.createElement("div");
//     async function setCounter() {
//         el.innerHTML = await counter.getCounter();
//     }
//     setCounter();

//     const button = document.createElement("button");
//     button.innerText = "increment";
//     button.click = async function() {
//       await counter.count();
//       setCounter();

//     }
//     document.body.append(el);
//     document.body.append(button);
// }



// getContract();