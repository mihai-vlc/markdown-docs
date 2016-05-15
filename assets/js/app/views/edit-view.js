define([
    'backbone',
    'templates',
    'app/views/modal',
    'app/utils/notify'
], function(Backbone, tpls, ModalView, notify) {

    var view = ModalView.extend({
        template: tpls['page-edit.html'],

        initialize: function (options) {
            ModalView.prototype.initialize.apply(this, arguments);
            this.$bodyEl.html(this.template());

            this.options.pageModel.on('sync', this.updateContent.bind(this));
            this.options.pageModel.on('error', this.handleError.bind(this));
        },

        updateContent: function(model, data) {
            if (data.id) {
                this.$('.js-page-id').val(data.id);
            }

            if (data.content) {
                this.editorView.setContent(data.content);
            }
        },

        handleError: function() {
            notify.error('There was an error with loading or saving the page.');
        },

        events: {
            'submit form': 'onSubmit'
        },

        onSubmit: function (event) {
            event.preventDefault();
            this.savePage();
        },

        savePage: function() {
            var pageModel = this.options.pageModel;
            var currentId = this.$('.js-page-id').val().replace(/^\/+/, '');

            var oldId = pageModel.id;

            pageModel.set('id', currentId);

            var data = {
                oldId: oldId,
                content: this.editorView.cm.getValue()
            };

            pageModel.save(data, {
                wait: true,
                success: function() {
                    notify.success('The page page was saved successfully !');

                    app.events.trigger('pageSaved', pageModel.id);

                    // we need to do this in order to register a change in the route
                    // and load the new content of the page
                    Backbone.history.navigate('/', { replace: true });
                    Backbone.history.navigate(pageModel.id, {trigger: true, replace: true});

                    this.close();
                }.bind(this),
                error: function() {
                    // if the save fails reset the id attribute to the old value
                    pageModel.set('id', oldId);
                }
            });

        },

        onShown: function() {
            var that = this;
            require(['app/views/editor-view', 'app/models/preview-model'],
                function(EditorView, PreviewModel) {

                that.editorView = new EditorView({
                    previewModel: new PreviewModel()
                });

                that.editorView.on('save', that.savePage.bind(that));

                that.$('.js-page-editor').append(that.editorView.el);
                that.editorView.render();

                if (that.options.pageModel.id) {
                    that.options.pageModel.fetch({
                        data: { format: 'source' }
                    });
                }
            });
        }
    });

    return view;
});
