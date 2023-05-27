import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { networkConfig } from "./networks";
import { uploadContracts } from "./helpers/uploadContracts";

const contracts: Contract[] = [
  {
    name: "astroport_auction",
    wasmFile: "../wasm_files/auction.wasm",
  },
];

async function main(): Promise<void> {

  console.log("Uploading contract...");
  
  // get the mnemonic of the contract
  const mnemonic = getMnemonic();

  // get the signingclient
  const {client, address} = await connect(mnemonic, networkConfig);

  // check if the given wallet has enough balance
  let {amount} = await client.getBalance(address, networkConfig.feeToken);
  console.log(`balance of ${address} is ${amount}`);

  // upload the contract
  const codeID = await uploadContracts(client, address, contracts);
  console.log(`code ID: ${codeID.astroport_auction}`);

}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);