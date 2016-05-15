define([], function() {
    return {
        format: function(str) {
            var args = Array.prototype.slice.call(arguments, 1);
            return str.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
            });
        }
    };
});
