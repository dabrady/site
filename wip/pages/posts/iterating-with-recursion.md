---
date: '2020-01-25T20:25:37Z'
dev_silo_id: 248481
published: true
tags:
- beginners
- thinkdeep
- programming
title: Iterating with recursion
series: Know your tools
---

<small>Cover photo by Ludde Lorentz on [Unsplash](https://unsplash.com/photos/YfCVCPMNd38)</small>


# How many stairs are in a staircase?

You're walking along, thinking about dinner. _Should I have [ramen](https://www.instagram.com/tsurumendavis/) or [udon](https://www.instagram.com/yumegaarukara/)?_ you ask yourself.

>:exclamation: A wild staircase appears!

Thoughts of noodles recede from your mind as you consider this new development in staircase behavior, which may be worthy of a _Nat Geo_ special.

The staircase is not too tall; you can't tell exactly how many steps there are, but you're pretty confident you can conquer them.

But...how can you be sure?

You've climbed hundreds, if not thousands, of steps in your lifetime, enough that this new set shouldn't be a problem. The secret, you know, is twofold:

1. Know when to stop.
2. Take the next step.

And you really can't climb a staircase and emerge unscathed without knowing this secret.

You recall a time when you continued to think about noodles while trying to ascend a staircase, and tripped: you'd made a mistake taking the next step.

You also recall, during this very same ascension, how it felt when you reached the top but kept on climbing because you were _still_ weighing your noodle options: your foot came down hard and you pitched forward, nearly falling flat on your face. You'd momentarily forgotten the other secret of climbing stairs: knowing when to stop.
<!--
```scheme
(define (climb-stairs staircase)
  (if (top? staircase)
    (resume-noodle-thoughts)
    (climb-stairs (rest-of staircase))))
```
-->
![Staircase climbing algorithm](https://thepracticaldev.s3.amazonaws.com/i/60foeoh9axpzbc2lxv88.png)

You eye the stairs before you, and, driven by the need to know just how many there are, you make the only reasonable decision: you clear your mind of noodles, and take the first step.

Confidence in your ability to conquer _any_ flight of stairs, even if you've never done it, seems valuable to you in your future as a human.

But how do you incorporate counting into it? :thinking:

It's simple, you realize: you merely keep a tally of the stairs you've stepped as you climb. The length of a staircase can thus be described as **the value of the first stair, plus the length of the rest of the staircase**.
<!--
```scheme
(+ 1 (count-stairs (rest-of staircase)))
```
-->
![Recursive summation](https://thepracticaldev.s3.amazonaws.com/i/xgwxihqlugmdrlyms87v.png)

If you've reached the top, you stop climbing, and thus stop counting. Otherwise, you can focus on stepping and summing, and wait to evaluate the tally you've kept until you've stopped.
<!--
```scheme
(define (count-stairs staircase)
  (if (top? staircase)
    0
    (+ 1 (count-stairs (rest-of staircase)))))
```
-->
![Staircase counting algorithm](https://thepracticaldev.s3.amazonaws.com/i/o20btvs9m63gqf1jkyyh.png)

Smiling and slightly winded, you reach the top and look at how far you've come. Full of the glow of victory, you wonder at the power of this simple algorithm. Your smile fades to a frown, however, as you remember a more pressing concern: what bowl of noodles should you have for dinner?

----

This approach to solving problems that can be broken down into a sequence of similar steps, where

- you do something at every step
- you know how to get to the next step, and
- you know how to determine if you should stop stepping

is fundamental in computing science and every-day programming.

**Iteration**, that's what we've landed on. Doing things over and over until a particular goal is reached.

The example functions I used to illustrate the story above implemented iteration in a **recursive** fashion.

**Recursive functions are the simplest form of programatic iteration**: they are functions designed to deconstruct a problem into a linear computation of its pieces, and then evaluate it as a whole.

Thinking about it so formally can get a bit confusing. I find it easiest to grok by reading a simple recursive function aloud. Revisiting our `#count-stairs` example:
<!--
```scheme
(define (count-stairs staircase)
  (if (top? staircase)
    0
    (+ 1 (count-stairs (rest-of staircase)))))
```
-->
![Staircase counting algorithm](https://thepracticaldev.s3.amazonaws.com/i/o20btvs9m63gqf1jkyyh.png)

This can be read in plain English as:

>When counting the steps of a staircase, if you're at the top, stop counting.
>Otherwise, add 1 to the result of counting the rest of the staircase.

Bit of a strange loop, to be sure; but note how each time we "count the rest" of the staircase, the amount of things we are counting is _getting smaller_ until eventually, there's nothing left to count: we've reached the top.

Let's draw out an example computation to help us see this in action:
<!--
```scheme
(define staircase '("step1", "step2", "step3", "step4"))
(define staircase-length (count-stairs staircase))        ;=> 4
;  <-- (+ 1 (count-stairs '("step2", "step3", "step4"))) => (+ 1 (+ 1 (+ 1 (+ 1 0))))
;    <-- (+ 1 (count-stairs '("step3", "step4")))      => (+ 1 (+ 1 (+ 1 0)))
;      <-- (+ 1 (count-stairs '("step4")))           => (+ 1 (+ 1 0))
;        <-- (+ 1 (count-stairs '()))              => (+ 1 0)
;          -------------------------------------- 0
```
-->
![Computation diagram of recursively counting stairs](https://thepracticaldev.s3.amazonaws.com/i/n8b6qor5p85ey498uso2.png)

Quite elegant, no?

Readers may notice, especially after seeing the computation diagram above, that we're arriving at the final summation **without tracking the intermediate results**. Good eyes, dear reader. :clap:

As we've seen, this style of recursion approaches a problem _wholistically_ and _lazily_: it views the solution to a problem as an aggregation of the solution to its parts, and thus doesn't compute the whole solution until it has broken it down fully.

But what happens if we fall off the stairs? What happens if we get too hungry, and need to abandon our climb in order to go eat noodles, but want to return to finish counting later? What happens if we want to text someone our current location, and tell them what step we're on?

In such situations, we care about **partially computing** results. At any given step, we may want to stop and reflect on how far we've come, beyond just asking "are we done yet?" And in these cases, the approach we've taken today may not be the best one for the job.

For this and other reasons, many programming languages give you access to **loop constructs**, and I'll talk more about those next time. :wave:

---

_Every tool has its use. Some can make your code clearer to humans or clearer to machines, and some can strike a bit of balance between both._

_"Good enough to work" should not be "good enough for you." **Hold yourself to a higher standard**: learn a little about a lot and a lot about a little, so that when the time comes to do something, you've got a fair idea of how to do it well._
