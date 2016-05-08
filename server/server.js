var express = require('express');
var app = express();
var config = require('./config');
var path = require('path');
var mdocs = require('./mdocs');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(config.contentFolder, 'UPLOADS'));
  },
  filename: function(req, file, cb) {
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

app.use('/assets', express.static(path.resolve(__dirname + '/../assets')));
app.use('/content/UPLOADS', express.static(path.resolve(__dirname + '/../content/UPLOADS')));

app.get('/navigation', function(req, res) {
    try {
        res.json({
            success: true,
            navItems: mdocs.getNavigationItems()
        });
    } catch (e) {
        res.status(500).end();
    }
});

app.get('/loadPageData/:pageId(*)', function(req, res) {
    var pageData = mdocs.getPage(req.params.pageId);
    res.json(pageData);
});

// handle the pages requests
app.get('*', function(req, res) {

    try {
        var pageId = req.params[0];

        if ( pageId != '/' && ! mdocs.pageExists(pageId)) {
            res.status(404);
        }

        res.sendFile('index.html', { root: path.join(__dirname, '../') });
    } catch (e) {
        res.status(500).end();
    }
});



// handle the page actions
app.post('/save-page', function(req, res) {

    if (req.body.pageId && mdocs.savePage(req.body.oldPageId, req.body.pageId, req.body.content)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/commit', function(req, res) {
    if (mdocs.commit()) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/create-page', function(req, res) {

    if (req.body.pageId && mdocs.createPage(req.body.pageId, req.body.content)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

app.post('/delete-page', function(req, res) {

    if (req.body.pageId && mdocs.deletePage(req.body.pageId)) {
        res.json({
            success: true
        });
    } else {
        res.status(500).end();
    }
});

// handle the file upload
app.post('/upload', upload.single('file'), function(req, res) {
    res.json({
        filename: '/content/UPLOADS/' + req.file.filename
    });
});

// handle the preview request
app.post('/preview', function(req, res) {
    var content = req.body.content;
    if (content) {
        res.json({
            success: true,
            data: mdocs.generatePreview(content)
        });
    } else {
        res.status(500).end();
    }
});


// start the server
var server = app.listen(config.port, function() {
    var info = server.address();

    console.log('Example app listening at http://%s:%s', 'localhost', info.port);
});

