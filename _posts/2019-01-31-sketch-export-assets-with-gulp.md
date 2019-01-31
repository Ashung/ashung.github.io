---
title: 使用 gulp 导出 Sketch 资源
excerpt: 使用 gulp 从 Sketch 文件导出各种资源，包括 SVG Sprite、Icon Font 和 Android Vector Drawable 等等。
updated: 2019-01-31
---

本文介绍如何使用现有的 gulp 插件或 node.js 从 Sketch 文件导出目前常见各种应用场景的资源，包括多尺寸 PNG、iOS 和 macOS 使用的 PDF、网页上使用的图标字体、SVG Sprite 或 SVG symbol、Android 平台的 Vector Drawable 等等。在阅读前读者需要了解 gulp 和 node.js 编程，以及基础的命令行操作，由于使用 Sketch 自动的命令行工具 sketchtool，所以所有依赖此工具的都必须在 macOS 上运行。

* toc
{:toc}

## Sketch 文件规范

在现实中需要使用这种快速导出资源并转换多种格式，大部分都是处理一些系统图标或者数量较多的插图等，所以文章中会以图标作为示例。

为了方便程序准确的读取 Sketch 文件的信息，需要让设计师在设计图标时遵循一些规范，根据当前 Sketch 的功能，我使用如下的规范：

每一个图标都是一个 Symbol Master，这样做这个 Sketch 文件可以被当作库来使用。可以先创建 Artboard 再将其转为 Symbol，这样就可以在 Artboard 的原位置创建 Symbol 而不会产生一个 Symbol 实例。

在 Sketch 52.x 中 Symbol 实例可以更改 style overrides，所以为每个图标绑定相同的一个样式是个不错的做法，例如绑定一个 Color / Default 的黑色样式。当然图标也可以是彩色或者包含透明度的，但你必须清楚了解某些类型资源本身的限制，例如目前图标字体只会是单色。

尽量将图标的图层都合并到一个形状图层上，这样代码形式的资源可以得到更佳的效果，如果需要导出 Android 平台的 Vector Drawable，建议把形状图层填充选项设置为 Non-Zero，在 Sketch 52.x 中此设置合并在样式中。另外一些特殊功能蒙板、投影样式等，某些代码类型的资源可能不支持，需要了解各自的限制。

资源的命名，为了避免多余的操作，不建议使用 Sketch 的分组符号 “/”，建议采用小写英文和 “-” 或 “_” 分隔符的组合。

![](../images/sketch-gulp/sketch_gulp_1.png)

## 在 gulp 中使用 sketchtool

文中没有使用 [gulp-sketch](https://www.npmjs.com/package/gulp-sketch)，是因为 sketchtool 附在 Sketch 安装文件内，经常会更新，而这里直接使用 [child-process-promise](https://www.npmjs.com/package/child-process-promise) 运行 sketchtool 命令是比较合适的选择。

“gulpfile.js” 公共部分。这里使用 gulp 4.0 以上版本，使用 [del](https://www.npmjs.com/package/del) 在生成资源前删除旧的资源，避免因 Sketch 文件图层名修改造成资源冗余。使用 [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) 压缩 PNG 和 SVG 资源。

```javascript
const gulp = require('gulp');
const exec = require('child-process-promise').exec;
const del = require('del');
const imagemin = require('gulp-imagemin');

let sketchtool = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool';
let src = './sketch/icons.sketch';
```

### 1x PNG

TODO

### 2x PNG

TODO

### Apple 多分辨率 PNG

sketchtool 可以非常方便导出 Sketch 资源为 iOS 多分辨率 PNG，自带 @2x 和 @3x 后缀。导出资源运行 `gulp ios-png`。

```javascript
// 清理旧资源
gulp.task('clean:ios-png', function() {
    return del(['./dest/ios-png']);
});

// 导出资源
gulp.task('export:ios-png', function() {
    let dest = './dest/ios-png/';
    // del.sync(['./dest/ios-png']);
    return exec(`${sketchtool} export artboards ${src} --formats="png" --scale="1,2,3" --output="${dest}" --include-symbols="yes"`);
});

// 压缩资源
gulp.task('minify:ios-png', function () {
    return gulp.src('./dest/ios-png/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dest/ios-png/'));
});

gulp.task('ios-png', gulp.series('clean:ios-png', 'export:ios-png', 'minify:ios-png'));
```

### Android 多分辨率 PNG

TODO

### PDF

导出资源运行 `gulp ios-pdf`。

```javascript
// 清理旧资源
gulp.task('clean:ios-pdf', function() {
    return del(['./dest/ios-pdf']);
});

// 导出资源
gulp.task('export:ios-pdf', function() {
    let dest = './dest/ios-pdf/';
    return exec(`${sketchtool} export artboards ${src} --formats="pdf" --output="${dest}" --include-symbols="yes"`);
});

gulp.task('ios-pdf', gulp.series('clean:ios-pdf', 'export:ios-pdf'));
```

### SVG

导致资源运行 `gulp svg`，这里压缩 SVG 时保留 2 位小数，保留 viewBox 属性，而删除 width 和 height 属性，这样 SVG 插入到 HTML 上时可以使用 CSS 控制尺寸，更多压缩配置请参考 [svgo](https://github.com/svg/svgo) 文档。

```javascript
// 清理旧资源
gulp.task('clean:svg', function() {
    return del(['./dest/svg']);
});

// 导出资源
gulp.task('export:svg', function() {
    let dest = './dest/svg';
    return exec(`${sketchtool} export artboards ${src} --formats="svg" --output="${dest}" --include-symbols="yes"`);
});

// 压缩资源
gulp.task('minify:svg', function() {
    return gulp.src('./dest/svg/*.svg')
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    { cleanupListOfValues: { floatPrecision: 2, leadingZero: false } },
                    { cleanupNumericValues: { floatPrecision: 2, leadingZero: false } },
                    { convertPathData: { floatPrecision: 2, leadingZero: false } },
                    { removeViewBox: false },
                    { removeDimensions: true }
                ]
            })
        ]))
        .pipe(gulp.dest('./dest/svg'));
});

gulp.task('svg2', gulp.series('clean:svg', 'export:svg', 'minify:svg'));
```

## 通过 SVG 转换为其他格式

### SVG Sprite

TODO

### SVG Symbol

TODO

### Icon Font

TODO

#### ttf 格式

#### woff 格式

#### CSS 规则

#### 检索文档

### Android Vector Drawable

TODO

