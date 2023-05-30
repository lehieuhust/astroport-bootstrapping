import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../bindings/Lockdrop.types";
import { coin } from "@cosmjs/amino"

export async function instantiateLockdropContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    deposit_window: 10_000_000,
    init_timestamp: 1685588690,
    max_lock_duration: 52,
    max_positions_per_user: 14,
    min_lock_duration: 1,
    weekly_divider: 12,
    weekly_multiplier: 1,
    withdrawal_window: 500_000
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