---
title: iOS应用图标快速导出 &ndash; 使用Photoshop或Sketch
excerpt: 使用Photoshop或Sketch设计能够快速导出资源的iOS图标应用模版.
updated: 2015-10-08
category: Sketch Photoshop
tags: iOS iPhone iPad Photoshop Sketch
---

### 图标尺寸

从官方文档[iOS Human Interface Guidelines - Icon and Image Sizes][HIG - Icon and Image Sizes]，还有[App Icons on iPad and iPhone][App Icons on iPad and iPhone]可知，除了"iTunesArtwork"(512px)和"iTunesArtwork@2x"(1024px)必须严格命名外，在iOS 3.2以后其他图标资源都没有强制固定的名称。我觉得用"icon-60.png"这种文件命名形式，更能清晰区分不同尺寸的图片。

上面的2个文档的尺寸有些出入，建议咨询开发人员，以最新版本Xcode上需要的尺寸为准。下表是从Xcode 7.0.1上的Asset Catalogs得到的数据，表示各个平台需要的图标尺寸。

平台 | 尺寸(px)
--- | ---
Apple Watch | 48, 55, 58, 87, 80, 88, 172, 196
CarPlay | 120, 180
iPad iOS 7.0 and Later | 29, 58, 40, 80, 76, 152
iPad iOS 6.1 and Prior | 29, 58, 50, 100, 72, 144
iPhone iOS 7.0 and Later | 58, 87, 80, 120, 180
iPhone iOS 6.1 and Prior | 29, 58, 57, 114
Mac | 16, 32, 64, 128, 256, 512, 1024

以上尺寸不包括iPad Pro，因为我当前使用的Xcode 7.0上没有显示iPad Pro的尺寸信息。

#### iPhone应用

iPhone应用图标尺寸如下:  
29, 57, 58, 87, 80, 114, 120, 180, 512, 1024

#### iPad应用

iPad应用图标尺寸如下:  
29, 40, 50, 58, 72, 76, 80, 100, 144, 152, 512, 1024

#### 通用应用

通用应用图标尺寸如下:  
29, 40, 50, 57, 58, 72, 76, 80, 87, 100, 114, 120, 144, 152, 180, 512, 1024

#### Web clip icon

Web clip icon是将网页添加至主屏时使用的图标，默认命名方式使用"apple-touch-icon-76x76.png"。

图标尺寸如下:  
76, 120, 152, 167, 180

#### 图标设计尺寸

以下我使用 **120px** 作为基础的图标尺寸，其他资源将由这个尺寸自动缩放后生成。
这个没有标准可言，你可以使用其他任何尺寸，但建议矢量图层使用小尺寸放大生成其他资源，
而位图则使用大尺寸缩小生成其他资源。

---

### 使用Photoshop

我使用Photoshop的Generator功能导出资源，如果你不了解Generator用法请参考[Photoshop Help /
Generate image assets from layers][generate-assets-layers]
(中文版本，[Photoshop帮助/从图层生成图像资源][generate-assets-layers-chinese])。

需要对PSD文档进行以下几步操作:

1. 将图标内容的所有图层组成一个分组，命名为"icon.png"；
2. 为分组添加一个120x120px的矩形位图蒙板，蒙板选区的位置即是图标资源的边界区域；
3. 添加一个空白普通图层作为默认设置图层，用下面的代码作为图层名。
`29`表示资源尺寸，`-29`资源文件名后缀，就是说29px的资源名称为"icon-29.png"。

iPhone应用图标默认设置图层命名:

~~~
default 29 -29, 57 -58, 58 -58, 87 -87, 80 -80, 114 -144, 120 -120, 180 -180,
512 -512, 1024 -1024
~~~

iPad应用图标默认设置图层命名:

~~~
default 29 -29, 40 -40, 50 -50, 58 -58, 72 -72, 76 -76, 80 -80, 100 -100, 144 -144,
152 -152, 512 -512, 1024 -1024
~~~

通用应用图标默认设置图层命名:

~~~
default 29 -29, 40 -40, 50 -50, 57 -57, 58 -58, 72 -72, 76 -76, 80 -80, 87 -87, 100 -100,
114 -114, 120 -120, 144 -144, 152 -152, 180 -180, 512 -512, 1024 -1024
~~~

如果你设计Web clip图标，图标分组命名为"apple-touch-icon.png"，默认设置图层则命名为:

~~~
default 76 -76x76, 120 -120x120, 152 -152x152, 167 -167x167, 180 -180x180
~~~

最后保存PSD文档，使用"File" > "Generate"打开"Image Assets"。
此时所有所需资源将会被存到PSD文档同级的"[psd文件名]-assets"文件内。

---

### 使用Sketch

将图标所有图层新建名为"icon"的分组，如果设计Web clip图标则命名为"apple-touch-icon"，然后设置图层组为可导出。
即选中图层组之后，点击在右侧的"检查器"面板最底部的"Make Exportable"按钮。

我使用添加多个导出选项的方式生成多个尺寸资源。
导出选项的设置项分别是：Size为尺寸后加"w"，例如"29w"；Suffix为尺寸前加"-"，例如"-29"；Format为"PNG"。

你可以人工的把所有尺寸一个个添加到导出选项上，或者选择用运行脚本方式自动添加设置。
选中图层分组，菜单"Plugins" > "Custom Plugins... ⌃⇧K"，打开"Run Custom Script"对话框，
运行以下代码。

你可能需要根据你的项目所需尺寸，修改代码中`var sizes = []`方括号内的数值。

{% highlight javascript %}
var doc = context.document;
var sizes = [29, 40, 50, 57, 58, 72, 76, 80, 87, 100, 114, 120, 144, 152, 180, 512, 1024];
var group = context.selection[0];
// Clear exportable sizes
while([[[group exportOptions] sizes] count] > 0) {
    [[[[group exportOptions] sizes] firstObject] remove];
}
// Add export sizes
for(var i = 0; i < sizes.length; i ++) {
    var option = [[group exportOptions] addExportSize];
        [option setFormat: "png"];
        [option setScale: sizes[i] / group.absoluteRect().width()];
        [option setName: "-" + sizes[i]];
}
//Refresh inspector hack
[[doc currentPage] deselectAllLayers];
[group select:true byExpandingSelection:true];
{% endhighlight %}

最后使用菜单"File" > "Exprot ⇧⌘E"导出资源。

[HIG - Icon and Image Sizes]: https://developer.apple.com/library/prerelease/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html
[App Icons on iPad and iPhone]: https://developer.apple.com/library/ios/qa/qa1686/_index.html
[generate-assets-layers]: https://helpx.adobe.com/photoshop/using/generate-assets-layers.html
[generate-assets-layers-chinese]: https://helpx.adobe.com/cn/photoshop/using/generate-assets-layers.html
