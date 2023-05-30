import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../bindings/Token.types";

export async function instantiateTokenContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    decimals: 6,
    initial_balances: [{
      address: "neutron1tz8wg6kh5su6602h2tmrpnmjlx83xe38slehgq",
      amount: "1000000000",
    }],
    name: "ASTRO token",
    symbol: "ASTRO"
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "ASTRO token contract",
    100,
    {
      admin: address,
    }
  );
  return info.contractAddress;
}

