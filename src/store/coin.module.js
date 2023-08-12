import axios from "axios";
import { getStatusCodeInfo } from '@/common/helpers/http'
import { getAvailableCoins } from '@/common/helpers/coin'

export default {
    namespaced: true,
    state: {
        coins: [],
    },
    getters: {
        coins: state => {
            return state.coins;
        }
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
        async getCoins({ commit }) {
            // Change the loadingStatus.
            commit('loading/loadingStatus', true, { root: true });

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

            // Process the response.
            var statusResponse = getStatusCodeInfo(apiResponseLab.status.toString().substring());

            // Process the response.
            if (statusResponse.statusCode !== 200 && statusResponse.statusCode !== 201 && statusResponse.statusCode !== 202) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return;
            } 

            // Set the historicalTransactions.
            let historicalTransactions = apiResponseLab.data;
            
            // Get the availableCoins.
            var availableCoins = getAvailableCoins(historicalTransactions);
            
            // Check the availableCoins.
            if (!availableCoins.succesfull) {
                // Change the loadingStatus.
                commit('loading/loadingStatus', false, { root: true });

                return;
            }

            // Set the coins.
            commit('SET_COINS', availableCoins.availableAmount);

            // Change the loadingStatus.
            commit('loading/loadingStatus', false, { root: true });
            
            return availableCoins.availableAmount;
        },
        resetState({ commit }) {
            // Reset the coins.
            commit('RESET_COINS');
        },
    },
}