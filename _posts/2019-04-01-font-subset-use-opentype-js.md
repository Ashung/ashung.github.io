---
title: 使用 Opentype.js 生成字体子集
excerpt: 使用 Opentype.js 在浏览器或 Node.js 环境生成字体子集。
updated: 2019-10-10
---

字体子集是将字体文件中部分多余的字符删除，来减小文件大小，从而在 Web 端使用或嵌入到其他应用或系统中，在网上可以找到不少这方面的工具。

[Opentype.js](https://opentype.js.org/) 是一套可以支持浏览器环境和 Node.js 环境的开源 OpenType 字体读写库，利用这个库可以很轻松实现浏览器环境和 Node.js 环境的字体子集功能。

## 在浏览器环境创建字体子集工具

首先创建一个简单的 HTML界面，包括一个选取字体文件按钮，一个输入框用于输入保留的字符，和一个保存下载按钮。

HTML

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Font Subset</title>
</head>
<body>
    <div>
        <p><label for="text">Choose a font file:</label></p>
        <input type="file" id="file">
    </div>
    <div>
        <p><label for="text">Text:</label></p>
        <textarea id="text"></textarea>
    </div>
    <div>
        <input type="button" id="save" value="save">
    </div>
</body>
</html>
```

在 HTML 的 `</body>` 前引入 opentype.js，并加入 Javascript。

```html
<script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
<script>
    var save = document.getElementById("save");
    save.onclick = function() {
        var file = document.getElementById("file");
        var text = document.getElementById("text");
        if (file.files.length === 0) {
            alert("Choose a font file.")
            return;
        }
        if (text.value === "") {
            alert("Type some text.")
            return;
        }

        var glyphsArray = text.value.split("");
        var glyphs = glyphsArray.filter(function(item) {
                return item !== " ";
            }).filter(function(item, index) {
                return glyphsArray.indexOf(item) === index;
            }).join("");

        var reader = new FileReader();
        reader.onload = function(error) {
            try {
                var font = opentype.parse(reader.result);
                var postScriptName = font.getEnglishName("postScriptName");
                var [familyName, styleName] = postScriptName.split("-");
                
                var notdefGlyph = font.glyphs.get(0);
                notdefGlyph.name = ".notdef";
                var subGlyphs = [notdefGlyph].concat(font.stringToGlyphs(glyphs));

                var subsetFont = new opentype.Font({
                    familyName: familyName,
                    styleName: styleName,
                    unitsPerEm: font.unitsPerEm,
                    ascender: font.ascender,
                    descender: font.descender,
                    designer: font.getEnglishName("designer"),
                    designerURL: font.getEnglishName("designerURL"),
                    manufacturer: font.getEnglishName("manufacturer"),
                    manufacturerURL: font.getEnglishName("manufacturerURL"),
                    license: font.getEnglishName("license"),
                    licenseURL: font.getEnglishName("licenseURL"),
                    version: font.getEnglishName("version"),
                    description: font.getEnglishName("description"),
                    copyright: "This is a subset font of " + postScriptName + ". " + font.getEnglishName("copyright"),
                    trademark: font.getEnglishName("trademark"),
                    glyphs: subGlyphs
                });
                subsetFont.download();
            } catch (error) {
                alert(error.message);
                throw(error);
            }
        };
        reader.onerror = function(error) {
            alert(error.message);
            throw(error);
        };
        reader.readAsArrayBuffer(file.files[0]);
    };
</script>
```

## 在 Node.js 环境创建字体子集工具

### 创建项目文件

在 Node.js 版的项目中，可以考虑通过配置文件来实现批量处理多个字体文件功能。

```shell
mkdir font_subset
cd font_subset
npm init
```

项目结构如下，把所有原始的字体保存在 src 目录下，子集化之后的字体保存在 dist 目录下，main.js 为主脚本。

```
font_subset
├── config.json
├── dist
├── main.js
├── node_modules
├── package-lock.json
├── package.json
└── src
    └── NotoSerifSC-Bold.otf
```

### 字体配置

修改 “config.json” 文件。`fonts` 数组类型，可配置多个字体文件；`texts` 字符串类型，输入需要保留的字符，字符可以重复，可包含空格，不可换行，英文双引号使用 `\"` 表示。

```json
{
    "fonts": ["./src/NotoSerifSC-Bold.otf"],
    "texts": " 0123456789:"
}
```

### 生成字体

main.js 内容如下。

```javascript
const config = require('./config.json');
const fonts = config.fonts;
const texts = config.texts;

const path = require('path');
const opentype = require('opentype.js');

const glyphs = [...new Set(texts.split(''))].join('');

fonts.forEach(item => {
    const font = opentype.loadSync(item);
    const postScriptName = font.getEnglishName('postScriptName');
    const dist = path.join(
        'dist',
        postScriptName.replace(/-/g, '_').toLowerCase() + '_subset.otf'
    );
    const [familyName, styleName] = postScriptName.split('-');
    
    const notdefGlyph = font.glyphs.get(0);
    notdefGlyph.name = '.notdef';
    const subGlyphs = [notdefGlyph].concat(font.stringToGlyphs(glyphs));
    
    const subsetFont = new opentype.Font({
        familyName: familyName,
        styleName: styleName,
        unitsPerEm: font.unitsPerEm,
        ascender: font.ascender,
        descender: font.descender,
        designer: font.getEnglishName('designer'),
        designerURL: font.getEnglishName('designerURL'),
        manufacturer: font.getEnglishName('manufacturer'),
        manufacturerURL: font.getEnglishName('manufacturerURL'),
        license: font.getEnglishName('license'),
        licenseURL: font.getEnglishName('licenseURL'),
        version: font.getEnglishName('version'),
        description: font.getEnglishName('description'),
        copyright: 'This is a subset font of ' + postScriptName + '. ' + font.getEnglishName('copyright'),
        trademark: font.getEnglishName('trademark'),
        glyphs: subGlyphs
    });

    subsetFont.download(dist);
});

```

打开终端项目所在目录，输入以下命令，字体保存到 “dist” 文件夹下。

```shell
node main.js
```