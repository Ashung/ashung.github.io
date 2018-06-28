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

将 XML 和对应的 Sketch 文档都传到网上之后，需要给一个入口，可以在网页或邮箱内容上添加一个链接指向 XML 文件，HTML 代码格式如下，注意 URL 参数的地址需要转码。`sketch://add-library?url=http%3A%2F%2F...xml` 这个地址也可以在 Finder 的 “链接服务器” 上打开。

```html
<a href="sketch://add-library?url=http%3A%2F%2F...xml">Add to Library</a>
```

该功能将在 Sketch 51 开放，目前[测试版](https://sketchapp.com/beta/)使用需要修改协议为 `sketch-beta://add-library?url=` 。

## 使用插件同步库

使用插件同步库的做法是将 Sketch 文件保存在 Sketch 插件内，安装插件时自动将文件载入到库面板中，之后通过插件的更新功能来提示设计师更新组件。

Sketch 插件其实是一个带有 “.sketchplugin” 后缀的特定结构的文件夹，将所有的 Sketch 文件放到插件内的 “Contents/Resources” 文件夹下，整个插件的目录结构如下。

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

编辑 “manifest.json”，这里配置让 Sketch 监视的一些动作，实现当插件安装或被重新启用时和软件打开或创建新文档时载入库，在插件卸载或禁用时删除库。

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

编辑 “library.js”，使用新的 [Sketch JavaScript API](https://developer.sketchapp.com/reference/api) 几行代码就可以实现载入和删除库。

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

建议把整个项目托管在类似 GitHub/GitLab 之类的程序上，程序会给整个项目一个类似 `https://.../user/project/archive/master.zip` 的压缩包格式地址，或者利用 Releases / Tags 功能将某次提交作为发布版本，这样就不需要人工打包插件。然后利用一个小脚本将日期之类的值作为 “appcast.xml” 和 “manifest.json” 这两个文件的版本号信息。

## 使用脚本输出资源

可以在 Sketch 的 “Run Script...” 弹出界面上，直接编写脚本并运行，这种形式通常用于运行某些简短的代码来解决某些特定的问题，或者测试代码片段，或者输出某些信息，这些代码也可以被保存成插件。

现在需要为一个图标库导出多种尺寸 PNG，如果图标都是 Symbol Master，但是文档中还有一些例如色彩的 Symbol 或者外部 Symbol 不希望导出，需要对文档中的 Symbol 进行一些过滤。

```javascript
var sketch = require('sketch/dom');
var document = sketch.getSelectedDocument();
// 文档中所有组件
var symbols = document.getSymbols();
// 输出组件名
symbols.forEach(function(symbol) {
    log(symbol.name);
});
```

上面的代码会列出所有  Symbol，可以根据实际情况过滤某种名称的组件。

```javascript
// 过滤文档中所有组件
var symbols = document.getSymbols().filter(function(symbol) {
    return !/^\*/.test(symbol.name);
});
```

或者只处理当前页面的组件。

```javascript
// 过滤文档中所有组件
var symbols = document.getSymbols().filter(function(symbol) {
    return symbol.sketchObject.parentGroup() == context.document.currentPage();
});
```

或者只处理选中的组件。

```javascript
// 过滤文档中所有组件
var symbols = document.selectedLayers.layers.filter(function(layer) {
    return layer.type == "SymbolMaster";
});
```

导出资源，默认将文件保存到 “~/Documents/Sketch Exports” 目录下。

```javascript
// 导出资源
symbols.forEach(function(symbol) {
    var options = {scales: "1, 1.5, 2, 3, 4", formats: "png"};
    sketch.export(symbol, options);
});
```

新的 Sketch API 目前并没有提供太多的导出设置，实际情况下，通常会有例如询问保存路径的功能。

```javascript
// 询问保存路径
var panel = NSOpenPanel.openPanel();
panel.setCanChooseDirectories(true);
panel.setCanChooseFiles(false);
panel.setCanCreateDirectories(true);
if (panel.runModal() == NSOKButton) {
    var savePath = panel.URL().path();
    // 输出组件保存路径
    symbols.forEach(function(symbol) {
        log(`${savePath}/${symbol.name}`);
    });
}
```

假设画板的名称格式类似 “icon/action/done”，我们需要导出 Android 平台的多分辨率 PNG 资源，另外还要在文件名前多增加一个表示不同分辨率的文件夹，例如 “icon/action/drawable-xhpi/done” 和 “icon/action/drawable-xxhpi/done”。

```javascript
// 如果用户没有按下确定，程序就停止，改为这种格式以减少缩进。
if (panel.runModal() != NSOKButton) {
    return;
}

var savePath = panel.URL().path();
symbols.forEach(function(symbol) {
    // 创建 Export Request
    var ancestry = MSImmutableLayerAncestry.ancestryWithMSLayer(symbol.sketchObject);
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry(ancestry).firstObject();
    // 设置格式为 PNG
    exportRequest.setFormat("png");
    // Android 文件名称与缩放对应关系
    var dpis = {
        mdpi: 1,
        hdpi: 1.5,
        xhdpi: 2,
        xxhdpi: 3,
        xxxhdpi: 4
    };
    for (var dpi in dpis) {
        // 在文件名前加上分辨率文件夹
        var name = symbol.name.split("/");
        name.splice(-1, 0, "drawable-" + dpi);
        name = name.join("/");
        // 设置缩放
        exportRequest.setScale(dpis[dpi]);
        // 导出资源
        context.document.saveExportRequest_toFile(exportRequest, `${savePath}/${name}.png`);
    }
});
```

如果只导出 SVG 格式，代码就相对简单。

```javascript
var savePath = panel.URL().path();
symbols.forEach(function(symbol) {
    // 在文件名前加上 SVG 文件夹
    var name = symbol.name.substring(0, symbol.name.lastIndexOf("/")) + "/svg" + symbol.name.substring(symbol.name.lastIndexOf("/"));
    // 导出资源
    context.document.saveArtboardOrSlice_toFile(symbol.sketchObject, `${savePath}/${name}.svg`);
});
```

## 组件与输出资源的名称差异

组件为了方便检索会将其分类，例如一套图标有多种风格，组件名称可能按照类似下面的 “风格／分类／名称／尺寸” 格式命名。

```
Icon / Rounded / Action / Done / 16
Icon / Rounded / Action / Done / 24
Icon / Rounded / Action / Done All / 16
Icon / Rounded / Action / Done All / 24
Icon / Outlined / Action / Done / 16
Icon / Outlined / Action / Done / 24
Icon / TwoTone / Action / Done / 16
Icon / TwoTone / Action / Done / 24
```

而资源却希望保存成类似下面的格式，还有多种尺寸资源。用传统增加切片，并修改图层名的方式工作量非常大。

```
round/action/drawable-xhdpi/ic_done_16dp.png
round/action/drawable-xhdpi/ic_done_24dp.png
round/action/drawable-xhdpi/ic_done_all_16dp.png
round/action/drawable-xhdpi/ic_done_all_24dp.png
outlined/action/drawable-xhdpi/ic_done_16dp.png
outlined/action/drawable-xhdpi/ic_done_24dp.png
twotone/action/drawable-xhdpi/ic_done_16dp.png
twotone/action/drawable-xhdpi/ic_done_24dp.png
```



```javascript
symbols.forEach(function(symbol) {
    // 创建 Export Request
    var ancestry = MSImmutableLayerAncestry.ancestryWithMSLayer(symbol.sketchObject);
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry(ancestry).firstObject();
    // 设置格式为 PNG
    exportRequest.setFormat("png");
    // Android 文件名称与缩放对应关系
    var dpis = {
        mdpi: 1,
        hdpi: 1.5,
        xhdpi: 2,
        xxhdpi: 3,
        xxxhdpi: 4
    };
    for (var dpi in dpis) {
        // 重新组合名称，并在文件名前加上分辨率文件夹
        var p1, p2, p3, p4, p5;
        [p1, p2, p3, p4, p5] = symbol.name.split(/\s*\/\s*/);
        var name = `${p2}/${p3}/drawable-${dpi}/ic_${p4}_${p5}dp`.replace(/\s+/g, "_").toLowerCase();
        // 设置缩放
        exportRequest.setScale(dpis[dpi]);
        // 导出资源
        context.document.saveExportRequest_toFile(exportRequest, `${savePath}/${name}.png`);
    }
});
```







