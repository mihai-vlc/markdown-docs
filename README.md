# Welcome to MyDocs

MyDocs is a markdown powered knowledgebase.  
This is meant to allow for an organized and searchable personal documentation.


### Installation

Clone this repo, install the node modules and create the content folder.
```js
git clone https://github.com/ionutvmi/my-docs.git
cd my-docs
npm install
mkdir content
```

After that you can add your own md files in the content folder.  


### How to use ?

In order to view the content from the documentation you need to
place your markdown files (.md) into the `/content` folder.

To start the server cd into the root location of this application and
run `npm start`.

It is recommended that you keep the `/content` folder in a separate git repo thus
taking advantage of the version control for all your content.

The /content folder may contain a subfolder named `UPLOADS` which will be ignored
form the indexing in order to allow for static files (images, documents) to be linked
your documentation.


### Libraries used

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [express JS](http://expressjs.com/)
- [glob](https://www.npmjs.com/package/glob)
- [hogan-express](https://github.com/vol4ok/hogan-express)
- [lunr](http://lunrjs.com/)
- [underscore.string](https://github.com/epeli/underscore.string)
- [prismJS](http://prismjs.com/)
- [jQuery](http://jquery.com)
- [Bootstrap](http://getbootstrap.com/)
