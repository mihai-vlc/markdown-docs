/**
 * Module that builds the custom buttons used on the main editor
 */
define(['jquery'], function ($) {

    return {
        editBtns: {
            items: [
                {
                    hotkey: 'Ctrl-B',
                    title: 'Ctrl-B',
                    label: '<strong>B</strong>',
                    callback: function (cm) {
                        var selection = cm.getSelection();
                        cm.replaceSelection('**' + selection + '**');
                        if (!selection) {
                            var cursorPos = cm.getCursor();
                            cm.setCursor(cursorPos.line, cursorPos.ch - 2);
                        }
                    }
                },
                {
                    hotkey: 'Ctrl-I',
                    title: 'Ctrl-I',
                    label: '<i>I</i>',
                    callback: function (cm) {
                        var selection = cm.getSelection();
                        cm.replaceSelection('*' + selection + '*');
                        if (!selection) {
                            var cursorPos = cm.getCursor();
                            cm.setCursor(cursorPos.line, cursorPos.ch - 1);
                        }
                    }
                },
                {
                    label: '&lt;/&gt;',
                    callback: function (cm) {
                        var selection = cm.getSelection();
                        if (selection.indexOf('\n') > -1 || ! selection) {
                            cm.replaceSelection("\n```\n" + selection + "\n```\n");
                        } else {
                            cm.replaceSelection("`" + selection + "`");
                        }

                        if ( ! selection) {
                            var cursorPos = cm.getCursor();
                            cm.setCursor(cursorPos.line - 2, 0);
                        }
                    }
                },
                {
                    label: 'a',
                    callback: function (cm) {
                        var selection = cm.getSelection();
                        var text = '';
                        var link = '';

                        if (selection.match(/^https?:\/\//)) {
                            link = selection;
                        } else {
                            text = selection;
                        }
                        cm.replaceSelection('[' + text + '](' + link + ')');

                        var cursorPos = cm.getCursor();
                        if (!selection) {
                            cm.setCursor(cursorPos.line, cursorPos.ch - 3);
                        } else if (link) {
                            cm.setCursor(cursorPos.line, cursorPos.ch - (3 + link.length));
                        } else {
                            cm.setCursor(cursorPos.line, cursorPos.ch - 1);
                        }
                    }
                }
            ]
        } // end group default
    };
});
