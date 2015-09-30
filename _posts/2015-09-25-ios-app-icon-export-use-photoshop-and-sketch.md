---
title: iOS应用图标快速导出 &ndash; 使用Photoshop或Sketch
excerpt: 使用Photoshop或Sketch设计iOS图标应用模版, 以及快速导出资产.
updated: 
layout: post
category: iOS
comment: false
tags: iOS iPhone iPad Photoshop Sketch
---

### 图标尺寸

从官方文档[iOS Human Interface Guidelines - Icon and Image Sizes][HIG - Icon and Image Sizes]，还有[App Icons on iPad and iPhone][App Icons on iPad and iPhone]可知，除了"iTunesArtwork"(512px)和"iTunesArtwork@2x"(1024px)必须严格命名外，在iOS 3.2以后其他图标资源都没有强制固定的名称。我觉得用"icon-60.png"这种文件命名形式，更能清晰区分不同尺寸的图片。

上面的2个文档的尺寸有些出入，建议咨询开发人员，以最新版本Xcode上需要的尺寸为准。下表是从Xcode 7.0上的Asset Catalogs得到的数据，表示各个平台需要的图标尺寸。

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

---

### 使用Photoshop & Generator


1. 将图标内容的所有图层组成一个分组，命名为"icon.png";
2. 为分组添加一个120x120px的矩形位图蒙板，蒙板选区的位置即是图标资源的边界区域；
3.  添加一个空白普通图层作为默认设置图层。

Generator用法参考[Photoshop Help / 
Generate image assets from layers][generate-assets-layers]（中文版本，[Photoshop帮助/从图层生成图像资源][generate-assets-layers-chinese]）。



~~~
default 29 -29, 57 -58, 58 -58, 87 -87, 80 -80, 114 -144, 120 -120, 180 -180, 
512 -512, 1024 -1024
~~~

---

### 使用Sketch

未完待续...

[HIG - Icon and Image Sizes]: https://developer.apple.com/library/prerelease/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html
[App Icons on iPad and iPhone]: https://developer.apple.com/library/ios/qa/qa1686/_index.html
[generate-assets-layers]: https://helpx.adobe.com/photoshop/using/generate-assets-layers.html
[generate-assets-layers-chinese]: https://helpx.adobe.com/cn/photoshop/using/generate-assets-layers.html