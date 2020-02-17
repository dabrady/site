---
canonical_url:
date: 2020-02-17T18:25+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Performance Problem -- Too Many Commits
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
- The first one I decided to tackle was the "this action generates too many commits" issue
- I decided to ensure each use of the action generated at most one commit, by deferring the 'mark as syndicated' logic to the end of the overall action and applying it across the entire set of posts and silos as needed
- There were two main challenges to this: the first was properly collating the results of syndicating to all specified silos so I could determine which posts needed tagging for which silos; the second was the batch commit itself
- It was simple enough to build up a dictionary containing the results of each silo syndication, but it took me awhile to figure out what format I needed those 'results' to be in: I needed to balance what would make sense as an overall action output 'report' with the information I needed to do the tagging logic
- After much trial and error, I arrived at a format that made sense as an action output but could be used by my tagging logic with minimal massaging, and moved on to the challenge of bundling the changes into a single commit
- As it would turn out, I ended up continuing to massage the action output format while I worked on this new problem; I hadn't had a firm grasp of the data I would actually need, so in retrospect it would have been better to solve the batch commit problem first
- Given how easy it had been to accomplish my previous `git` tasks with the `github3.py` library I was using, I had expected the task of pushing a commit containing changes to multiple files would be similarly easy, but I was wrong
- There was no simple method for doing what I needed; I even looked briefly at other libraries like `PyGithub` but none I looked at seemed capable of doing this
- Not only was it not simple to do it, but there was no documented example of how to do it at all!
- Eventually, I found the magical incantation out of sheer luck, on the documentation of the Github Data API itself
- I am not deeply familiar with `git` object terminology, so it took me a while to understand what arcane magic was being described; but eventually I was able to figure out which parts of the `github3.py` library I needed to be using, how to work with the various library objects they needed as input and produced as output, and how to piece them together to do the thing
- ...Except the `github3.py` library does not provide a way to perform the final step of the magic: updating the HEAD reference of a branch to point at a new SHA
- I spent at least an hour poring over the documentation, looking but not finding, trying out things that I thought might work but didn't
- I even dug through the library source code, looking to see if existing functions would do what I needed and were simply poorly documented! But there was simply not support for making a `PATCH` request to the Github `refs` API end point
- Once I calmed down from my initial frustration, I realized I didn't actually need to use the `github3.py` library; it existed purely as a semantic convenience wrapper for the Github v3 API, which I was perfectly capable of calling myself
- So that's what I did: using my newfound knowledge of the `requests` library and the Github Data API documentation, I crafted the final request that would complete the larger incantation I had been cooking up; it took me all of 5 minutes to do it
- I learned a valuable lesson from that experience: libraries can be nice, wonderful, even; but they can easily become a crutch for us as developers, and sometimes that can hinder more than help us by blinding us to simple solutions
- I was finally ready to integration test this new feature: I created a few dummy posts and verified that they were properly syndicated to DEV.to, and that they all tagged in a single commit back upstream to my repo; I then pushed some modifications to those posts and confirmed their DEV.to dopplegangers were updated appropriately but that no commits to my repo were generated. Success!
