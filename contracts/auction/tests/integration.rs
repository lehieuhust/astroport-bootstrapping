use astroport_periphery::auction::{
    CallbackMsg, ConfigResponse, Cw20HookMsg, ExecuteMsg, InstantiateMsg, QueryMsg, StateResponse,
    UpdateConfigMsg, UserInfoResponse,
};
use cosmwasm_bignumber::Uint256;
use cosmwasm_std::testing::{mock_env, MockApi, MockQuerier, MockStorage};
use cosmwasm_std::{attr, Addr, Timestamp, Uint128};
use terra_multi_test::{App, BankKeeper, ContractWrapper, Executor, TerraMockQuerier};

fn mock_app() -> App {
    let api = MockApi::default();
    let env = mock_env();
    let bank = BankKeeper::new();
    let storage = MockStorage::new();
    let tmq = TerraMockQuerier::new(MockQuerier::new(&[]));

    App::new(api, env.block, bank, storage, tmq)
}

fn init_contracts(app: &mut App) -> (Addr, Addr, InstantiateMsg) {
    let owner = Addr::unchecked("contract_owner");

    // ################################
    // Instantiate ASTRO Token Contract
    // ################################
    let astro_token_contract = Box::new(ContractWrapper::new(
        cw20_base::contract::execute,
        cw20_base::contract::instantiate,
        cw20_base::contract::query,
    ));

    let astro_token_code_id = app.store_code(astro_token_contract);

    let msg = cw20_base::msg::InstantiateMsg {
        name: String::from("Astro token"),
        symbol: String::from("ASTRO"),
        decimals: 6,
        initial_balances: vec![],
        mint: Some(cw20::MinterResponse {
            minter: owner.to_string(),
            cap: None,
        }),
        marketing: None,
    };

    let astro_token_instance = app
        .instantiate_contract(
            astro_token_code_id,
            owner.clone(),
            &msg,
            &[],
            String::from("ASTRO"),
            None,
        )
        .unwrap();

    // ################################
    // Instantiate Airdrop Contract
    // ################################
    // let airdrop_contract = Box::new(ContractWrapper::new(
    //     astro_airdrop::contract::execute,
    //     astro_airdrop::contract::instantiate,
    //     astro_airdrop::contract::query,
    // ));

    // let airdrop_code_id = app.store_code(airdrop_contract);

    // let aidrop_instantiate_msg = astroport_periphery::airdrop::InstantiateMsg {
    //     owner: Some(owner.clone().to_string()),
    //     astro_token_address: astro_token_instance.clone().into_string(),
    //     terra_merkle_roots: Some(vec!["terra_merkle_roots".to_string()]),
    //     evm_merkle_roots: Some(vec!["evm_merkle_roots".to_string()]),
    //     from_timestamp: Some(1_000_00),
    //     to_timestamp: 100_000_00,
    //     boostrap_auction_address: String::from("boostrap_auction_address"),
    //     total_airdrop_size: Uint128::new(100_000_000_000),
    // };

    // // Init contract
    // let airdrop_instance = app
    //     .instantiate_contract(
    //         airdrop_code_id,
    //         owner.clone(),
    //         &aidrop_instantiate_msg,
    //         &[],
    //         "airdrop",
    //         None,
    //     )
    //     .unwrap();

    // ################################
    // Instantiate Lockdrop Contract
    // ################################
    // let lockdrop_contract = Box::new(ContractWrapper::new(
    //     lockdrop::contract::execute,
    //     lockdrop::contract::instantiate,
    //     lockdrop::contract::query,
    // ));

    // let lockdrop_code_id = app.store_code(lockdrop_contract);

    // let lockdrop_instantiate_msg = astroport_periphery::lockdrop::InstantiateMsg {
    //     owner: owner.clone().to_string(),
    //     astro_token_address: Some(astro_token_instance.clone().into_string()),
    //     auction_contract_address: None,
    //     generator_address: None,
    //     init_timestamp: Some(1_000_00),
    //     deposit_window: 100_000_00,
    //     withdrawal_window: 5_000_00,
    //     min_duration: 1u64,
    //     max_duration: 51u64,
    //     seconds_per_week: 51u64,
    //     weekly_multiplier: "0.076",
    //     lockdrop_incentives: Uint256::from(1000000000000u64),
    // };

    // Init contract
    // let lockdrop_instance = app
    //     .instantiate_contract(
    //         lockdrop_code_id,
    //         owner.clone(),
    //         &lockdrop_instantiate_msg,
    //         &[],
    //         "lockdrop",
    //         None,
    //     )
    //     .unwrap();

    // ################################
    // Instantiate Auction Contract
    // ################################
    let auction_contract = Box::new(ContractWrapper::new(
        astro_auction::contract::execute,
        astro_auction::contract::instantiate,
        astro_auction::contract::query,
    ));

    let auction_code_id = app.store_code(auction_contract);

    let auction_instantiate_msg = astroport_periphery::auction::InstantiateMsg {
        owner: owner.clone().to_string(),
        astro_token_address: astro_token_instance.clone().into_string(),
        airdrop_contract_address: "airdrop_instance".to_string(), // airdrop_instance.clone().into_string(),
        lockdrop_contract_address: "lockdrop_instance".to_string(), // lockdrop_instance.clone().into_string(),
        astroport_lp_pool: None,
        lp_token_address: None,
        generator_contract: None,
        astro_rewards: Uint256::from(1000000000000u64),
        astro_vesting_duration: 864000u64,
        lp_tokens_vesting_duration: 7776000u64,
        init_timestamp: 1_000_00,
        deposit_window: 100_000_00,
        withdrawal_window: 5_000_00,
    };

    // Init contract
    let auction_instance = app
        .instantiate_contract(
            auction_code_id,
            owner.clone(),
            &auction_instantiate_msg,
            &[],
            "auction",
            None,
        )
        .unwrap();

    (
        auction_instance,
        astro_token_instance,
        auction_instantiate_msg,
    )
}