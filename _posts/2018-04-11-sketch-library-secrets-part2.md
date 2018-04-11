---
title: （WIP）揭秘 Sketch 库 -- Part 2
excerpt: 深入讲述 Sketch 库在团队使用中的各种问题，Part 2 介绍库文件维护。
updated: 2018-04-10
---

## 组件命名和管理建议

### 命名建议

#### 组件命名

库文件会分发给团队内部设计师，甚至是外部设计师，所以库组件的分组结构需要尽量清晰。

组件名称使用 “/” 符号分组，建议分组在 1 - 3 组之间，“/” 前后加入一个空格，名称使用 Title Case 方式命名，如果你的组件跟某个界面框架相应，也可以根据这个界面框架的模版名称命名。

第一组名称可以根据 Atomic Design 的理论命名。例如 Atoms、Molecules、Organisms、Templates、Pages 或 Components、Patterns 之类。第二组名称使用元素的标准名称，这个可以参考各 Web 前端框架、iOS 和 Android 等平台对控件的命名。例如 Navigation Bar、Status Bar、Toolbar。第三组名称则表示元素的不同属性或者状态，例如尺寸、浅色主题和深色主题，聚焦状态和禁用状态，正确、错误和警告状态等等。例如 Button Default、Button Primary。通常第二、三组可能会有多个子类，因为 Sketch 会以字母顺序排列，所以通常将主类的名前置，而将表示状态等词后置，这样菜单中就会显示更清晰，例如 Input / Text Disable 和 Input / Password Disable。

目前设计师可以使用 [Sketch Runner](http://sketchrunner.com/) 插件的 Insert 功能，搜索并插入所有库中的组件，但目前该插件暂不支持中文，所以建议组件命名统一采用英文，并且与相应的框架或平台的规范名称一致。

如果可能会导出组件，组件命名就尽量不要包含可以用于文件名的特殊符号，和大小写敏感问题，例如 macOS 文件名不能包含 “:”，Windows 不能包含 “\:*?<>|” 等字符。另外在 macOS 和 Linux 中文件名以点开头的文件会被隐藏，所以组件的类中不要以点开头。

Sketch Runner 在搜索组件时，可以设置忽略名称带有某个特定前缀和后缀的组件。通常把一些不会在设计中独立使用的组件，图层命名使用 “_” 开头。 在库中那些有异议或未确定的组件，建议在图层命名结尾加 “!” 符号。 



#### 样式命名

文本

#### Overrides 标签命名

### 组件整理

#### 排列

#### 在本页创建组件

#### 色版组件

#### 组件分页

xx

----

## 库文件性能优化

### 控制页面内画板数量

TODO

https://sketchapp.com/docs/other/performance/



TODO

### 避免引入无关的外部组件

TODO

### 库文件拆分与合并

组件 ID

TODO

## 避免冲突

### 避免组件更新 Overrides 丢失

TODO

### 使用位图填充替代位图图层

TODO

### 防止修改库

TODO

----

## 附：插件推荐

### 综合

- [Sketch Runner](http://sketchrunner.com/)
- [Automate](https://github.com/Ashung/Automate-Sketch) 
- [Sketch Select](https://github.com/canisminor1990/sketch-select)

### 图层命名

- [Rename It](http://rodi01.github.io/RenameIt/)
- [Sketch Name Organizer](https://github.com/canisminor1990/sketch-name-organizer)

### 库和组件管理

- [Library Symbol Replacer](https://github.com/zeroheight/library-symbol-replacer)
- [Symbol Swapper](https://github.com/sonburn/symbol-swapper)
- [Move to library](https://github.com/ahmedmigo/Move-to-library-sketchplugin)
- https://github.com/sonburn/symbol-organizer
- https://github.com/oodesign/merge-duplicate-symbols 
- [Sketch Symbols Manager Plugin](https://gumroad.com/l/sketch-symbols-manager) 付费

### 样式管理

- [Sketch Style Libraries](https://github.com/sigtm/sketch-style-libraries)
- [Sketch Text Styles Manager](https://gumroad.com/l/sketch-text-styles-manager)

### 其他

- [Sketch Icons](https://github.com/AMoreaux/Sketch-Icons)
- https://github.com/sonburn/symbol-instance-sheet

----

## 高级话题

下文的高级话题部分会给出一些问题的解决方案，但是并非每个设计团队都有 Sketch 插件开发人员处理一些极端情况，此处列出一些库管理者应该注意的事项，可以尽量避免出现难处理的问题。

### 修改库 ID 冲突

TODO

### 修复损坏组件

TODO

### 查找和修复坏链库组件

TODO

### 使用插件同步库

TODO

### 动态加载库

TODO
