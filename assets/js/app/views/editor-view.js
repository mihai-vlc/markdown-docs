define([
    'backbone',
    'templates',
    'codemirror',
    'inline-attachment',
    'app/utils/notify',

    // editor addons
    'codemirror/keymap/sublime',
    'codemirror/mode/gfm/gfm',
    'codemirror/addon/selection/active-line',
    'codemirror/addon/dialog/dialog',
    'codemirror/addon/search/search',
    'codemirror/addon/selection/selection-pointer',
    'codemirror/addon/codemirror-buttons',
    'codemirror/addon/display/fullscreen'
], function(Backbone, tpls, CodeMirror, inlineAttachment, notify) {

    var view = Backbone.View.extend({
        template: tpls['editor.html'],

        initialize: function (options) {
            this.options = options || {};
            this.previewModel = options.previewModel;
            this.pageContent = options.pageContent;

            this.previewModel.on('sync', this.updatePreview.bind(this));
            this.previewModel.on('error', this.handleError.bind(this));
        },

        handleError: function() {
            notify.error('There was an error with loading the preview.');
        },

        updatePreview: function() {
            this.$preview.html(this.previewModel.get('content'));
        },

        setContent: function(content) {
            if (this.cm) {
                this.cm.setValue(content);
            } else {
                this.pageContent = content;
            }
        },

        events: {
            'shown.bs.tab a[data-toggle="tab"]': 'onTabChange'
        },

        onTabChange: function(event) {
            var target = $(event.currentTarget).attr("href").substr(1);

            if (target == 'preview-panel') {
                this.$preview.html('Loading...');
                this.previewModel.fetch({
                    type: 'POST',
                    data: {
                        content: this.cm.getValue()
                    }
                });
            }
        },

        render: function() {
            var html = this.template();
            this.$el.html(html);

            this.$preview = this.$('#preview-panel');

            var textarea = this.$('.js-editor')[0];

            this.cm = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,
                mode: 'gfm',
                keyMap: 'sublime',
                autoCloseBrackets: true,
                matchBrackets: true,
                selectionPointer: true,
                styleActiveLine: true,
                showCursorWhenSelecting: true,
                tabSize: 4,
                extraKeys: {
                    'F11': function(cm) {
                        cm.setOption('fullScreen', !cm.getOption('fullScreen'));
                    },
                    'Esc': function(cm) {
                        if (cm.getOption('fullScreen')) {
                            cm.setOption('fullScreen', false);
                        }
                    }
                }
            });

            if (this.pageContent) {
                this.cm.setValue(this.pageContent);
            }

            // handle the file uploads
            inlineAttachment.editors.codemirror4.attach(this.cm, {
                uploadUrl: '/upload',
                allowedTypes: '*'
            });

            this.cm.addKeyMap({
                'Ctrl-S': function (cm) {
                    cm.save();
                    this.trigger('save');
                }.bind(this)
            });

            return this;
        }
    });

    return view;
});
