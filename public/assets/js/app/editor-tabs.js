define(['jquery', 'app/notify', 'app/app'], function ($, notify, app) {

    function init(cm) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(this).attr("href").substr(1);

            if (target == 'preview-panel') {
                var $preview = $('#preview-panel');
                $preview.html($preview.data('loadingText'));

                $.ajax({
                    type: 'POST',
                    url: '/preview',
                    data: {
                        content: cm.getValue()
                    },
                    success: function (res) {
                        $preview.html(res.data);
                        app.initContent();
                    },
                    error: function () {
                        notify.error("There was an error with generating the preview");
                    }
                })
            }

        });
    }


    return {
        init: init
    };

});
