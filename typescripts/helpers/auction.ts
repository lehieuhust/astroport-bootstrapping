import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../bindings/Auction.types";
import { coin } from "@cosmjs/amino"

export async function instantiateContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    admin: address,
    name: "auction contract",
    version: "1.0",
    airdrop_contract_address: "",
    astro_token_address: "",
    deposit_window: 0,
    init_timestamp: 0,
    lockdrop_contract_address: "",
    lp_tokens_vesting_duration: 0,
    withdrawal_window: 0
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
//   const create_orderbookpair: ExecuteMsg = {
//     create_order_book_pair: {
//       base_coin_info: {
//         native_token: {
//           denom: "usdt"
//         }
//       },
//       quote_coin_info: {
//         native_token: {
//           denom: "orai"
//         }
//       },
//       precision: "10",
//       min_base_coin_amount: "10"
//     },
//   };
//   let res = await client.execute(
//     senderAddress,
//     contractAddress,
//     create_orderbookpair,
//     'auto',
//     '',
//     [coin(200, "orai")],
//   );
//   console.log("Create orderbook pair res:");
//   console.log(res);

//   const submitOrder1: ExecuteMsg = {
//     submit_order: {
//       assets: [
//         {
//           amount: "100",
//           info: {
//             native_token: {
//               denom: "usdt"
//             }
//           }
//         },
//         {
//           amount: "600",
//           info: {
//             native_token: {
//               denom: "orai"
//             }
//           }
//         },
//       ],
//       direction: "buy"
//     }
//   };

//   res = await client.execute(
//     senderAddress,
//     contractAddress,
//     submitOrder1,
//     'auto',
//     '',
//     [coin(100, "usdt")],
//   );
//   console.log("Submit order 1 res:");
//   console.log(res);
  
  
//   const submitOrder2: ExecuteMsg = {
//     submit_order: {
//       assets: [
//         {
//           amount: "100",
//           info: {
//             native_token: {
//               denom: "usdt"
//             }
//           }
//         },
//         {
//           amount: "610",
//           info: {
//             native_token: {
//               denom: "orai"
//             }
//           }
//         },
//       ],
//       direction: "buy"
//     }
//   };
//   res = await client.execute(
//     senderAddress,
//     contractAddress,
//     submitOrder2,
//     'auto',
//     '',
//     [coin(100, "usdt")],
//   );
//   console.log("Submit order 2 res:");
//   console.log(res);

//   const submitOrder3: ExecuteMsg = {
//     submit_order: {
//       assets: [
//         {
//           amount: "100",
//           info: {
//             native_token: {
//               denom: "usdt"
//             }
//           }
//         },
//         {
//           amount: "600",
//           info: {
//             native_token: {
//               denom: "orai"
//             }
//           }
//         },
//       ],
//       direction: "sell"
//     }
//   };

//   res = await client.execute(
//     senderAddress,
//     contractAddress,
//     submitOrder3,
//     'auto',
//     '',
//     [coin(600, "orai")],
//   );
//   console.log("Submit order 3 res:");
//   console.log(res);
  
//   const submitOrder4: ExecuteMsg = {
//     submit_order: {
//       assets: [
//         {
//           amount: "100",
//           info: {
//             native_token: {
//               denom: "usdt"
//             }
//           }
//         },
//         {
//           amount: "610",
//           info: {
//             native_token: {
//               denom: "orai"
//             }
//           }
//         },
//       ],
//       direction: "sell"
//     }
//   };
//   res = await client.execute(
//     senderAddress,
//     contractAddress,
//     submitOrder4,
//     'auto',
//     '',
//     [coin(610, "orai")],
//   );
//   console.log("Submit order 4 res:");
//   console.log(res);
// }

// export async function queryContract(
//   client: SigningCosmWasmClient,
//   contractAddress: string,
// ) {
  
//   const queryOrderbookpair: QueryMsg = {
//     order_book: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "orai"
//           },
//         },
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         }
//       ]
//     },
//   };
//   const query_pair = await client.queryContractSmart(
//     contractAddress,
//     queryOrderbookpair
//   );
//   console.log(query_pair);

//   const queryOrder_1: QueryMsg = {
//     order: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "orai"
//           },
//         },
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         }
//       ],
//       order_id: 1
//     }
//   }
//   const query_order_res = await client.queryContractSmart(
//     contractAddress,
//     queryOrder_1
//   );
//   console.log(query_order_res);

//   const queryOrder_2: QueryMsg = {
//     order: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "orai"
//           },
//         },
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         }
//       ],
//       order_id: 2
//     }
//   }
//   const query_order_2 = await client.queryContractSmart(
//     contractAddress,
//     queryOrder_2
//   );
//   console.log(query_order_2);

//   const queryOrder_3: QueryMsg = {
//     order: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "orai"
//           },
//         },
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         }
//       ],
//       order_id: 3
//     }
//   }
//   const query_order_3 = await client.queryContractSmart(
//     contractAddress,
//     queryOrder_3
//   );
//   console.log(query_order_3);

//   const queryOrder_4: QueryMsg = {
//     order: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "orai"
//           },
//         },
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         }
//       ],
//       order_id: 4
//     }
//   }
//   const query_order_4 = await client.queryContractSmart(
//     contractAddress,
//     queryOrder_4
//   );
//   console.log(query_order_4);

//   const queryOrder_tick: QueryMsg = {
//     ticks: {
//       asset_infos: [
//         {
//           native_token: {
//             denom: "usdt"
//           },
//         },
//         {
//           native_token: {
//             denom: "orai"
//           },
//         }
//       ],
//       direction: "sell",
//       limit: 10,
//       order_by: 1,
//     }
//   }
//   const query_tick = await client.queryContractSmart(
//     contractAddress,
//     queryOrder_tick
//   );
//   console.log('tick',query_tick);
//   return query_pair;
}