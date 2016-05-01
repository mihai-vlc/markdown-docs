define([], function  () {
    return {
        info: function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.error(msg);
        }
    }
});
