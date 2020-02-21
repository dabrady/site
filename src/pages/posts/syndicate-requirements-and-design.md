---
canonical_url: null
date: 2020-02-21T23:25+00:00
dev_silo_id: 266409
published: false
series: The making of 'syndicate'
tags: null
title: 'syndicate: Prototype, Requirements and Design'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it._

_This is how I got started._

---

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