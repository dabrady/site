#!/bin/bash

cat << EOF > src/content/blog/wip.mdx
---
date: "$(gdate -Iminutes)"
published: true
tags:
title: "[wip] ___"
description:
---
# What a wonderful title
There could be anything in here. Even a boat!

EOF
