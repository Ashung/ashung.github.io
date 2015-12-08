---
title: "Photoshop 脚本: Android_Export_Layers.jsx"
excerpt: 使用 Android_Export_Layers.jsx 脚本导出 Android 资源。
updated: 2015-10-12 14:37
category: photoshop
tags: Photoshop Android Script
---

![Android_Export_Layers.jsx](/images/android_export_layers_for_photoshop/android_export_layer_jsx.png)_Android_Export_Layers.jsx 主界面_

Android_Export_Layers.jsx 用于将 PSD 文档的图层导出至文件，同时支持不同 DPI 尺寸。区别于 Photoshop 自带的图层导出至文件功能，该脚本更加直观而且操作简单。

脚本默认将 PSD 文档的所有第一级图层或图层组导出至设定的文件，还可以导出选中图层组下的所有第一级图层或图层组，同时还有多种自动命名模式可以选择。这个脚本的用途很广泛，比如缩放序列动画的图片、任何相同尺寸的资源、具有公共部分的资源、样式被统一添加在父级图层组的资源等等，可以有很多自由。

---

### Android_Export_Layers.jsx 用法

首先从 [github][Android_Export_Layers] 页面[下载 Android_Export_Layers.jsx][Android_Export_Layers.jsx]，将要导出的图层对齐层叠排列到一起，然后调整画布尺寸，就可以运行脚本。脚本在 Photoshop 当前无文档打开的情况下是不运行的。

要运行 Photoshop 脚本参考我在上一篇 [Photoshop 脚本: Android_Assets_Export.jsx][android-assets-export-for-photoshop]介绍过的方法，以下介绍对话框中的每个表单项的作用。

"**Layers**"项，表示需要导出哪些图层或图层组。

- "**All Layers**"，导出 PSD 文档所有第一级图层或图层组。
- "**Child Layers in Selected LayerSet**"，导出选中图层组下的所有第一级图层或图层组。

"**Image Type**"项，表示资源文件格式。目前支持 PNG24、PNG8、JPG 质量 100％、JPG 质量 80％、JPG 质量 60％。

"**Image Name**"项，表示资源文件命名模式。注意图层名的空格会被替换为"\_"，图层名最后将转为小写。

- "**layer_name**"，表示资源文件命名为图层名。
- "**[Prefix]_layer_name**"，前缀加图层名。
- "**layer_name_[Suffix]**"，图层名加后缀。
- "**[Prefix]_[0,1,2...]**"，前缀加 "\_" 和 "[0,1,2...]" 序号。
- "**[Prefix]_[1,2,3...]**"，前缀加 "\_" 和 "[1,2,3...]" 序号。
- "**[Prefix]_[01,02,03...]**"，前缀加 "\_" 和 "[01,02,03...]" 序号。
- "**[Prefix]_[001,002,003...]**"，前缀加 "\_" 和 "[001,002,003...]" 序号。

"**Prefix or Suffix**"项，表示资源文件自动命名时固定的前缀或者后缀，只有在命名模式选项中包含前缀或后缀时，这个输入框才可用。

"**Output Folder**"项，表示资源保持的路径，默认路径是 PSD 文档所在位置的“res”文件夹，或者桌面上的“res”文件夹。

"**Document DPI**"项，表示 PSD 文档设计使用哪种 DPI，请从下拉框选择合适的项.

"**Export DPI**"项，表示支持导出 DPI 列表，默认是全勾选的，可以选择你需要的 DPI。

完整的代码托管在 [github][Android_Export_Layers] 上，你可以参考上一篇 [Photoshop 脚本: Android_Assets_Export.jsx]][android-assets-export-for-photoshop] 中自定义配置的方法，修改修改默认文档 DPI 或导出 DPI 列表(代码位置大约在 23-30 行左右)。


[android-assets-export-for-photoshop]: /stories/android-assets-export-for-photoshop.html
[Android_Design_Action.atn]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Actions/Android_Design_Action.atn
[Android_Export_Layers]: https://github.com/Ashung/GUI_Automation_Toolbox/blob/master/Photoshop_Scripts/Android_Export_Layers.jsx
[Android_Export_Layers.jsx]: https://github.com/Ashung/GUI_Automation_Toolbox/raw/master/Photoshop_Scripts/Android_Export_Layers.jsx
