import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { networkConfig } from "./networks";
import { uploadContracts } from "./helpers/uploadContracts";
import { SigningCosmWasmClient } from "cosmwasm";
import { instantiateTokenContract } from "./helpers/token"
import { instantiateAirdropContract } from "./helpers/airdrop"
import { instantiateLockdropContract } from "./helpers/lockdrop"
import { instantiateAuctionContract } from "./helpers/auction"
const auction_contract: Contract[] = [
  {
    name: "astroport_auction",
    wasmFile: "../wasm_files/auction.wasm",
  },
];

const airdrop_contract: Contract[] = [
  {
    name: "astroport_airdrop",
    wasmFile: "../wasm_files/airdrop.wasm",
  },
];

const lockdrop_contract: Contract[] = [
  {
    name: "astroport_lockdrop",
    wasmFile: "../wasm_files/lockdrop.wasm",
  },
];

const token_contract: Contract[] = [
  {
    name: "astro_token",
    wasmFile: "../wasm_files/token.wasm",
  },
];


async function deploy(client: SigningCosmWasmClient, address: string): Promise<void> {
  // upload the auction contract
  const codeID_1 = await uploadContracts(client, address, auction_contract);
  console.log(`code ID: ${codeID_1.astroport_auction}`);

  // upload the airdrop contract
  const codeID_2 = await uploadContracts(client, address, airdrop_contract);
  console.log(`code ID: ${codeID_2.astroport_airdrop}`);

  // upload the lockdrop contract
  const codeID_3 = await uploadContracts(client, address, lockdrop_contract);
  console.log(`code ID: ${codeID_3.astroport_lockdrop}`);


  // upload the token contract
  const codeID_4 = await uploadContracts(client, address, token_contract);
  console.log(`code ID: ${codeID_4.astro_token}`);
}

async function main(): Promise<void> {

  console.log("Uploading contract...");
  
  // get the mnemonic of the contract
  const mnemonic = getMnemonic();

  // get the signingclient
  const {client, address} = await connect(mnemonic, networkConfig);

  // check if the given wallet has enough balance
  let {amount} = await client.getBalance(address, networkConfig.feeToken);
  console.log(`balance of ${address} is ${amount}`);
  // await deploy(client, address);
  // const tokenContract = await instantiateTokenContract(client, address, 619);
  // console.log("tokenContract", tokenContract)

  // const airdropContract = await instantiateAirdropContract(client, address, 617);
  // console.log("airdropContract", airdropContract)

  // const lockdropContract = await instantiateLockdropContract(client, address, 618);
  // console.log("lockdropContract", lockdropContract)

  const auctionContract = await instantiateAuctionContract(client, address, 616);
  console.log("auctionContract", auctionContract)
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