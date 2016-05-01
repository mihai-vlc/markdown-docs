define(['jquery', 'messagebox', 'app/storage'], function($, Lobibox, storage) {
    var notifyData;
    Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
        sound: false
    });


    function getData() {
        try {
            notifyData = JSON.parse(storage.getItem('notifyData')) || [];
        } catch (e) {
            notifyData = [];
        }

        return notifyData;
    }

    return {
        init: function () {
            // display previous notifications
            getData().forEach(function (item) {
                Lobibox.notify(item.type, {
                    msg: item.msg
                });
            });
            storage.setItem('notifyData', '[]');
        },
        // deffered notification (on the next init)
        deffered: function (type, msg) {
            var data = getData();
            data.push({ type: type, msg: msg });
            storage.setItem('notifyData', JSON.stringify(data))
        },
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
