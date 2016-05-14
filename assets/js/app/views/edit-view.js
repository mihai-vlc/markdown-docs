define([
    'backbone',
    'templates',
    'app/views/modal',
    'app/utils/notify'
], function(Backbone, tpls, ModalView, notify) {

    var view = ModalView.extend({
        template: tpls['edit.html'],

        initialize: function (options) {
            ModalView.prototype.initialize.apply(this, arguments);
            this.$bodyEl.html(this.template());

            this.options.pageModel.on('sync', this.updateContent.bind(this));
            this.options.pageModel.on('error', this.handleError.bind(this));
            Backbone.history.navigate('/edit-page');
        },

        updateContent: function(model, data) {
            if (data.id && data.content) {
                this.$('.js-page-id').val(data.id);
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

            pageModel.set('oldId', pageModel.id);
            pageModel.set('id', currentId);
            pageModel.set('content', this.editorView.cm.getValue());

            pageModel.save(null, {
                success: function() {
                    notify.success('The page page was saved successfully !');

                    app.events.trigger('pageSaved', pageModel.id);
                    Backbone.history.navigate(pageModel.id, {trigger: true, replace: true});

                    this.close();
                }.bind(this)
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

                that.options.pageModel.fetch({
                    data: { format: 'source' }
                });
            });
        }
    });

    return view;
});
