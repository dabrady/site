---
date: '2020-01-20T14:37:39Z'
dev_silo_id: 241060
published: true
tags:
- javascript
- codequality
- beginners
- thinkdeep
title: Declaring Variables in JavaScript
series: Miniseries
---

The variable declarators available to us in JavaScript, and more specifically when to use them, are a hot topic of conversation these days. A few weeks ago, I read an article called ["Another var vs let vs const"](https://dev.to/stearm/another-var-vs-let-vs-const-27g1):

{% link https://dev.to/stearm/another-var-vs-let-vs-const-27g1 %}

Though the title made me smile, my response to the advice given was less positive:

>I think we can summarise everythings in a few lines:
>
>* `var`: why? if you can avoid it, do it;
>* prefer `const` usage if possible of course (together with an immutable approach when updating objects)! But don't be scared using `let`, especially if the scope of your variables is small, for example inside a function.

To be clear, I think it is very nice summary of the reigning opinion I've been exposed to; but the gospel-like way in which it is given triggered a knee-jerk reaction of mine, which is to immediately question bold statements made without supporting arguments.

I realized I don't entirely agree, but **I couldn't articulate why**. So it got me thinking many hours of thoughts. And with deep thought comes opinions:

Immutable approach to state management? :white_check_mark:
Prefer `const`? :no_good:
Avoid `var`? :no_good:
Embrace `let`? :white_check_mark:

If you choose to follow my dive into this particular rabbit hole, I'd appreciate feedback!

# The tools: a miniseries
I've written a miniseries of posts that encourages deep thoughts about variable declaration in JavaScript.

![Clip from "I,Robot": 'Hold my pie'](https://thepracticaldev.s3.amazonaws.com/i/0acxkc4rkjvgqoqz48py.gif)

> :book: Most of the differences between our variable declaration tools pertain to (lexical) scope, so if you don't have a firm grasp of that subject, I highly recommend Kyle Simpson's short book [_Scope and Closures_](https://github.com/getify/You-Dont-Know-JS/); it's a fantastic resource, and I think Kyle does a great job at explaining this area of language design in an easy-to-follow way.
>{% github https://github.com/getify/You-Dont-Know-JS no-readme %}

Each post dives deeper into one of JavaScript's variable declarators, and rather than constitute a sequence they are intended to be standalone, interrelated references.

I have chosen to give them identical structures and also tried to keep the examples* as similar as possible for easily comparing and contrasting the information in each, should you choose (and I strongly encourage it :smile:).

I hope they help you make better decisions about which one is the right tool for holding a particular bit of your data. :pray: I've definitely learned a lot from trying to write them!

{% link https://dev.to/daniel13rady/using-js-var-5kp %}
{% link https://dev.to/daniel13rady/using-js-let-1k81 %}
{% link https://dev.to/daniel13rady/using-js-const-444 %}

<small>*For the curious, I'm using [Carbon](https://carbon.now.sh) with some [custom settings](https://carbon.now.sh/?bg=rgba(255%2C255%2C255%2C0)&t=synthwave-84&wt=none&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=146%25&si=false&es=4x&wm=false) to generate pretty pictures from code.</small>
