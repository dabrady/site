---
title: "[wip] `var`, `let`, `const`: Which one do I use?"
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

# The basics: declaring variables
Let's begin at the beginning: **variable declarations declare variables**. This may seem obvious to many of you, but in practice we often confuse variables with values, and there is a very important difference between them.

A **variable** is a binding between a **name** and a **value**. It's just a box, not the contents of the box, and the contents of the box may _vary_ either in part or in whole (hence the term 'variable').

The kind of box you use, that is, the declarator you use to create a binding, defines the way it can be handled by your program. And so when it comes to the question of, "How should I declare my variables?" you can think of the answer in terms of finding a box for your data that is best suited to the way you need to manipulate it.

# The specifics: declaring variables _in JavaScript_
At the time of this writing, JavaScript gives us these tools for declaring our variables:

- `var`
- `let`
- `const`

(It also gives us another, `function`, but I won't focus on that one here; it's a bit special because it can only declare variables for binding to values of a particular type (functions), and so has a rather undisputed usage.)

Why so many options? Well, the simple answer is that in the beginning, there was only `var`; but languages evolve, churn happens, and features come (but rarely go).

One of the most useful features in recent years was the addition of **block scoping** to supplement function scoping, and with it came new tools for working within the new type of scope.

> **NOTE** Most of the differences between our variable declaration tools pertain to (lexical) scope, so if you don't have a firm grasp of that subject, you won't be able to make the most effective choice of tool consistently. I highly recommend Kyle Simpson's short book [_Scope and Closures_](https://github.com/getify/You-Dont-Know-JS/); it's a fantastic resource, and I think Kyle does a great job at explaining this area of language design in an easy-to-follow way.

Let's take a look at what each of these tools has to offer, so we can make better decisions about which one is the right tool for the job.

## `var`
`var` is universally supported, has been since the beginning and will be until the end. It's as old as JavaScript, and very powerful.

`var` is good. `var` is great. `var` does what it says on the tin: it names a variable and let's you use it.

During compilation, that variable is attached to the **scope of the nearest enclosing function**, and is automatically initialized to `undefined` **at the beginning of that scope** so that it is immediately available for reference anywhere within the scope at run-time.

> **TIP** You might come across the term "variable hoisting" in your JS travels to refer this 'lifting' behavior of the JS compiler with respect to variables declared with `var`.

Once declared with `var`, the name of your binding is reserved for that specific variable: any references to that name within that scope will point to that variable.

So with `var` we can do this:

```javascript
function holdMyStuff(...stuff) {
  // New function, new scope: we can create our own variables
  // and also access the ones in our 'parent' scope.

  if (++requestCount > 2) {
    requestCount = 0;

    // Get annoyed.
    console.log("You can't tell me what to do.");
    return null;
  }

  return stuff;
}

var myStuff;
var requestCount = 0;

myStuff = holdMyStuff('cat', 'shoe', 42);
myStuff = holdMyStuff('plant', 'boba tea', 'toilet paper');
myStuff = holdMyStuff('please?');

console.log(myStuff);
```

But we can't do this:

```javascript
function holdMyStuff(...stuff) {
  var bonusItem = 'boba tea';

  // NOTE `myStuff` here is not the same variable as the one outside:
  // it's a new variable with the same name in a different scope.
  // We call this "name/variable shadowing".
  var myStuff = stuff;

  myStuff.push(bonusItem);

  return myStuff;
}

var myStuff;
myStuff = holdMyStuff('cat', 'shoe', 42);

console.log(myStuff, bonusItem) // USEFUL ERROR: `bonusItem` is only accessible within `holdMyStuff` function;
```

`var` comes with no strings attached. I use `var` for holding values I think will be used throughout most or all of the current function.

If, during the course of development, it makes sense to reduce the scope of (i.e. restrict access to) my data, I can swap out the kind of box I put it in and move that box to a better home. And if at some point it makes sense to swap out the contents of my `var` box for something different or new, I am free to do so.

This can be nice, but this isn't always what you need.

Sometimes, you only need to give your data a name for a short while, and making it available outside that context doesn't make sense: it can hurt the readability and maintainability of your code by giving the impression of wide-spread use; and it can lead to bugs if, for example, you use that name elsewhere in the function without realizing you'd used it before.

Enter **block scoping** and its associated tools.

## `let`
Block scoping is a good answer to this kind of need. It gives us the ability to create scopes on-demand by "slicing up" a function into as many encapsulated bits of scope as we deem necessary without creating more functions.

But it would be useless without the ability to declare variables which exist only within these 'blocks' of scope.

`let`, as its name so aptly informs us, let's us put a value in a box, but only _after_ we have officially declared the existence of that box, and we can only handle our box until **the end of the nearest enclosing block**.

So using `let` we can do this:

```javascript
var movingTruck = [];
var totalBoxCount = 0;

movingTruck.push(*holdMyStuff('cat', 'shoe', 42));
movingTruck.push(*holdMyStuff('plant', 'boba tea', 'toilet paper'));

console.log(movingTruck, totalBoxCount);

function holdMyStuff(...stuff) {
  var boxes = [];

  { // start a block, create a scope
    let lastBox;
    console.debug(lastBox); // prints `undefined`, there's nothing in it yet

    lastBox = stuff[0];
    console.debug(lastBox);
  }

  for (let box of stuff) {
    boxes.push(box);
    totalBoxCount++; // we can access the parent scope
  }

  return boxes;
}
```

But we can't do this:

```javascript
var movingTruck = [];
var totalBoxCount = 0;

movingTruck.push(*holdMyStuff('cat', 'shoe', 42));
movingTruck.push(*holdMyStuff('plant', 'boba tea', 'toilet paper'));

console.log(movingTruck, totalBoxCount);

function holdMyStuff(...stuff) {
  var boxes = [];

  var firstBox;
  {
    // ERROR:
    // This is probably a refactoring mistake.
    //
    // We think we're assigning to the `firstBox` in our parent scope,
    // but our `let` binding below shadows our parent's, and so we're
    // actually trying to assign to the `firstBox` we declared in
    // _this_ scope, and we can't do that yet.
    firstBox = stuff[0];

    let firstBox;
    console.debug(firstBox);
  }

  console.debug(firstBox);

  for (let box of stuff) {
    boxes.push(box);
    totalBoxCount++; // we can access the parent scope
  }

  // What's in the last box?
  console.debug(box); // ERROR: `box` is no longer in scope

  return boxes;
}
```
