---
draft: true
title:  Gulp设计师入门
excerpt: 写给死美工的Gulp入门
category: gulp
tags: gulp task automate
---

草稿


{% for res in site.data.gulp %}
##### {{ res[1]["fullname"] }}
{% for item in res[1].items %}
<code><a href="{{ item["url"] }}">{{ item["title"] }}</a></code> - {{ item["desc"] }}
{% endfor %}
{% endfor %}





