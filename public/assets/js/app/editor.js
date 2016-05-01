define(['jquery', 'codemirror', 'inline-attachment',
    'codemirror/keymap/sublime',
    'codemirror/mode/gfm/gfm',
    'codemirror/addon/selection/active-line',
    'codemirror/addon/dialog/dialog',
    'codemirror/addon/search/search',
    'codemirror/addon/selection/selection-pointer'
    ], function  ($, CodeMirror, inlineAttachment) {

    return {
        init: function (textarea, content) {
            var editor = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,
                mode: "gfm",
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                selectionPointer: true,
                styleActiveLine: true,
                showCursorWhenSelecting: true,
                tabSize: 4
            });

            if (content) {
                editor.setValue(content);
            }

            inlineAttachment.editors.codemirror4.attach(editor, {
                uploadUrl: '/upload',
                allowedTypes: '*'
            });

            return editor;
        }
    }
});

