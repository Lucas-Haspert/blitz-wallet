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
    ARGENBTC: {
        key: "ARGENBTC",
        title: "ArgenBTC",
        coin: "btc, dai",
        fiat: "ars",
        resourcepath: "/argenbtc",
    },
    SATOSHITANGO: {
        key: "SATOSHITANGO",
        title: "SatoshiTango",
        coin: "btc, eth, dai, usdc, xrp, bch, ltc, ada, sol, xlm",
        fiat: "ars, clp, mxn, pen, usd",
        resourcepath: "/satoshitango",
    },
}