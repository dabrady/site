---
canonical_url:
date: 2020-02-17T18:30+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Release and Verification
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
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
