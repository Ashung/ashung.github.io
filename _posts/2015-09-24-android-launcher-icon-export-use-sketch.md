---
title:   Android应用启动图标快速导出方法 &ndash; Sketch篇
excerpt: 使用Sketch设计能够快速导出资产的应用启动图标模版.
updated: 
category: Android
tags: Android Sketch
---

首先你已经遵循Material Design设计文档中的[图标规范][google_design_icon]([中文版本][google_design_icon_chinese])的要求设计了好192x192px的应用图标。将图标的所有图层新建分组，分组可以随意命名，在分组内增加一个192x192px透明或无填充无描边矩形，这个矩形作为图标导出时使用的切图边界。

建议养成在图层组或符号内，建立一个空白矩形来表示切图边界的习惯，我一般将这个图层命名为"#"。
{: .tips }

我用JSON格式表示Android图标尺寸及其保存路径。

{% highlight javascript %}
[
  { "size" : 48,  "file" : "res/mipmap-mdpi/ic_launcher.png" },
  { "size" : 72,  "file" : "res/mipmap-hdpi/ic_launcher.png" },
  { "size" : 96,  "file" : "res/mipmap-xhdpi/ic_launcher.png" },
  { "size" : 144, "file" : "res/mipmap-xxhdpi/ic_launcher.png" },
  { "size" : 192, "file" : "res/mipmap-xxxhdpi/ic_launcher.png" },
  { "size" : 512, "file" : "res/ic_launcher-web.png" }
]
{% endhighlight %}



[google_design_icon]: http://www.google.com/design/spec/style/icons.html#icons-product-icons
[google_design_icon_chinese]: http://wiki.jikexueyuan.com/project/material-design/style/icons.html





[sketch]: /downloads/android_icon_template.sketch