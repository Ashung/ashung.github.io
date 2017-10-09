---
title: Sketch 开放格式
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
        ${sketchtool} export artboards "${f}" \
            --use-id-for-name="YES" \
            --overwriting="YES" \
            --include-symbols="YES" \
            --output="${folder}/artboards"
        # format JSON files
        cd "${folder}"
        jsons=($(find . -name "*.json"))
        for ((i=0; i<${#jsons[@]}; i++))
        do
            python -m json.tool ${jsons[$i]}  > temp && mv temp ${jsons[$i]} 
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
        zip -q -r "../${f##*/}.sketch" *
    fi
done
```


git hook `pre-commit`

```shell

```
