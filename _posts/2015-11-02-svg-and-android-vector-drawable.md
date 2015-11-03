---
title: 导出SVG与Android VectorDrawable转换
excerpt:   从Illustrator、PhotoShop、Sketch导出SVG以及转换为Android VectorDrawable.
category: Android
tags: Illustrator Photoshop Sketch Android SVG VectorDrawable
---

在我们的开发获得Android 5.0源码后并决定将系统从4.4升级至5.0的那个时候，负责SystemUI的设计同事跟我说，开发没找到通知中心图标的PNG，资源文件夹里面都是叉ML (我一直不习惯这边的开发老是把XML读成叉ML，连设计也跟着念叉ML，码农和死美工们都很有山寨之都的特色)，开发给了他Github上的[svg2android][svg2android]项目让设计师转换资源(当时这个项目支持情况还很差)。我是设计团队里唯一懂代码的，我看了下资料大概明白是什么情况，我让他使用Illustrator设计图标并写了一些Illustrator的导出脚本，这就是当时可用的临时处理方案。

后来他工作的转交给了其他几个设计师，至今都没处理好这个事情。设计不肯安装开发工具无法判断转换后的文件是否可用，而开发用的是淘汰了的基于Eclipse的ADT，根本没有VectorDrawable预览功能。新技术对水平较差的设计师和开发者都是个很大的考验，至今开发都没把VectorDrawable的特色动画加上。我当时对VectorDrawable的印象就是Google不让死美工们好好切图了。

### VectorDrawable不是SVG

虽然VectorDrawable需要从SVG文件转换，这并不代表VectorDrawable是SVG，它只是用了SVG的path data属性，并借鉴了一些东西。这技术被引入就已经设定开发者是熟悉SVG的，完全可以手动从SVG转换成VectorDrawable。设计软件生成的SVG可能会包含rect(矩形)、circle(圆)、 ellipse(椭圆)等标签，这些标签不带path data属性，开发者是无法手动直接转换成VectorDrawable的。另外设计软件生成的SVG代码中的viewport、pathdata的数值还经常出现位置错误。如果你只想导出SVG然后把剩下的交给开发手动或借助工具转换VectorDrawable，那么你至少要保证SVG代码中的数值是无误的。很多设计师的电脑里都没一个像样的文本编辑器，检查SVG文件的代码只能靠浏览器的查看源码功能，但很多设计师又对代码非常反感，检查SVG文件是否有误的工作只能在等到应用被编译出来安装到设备上，并且显示出包含那个资源的界面，然后交给设计师检查，才能最终确定SVG文件是否有误。

### VectorDrawable优劣

先说优点吧。VectorDrawable只需要一套尺寸的资源，但文件往往会比同内容的PNG略大；可以对形状惊喜旋转、翻转、染色、拉伸，和共用相同形状的路径数据；支持动画，相比以前的序列帧动画资源会少很多。

我不清楚VectorDrawable和PNG之间存在的性能差异有多大。VectorDrawable是无法向后兼容的，只有Android 5.0的设备才能使用，如果应用要兼顾旧版本，且不做两种兼容方案的话，明显VectorDrawable是不适合的。目前VectorDrawable的路径上还不支持渐变，也就是说只能做一些纯色的图形。VectorDrawable并不是可以随意放大的矢量图片，要得到一个资源的放大或缩小的版本，得需要两个VectorDrawable文件，但是它们之间可以共用path的数据。文件比PNG资源占用空间大，如果应用仅支持一个DPI，并且不考虑图标上的动画，完全可以直接用PNG图片。另外这个技术对设计师比较具有挑战，可能会影响项目的进度，建议先让开发和设计师评估下。

从Github上的[Material design icons][Material_design_icons]项目来看Google并没有开放相关的工具，但是却设计了包含各种格式的近千个图标，看来他们是不建议设计师重做其他风格图标的。

### 源文件尺寸

如果已经确定要采用VectorDrawable，建议使用MDPI尺寸作为源文件的尺寸。因为VectorDrawable代码内的宽高数值使用dp单位，目前的常用转换器不会计算px对应的dp值，导致开发需要逐个文件修改宽高属性。已经用其他尺寸设计了，重做吧。

---

### 使用Illustrator导出SVG

我认为Illustrator目前最好的SVG工具，Illustrator的复合路径能避免生成那些VectorDrawable不支持的标签，Photoshop则很难避免不生成VectorDrawable不支持几何形状标签，这也是当时[svg2android][svg2android]支持还不是很好的情况下选择使用Illustrator的原因。

在Illustrator中另存为SVG，以及如何设置，网上有很多资料。你可以从查看官方帮助文档[存储图稿-以 SVG 格式存储](https://helpx.adobe.com/cn/illustrator/using/saving-artwork.html)，或者[Exporting SVG for the web with Adobe Illustrator CC](http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html)。

另外在Illustrator直接复制内容，转至文本编辑器粘贴，就可以得到SVG代码。我在做Web用的SVG时就经常这么干，画个矩形作为图标的边界，把图标连同矩形一起复制，然后在文本编辑器里在删除矩形的代码。但这对设计师来说太复杂了，也不适合批量操作。

上面提到的最初的临时处理方案是用Illustrator画板导出SVG，当时设计师已经在Photoshop设计完图标了，我让他添加表示图标边界的图层，并把所有内容转到Illustrator上，我用一段脚本把选中图层转为画板并且自动对齐像素，画板大小为图标切图大小，然后手工把图标内容复制对齐到画板上，几何形状转为复合路径，画布命名为资源文件名，最后用另外一段脚本导出画板。后来图标越来越多，并且画板只能最多支持100个，我就放弃这张做法了。你可以从Github上下载到[Selection_to_Artboard.jsx][Selection_to_Artboard.jsx](将选择图层转为画板)和[Artboards_To_SVG.jsx][Artboards_To_SVG.jsx](将画板导出为SVG)这两个脚本，它们对于部分项目还是适用的。

![](/images/svg_and_android_vector_drawable/screenshot_ai.png)_使用Illustrator SVG Exporter导出SVG时推荐的图层结构_

当项目较大时推荐使用[Illustrator SVG Exporter][illustrator-svg-exporter]，这是一个没有界面的脚本，用于导出文档中带".svg"后缀的路径、复合路径、组合、图层、画板等等，具体操作见Illustrator SVG Exporter的项目主页。Illustrator SVG Exporter默认导出的SVG是裁切透明像素的，所以需要在组合、图层内包含一个矩形作为切图边界，矩形可以是无填充的路径，
然后在转换过程中去掉这个作为切图区域矩形的代码。SVG中无填充的路径显示为黑色，如果图标也是黑色或者接近黑色，可以使用一个固定色值作为边界图层的填充。选用画板则不需要处理这种SVG代码中的多余标签。

Illustrator SVG Exporter默认导致的SVG路径数据是精确到4位小数，小图标并不需要这么精确，可以通过修改源码改为1或2位小数。大概在代码的41行，找到`svgOptions.coordinatePrecision = 4`，将数值改为`1`或`2`。

{% highlight javascript %}
svgOptions.coordinatePrecision = 2;
{% endhighlight %}

[Material design icons][Material_design_icons]的SVG也是带有多余的矩形的，可见处理方法类似。批量删除这种多余标签除了人工删除和人工写脚本删除，别无他法。Google也没公布他们用的处理脚本。对代码恐惧，连运行代码都有难度的设计师而言，确实是很大挑战。

##### Illustrator注意事项
* 导出脚本可能未在较低版本的Ai上测试。
* Illustrator CC 2015.0.0的版本无法导出SVG，请升级至最新版本。
* 不要用Illustrator打开SVG文件修改再保存，这样经常会导致保存后的SVG代码中viewport、path标签的数值偏移。
* 路径描边需要扩展为填充。

### PhotoShop使用Adobe Generate导出SVG

![](/images/svg_and_android_vector_drawable/screenshot_ps.png)_使用PhotoShop的Generate导出SVG_

早期的PhotoShop有一些商业的插件和脚本可以导出SVG，我没有用过这类插件和脚本，这里使用的是Adobe Generate的方法，具体使用方法参考[Generate Web Assets Functional Spec](https://github.com/adobe-photoshop/generator-assets/wiki/Generate-Web-Assets-Functional-Spec). 

我采用命名图层组，并在图层组最下层增加一个矩形图层作为切图的区域。这样导出的svg代码同样会有多余标签，还是要面对删除多余标签的问题。在PhotoShop CC 2015可以使用画板导出SVG，将画板大小作为切图区域，这样可以不需要额外图层作为边界。

![](/images/svg_and_android_vector_drawable/screenshot_ps_artboard.png)_使用PhotoShop CC 2015的Artboard导出SVG_

##### PhotoShop注意事项
* PhotoShop导出的SVG代码不像Illustrator那样是可以设置的，PhotoShop导出的SVG代码中属性被分离成CSS样式，[svg2android][svg2android]目前还一直不支持，所以转换之后是黑色的。
* 因为PhotoShop没有矢量预览，所以尽量注意路径结合处的细节。
* Adobe Generator在PhotoShop CC 14.1+、14.2+及以上版本上可用。
* PhotoShop CC 2014.2及以后的版本可以单独导出单个图层组，低版本将要导出的图层复制到新文档，再打开Generator生成器。
* 路径描边需要扩展为填充。

### Sketch导出SVG

![](/images/svg_and_android_vector_drawable/screenshot_sketch.png)_使用Sketch的切片导出SVG_

如果使用Sketch建议通过切片方式导出SVG，并且切片不要包含在画板内，这样生成的SVG代码较精简，而且不依赖多余的图层。使用可导出图层就需要增加矩形图层作为切图边界，该图层不可设置为无填充或者不可见，建议填充一个固定的色值。Sketch的优点是导出不需要借助复制的脚本或插件。

Sketch导出的SVG代码冗余比较多且无法设置，而且经常增加一些奇怪的行为，如果画布中只有一个图层，Sketch会将路径的数据加在路径父级的标签上。Github上有一些清理Sketch SVG代码的工具，都没有界面的，对设计师来说又是挑战。

Github上一些清理Sketch SVG代码的工具:

* [clean-sketch](https://github.com/overblog/clean-sketch)，[gulp-clean-sketch](https://github.com/overblog/gulp-clean-sketch) Node.js模块和gulp插件。
* [Sketch SVG cleaner](https://github.com/Warry/SketchCleaner) Node.js命令行工具。
* [clean-sketch-svg](https://github.com/aj0strow/clean-sketch-svg) Ruby命令行工具。

---

### 使用svg2android转换

[svg2android][svg2android]是业内最常用的转换工具，这是一个网页界面工具，svg2android使用了HTML5的特性，建议使用较新版的Chrome、Safari或Firefox打开。svg2android目前已知问题如下：

* 直接将SVG的尺寸数值转位DP，这样以其他PDI导出的SVG需要开发逐个文件修改尺寸数值；
* 不支持PhotoShop导出的style与标签分离的SVG，导致PhotoShop导出的SVG使用svg2android转换都会变成黑色； 
* 不支持将色彩和透明度转换为Android的`#AARRGGBB`记色方式；
* 不支持批量转换；

尽管svg2android还存在一些问题，作者也在尽快处理用户反馈的问题，svg2android可以说是目前转换工具上最简单易用的。

### 使用svg2vectordrawable转换

早期版本的svg2android支持不是很好，于是我开始计划写一些批量转换的脚本，刚好拿这个项目作为Node.js的练手。过了几个月终于写出最初的版本，我将它设计为Node.js命令行工具，这就是[svg2vectordrawable](https://github.com/Ashung/svg2vectordrawable)。

svg2vectordrawable解决了一些svg2android目前存在的问题，比如不同DPI设计文档的问题，PhotoShop导出SVG的样式问题，最重要的是支持批量转换，另外字符串替换机制可以删除多余标签。

svg2vectordrawable目前依然存在一些问题：

- 未处理变形，偏移等SVG属性转换为Android对应属性；
- 未处理描边；
- 未处理`group`标签上的属性；
- 未处理标签上的`id`属性转换；
- 未处理`clip`蒙板标签；

##### 安装

1. 安装Node.js。最简单的方法就是从[官网](https://nodejs.org/)下载二进制安装文件安装。
2. 下载svg2vectordrawable的[ZIP压缩包](https://github.com/Ashung/svg2vectordrawable/archive/master.zip)并解压。
3. 在终端输入以下命令安装依赖模块，Mac系统用户可能需要使用`sudo npm install`和`sudo npm link`命令。
{% highlight bash %}
cd svg2vectordrawable
npm install
npm link
{% endhighlight %}
4. 最后输入`s2v`，如果出现如下的输出表示安装成功。
{% highlight bash %}
iMac:~ Ashung$ s2v
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                  │
│  SVG2VectorDrawable 1.0                                                                          │
│                                                                                                  │
│  ──────────────────────────────────────────────────────────────────────────────────────────────  │
│                                                                                                  │
│  $ s2v icon.svg icon.xml                                                                         │
│  $ s2v icon.svg res/drawable/icon.xml                                                            │
│  $ s2v icon.svg res/drawable/icon.xml xhdpi                                                      │
│  $ s2v icon.svg res/drawable/icon.xml 320                                                        │
│  $ s2v icon.svg icon.xml "replace(/<rect\s+width=\"\d+\"\s+height=\"d+\"\/>/g,"")"               │
│  $ s2v icon.svg icon.xml xhdpi "javascript"                                                      │
│  $ s2v assets/svg res/drawable                                                                   │
│  $ s2v assets/svg res/drawable xhdpi "javascript"                                                │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
{% endhighlight %}

##### 用法

`s2v`之后的第一个参数表示需要转换的内容，可以是一个SVG文件或一个文件夹，当第一个参数为文件夹时，将会转换文件夹内的SVG文件。

第二个参数表示需要转换后XML保存的路径，支持输入SVG文件或文件夹地址，当第一个参数为文件夹时，第二个参数不能是SVG文件。

第三个可选参数表示设计文档的DPI，支持`mdpi`、`hdpi`、`xhdpi`、`xxhdpi`、`xxxhdpi`或者类似`320`的特定数值。

第四个可选参数是用引号包含起来的一个JavaScript语句，可以对SVG文件的内容的字符串进行任何操作。

##### 常用去除多余标签命令

我在一个可选参数上引入一个JavaScript语句，这样我就可以使用正则表达式替换SVG文件的内容。关于正则表达式的写法请自学或者请教比较有经验的程序员。

用于Illustrator生成的SVG，删除`fill="none"`的`<path>`标签。

{% highlight bash %}
$ s2v ai_svg ai_xml "replace(/<path.*fill=\"none\".*\/>/,'')"
{% endhighlight %}

用于Photoshop 生成的SVG，删除`class="cls-1"`的`<path>`标签，此元素是图层组内最底层的图层。

{% highlight bash %}
$ s2v ps_svg ps_xml "replace(/<path.*class=\"cls-1\"\/>/,'')"
{% endhighlight %}

用于Sketch生成的SVG，删除带有某个颜色填充的`<path>`标签及多余`<g>`标签。

{% highlight bash %}
$ s2v sketch_svg sketch_xml "replace(/<path.*fill=\"#FF0000\".*><\/path>/,'').replace(/<g.*>/g,'').replace(/<\/g>/g,'')"
{% endhighlight %}

---

如果需要检验生成的VectorDrawable XML文件是否可用，可以安装最新版的Android Studio，建立一个Android项目，将XML文件导入到项目中。可以在Android Studio上粗略的预览XML文件的显示效果，但真实效果应以在应用中显示的为准。



[svg2android]: http://inloop.github.io/svg2android/
[Material_design_icons]: http://github.com/google/material-design-icons/
[Artboards_To_SVG.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Illustrator_Scripts/Selection_to_Artboard.jsx
[Selection_to_Artboard.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Illustrator_Scripts/Artboards_To_SVG.jsx
[illustrator-svg-exporter]: https://github.com/iconic/illustrator-svg-exporter
[Layer Exporter for Adobe Illustrator]: https://github.com/davidderaedt/Illustrator-Layer-Exporter
[SketchVectorDrawable]: https://github.com/jacobmoncur/SketchVectorDrawable