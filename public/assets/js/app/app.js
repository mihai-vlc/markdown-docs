define(['jquery', 'app/page-actions', 'prism', 'bootstrap'], function ($, pageActions, Prism) {


    function init () {

        initNavigation();
        initContent();

        pageActions.init();
    }

    function initNavigation() {
        // collapsable navigation
        $('.nav-folder').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('is-closed');
            $(this).parent().children('.nav-list').slideToggle();
        });
    }

    function initContent() {
        // make all external links open in a new window
        $(document.links).filter(function() {
            return this.hostname != window.location.hostname;
        }).attr('target', '_blank');

        // autofocus on the main content
        $('[autofocus]').focus();

        // highlight the code areas
        Prism.highlightAll();
    }

    return {
        init: init,
        initNavigation: initNavigation,
        initContent: initContent
    }
});
