define([], function() {
var URI = {
    escapeQuerySpace: true,
    decode: decodeURIComponent,
    decodeQuery: function(string, escapeQuerySpace) {
      string += '';
      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }

      try {
        return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
      } catch(e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    },
    parseQuery: function(string, escapeQuerySpace) {
        if (!string) {
            return {};
        }

        // throw out the funky business - "?"[name"="value"&"]+
        string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

        if (!string) {
            return {};
        }

        var items = {};
        var splits = string.split('&');
        var length = splits.length;
        var v, name, value;
        var hasOwn = Object.prototype.hasOwnProperty;

        for (var i = 0; i < length; i++) {
            v = splits[i].split('=');
            name = URI.decodeQuery(v.shift(), escapeQuerySpace);
            // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
            value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

            if (hasOwn.call(items, name)) {
                if (typeof items[name] === 'string' || items[name] === null) {
                    items[name] = [items[name]];
                }

                items[name].push(value);
            } else {
                items[name] = value;
            }
        }

        return items;
    }
};
return URI;
});
