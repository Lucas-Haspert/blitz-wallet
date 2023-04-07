import axios from "axios";

export default {
    namespaced: true,
    state: {
        coins: [],
    },
    getters: {
        coins: state => {
            return state.coins;
        },
    },
    mutations: {
        SET_COINS(state, coins) {
            state.coins = coins;
        },
        RESET_COINS(state) {
            state.coins = [];
        },
    },
    actions: {
        async getAll({ commit }) {
            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true })

            // Set the apiClient.
            const apiClient = axios.create({
                baseURL: 'https://criptoya.com/api/bancostodos',
            });

            // Get the coins.
            await apiClient.get().then(result => {
                commit('SET_COINS', result.data);
                commit('loading/loadingStatus', false, { root: true })
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true })
                throw new Error(`API ${error}`);
            });
        },
        resetState({ commit }) {
            // Reset the coins.
            commit('RESET_COINS');
        },
    },
}