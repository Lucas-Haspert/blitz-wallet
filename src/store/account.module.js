import axios from "axios";
import Response from '@/common/response';
import { getStatusCodeInfo } from '@/common/helpers/http'
import { getSoldCryptos } from '@/common/helpers/crypto'
import { getTotalPurchaseAmount } from '@/common/helpers/crypto'

export default {
    namespaced: true,
    state: {
        username: localStorage.getItem('username'),
        logged: localStorage.getItem('logged'),
        funds: localStorage.getItem('funds'),
        coins: localStorage.getItem('coins'),
    },
    getters: {
        username: state => {
            return state.username;
        },
        logged: state => {
            return state.logged;
        },
        funds: state => {
            return state.funds;
        },
        coins: state => {
            return state.coins;
        },
    },
    mutations: {
        LOGIN(state, username) {
            // Clear the localStorage.
            localStorage.clear();

            // Save the account in localStorage.
            localStorage.setItem('username', username);
            localStorage.setItem('logged', true);
            localStorage.setItem('funds', 0);
            localStorage.setItem('coins', []);

            // Update state.
            state.username = localStorage.getItem('username');
            state.logged = localStorage.getItem('logged');
            state.funds = localStorage.getItem('funds');
            state.coins = localStorage.getItem('coins');
        },
        LOGOUT(state) {
            // Clear the localStorage.
            localStorage.clear();

            // Update state.
            state.username = null;
            state.logged = null;
            state.funds = null;
            state.coins = null;
        },
        LOAD_FUNDS(state, amount) {
            // Update and save the funds in localStorage.
            localStorage.setItem('funds', (parseFloat(localStorage.getItem('funds')) + parseFloat(amount)).toFixed(2));

            // Update state.
            state.funds = localStorage.getItem('funds');
        },
        UPDATE_FUNDS_BY_PURCHASE(state, amount) {
            // Update and save the funds in localStorage.
            localStorage.setItem('funds', (parseFloat(localStorage.getItem('funds')) - parseFloat(amount)).toFixed(2));

            // Update state.
            state.funds = localStorage.getItem('funds');
        },
        UPDATE_FUNDS_BY_SALE(state, amount) {
            // Update and save the funds in localStorage.
            localStorage.setItem('funds', (parseFloat(localStorage.getItem('funds')) + parseFloat(amount)).toFixed(2));

            // Update state.
            state.funds = localStorage.getItem('funds');
        },
    },
    actions: {
        login({ commit }, { username }) {
            commit('LOGIN', username);
        },
        logout({ commit }) {
            commit('LOGOUT');
        },
        loadFunds({ commit }, { amount }) {
            commit('LOAD_FUNDS', amount);
        },
        async getInvestmentsResume({ commit }, { cryptoCode }) {
            commit('loading/loadingStatus', true, { root: true });

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

            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            if (statusResponse.statusCode !== 200 && statusResponse.statusCode !== 201 && statusResponse.statusCode !== 202) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP, null);
                return response;
            }

            if (apiResponseLab.data === null || apiResponseLab.data.length === 0) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No hay transacciones realizadas para poder realizar un balance.", null);
                return response;
            }

            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/satoshitango/' + cryptoCode + '/ars/1',
            });

            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            if (apiResponseCY.data === null || apiResponseCY.data['totalBid'] === null) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se pudo obtener el precio de venta de la criptomoneda.", null);
                return response;
            }

            if (isNaN(apiResponseCY.data['totalBid'])) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "El precio de venta de la criptomoneda no es un número.", null);
                return response;
            }

            // Formule for the balance.
            // Balance = (Cantidad de criptomonedas vendidas × Valor actual) − (Cantidad de criptomonedas compradas × Valor al momento de la compra)
            // Balance = (Cantidad de criptomonedas vendidas × Valor actual) − (Monto)

            var saleValue = (parseFloat(apiResponseCY.data['totalBid'])).toFixed(2);
            var soldCryptos = getSoldCryptos(apiResponseLab.data);
            var totalPurchaseAmount = getTotalPurchaseAmount(apiResponseLab.data, cryptoCode);

            const totalBalance = ((soldCryptos.find(element => element.crypto === cryptoCode).amount * saleValue) - totalPurchaseAmount).toFixed(2);
            const dailyCryptoBalance = {};

            apiResponseLab.data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

            apiResponseLab.data.forEach((transaccion) => {
                if (transaccion.crypto_code === cryptoCode) {
                    const fecha = transaccion.datetime.split('T')[0];

                    if (!dailyCryptoBalance[fecha]) {
                        dailyCryptoBalance[fecha] = 0;
                    }

                    if (transaccion.action === 'purchase') {
                        dailyCryptoBalance[fecha] += transaccion.crypto_amount;
                    } else if (transaccion.action === 'sale') {
                        dailyCryptoBalance[fecha] -= transaccion.crypto_amount;
                    }
                }
            });

            commit('loading/loadingStatus', false, { root: true });
            const response = new Response(true, null, { totalBalance: totalBalance, dailyCryptoBalance: dailyCryptoBalance, });
            return response;
        },
    },
}
