var express = require('express');
var app = express();
var config = require('./config');
var hoganExpress = require('hogan-express');
var path = require('path');
var myDocs = require('../app/my-docs');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(config.contentFolder, 'UPLOADS'));
  },
  filename: function (req, file, cb) {
    var name = file.originalname;
    cb(null, 'uploaded-' + Date.now() + path.extname(name));
  }
})

var upload = multer({ storage: storage })

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/assets', express.static('public/assets'));
app.use('/content/UPLOADS', express.static('content/UPLOADS'));

// use hogan-express to render the templates
app.set('view engine', 'html');
app.set('layout', 'layout');
app.set('partials', {
    'navigation' : 'partials/navigation',
    'modal' : 'partials/modal'
});
// app.enable('view cache');
app.set('views', path.join(config.theme, 'templates'));
app.engine('html', hoganExpress);

// handle the pages requests
app.get('*', function(req, res){
    var page;

    if (req.query.search) {
        // do the search logic
        page = myDocs.searchPages(req.query.search);

    } else if (req.params[0]) {
        // render the documentation page
        page = myDocs.getPage(req.params[0]);

        if (page.status) {
            res.status(page.status);
        }

    } else {
        // index page
        page = myDocs.getHomePage();
    }

    if (req.query.format == 'source') {
        res.json({
            pageId: page.pageId,
            content: page.data
        });

    } else if (req.query.format == 'ajax') {
        page.layout = '';
        res.render('ajax', page);

    } else {
        res.render(page.template, page);
    }


});

// handle the page actions
app.post('/save-page', function (req, res) {

    if (req.body.pageId && myDocs.savePage(req.body.oldPageId, req.body.pageId, req.body.content)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/commit', function (req, res) {
    if (myDocs.commit()) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/create-page', function (req, res) {

    if (req.body.pageId && myDocs.createPage(req.body.pageId, req.body.content)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/delete-page', function (req, res) {

    if (req.body.pageId && myDocs.deletePage(req.body.pageId)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

// handle the file upload
app.post('/upload', upload.single('file'), function (req, res) {
    res.json({
        filename: '/content/UPLOADS/' + req.file.filename
    });
});

// handle the preview request
app.post('/preview', function (req, res) {
    var content = req.body.content;
    if (content) {
        res.json({
            success: true,
            data: myDocs.generatePreview(content)
        });
    } else {
        res.status(500).end();
    }
});


// start the server
var server = app.listen(config.port, function () {
    var info = server.address();

    console.log('Example app listening at http://%s:%s', 'localhost', info.port);
});

