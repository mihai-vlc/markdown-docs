define([], function () {
    return {
        setItem: function (name, value) {
            localStorage.setItem(name, value);
        },
        getItem: function (name) {
            return localStorage.getItem(name);
        }
    }
})
