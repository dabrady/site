---
canonical_url: null
date: 2020-02-22T15:11+00:00
dev_silo_id: 267097
published: false
series: The making of 'syndicate'
tags: null
title: 'syndicate: Harvesting Commits and Drafting to DEV'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it._

_This is how I did it._

---

With the skeleton of a project in place and [a clear direction](https://dev.to/daniel13rady/syndicate-prototype-requirements-and-design-455k) to go in, I was ready to get started in earnest.

I decided to get [the DEV.to API](https://docs.dev.to/api) interactions working first, and then I would need to figure out how to harvest a `git` commit for the actual input to DEV.

Creating basic wrappers for the ["create"](https://github.com/dabrady/syndicate/blob/69b30c13bd02eb3223e27dc05693f1c32ce5ef47/syndicate/silos/dev.py#L33-L68) and ["update"](https://github.com/dabrady/syndicate/blob/69b30c13bd02eb3223e27dc05693f1c32ce5ef47/syndicate/silos/dev.py#L70-L93) end points of the DEV.to API went fairly smoothly and quickly: I'd already front-loaded the learning curve earlier with my ["fetch"](https://github.com/dabrady/syndicate/commit/30fbc16d30212cf3f94c9644370e724d1050077c#diff-cb2f5f82bf237a14ae65cba33e47ccf7) implementation.

Now came the bits which would prove to give me the most challenge in this project: doing things with `git`. This is where the [Github Workflow](https://help.github.com/en/actions/configuring-and-managing-workflows) and [Action documentation](https://help.github.com/en/actions/building-actions) became truly valuable: it showed me that I had access to many `git`-related things concerning the commit that triggered the workflow, exposed to my action in the form of [environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables).

For my purposes, the most valuable of these would turn out to be:

- the `GITHUB_TOKEN` (used for [authenticating requests](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) to the Github API)
- the `GITHUB_SHA` (the commit SHA that triggered the workflow)
- the `GITHUB_REPOSITORY` (the full name of the repo containing the workflow)

It quickly became apparent that the actual contents of the commit which triggered the workflow were not available to me out of the box; I would need to get them myself, somehow. I had started this project expecting the only external APIs I'd be interacting with would be the ones for the silo platfroms I included support for; but this new development meant I needed to learn about the Github API, as well.

If I had opted to use the Github API directly through the `requests` package, like I was doing with the DEV.to API, I would have had a very different experience. But I did not do that. Instead, I went looking for a Github-specific Python library to use. I don't remember why I chose this path, but it might have simply been because I knew so many Github extensions and integrations existed that there were bound to be some who had wrapped the Github API into an easier-to-consume Python library.

And indeed there were several options to choose from. The first option advertised by the internet via Google was `PyGithub`. But [the documentation felt terrible](https://pygithub.readthedocs.io/): a full half of the README was simply bragging about who was using the library and linking to people on the internet recommending it. For that reason alone, I almost immediately went searching for some other option.

The package I decided to use was called [`github3.py`](https://github3py.readthedocs.io). By comparison, the documentation felt wonderful, like the package authors actually cared about helping people understand the software, and not just each bit of code in isolation. (NOTE TO SELF: don't be a hypocrite, create a great ReadTheDocs site for `syndicate`).

But there was a problem: adding `github3.py` to my project dependencies broke everything.

The problem, again, was that my Docker image did not create the environment necessary to support the code I was trying to run. I quickly discovered that switching from using `python:3-alpine` back to `python:3` resolved the build issues, though it also brought back the "this thing takes too damn long to build" problem. But I was impatient, so I decided to put up with the longer build times to unblock what felt like the "real project development" and deferred solving this performance problem until the end of the project.

> <small>:warning: SPOILER ALERT :warning:</small>
> <small>I would eventually switch from using `github3.py` to using `PyGithub` (which did not introduce the same build issues), and if I had just tried it out at this point instead of being so impatient to continue feature development, I could have saved myself a lot of frustration and headaches.</small>


<!---
- The `github3.py` documentation is great, and I quickly figured out how to extract the contents of the added/changed files in the commit that had triggered my action
- I realized though that I couldn't assume that _all_ the changed files in the commit were posts that needed syndication, so I needed a way to identify the files the committer _intended_ to syndicate; I resolved this simply by adding a new input to my action: a parent directory, relative to the repository root, where the author keeps their posts; I opted to make it an environment variable purely because of how Github Workflows work: it's static info about the repo, and this action might be used mulitple times in a workflow, so using an env var allows it to be defined at a higher level than individual action config if you want
- This has downsides: it assumes the author keeps all their posts under a specific directory, and it assumes that all files that could change within that directory or its children are posts; but it works for now
- Once I could accurately identify "posts" in a given commit, I needed to be able to parse out the details necessary for the API call that would be made
- At this point, I decided to make another assumption: that all posts would have a YAML frontmatter; and rather than try to do something fancy with the filename, I would assume that the YAML frontmatter contains a 'title' attribute (and fail if it doesn't)
- Again, downsides: I have no idea how common YAML frontmatter usage is, but it's the format used by DEV.to and that influenced the standards by which I developed this project
- So now I needed a way to parse YAML out of a string; I knew YAML is pretty well-used, so I expected there to be a good library for working with it; and indeed, I found several; `PyYAML` seemed canonical, but also overkill for my needs and the documentation was ugly; in one of my search queries I included the keyword 'frontmatter' and came across `python-frontmatter`, which was small and great for simple reads and writes of the frontmatter
- At that point, it only took a bit of tinkering and suddenly I had something that would automatically push my newly created content to DEV.to as a draft when I pushed it to my repo.
- But the battle had only just begun: I now needed to be able to know if I'd previously created a draft for a given post, so I could avoid creating duplicates and set the scene for pushing updates to existing content, if possible
-->
