---
title: （WIP）深入理解 Sketch 库（下）
excerpt: 深入讲述 Sketch 库在团队使用中的各种问题，高级部分。
updated: 2018-06-24
---

这一部分主要是库相关的高级内容，涉及到的方面比较广，每个主题也不会对初级的内容进行详细的介绍。

## 自托管远端库

Sketch 通过 `sketch` 协议打开网络上特定格式的 XML 文件，XML 文件内记录 Sketch 文档的信息，主要是 URL 地址，文档下载完成之后将自动加入库列表中。一个 XML 文档对应一个 Sketch 文档，这些内容可以是动态的，这样服务器端可以加入用户验证、订阅购买等功能，也很容易被整合到其他现有在线服务中。

公司内部其实并不需要这样复杂的功能，只需有服务器可以托管一个简单的静态服务就行，一些可以访问原始文件路径的网盘或类似 GitHub/GitLab 的代码托管系统也是可以的，总之将一对一的 XML 和 Sketch 文件放到网络上，并且可以用固定地址访问到原始文件。

XML 格式如下，主要内容是 Sketch 文件地址和时间，时间用于检测是否需要更新文档，更新 Sketch 文档时同时也需要更改这个时间。

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

使用插件同步库的做法是将 Sketch 文件保存在 Sketch 插件内，安装插件时自动将文件载入到库面板中，之后通过插件的更新功能来提示设计师更新组件。

Sketch 插件其实是一个带 “sketchplugin” 的特定结构的文件夹，将所有的 Sketch 文件放到插件内的 “Contents/Resources” 文件夹下，整个插件的目录结构如下。

```
./Library_Sync_Example.sketchplugin 
└── Contents
    ├── Resources
    │   ├── icon.sketch
    │   └── ui.sketch
    └── Sketch
        ├── library.js
        └── manifest.json
```

编辑 “manifest.json”，这里监视 Sketch 的一些动作，当插件安装或被重新启用时，和软件打开或创建新文档时载入库，在插件卸载或禁用时删除库。

```json
{
    "name": "Library Sync Example",
    "description": "...",
    "author": "...",
    "email": "...",
    "homepage": "",
    "appcast": "http://.../appcast.xml",
    "version": "1.0",
    "identifier": "com.bohemiancoding.sketch.library.sync.example",
    "commands": [
        {
            "handlers": {
                "actions": {
                    "Startup": "addLibrary",
                    "OpenDocument": "addLibrary",
                    "Shutdown": "addLibrary"
                }
            },
            "script": "library.js"
        }
    ]
}
```

编辑 “library.js”，使用新的 [Sketch JavaScript API](https://developer.sketchapp.com/reference/api) 几行代码就可以实现载人和删除库。

```javascript
var addLibrary = function(context) {
    var Library = require('sketch/dom').Library;
    var libraryFiles = [
        'icon.sketch',
        'ui.sketch'
    ];
    libraryFiles.forEach(function(fileName) {
        var libraryUrl = context.plugin.urlForResourceNamed(fileName);
        if (libraryUrl) {
            var libraryPath = String(libraryUrl.path());
            var library = Library.getLibraryForDocumentAtPath(libraryPath);
            if (context.action == "Shutdown") {
                library.remove();
            }
        }
    });
};
```

这样便完成整个插件的主要内容，插件没有菜单项，需要通过插件管理面板来卸载，插件一安装库就被自动载入。插件的更新需要在插件的 “manifest.json” 设置 “appcast” 的地址，只要安装插件的电脑可以访问这个地址，检测到版本信息不同时就会启动后台下载。

appcast.xml 格式如下，格式与上文的远端库 XML 相似，需要保存插件新版的 ZIP 格式压缩包，版本号信息必须与压缩包的新版插件信息一致。每次更新除了 Sketch 文档外，还需要修改 “appcast.xml” 和 “manifest.json” 这两个文件上版本号信息。

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>Library Sync Example</title>
        <link>http://.../appcast.xml</link>
        <description>...</description>
        <language>en</language>
        <item>
            <title>1.1</title>
            <enclosure
                url="http://...zip"
                sparkle:version="1.1"
                type="application/octet-stream"/>
        </item>
    </channel>
</rss>
```

建议把整个项目托管在类似 GitHub/GitLab 之类的程序上，程序会给整个项目一个类似 `https://github.com/user/project/archive/master.zip` 的压缩包格式地址，或者利用 Releases / Tags 功能将某次提交作为发布版本，这样就不需要人工打包插件。然后利用一个小脚本将日期之类的值作为 “appcast.xml” 和 “manifest.json” 这两个文件的版本号信息。

## 统一导出资源

### 组件与输出资源的名称差异

### SVG 优化

