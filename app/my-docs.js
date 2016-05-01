var config = require('../server/config');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var stringUtils = require('underscore.string');
var md = require('markdown-it')(config.markdown);
var lunr = require('lunr');
var Repository = require('git-cli').Repository;
var childProcess = require('child_process');

// markdown plugins
md.use(require('markdown-it-checkbox'));
md.use(require('markdown-it-toc'));

function getPageNotFound() {
    return {
        status: 404,
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
        page_title: path.basename(id),
        pageId: id,
        content: getPageContent(filePath),
        data: getPageContent(filePath, true),
        hasNavItems: true,
        navItems : getSidebarNavigation(config.contentFolder, id)
    };
}

function getPagePath(id) {
    return path.join(config.contentFolder, id + '.md');
}

function getPageContent(filePath, noRender) {
    var content = fs.readFileSync(filePath, 'utf-8');

    if (noRender) {
        return content;
    }

    return md.render(content);
}

function searchPages(query) {
    var content = path.join(config.contentFolder, '**/*.md');
    var ignored = path.join(config.contentFolder, 'UPLOADS/**/*.*');
    var files = glob.sync(content, {
        ignore: ignored
    });

    var idx = lunr(function(){
        this.field('title', { boost: 10 });
        this.field('body');
        this.pipeline.remove(lunr.stopWordFilter);
    });

    var cache = {};


    files.forEach(function (file) {
        var id = getNavItemLink(file);
        var title = getNavItemName(file);
        var content = fs.readFileSync(file, 'utf-8');

        idx.add({
            'id': id,
            'title': title,
            'body': content
        });

        cache[id] = {
            href: id,
            name: title,
            description: stringUtils.prune(content, config.excerpt_length),
            date: fs.statSync(file).mtime
        };
    });

    var results = idx.search(query).map(function (item) {
        return cache[item.ref];
    });

    return {
        template: 'search',
        hasResults: results.length > 0,
        results: results,
        query: query,
        hasNavItems: true,
        navItems : getSidebarNavigation(config.contentFolder)
    };
}

function getHomePage() {
    return {
        template: 'page',
        page_title: 'Documentation Home',
        content: getPageContent(config.readme),
        hasNavItems: true,
        navItems : getSidebarNavigation(config.contentFolder)
    }
}

var getSidebarNavigation = function(dir, activePage) {
    var results = [];
    var list = fs.readdirSync(dir);
    var navItems;

    list.filter(isNotHiddenItem).forEach(function(file) {
        file = path.join(dir, file);

        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            navItems = getSidebarNavigation(file, activePage);
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
            var href = '/' + getNavItemLink(file);
            results.push({
                name: getNavItemName(file),
                href: href,
                cssClass: href == activePage ? 'active' : '',
                hasNavItems: false
            });
        }
    });

    return results;
};


function isNotHiddenItem(el) {
    // hidden files/dirs
    if (path.basename(el)[0] == '.') {
        return false;
    }

    // uploads folder
    if (path.basename(el) == 'UPLOADS') {
        return false;
    }

    return true;
}

function getNavItemName(file) {
    var fileName = path.basename(file, path.extname(file));
    return stringUtils.humanize(fileName);
}


function getNavItemLink(file) {
    var fileName = path.basename(file, path.extname(file));
    var filePath = path.join(path.dirname(file), fileName);

    return path.relative(config.contentFolder, filePath).replace(/\\/g, '/');
}

function savePage(oldPageId, pageId, content) {
    try {
        fs.unlinkSync(getPagePath(oldPageId));
        fs.writeFileSync(getPagePath(pageId), content, 'utf-8');

        return true;
    } catch (e) {
        return false;
    }
}

function createPage(pageId, content) {
    try {
        fs.writeFileSync(getPagePath(pageId), content, 'utf-8');

        return true;
    } catch (e) {
        return false;
    }
}

function commit() {
    try {
        childProcess.execSync('git add --all', {
            cwd: config.contentFolder
        });

        var status = childProcess.execSync('git status --porcelain', {
            cwd: config.contentFolder
        }).toString();

        if (status) {
            childProcess.execSync('git commit -m "Automatic commit by web app"', {
                cwd: config.contentFolder
            });
        }

        // childProcess.execSync('git push origin master', {
        //     cwd: config.contentFolder
        // });

        return true;
    } catch (e) {
        return false;
    }
}

function deletePage (pageId) {
    try {
        fs.unlinkSync(getPagePath(pageId));

        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    getHomePage: getHomePage,
    getPage: getPage,
    searchPages: searchPages,
    savePage: savePage,
    createPage: createPage,
    deletePage: deletePage,
    commit: commit
};
