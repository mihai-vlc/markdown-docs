define(['jquery', 'messagebox'], function($, Lobibox) {
    var notifyData;
    Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
        sound: false
    });

    return {
        success: function (msg) {
            Lobibox.notify('success', {
                msg: msg
            });
        },
        info: function (msg) {
            Lobibox.notify('info', {
                msg: msg
            });
        },
        confirm: function(msg, cb) {
            Lobibox.confirm({
                title: 'Confirm',
                msg: msg,
                callback: function($el, type) {
                    if (type == 'yes') {
                        cb();
                    }
                },
                buttons: ['yes', 'cancel']
            });
        },
        error: function (msg) {
            Lobibox.notify('error', {
                msg: msg
            });
        }
    }
});
