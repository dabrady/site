---
canonical_url:
date: 2020-02-17T18:26+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Performance Problem -- Build Time Too Slow
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
- Next on my list of deferred problems was the build time.
- Before introducing the `github3.py` library, I was using the `python:3-alpine` Docker image, which is very small and gave base Docker build times of around 6 seconds (before I started adding my project dependencies)
- But `github3.py` relied on some dependencies that are not available on that image: I would need to figure them out and install them manually from my Dockerfile, or else use a different image that included the missing dependencies
- To unblock my development, I had gone with the "just use a fatter image that works" approach, and switched to the defacto `python:3` image; this worked, but cranked up the action build times to _over a minute_, which had made integration testing a pain in my spoiled millenial ass and which I considered unacceptable for launch
- The way I saw it, the `python:3-alpine` image was ideal, so if I wanted to be able to use it there were three main avenues of approach to investigate: 1) identifying and installing the missing dependencies of `github3.py`, 2) finding an alternate Python library for interacting with Github which would run on `python:3-alpine` without complicating my Dockerfile, and 3) avoiding a Github library entirely and using the API directly via the `requests` library I already depended on
- I decided to just go down the line, and started with attempting to install the missing dependencies myself; as it turns out, most of the dependencies that were missing fit a pattern that was common enough to have internet discussions dedicated to resolving them, and I was able to extend their resolution to install the remaining libraries
- The result was a build time reduced down to a balmy 45 seconds; I was not amused.
- Next! I decided to revisit the `PyGithub` library, which I had originally dismissed because of the look of its documentation
- As it turns out, the APIs were quite similar, even though their documentation were laid out quite differently: similar enough that I could migrate to it by simply changing the method names in most cases
- But would it run on the Alpine image? I gave it a try: I swapped the Docker image, removed `github3.py` from my package dependencies and replacing it with `PyGithub`, and then added a simple library call at the root of the program along with an early exit (to avoid hitting the code that still used `github3.py`) and pushed a dummy commit to trigger the action
- It worked! and it built in only 15 seconds!
- I was pleased enough with 15 seconds that I didn't bother investigating the "roll your own" approach of just making raw API requests, and proceeded to replace my `github3.py` integration with `PyGithub`
- As an added bonus, I discovered that even though `PyGithub` also did not support a simple way of bundling changes to multiple files in a single commit, it _did_ support editing the HEAD of a remote reference (the thing `github3.py` did not), and I was able to simplify my "mark as syndicated" logic a bit in the process
- That was the end of the performance issues I'd identified and deferred during development
