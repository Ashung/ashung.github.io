---
draft: true
title:  Android应用启动图标快速导出方法
excerpt: 使用Photoshop或Sketch设计Android应用启动图标模版, 以及快速导出资源的方法.
updated: 
category: Android
tags: Android  Photoshop Sketch
---

很多设计师在设计Android应用启动图标时并不会严格遵循Material Design的图标规范，但是他们会在意图标的尺寸，至于命名大多是随意命名然后丢给开发。



表示Android图标尺寸以及保存路径的JSON如下：
{% highlight javascript %}
// Android Icon
[
  {
    "size" : 192,
    "file" : "res/mipmap-xxxhdpi/ic_launcher.png"
  },
  {
    "size" : 144,
    "file" : "res/mipmap-xxhdpi/ic_launcher.png"
  },
  {
    "size" : 96,
    "file" : "res/mipmap-xhdpi/ic_launcher.png"
  },
  {
    "size" : 72,
    "file" : "res/mipmap-hdpi/ic_launcher.png"
  },
  {
    "size" : 48,
    "file" : "res/mipmap-mdpi/ic_launcher.png"
  },
  {
    "size" : 512,
    "file" : "res/ic_launcher-web.png"
  }
]
{% endhighlight %}

## Photoshop


```
default 48x48 res/mipmap-mdpi/, 72x72 res/mipmap-hdpi/, 96x96 res/mipmap-xhdpi/, 144x144 res/mipmap-xxhdpi/, 192x192 res/mipmap-xxxhdpi/, 512x512 res/-web
```

## Sketch


[google design icon]: http://www.google.com/design/spec/style/icons.html#icons-product-icons
[google design icon chinese]: http://wiki.jikexueyuan.com/project/material-design/style/icons.html
[psd]: {{ site.url }}/downloads/android_icon_template.psd
[sketch]: {{ site.url }}/downloads/android_icon_template.sketch