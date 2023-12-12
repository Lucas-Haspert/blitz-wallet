import axios from "axios";
import Response from '@/common/response';
import { getStatusCodeInfo } from '@/common/helpers/http'
import { getAvailableCryptos } from '@/common/helpers/crypto'

export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async getCryptos({ commit }) {
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

            let historicalTransactions = apiResponseLab.data; // TODO: Acá podria estar vacío la data, deberia devolver un response, quizás con estado falso diciendo que no hay datos, o quizás con estado verdadero, para que no pase error
            var availableCoins = getAvailableCryptos(historicalTransactions);

            if (!availableCoins.status) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, availableCoins.message, null);
                return response;
            }

            commit('loading/loadingStatus', false, { root: true });
            const response = new Response(true, availableCoins.message, availableCoins.body);    
            return response;
        },
        async getCryptoValued({ commit }, { cryptoAmount, cryptoCode, exchangeUrl }) {
            commit('loading/loadingStatus', true, { root: true });

            if (cryptoAmount === null || cryptoAmount === '') {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se ingreso una cantidad de cripto a valorizar.", null);
                return response;
            }

            if (isNaN(cryptoAmount)) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se ingreso un número como una cantidad de cripto a valorizar.", null);
                return response;
            }

            if (parseFloat(cryptoAmount) < 0) {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se ingreso una cantidad positiva de cripto a valorizar.", null);
                return response;
            }

            if (cryptoCode === null || cryptoCode === '') {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se ingreso el tipo de cripto a valorizar.", null);
                return response;
            }

            if (exchangeUrl === null || exchangeUrl === '') {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "No se ingreso un exchange.", null);
                return response;
            }

            var cryptoValued = null;

            const apiClientCY = axios.create({
                baseURL: 'https://criptoya.com/api/' + exchangeUrl + '/' + cryptoCode + '/' + 'ars' + '/' + '1',
            });

            var apiResponseCY = await apiClientCY.get().then(result => {
                return result;
            }).catch(error => {
                commit('loading/loadingStatus', false, { root: true });
                throw new Error(`API ${error}`);
            });

            var statusResponse = getStatusCodeInfo(apiResponseCY.status.toString().substring());

            if (apiResponseCY.status === 200 || apiResponseCY.status === 201 || apiResponseCY.status === 202) {
                if (apiResponseCY.data === null || apiResponseCY.data['bid'] === null) {
                    commit('loading/loadingStatus', false, { root: true });
                    const response = new Response(false, "No se pudo obtener el precio de la criptomoneda.", null);
                    return response;
                }

                if (isNaN(apiResponseCY.data['bid'])) {
                    commit('loading/loadingStatus', false, { root: true });
                    const response = new Response(false, "El precio de la criptomoneda no es un número.", null);
                    return response;
                }

                cryptoValued = (parseFloat(cryptoAmount) * parseFloat(apiResponseCY.data['bid'])).toFixed(2);
            } else {
                commit('loading/loadingStatus', false, { root: true });
                const response = new Response(false, "Error: " + "[" + statusResponse.statusCode + " " + statusResponse.statusText + "]" + " " + statusResponse.descriptionESP, null);
                return response;
            }

            commit('loading/loadingStatus', false, { root: true });

            const response = new Response(true, "OK", cryptoValued);
            return response;
        },
    },
}