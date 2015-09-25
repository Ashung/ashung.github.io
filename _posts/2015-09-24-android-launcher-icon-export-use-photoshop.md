---
title:  Android应用启动图标快速导出方法 &ndash; Photoshop篇
excerpt: 使用Photoshop设计Android应用启动图标模版, 以及快速导出资产.
updated: 
category: Android
tags: Android  Photoshop Generator icon
---

很多设计师在设计Android应用启动图标时并不会严格遵循Material Design的图标规范，他们更在意图标的尺寸，至于命名规则和文件夹结构大多设计师是不清楚的。

用Android Studio建立一个Demo项目，IDE会帮助开发者初始化一个基础Android应用需要的图标资源，我将Demo项目内的图标尺寸、位置、命名等信息，整理出了下表。这些信息也可以从网上搜索到。

图标尺寸(px) | 图标在软件项目中的位置和命名
--- | --- 
48 | res/mipmap-mdpi/ic_launcher.png
72 | res/mipmap-hdpi/ic_launcher.png
96 | res/mipmap-xhdpi/ic_launcher.png
144 | res/mipmap-xxhdpi/ic_launcher.png
192 | res/mipmap-xxxhdpi/ic_launcher.png
512 | res/ic_launcher-web.png

ADT建立的项目默认是将图标方在"res/drawable-?dpi/"下的。







## Photoshop





~~~
default 48x48 res/mipmap-mdpi/, 72x72 res/mipmap-hdpi/, 
96x96 res/mipmap-xhdpi/, 144x144 res/mipmap-xxhdpi/, 
192x192 res/mipmap-xxxhdpi/, 512x512 res/-web
~~~




[google design icon]: http://www.google.com/design/spec/style/icons.html#icons-product-icons
[google design icon chinese]: http://wiki.jikexueyuan.com/project/material-design/style/icons.html
[psd]: /downloads/android_icon_template.psd

*[ADT]: Android Developer Tools

