(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["404.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h1>Page Not Found</h1>\r\n\r\n<p>The requested page doesn\'t exists or it was deleted.</p>\r\n\r\n<h4>Search:</h4>\r\n<form class="form-inline" action="/search">\r\n    <div class="form-group">\r\n        <input type="text" class="form-control" name="search">\r\n    </div>\r\n    <button type="submit" class="btn btn-default">Search</button>\r\n</form>\r\n\r\n<h4>Go to:</h4>\r\n<ul>\r\n    <li><a href="/">Homepage</a></li>\r\n</ul>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["editor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<ul class="nav nav-tabs edtior-tabs" role="tablist">\r\n    <li role="presentation" class="active">\r\n        <a href="#text-view" role="tab" data-toggle="tab">Text</a>\r\n    </li>\r\n    <li role="presentation">\r\n        <a href="#preview-panel" role="tab" data-toggle="tab">Preview</a>\r\n    </li>\r\n</ul>\r\n\r\n<div class="tab-content">\r\n    <div role="tabpanel" class="tab-pane active" id="text-view">\r\n        <textarea class="js-editor"></textarea>\r\n    </div>\r\n    <div role="tabpanel" class="tab-pane markdown-body" id="preview-panel" data-loading-text="Loading...">\r\n    </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<header>\r\n    <nav class="navbar navbar-default navbar-fixed-top">\r\n        <div class="container-fluid">\r\n            <div class="navbar-header">\r\n                <a class="navbar-brand js-nav" href="/">Documentation</a>\r\n            </div>\r\n            <!-- Search form -->\r\n            <form class="navbar-form navbar-right" action="/search" role="search">\r\n                <div class="form-group">\r\n                    <input type="text" name="q"\r\n                        class="form-control search-input js-query"\r\n                        placeholder="Search">\r\n                </div>\r\n                <div class="btn-group" role="group">\r\n                    <button type="button" data-action="edit" class="btn js-edit-action-btn btn-default">\r\n                        <i class="glyphicon glyphicon-pencil"></i>\r\n                        Edit\r\n                    </button>\r\n                    <button type="button" data-action="new-page" class="btn js-edit-action-btn btn-success">\r\n                        <i class="glyphicon glyphicon-plus"></i>\r\n                        New Page\r\n                    </button>\r\n                    <button type="button" data-action="commit" class="btn js-edit-action-btn btn-primary">\r\n                        <i class="glyphicon glyphicon-cloud-upload"></i>\r\n                        Commit\r\n                    </button>\r\n                    <button type="button" data-action="delete" class="btn js-edit-action-btn btn-danger">\r\n                        <i class="glyphicon glyphicon-trash"></i>\r\n                        Delete\r\n                    </button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </nav>\r\n</header>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["modal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="modal fade">\r\n    <div class="modal-dialog modal-lg">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\r\n                <h4 class="modal-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h4>\r\n            </div>\r\n            <div class="js_content">Loading...</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

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
__p += '<ul class="nav-list">\r\n    ';
 navItems.forEach(function(item) { ;
__p += '\r\n    <li>\r\n        <a href="' +
__e( item.href ) +
'"  class="' +
__e( item.className ) +
' ' +
__e( item.navItems ? 'nav-folder' : '' ) +
'">\r\n            ' +
__e( item.name ) +
'\r\n        </a>\r\n        ';

        if (item.navItems && item.navItems.length) {
            print(template({ navItems: item.navItems, template: template }))
        }
        ;
__p += '\r\n    </li>\r\n    ';
 }); ;
__p += '\r\n</ul>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["page-edit.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<form action="#">\r\n    <div class="modal-body js-modal-body">\r\n\r\n        <div class="form-group">\r\n            <label>Page id</label>\r\n            <input type="text" required title="Please enter a valid file path with no extension"\r\n                pattern="[a-zA-Z0-9_\\/-]+" class="form-control js-page-id">\r\n        </div>\r\n\r\n        <div class="form-group js-page-editor">\r\n            <label>Page content</label>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class="modal-footer">\r\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\r\n        <button type="submit" class="btn btn-primary">Save</button>\r\n    </div>\r\n</form>\r\n';

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
'\r\n';

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
'</strong></h4>\r\n<div class="list-group">\r\n    ';
 results.forEach(function(item) { ;
__p += '\r\n        <a class="list-group-item" href="' +
((__t = ( item.href )) == null ? '' : __t) +
'">\r\n            <h4 class="list-group-item-heading">' +
__e( item.name ) +
'</h4>\r\n            <div class="list-group-item-text">\r\n                ' +
__e( item.description ) +
'\r\n                <div class="list-item-info">Last modified: ' +
__e( item.date ) +
'</div>\r\n            </div>\r\n        </a>\r\n    ';
 }); ;
__p += '\r\n</ul>\r\n';

}
return __p
}})();