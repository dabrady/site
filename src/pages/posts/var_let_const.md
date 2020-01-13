---
title: "[wip] `var`, `let`, `const`: Which one do I use?"
tags: [javascript]
date: "2020-01-11T15:01+00:00"
---
TL;DR: Use the declarator that is sufficient to minimize the scope of your variable.
<!-- / -->
# Preamble
The variable declarators available to us in JavaScript these days, and more specifically when to use them, are a hot topic of conversation these days. Just the other day, I saw an article called ["Another var vs let vs const"](https://dev.to/stearm/another-var-vs-let-vs-const-27g1). Though the title made me smile, my response to the advice given was much less positive:

>I think we can summarise everythings in a few lines:
>
>* `var`: why? if you can avoid it, do it;
>* prefer `const` usage if possible of course (together with an immutable approach when updating objects)! But don't be scared using `let`, especially if the scope of your variables is small, for example inside a function.

To be clear, I think it is very nice summary of the reigning opinion I've been exposed to; but the gospel-like way in which this summary is given triggered a knee-jerk reaction of mine, which is to immediately question bold statements made without supporting arguments.

So it got me thinking many hours of thoughts. And with deep thought comes opinions, and I realized I don't agree. Not entirely, at least.

Here's my take; I'd appreciate feedback!

<!-- table of contents  -->
<!--      ...           -->

# The basics: variable declarators declare variables
Any time I consider a question of "how," I tend to think of the answer as having mostly to do with the tools in my toolbox. And when it comes to choosing a tool, the answer is usually a matter of *function* and *quality*. You can bang a nail into the wall with the backend of a screwdriver and it will work, but if you have a hammer available it will likely do the job better and with less scarring (both of you and the wall).

So when faced with the question of "How should I declare my variables?" my first thought is, "Well, what can I use to declare a variable?". My second thought is, "Why would I use that declarator over this one?"
