import Response from '@/common/response';
import { cryptos } from '@/common/constants/constants'
import { actions } from '@/common/constants/constants'

export const getAvailableCoins = (transactions) => {
    const response = new Response(null, null, null);

    if (transactions === null) {
        response.status = false;
        response.message = "No se ingresaron transacciones para consultar la cantidad disponible.";
        response.body = null;
        return response;
    }

    var availableCoins = [
        {
            crypto: cryptos.BITCOIN.code,
            amount: 0,
        },
        {
            crypto: cryptos.ETHEREUM.code,
            amount: 0,
        },
        {
            crypto: cryptos.USD_COIN.code,
            amount: 0,
        },
        {
            crypto: cryptos.USD_TETHER.code,
            amount: 0,
        },
    ];

    // Iterating the transactions.
    transactions.forEach(function (item) {
        // Get the index.
        const i = availableCoins.findIndex(x => x.crypto === item.crypto_code);

        if (i !== null && i >= 0) {
            // Increase purchase amount.
            if (item.action === actions.PURCHASE) {
                availableCoins[i] = {
                    crypto: availableCoins[i].crypto,
                    amount: Math.max(0, parseFloat(availableCoins[i].amount) + parseFloat(item.crypto_amount)),
                };
            }

            // Increase quantity sold.
            if (item.action === actions.SALE) {
                availableCoins[i] = {
                    crypto: availableCoins[i].crypto,
                    amount: Math.max(0, parseFloat(availableCoins[i].amount) - parseFloat(item.crypto_amount)),
                };
            }
        }
    });

    // Fill the response.
    response.status = true;
    response.message = "Ok";
    response.body = availableCoins;

    // Return the response.
    return response;
}

export const getAvailableCoinsByCrypto = (crypto, transactions) => {
    // Set the response.
    var response = {
        availableAmount: null,
        message: null,
        succesfull: null,
    }

    if (crypto === null) {
        response.availableAmount = null;
        response.message = "No se ingreso una cripto para consultar la cantidad disponible.";
        response.succesfull = false;
        return response;
    }

    if (transactions === null) {
        response.availableAmount = null;
        response.message = "No se ingresaron transacciones para consultar la cantidad disponible.";
        response.succesfull = false;
        return response;
    }

    // Purchased amount and Quantity sold.
    var purchasedAmount = 0;
    var quantitySold = 0;

    // Iterating the transactions.
    transactions.forEach(function (item) {
        if (item.crypto_code === crypto) {
            // Increase purchase amount.
            if (item.action === actions.PURCHASE) {
                purchasedAmount = parseFloat(purchasedAmount) + parseFloat(item.crypto_amount);
            }

            // Increase quantity sold.
            if (item.action === actions.SALE) {
                quantitySold = parseFloat(quantitySold) + parseFloat(item.crypto_amount);
            }
        }
    });

    // Available amount.
    var availableAmount = purchasedAmount - quantitySold;

    // Fill the response.
    response.availableAmount = availableAmount;
    response.message = "Ok";
    response.succesfull = true;

    // Return the response.
    return response;
}