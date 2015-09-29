---
title:   Android应用启动图标快速导出方法 &ndash; Sketch篇
excerpt: 使用Sketch设计能够快速导出资产的应用启动图标模版.
updated: 
category: Android
tags: Android Sketch
---

首先你已经遵循Material Design设计文档中[图标规范][google_design_icon]([中文版本][google_design_icon_chinese])的要求设计了好192x192px的应用图标。将图标的所有图层新建分组，分组可以随意命名，在分组内增加一个192x192px透明或无填充无描边矩形，这个矩形作为图标导出时使用的切图边界。

建议养成在图层组或符号内，建立一个空白矩形来表示切图边界的习惯，我一般将这个图层命名为"#"。
{: .tips }


![android_launcher_icon_sketch](/images/android_launcher_icon_export_use_sketch/screenshot_1.png)
_Android应用启动图标模版_

此时图层结构类似上图，你可以[下载][sketch]上图的Sketch文件。

---

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

这个文件目前没有什么用，所以当你有点反感恶心的时候，我觉得你可以打开你熟悉Excel记录下来。

图层名 | Size | Suffix | Format
--- | --- | --- | ---
res/mipmap-mdpi/ic_launcher | 48w | | PNG
res/mipmap-hdpi/ic_launcher | 72w | | PNG
res/mipmap-xhdpi/ic_launcher | 96w | | PNG
res/mipmap-xxhdpi/ic_launcher | 144w | | PNG
res/mipmap-xxxhdpi/ic_launcher | 192w | | PNG
res/ic_launcher-web | 512w | | PNG

然后在图标图层组下，沿着"#"图层添加6个切片，参考上表，切片的名称分别为JSON中`file`的值去掉`.png`后缀。切片的设置项分别是：Size为JSON中`size`的值后加"w"，例如"48w"；Suffix留空；Format为"PNG"。

使用菜单"File" > "Exprot ⇧⌘E"导出图标，最终资源将会按照Android标准的目录结构保存。

以上已经可以满足一般设计师的需要了，如果你切片老是对不准边界，不想每次手动加6个切片，该6组设置项... 或者可能你的sketch里有很多图标，满足以上任何情况建议往下看。

---

这下我要把刚才写的JSON用上了，选中图层分组，菜单"Plugins" > "Custom Plugins..."，打开"Run Custom Script"对话框，删除示例的代码，把以下的代码复制到文本框内。这个脚本会自动添加切片，并且设置好切片的导出选项。

{% highlight javascript %}
var sliceOptions = [
    { "size" : 48,  "file" : "res/mipmap-mdpi/ic_launcher.png" },
    { "size" : 72,  "file" : "res/mipmap-hdpi/ic_launcher.png" },
    { "size" : 96,  "file" : "res/mipmap-xhdpi/ic_launcher.png" },
    { "size" : 144, "file" : "res/mipmap-xxhdpi/ic_launcher.png" },
    { "size" : 192, "file" : "res/mipmap-xxxhdpi/ic_launcher.png" },
    { "size" : 512, "file" : "res/ic_launcher-web.png" }
];
var layer = context.selection[0];
for(var i = 0; i < sliceOptions.length; i++) {
    var name = sliceOptions[i].file.substring(0, sliceOptions[i].file.lastIndexOf('.')),
        format = sliceOptions[i].file.substring(sliceOptions[i].file.lastIndexOf('.') + 1, sliceOptions[i].file.length),
        scale = sliceOptions[i].size / layer.absoluteRect().width();
    var slice = [MSSliceLayer new];
        [[slice frame] setX: 0];
        [[slice frame] setY: 0];
        [[slice frame] setWidth: layer.absoluteRect().width()];
        [[slice frame] setHeight: layer.absoluteRect().height()];
        [slice setName: name];
        [layer addSlice: slice];
    var option = [[[slice exportOptions] sizes] firstObject];
        [option setFormat: format];
        [option setScale: scale];
        [option setName: ""];
}
{% endhighlight %}

---

以上的脚本是不适合sketch里有很多图标分组的，因为我只为选中的第一项添加切片。若要适应多图标分组的sketch文件，也只需要稍作修改即可。

未完待续...



[google_design_icon]: http://www.google.com/design/spec/style/icons.html#icons-product-icons
[google_design_icon_chinese]: http://wiki.jikexueyuan.com/project/material-design/style/icons.html





[sketch]: /images/android_launcher_icon_export_use_sketch/android_icon_template.sketch