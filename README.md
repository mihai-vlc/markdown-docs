# Operationals Run Books
## Run Books Templates
The files in [content/templates/](https://stash.corp.blablacar.com/projects/ADMIN/repos/ops-run-book/browse/content/templates/) are markdown templates built by [runbookcollab.info](http://runbookcollab.info/) and available on [GitHub](https://github.com/SkeltonThatcher/run-book-template).

## Howto
### Initialize
Create a "product" directory in`run-books`

```
mkdir run-books/cassandra
```

Copy the `operational-tasks.md` template

```
cp templates/operational-tasks.md run-books/cassandra
```

### Write you run books
Fill up the sections (at least **Troubleshooting** and **Routine and sanity checks**)

```
## Troubleshooting
#### A node shutdown for less than 3 hours
- Just start back the service
```

### Add shortcuts
Fill the **Shortcuts** with local links (HTLML Anchor Tags)

**What to do when**: List of local links to specific runbooks to run in stressful situations (on call)

**How do I**: List of local links to general administration texts that explain how to perform different administration tasks.

Add your anchor tag (\<a name=""">\</a>):
```
## Troubleshooting
#### <a name="trouble1"></a> A node shutdown for less than 3 hours
- Just start back the service
```

Create a local link:
```
## Shortcuts
### What to do when...
- [A node shutdown for less than 3 hours](#trouble1)
```

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
- [RequireJS](http://requirejs.org/)
- [CodeMirror](https://codemirror.net/)
- [Lobibox](http://lobianijs.com/site/lobibox)
- [Inline Attachment](http://git.razko.nl/InlineAttachment)
