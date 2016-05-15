module.exports = {
    port: 3030,
    theme: __dirname + '/../themes/default',
    contentFolder: __dirname + '/../content',
    // the length of the search preview
    excerpt_length: 400,
    readme: __dirname + '/../README.md',
    markdown: {
        html: true,
        linkify: true,
        typographer: true
    }
};
