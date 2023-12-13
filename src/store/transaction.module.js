import axios from "axios";
import { getStatusCodeInfo } from '@/common/helpers/http'
import { getAvailableCoinsByCrypto } from '@/common/helpers/crypto'
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
        UPDATE_TRANSACTION_FROM_HISTORY(state, updatedTransaction) {
            const index = state.historicalTransactions.findIndex(transaction => transaction._id === updatedTransaction._id);

            if (index !== -1) {
                state.historicalTransactions[index] = { ...state.historicalTransactions[index], ...updatedTransaction };
            }
        },
        REMOVE_TRANSACTION_FROM_HISTORY(state, transactionId) {
            state.historicalTransactions = state.historicalTransactions.filter(transaction => transaction._id !== transactionId);
        },
    },
    actions: {
        async getHistoricalTransactions({ commit }, username) {
            commit('loading/loadingStatus', true, { root: true });

            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

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
        async updateTransaction({ commit }, transaction) {
            commit('loading/loadingStatus', true, { root: true });
            
            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            await apiClientLab.patch(`transactions/${transaction._id}`, transaction).then((result) => {
                if (result.status >= 200 && result.status < 300) {
                    commit('UPDATE_TRANSACTION_FROM_HISTORY', transaction);
                }
            }, (error) => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            commit('loading/loadingStatus', false, { root: true });
        },
        async deleteTransaction({ commit }, idTransaction) {
            commit('loading/loadingStatus', true, { root: true });

            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            await apiClientLab.delete(`transactions/${idTransaction}`)
                .then((result) => {
                    if (result.status >= 200 && result.status < 300) {
                        commit('REMOVE_TRANSACTION_FROM_HISTORY', idTransaction);
                    }
                }, (error) => {
                    commit('loading/loadingStatus', false, { root: true });
                    throw new Error(`API ${error}`);
                });

            commit('loading/loadingStatus', false, { root: true });
        },
        async buy({ commit }, { cryptoAmount, cryptoCode, exchangeUrl }) {
            commit('loading/loadingStatus', true, { root: true });

            if (cryptoAmount === null || cryptoAmount === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cantidad a comprar.";
            }

            if (isNaN(cryptoAmount)) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso un número como una cantidad a comprar.";
            }

            if (parseFloat(cryptoAmount) === 0 || parseFloat(cryptoAmount) < 0) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cantidad positiva a comprar.";
            }

            if (cryptoCode === null || cryptoCode === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cripto a comprar.";
            }

            if (exchangeUrl === null || exchangeUrl === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso un exchange.";
            }

            var amountToBuy = parseFloat(cryptoAmount);
            var cryptoToBuy = cryptoCode;

            if (localStorage.getItem('funds') === null || localStorage.getItem('funds') === '' || parseInt(localStorage.getItem('funds')) === 0) {
                commit('loading/loadingStatus', false, { root: true });
                return "No hay fondos cargados.";
            }

            var availableFunds = parseInt(localStorage.getItem('funds'));

            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/' + exchangeUrl + '/' + cryptoToBuy + '/' + 'ars' + '/' + '1',
            });

            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            if (apiResponseCY.data === null || apiResponseCY.data['totalAsk'] === null) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se pudo obtener el precio de la criptomoneda.";
            }

            if (isNaN(apiResponseCY.data['totalAsk'])) {
                commit('loading/loadingStatus', false, { root: true });
                return "El precio de la criptomoneda no es un número.";
            }

            var purchaseCost = (amountToBuy * parseFloat(apiResponseCY.data['totalAsk'])).toFixed(2);

            if (purchaseCost > availableFunds) {
                commit('loading/loadingStatus', false, { root: true });
                return "No hay fondos suficientes para realizar la compra.";
            }

            let transaction = {
                "user_id": localStorage.getItem('username'),
                "action": actions.PURCHASE,
                "crypto_code": cryptoToBuy,
                "crypto_amount": amountToBuy,
                "money": purchaseCost,
                "datetime": new Date().toJSON().toString().substring(0, 19).replace("T", " "),
            };

            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            var apiResponseLab = await apiClientLab.post("transactions", transaction)
                .then((result) => {
                    return result;
                }, (error) => {
                    commit('loading/loadingStatus', false, { root: true });
                    throw new Error(`API ${error}`);
                });

            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            if (apiResponseLab.status === 200 || apiResponseLab.status === 201 || apiResponseLab.status === 202) {
                commit('account/UPDATE_FUNDS_BY_PURCHASE', purchaseCost, { root: true });
            } else {
                commit('loading/loadingStatus', false, { root: true });
                return "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP;
            }

            commit('loading/loadingStatus', false, { root: true });

            return "Operación exitosa: ¡Se ha realizado la compra!";
        },
        async sell({ commit }, { cryptoAmount, cryptoCode, exchangeUrl }) {
            commit('loading/loadingStatus', true, { root: true });

            if (cryptoAmount === null || cryptoAmount === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cantidad a vender.";
            }

            if (isNaN(cryptoAmount)) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso un número como una cantidad a vender.";
            }

            if (parseFloat(cryptoAmount) === 0 || parseFloat(cryptoAmount) < 0) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cantidad positiva a vender.";
            }

            if (cryptoCode === null || cryptoCode === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso una cripto a vender.";
            }

            if (exchangeUrl === null || exchangeUrl === '') {
                commit('loading/loadingStatus', false, { root: true });
                return "No se ingreso un exchange.";
            }

            var amountToSell = parseFloat(cryptoAmount);
            var cryptoToSell = cryptoCode;

            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/' + exchangeUrl + '/' + cryptoToSell + '/' + 'ars' + '/' + '1',
            });

            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            if (apiResponseCY.data === null || apiResponseCY.data['totalBid'] === null) {
                commit('loading/loadingStatus', false, { root: true });
                return "No se pudo obtener el precio de la criptomoneda.";
            }

            if (isNaN(apiResponseCY.data['totalBid'])) {
                commit('loading/loadingStatus', false, { root: true });
                return "El precio de la criptomoneda no es un número.";
            }

            var saleProfit = (amountToSell * parseFloat(apiResponseCY.data['totalBid'])).toFixed(2);

            const apiClientLab = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

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

            let historicalTransactions = apiResponseLab.data;
            var availableCoins = getAvailableCoinsByCrypto(cryptoToSell, historicalTransactions);

            if (!availableCoins.succesfull) {
                commit('loading/loadingStatus', false, { root: true });
                return "Error: " + availableCoins.message;
            }

            if (availableCoins.availableAmount === 0) {
                commit('loading/loadingStatus', false, { root: true });
                return "Advertencia: " + "No hay un monto disponible para realizar la venta.";
            }

            if (availableCoins.availableAmount <= 0) {
                commit('loading/loadingStatus', false, { root: true });
                return "Error: " + "Monto disponible negativo.";
            }

            if (availableCoins.availableAmount < amountToSell) {
                commit('loading/loadingStatus', false, { root: true });
                return "Error: " + "Monto insuficiente para realizar la venta.";
            }

            let transaction = {
                "user_id": localStorage.getItem('username'),
                "action": actions.SALE,
                "crypto_code": cryptoToSell,
                "crypto_amount": amountToSell,
                "money": saleProfit,
                "datetime": new Date().toJSON().toString().substring(0, 19).replace("T", " "),
            };

            apiResponseLab = await apiClientLab.post("transactions", transaction)
                .then((result) => {
                    return result;
                }, (error) => {
                    commit('loading/loadingStatus', false, { root: true });
                    throw new Error(`API ${error}`);
                });

            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            if (apiResponseLab.status === 200 || apiResponseLab.status === 201 || apiResponseLab.status === 202) {
                commit('account/UPDATE_FUNDS_BY_SALE', saleProfit, { root: true });
            } else {
                commit('loading/loadingStatus', false, { root: true });
                return "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP;
            }

            commit('loading/loadingStatus', false, { root: true });

            return "Operación exitosa: ¡Se ha realizado la venta!";
        },
        resetState({ commit }) {
            commit('RESET_HISTORICAL_TRANSACTIONS');
        },
    },
}