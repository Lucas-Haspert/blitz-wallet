import axios from "axios";
import { getStatusCodeInfo } from '@/common/helpers/http'
import { getAvailableCoinsByCrypto } from '@/common/helpers/coin'
import { actions } from '@/common/constants/constants'

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
            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            // Get the historical transactions.
            await apiClientLab.get("transactions", {
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
        async buy({ commit }, { cryptoAmount, cryptoCode, exchangeUrl }) {
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

            // Check the cryptoAmount.
            if (parseFloat(cryptoAmount) === 0 || parseFloat(cryptoAmount) < 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cantidad positiva a comprar.";
            }

            // Check the cryptoCode.
            if (cryptoCode === null || cryptoCode === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cripto a comprar.";
            }

            // Check the exchangeUrl.
            if (exchangeUrl === null || exchangeUrl === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso un exchange.";
            }

            var amountToBuy = parseFloat(cryptoAmount);
            var cryptoToBuy = cryptoCode;

            // Check if funds are available.
            if (localStorage.getItem('funds') === null || localStorage.getItem('funds') === '' || parseInt(localStorage.getItem('funds')) === 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No hay fondos cargados.";
            }

            // Get the available funds.
            var availableFunds = parseInt(localStorage.getItem('funds'));

            // Set the apiClient.
            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/' + exchangeUrl + '/' + cryptoToBuy + '/' + 'ars' + '/' + '1',
            });

            // Get the exchanges.
            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            // Check the apiResponseCY.
            if (apiResponseCY.data === null || apiResponseCY.data['ask'] === null) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se pudo obtener el precio de la criptomoneda.";
            }

            // Check if the apiResponseCY is a number.
            if (isNaN(apiResponseCY.data['ask'])) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "El precio de la criptomoneda no es un número.";
            }

            // Get the purchase cost.
            var purchaseCost = (amountToBuy * parseFloat(apiResponseCY.data['ask'])).toFixed(2);

            // Check if the purchase can be made.
            if (purchaseCost > availableFunds) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No hay fondos suficientes para realizar la compra.";
            }
            
            // Set the transaction.
            let transaction = {
                "user_id": localStorage.getItem('username'),
                "action": actions.PURCHASE,
                "crypto_code": cryptoToBuy,
                "crypto_amount": amountToBuy,
                "money": purchaseCost,
                "datetime": new Date().toJSON().toString().substring(0, 19).replace("T", " "),
            };

            // Set the apiClient.
            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });
            
            // Perform the transaction.
            var apiResponseLab = await apiClientLab.post("transactions", transaction)
            .then((result) => {
                return result;
            }, (error) => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });
            
            // Process the response.
            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            // Process the response.
            if (apiResponseLab.status === 200 || apiResponseLab.status === 201 || apiResponseLab.status === 202) {
                // Update account funds.
                commit('account/UPDATE_FUNDS_BY_PURCHASE', purchaseCost, { root: true });
            } else {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP;
            }
  
            // Change the loadingStatus.
            commit('loading/loadingStatus', false, { root: true });
            
            // Return the response message.
            return "Operación exitosa: ¡Se ha realizado la compra!";
        },
        async sell({ commit }, { cryptoAmount, cryptoCode, exchangeUrl }) {
            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true });

            // Check the cryptoAmount.
            if (cryptoAmount === null || cryptoAmount === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cantidad a vender.";
            }

            // Check if the cryptoAmount is a number.
            if (isNaN(cryptoAmount)) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso un número como una cantidad a vender.";
            }

            // Check the cryptoAmount.
            if (parseFloat(cryptoAmount) === 0 || parseFloat(cryptoAmount) < 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cantidad positiva a vender.";
            }

            // Check the cryptoCode.
            if (cryptoCode === null || cryptoCode === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso una cripto a vender.";
            }

            // Check the exchangeUrl.
            if (exchangeUrl === null || exchangeUrl === '') {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se ingreso un exchange.";
            }

            // Setting variables to perform calculations.
            var amountToSell = parseFloat(cryptoAmount);
            var cryptoToSell = cryptoCode;

            // Set the apiClient.
            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/' + exchangeUrl + '/' + cryptoToSell + '/' + 'ars' + '/' + '1',
            });

            // Get the exchanges.
            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            // Check the apiResponseCY.
            if (apiResponseCY.data === null || apiResponseCY.data['bid'] === null) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "No se pudo obtener el precio de la criptomoneda.";
            }

            // Check if the apiResponseCY is a number.
            if (isNaN(apiResponseCY.data['bid'])) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "El precio de la criptomoneda no es un número.";
            }

            // Get the sale profit.
            var saleProfit = (amountToSell * parseFloat(apiResponseCY.data['bid'])).toFixed(2);

            // Set the apiClient.
            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            // Get the historical transactions.
            var apiResponseLab = await apiClientLab.get("transactions", {
                params: {
                    q: `{"user_id": "${localStorage.getItem('username')}"}`
                }
            }).then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            // Set the historicalTransactions.
            let historicalTransactions = apiResponseLab.data;

            // Get the availableCoins.
            var availableCoins = getAvailableCoinsByCrypto(cryptoToSell, historicalTransactions);
            
            // Check the availableCoins.
            if (!availableCoins.succesfull) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + availableCoins.message;
            }

            // Check the availableCoins.
            if (availableCoins.availableAmount === 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Advertencia: " + "No hay un monto disponible para realizar la venta.";
            }

            // Check the availableCoins.
            if (availableCoins.availableAmount <= 0) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + "Monto disponible negativo.";
            }

            // Check the availableCoins.
            if (availableCoins.availableAmount < amountToSell) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + "Monto insuficiente para realizar la venta.";
            }

            // Set the transaction.
            let transaction = {
                "user_id": localStorage.getItem('username'),
                "action": actions.SALE,
                "crypto_code": cryptoToSell,
                "crypto_amount": amountToSell,
                "money": saleProfit,
                "datetime": new Date().toJSON().toString().substring(0, 19).replace("T", " "),
            };
                        
            // Perform the transaction.
            apiResponseLab = await apiClientLab.post("transactions", transaction)
            .then((result) => {
                return result;
            }, (error) => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });
            
            // Process the response.
            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            // Process the response.
            if (apiResponseLab.status === 200 || apiResponseLab.status === 201 || apiResponseLab.status === 202) {
                // Update account funds.
                commit('account/UPDATE_FUNDS_BY_SALE', saleProfit, { root: true });
            } else {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP;
            }

            // Change the loadingStatus.
            commit('loading/loadingStatus', false, { root: true });
            
            // Return the response message.
            return "Operación exitosa: ¡Se ha realizado la venta!";
        },
        resetState({ commit }) {
            // Reset the historical transactions.
            commit('RESET_HISTORICAL_TRANSACTIONS');
        },
    },
}