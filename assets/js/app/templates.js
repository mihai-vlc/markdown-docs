(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["404.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h1>Page Not Found</h1>\n\n<p>The requested page doesn\'t exists or it was deleted.</p>\n\n<h4>Search:</h4>\n<form class="form-inline" action="/search">\n    <div class="form-group">\n        <input type="text" class="form-control" name="search">\n    </div>\n    <button type="submit" class="btn btn-default">Search</button>\n</form>\n\n<h4>Go to:</h4>\n<ul>\n    <li><a href="/">Homepage</a></li>\n</ul>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["editor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<ul class="nav nav-tabs edtior-tabs" role="tablist">\n    <li role="presentation" class="active">\n        <a href="#text-view" role="tab" data-toggle="tab">Text</a>\n    </li>\n    <li role="presentation">\n        <a href="#preview-panel" role="tab" data-toggle="tab">Preview</a>\n    </li>\n</ul>\n\n<div class="tab-content">\n    <div role="tabpanel" class="tab-pane active" id="text-view">\n        <textarea class="js-editor"></textarea>\n    </div>\n    <div role="tabpanel" class="tab-pane markdown-body" id="preview-panel" data-loading-text="Loading...">\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<header>\n    <nav class="navbar navbar-default navbar-fixed-top">\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <a class="navbar-brand js-nav" href="/">Documentation</a>\n            </div>\n            <!-- Search form -->\n            <form class="navbar-form navbar-right" action="/search" role="search">\n                <div class="form-group">\n                    <input type="text" name="q"\n                        class="form-control search-input js-query"\n                        placeholder="Search">\n                </div>\n                <div class="btn-group" role="group">\n                    <button type="button" data-action="edit" class="btn js-edit-action-btn btn-default">\n                        <i class="glyphicon glyphicon-pencil"></i>\n                        Edit\n                    </button>\n                    <button type="button" data-action="new-page" class="btn js-edit-action-btn btn-success">\n                        <i class="glyphicon glyphicon-plus"></i>\n                        New Page\n                    </button>\n                    <button type="button" data-action="commit" class="btn js-edit-action-btn btn-primary">\n                        <i class="glyphicon glyphicon-cloud-upload"></i>\n                        Commit\n                    </button>\n                    <button type="button" data-action="delete" class="btn js-edit-action-btn btn-danger">\n                        <i class="glyphicon glyphicon-trash"></i>\n                        Delete\n                    </button>\n                </div>\n            </form>\n        </div>\n    </nav>\n</header>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["modal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="modal fade">\n    <div class="modal-dialog modal-lg">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n                <h4 class="modal-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h4>\n            </div>\n            <div class="js_content">Loading...</div>\n        </div>\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["navigation.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="nav-list">\n    ';
 navItems.forEach(function(item) { ;
__p += '\n    <li>\n        <a href="' +
__e( item.href ) +
'"  class="' +
__e( item.className ) +
' ' +
__e( item.navItems ? 'nav-folder' : '' ) +
'">\n            ' +
__e( item.name ) +
'\n        </a>\n        ';

        if (item.navItems && item.navItems.length) {
            print(template({ navItems: item.navItems, template: template }))
        }
        ;
__p += '\n    </li>\n    ';
 }); ;
__p += '\n</ul>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["page-edit.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<form action="#">\n    <div class="modal-body js-modal-body">\n\n        <div class="form-group">\n            <label>Page id</label>\n            <input type="text" required title="Please enter a valid file path with no extension"\n                pattern="[a-zA-Z0-9_\\/-]+" class="form-control js-page-id">\n        </div>\n\n        <div class="form-group js-page-editor">\n            <label>Page content</label>\n        </div>\n\n    </div>\n\n    <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Save</button>\n    </div>\n</form>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["page.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p +=
((__t = ( content )) == null ? '' : __t) +
'\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h4>' +
__e( results.length ) +
' result(s) were found for <strong>' +
__e( query ) +
'</strong></h4>\n<div class="list-group">\n    ';
 results.forEach(function(item) { ;
__p += '\n        <a class="list-group-item" href="' +
((__t = ( item.href )) == null ? '' : __t) +
'">\n            <h4 class="list-group-item-heading">' +
__e( item.name ) +
'</h4>\n            <div class="list-group-item-text">\n                ' +
__e( item.description ) +
'\n                <div class="list-item-info">Last modified: ' +
__e( item.date ) +
'</div>\n            </div>\n        </a>\n    ';
 }); ;
__p += '\n</ul>\n';

}
return __p
}})();