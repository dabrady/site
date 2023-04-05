#!/bin/bash

cat << EOF > src/content/blog/___.md
---
date: "$(gdate -Iminutes)"
published: false
tags:
title: "[wip] ___"
---
# What a wonderful title
There could be anything in here. Even a boat!

{/* / */}

I am an amazing excerpt of this post.

You ought to hear me roar.

{/* / */}

EOF
