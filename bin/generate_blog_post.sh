#!/bin/bash

cat << EOF > src/pages/posts/___.md
---
canonical_url:
date: "$(gdate -Iminutes)"
published: false
tags:
title: "[wip] ___"
---

<!-- / -->

EOF
