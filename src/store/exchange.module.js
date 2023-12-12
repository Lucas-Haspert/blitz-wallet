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
            commit('loading/loadingStatus', true, { root: true })

            const apiClient = axios.create({
                baseURL: 'https://criptoya.com/api/' + coin.toString() + '/' + fiat.toString() + '/' + 1,
            });

            await apiClient.get().then(result => {
                commit('SET_EXCHANGES', result.data);
                commit('loading/loadingStatus', false, { root: true })
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true })
                throw new Error(`API ${error}`);
            });
        },
        resetState({ commit }) {
            commit('RESET_EXCHANGES');
        },
    },
}
