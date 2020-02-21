---
canonical_url: null
date: 2020-02-18T20:57+00:00
dev_silo_id: 266356
published: false
series: The making of 'syndicate'
tags: null
title: 'syndicate: Project Setup, Requirements, and Design'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it.

_This is how I got started._

---

So. In essence, the thing I wanted to build would duplicate changes I made to files in a `git` repo, to corresponding articles on DEV.to, in close-to-real-time.

One of my first questions was, "Can I communicate with DEV.to programmatically?" If the only answer involved pretending to be a human and programmatically engaging with the UI to manipulate blog posts, I was likely to abandon the idea (though I probably would have tried it just for fun).

Thankfully, my project was saved by a quick Google search: DEV has a [beta API](https://docs.dev.to/api) that exposes end points I could leverage.

My next question was one of automation: how to trigger a DEV.to API call in response to changes in my `git` repository? My immediate reaction was "`git` hooks."

I've played with `git` hooks in the past for doing things like automatically injecting a JIRA ticket number into my commit messages when pushing; and automatically running database migrations locally after pulling if the schema changed or migration files were added. They seemed like the perfect mechanism to use for this project.

Recently, though, my company started using something called [Actions](https://github.com/features/actions) on our Github repositories. I didn't really know what they were, but I knew that they were basically a Github service implemented on top of `git` hooks, and one thing an Action could do was sync with Travis to provide info about running builds right inside the Github GUI of a repository or pull request (as opposed to having to click out to the Travis site for such details).

I hadn't really imagined that the tool I would build might have any actual interface besides an automatic trigger. Thinking about Github Actions made me realize it would be nice to have my tool respond to changes on a _remote_ repository (i.e. on a `push` command) and run on someone else's computer, rather than operating on a user's local machine; it would minimize "works on my machine ¯\\_(ツ)_/¯" headaches when installing and using the tool itself. And it would be awesome to have some sort of interface for monitoring progress and output, and maybe even a logging mechanism.

Github is my private choice of remote source control platform, so I looked into Actions. I was pleasantly surprised at the extent of [Github's documentation](https://help.github.com/en/actions) on the subject, and it would become the first of a few sacred texts I relied on throughout my project.

The docs had two tutorials: one using JavaScript and one using Docker. I chose to follow the Docker tutorial because I'm not familiar with container technology and it could potentially benefit me in my upcoming transition to a DevOps role at Tapjoy.

I dedicated a few evenings to the "Hello, world!" tutorial, trying to massage the steps into something close to what I imagined I'd need for my real project. I took my time: I wasn't sure this would be a proper fit for my project, so I wanted to be sure before I dismissed it as an option.

I'm glad I went slowly at the beginning. By the time I had completed the tutorial to my satisfaction, I had learned two important things: a Github Action would be a good way to manifest this tool, and I didn't want to build it out of shell scripts.

I can count on one hand the number of devs I know who can effectively read shell scripting languages, let alone effectively write them (I myself only have a passing proficiency at both) and I wanted this project to be easy for others to grow to suit their needs.

Python was a choice I was primed to make: it's a language I had virtually zero experience developing with; it's easy to pick up and is widely used; it's been on my list of tools to familiarize myself with for awhile; and I have a friend who is enamored by it and is always touting its benefits in web programming.

I'd used Python before, nigh on a decade ago. But if I wanted to start this project off in a good direction, I needed to brush up on contemporary best practices. My primary concerns, at least in the beginning, were project structure and development tools. How do I lay out this project, and what will help me build it?

The internet doth provide: [_The Hitchhiker's Guide to Python_](https://docs.python-guide.org) was often referenced, so I concluded it must espouse a highly regarded opinion and decided to adopt it as another of my sacred texts. Indeed, it proved very useful as a quickish reference for many things: project structure, package management, testing tools, documentation practices....

Armed with an initial (and empty) project layout and a basic Github Workflow that would execute my "Hello, world!" Action any time I pushed to Github, I could finally get started on the logic that would become [`syndicate`](https://github.com/dabrady/syndicate).

<!---
- The first challenge I overcame was finding a Docker image that would actually run Python; turns out the `alpine` image used in the tutorial did not have Python installed, so I needed to find one that did (python:alpine)
- Now that I could run Python, I needed to figure out how to use the DEV.to API: what Python library should I be using?
- The `requests` package was the answer, quickly found, and its documentation was the second sacred text in this project's development
- I started to familiarize myself with `requests` and the DEV API by transforming my Hello World script into something that would simply retrieve the metadata for my published posts on DEV.to (by this time, I'd written 4 or 5 and so this was a really nice sample data set)
- Once I got that working, I thought about whether I would actually need that functionality in `syndicate`: it wasn't clear at that point, because I hadn't actually done any design work for the project itself yet; I decided to spend time making this bit of logic an example for myself to follow with respect to using the DEV API and `requests` package properly (including things like error handling, input validation, request authentication, failed request handling, testing, and logging)
- This decision proved quite valuable: it gave me a concrete exercise in which I figured out how my overall application logic would flow, and learned things like how to print to the Github Workflow log; how to read information from the Github Action environment; how to use Pytest; how to authenticate my DEV API requests and parse response bodies; how to handle failed requests
- By the end of the end of that exercise, I had:
  - a Github Workflow definition that used my action and provided it with a list of platforms to publish to and the API keys required for using their APIs
  - an entrypoint for the Docker container that simply invoked my 'main' Python script with any arguments specified by the workflow
  - a 'main' Python script, which was actually a Python module called 'syndicate' which defined a single function, `elsewhere`, responsible for basic input validation, delegation to the appropriate silo adapters, and final reporting
  - a 'DEV' adapter that fetched and returned my published posts from DEV.to using the API key provided by the workflow definition
  - the beginnings of a utility library with functions that handled printing to the Github Workflow log at various log levels
  - a small test suite for my 'fetch' logic
  - a fully polished and tested example of how to interact with the DEV.to API via the `requests` package
  - not to mention a much firmer grasp of using Python itself
- At this point I paused development, and spent an evening working on the requirements and tech design for the actual thing I wanted to build
- Initial requirements
  - My MVP (and possibly first release) would only support DEV.to
  - It needed to be easy to add support for publishing to new platforms
  - Given a Markdown file, it needed to be able to create a draft on DEV.to with its contents
  - Given a (presumably changed) Markdown file previously syndicated to DEV.to, it needed to be able to replace the syndicated copy with the new version
  - Given a commit that triggered a workflow using the `syndicate` action, it needed to be able to identify and extract the contents of the added/modified files to syndicate from that commit
  - It needed to be able to identify files that had been syndicated to a given silo previously, in order to decide whether to create a draft or push an update
- Tech design
  - inputs: list of silos and associated API keys
  - outputs: summary of the files added/modified on each silo
  - structured as mentioned previously: mechanisms for interacting with a particular silo encapsulated in their own adapter files; `syndicate.elsewhere` responsible for engaging the appropriate adapters and aggregating the output
  - syndicated files would be 'tagged' with unique identifiers provided (presumably) by the silos themselves in the draft API response; tags take the form of attributes injected into the YAML frontmatter of a Markdown file, and persisted via committing upstream
- Requirements and basic design in hand, I set to work
-->