define([
    'backbone',
    'templates',
    'bootstrap'
], function(Backbone, tpls) {
    'use strict';

    var ModalView = Backbone.View.extend({

        modalTemplate: tpls['modal.html'],

        initialize: function(options) {
            this.options = options || {};

            var title = this.options.title || '';
            var appendTo = this.options.appendTo || 'body';

            // append the modal template to the dom
            var html = this.modalTemplate({title: title});
            this.$el.html(html);
            $(appendTo).append(this.el);

            this.$modalEl = this.$('.modal');
            this.$bodyEl = this.$('.js_content');

            this.initModal();

        },

        initModal: function() {
            // initialize the modal
            this.$modalEl.modal({
                show: false,
                keyboard: false,
                backdrop: 'static'
            });

            this.$modalEl.on('shown.bs.modal', function() {
              this.onShown();
            }.bind(this));

            this.$modalEl.on('hidden.bs.modal', function() {
              this.onHidden();
            }.bind(this));
        },

        show: function() {
            this.$modalEl.modal('show');

            return this;
        },

        close: function() {
            this.$modalEl.modal('hide');

            return this;
        },

        onShown: function() {
        },

        onHidden: function(e) {
            this.$modalEl.off('hidden.bs.modal');
            this.remove();
        }

    });

    return ModalView;

});
