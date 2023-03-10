const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'inbox.sol': {
            content: source
        }
    },

    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

function findImports (path) {
    return { contents: source };
}
module.exports = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })).contracts['inbox.sol']['Inbox'];