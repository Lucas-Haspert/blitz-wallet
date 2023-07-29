import { actions } from '@/common/constants/constants'

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
    transactions.forEach(function(item) {
        if (item.crypto_code === crypto) {
            // Increase purchase amount.
            if (item.action === actions.PURCHASE) {
                purchasedAmount = purchasedAmount + item.crypto_amount;
            }

            // Increase quantity sold.
            if (item.action === actions.SALE) {
                quantitySold = quantitySold + item.crypto_amount;
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