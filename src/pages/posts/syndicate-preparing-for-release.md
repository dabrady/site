---
canonical_url:
date: 2020-02-17T18:28+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Preparing for Release
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
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
