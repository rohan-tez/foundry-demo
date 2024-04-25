const w3 = require('web3');
const fs = require('fs');

const web3 = new w3.Web3("https://node.ghostnet.etherlink.com");

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
    from: '<YOUR_ADDRESS>', // Address from which to deploy the contract
})
.then((newContractInstance) => {
    console.log('Deployed contract address: ' + newContractInstance.options.address);
});
