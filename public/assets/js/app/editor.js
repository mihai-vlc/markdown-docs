define(['jquery', 'codemirror', 'inline-attachment', 'app/editor-buttons', 'app/editor-tabs',
    'codemirror/keymap/sublime',
    'codemirror/mode/gfm/gfm',
    'codemirror/addon/selection/active-line',
    'codemirror/addon/dialog/dialog',
    'codemirror/addon/search/search',
    'codemirror/addon/selection/selection-pointer',
    'codemirror/addon/codemirror-buttons',
    'codemirror/addon/display/fullscreen'
    ], function  ($, CodeMirror, inlineAttachment, editorButtons, editorTabs) {

    return {
        init: function (textarea, content) {
            var editor = CodeMirror.fromTextArea(textarea, {
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

            editor.setOption('buttons', editorButtons);

            if (content) {
                editor.setValue(content);
            }

            // handle the file uploads
            inlineAttachment.editors.codemirror4.attach(editor, {
                uploadUrl: '/upload',
                allowedTypes: '*'
            });

            editor.addKeyMap({
                'Ctrl-S': function (cm) {
                    cm.save();
                    $(cm.getTextArea()).closest('form').submit();
                }
            });

            editorTabs.init(editor);

            return editor;
        }
    }
});

