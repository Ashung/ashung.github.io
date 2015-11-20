---
title:  Android应用启动图标快速导出方法 (Photoshop篇)
excerpt: 使用Photoshop设计能够快速导出资源的应用启动图标模版.
updated:
category: Photoshop
tags: Android  Photoshop Generator icon psd
---

### 图标尺寸

国内多数设计师在设计Android应用启动图标时，并不会严格遵循[Material Design的图标规范][google_design_icon]([中文版本][google_design_icon_chinese])，他们更在意图标的尺寸，至于命名规则和文件夹结构大多设计师是不清楚的。为了提高效率设计师提供给开发人员的资源，应该尽量是符合开发需要可以直接使用的。

在用Android Studio建立一个Demo项目后，开发工具会帮助开发者初始化一个基础Android应用需要的图标资源，我将Demo项目内的图标尺寸、位置、命名等信息，整理出了下表。这些信息也可以从网上找到。ADT建立的项目默认则将图标放在以"drawable-"为前缀的文件夹下。

图标尺寸(px) | 图标在软件项目中的位置和命名。
--- | ---
48 | res/mipmap-mdpi/ic_launcher.png
72 | res/mipmap-hdpi/ic_launcher.png
96 | res/mipmap-xhdpi/ic_launcher.png
144 | res/mipmap-xxhdpi/ic_launcher.png
192 | res/mipmap-xxxhdpi/ic_launcher.png
512 | res/ic_launcher-web.png

以上这些尺寸资源建议尽量全部提供，但设计时只需要按照规范中提到的规则，设计192px的图标即可。

---

### Adobe Generator

我用了Generator的一个特性快速导出资产，这需要在Photoshop CC 2014及之后的版本中才可以使用。激活Generator功能需要在首选项"Prferences" > "Plug-ins" > "Generator"对话框中勾选"Enable Generator"选项。基础的Generator用法参考[Photoshop Help /
Generate image assets from layers][generate-assets-layers]（中文版本，[Photoshop帮助/从图层生成图像资源][generate-assets-layers-chinese]）。

另外图标的PSD文档也需要满足针对Generator优化的2点小要求：

1. 将图标内容的所有图层组成一个分组，命名为"ic_launcher.png";
2. 为分组添加一个192x192px的矩形位图蒙板，蒙板选区的位置即是图标资源的边界区域。

完成以上的所有要求之后，在图标的PSD文档中，新建一个普通图层，将图层名修改为以下内容，这段语句定义资源导出时的尺寸、存储路径和文件名后缀等信息。

~~~
default 48x48 res/mipmap-mdpi/, 72x72 res/mipmap-hdpi/,
96x96 res/mipmap-xhdpi/, 144x144 res/mipmap-xxhdpi/,
192x192 res/mipmap-xxxhdpi/, 512x512 res/-web
~~~

以"default"关键字加空格开头，后面接尺寸标识符，例如`48x48`或`200%`,  随后增加一个空格紧接文件夹与文件后缀标识符，`/`前为文件夹，`/`后为文件名后缀，例如`200% ios/@2x`，文件夹与文件后缀标识符为可选项，多项配置使用`,`或`+`隔开。更多的Generator图层命名规则，查阅官方[Generate-Web-Assets-Functional-Spec](
https://github.com/adobe-photoshop/generator-assets/wiki/Generate-Web-Assets-Functional-Spec)。
{: .tips }

最后保存PSD文档，使用"File" > "Generate"打开"Image Assets"。此时所有所需资源将会被存到PSD文档同级的"[psd文件名]-assets"文件内。资源生成完之后建议关闭"Image Assets"。

[下载Android应用启动图标PSD模版][psd]

[google_design_icon]: http://www.google.com/design/spec/style/icons.html#icons-product-icons
[google_design_icon_chinese]: http://wiki.jikexueyuan.com/project/material-design/style/icons.html
[psd]: /images/android_launcher_icon_export_use_photoshop/android_icon_template.psd
[generate-assets-layers]: https://helpx.adobe.com/photoshop/using/generate-assets-layers.html
[generate-assets-layers-chinese]: https://helpx.adobe.com/cn/photoshop/using/generate-assets-layers.html

*[ADT]: Android Developer Tools
