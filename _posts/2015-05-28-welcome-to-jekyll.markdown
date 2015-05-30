---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-05-28 18:27:28
categories: tests
---

# Markdown h1 

## Markdown h2

### Markdown h3

#### Markdown h4

##### Markdown h5

###### Markdown h6

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

HTML

{% highlight html %}
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

Python

{% highlight css %}
# Python
import os
assets = './res'
listing = os.listdir(assets)
for folder in ['drawable-', 'mipmap-']:
    for dpi in ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']:
        if os.path.exists('./res/' + folder + dpi):
            for image in os.listdir('./res/' + folder + dpi):
                os.system("pngout /y " + './res/' + folder + dpi + "/" + image)
{% endhighlight %}

Ruby

{% highlight ruby %}
# Ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Java

{% highlight java %}
TextView textview = (TextView) findViewById(R.id.textview);
/*
textview.setText(Html.fromHtml("<b>Bold</b> <i>Italic</i>"));
*/
textview.setText(Html.fromHtml(getString(R.string.htmltag)));
{% endhighlight %}

XML
{% highlight xml %}
<!-- Android -->
<TextView android:fontFamily="sans-serif-thin" />
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help


Table | Table | Table 
-- | -- | -- 
Table | Table | Table 
Table | Table | Table 

Table | Table | Table 
--: | --: | --: 
Table | Table | Table 
Table | Table | Table

- list
	1. list
	2. list
- list

> Design is not just what it looks like and feels like, design is how it works. 
> – Steve Jobs

---


![img]({{ site.url }}/assets/welcome-to-jekyll/Octocat.png)
