import mverse from "../artifacts/contracts/MVerse.sol/MVerse.json" assert {type :"json"};
import {
    nftaddress
  } from '../config.js'
//const Web3 = require("web3");
//import { Web3 } from 'web3';
const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({ method : "eth_requestAccounts"});

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
        mverse.abi,
        nftaddress
    );
    console.log(contract);
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            console.log(supply);
            contract.methods.getBuilding().call({from : accounts[0]}).then((data) => {
                res({supply:supply, buildings : data});
                console.log(data);
            })
        });
    });
});

export default connect;
