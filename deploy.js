const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiled_contract = require('./compile.js');

const abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const provider = new HDWalletProvider({
    mnemonic: '12 words phrase',
    providerOrUrl: 'https://goerli.infura.io/v3/bd7e3bb95e2c4d9bb8063bc16275ed90',
    addressIndex: 0
})

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    const inboxContract = await new web3.eth.Contract(abi)
                            .deploy({ data: bytecode, arguments: ['First Contract!']})
                            .send({ from: accounts[0], gas: 1000000});

    console.log('Contract deployed to: ', inboxContract.options.address);
    await inboxContract.methods.setMessage('Contract Message Updated').send({ from: accounts[0]});

    provider.engine.stop();
}

deploy();