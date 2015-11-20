---
title: SVG导出
excerpt:   从Illustrator、PhotoShop、Sketch导出SVG.
category:
tags: Illustrator Photoshop Sketch SVG
---

### 使用Illustrator导出SVG

我认为Illustrator是目前相对较好的SVG设计工具，在Illustrator中另存为SVG是较常用的导出SVG方法，具体如何操作网上有很多资料。你可以从查看官方帮助文档[存储图稿-以 SVG 格式存储](https://helpx.adobe.com/cn/illustrator/using/saving-artwork.html)，或者[Exporting SVG for the web with Adobe Illustrator CC](http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html)。

另外在Illustrator直接复制内容，转至文本编辑器粘贴，也可以得到SVG代码。我在做Web用的SVG时就经常这么做，画个矩形作为图标的边界，把图标连同矩形一起复制，然后在文本编辑器里在删除矩形的代码。但这对设计师来说太复杂了，也不适合批量操作，此外这种方法无法控制路径数据的精度。

还有一种方法是使用Illustrator画板导出SVG，画板大小做为图标切图大小，建议画布命名为资源文件名，在另存为SVG时选择导出多个画板。Illustrator中增加新画板对新手来说经常会对不齐像素，我用一个脚本把选中的图层转为画板并且自动对齐像素，最后用另外一个脚本导出画板。如果图标很多，因为画板最多只能支持100个，所有这种方法还是有一些局限。你可以从Github上下载到[Selection_to_Artboard.jsx][Selection_to_Artboard.jsx](将选择图层转为画板)和[Artboards_To_SVG.jsx][Artboards_To_SVG.jsx](将画板导出为SVG)这两个脚本，它们对于部分项目还是适用的。

当项目较大时推荐使用[Illustrator SVG Exporter][illustrator-svg-exporter]，这是一个没有界面的脚本(只有一个选择保存路径的对话框)，用于导出文档中带".svg"后缀的路径、复合路径、组合、图层、画板等等，具体操作见Illustrator SVG Exporter的项目主页。Illustrator SVG Exporter默认导出的SVG是裁切透明像素的，所以需要在组合、图层内包含一个矩形作为切图边界，矩形可以是无填充的路径，然后去掉这个作为切图区域矩形的代码。SVG中无填充的路径显示为黑色，如果图标也是黑色，预览时就无法看到图标的内容，所以可以使用一个固定色值作为边界图层的填充。

![](/images/svg_and_android_vector_drawable/screenshot_ai.png)_使用Illustrator SVG Exporter导出SVG时推荐的图层结构_

Illustrator SVG Exporter默认导致的SVG路径数据是精确到4位小数，小图标并不需要这么精确，可以通过修改源码改为1或2位小数。大概在代码的41行，找到`svgOptions.coordinatePrecision = 4`，将数值改为`1`或`2`。

{% highlight javascript %}
svgOptions.coordinatePrecision = 2;
{% endhighlight %}

[Layer Exporter for Adobe Illustrator][Layer Exporter for Adobe Illustrator]是个类似功能的Illustrator扩展，唯一不同是除了导出SVG外，还支持PNG、JPG格式，另外还提供一些简单的设置，具体使用方法可以参考项目主页。

[Material design icons][Material_design_icons]的SVG也是带有多余的矩形的，可见处理方法类似。当图标数量巨大时，删除作为切图区域矩形的代码，需要使用编程的方法来删除SVG文件内的多余代码，对于数量巨大的项目除非团队里有很多人手，否则人工操作几乎不可能。Google并没公布他们用的处理脚本。对代码恐惧，连运行代码都有难度的设计师而言，确实是很大挑战。选用画板导出方式则不需要处理这种问题，下文会介绍批量删除多余代码的方法。

##### Illustrator注意事项

* 尽量把路径描边需要扩展为填充。
* 对于同一个图标，或者图标内同类元素尽量组合成复合路径，或者合并路径。
* 合理的编组或者图层，要么图标是按编组划分的，要么按图层划分，建议不要混用两种方式。
* 注意画板的坐标尽量是整数。
* 不要用Illustrator打开SVG文件修改再保存，这样经常会导致保存后的SVG代码中viewport、path标签的数值偏移。
* 导出脚本可能未在较低版本上测试。
* Illustrator CC 2015.0.0的版本无法导出SVG，请升级至最新版本。

### PhotoShop使用Adobe Generate导出SVG

早期版本的PhotoShop有一些商业的插件和脚本可以导出SVG，我没有用过这类插件和脚本，这里使用的是Adobe Generate的方法，具体使用方法参考[Generate Web Assets Functional Spec](https://github.com/adobe-photoshop/generator-assets/wiki/Generate-Web-Assets-Functional-Spec).

![](/images/svg_and_android_vector_drawable/screenshot_ps.png)_使用PhotoShop的Generate导出SVG_

我采用命名图层组，并在图层组内增加一个矩形图层作为切图的区域，矩形可以是无填充或透明的路径图层。这样导出的SVG代码同样会有多余标签，还是要面对删除多余标签的问题。

在PhotoShop CC 2015可以使用画板导出SVG，将画板大小作为切图区域，这样可以不需要额外图层作为边界。

![](/images/svg_and_android_vector_drawable/screenshot_ps_artboard.png)_使用PhotoShop CC 2015的Artboard导出SVG_

##### PhotoShop注意事项

* 尽量把路径描边需要扩展为填充。
* 对于同一个图标，或者图标内同类元素尽量放在同一个矢量图层内。
* 因为PhotoShop没有矢量预览，所以尽量注意路径结合处的细节。
* Adobe Generator在PhotoShop CC 14.1+、14.2+及以上版本上可用。
* PhotoShop CC 2014.2及以后的版本可以单独导出单个图层组，低版本将要导出的图层复制到新文档，再打开Generator生成器。
* PhotoShop导出的SVG代码不像Illustrator那样是可以设置的，PhotoShop导出的SVG代码中属性被分离成CSS样式。


### Sketch导出SVG

如果使用Sketch建议通过切片方式导出SVG，并且切片不要包含在画板内(这张情况会导致SVG路径的数据是安装画板坐标生成的)。如果使用可导出图层就需要增加矩形图层作为切图边界，该图层不可以设置为无填充或者不可见，建议填充一个固定的色值。Sketch的优点是导出不需要借助复制的脚本或插件。

![](/images/svg_and_android_vector_drawable/screenshot_sketch.png)_使用Sketch的切片导出SVG_

Sketch导出的SVG代码冗余比较多且无法设置，而且经常增加一些奇怪的行为，如果画布中只有一个图层，Sketch会将路径的数据加在路径父级的标签上。Github上有一些清理Sketch SVG代码的工具，都没有界面的，对设计师来说又是挑战。

Github上一些清理Sketch SVG代码的工具:

* [clean-sketch](https://github.com/overblog/clean-sketch)，[gulp-clean-sketch](https://github.com/overblog/gulp-clean-sketch) Node.js模块和gulp插件。
* [Sketch SVG cleaner](https://github.com/Warry/SketchCleaner) Node.js命令行工具。
* [clean-sketch-svg](https://github.com/aj0strow/clean-sketch-svg) Ruby命令行工具。

---

### 压缩SVG代码

常用的SVG代码压缩工具[SVG Optimizer][SVGO](简称SVGO)是一个[Nodejs][Nodejs]命令行工具。也就是说这是没有界面的，要在终端上敲代码压缩SVG，具体操作可以查阅[SVGO][SVGO]主页上的文档。SVGO相关的工具还有Nodejs模块版本的[imagemin-svgo][imagemin-svgo]，gulp插件版本的[gulp-svgmin][gulp-svgmin]，项目主页上都有演示代码。

[svgomg][svgomg]是SVGO的Nodejs网页应用，有很多设置项，但每次只能压缩一个SVG文件，如果网页速度太慢，可以下载[源码][svgomg_source]在本地搭建网页。

[svgo-gui][svgo-gui]是SVGO的跨平台界面工具，但目前已不维护，官方推荐使用命令行版本或网页版本。



---

### 批量删除多余代码


[SVGCleaner]: https://github.com/RazrFalcon/SVGCleaner
[SVGCleaner-sourceforge]: http://sourceforge.net/projects/svgcleaner/
[svg-now]: https://github.com/davidderaedt/SVG-NOW
[svgo-gui]: https://github.com/svg/svgo-gui
[gulp-svgmin]: https://github.com/ben-eb/gulp-svgmin
[imagemin-svgo]: https://github.com/imagemin/imagemin-svgo
[svgomg]: https://jakearchibald.github.io/svgomg/
[svgomg_source]: https://github.com/jakearchibald/svgomg
[svg2android]: http://inloop.github.io/svg2android/
[Material_design_icons]: http://github.com/google/material-design-icons/
[Artboards_To_SVG.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Illustrator_Scripts/Selection_to_Artboard.jsx
[Selection_to_Artboard.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Illustrator_Scripts/Artboards_To_SVG.jsx
[illustrator-svg-exporter]: https://github.com/iconic/illustrator-svg-exporter
[Layer Exporter for Adobe Illustrator]: https://github.com/davidderaedt/Illustrator-Layer-Exporter
[SketchVectorDrawable]: https://github.com/jacobmoncur/SketchVectorDrawable
[SVGO]: https://github.com/svg/svgo
[Nodejs]: https://nodejs.org/
