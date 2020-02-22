---
canonical_url: null
date: 2020-02-22T14:52+00:00
dev_silo_id: 264244
published: true
series: The making of 'syndicate'
tags:
- showdev
- blog
- thinkdeep
- motivation
title: "syndicate: Why I Made It"
---

I made this for people who write words they share with others:

{% github dabrady/syndicate no-readme %}

It distributes copies of the content you create to various publishing sites automatically.

It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it.

This is the first in a series of writeups on why I did it, how I did it, and what comes next.

---

Why's are important to me. I don't like doing things with my time without a reason, even if that reason is as vague as "huh, sounds like fun." Why's help me figure out if I care enough to continue, by situating my actions into some wider context. I've learned that most of the time, when I find my interest in something is waning, it's because I've either lost site of my why or because my why is no longer good enough to keep me coming back.

In the case of [`syndicate`](https://github.com/dabrady/syndicate), my why started from one of those complex moments of understanding that often follow deep dives into rabbit holes, where a lot of things you've been processing in the background of your mind come suddenly to the front.

On this particular occasion, I was researching the subject of blogging. I had only recently written [my first blog post](https://dev.to/daniel13rady/declaring-variables-in-javascript-31ch), and so I had a lot to learn. I read about many things: [the origins of blogging](http://www.rebeccablood.net/essays/weblog_history.html) in the "weblogs" of the late 1990s; [various techniques](https://dev.to/amrutaranade/how-to-write-a-blog-post-the-four-drafts-method-1k7b) I could use to help me during the writing process; the communities fostered by different blogging platforms. It was this last one that eventually lead me to [the IndieWeb](https://indieweb.org/POSSE) and the concept of _POSSE_.

> **_POSSE_** is an abbreviation for **Publish (on your) Own Site, Syndicate Elsewhere**, a content publishing model that starts with posting content on your own domain first, then syndicating out copies to 3rd party services with permashortlinks back to the original on your site.

This makes a lot of intuitive sense to me, since it is basically the same process used in the creation of more traditional forms of media like books and magazines: the author distributes copies of their work to the publishing companies they want to work with.

But more importantly, it reminded me that I'm not in control of the internet, and if I use the internet to create content, instead of creating content for the internet, I might not be in control of that, either. I don't care so much about _possessing_ what I create, so much as I care about having some measure of control of and responsibility for it.

I decided I would adopt POSSE, and started thinking about how I would do it.

I felt this approach to content creation could be boiled down to a few simple steps:

1. Create a "source of truth" for your writing.
2. Know where you want to distribute, and how to do it.
3. When your truths change, ensure they are ferried to the right places.

It didn't take much imagination to see the parallels with software deployment. I could easily picture how it would work:

1. Create a `git` repo for my writing.
2. Decide on the platforms I want to distribute to, and write scripts to do so via public APIs.
3. Use `git` hooks or some other mechanism to run those scripts when changes are made.

I was immediately taken with this idea. Automating my jobs away is a minor passion of mine, and when I'm the only stakeholder, I like to indulge in a little premature automation just for the fun of it. I mean, who doesn't like [makin' magic](https://sims.fandom.com/wiki/The_Sims:_Makin%27_Magic)?

And it looked like a fun challenge! There was a clear objective and definition of success, and it seemed like something that other people besides myself would find useful.

So I made a Trello board, created a repository on Github, and started Googling.
