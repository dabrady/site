---
date: '2020-01-26T20:31:54Z'
dev_silo_id: 248565
published: true
tags:
- beginners
- thinkdeep
- programming
title: Iterating with loops
series: Know your tools
---

<small>Cover photo by Sebastian Alvarez on [Unsplash](https://unsplash.com/photos/1-XS37EZ_Kg)</small>

# _Previously, on "Iteration"..._

{% link https://dev.to/daniel13rady/iterating-with-recursion-3i5e %}

I introduced the concept of iteration by way of a whimsical allegory about counting a staircase. To count the steps of a staircase, we first came up with a practical definition of what the "length" of a staircase is:

> The length of a staircase can be described as **the value of the first stair, plus the length of the rest of the staircase**.

We then used that definition to derive an intuitive algorithm for calculating staircase length:

> When counting the steps of a staircase, if you're at the top, stop counting.
> Otherwise, add 1 to the result of counting the rest of the staircase.

My implementation of that algorithm showcased the elegance of **recursion**, which deconstructs a problem into a composition of the solutions to its parts. And we saw that recursion lends itself well to **wholistic computation**, i.e. situations in which you only care about the final result.

# Constructive iteration

Today, I want to talk about other ways of approaching iteration that might lend themselves better to **constructive computation**. I'm using the term _constructive_ in [the mathematical sense](https://en.wikipedia.org/wiki/Constructive_proof), which I just learned about recently and think fits this topic particularly well.

A constructive process, in my mind, is one that gives you insight into the **progress** of the computation it is performing.

To keep with the "staircase traversal" imagery from my previous discussion of iteration, I imagine a _constructive_ traversal of a staircase to be one in which, after each step, you know exactly how many you've climbed.

It's like you're actually building the staircase as you go, keeping track of how many steps you've added so far. Once you've decided to stop, you already know exactly [how many steps are in the staircase](https://www.youtube.com/watch?v=5ZtbCOpx8Sk) without further computation.

We-Who-Code often refer to this type of iteration as **looping**, which captures the idea that each step you take closes a 'loop' in a larger 'circuit' of computation.

When looping, you can stop at the end of any step without worrying so much about unfinished work: if you stop precisely at the "end" of your computation, your record-keeping will reflect the solution to the whole thing; on the other hand, if you stop early, you'll still have something to show for it, it might just be an _approximation_ of the result you were driving towards.

# How many stairs are in a staircase?

So: how do you count the stairs of a staircase like this?

The basic algorithm is the same: climb until you reach the top, tracking each step you take.

The difference in implementation is in _the way you track your steps_: instead of waiting to evaluate the sum once you've reached the top, you evaluate as you go.

Our recursive implementation of `#count-stairs` from [last time](https://dev.to/daniel13rady/iterating-with-recursion-3i5e) looked like this:
<!--
```scheme
(define (count-stairs staircase)
  (if (top? staircase)
    0
    (+ 1 (count-stairs (rest-of staircase)))))
```
-->
![Staircase counting algorithm](https://thepracticaldev.s3.amazonaws.com/i/o20btvs9m63gqf1jkyyh.png)

As we saw, this builds up a single computation by keeping a tally of the steps you've climbed and evaluates it once you've reached the top. For example, calling this version of `#count-stairs` with a staircase of four steps would build and evaluate an expression like this:
<!--
```scheme
(+ 1 (+ 1 (+ 1 (+ 1 0))))
```
-->
![Addition sequence](https://thepracticaldev.s3.amazonaws.com/i/zxclfgngzfsrx9w8gfg9.png)

With only a slight modification, this 'non-constructive' iteration can become constructive. Let's give it a try.

If we want to keep track of how many steps we've taken at every step we take, we need a place to store that information. So the first thing to do is introduce a variable to hold the result of that computation: let's call it `tally`.
<!--
```diff
-   (define (count-stairs staircase)
+   (define (count-stairs staircase tally)
      (if (top? staircase)
        0
        (+ 1 (count-stairs (rest-of staircase)))))
```
-->
![Introduce tally variable for holding intermediate results](https://thepracticaldev.s3.amazonaws.com/i/j1l9ohq48r2zs2a8ixmw.png)

Since `tally` will hold the number of stairs we've stepped, and the number of stairs we've stepped is precisely the length of the staircase we've climbed, we now want to return our `tally` once we reach the top.
<!--
```diff
    (define (count-stairs staircase tally)
      (if (top? staircase)
-       0
+       tally
        (+ 1 (count-stairs (rest-of staircase)))))
```
-->
![Return final tally when we stop looping](https://thepracticaldev.s3.amazonaws.com/i/tijgkhdzhyxkztarln59.png)

Finally, we add the current step to our `tally` and count the rest of the staircase.
<!--
```diff
    (define (count-stairs staircase tally)
      (if (top? staircase)
        tally
-       (+ 1 (count-stairs (rest-of staircase)))))
+       (count-stairs (rest-of staircase) (+ 1 tally))))
```
-->
![Increment tally and recur with rest of staircase](https://thepracticaldev.s3.amazonaws.com/i/k5sv1vreoxisd4fk2utf.png)

This new way of 'counting the rest' is the key to an implementation that evaluates the tally as it counts, rather than deferring evaluation of the tally to when counting has stopped.

Putting it all together, our new `#count-stairs` function looks like this:
<!--
```scheme
(define (count-stairs staircase tally)
  (if (top? staircase)
    tally
    (count-stairs (rest-of staircase) (+ 1 tally))))
```
-->
![Tail-recursive version of count-stairs](https://thepracticaldev.s3.amazonaws.com/i/bnyb0nrfsb776emumbdr.png)

Quite similar to the original, no?

> :bulb: This form of recursion is often called 'tail recursion', because the "do it again" part happens at the tail-end of the loop, and no more computation is done in the same loop.
>
> To anyone who writes code, I **highly** recommend the book [_Structure and Interpretation of Computer Programs_](https://www.goodreads.com/book/show/43713.Structure_and_Interpretation_of_Computer_Programs), by Harold Abelson and Gerald Jay Sussman. This section [in particular](https://xuanji.appspot.com/isicp/1-2-procedures.html) is a great resource on the topics I'm discussing here.

What I find fascinating is how the shape of the computation changes with just these few simple modifications. Taking again a staircase of four steps to illustrate our algorithm, our computation diagram now looks something more like this:
<!--
```scheme
(define staircase '("step1", "step2", "step3", "step4"))

; We now start counting explicitly from zero.
(define staircase-length (count-stairs staircase 0))
; (count-stairs '("step2", "step3", "step4") (+ 1 0))
; (count-stairs '("step3", "step4") (+ 1 1))
; (count-stairs '("step4") (+ 1 2))
; (count-stairs '() (+ 1 3))
; 4
```
-->
![Computational diagram of tail-recursive function](https://thepracticaldev.s3.amazonaws.com/i/wdewzlfos42f9on9wih3.png)

Do you see the staircase we're climbing? :smile:

# Loop constructs

Iteration is useful and loops prevalent. We-Who-Code even [apply the concept of iteration to applying the concept of iteration](https://www.ntaskmanager.com/blog/what-is-agile-iterative-approach/).

But depending on the tools you're using, repeatedly calling the same function isn't the only way to loop.

Many languages provide explicit "loop constructs" we can use in situations where a recursive function call may negatively impact how well our code communicates our intent to other humans and machines.

There are also times where it may not be the most mechanically efficient one, either; see [SICP](https://xuanji.appspot.com/isicp/1-2-procedures.html#%_sec_1.2.1) for a brief discussion on the performance of various compilers with respect to handling iterative code patterns.

Since these constructs are language-specific, I won't go into much more detail than to mention a few names they are commonly given, to aid you in your quest to better know your tools:

- `for`
- `while`
- `until`
- `loop`
- `each`
- `do-while`

---

_Every tool has its use. Some can make your code clearer to humans or clearer to machines, and some can strike a bit of balance between both._

_"Good enough to work" should not be "good enough for you." **Hold yourself to a higher standard**: learn a little about a lot and a lot about a little, so that when the time comes to do something, you've got a fair idea of how to do it well._
