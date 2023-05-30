import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../bindings/Airdrop.types";
import { coin } from "@cosmjs/amino"

export async function instantiateAirdropContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    admin: address,
    name: "airdrop contract",
    version: "1.0",
    to_timestamp: 1685588690,
    astro_token_address: "neutron183pkj3dpm9c85ckdtpcuqg5j8l6yre8v4309ygt3qgzrudnud0zsfsfkpk"
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "airdrop contract",
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