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

window["_templates_app_"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<header>\n    <nav class="navbar navbar-default navbar-fixed-top">\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <a class="navbar-brand" href="/">Documentation</a>\n            </div>\n            <!-- Search form -->\n            <form class="navbar-form navbar-right" action="/search" role="search">\n                <div class="form-group">\n                    <input type="text" name="search"\n                        class="form-control search-input"\n                        placeholder="Search">\n                </div>\n                <div class="btn-group" role="group">\n                    <button type="button" data-action="edit" class="btn js-edit-action-btn btn-default">\n                        <i class="glyphicon glyphicon-pencil"></i>\n                        Edit\n                    </button>\n                    <button type="button" data-action="new-page" class="btn js-edit-action-btn btn-success">\n                        <i class="glyphicon glyphicon-plus"></i>\n                        New Page\n                    </button>\n                    <button type="button" data-action="commit" class="btn js-edit-action-btn btn-primary">\n                        <i class="glyphicon glyphicon-cloud-upload"></i>\n                        Commit\n                    </button>\n                    <button type="button" data-action="delete" class="btn js-edit-action-btn btn-danger">\n                        <i class="glyphicon glyphicon-trash"></i>\n                        Delete\n                    </button>\n                </div>\n            </form>\n        </div>\n    </nav>\n</header>\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["navigation.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="nav-list">\r\n    ';
 navItems.forEach(function(item) { ;
__p += '\r\n    <li>\r\n        <a href="' +
((__t = ( item.href )) == null ? '' : __t) +
'"  class="' +
((__t = ( item.className )) == null ? '' : __t) +
' ' +
((__t = ( item.navItems ? 'nav-folder' : '' )) == null ? '' : __t) +
'">\r\n            ' +
((__t = ( item.name )) == null ? '' : __t) +
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