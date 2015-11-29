---
title: 制作Android VectorDrawable资源
excerpt: 快速将SVG转换为Android VectorDrawable。
category: Android
tags: Android SVG VectorDrawable
---

在我们的开发获得Android 5.0源码后并决定将系统从4.4升级至5.0的那个时候，负责SystemUI的设计同事跟我说，开发没找到通知中心图标的PNG，资源文件夹里面都是叉ML (我一直不习惯这边的开发老是把XML读成叉ML，连设计也跟着念叉ML，码农和死美工们都很有山寨之都的特色)，开发给了他Github上的[svg2android][svg2android]项目让设计师转换资源(当时这个项目对SVG支持情况还很差)。我是设计团队里唯一懂代码的，我看了下资料大概明白是什么情况，我让他使用Illustrator设计图标并写了一些Illustrator的导出脚本，这就是当时可用的临时处理方案。

后来他工作的转交给了其他几个设计师，至今都没处理好这个事情。设计不肯安装开发工具无法判断转换后的文件是否可用，而开发用的是淘汰了的基于Eclipse的ADT，根本没有VectorDrawable预览功能。新技术对水平较差的设计师和开发者都是个很大的考验，至今开发都没把VectorDrawable的特色动画加上。我当时对VectorDrawable的印象就是Google不让死美工们好好切图了。

### VectorDrawable不是SVG

虽然VectorDrawable需要从SVG文件转换，这并不代表VectorDrawable是SVG，它只是用了SVG的path data属性，并借鉴了一些东西。这技术被引入就已经设定开发者是熟悉SVG的，完全可以手动从SVG转换成VectorDrawable。设计软件生成的SVG可能会包含rect(矩形)、circle(圆)、 ellipse(椭圆)等标签，这些标签不带path data属性，开发者是无法手动直接转换成VectorDrawable的。另外设计软件生成的SVG代码中的viewport、pathdata的数值还经常出现位置错误。如果你只想导出SVG然后把剩下的交给开发手动或借助工具转换VectorDrawable，那么你至少要保证SVG代码中的数值是无误的。很多设计师的电脑里都没一个像样的文本编辑器，检查SVG文件的代码只能靠浏览器的查看源码功能，但很多设计师又对代码非常反感，检查SVG文件是否有误的工作只能在等到应用被编译出来安装到设备上，并且显示出包含那个资源的界面，然后交给设计师检查，才能最终确定SVG文件是否有误。

### VectorDrawable优劣

先说优点吧。VectorDrawable只需要一套尺寸的资源，但文件往往会比同内容的PNG略大；可以对形状进行旋转、翻转、染色、拉伸，和共用相同形状的路径数据；相比以前的序列帧动画，使用VectorDrawable的动画，资源会少很多。

我不清楚VectorDrawable和PNG之间存在的性能差异有多大。VectorDrawable是无法向后兼容的，只有Android 5.0以上的设备才能使用，如果应用要兼顾旧版本，且不做两种兼容方案的话，明显VectorDrawable是不适合的。目前VectorDrawable的路径上还不支持渐变，也就是说只能做一些纯色的图形。VectorDrawable并不是可以随意放大的矢量图片，要得到一个资源的放大或缩小的版本，得需要两个VectorDrawable文件，但是它们之间可以共用path的数据。文件比PNG资源占用空间大，如果应用仅支持一个DPI，并且不考虑图标上的动画，完全可以直接用PNG图片。另外这个技术对设计师比较具有挑战，可能会影响项目的进度，建议先让开发和设计师评估下。

Google的[Material design icons][Material_design_icons]项目并没有开放相关的转换工具，却设计了包含各种格式的近千个图标，看来他们似乎不建议设计师重做其他风格图标的。

### 源文件尺寸

如果已经确定要采用VectorDrawable，建议使用MDPI尺寸作为源文件的尺寸。因为VectorDrawable代码内的宽高数值使用dp单位，目前的常用转换器不会计算px对应的dp值，导致开发可能需要逐个文件修改宽高属性。如果已经用其他尺寸设计了，建议重新调整。另外一个原因是小尺寸的设计稿导出的SVG代码相对较少。如果希望得到最小的文件体积，建议先压缩SVG代码后再进行转换。

---

### 手动转换

手动转换是处理一两个SVG文件最快的方法，但VectorDrawable并不是完整的SVG，所以手动转换经常要遇到绘图软件生成的那些VectorDrawable不支持的SVG标签。矩形、圆形和椭圆都可能会产生不支持标签，这种标签的属性需要通过复杂的计算才能专为path标签的data属性，如果能尽量避免绘图软件导出的SVG产生这些不支持标签，就可以为开发节省很多时间。

Illustrator的复合路径能让导出的SVG避免生成那些VectorDrawable不支持的标签，部分复合路径仍然保持路径的可编辑。Photoshop则需要将路径合并，但是遇到只有一个圆形或者矩形就无法合并路径了，这做情况需要移动路径的节点后再复位，这样破坏路径的可编辑。Sketch也有和Photoshop同样的问题，目前[svg2android][svg2android]已支持转换这类SVG标签。

### 使用svg2android转换

[svg2android][svg2android]是业内最常用的转换工具，这是一个网页界面工具，svg2android使用了HTML5的特性，建议使用较新版的Chrome、Safari或Firefox打开。

svg2android目前已知问题如下：

* 直接将SVG的尺寸数值转位DP，这样其他尺寸的源文件导出的SVG，就需要开发逐个文件修改尺寸数值；
* 暂不支持Photoshop导出的style与标签分离的SVG，导致Photoshop导出的SVG使用svg2android转换都会变成黑色；
* 不支持将色彩和透明度转换为Android的`#AARRGGBB`记色方式；
* 不支持批量转换；

尽管svg2android还存在一些问题，作者也在尽快处理用户反馈的问题，svg2android可以说是目前转换工具上最简单易用的。

### 使用svg2vectordrawable转换

早期版本的svg2android支持不是很好，于是我开始计划写一些批量转换的脚本，刚好拿这个项目作为Node.js编程的练手。过了几个月终于写出最初的版本，我将它设计为Node.js命令行工具，这就是[svg2vectordrawable](https://github.com/Ashung/svg2vectordrawable)。

svg2vectordrawable解决了一些svg2android目前存在的问题，比如不同DPI设计文档的问题，Photoshop导出SVG的样式问题，最重要的是支持批量转换，另外字符串替换机制可以删除多余标签。

svg2vectordrawable目前依然存在一些问题：

- 未处理变形，偏移等SVG属性转换为Android对应属性；
- 未处理描边；
- 未处理"group"标签上的属性；
- 未处理标签上的"id"属性转换；
- 未处理"clip"蒙板标签；

##### 安装

1. 安装Node.js。最简单的方法就是从[Node.js官网][nodejs]下载二进制安装文件安装。
2. 下载svg2vectordrawable的[ZIP压缩包][svg2vectordrawable-zip]并解压。
3. 在终端输入`cd svg2vectordrawable`，转至解压后的目录，接着输入`npm install -g`命令，这会把svg2vectordrawable作为全局模块安装。Mac系统用户需要使用`sudo npm install -g`命令，随后输入帐户密码。
4. 最后输入`s2v`，安装成功则会显示出版本和帮助信息。

{% highlight bash %}
cd svg2vectordrawable
npm install -g
{% endhighlight %}
_作为全局模块安装，程序会自动安装依赖模块。_

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
_SVG2VectorDrawable帮助信息_

##### 用法

"s2v"之后的第一个参数表示需要转换的内容(参数间使用空格分隔)，可以是一个SVG文件或一个文件夹，当第一个参数为文件夹时，将会转换文件夹内的SVG文件。

第二个参数表示需要转换后XML保存的路径，支持输入SVG文件或文件夹地址，当第一个参数为文件夹时，第二个参数不能是SVG文件。

第三个可选参数表示设计文档的DPI，支持"mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"或者类似"320"的特定数值。

第四个可选参数是用引号包围起来的一个JavaScript语句，可以对SVG代码进行字符串相关的操作。

##### 常用去除多余标签命令

我在一个可选参数上引入一个JavaScript语句，这样我就可以使用正则表达式替换SVG文件的内容。关于正则表达式的写法请自学或者请教比较有经验的程序员。

用于Illustrator生成的SVG，删除带有`fill="none"`属性的"path"标签。

{% highlight bash %}
$ s2v ai_svg ai_xml "replace(/<path.*fill=\"none\".*\/>/g,'')"
{% endhighlight %}

用于Photoshop 生成的SVG，删除带有`class="cls-1"`属性的"path"标签，此元素是图层组内最底层的图层。

{% highlight bash %}
$ s2v ps_svg ps_xml "replace(/<path.*class=\"cls-1\"\/>/,'')"
{% endhighlight %}

用于Sketch生成的SVG，删除带有某个颜色填充"path"标签及多余"g"标签。

{% highlight bash %}
$ s2v sketch_svg sketch_xml "replace(/<path.*fill=\"#FF0000\".*><\/path>/,'').replace(/<g.*>/g,'').replace(/<\/g>/g,'')"
{% endhighlight %}

---

建议在生成完VectorDrawable XML文件之后，检验生成的文件是否可用。可以安装最新版的Android Studio，建立一个Android项目，将XML文件导入到项目中，这样可以在Android Studio上粗略的预览XML文件的显示效果，真实效果以在应用中实际显示的为准。


[nodejs]: https://nodejs.org/
[svg2vectordrawable-zip]: https://github.com/Ashung/svg2vectordrawable/archive/master.zip
[svg2android]: http://inloop.github.io/svg2android/
[SketchVectorDrawable]: https://github.com/jacobmoncur/SketchVectorDrawable
[Material_design_icons]: http://github.com/google/material-design-icons/
