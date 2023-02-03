export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        login(username) {
            // Add 'username' and 'isLogged' to the localStorage.
            localStorage.setItem('username', username);
            localStorage.setItem('isLogged', true);
        },
        logout() {
            // Remove 'username' from the localStorage.
            if (localStorage.getItem('username') !== null) {
                localStorage.removeItem('username');
            }

            // Remove 'isLogged' from the localStorage.
            if (localStorage.getItem('isLogged') !== null) {
                localStorage.removeItem('isLogged');
            }

            // Clear the localStorage.
            localStorage.clear();
        },
    },
}
