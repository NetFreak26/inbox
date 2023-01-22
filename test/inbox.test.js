const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const compiled_contract = require('../compile.js');

const abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const web3 = new Web3(ganache.provider());

let accounts;
let inboxContract;

beforeEach(async () => {
    // Get the list of all accounts
    accounts = await web3.eth.getAccounts();

    //deploy a contract
    inboxContract =  await new web3.eth.Contract(abi)
                        .deploy({ data: bytecode, arguments: ['First Contract!']})
                        .send({ from: accounts[0], gas: 1000000})
})

describe('testing inbox contract', () => {
    it('deploys a contract', () => {
        assert.ok(inboxContract.options.address);
    });

    it('initial message check', async () => {
        const initialMessage = await inboxContract.methods.getMessage().call();
        assert.equal(initialMessage, 'First Contract!');
    });

    it('updated message check', async () => {
        await inboxContract.methods.setMessage('Contract Message Updated').send({ from: accounts[1]});
        const updatedMessage = await inboxContract.methods.getMessage().call();
        assert.equal(updatedMessage, 'Contract Message Updated');
    });
})