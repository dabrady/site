---
title: "[wip] My gardening tools"
date: "2020-01-02T11:18+00:00"
---
Why do gardeners gard their gardens? What do we use to plant our plants? :thinking:
<!-- / -->
I don't like doing things without intent. Without care. Without knowing why. It is in my pattern to think before I care before I write before I act.

And so it is important to me, as I begin this project, to understand the whys and wherefores that will guide its development. By sharing them with you, I hope to clarify what they are for myself.

## What problems am I solving?
## What value am I providing?
## What tools will I use?
DISCLAIMER Here be technicals: things are gonna get nerdy.
## Why do I care?

---- MY COMMENT FROM DEV.TO (slightly adjusted): https://dev.to/dabrady/comment/j3oi
I don't have much experience with web development or web technologies, and decided to build a personal website to help me get familiar with some.

There were a few things I considered when choosing how to pursue this, and thus how to limit decisions.

## Off-the-shelf, or hand-rolled?
Since the main goal of this garden is to help me in my technical growth, I wanted to roll my own site instead of using a site building service like [WIX](https://wix.com) or [Squarespace](https://squarespace.com).

But I've been developing software professionally for 5 years now (and unprofessionally for a few more than that) and I've grown to appreciate the idea of "don't reinvent the wheel unless you need to" and of "separating your concerns", so I wanted my tech stack to include cutting-edge web development technologies and allow me to separate my content from my structure from my design from my behavior.

In short, I wanted to develop my site like I would any other bit of software, and so I went looking for a nice blend of power, speed, size, and flexibility.

I quickly decided that using a static site generator was something I wanted: it offered the ability to develop my site like an application, but serve it without all the baggage. I narrowed my decision down to four:

- Jekyll
- Hakyll
- Gatsby
- Hugo

In the end, all seemed great for my use case; I chose Gatsby because it didn't require knowledge of anything beyond JavaScript, HTML, and CSS: the fundamental languages of the web.

Learning to speak those was my overall goal, and I was worried that if I chose Jekyll or Hakyll I'd get lost in the weeds of learning Ruby and Haskell (feats I'm trying to consider "out of scope" for this project).

In the end, I eliminated Hugo because as a product, it felt like it was trying to be too much. I value essentialism: Gatsby had a kernel and allowed extension via plugins, like my favorite text editors; while Hugo seemed to have a lot of useful features that I would never use baked in, which meant sooner or later I'd trip over them.

I haven't made much progress on my site itself, but I've learned a ton about how a website can work already. Gatsby has been a joy to work with so far.
