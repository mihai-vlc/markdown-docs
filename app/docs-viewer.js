
function getNotFound() {
    return {
        template: 'error',
        page_title: 'Documentation 404 Not Found'
    };
}

function getPage(id) {
    if (id === '/') {
        return getHomePage();
    }

    var page = getPagePath(id);

    return {
        template: 'page',
        page_title: 'My First Page',
        content: id
    };
}

function getPagePath(id) {
    return id;
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

module.exports = {
    getHomePage: getHomePage,
    getPage: getPage,
    searchPages: searchPages
};
