/**
 * Module that builds the custom buttons used on the main editor
 */
define(['app/utils/string-utils'], function(stringUtils) {

    function addBlockItem(text) {
        return function(cm) {
            var selection = cm.getSelection();
            if (selection) {
                cm.replaceSelection('\n'+ text +' ' + selection);
            } else {
                var cursorPos = cm.getCursor();
                cm.replaceRange(text + ' ', { line: cursorPos.line, ch: 0 });
            }
        };
    }

    var labels = {
        def: '<span class="label label-default">{0}</span>',
        primary: '<span class="label label-primary">{0}</span>',
        success: '<span class="label label-success">{0}</span>',
        info: '<span class="label label-info">{0}</span>',
        warning: '<span class="label label-warning">{0}</span>',
        danger: '<span class="label label-danger">{0}</span>'
    };


    function addLabel(name) {
        return function(cm) {
            var selection = cm.getSelection();
            cm.replaceSelection(stringUtils.format(labels[name], selection));

            if (!selection) {
                var cursorPos = cm.getCursor();
                cm.setCursor(cursorPos.line, cursorPos.ch - 7);
            }
        }
    }



    return {
        editBtns: {
            items: [
                {
                    label: '<strong>h</strong>',
                    subitems: {
                        items: [
                            {
                                label: '<span class="btn-h1">h1</span>',
                                callback: addBlockItem('#')
                            },
                            {
                                label: '<span class="btn-h2">h2</span>',
                                callback: addBlockItem('##')
                            },
                            {
                                label: '<span class="btn-h3">h3</span>',
                                callback: addBlockItem('###')
                            },
                            {
                                label: '<span class="btn-h4">h4</span>',
                                callback: addBlockItem('####')
                            }
                        ]
                    }
                },
                {
                    label: '<strong>label</strong>',
                    subitems: {
                        items: [
                            {
                                label: 'default',
                                callback: addLabel('def')
                            },
                            {
                                label: 'primary',
                                callback: addLabel('primary')
                            },
                            {
                                label: 'success',
                                callback: addLabel('success')
                            },
                            {
                                label: 'info',
                                callback: addLabel('info')
                            },
                            {
                                label: 'warning',
                                callback: addLabel('warning')
                            },
                            {
                                label: 'danger',
                                callback: addLabel('danger')
                            }
                        ]
                    }
                },
                {
                    label: '<i class="glyphicon glyphicon-list"></i>',
                    callback: addBlockItem('-')
                },
                {
                    label: '<i class="glyphicon glyphicon-check"></i>',
                    callback: addBlockItem('[ ]')
                },
                {
                    hotkey: 'Ctrl-B',
                    title: 'Ctrl-B',
                    label: '<strong>B</strong>',
                    callback: function(cm) {
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
                    callback: function(cm) {
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
                    callback: function(cm) {
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
                    callback: function(cm) {
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
