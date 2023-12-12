import axios from "axios";

export default {
    namespaced: true,
    state: {
        currencies: [],
    },
    getters: {
        currencies: state => {
            return state.currencies;
        },
    },
    mutations: {
        SET_CURRENCIES(state, currencies) {
            state.currencies = currencies;
        },
        RESET_CURRENCIES(state) {
            state.currencies = [];
        },
    },
    actions: {
        async getAll({ commit }) {
            commit('loading/loadingStatus', true, { root: true })

            const apiClient = axios.create({
                baseURL: 'https://criptoya.com/api/bancostodos',
            });

            await apiClient.get().then(result => {
                commit('SET_CURRENCIES', result.data);
                commit('loading/loadingStatus', false, { root: true })
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true })
                throw new Error(`API ${error}`);
            });
        },
        resetState({ commit }) {
            commit('RESET_CURRENCIES');
        },
    },
}