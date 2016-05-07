(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["about.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h1>About me</h1>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ut tempora deserunt obcaecati, sapiente corporis facere exercitationem repellat accusantium atque aperiam, possimus ullam quaerat maxime consequatur sunt iure explicabo veniam!</p>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<header>\r\n    <nav class="navbar navbar-default navbar-fixed-top">\r\n        <div class="container-fluid">\r\n            <div class="navbar-header">\r\n                <a class="navbar-brand" href="/">Documentation</a>\r\n            </div>\r\n            <!-- Search form -->\r\n            <form class="navbar-form navbar-right" action="/" role="search">\r\n                <div class="btn-group" role="group">\r\n                    <button type="button" data-action="edit" class="btn js-edit-action-btn btn-default">\r\n                        <i class="glyphicon glyphicon-pencil"></i>\r\n                        Edit\r\n                    </button>\r\n                    <button type="button" data-action="new-page" class="btn js-edit-action-btn btn-success">\r\n                        <i class="glyphicon glyphicon-plus"></i>\r\n                        New Page\r\n                    </button>\r\n                    <button type="button" data-action="commit" class="btn js-edit-action-btn btn-primary">\r\n                        <i class="glyphicon glyphicon-cloud-upload"></i>\r\n                        Commit\r\n                    </button>\r\n                    <button type="button" data-action="delete" class="btn js-edit-action-btn btn-danger">\r\n                        <i class="glyphicon glyphicon-trash"></i>\r\n                        Delete\r\n                    </button>\r\n                </div>\r\n                <div class="form-group">\r\n                    <input type="text" name="search"\r\n                        class="form-control search-input"\r\n                        placeholder="Search">\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </nav>\r\n</header>\r\n';

}
return __p
}})();
(function() {
window["_templates_app_"] = window["_templates_app_"] || {};

window["_templates_app_"]["homepage.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '\r\n';

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