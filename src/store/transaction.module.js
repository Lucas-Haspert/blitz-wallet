import axios from "axios";

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
        transactions: [],
    },
    getters: {
        transactions: state => {
            return state.transactions;
        }
    },
    mutations: {
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions;
        },
        RESET_TRANSACTIONS(state) {
            state.transactions = [];
        },
    },
    actions: {
        async getAll({ commit }, username) {
            // Change the loadingStatus
            commit('loading/loadingStatus', true, { root: true })

            // Set the apiClient
            const apiClient = axios.create({
                baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
                headers: { 'x-apikey': '60eb09146661365596af552f' }
            });

            // Get the transactions
            await apiClient.get("transactions", {
                params: {
                    q: `{"user_id": "${username}"}`
                }
            }).then(result => {
                commit('SET_TRANSACTIONS', result.data);
                commit('loading/loadingStatus', false, { root: true })
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true })
                throw new Error(`API ${error}`);
            });
        },
        resetState({ commit }) {
            // Reset the transactions
            commit('RESET_TRANSACTIONS');
        },
    },
}