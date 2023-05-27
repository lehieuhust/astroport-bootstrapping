// data from https://github.com/cosmos/chain-registry/tree/master/testnets
import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from '@cosmjs/math';

export interface Network {
  chainId: string;
  rpcEndpoint: string;
  prefix: string;
  gasPrice: GasPrice;
  feeToken: string;
}

export const networkConfig: Network = {
  chainId: "pion-1",
  rpcEndpoint: "https://rpc-palvus.pion-1.ntrn.tech:443",
  prefix: "neutron",
  gasPrice: GasPrice.fromString("0.002untrn"),
  feeToken: "untrn",
};
