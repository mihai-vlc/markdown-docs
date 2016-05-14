var config = require('./config');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var stringUtils = require('underscore.string');
var md = require('markdown-it')(config.markdown);
var lunr = require('lunr');
var childProcess = require('child_process');
var mkdirp = require('mkdirp');
var deleteEmpty = require('delete-empty');

// markdown plugins
md.use(require('markdown-it-checkbox'));
md.use(require('markdown-it-toc'));


function getPage(id, format) {
    if (id === '/') {
        return getHomePage();
    }

    if ( ! pageExists(id)) {
        return getPageNotFound();
    }

    var filePath = getPagePath(id);
    return {
        id: id,
        pageTitle: path.basename(id),
        content: getPageContent(filePath, { render: format != 'source' })
    };
}

function pageExists(id) {
    var filePath = getPagePath(id);
    return fs.existsSync(filePath);
}

function getHomePage() {
    return {
        pageTitle: 'Documentation Home',
        content: getPageContent(config.readme, { render: true })
    }
}

function getPageNotFound() {
    return {
        status: 404,
        pageTitle: 'Error 404 Page Not Found'
    };
}

function getPagePath(id) {
    return path.join(config.contentFolder, id + '.md');
}

function getPageContent(filePath, options) {
    options = options || {};
    var content = fs.readFileSync(filePath, 'utf-8');

    if (options.render) {
        return md.render(content);
    }

    return content;
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
            href: '/' + id,
            name: title,
            description: stringUtils.prune(content, config.excerpt_length),
            date: fs.statSync(file).mtime
        };
    });

    var results = idx.search(query).map(function (item) {
        return cache[item.ref];
    });

    return results;
}


function getNavigationItems(dir) {
    dir = dir || config.contentFolder;
    var results = [];
    var list = fs.readdirSync(dir);
    var navItems;

    list.filter(isNotHiddenItem).forEach(function(file) {
        file = path.join(dir, file);

        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            navItems = getNavigationItems(file);
            results.push({
                name: getNavItemName(file),
                href: '#',
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
                href: href
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
        deletePage(oldPageId);
        createPage(pageId, content);

        return true;
    } catch (e) {
        return false;
    }
}

function createPage(pageId, content) {
    try {
        var pagePath = getPagePath(pageId);

        mkdirp.sync( path.dirname(pagePath) );
        fs.writeFileSync(pagePath, content, 'utf-8');

        return true;
    } catch (e) {
        return false;
    }
}

function deletePage(pageId) {
    try {
        var pagePath = getPagePath(pageId);
        fs.unlinkSync(pagePath);

        deleteEmpty.sync(config.contentFolder);

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

function generatePreview(content) {
    return md.render(content);
}

module.exports = {
    getHomePage: getHomePage,
    getPage: getPage,
    pageExists: pageExists,
    searchPages: searchPages,
    savePage: savePage,
    createPage: createPage,
    deletePage: deletePage,
    generatePreview: generatePreview,
    getNavigationItems: getNavigationItems,
    commit: commit
};
