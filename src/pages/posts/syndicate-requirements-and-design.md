---
canonical_url: null
date: 2020-02-22T15:01+00:00
dev_silo_id: 266409
published: true
series: The making of 'syndicate'
tags:
- showdev
- python
- thinkdeep
- development
title: 'syndicate: Prototype, Requirements and Design'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it._

_This is how I got started._

---

After my [initial research and setup](https://dev.to/daniel13rady/syndicate-initial-research-and-setup-1cmh), I was eager to start spec'ing out the _actual_ thing I intended to build. I began by converting my implementation of the "Hello, world!" [Docker action tutorial](https://help.github.com/en/actions/building-actions/creating-a-docker-container-action) into a Python project that would run in a Docker container.

The first challenge I overcame was finding a Docker image that would actually run Python. As it turns out, the `alpine` image used in the tutorial does not come with Python installed, so I needed to either install it myself or look for a different container that came with it. I opted for the second approach first, and a simple search of "python Docker image" led me to...the [`python` Docker image](https://hub.docker.com/_/python).

At first, I simply swapped out my `alpine` image for the `python:3` image, but that significantly increased the action build time (by 2 or 3x :grimacing:) so I was immediately skeptical of using it. Luckily, I decided to read beyond the "How to use this image" section of the documentation, and discovered there were a couple of 'light-weight' versions. Since I didn't yet have any project dependencies, I decided to try using `python:3-alpine` because of its boasted performance characterisics, and then forget about it until it no longer worked. It did the thing, and my base build time was only about 6 seconds.

Now that I had a Github Action building a container that could run Python, I needed to figure out how to use the [DEV.to API](https://docs.dev.to/api) I had discovered earlier. But more importantly, I needed to figure out how to do it **in Python**, ideally using some sort of standard or canonical library.

The [`requests`](https://requests.readthedocs.io/) package was the answer, quickly found, and its documentation was to become the third and final sacred text in my project's development.

I started to familiarize myself with `requests` and the DEV.to API by transforming my existing action code into a simple prototype. Given my inexperience in basically everything about this project, I decided to start out building something that would react to pushing a commit to my Github repository by fetching my posts from DEV.to and logging out their titles. Reading from DEV was the simplest interaction with the API that seemed like it would also make for a good exercise.

Once I got that working, I thought about whether I would actually need that functionality in `syndicate`. It wasn't clear at that point, because I hadn't actually done any design work for the project yet.

I decided to spend time maturing this first bit of logic into an example for myself to follow later on, with respect to using the DEV API and `requests` package properly. I would include things like request authentication, input validation, error and failed request handling, testing, and logging.

This decision proved quite valuable. It gave me a small but wholistic exercise in which I figured out how my overall application logic might flow, and learned things like how to print to the Github Workflow log; how to read information from the Github Workflow environment; and how to use Pytest to write specifications for my code.

By the end of that exercise, I had:

- [a Github Workflow definition](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/.github/workflows/main.yml) that used my action and provided it with a list of platforms to publsh to, along with the API keys required for using their APIs
- [an entrypoint for the Docker container](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/entrypoint.py) that invoked my 'main' Python application with any arguments specified by the Github Workflow
- a small but functional Python module called 'syndicate' which defined [a single function, `elsewhere`](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/syndicate/__init__.py#L8-L27), responsible for basic input validation, delegation to the appropriate syndication code, and final reporting
- [a function that fetched and returned my published posts](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/syndicate/silos/dev.py#L14-L42) from DEV.to using the API key provided by the Github Workflow
- the beginnings of [a utility library](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/syndicate/utils.py), with functions that handled printing to the Github Workflow log at various log levels
- [a small test suite](https://github.com/dabrady/syndicate/blob/30fbc16d30212cf3f94c9644370e724d1050077c/tests/test_dev.py) for my DEV 'fetch' logic
- a fully polished and tested example of how to interact with the DEV.to API via the `requests` package

And let's not overlook the experience gained using Python itself!

I was happy with my prototype, and I had learned many useful things. At this point, I paused development to take stock of where I was and where I needed to go.

I spent an evening working on a set of initial requirements and high-level technical design for the actual thing I wanted to build, and this is what I came up with:

**Initial Requirements**
- My MVP (and possibly first release) would only support DEV.to
- It needed to be easy to add support for publishing to new platforms
- Given a Markdown file, it needed to be able to create a draft on DEV.to with its contents
- Given a (presumably changed) Markdown file previously syndicated to DEV.to, it needed to be able to replace the syndicated copy with the new version
- Given a commit that triggered a workflow using the `syndicate` action, it needed to be able to identify and extract the contents of the added/modified files to syndicate from that commit
- It needed to be able to identify files that had been syndicated to a given silo previously, in order to decide whether to create a draft or push an update

**High-level Tech Design**
- `syndicate` would be designed as a Github Action, to be incorporated into a Github Workflow for managing content syndication
- Inputs:
  - a list of 'silo' platforms to syndicate to
  - any secrets required to use the APIs associated with the given silos
- Outputs:
  - a summary of the files added/modified on each silo platform
- Mechanisms for interacting with a particular silo should be encapsulated in their own 'adapter' files with a single point of entry; the `syndicate.elsewhere` function would be responsible for engaging the appropriate adapters and aggregating the output
- Syndicated files would be 'tagged' with unique identifiers provided (presumably) by the silos themselves in the 'draft' API response; this tagging would allow the action to recognize files in the repo that already exist on a given silo

Seeing it laid out on paper (yes, that still exists) was getting me excited! I gutted the prototype I had created, keeping only the main structure and wiring along with some of the more useful code snippets as comments, and set to work.
