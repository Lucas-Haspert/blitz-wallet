export const actions = {
    PURCHASE: "purchase",
    SALE: "sale",
}

export const cryptos = {
    BINANCE_USD: {
        key: "BINANCE_USD",
        name: "Binance USD",
        code: "busd",
    },
    BITCOIN: {
        key: "BITCOIN",
        name: "Bitcoin",
        code: "btc",
    },
    BNB: {
        key: "BNB",
        name: "BNB",
        code: "bnb",
    },
    DOGECOIN: {
        key: "DOGECOIN",
        name: "Dogecoin",
        code: "doge",
    },
    USD_COIN: {
        key: "USD_COIN",
        name: "USD Coin",
        code: "usdc",
    },
}

export const exchanges = {
    /*
    1. Binance USD - BUSD
    2. Bitcoin - BTC
    3. BNB - BNB
    4. Dogecoin - DOGE
    5. USD Coin - USDC
    */
    ARGENBTC: {
        key: "ARGENBTC",
        title: "ArgenBTC",
        coin: ["btc"],
        fiat: "ars",
        resourcepath: "/api/argenbtc",
    },
    BINANCE: {
        key: "BINANCE",
        title: "Binance",
        coin: ["busd", "btc", "bnb"],
        fiat: "ars",
        resourcepath: "/api/binance",
    },
    BITEX: {
        key: "BITEX",
        title: "Bitex",
        coin: ["btc", "usdc"],
        fiat: "ars",
        resourcepath: "/api/bitex",
    },
    BITSO: {
        key: "BITSO",
        title: "Bitso",
        coin: ["busd", "btc", "doge", "usdc"],
        fiat: "ars",
        resourcepath: "/api/bitso",
    },
    BUENBIT: {
        key: "BUENBIT",
        title: "Buenbit",
        coin: ["busd", "btc", "bnb", "usdc"],
        fiat: "ars",
        resourcepath: "/api/buenbit",
    },
    SATOSHITANGO: {
        key: "SATOSHITANGO",
        title: "SatoshiTango",
        coin: ["btc", "doge", "usdc"],
        fiat: "ars",
        resourcepath: "/api/satoshitango",
    },
}