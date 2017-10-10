---
title:  "Jekyll Theme Design"
excerpt: A short excerpt ...
updated: 1977-01-02
category: jekyll
mathjax: true
mermaid: true
comment: false
tags: theme jekyll template blog
---

# Markdown h1
{: #h1}

## Markdown h2
{: #h2 }

### Markdown h3
{: #h3 }

#### Markdown h4 {#h4}

##### Markdown h5

###### Markdown h6

A simple Jekyll Theme.

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

---

Jekyll also offers powerful support for code snippets:

HTML

{% highlight html linenos %}
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>HTML</title>
    </head>
    <body>
        <h1>Hello HTML.</h1>
    </body>
</html>
{% endhighlight %}

JavaScript

{% highlight javascript %}
// JavaScript
alert("Hello Jekyll.");
{% endhighlight %}

CSS

{% highlight css %}
/* CSS */
.css {
    color: red;
}
#id {
    background: url(img/body.png) no-repeat;
}
{% endhighlight %}


Command line (bash)

{% highlight bash %}
gem sources --remove https://rubygems.org/
gem sources -a http://ruby.taobao.org/
sudo gem install jekyll
{% endhighlight %}


### Table

Table | Table | Table
Table | Table | Table

Table | Table | Table
:-- | :--: | --:
Table | Table | Table
Table | Table | Table

|---
| Default aligned | Left aligned | Center aligned | Right aligned
|-|:-|:-:|-:
| First body part | Second cell | Third cell | fourth cell
| Second line |foo | **strong** | baz
| Third line |quux | baz | bar
|---
| Second body
| 2 line
|===
| Footer row

### Math Blocks

MathJax is an open-source JavaScript display engine for LaTeX, MathML, and AsciiMath notation that works in all modern browsers.
[MathJax Documentation](http://docs.mathjax.org/en/latest/index.html)

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$

$$ x^2 + y^2 = z^2 $$

### Lists

- list
	1. list
	    1. list
	    2. list
	2. list
	    - list
	    - list
- list

### Definition Lists

term
: definition
: another definition

another term
and another term
: and a definition for the term

### Inline Links

This is a [link](http://example.com){:hreflang="de"}

### Reference Links

[kramdown systax][kramdown systax]

### Automatic Links

Information can be found on the <http://example.com> homepage.
You can also mail me: <me.example@example.com>

### Inline Style

This is inline style _red_{: style="color: red"}.

This is inline style.
{: style="color: red"}

### Images

![jekyll](http://jekyllrb.com/img/logo-2x.png)_Power by jekyll_

### Blockquotes

> Design is not just what it looks like and feels like, design is how it works.
> – Steve Jobs [^Steve_Jobs]

[^Steve_Jobs]: Steve Jobs

### Typographic Symbols

&lsquo; &rsquo; &ldquo; &rdquo; &#x2018; --- &#x2019; &#x201C; -- &#x201D; << >>

[kramdown systax]: http://kramdown.gettalong.org/syntax.html "kramdown systax"

*[HTML]: Hyper Text Markup Language

<div class="mermaid">
graph LR
    A --- B
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
</div>
