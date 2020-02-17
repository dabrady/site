---
canonical_url:
date: 2020-02-17T18:25+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Harvesting Commits and Drafting to DEV.to
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
- I decided to get the DEV API interactions working in isolation first, and figure out how to interact with the `git` commit later; this part went fairly smoothly and quickly, as I'd already invested effort into the time-consuming bits earlier with my 'fetch' implementation, which I also realized I wouldn't need and subsequently deleted
- Now came the bits which would prove to give me the most challenge in this project: doing things with `git`
- This is where my third sacred text of this project, the Github Workflow and Action documentation, became truly valuable: it showed me that I had access to many `git`-related things concerning the commit that triggered the workflow, the most valuable of which, for my purposes, were the `GITHUB_TOKEN`, `GITHUB_SHA`, and `GITHUB_REPOSITORY` environment variables
- I also went looking for a Python Github SDK; at first I found `PyGithub`, but the documentation felt terrible to me so I went looking again and settled on the `github3.py` library; this would turn out to cause a big headache when building my Docker container because of some package dependencies; forced me to switch to a different Docker image which tripled my build times; I deferred solving the performance problem until the end, when I switched to `PyGithub`
- The `github3.py` documentation is great, and I quickly figured out how to extract the contents of the added/changed files in the commit that had triggered my action
- I realized though that I couldn't assume that _all_ the changed files in the commit were posts that needed syndication, so I needed a way to identify the files the committer _intended_ to syndicate; I resolved this simply by adding a new input to my action: a parent directory, relative to the repository root, where the author keeps their posts; I opted to make it an environment variable purely because of how Github Workflows work: it's static info about the repo, and this action might be used mulitple times in a workflow, so using an env var allows it to be defined at a higher level than individual action config if you want
- This has downsides: it assumes the author keeps all their posts under a specific directory, and it assumes that all files that could change within that directory or its children are posts; but it works for now
- Once I could accurately identify "posts" in a given commit, I needed to be able to parse out the details necessary for the API call that would be made
- At this point, I decided to make another assumption: that all posts would have a YAML frontmatter; and rather than try to do something fancy with the filename, I would assume that the YAML frontmatter contains a 'title' attribute (and fail if it doesn't)
- Again, downsides: I have no idea how common YAML frontmatter usage is, but it's the format used by DEV.to and that influenced the standards by which I developed this project
- So now I needed a way to parse YAML out of a string; I knew YAML is pretty well-used, so I expected there to be a good library for working with it; and indeed, I found several; `PyYAML` seemed canonical, but also overkill for my needs and the documentation was ugly; in one of my search queries I included the keyword 'frontmatter' and came across `python-frontmatter`, which was small and great for simple reads and writes of the frontmatter
- At that point, it only took a bit of tinkering and suddenly I had something that would automatically push my newly created content to DEV.to as a draft when I pushed it to my repo.
- But the battle had only just begun: I now needed to be able to know if I'd previously created a draft for a given post, so I could avoid creating duplicates and set the scene for pushing updates to existing content, if possible
