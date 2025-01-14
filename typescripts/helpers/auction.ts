import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../bindings/Auction.types";
import { coin } from "@cosmjs/amino"

export async function instantiateAuctionContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    airdrop_contract_address: "neutron1a3232al5y6663l99u2vmulcdlpnh4qhj8xyhm0qj5ntyw4unj7aqefh2am",
    astro_token_address: "neutron183pkj3dpm9c85ckdtpcuqg5j8l6yre8v4309ygt3qgzrudnud0zsfsfkpk",
    deposit_window: 100_000_00,
    init_timestamp: 1685588690,
    lockdrop_contract_address: "neutron1tvjr7fqn8ckmhuwzes3qlc6g4vtnklwxdtdyehxdqy0h5gfs2h2st0hh4g",
    lp_tokens_vesting_duration: 7776000,
    withdrawal_window: 5_000_00
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "astroport auction contract",
    100,
    {
      admin: address,
    }
  );
  return info.contractAddress;
}

export async function excecuteContract(
  client: SigningCosmWasmClient,
  senderAddress: string,
  contractAddress: string,
) {

}