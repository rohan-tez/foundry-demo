const w3 = require('web3');
const fs = require('fs');
require('dotenv').config();

const web3 = new w3.Web3("https://node.ghostnet.etherlink.com");

// Load your wallet using your private key
const privateKey = '0x' + process.env.ETHERLINNK_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Read the bytecode and ABI from the files
const bytecode = fs.readFileSync('contracts/counter.bin').toString();
const abi = JSON.parse(fs.readFileSync('contracts/counter.abi').toString());

// Create a contract object
const contract = new web3.eth.Contract(abi);

// Deploy the contract
contract.deploy({
    data: bytecode,
    // Other parameters if required, like constructor arguments
})
.send({
    from: account.address, // Address from which to deploy the contract
    gas: 10000000,
    gasPrice:10000000000,
})
.then((newContractInstance) => {
    console.log('Deployed contract address: ' + newContractInstance.options.address);
});
