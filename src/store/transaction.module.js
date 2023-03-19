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
        }
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
    },
}

/*
{COMPRA
        "_id": "63a1c60bbfee487c00034e40",
        "crypto_code": "btc",
        "crypto_amount": 0.003,
        "money": "16349.10",
        "user_id": "Vigo09",
        "action": "purchase" || "purchases",
        "datetime": "2022-12-20T14:26:18.178Z"
},

{VENTA
        "_id": "63c02188aa35d26a00005735",
        "crypto_code": "eth",
        "crypto_amount": "1",
        "money": "433563.00",
        "user_id": "agu123",
        "action": "sale",
        "datetime": "2023-01-12T12:04:39.000Z"
},
*/