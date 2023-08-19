export const actions = {
    PURCHASE: "purchase",
    SALE: "sale",
}

export const cryptos = {
    BITCOIN: {
        key: "BITCOIN",
        name: "Bitcoin",
        code: "btc",
    },
    ETHEREUM: {
        key: "ETHEREUM",
        name: "Ethereum",
        code: "eth",
    },
    USD_COIN: {
        key: "USD_COIN",
        name: "USD Coin",
        code: "usdc",
    },
    USD_TETHER: {
        key: "USD_TETHER",
        name: "USD Tether",
        code: "usdt",
    },
}

export const exchanges = {
    BITSO: {
        key: "BITSO",
        name: "Bitso",
        code: "bitso",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "bitso",
    },
    BUENBIT: {
        key: "BUENBIT",
        name: "Buenbit",
        code: "buenbit",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "buenbit",
    },
    CRYPTOMARKET: {
        key: "CRYPTOMARKET",
        name: "CryptoMarket",
        code: "cryptomarket",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "cryptomkt",
    },
    LEMONCASH: {
        key: "LEMONCASH",
        name: "Lemon Cash",
        code: "lemoncash",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "lemoncash",
    },
    RIPIO: {
        key: "RIPIO",
        name: "Ripio",
        code: "ripio",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "ripio",
    },
    SATOSHITANGO: {
        key: "SATOSHITANGO",
        title: "SatoshiTango",
        code: "satoshitango",
        coin: ["btc", "eth", "usdc", "usdt"],
        fiat: "ars",
        resourcepath: "satoshitango",
    },
}