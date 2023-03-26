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
