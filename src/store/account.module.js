export default {
    namespaced: true,
    state: {
        username: null,
        logged: null,
        funds: null,
        coins: null,
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
            state.username = username;
            state.logged = true;
            state.funds = 0;
            state.coins = [];

            // Clear the localStorage.
            localStorage.clear();

            // Save the login status in localStorage.
            localStorage.setItem('isLogged', true);
        },
        LOGOUT(state) {
            state.username = null;
            state.logged = null;
            state.funds = null;
            state.coins = null;

            // Clear the localStorage.
            localStorage.clear();
        },
    },
    actions: {
        login({ commit }, { username }) {
            commit('LOGIN', username);
        },
        logout({ commit }) {
            commit('LOGOUT');
        },
    },
}
