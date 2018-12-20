---
title:  Sketch 数据填充
excerpt: 使用 Stuffing 插件处理实际项目的数据填充。
updated: 2018-11-14
---

今年 6 月份就收到了 Sketch 数据填充插件的资料和内测版，于是有做了一个中文数据的插件的想法。原本计划 Sketch 52 发布时完成，但由于官方改变了一些接口和我重写了一些代码，还要调其他插件的新版兼容，结果拖到现在插件差不多算完成了。

本文主要介绍使用 [Stuffing](https://github.com/Ashung/Sketch-Stuffing) 数据插件的使用，我在前文加入一些 Sketch 数据填充的基础。因为这是针对中文用户的数据插件，连界面都是中文，导致我少了美元打赏收入，因为目前为止我所有插件的人民币收入还不够买袋猫粮，所以我不会费太多笔墨介绍非常基础的东西。

* toc
{:toc}

## 数据填充基础

### 对图层插入数据

数据填充功能用于在快速插入文本或图片，目前有两种操作方式：一是选择文本或形状图层，使用工具栏 “Data” 图标或应用菜单 “Layer” - “Data” 中选择数据源；二是选择组件副本（Symbol Instance），从右侧属性面板 Overrides 下标签栏的数据图标的菜单中选择数据源。

成功对图层应用数填充后，该图层将与当前数据源绑定。绑定的好处，在于可以使用数据菜单下的 “Refresh Data / Refresh Data from Master” 或快捷键 “CMD + Shift + D” 刷新数据。使用数据菜单下的 “Clean Data” 可解除当前数据源绑定。组件内如果有图层绑定数据源，该实例标签栏的数据图标将高亮显示，同时菜单下有 “Refresh Data” 菜单。图层绑定数据后改变内容不会解除绑定，所以内容可以改为更友好的空数据状态。

### 制作数据源

Sketch 提供给初级用户简单的制作数据源方法，文本数据使用每行一个数据纯文本文件，图片数据则使用包含图片的文件夹，从 “Preferences” - “Data” 弹出框的 “Add Data...” 按钮添加。

如果使用系统自带的 “文本编辑” 编辑文本数据，必须从菜单 “格式” 下选择 “制作纯文本” ，此时软件的文字样式工具栏会隐藏，保存时选择 UTF-8 编码和 TXT 后缀。图片数据需要注意图像的尺寸不要过大，并且尽量尺寸一致，最好使用无损压缩软件优化过，保证 Sketch 文档不会因为填充图片导致体积剧增。

### 数据插件

数据源很容易在团队中制作和共享，可以让数据库管理员导出一些真实数据，也可以在网上找到类似数据。但这种方式有个局限是数据是随机的，如果需要有规律的文本，或者图文匹配就无法实现。如果需要实现此类复杂需求，就需要依靠数据插件。

数据插件很难满足各种设计业务，它更适合做成公司内部工具，例如通过内部私有的 API 接口获取真实数据、云端数据计算、搜索内部的图片素材等等。关于开发数据插件的信息，官方文章 [Do more with Data: Building a Data Supplier plugin for Sketch](https://blog.sketchapp.com/do-more-with-data-2b765e870e4f) 里有简单的介绍和示例。

------

## 使用 Stuffing 数据插件

### 随机数据

Stuffing 数据插件目前内置的随机文本类数据包括随机姓名（中文姓名、男中文姓名、女中文姓名、英文全名、男英文名、女英文名）、随机中国省市（城市、省份、省市等格式）、随机中国省市车牌号、随机常用免费邮箱地址、随机固定电话、随机移动电话、中国身份证号等。

当内置数据无法满足项目需求是，也可以从文本文件或图片文件夹随机填入数据。[List](https://github.com/listsfordesign/Lists)、[Data for Sketch](https://github.com/eyals/data-for-sketch)、[Sketch Data](https://github.com/ivomynttinen/sketch-data) 和 [Design System UI Kit Data](https://github.com/salesforce-ux/design-system-ui-kit-data) 的文本数据都可以供 Stuffing 插件使用。

### 有序数据与关联数据

插件内部分自定义功能可以填充有序的文本数据，也可以从文本文件或图片文件夹填入有序数据，图片文件夹使用的是 Finder 的名称排序。

利用从文本文件或图片文件夹填入有序数据的功能，可以实现文本与文本对应或文本与图片对应的关联数据。

### 日期

### 时间

### 自定义编号

### 自定义序列数值

### 自定义表达式

i > 0 ? data[i-1] + "" + (i+1) : i +1

```javascript
(i < 2) ? 1 : Number(data[i-1]) + Number(data[i-2])
```



```javascript
(Math.random() * 100).toFixed(2)
```



```javascript
Math.random() < 0.8 ? Math.floor(Math.random() * (100 - 60 + 1)) + 60 : Math.floor(Math.random() * 59)
```



```javascript
var t = ''; for(var j=0;j<50;j++){t += Math.floor(Math.random()*2)} t
```



----

