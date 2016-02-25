---
title: 制作 Android VectorDrawable 资源
excerpt: 快速将 SVG 转换为 Android VectorDrawable。
category: Android
tags: Android SVG VectorDrawable
---

### VectorDrawable 不是 SVG

在我们的开发获得 Android 5.0 源码后并决定将系统从 4.4 升级至 5.0 的那个时候，

虽然 VectorDrawable 需要从 SVG 文件转换，这并不代表 VectorDrawable 是 SVG，它只是用了 SVG 的 path data 属性，并借鉴了一些东西。

### VectorDrawable 优劣

先说优点吧。VectorDrawable 只需要一套尺寸的资源，但文件往往会比同内容的 PNG 略大；可以对形状进行旋转、翻转、染色、拉伸，和共用相同形状的路径数据；相比以前的序列帧动画，使用 VectorDrawable 的动画，资源会少很多。

我不清楚 VectorDrawable 和 PNG 之间存在的性能差异有多大。VectorDrawable 是无法向后兼容的，只有 Android 5.0 以上的设备才能使用，如果应用要兼顾旧版本，且不做两种兼容方案的话，明显 VectorDrawable 是不适合的。目前 VectorDrawable 的路径上还不支持渐变，也就是说只能做一些纯色的图形。VectorDrawable 并不是可以随意放大的矢量图片，要得到一个资源的放大或缩小的版本，得需要两个 VectorDrawable 文件，但是它们之间可以共用 pathdata 的数据。文件比 PNG 资源占用空间大，如果应用仅支持一个 DPI，并且不考虑图标上的动画，完全可以直接用 PNG 图片。另外这个技术对设计师比较具有挑战，可能会影响项目的进度，建议先让开发和设计师评估下。

Google 的 [Material design icons][Material_design_icons] 项目并没有开放相关的转换工具，却设计了包含各种格式的近千个图标，看来他们似乎不建议设计师重做其他风格图标的。

### 源文件尺寸

如果已经确定要采用 VectorDrawable，建议使用 MDPI 尺寸作为源文件的尺寸。因为 VectorDrawable 代码内的宽高数值使用 dp 单位，目前的常用转换器不会计算 px 对应的 dp 值，导致开发可能需要逐个文件修改宽高属性。如果已经用其他尺寸设计了，建议重新调整。另外一个原因是小尺寸的设计稿导出的 SVG 代码相对较少。如果希望得到更小的文件体积，建议先压缩 SVG 代码后再进行转换。

---

### SVG 代码优化

[SVGO][SVGO] 可以很大程度的精简 SVG 代码，建议在从设计软件导出 SVG 之后使用 SVGO 优化，再转换为 VectorDrawable。具体的操作已经在上一篇文章 [SVG 导出与优化](/stories/svg-export.html)中介绍过了，此处不再重述。

SVGO 默认会转换 SVG 的 rect(矩形)，如果使用 Photoshop 导出 SVG，可以使用以下命名禁止 SVGO 优化 SVG 内的 CSS 代码。

{% highlight bash %}
svgo -f originalFolder -o optimizeFolder --disable=minifyStyles
{% endhighlight %}

---

### 人工转换

人工转换是处理一两个 SVG 文件最快的方法，但 VectorDrawable 并不是完整的 SVG，所以手动转换经常要遇到绘图软件生成的那些 VectorDrawable 不支持的 rect(矩形)、circle(圆)、 ellipse(椭圆)等 SVG 标签，这些标签不带 pathdata 属性。绘图软件中的矩形、圆形和椭圆都可能会产生这种不支持标签，这种标签的属性需要通过复杂的计算才能专为 path 标签 data 属性需要的值，如果能尽量避免绘图软件导出的 SVG 产生这些不支持标签，就可以为开发节省很多时间。另外设计软件生成的 SVG 代码中的 viewport、pathdata 的数值，由于某些原因经常出现位置错误。

Illustrator 的复合路径能让导出的 SVG 避免生成那些 VectorDrawable 不支持的标签，部分复合路径仍然保持路径的可编辑。Photoshop 则需要将路径合并，但是遇到只有一个圆形或者矩形就无法合并路径了，这做情况可以移动路径的节点后再复位，这样破坏路径的可编辑性。Sketch 也有和 Photoshop 同样的问题。

目前很多工具，比如 [svg2android][svg2android] 都可以把其他 SVG 标签转为 Path 标签，所以设计师不需要太在意非 Path 标签的问题。如果你只想导出 SVG 然后把剩下的交给开发人工转换为 VectorDrawable，那么你只需要保证 SVG 代码中的数值是无误的。这就要求设计师需要略懂 SVG 代码中标签和属性的含义。

下表是 SVG 标签 与 Android 标签的对应关系。

SVG 标签 | Android 标签 | 说明
--- | --- | ---
`svg` | `vector` | 主体标签
`g` | `group` | 分组
`path/rect/circle/polygon/ellipse` `polyline/line` | `path` | 形状和路径
`clipPath` | `clip-path` | 蒙板路径

以下为 SVG 标签属性 与 Android 标签属性的对应关系。

SVG | Android | 说明
--- | --- | ---
`name/id` | `android:name `| 定义名称
`opacity` | `android:alpha` | 透明度 (0-1)

_公共属性_

SVG | Android | 说明
--- | --- | ---
`xmlns` | `xmlns` | 命名空间
`width` | `android:width` | 图像宽度
`height` | `android:height` | 图像高度
`viewportWidth` | `android:viewportWidth` | 视图宽度，视图相当于画布
`viewportHeight` | `android:viewportHeight` | 视图高度
`-` | `android:tint` | 着色
`-` | `android:tintMode` | 定义着色混合模式，值为 `src_over src_in src_atop multiply screen add`，默认为 `src_in`
`-` | `android:autoMirrored` | 设置当系统为 RTL(right-to-left) 布局时，是否自动镜像该图片

_vector 标签属性_

SVG | Android | 说明
--- | --- | ---
`transform="rotate(a x y)"` | `android:rotation` | 旋转
`transform="rotate(a x y)"` | `android:pivotX` | 缩放和旋转时的 X 轴参考点
`transform="rotate(a x y)"` | `android:pivotY` | 缩放和旋转时的 Y 轴参考点
`transform="scale(x y)"` | `android:scaleX` | X 轴的缩放倍数
`transform="scale(x y)"` | `android:scaleY` | Y 轴的缩放倍数
`transform="translate(x y)"`| `android:translateX` | X 轴的位移
`transform="translate(x y)"` | `android:translateY` | Y 轴的位移

_group 标签属性_

SVG | Android | 说明
--- | --- | ---
`d` | `android:pathData` | 路径信息
`fill` | `android:fillColor` | 路径填充颜色
`fill-opacity` | `android:fillAlpha` | 路径填充颜色的透明度
`stroke` | `android:strokeColor` | 路径描边
`stroke-width` | `android:strokeWidth` | 路径描边粗细
`stroke-opacity` | `android:strokeAlpha` | 路径描边透明度
`stroke-linecap` | `android:strokeLineCap` | 路径线帽的形状，值为 `butt, round, square`
`stroke-linejoin` | `android:strokeLineJoin` | 路径连接方式，值为 `miter, round, bevel`
`stroke-miterlimit` | `android:strokeMiterLimit` | 设置斜角的上限
`-` | `android:trimPathStart` | 从路径起始位置截断路径的比率，取值范围 0-1
`-` | `android:trimPathEnd` | 从路径结束位置截断路径的比率，取值范围从 0-1
`-` | `android:trimPathOffset` | 设置路径截取的范围，取值范围从 0-1

_path 标签属性_

SVG | Android | 说明
--- | --- | ---
d | android:pathData | 路径信息

_clip-path 标签属性_

完整的 VectorDrawable 代码，类似以下的示例。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="48dp"
    android:height="48dp"
    android:viewportWidth="48"
    android:viewportHeight="48">
    <group>
        <clip-path android:pathData="..."/>
        <path android:pathData="..."/>
    </group>
</vector>
{% endhighlight %}

---

### 使用 svg2android 转换

[svg2android][svg2android] 是业内最常用的转换工具，这是一个网页界面工具，svg2android 使用了 HTML5 的特性，建议使用较新版的 Chrome、Safari 或 Firefox 打开。

svg2android 目前已知问题如下：

* 直接将 SVG 的尺寸数值转位 DP，这样其他尺寸的源文件导出的 SVG，就需要开发逐个文件修改尺寸数值；
* 暂不支持 Photoshop 导出的 style 与标签分离的 SVG，导致 Photoshop 导出的 SVG 使用 svg2android 转换都会变成黑色；
* 不支持将色彩和透明度转换为 Android 的 `#AARRGGBB` 记色方式；
* 不支持批量转换；

尽管 svg2android 还存在一些问题，作者也在尽快处理用户反馈的问题，svg2android 可以说是目前转换工具上最简单易用的。

---

### 使用 svg2vectordrawable 转换

早期版本的 svg2android 支持不是很好，于是我开始计划写一些批量转换的脚本，刚好拿这个项目作为 Node.js 编程的练手。过了几个月终于写出最初的版本，我将它设计为 Node.js 命令行工具，这就是 [svg2vectordrawable](https://github.com/Ashung/svg2vectordrawable)。

svg2vectordrawable 解决了一些 svg2android 目前存在的问题，比如不同 DPI 设计文档的问题，Photoshop 导出 SVG 的样式问题，最重要的是支持批量转换，另外字符串替换机制可以删除多余标签。

svg2vectordrawable 目前依然存在一些问题：

- 未处理变形，偏移等 SVG 属性转换为 Android 对应属性；
- 未处理描边；
- 未处理 "group" 标签上的属性；
- 未处理标签上的 "id" 属性转换；
- 未处理 "clip" 蒙板标签；

##### 安装步骤

1. 安装 Node.js。最简单的方法就是从 [Node.js 官网][nodejs] 下载二进制安装文件安装。
2. 下载 svg2vectordrawable 的 [ZIP 压缩包][svg2vectordrawable-zip] 并解压。
3. 在终端输入 `cd svg2vectordrawable`，转至解压后的目录，接着输入 `npm install -g` 命令，这会把 svg2vectordrawable 作为全局模块安装。Mac 系统用户需要使用 `sudo npm install -g` 命令，随后输入管理员密码。
4. 最后输入 `s2v`，安装成功则会显示出版本和帮助信息。

{% highlight bash %}
cd svg2vectordrawable
npm install -g
{% endhighlight %}
_作为全局模块安装，程序会自动安装依赖模块。_

##### 用法

{% highlight bash %}
$ s2v icon.svg icon.xml xhdpi "replace(/<rect\s+width=\"\d+\"\s+height=\"d+\"\/>/g,"")"  
{% endhighlight %}

在终端熟人 "s2v" 之后的第一个参数表示需要转换的内容(参数间使用空格分隔)，可以是一个 SVG 文件或一个文件夹，当第一个参数为文件夹时，将会转换文件夹内的 SVG 文件。

第二个参数表示需要转换后 XML 保存的路径，支持输入 SVG 文件或文件夹地址，当第一个参数为文件夹时，第二个参数不能是 SVG 文件。

第三个可选参数表示设计文档的 DPI，支持 "mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi" 或者类似 "320" 的特定数值。

第四个可选参数是用引号包围起来的一个 JavaScript 语句，可以对 SVG 代码进行字符串相关的操作。

##### 常用去除多余标签命令

我在一个可选参数上引入一个 JavaScript 语句，这样我就可以使用正则表达式替换 SVG 文件的内容。关于正则表达式的写法请自学或者请教比较有经验的程序员。

用于 Illustrator 生成的 SVG，删除带有`fill="none"`属性的"path"标签。

{% highlight bash %}
$ s2v ai_svg ai_xml "replace(/<path.*fill=\"none\"[^>]*\/>/gi,'')"
{% endhighlight %}

用于 Photoshop 生成的 SVG，删除带有 `class="cls-1"` 属性的"path"标签。

{% highlight bash %}
$ s2v ps_svg ps_xml "replace(/<g[^>]*>/gi,'').replace(/<\/g>/gi,'').replace(/<path.*class=\"cls-1\"[^>]*\/>/gi,'')"
{% endhighlight %}

用于 Sketch 生成的 SVG，删除带有某个颜色填充"path"标签及多余"g"标签。

{% highlight bash %}
$ s2v sketch_svg sketch_xml "replace(/<g[^>]*>/gi,'').replace(/<\/g>/gi,'').replace(/<path.*fill=\"#FF0000\"[^>]*><\/path>/gi,'')"
{% endhighlight %}

建议在生成完 VectorDrawable XML 文件之后，检验生成的文件是否可用。可以安装最新版的 Android Studio，建立一个 Android 项目，将 XML 文件导入到项目中，这样可以在 Android Studio 上粗略的预览 XML 文件的显示效果，真实效果以在应用中实际显示的为准。


[nodejs]: https://nodejs.org/
[svg2vectordrawable-zip]: https://github.com/Ashung/svg2vectordrawable/archive/master.zip
[svg2android]: http://inloop.github.io/svg2android/
[SketchVectorDrawable]: https://github.com/jacobmoncur/SketchVectorDrawable
[Material_design_icons]: http://github.com/google/material-design-icons/
[SVGO]: https://github.com/svg/svgo
