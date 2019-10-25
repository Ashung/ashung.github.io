---
title: 使用 Opentype.js 生成字体子集
excerpt: 使用 Opentype.js 生成字体子集。
updated: 2019-10-10
---



HTML

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
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
</body>
</html>
```





Node.js



```
├── config.json
├── dist
├── main.js
├── node_modules
├── package-lock.json
├── package.json
└── src
    └── NotoSerifSC-Bold.otf
```







字体配置

修改 “config.json” 文件。`fonts` 数组类型，可配置多个字体文件；`texts` 字符串类型，输入需要保留的字符，字符可以重复，可包含空格，不可换行，英文双引号使用 `\"` 表示。

```json
{
    "fonts": ["./src/NotoSerifSC-Bold.otf"],
    "texts": " 0123456789:"
}
```







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

**## 生成字体**



打开终端项目所在目录，输入以下命令，字体保存到 “dist” 文件夹下。



\```shell

npm run make

\```