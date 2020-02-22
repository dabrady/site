---
canonical_url: null
date: 2020-02-22T14:56+00:00
dev_silo_id: 266356
published: true
series: The making of 'syndicate'
tags:
- showdev
- python
- development
title: 'syndicate: Initial Research and Setup'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it._

_This is how I got started._

---

In essence, the thing I wanted to build would take changes I made to files in a `git` repo, and push them someplace else. Classic Patrick Star.

![Why don't we just take it and push it somewhere else?](https://media.giphy.com/media/JsKWewNnL1A7oS3ijf/giphy.gif)

One of my first questions was, "Can I communicate with DEV.to programmatically?" DEV.to is currently the only place I publish writing, so if the only answer involved pretending to be a human and programmatically engaging with the UI to manipulate blog posts, I was likely to abandon the idea (though I probably would have tried it just for fun).

Thankfully, my project was saved by a quick Google search: DEV has a [beta API](https://docs.dev.to/api) that exposes end points I could leverage.

My next question was one of automation: how to trigger a DEV.to API call in response to changes in my `git` repository? My immediate reaction was "`git` hooks."

I've played with `git` hooks in the past for doing things like automatically [injecting a JIRA ticket](https://gist.github.com/dabrady/29b33ef867ca6f0c5d9a60ae5b36f7fc) number into my commit messages when pushing; and automatically [running database migrations locally after pulling](https://gist.github.com/dabrady/4b9e57fb2529ca256dfb506dbb5103b1) if the schema changed or migration files were added. They seemed like the perfect mechanism to use for this project.

Recently, though, I noticed something called [Actions](https://github.com/features/actions) show up on my Github repositories. I didn't really know what they were, but on the surface it seemed like a Github service implemented on top of `git` hooks.

I hadn't really imagined that the tool I would build might have any actual interface besides an automatic trigger. Thinking about Github Actions made me realize it would be nice to have my tool respond to changes on a _remote_ repository (i.e. on a `push` command) and run on someone else's computer, rather than operating on a user's local machine; it would minimize "works on my machine ¯\\\_(ツ)\_/¯" headaches when installing and using the tool itself. And it would be awesome to have some sort of interface for monitoring progress and output, and maybe even a logging mechanism.

Github is my private choice of remote source control platform, so I looked into Actions and how to create them. I was pleasantly surprised at the extent of [Github's documentation](https://help.github.com/en/actions) on the subject, and it would become the first of a few sacred texts I relied on throughout my project.

The docs had two tutorials: one using JavaScript and one using Docker. I chose to follow the Docker tutorial because I'm not familiar with container technology and it could potentially benefit me in my upcoming transition to a DevOps role at Tapjoy.

I dedicated a few evenings to the "Hello, world!" tutorial, trying to massage the steps into something close to what I imagined I'd need for my real project. I took my time, and gave particular focus to the parts concerning Docker: I wasn't sure this would be a proper fit for my project, so I wanted to be sure before I dismissed it as an option.

I'm glad I went slowly at the beginning. By the time I had completed the tutorial to my satisfaction, I had learned two important things: a Github Action would be a good way to manifest this tool, and I didn't want to build it out of shell scripts.

I can count on one hand the number of devs I know who can effectively read shell scripting languages, let alone effectively write them; I myself only have a passing proficiency at shell scripting, and I wanted this project to be easy for others to grow to suit their needs.

Python was a choice I was primed to make: it's a language I had virtually zero experience developing with; it's easy to pick up and is widely used; it's been on my list of tools to familiarize myself with for awhile; and I have a friend who is enamored by it and is always touting its benefits in web programming.

I'd used Python before, nigh on a decade ago. But if I wanted to start this project off in a good direction, I needed to brush up on contemporary best practices. My primary concerns, at least in the beginning, were project structure and development tools. How do I lay out this project, and what will help me build it?

The internet doth provide: [_The Hitchhiker's Guide to Python_](https://docs.python-guide.org) was often referenced, so I concluded it must espouse a highly regarded opinion and decided to adopt it as another of my sacred texts. Indeed, it proved very useful as a quickish reference for many things: project structure, package management, testing tools, documentation practices....

Armed with an initial (and empty) project layout and a basic Github Workflow that would execute my "Hello, world!" Action any time I pushed to Github, I could finally get started on the logic that would become [`syndicate`](https://github.com/dabrady/syndicate).
