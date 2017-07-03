---
title: Sketch + Git — 开放格式
excerpt: 在 Git 中使用 Sketch 开放格式。
updated: 
tags: Sketch Git
---

```shell
#!/usr/bin/env bash
sketchtool=/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool
for f in "$@"
do
    # Sketch file
    if [ -f "${f}" -a ${f##*.} = "sketch" ]
    then
        folder="${f%.sketch}"
        # unzip Sketch files
        unzip -q -o "${f}" -d "${folder}"
        # export artboards
        ${sketchtool} export artboards "${f}" --use-id-for-name="YES" --overwriting="YES" --include-symbols="YES" --output="${folder}/artboards"
        # format JSON files
        cd "${folder}"
        jsons=$(find . -name "*.json")
        for json in ${jsons}
        do
            python -m json.tool ${json} > temp && mv temp ${json} 
        done
    fi

    # Sketch folder
    if [ -d "${f}" -a -d "${f}/pages" -a -f "${f}/user.json" -a -f "${f}/meta.json" -a -f "${f}/document.json" ]
    then
        # remove artborads folder
        if [ -d "${f}/artboards" ]
        then
            rm -rf "${f}/artboards"
        fi
        # zip
        cd "${f}"
        zip -q -r "../${f##*/}.sketch" * -x .DS_Store
    fi
done
```

