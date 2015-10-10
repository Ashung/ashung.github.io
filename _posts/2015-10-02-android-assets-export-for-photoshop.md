---
comment: false
title: Photoshop脚本 &ndash; Android_Assets_Export.jsx
excerpt: 使用Android_Assets_Export.jsx脚本导出Android资源.
updated:
category: photoshop
tags: Photoshop Android Script
---

2010年的时候，我是这样导出移动应用和网页资源的：将内容复制到新的文档，调整画布，存储为Web格式，放大图像尺寸再次存储为Web格式。当时iOS只要1x和2x资源，Android也只要LDPI、MDPI和HDPI，我自己有一套动作配合快捷键来完成这一系列操作，这种方式当时已经够用了。

直到3年后，当时我帮人设计一个Android应用，我用提供多套分辨率资源抬高了一点佣金。交付前的那个晚上我开始切图，这种重复的无趣操作耗时，让人犯困，而且经常出错。项目结束后，我决定找个好的处理方法，试了当时的各种扩张。2014年中，我到了一家手机公司做UI设计工作，Android应用切图成了日常工作，于是决定自己动手写一个工具，这就是Android_Assets_Export.jsx的由来。此后这个脚本成了我工作中不可缺少的神器。

---

### 动作"复制选中图层至新文档"

Android_Assets_Export.jsx不是那种一键导出PSD文档内所有资源的脚本，脚本将当前画布作为切图边界，所以需要一个将选中图层复制至新文档并自动调整画布的动作。

动作步骤如下：

1. 菜单"图层 Layer" - "复制图层 Duplicate Layer..."，从对话框里选择复制到新文档；
2. 菜单"图像 image" - "裁切 Trim"，从对话框里选择裁切透明区域。

可以下载[Android_Design_Action.atn][Android_Design_Action.atn]动作，载入动作后，找到"Copy Layers to New Document"项，我一般在图层组内有加一个图标表示切图边界，所以这个动作都能准确的确定画布大小。

### Android_Assets_Export.jsx用法

下载[Android_Assets_Export.jsx][Android_Assets_Export.jsx]，详细代码见[github][Android_Assets_Export]。

![Android_Assets_Export.jsx](/images/android_assets_export_for_photoshop/android_assets_export_screenshot.png)

### 缩放9-patch图像

### 自定义配置

未完成

[Android_Design_Action.atn]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Actions/Android_Design_Action.atn
[Android_Assets_Export]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Photoshop_Scripts/Android_Assets_Export.jsx
[Android_Assets_Export.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Scripts/Android_Assets_Export.jsx