const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete build folder if it exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// compile the solidity contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// create build folder if it doesn't exist
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, `${contract.replace(':', '')}.json`),
    output[contract]
  );
}
