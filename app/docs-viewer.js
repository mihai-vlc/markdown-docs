var config = require('../server/config');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var stringUtils = require('underscore.string');
var marked = require('marked');

function getPageNotFound() {
    return {
        template: 'error',
        page_title: 'Documentation 404 Not Found'
    };
}

function getPage(id) {
    if (id === '/') {
        return getHomePage();
    }
    var filePath = getPagePath(id);

    if ( ! fs.existsSync(filePath)) {
        return getPageNotFound();
    }

    return {
        template: 'page',
        page_title: 'My First Page',
        content: getPageContent(filePath),
        hasNavItems: true,
        navItems : getSidebarNavigation(config.contentFolder, config.contentFolder)
    };
}

function getPagePath(id) {
    return path.join(config.contentFolder, id + '.md');
}

function getPageContent(filePath) {
    var content = fs.readFileSync(filePath, 'utf-8');

    return marked(content);
}

function searchPages(query) {


    return {
        template: 'search',
        results: []
    };
}

function getHomePage() {
    return {
        template: 'index',
        page_title: 'Documentation Home'
    }
}

var getSidebarNavigation = function(dir, contentFolder) {
    var results = [];
    var list = fs.readdirSync(dir);
    var navItems;

    list.forEach(function(file) {
        file = path.join(dir, file);

        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            navItems = getSidebarNavigation(file, contentFolder);
            results.push({
                name: getNavItemName(file),
                href: '#',
                hasNavItems: navItems.length > 0,
                navItems: navItems
            });

        } else {
            // allow only markdown files
            if (path.extname(file) != '.md') {
                return;
            }

            results.push({
                name: getNavItemName(file),
                href: getNavItemLink(file, contentFolder),
                hasNavItems: false
            });
        }
    });

    return results;
}


function getNavItemName(file) {
    var fileName = path.basename(file, path.extname(file));
    return stringUtils.humanize(fileName);
}


function getNavItemLink(file, contentFolder) {
    var fileName = path.basename(file, path.extname(file));
    var filePath = path.join(path.dirname(file), fileName);

    return '/' + path.relative(contentFolder, filePath);
}

module.exports = {
    getHomePage: getHomePage,
    getPage: getPage,
    searchPages: searchPages
};
