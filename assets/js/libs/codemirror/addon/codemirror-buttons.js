(function (mod) {
    if (typeof exports === 'object' && typeof module === 'object') { // CommonJS
        mod(
            require('codemirror/lib/codemirror'),
            require('codemirror/addon/display/panel')
        );
    }
    else if (typeof define === 'function' && define.amd) { // AMD
        define([
            'codemirror/lib/codemirror',
            'codemirror/addon/display/panel'
        ], mod);
    }
    else { // Plain browser env
        mod(CodeMirror);
    }
})(function (CodeMirror) {
    "use strict";

    var PANEL_ELEMENT_CLASS = "CodeMirror-buttonsPanel";

    CodeMirror.defineOption("buttons", {}, function (cm, value, old) {
        var groups = Object.keys(value);

        if (groups.length == 0) {
            return;
        }

        var panelNode = document.createElement("div");
        panelNode.className = PANEL_ELEMENT_CLASS;

        groups.forEach(function(item) {
            var group = createGroup(cm, value[item]);
            if (group) {
                panelNode.appendChild(group);
            }
        });

        cm.addPanel(panelNode);
    });

    function createGroup(cm, config) {
        var items = config.items || [];
        var groupNode = document.createElement('div');

        if (config.className) {
            groupNode.className = config.className;
        }

        for (var i = 0, len = items.length; i < len; i++) {
            var button = createButton(cm, items[i]);
            groupNode.appendChild(button);
        }

        return groupNode;
    }

    function createButton(cm, config) {
        var buttonNode = document.createElement('button');
        buttonNode.innerHTML = config.label;
        buttonNode.setAttribute('type', 'button');
        buttonNode.setAttribute('tabindex', '-1');

        if (config.callback) {
            buttonNode.addEventListener('click', function (e) {
                e.preventDefault();
                config.callback(cm, buttonNode);
                cm.focus();
            });
        }

        if (config.className) {
            buttonNode.className = config.className;
        }

        if (config.title) {
            buttonNode.setAttribute('title', config.title);
        }

        if (config.hotkey && config.callback) {
            var map = {};
            map[config.hotkey] = config.callback;
            cm.addKeyMap(map);
        }

        return buttonNode;
    }
});
