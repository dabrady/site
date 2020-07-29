---
date: 2020-02-13T11:26+00:00
dev_silo_id: 260898
published: true
tags:
- meta
- productivity
- blog
- showdev
title: 'syndicate: a POSSE way to DEV'
---

Until a month ago I had never written a blog post.
<!-- / -->

My recent discovery of DEV has a lot to do with why I started, and indeed, I created [my first post](https://dev.to/daniel13rady/declaring-variables-in-javascript-31ch) right here on DEV.

While educating myself on the art of writing for other people, I came across the term "POSSE", which I had never heard of before but [is apparently kind of a big deal](https://indieweb.org/POSSE). It is a principle that is embraced by DEV itself, according to Ben.

{% devcomment d8pj %}

The idea intrigued me, as do most things that involve "write once and reuse" concepts. I began to imagine how such a thing might be accomplished, and just like P.O.S.S.E. itself, the recipe for its implementation seemed simple on the surface:

1. Create a "source of truth" for your writing.
2. Know where you want to distribute, and how to do it.
3. When your truths change, ensure a process is triggered to ferry your changes to the right places.

I don't know about you, but that sequence of steps strongly reminds me of the basic recipe for deploying software. And so I immediately re-imagined it as such:

1. Create a `git` repo for my writing.
2. Decide on the platforms I want to distribute to, and write scripts to do so via public APIs.
3. Setup `git` hooks to run those scripts when changes are made.

Long story short (the "long story long" will come as a separate post), I took a week of evenings and a weekend, and made this:

{% github dabrady/syndicate %}

As the README describes, it will let you write your content on Github, and distribute it automatically to DEV.to, keeping subsequent changes in the content on Github synced to DEV.

It is designed to be used as [an action in a Github Workflow](https://github.com/features/actions), but technically it is just a simple Python program that can be run with Docker if you want (I include a Dockerfile). To use it as intended, all you need to have is a Github repository, and all you need to do is create a Github workflow in that repository which uses `dabrady/syndicate` in one of its steps.

For now, it only recognizes one silo platform, DEV.to, because that's the only platform I currently publish on. But I made it simple to add plugins/adapters for other silo platforms, so if you'd like to contribute, that's a great way to do so!

Like my first blog post, this is my first project written with the intent to share with other people. It's also my first time using Python in almost a decade, so I used _[The Hitchhiker's Guide to Python](https://docs.python-guide.org/)_ as my main resource for project management and layout. Any and all feedback is greatly appreciated! :pray: I hope it benefits us.
