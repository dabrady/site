---
canonical_url: null
date: 2020-02-23T19:44+00:00
dev_silo_id: 267097
published: true
series: The making of 'syndicate'
tags:
- showdev
- python
- development
title: 'syndicate: Harvesting Commits and Drafting to DEV'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it._

_This is how I did it._

---

With the [skeleton of a project](https://github.com/dabrady/syndicate/tree/30fbc16d30212cf3f94c9644370e724d1050077c) in place and [a clear direction](https://dev.to/daniel13rady/syndicate-prototype-requirements-and-design-455k) to go in, I was ready to get started in earnest.

I decided to get [the DEV.to API](https://docs.dev.to/api) interactions working first, and then I would need to figure out how to harvest a `git` commit for the actual input to DEV.

Creating basic wrappers for the ["create"](https://github.com/dabrady/syndicate/blob/69b30c13bd02eb3223e27dc05693f1c32ce5ef47/syndicate/silos/dev.py#L33-L68) and ["update"](https://github.com/dabrady/syndicate/blob/69b30c13bd02eb3223e27dc05693f1c32ce5ef47/syndicate/silos/dev.py#L70-L93) end points of the DEV.to API went fairly smoothly and quickly: I'd already front-loaded the learning curve earlier with my ["fetch"](https://github.com/dabrady/syndicate/commit/30fbc16d30212cf3f94c9644370e724d1050077c#diff-cb2f5f82bf237a14ae65cba33e47ccf7) implementation.

Now came the bits which would prove to give me the most challenge in this project: doing things with `git`. This is where the [Github Workflow](https://help.github.com/en/actions/configuring-and-managing-workflows) and [Action documentation](https://help.github.com/en/actions/building-actions) became truly valuable: it showed me that I had access to many `git`-related things concerning the commit that triggered the workflow, exposed to my action in the form of [environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables).

For my purposes, the most valuable of these would turn out to be:

- the `GITHUB_TOKEN` (used for [authenticating requests](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) to the Github API)
- the `GITHUB_SHA` (the commit SHA that triggered the workflow)
- the `GITHUB_REPOSITORY` (the full name of the repo containing the workflow)

It quickly became apparent that the actual contents of the commit which triggered the workflow were not available to me out of the box; I would need to get them myself, somehow. I had started this project expecting the only external APIs I'd be interacting with would be the ones for the silo platfroms I included support for; but this new development meant I needed to learn about [the Github API](https://developer.github.com/v3/), as well.

If I had opted to use the Github API directly through the `requests` package, like I was doing with the DEV.to API, I would have had a very different experience (though not necessarily a better or worse one). But I did not do that.

Instead, I went looking for a Github-specific Python library to use. I don't remember why I chose this path, but it might have simply been because I knew so many Github extensions and integrations existed that there were bound to be some who had wrapped the Github API into an easier-to-consume Python library.

And indeed there were several options to choose from. The first option advertised by the internet via Google was `PyGithub`. But [the documentation felt terrible](https://pygithub.readthedocs.io/): a full half of the README was simply bragging about who was using the library and linking to people on the internet recommending it. For that reason alone, I almost immediately went searching for some other option.

The package I decided to use was called `github3.py`. By comparison, [the documentation felt wonderful](https://github3py.readthedocs.io), like the package authors actually cared about helping people understand the software, and not just each bit of code in isolation. (NOTE TO SELF: don't be a hypocrite, create a great ReadTheDocs site for `syndicate`).

But there was a problem: adding `github3.py` to my project dependencies broke everything.

The root cause, again, was that my Docker image did not create the environment necessary to support the code I was trying to run. I quickly discovered that switching from using `python:3-alpine` back to `python:3` resolved the build issues, though it also brought back the "this thing takes too damn long to build" problem. But I was impatient, so I decided to put up with the longer build times to unblock what felt like the "real project development" and deferred solving this performance problem until the end of the project.

> :snail::cherry_blossom: **Note From Future Me**
> <small>I would eventually switch from using `github3.py` to using `PyGithub` (which did not introduce the same build issues), and if I had just tried it out at this point instead of being so impatient to continue feature development, I could have saved myself a lot of time and self-induced frustration felt while waiting for my code to compile.</small>

With the build back to a stable state, I finally began to tackle the challenge of figuring out how to transform a `git` commit into a draft on DEV.to.

The `github3.py` API documentation is great, and I quickly figured out how to extract the contents of the added/changed files in the commit that had triggered the action. I realized, however, that I couldn't assume all the changed files in the commit were posts that needed syndication; I needed a way to identify the files the commiter _intended_ to syndicate.

A quick and easy solution was to introduce a configuration variable for my Github action specifying a path prefix that could be used to distinguish 'posts' from other files in their repository. This has downsides: it assumes the author keeps all their posts in a particular location, and it assumes that all files in that particular location are posts.

That said, it would suffice until it actually caused someone problems, so I went with that approach. I opted to make it an environment variable instead of an explicit input to the action because of how Github Workflows work: this value is static information about the repository, and my action might get used in multiple steps within the same workflow; using an environment variable allows it to be specified at a higher level than the individual action config if you want, which let's you share the value across a larger part of your workflow and avoid duplication.

Now that I could accurately [identify "posts" in a given commit](https://github.com/dabrady/syndicate/blob/69b30c13bd02eb3223e27dc05693f1c32ce5ef47/syndicate/utils.py#L114-L128), I needed to be able to parse out the details necessary for the API call that would be made.

To create a post, the only actual [data required by the DEV.to API](https://docs.dev.to/api/index.html#operation/createArticle) is a title. Simple. Now that I could access everything about the files being syndicated, I could just grab their titles and contents, plug them into the API request, and win at life.

But...wait. Where is the title of a post? :thinking:

An obvious, but probably poor, answer is "in the file name." I could already tell that going down that route would lead to pain and suffering, so I decided to make another assumption: my action would expect all posts to be written in Markdown, and contain a YAML frontmatter with at least a `title` attribute.

Given my initial target audience are those who write for DEV.to, and that is how posts are formatted there, it isn't as random of a choice as it might first appear. But still, I did not do any research on the prevalence of this format adoption, and that may come back to bite me in the future.

But for the first iteration, it would do just fine. I now needed a way to parse YAML out of a string; I knew YAML is pretty widely used in software configuration, and Python is known for its usage in data processing, so I expected there to be a good library for working with it.

And indeed there was. [`PyYAML`](https://pypi.org/project/PyYAML/) seemed canonical, from what I could tell, but it also seemed like overkill for my needs; plus, [the documentation was ugly and hard to use](https://pyyaml.org/wiki/PyYAMLDocumentation) (again NOTE TO SELF: ugly docs discourage users). I kept searching, and in one of my queries I included the keyword 'frontmatter' and caught a lucky break: [`python-frontmatter`](https://python-frontmatter.readthedocs.io/) was a small library specifically for manipulating YAML metadata embedded within text documents, and perfect for my needs.

At that point, it only took a bit of tinkering and [suddenly I had something](https://github.com/dabrady/syndicate/commit/49d7a062df17d4f7a93eef02d94a749245147cb4) that would automatically push my newly created content to DEV.to as a draft, when I pushed it to my repo. It was time for my happy dance.

But the game had only just begun: I now needed to determine if I'd previously created a draft for a given post in order to avoid creating duplicates, and set the stage for pushing updates to existing content if possible.
