---
title: （WIP）成为高效的 UI 设计师
excerpt: 资源。
updated: 2017-06-22 13:23
tags: Photoshop Android Script
---

## 团队协作

### 项目管理

这些程序通常为开发者所使用和熟知，它们引入一种更为现代和高效的工作方式，这些方法适合任何软件工作者，包括设计师。这些程序提供了非常完整的项目管理的一系列功能，诸如文件管理（包括备份、同步、历史记录、评审等），成员管理（权限控制等），问题跟踪（可用于任务计划、Bug 跟踪等），文档（用于备注、帮助、规范等）等等。如果设计师需要与开发人员能够更顺畅地沟通和协作，学习和使用这类程序是非常必要的。

以下为可自托管得免费开源 Web 应用程序。安装与配置请咨询有 Linux 服务器管理经验的技术人员，内部可以直接使用已配置好的虚拟机镜像或 Docker 镜像。

- [GitLab Community Edition](https://about.gitlab.com/downloads/) (Linux) Git 服务器端 Web 程序，GitHub 的替代品，功能强大。
- [Gogs](https://gogs.io/) (全平台) 国产 Git 服务器端 Web 程序，安装简单，多语言界面，跨平台。当团队或公司中没有技术支持时，这个程序是不错的选择。
- [Gitea](https://gitea.io) Gogs 衍生版。

免费和付费在线托管。

- [GitHub](https://github.com/) 免费项目的内容是开放的，私密项目需要付费。
- [GitLab](https://gitlab.com/) 免费用户有部分高级功能限制。
- [BitBucket](https://bitbucket.org/) 免费用户有团队人数限制。

### 文件共享

很多因素导致很多网盘并不适合公司内部使用，但很多日常工作又需要大文件传输，如果公司

以下是针对公司内部使用而设计的自托管的网盘程序，包括 Web、iOS、Android 平台客户端，借助桌面的客户端可以实现多台电脑间的文件同步。

- [Owncloud](https://owncloud.org/) (PHP + MySQL/PostgreSQL)
- [NextCloud](https://nextcloud.com/) Owncloud 衍生版。


### 即时通讯

以下是自托管的 Slack 的开源替代品，包括 Web、iOS、Android 平台客户端。

- [Rocket Chat](https://rocket.chat/) (Node.js)
- [Mattermost Team Edition](https://about.mattermost.com/download/) (Go)
- [Gitter](https://gitlab.com/gitlab-org/gitter/) (Node.js)

免费和付费在线服务。

- [Slack](https://slack.com/) 免费用户有存储空间（5G）、应用（10）、信息历史（10k）等限制。
- [Stride by Atlassian](https://www.stride.com/) 免费用户有存储空间（5G）、应用（10）、信息历史（25k）等限制。
- [Gitter](https://gitter.im/) 无限制。

### 知识共享

生成网页形式的文档，适用于内部设计规范，技术文档等等。需要基础命令行操作知识，网站部署知识，以及熟悉 Markdown 语法。

https://www.staticgen.com/

#### 静态站点生成器

- [Jekyll](http://jekyllrb.com/) Github Pages 所使用的静态网站生成程序。
- [GitBook](https://github.com/GitbookIO) 文档类静态网站生成程序。

#### Flat-file CMS

- [Raneto](http://raneto.com/)
- [Kirby](https://getkirby.com/)

免费和付费在线服务。

https://www.notion.so/

https://quip.com/

----

## 命令行工具与 Shell 编程

### 终端增强

oh-my-zsh

### 命令行工具

大部分命令行工具，在 macOS 上可以通过 [Homebrew](http://brew.sh/) 安装。

部分命令行工具依赖某种语言环境，这些语言都有各自的包管理工具，例如基于 Node.js 开发的命令行工具，通常可以通过 `npm install <package>` 安装；基于 Python 开发的命令行工具，通常可以通过 `pip install <package>` 安装；基于 Ruby 开发的命令行工具，通常可以通过 `gem install <package>` 安装。这三种语言都是跨平台的，macOS 上系统默认自带 Python 与 Ruby 开发环境，Windows 下可以使用 EXE 安装文件。

- [PNGOUT](http://advsys.net/ken/utils.htm), [PNGCrush](http://pmt.sourceforge.net/pngcrush/), [OptiPNG](http://optipng.sourceforge.net/) 无损 PNG 压缩
- [pngquant](https://pngquant.org/) 有损 PNG 压缩
- [FFmpeg](http://ffmpeg.org/) 视频工具
- [Gifsicle](http://www.lcdf.org/gifsicle/) Gif 工具
- [SVGO](https://github.com/svg/svgo) SVG 优化工具
- [CairoSVG](http://cairosvg.org/) SVG 转 PNG, PDF, PostScript 工具
- [ImageMagick](http://www.imagemagick.org/) 图片处理与格式转换
- [AutoTrace](http://autotrace.sourceforge.net/) 位图转矢量
- [Potrace](http://potrace.sourceforge.net) 位图转矢量, 仅支持单色


- [Command Pad](https://github.com/supnate/command-pad)


### Shell 编程

- [Shell Scripting Primer](https://developer.apple.com/library/mac/documentation/OpenSource/Conceptual/ShellScripting/shell_scripts/shell_scripts.html) by Apple
- https://devhints.io/bash


----

## 界面设计软件自动化编程

### Sketch 插件开发

- [Sketch Developer](http://developer.sketchapp.com/)  官方插件开发文档
- [Sketch Headers](https://github.com/abynim/Sketch-Headers) Headers from Sketch app exported using class-dump
- [Sketch Plugin Directory](https://github.com/sketchplugins/plugin-directory) 官方插件目录, 收集各种托管在 GitHub 的开源 Sketch 插件
- [sketchplugins.com](http://sketchplugins.com/) Sketch 官方开发者论坛



https://github.com/turbobabr/Sketch-Plugins-Cookbook

https://medium.com/sketch-app-sources/sketch-plugin-snippets-for-plugin-developers-e9e1d2ab6827

http://qiita.com/littlebusters/items/b919693f4f3d4c183ce0





### Adobe 软件脚本编程

- Photoshop 脚本编程 [Photoshop Scripting 官方文档](http://www.adobe.com/devnet/photoshop/scripting.html)
- Illustrator 脚本编程 [Illustrator Scripting 官方文档](http://www.adobe.com/devnet/illustrator/scripting.html)
- After Effects 脚本编程 [aescripts + aeplugins](https://aescripts.com/), [After Effects Scripting Guide](http://docs.aenhancers.com/)
- [ScriptUI for dummies](http://www.kahrel.plus.com/indesign/scriptui.html)  by Peter Kahrel. ScriptUI 教程.
- [xtools 2.2](http://sourceforge.net/projects/ps-scripts/files/xtools/v2.2/)  Photoshop 脚本开发工具
- [Creative Cloud Extension Builder for Brackets](http://davidderaedt.github.io/CC-Extension-Builder-for-Brackets/)  Brackets插件, 非官方的扩展开发工具
- [HTML panal 系列教程](http://www.davidebarranca.com/category/code/html-panels/) by Davide Barranca


### 包、模块

带有某种功能的代码或库，需要有特定语言的基础才能用其来完成特定操作，所使用语言备注在括号内。

- npm, [ndm](https://github.com/720kb/ndm)


- [gulp](http://gulpjs.com/), [grunt](http://gruntjs.com/) 自动构建工具 (Node.js)
- [imagetracerjs](https://github.com/jankovicsandras/imagetracerjs) 位图转矢量 (Node.js)
- [SVG font dumper](https://github.com/fontello/svg-font-dump) SVG 字体转为多个 SVG 图片 (Node.js)
