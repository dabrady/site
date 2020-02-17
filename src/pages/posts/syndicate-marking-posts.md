---
canonical_url:
date: 2020-02-17T18:25+00:00
published: false
series: The making of 'syndicate'
tags:
title: [wip] syndicate: Marking a post as 'syndicated'
---

_I made this for people who write words they share with others:_

{% github dabrady/syndicate no-readme %}

_It distributes copies of the content you create to various publishing sites automatically._

_It took me a week of focused evenings and a weekend of dedicated hacking to polish it to my liking; and another week to write about it. This is how I did it._

---

---
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
