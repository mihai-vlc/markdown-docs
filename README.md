# Welcome to MyDocs

MyDocs is a markdown powered knowledgebase.  
This is meant to allow for an organized and searchable personal documentation.

@[toc](Table of Contents)


### Installation

Clone this repo, install the node modules and create the content folder.
```bash
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


## Quick reference

#### General text formatting

```markdown
~~Strikethrough~~
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

# This is an <h1> tag
## This is an <h2> tag
###### This is an <h6> tag
```

#### Lists

```
* Item 1
* Item 2
  * Item 2a
  * Item 2b

1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b
```

#### Images and Links

```
Links:
[click here](http://example.com)

Images
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)

Combined
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
```

#### Blockquotes
```
As Kanye West said:

> We're living the future so
> the present is our past.
```

#### Tables

```
First Header  | Second Header
------------- | -------------:
Content Cell  | Content Cell
Content Cell  | Content Cell
```
Note: Using `:` on the header row you can define the alignement.

#### Inline code
```
I think you should use an
`<addr>` element here instead.
```

#### Checkboxes
```
- [x] this is a complete item
- [ ] this is an incomplete item
```

#### Horizontal separators

```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

#### Table of contents

```
@[toc](Table of Contents)
```


#### Labels
```markup
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>


### Libraries used

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [markdown-it-checkbox](https://github.com/mcecot/markdown-it-checkbox)
- [markdown-it-toc](https://github.com/samchrisinger/markdown-it-toc)
- [express JS](http://expressjs.com/)
- [glob](https://www.npmjs.com/package/glob)
- [hogan-express](https://github.com/vol4ok/hogan-express)
- [lunr](http://lunrjs.com/)
- [underscore.string](https://github.com/epeli/underscore.string)
- [prismJS](http://prismjs.com/)
- [jQuery](http://jquery.com)
- [Bootstrap](http://getbootstrap.com/)
