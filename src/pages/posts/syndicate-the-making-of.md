---
canonical_url:
date: 2020-02-14T11:47+00:00
published: false
tags:
title: "[OUTLINE] The making of 'syndicate'"
---

TODO Link to commits where possible, to illustrate the story

<!-- / -->

topic: the making of syndicate

discusson points:
- why did I do it? motivation and goals
- how did I do it? tech choices and development summary
- what's next? plans and ideas for improvement

why did I do it? motivation and goals
- discovered POSSE, reminded me of software deployment strategies, sounded fun to implement
- seemed like a good small project: clear objective and definition of success, presented a challenge matching my perceived skill level with what I imagined it would entail
- my initial enthusiasm and interest signaled to me this was something I cared about and thus worth my time
- automation my jobs away is a passion of mine
- premature automation is kind of my thing, when I'm the only stakeholder
- given my previous non-experience with blogging, starting off with POSSE and an automated syndication process seemed easier than a retroactive adoption
- I like making magic
- seemed like something other people besides me might find useful
- I'm the most productive when I have something to avoid doing and in this case, I was avoiding writing a blog post which is ironic

how did I do it? tech choices and development summary

# (the making of) syndicate: setup, requirements, and design
- created a Trello board (a new tool for me)
- first thoughts were "DEV API, git hooks and shell scripts"
- initial research lead me to DEV.to API and Github Actions, seemed perfect
- Github Action docs had two tutorials: one using JavaScript and one using Docker; I chose Docker because I was less familiar with it and it could potentially benefit me in me upcoming transition to DevOps
- started by following the Hello World Docker action tutorial; spent a few evenings on that, taking my time and trying to massage the steps into something closer to what I imagined I'd need for my real project
- once I was ready to transition to my actual project work, I quickly decided I didn't want to build it out of shell scripts: I can count on one hand the number of DEVs I know who can effectively read shell scripting languages, let alone effectively write them, and I wanted this project to be easy for others to grow to suit their needs
- Python was a choice I was primed to make: it's a language I had virtually zero experience developing with, it's easy to pick up and widely used, and it was on my list of tools to familiarize myself with; and I have a dev friend who's enamored by it and always touting its benefits in web programming
- Once I chose Python, I needed to know the best practices I'd be following, so I looked for them
- The first things I cared about were project structure and dev tools: how do I lay out this project, and what will help me build it?
- I quickly found The Hitchhiker's Guide was referenced often in my topic searches, so I concluded it must be a highly regarded opinion and decided to use it as a project bible
- It proved very useful as a quickish reference for many things: project structure, package management, test tools, documentation practices, etc.
- Armed with an initial (and empty) project layout and a basic Github workflow that would execute my Hello World script any time I pushed to Github, I could finally get started on the logic that would become `syndicate`
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

# (the making of) syndicate: harvesting commits and drafting to DEV
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

# (the making of) syndicate: marking a post as 'syndicated'
- My choice to assume the presence of a YAML frontmatter in all posts made possible a simple, potentially elegant solution: insert a YAML attribute marking the post as 'syndicated'
- And don't give it just any value: most CRUD APIs return some sort of resource identifier in their response bodies, and the DEV API was no different; if I used that 'silo ID' as the tag, then not only would I be able to know which posts had already been syndicated to a silo, but I would be able to use the ID in an 'update' request later on
- And the `github3.py` library provided an easy-to-use method for committing the change I'd made to the post back upstream to the repository, which was key if I wanted to actually _persist_ the silo tag
- There was a downside to this, though: by committing the change as soon as it was made, that would mean pushing a commit every time an ID was injected into a post, which in turn could potentially mean even multiple commits per post if more than one silo was being syndicated to; I marked this down as a performance problem to iron out later
- For now, I was quite happy with this solution, and once I'd coded it up I devised a simple integration test: I would use the action _twice_ in my workflow, and expect that the second use would do nothing because the first use should have already tagged the new posts and committed the tag upstream
- My test failed in a surprising way: the first use of the action worked perfectly, committing the tagged post upstream, but the second time it _also_ tried to tag and commit the posts upstream, resulting in a merge conflict and failed push
- It took me a minute to realize the issue: previously, the commit which had triggered the workflow was the same as the HEAD of the remote branch; but by pushing a commit upstream during the action, I changed that truth. Subsequent uses of the action in the same workflow were now using an outdated version of the branch, could not see the changes that had been made earlier in the workflow, and thus tried to tag and push upstream again but to an old HEAD.
- I needed to make sure I was syndicating the changes made in the commit that triggered the action, but I also needed to make sure any changes the action made to those posts were committed upstream using the proper SHA as HEAD; this means somehow impacting the run of future steps within the same workflow
- The solution I came up with stores the SHA of the last commit made by the action in an environment variable; and if that environment variable exists, it uses the contained SHA as the parent for any commit it makes
- This ensures that no matter how many commits the action makes, even across multiple steps in a workflow, it will always be building off the previous commit it made.
- This has downsides: if commits are pushed to the repo from another process (let's say you push twice in quick succession), the action will not know about them and may break
- An alternative is to always use the remote HEAD as the parent for any commits we make, which would capture any out-of-band commits and ensure we're always using the best parent commit; but a downside to this is that those commits might have modified the same post that we are trying to syndicate, and if we commit changes to that file it could result in merge conflicts. Still, it's a simpler approach, and might be a better downside to live with, I'm not sure
- After wiring up this "use the proper parent SHA" logic, rerunning my integration test succeeded, and I moved on to implementing the 'update' mechanism which was much simpler since it didn't involve the same tagging process needed during the 'draft' stage; a quick integration test showed it worked as expected
- At this point, my action was feature complete! It met all my initial requirements
- Now it was time to go back and have a second look at the perfomance issues I'd created along the way

# (the making of) syndicate: performance problem no.1: too many commits
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

# (the making of) syndicate: performance problem no.2: too slow to build
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

# (the making of) syndicate: preparing for release
- At this point I felt ready to put the implementation to rest and start polishing it for release
- To me this meant:
  - ensuring it was simple and easy to use, and that its configuration makes sense
  - ensuring the code was as readable and "Pythonic" as I could make it
  - ensuring I had tests in place for the syndication logic
  - learning how to document Python code (and then doing it)
- During this stage I decided to make the "mark as syndicated" logic configurable with an input flag, given that it was making changes to peoples repositories that they might not appreciate
- It was at this point I went a step further than was necessary and indulged in a bit of "designing for the future"
- By making the syndication tagging optional, I had introduced the possibility of separating the syndication workflow into 'groups': you could now craft a workflow in which you chose to tag posts syndicated to DEV.to, but not Medium, by using the action twice in the same workflow with different inputs
- You could also 'bundle' different silo tags into separate commits in a similar way
- But this flexibility also made it easy to accidentally forget to tag some posts for some silos during more complicated workflows, and I wanted to provide a 'save all' safety mechanism to avoid that
- And so I spent some time implementing a mechanism for invoking the 'mark as syndicated' logic on the compiled results of the entire workflow job prior to a certain point; basically, a "save point"
- I made it such that by adding a step to your workflow that used the action without specifying any silos, but asking it to mark new posts as syndicated, any posts that had been syndicated during the job prior to that point but left untagged would get tagged in a single commit
- Probably a wholly unnecessary feature, but it seemed like a fun challenge so I did it anyway
- The very last thing I worked on was the README; this way I could document the project knowing it wasn't about to change drastically
- When I was ready for launch, I created a release pull request (I like to practice Git Flow and was working on a `develop` branch this entire time) and pinged my buddy `@rhymiz` for a review: he's a great engineer who loves Python and has been developing with it professionally for a few years now, so I asked him to give me some feedback on my project, particularly on the subject of Python best practices; thanks Lemi!

# (the making of) syndicate: verifying the release
- Once I got his LGTM, I merged to master, tagged the `v1.0` release, and published my action to the Github Marketplace!
- (Github made me change the name of my action in the Marketplace from `syndicate` to something else, because it was taken by some organization; I renamed it to `syndicate-elsewhere`, though the project name is still `syndicate`)
- Now publically usable, I wanted to share it on DEV.to
- I decided it would be fitting to use the action to syndicate its own public introduction, so I added it to a workflow in my personal work-in-progress website/blog, wrote a short introductory post, and pushed, triumphant.
- It didn't work.
- After a brief moment of panic, I checked my action log and realized I'd simply forgotten to add my DEV API key as a secret of my website repo; reverted my commit, added my API key, then tried again.
- It failed again.
- This time, though, there was an actual error: the "create" request to the DEV.to API was failing.
- Dismayed, but thankful I'd built in basic error reporting, I tried to understand the error message and figure out what was going on; the message was:
  - `{'error': "Invalid comment ID or comment does not exist, Title can't be blank", 'status': 422}`
- It seemed like I was failing some request validation; I didn't understand the first part of the message (why is it talking about comments?) and so I fixated on the second part about the title being blank, which turned out to be a red herring and waste of my time
- After running several more smoke tests of my action making various tweaks to the frontmatter of my post, all of them had failed. I was convinced the title was _not_ in fact blank, so I tried one last test: I copied the frontmatter entirely to a new, dummy post and pushed; this time, it succeeded!
- I was perplexed, but that told me the error was somehow coming from the _body_ of my post, not the metadata used to make the request, and that perhaps this was having a downstream impact on validation and causing a false negative related to the title being blank
- Several minutes later I had an "aha!" moment: I was making use of a DEV.to Liquid tag in my post to link to a comment on a different DEV post, and I was doing it wrong.
- I fixed my use of the Liquid tag and pushed again.
- This time, finally, everything worked.
- I rejoiced, double-checked the look-and-feel of my new draft on DEV.to, published the post, then left my coffee shop and went to do work people actually pay me to do
- It was well received (thanks DEV!), and that inspired me to make this series of posts detailing how I did it
- Thanks for coming along for the ride

what's next? plans and ideas for improvement
- I would like to add a few more adaptors to popular publishing silos, like Medium and Ghost; but I don't currently publish to those platforms so I'll need to create accounts and figure out how to use their APIs (if they even exist)
- `@rhymiz` recommended I look into integrating `pipenv` into my development workflow; not sure exactly what it is
- he also suggested I create a `readthedocs` page for the project which, given how I basically dismissed a library out-of-hand during the development of ths project because of its seemingly terrible documentation, I am definitely on board with
- I hope that someone will like this enough to improve it, and submit a pull request some day; to encourage that, I want to draft up some basic contributor notes
