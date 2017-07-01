---
title: Sketch + Git — 创造直观的修改记录
excerpt: 创造插件为 Sketch 文件生成用于比对的文件。
updated: 
tags: Sketch Git Sketch-Plugin
---

如果在你们的团队中，使用网盘、FTP、局域网共享文件夹、邮件等方式管理公共设计文档，为了记录修改历史，你就需要写一个非常繁琐的更新记录，而且难以记录下很细节的改动。

如果使用 Git 管理公共设计文档，可以省去每次另存都要加入数字或日期后缀，因为特殊的二进制格式，导致依然难以记录修改。换个方式思考，我们可以用文本或图片来表示特殊格式，这样就可以被 [GitHub](https://github.com/)、[GitLab](https://gitlab.com) 这样的 Web 程序或者 [SourceTree](https://www.sourcetreeapp.com/) 这样的界面客户端直观的显示出来。

![](../images/sketch-and-git-export-artboards-for-diff/gitlab_image_diff.png)__GitLab 和 GitHub 对图片可以进行直观的对比。__

在 Sketch 中通常使用 Artboard 和 Symbol Master 最为一个界面或组件，所以我们只要记录这些修改就可以了。就是在 Sketch 文档完成一次迭代修改之后，提交记录到 Git 之前，我们把文档内的所有 Artboard 和 Symbol 都以图片形式保存出来。

能力一般的设计师和使用 Sketch 的设计团队可能已经无法往下看了，我知道你们的公共文档肯定有上百甚至几百个 Symbol 。稍微对 Sketch 上点心的设计师，可能知道切换 Page，全选 Artboard，拖动图层到 Finder 就可以保存。

对 Sketch 来说做这件事就是小菜，导出几百个 Symbol 不过一眨眼功夫。**在软件的世界里，你不须事必躬亲，不须亲力亲为。你只需要给软件下对命令。**我们只要做一个 Sketch 插件来做这件事就可以了。

----

打开一个公共的 Sketch 文档，执行菜单 “Plugins” - “Run Script...”，如果你没有升级到 Sketch 45，这个菜单，名为 “Custom Plugin...”。

你会看到这样的窗口，接下去的操作很简单，只要会打字和复制粘贴就行，无需对这些代码心怀恐惧，在上面的框全选，把它们全删了。

![](../images/sketch-and-git-export-artboards-for-diff/sketch_run_script.png)

接着把下面的英文，当作打字练习打上去，如果懒就复制吧。

```javascript
var doc = context.document;
// 如果文档存在电脑中，就继续运行，新建的未保存文档将不会运行。
if (doc.fileURL()) {
  	// 打算用来保存图片的文件夹路径。
    var exportPath = doc.fileURL().path().stringByDeletingPathExtension();
    log(exportPath);
}
```

然后点击右下角 “Run” 按钮，如果没错的话，下面的框会显示当前文档的路径，但是少了 “.sketch” 文件后缀。我们打算把导出的图片保存到这个文件夹内，就是一个和当前 Sketch 文档同名的文件夹。



```javascript
var doc = context.document;
// 如果文档存在电脑中，就继续运行，新建的未保存文档将不会运行。
if (doc.fileURL()) {
  	// 打算用来保存图片的文件夹路径。
    var exportPath = doc.fileURL().path().stringByDeletingPathExtension();
    // 遍历文档的 Page 和每个 Page 的 Artboard。
	for (var i = 0; i < doc.pages().count(); i++) {
        var page = doc.pages()[i];
        for (var j = 0; j < page.artboards().count(); j++) {
          	var artboard = page.artboards()[j];
            log(page.name() + "/" + artboard.name());
        }
    }
}
```









```javascript
var doc = context.document;
if (doc.fileURL()) {

    var currentPage = doc.currentPage();

    var exportPath = doc.fileURL().path().stringByDeletingPathExtension() + "_export";

    if (NSFileManager.defaultManager().fileExistsAtPath_(exportPath)) {
        NSFileManager.defaultManager().removeItemAtPath_error_(exportPath, nil);
    }

    var loopPages = doc.pages().objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        doc.setCurrentPage(page);
        var loopArtboards = page.artboards().objectEnumerator();
        var artboard;
        while (artboard = loopArtboards.nextObject()) {
            doc.saveArtboardOrSlice_toFile(artboard, exportPath + "/" + page.name() + "/" + artboard.name() + ".png");
        }
    }

    doc.setCurrentPage(currentPage);

    doc.showMessage('已将 Symbol 与 Artboard 的 PNG 保存至 "' + exportPath + '".');

}
```





