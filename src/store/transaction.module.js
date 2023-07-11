import axios from "axios";
import { getStatusCodeInfo } from '@/common/helpers/http'

export default {
    namespaced: true,
    state: {
        transaction: {
            id: null,
            cryptoCode: null,
            cryptoAmount: null,
            money: null,
            idUser: null,
            action: null,
            datetime: null,
        },
        historicalTransactions: [],
        exchange: {
            ask: null,
            totalAsk: null,
            bid: null,
            totalBid: null,
            time: null,
        },
        exchanges: [],
    },
    getters: {
        historicalTransactions: state => {
            return state.historicalTransactions;
        }
    },
    mutations: {
        SET_HISTORICAL_TRANSACTIONS(state, historicalTransactions) {
            // Sort the historical transactions by datetime (desc).
            historicalTransactions.sort(function (a, b) {
                return b.datetime.localeCompare(a.datetime);
            });

            state.historicalTransactions = historicalTransactions;
        },
        RESET_HISTORICAL_TRANSACTIONS(state) {
            state.historicalTransactions = [];
        },
        SET_EXCHANGES(state, exchanges) {
            state.exchanges = exchanges;
        },
        RESET_EXCHANGES(state) {
            state.exchanges = [];
        },
        SET_EXCHANGE(state, exchange) {
            state.exchange = exchange;
        },
        RESET_EXCHANGE(state) {
            state.exchange = null;
        },
    },
    actions: {
        async getHistoricalTransactions({ commit }, username) {
            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true });

            // Set the apiClient.
            const apiClient = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            // Get the historical transactions.
            await apiClient.get("transactions", {
                params: {
                    q: `{"user_id": "${username}"}`
                }
            }).then(result => {
                commit('SET_HISTORICAL_TRANSACTIONS', result.data);
                commit('loading/loadingStatus', false, { root: true });
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });
        },
        async buy({ commit }, { cryptoAmount, cryptoCode }) {
            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true });

            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true });

            // Check the cryptoAmount.
            if (cryptoAmount === null || cryptoAmount === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cantidad a comprar.";
            }

            // Check if the cryptoAmount is a number.
            if (isNaN(cryptoAmount)) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso un número como una cantidad a comprar.";
            }

            // Check the cryptoCode.
            if (cryptoCode === null || cryptoCode === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cripto a comprar.";
            }

            // Setting variables to perform calculations.
            var amountToBuy = parseFloat(cryptoAmount);
            var cryptoToBuy = cryptoCode;
            var availableFunds = null;
            var purchaseCost = null;

            // Check if funds are available.
            if (localStorage.getItem('funds') === null || localStorage.getItem('funds') === '' || parseInt(localStorage.getItem('funds')) === 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No hay fondos cargados.";
            }

            // Get the available funds.
            availableFunds = parseInt(localStorage.getItem('funds'));

            // Set the apiClient.
            const apiCrypto = axios.create({
                baseURL: 'https://criptoya.com/api/' + 'argenbtc' + '/' + cryptoToBuy + '/' + 'ars' + '/' + '1',
            });

            // API response.
            var apiCryptoResponse = null;

            // Get the exchanges.
            await apiCrypto.get().then(result => {
                apiCryptoResponse = result.data;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            // Check the apiCryptoResponse.
            if (apiCryptoResponse === null || apiCryptoResponse['ask'] === null) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se pudo obtener el precio de la criptomoneda.";
            }

            // Check if the apiCryptoResponse is a number.
            if (isNaN(apiCryptoResponse['ask'])) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "El precio de la criptomoneda no es un número.";
            }

            // Get the purchase cost.
            purchaseCost = (amountToBuy * parseFloat(apiCryptoResponse['ask'])).toFixed(2);

            // Check if the purchase can be made.
            if (purchaseCost > availableFunds) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No hay fondos suficientes para realizar la compra.";
            }
            
            // Set the transaction.
            let transaction = {
                "user_id": localStorage.getItem('username'),
                "action": "purchase",
                "crypto_code": cryptoToBuy,
                "crypto_amount": amountToBuy,
                "money": purchaseCost,
                "datetime": new Date().toJSON().toString().substring(0, 19).replace("T", " "),
            };

            // Set the apiClient.
            const apiTransaction = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            // API response.
            var apiTransactionResponse = null;
            
            // Perform the transaction.
            await apiTransaction.post("transactions", transaction)
            .then((result) => {
                apiTransactionResponse = result;
            }, (error) => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });
            
            // Process the response.
            var statusResponse = null;

            // Get the statusCodeInfo.
            statusResponse = getStatusCodeInfo(apiTransactionResponse.status.toString().substring());

            // Process the response.
            if (apiTransactionResponse.status === 200 || apiTransactionResponse.status === 201 || apiTransactionResponse.status === 202) {
                // Update account funds.
                commit('account/UPDATE_FUNDS_BY_PURCHASE', purchaseCost, { root: true });

                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });
            } else {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP;
            }
            
            // Return the response message.
            return "Operación exitosa: ¡Se ha realizado la compra!";
        },
        resetState({ commit }) {
            // Reset the historical transactions.
            commit('RESET_HISTORICAL_TRANSACTIONS');
        },
    },
}