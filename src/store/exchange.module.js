import axios from "axios";

export default {
    namespaced: true,
    state: {
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
        exchanges: state => {
            return state.exchanges;
        }
    },
    mutations: {
        SET_EXCHANGES(state, exchanges) {
            state.exchanges = exchanges;
        },
        RESET_EXCHANGES(state) {
            state.exchanges = [];
        }
    },
    actions: {
        async getAll({ commit }, { fiat, coin }) {
            // Change the loadingStatus
            commit('loading/loadingStatus', true, { root: true })

            // "coin":{str} Cripto a operar.
            // "fiat":{str} Moneda contra la que se opera, puede ser fiat o stablecoin.
            // "volumen":{float} Volumen a operar, utilizar el punto como separador decimal.

            // Set the apiClient
            const apiClient = axios.create({
                baseURL: 'https://criptoya.com/api/' + coin.toString() + '/' + fiat.toString() + '/' + 1,
            });

            // Get the exchanges
            await apiClient.get().then(result => {
                commit('SET_EXCHANGES', result.data);
                commit('loading/loadingStatus', false, { root: true })
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true })
                throw new Error(`API ${error}`);
            });
        },
        resetState({ commit }) {
            // Reset the exchanges
            commit('RESET_EXCHANGES');
        },
    },
}
