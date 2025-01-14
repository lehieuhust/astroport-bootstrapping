/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface ClaimResponse {
  is_claimed: boolean;
  [k: string]: unknown;
}
export type Addr = string;
export interface Config {
  are_claims_enabled: boolean;
  astro_token_address: Addr;
  auction_contract_address?: Addr | null;
  from_timestamp: number;
  merkle_roots: string[];
  owner: Addr;
  to_timestamp: number;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  receive: Cw20ReceiveMsg;
} | {
  update_config: {
    auction_contract_address?: string | null;
    from_timestamp?: number | null;
    merkle_roots?: string[] | null;
    owner?: string | null;
    to_timestamp?: number | null;
    [k: string]: unknown;
  };
} | {
  enable_claims: {
    [k: string]: unknown;
  };
} | {
  claim: {
    claim_amount: Uint128;
    merkle_proof: string[];
    root_index: number;
    [k: string]: unknown;
  };
} | {
  delegate_astro_to_bootstrap_auction: {
    amount_to_delegate: Uint128;
    [k: string]: unknown;
  };
} | {
  withdraw_airdrop_reward: {
    [k: string]: unknown;
  };
} | {
  transfer_unclaimed_tokens: {
    amount: Uint128;
    recipient: string;
    [k: string]: unknown;
  };
};
export type Uint128 = string;
export type Binary = string;
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  astro_token_address: string;
  from_timestamp?: number | null;
  merkle_roots?: string[] | null;
  owner?: string | null;
  to_timestamp: number;
  [k: string]: unknown;
}
export interface MigrateMsg {
  [k: string]: unknown;
}
export type QueryMsg = {
  config: {
    [k: string]: unknown;
  };
} | {
  state: {
    [k: string]: unknown;
  };
} | {
  user_info: {
    address: string;
    [k: string]: unknown;
  };
} | {
  has_user_claimed: {
    address: string;
    [k: string]: unknown;
  };
};
export interface State {
  total_airdrop_size: Uint128;
  total_delegated_amount: Uint128;
  unclaimed_tokens: Uint128;
  [k: string]: unknown;
}