---
title: （WIP）深入理解 Sketch 库（下）
excerpt: 深入讲述 Sketch 库在团队使用中的各种问题，高级部分。
updated: 2018-06-24
---

这一部分主要是一些库相关的高级内容，涉及到的内容比较广，不会介绍很初级的内容，每个内容也不会进行很详细的介绍，读者需要有一些编程经验。

## 自托管远端库

Sketch 通过 `sketch` 协议打开网络上特定格式的 XML 文件，XML 文件内记录 Sketch 文档的信息，主要是 URL 地址，文档下载完成之后将自动加入库列表中。一个 XML 文档对应一个 Sketch 文档，这些内容可以是动态的，这样服务器端可以加入用户验证、订阅购买等功能，也很容易被整合到其他现有在线服务中。

公司内部其实并不需要这样复杂的功能，只需有服务器可以托管一个简单的静态服务就行，一些可以访问原始文件路径的网盘或类似 GitHub/GitLab 的代码托管系统也是可以的，总之将一对一的 XML 和 Sketch 文件放到网络上，并且可以用固定地址访问到原始文件。

XML 格式如下，主要内容是 Sketch 文件地址和时间，时间用于检测是否需要更新文档。

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle"  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>...</title>
    <description>...</description>
    <language>en</language>
    <item>
      <title>...</title>
      <pubDate>[UTC Time]</pubDate>
      <enclosure url="[sketch 文件 URL]" sparkle:version="1" length="..." type="application/octet-stream" />
    </item>
  </channel>
</rss>
```

将 XML 和对应的 Sketch 文档都传到网上之后，需要给一个入口，可以在网页或邮箱内容上添加一个链接指向 XML 文件，HTML 代码格式如下，注意 XML 的 URL 地址需要转码。`sketch://add-library?url=http%3A%2F%2F...xml` 这个地址也可以在 Finder 的 “链接服务器” 上打开。

```html
<a href="sketch://add-library?url=http%3A%2F%2F...xml">Add to Library</a>
```

该功能将在 Sketch 51 开放，目前[测试版](https://sketchapp.com/beta/)使用需要修改协议为 `sketch-beta://add-library?url=` 。

## 使用插件同步库



## 解决组件名称与资源名称的差异



## 统一导出资源



## 导出 SVG 和优化

