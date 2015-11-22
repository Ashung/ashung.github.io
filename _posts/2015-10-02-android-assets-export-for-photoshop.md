---
title: "Photoshop脚本: Android_Assets_Export.jsx"
excerpt: 使用Android_Assets_Export.jsx脚本导出Android资源。
updated: 2015-10-12 13:23
category: photoshop
tags: Photoshop Android Script
---

2010年的时候，我是这样导出移动应用和网页资源的：将内容复制到新的文档，调整画布，存储为Web格式，放大图像尺寸再次存储为Web格式。当时iOS只要1x和2x资源，Android也只要LDPI、MDPI和HDPI，我自己有一套动作配合快捷键来完成这一系列操作，这种方式当时已经够用了。

直到3年后，当时我帮人设计一个Android应用，我用提供多套分辨率资源抬高了一点佣金。交付前的那个晚上我开始切图，这种重复的无趣操作耗时，让人犯困，而且经常出错。项目结束后，我决定找个好的处理方法，试了当时各种的Photoshop扩展。2014年中，我到了另一家手机公司做UI设计工作，Android应用切图成了日常工作，于是决定自己动手写一个工具，这就是Android_Assets_Export.jsx的由来。此后这个脚本成了我工作中不可缺少的神器。

---

### 动作"复制选中图层至新文档"

Android_Assets_Export.jsx不是那种一键导出PSD文档内所有资源的脚本，脚本将当前画布作为切图边界，所以需要一个将选中图层复制至新文档并自动调整画布的动作。

动作步骤如下：

1. 菜单"图层 Layer" - "复制图层 Duplicate Layer..."，从对话框里选择复制到新文档；
2. 菜单"图像 image" - "裁切 Trim"，从对话框里选择裁切透明区域。

可以下载[Android_Design_Action.atn][Android_Design_Action.atn]动作，载入动作后，找到"Copy Layers to New Document"项，我一般在图层组内有加一个图标表示切图边界，所以这个动作都能准确的确定画布大小。

### Android_Assets_Export.jsx用法

首先下载[Android_Assets_Export.jsx][Android_Assets_Export.jsx](详细代码见[github][Android_Assets_Export]页面)，将要导出的图层复制到新文档后，就可以运行脚本了，此时会出现下图的对话框。脚本在Photoshop当前无文档打开的情况下将不运行。

![Android_Assets_Export.jsx](/images/android_assets_export_for_photoshop/android_assets_export_screenshot.png)_Android_Assets_Export.jsx主界面_

要运行Photoshop脚本可以用以下几种方法：

- 选取菜单"File 文件" > "Scripts 脚本" > "Browse... 浏览"，然后从浏览对话框中选择脚本文件打开。对于常用的脚本，我使用动作记录这一系列操作，动作可以设置快捷键或者以按钮形式显示。使用动作的方法不能更改脚本文件的路径和文件名，否则动作将会实效。
- 把脚本文件拖到应用程序区域内(画布区域除外)。Mac OS X系统可以拖到dock栏图标上，但请勿在图标上停留过久。
- 把脚本文件复制到应用程序安装目录下的"Presets/Scripts"文件夹内，重启应用程序之后，脚本将集成至应用程序的菜单内，通常出现在菜单"File 文件" > "Scripts 脚本"内，具体位置取决于脚本本身的设置。如果脚本定义了脚本的菜单位置，不看代码的话，很难知道集成至哪个菜单内。这种方法可以为脚本设置快捷键。
- 使用ExtendScript Toolkit打开后，选择目标程序，点击运行按钮。这种方式适合修改，编写或调试代码，如果脚本有log输出，只有这张方法可以看到log信息。

以下简单介绍下对话框中的每个表单项的功能。

"**Your document DPI**"项，表示PSD文档设计使用哪种DPI，请从下拉框选择合适的项，推荐设计时使用MDPI或XHDPI。

"**Export assets to**"项，表示资源保持的路径，默认路径是PSD文档所在位置的“res”文件夹，或者桌面上的“res”文件夹。

"**File name**"项，表示资源文件名，默认名称是当前选中图层图层名的变体，替换空格、"+"、"-"或"."为"\_"，删除图层名开头的数字和"\_"，并转为小写。文件名不需要后缀。

"**Nine-Patch Image**"项，表示是否为nine-patch图片，俗称点9图片。

"**Resource Folder**"项。表示存储到哪个文件夹。

"**Export**"项，表示支持导出DPI列表，默认是全勾选的，可以选择你需要的DPI。

修改设置完之后，点击"**Cancel**"关闭对话框，点击"**OK**"运行脚本，脚本运行成功后对话框将自动关闭。

### 缩放Nine-Patch图片

对于Nine-Patch图片我使用一种特殊的缩放方法，使四边的1px线条在缩放之后，仍然保持1px并且边缘不会出现模糊。但是为了保证缩放后的Nine-Patch图片能够使用而且效果较好，需要在制作Nine-Patch图片时注意一些问题。

- 尽量避免缩小处理，建议制作MDPI尺寸的Nine-Patch图片。
- 内容区域宽高，及不透明像素的边界坐标为偶数dp数值。
- 1px线条位于内容区域的坐标，线条长度均保持偶数dp数值。

![Nine Patch](/images/android_assets_export_for_photoshop/nine_patch.png)_Nine-Patch设计示意图，所有内容的坐标尺寸均为偶数dp数值。_

### 自定义配置

我通常使用MDPI尺寸设计应用界面，Android_Assets_Export.jsx的默认选项是针对MDPI尺寸设计的，但脚本支持各种尺寸，而且可以灵活扩展。如果你习惯使用其他DPI尺寸设计界面，则可以将脚本的默认界面修改为适合你的风格。

###### 修改默认文档DPI

使用文本编辑器(需要支持UTF-8编码)打开，找到`var psdDPI = 'mdpi';`(在代码26行左右的位置)
将`mdpi`修改为你使用的尺寸，目前支持`ldpi`、`mdpi`、`hdpi`、`xhdpi`、`xxhdpi`或`xxxhdpi`。

{% highlight javascript %}
var psdDPI = 'xhdpi';
{% endhighlight %}

如果你使用Retina屏幕的iMac或者Macbook，可以修改成`xhdpi`，否则建议量使用MDPI尺寸设计。

###### 修改资源文件名

前面说到，默认资源文件的命名是前选中图层图层名的变体，这些改变是为了让资源命名符合Android的规范，所以不宜建议修改这行代码(位于217行左右的位置)。

{% highlight javascript %}
// Java variable name rule.
fileName.text = fileName.text.replace(/(\.|\ |\+|\-)/g, '_').replace(/([0-9]|_)*/, '').toLowerCase();
{% endhighlight %}

###### 修改导出DPI列表

很多针对高端手机的应用不需要输出5种DPI资源，可以修改代码(位于28行左右的位置)让默认导出项只有你需要的PDI。

{% highlight javascript %}
// DPIs you want to export by default.
var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
// var dpis = ['nodpi', 'ldpi', 'mdpi', 'hdpi', 'tvdpi', 'xhdpi', '400dpi', 'xxhdpi', 'xxxhdpi'];
{% endhighlight %}

删除数组内不需要的项即可，下一行注释表示目前支持的完整DPI列表。

完整的代码托管在[github][Android_Assets_Export]上，代码是开源的，所以如果你熟悉JavaScript和ExtendScript API的话，就可以随意更改以适应自己的需求。


[Android_Design_Action.atn]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Actions/Android_Design_Action.atn
[Android_Assets_Export]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Photoshop_Scripts/Android_Assets_Export.jsx
[Android_Assets_Export.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Scripts/Android_Assets_Export.jsx
