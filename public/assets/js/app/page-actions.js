define(['jquery', 'app/notify'], function ($, notify) {

    function init() {
        attachEventListeners();
    }


    function attachEventListeners() {
        $('.js-edit-action-btn').on('click', function(event) {
            event.preventDefault();
            var action = $(this).data('action');
            var pageId = window.location.pathname.replace(/^\/+/, '');

            if (action == 'edit') {
                if ( ! pageId) {
                    notify.error('This page is not editable !');
                } else {
                    initEditMode();
                }
            } else if (action == 'new-page') {
                initNewPageMode();
            } else if (action == 'commit') {
                commitChanges();
            } else if (action == 'delete') {
                if ( ! pageId) {
                    notify.error('This page is not editable !');
                } else if (confirm('Are you sure you want to delete this page ?')) {
                    deletePage(pageId, function() {
                        window.location.href = '/';
                    });
                }
            }
        });
    }

    function deletePage(pageId, cb) {
        $.ajax({
            type: 'POST',
            url: '/delete-page',
            data: {
                pageId: pageId
            },
            success: function() {
                cb();
            },
            error: function() {
                notify.error('There was an error with removing the page !');
            }
        });
    }

    function commitChanges() {
        $.ajax({
            url: '/commit',
            type: 'POST',
            success: function() {
                notify.info('The data was commited and pushed successfully !');
            },
            error: function  () {
                notify.error('There was an error with commiting the data !');
            }
        })
    }

    function initEditMode() {
        require(['bootstrap'], function() {
            $.ajax({
                type: 'GET',
                url: window.location.href,
                data: {
                    format: 'source'
                },
                success: function (res) {
                    openModalWindow({
                        title: 'Edit page',
                        pageId: res.pageId,
                        content: res.content
                    });
                },
                error: function () {
                    notify.error("There was an error with loading the page.");
                }
            })
        });
    }

    function initNewPageMode() {
        require(['bootstrap'], function (CodeMirror) {
            var loc = window.location.pathname;
            openModalWindow({
                title: 'Create new page',
                pageId: loc.substring(0, loc.lastIndexOf('/')) + '/new_page',
                isNewPage: true
            });
        });
    }


    function openModalWindow (options) {
        var template = $('#modal-window-template').html();
        var $modalEl = $(template).appendTo('body');
        var $pageId = $modalEl.find('.js-page-id');

        $modalEl.find('.js-modal-title').html(options.title);
        $pageId.val(options.pageId);

        $modalEl.on('shown.bs.modal', function() {
            require(['app/editor'], function (editor) {
                var textarea = $modalEl.find('.js-editor')[0];
                editor.init(textarea, options.content);
            });
        });

        $modalEl.modal();

        $modalEl.on('hidden.bs.modal', function () {
            $modalEl.remove();
        });

        $modalEl.on('submit', function (event) {
            event.preventDefault();
            var pageId = $pageId.val().replace(/^\/+/, '');

            $.ajax({
                type: 'POST',
                url: options.isNewPage ? '/create-page' : '/save-page',
                data: {
                    oldPageId: options.pageId,
                    pageId: pageId,
                    content: $modalEl.find('.js-editor').val()
                },
                success: function () {
                    notify.info('The page was saved successfully !');
                    $modalEl.modal('hide');
                    window.location.href = window.location.origin + '/' + pageId;
                },
                error: function () {
                    notify.error("There was an error with saving the page.")
                }
            });
        });

        return $modalEl;
    }

    return {
        init: init
    };
});
