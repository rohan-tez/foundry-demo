import web3
from solcx import install_solc, compile_source, get_installed_solc_versions
import web3.contract.contract
import web3.eth
import dotenv
import os

dotenv.load_dotenv()


RPC_URL = "https://node.ghostnet.etherlink.com"
JAN_1ST_2030 = 1893456000

def deploy():
    with open("src/Counter.sol", 'r') as file:
        contract_source_code = file.read()
    compiled_sol = compile_source(contract_source_code, output_values=["abi", "bin"])
    contract_id, contract_interface = compiled_sol.popitem()
    bytecode = contract_interface["bin"]
    abi = contract_interface["abi"]
    w3 = web3.Web3(web3.HTTPProvider(RPC_URL))
    w3.eth.default_account = w3.eth.account.from_key(os.environ["ETHERLINNK_KEY"]).address
    print(w3.eth.default_account)
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    tx_hash = contract.constructor().transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_receipt.contractAddress


if __name__ == "__main__":
    install_solc(version='latest')
    addr = deploy()
    print(addr)
