---
date: '2020-01-20T14:33:51Z'
dev_silo_id: 241018
published: true
tags:
- javascript
- thinkdeep
- spec
title: 'Using JS: const'
series: Know your tools
---

_This post is part of my miniseries, [Declaring Variables in JavaScript](https://dev.to/daniel13rady/declaring-variables-in-javascript-31ch)._
{% link https://dev.to/daniel13rady/declaring-variables-in-javascript-31ch %}

_If you've already read some of the sibling posts, you can [skip straight to here](#what-is-it)._

----

<small>CONTENTS<small>
- [The basics: declaring variables](#the-basics-declaring-variables)
- [The specifics: declaring variables _in JavaScript_](#the-specifics-declaring-variables-in-javascript)
- [What is it?](#what-is-it)
- [Okay...but what does it _do_?](#okay-but-what-does-it-do)
- [What is it good for?](#what-is-it-good-for)
- [When should I use something else?](#when-should-i-use-something-else)
- [So when _should_ I use it?](#so-when-should-i-use-it)

# The basics: declaring variables
Let's begin at the beginning: **variable declarations declare variables**. This may seem obvious to many, but in practice we often confuse _variables_ with _values_, and it is important, particularly for this conversation, that we are clear on the differences.

A **variable** is a binding between a **name** and a **value**. It's just a box, not the contents of the box, and the contents of the box may _vary_ either in part or in whole (hence the term 'variable').

The kind of box you use, that is, the declarator you use to create a binding, defines the way it can be handled by your program. And so when it comes to the question of, "How should I declare my variables?" you can think of the answer in terms of finding a box for your data that is best suited to the way you need to manipulate it.

# The specifics: declaring variables _in JavaScript_
At the time of this writing, JavaScript gives us these tools for declaring our variables:

- `var`
- `let`
- `const`

> :bulb: The [`function`](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-function-definitions) keyword is not, in fact, a variable declarator, but it _can_ create a bound identifier. I won't focus on it here; it's a bit special because it can only bind identifiers to values of a particular type ([function objects](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-function-objects)), and so has a rather undisputed usage.

Why so many options? Well, the simple answer is that in the beginning, there was only `var`; but languages evolve, churn happens, and features come (but rarely go).

One of the most useful features in recent years was the addition of [**block scoping**](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-block) to the ECMAScript 2015 Language specification (a.k.a. ES6), and with it came new tools for working with the new type of scope.

In this post, we'll dive into the behavior of one of these new block-scope tools: **`const`**.

# What is it?
[Block scoping](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-blockdeclarationinstantiation) in JavaScript is wonderful. It gives us the ability to create scopes on-demand by "slicing up" a function into as many encapsulated bits of scope as we deem necessary, without the need for more functions.

But it would be rather useless without the ability to declare variables which exist only within these 'blocks' of scope.

Enter `const`.

>**`const`** declarations define variables that are scoped to the [running execution context](https://www.ecma-international.org/ecma-262/10.0/index.html#running-execution-context)'s LexicalEnvironment. The variables are created when their containing [Lexical Environment](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-lexical-environments) is instantiated but may not be accessed in any way until the variable's _LexicalBinding_ is evaluated. A variable defined by a _LexicalBinding_ with an _Initializer_ is assigned the value of its _Initializer_'s _AssignmentExpression_ when the _LexicalBinding_ is evaluated, not when the variable is created.

<small>_Source: [ECMAScript 2019 Language Specification, &sect;13.3.1](
https://www.ecma-international.org/ecma-262/10.0/index.html#sec-let-and-const-declarations)_</small>

> ...creates a new immutable binding for the name _N_ that is uninitialized. A binding must not already exist in this Environment Record for _N_....

<small>_Source: [ECMAScript 2019 Language Specification, &sect;8.1.1.1.3](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-declarative-environment-records-createimmutablebinding-n-s)_</small>

>It is a Syntax Error if _Initializer_ is not present and IsConstantDeclaration of the _LexicalDeclaration_ containing this _LexicalBinding_ is true.

<small>_Source: [ECMAScript 2019 Language Specification, &sect;13.3.1.1](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-let-and-const-declarations-static-semantics-early-errors)_</small>

> Let _defaultValue_ be the result of evaluating _Initializer_.

<small>_Source: [ECMAScript 2019 Language Specification, &sect;13.3.3.8, run-time algorithm for "SingleNameBinding"](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization)_</small>

# Okay...but what does it _do_?
Translation? 🤨 Let's learn by doing.

`const` binds a name to a value and doesn't let me bind it to anything else.
<!--
```javascript
function f() {
  // A wild variable appears!
  const x = 42;

  // Run-time: ❌Uncaught TypeError: Assignment to constant variable.
  x = "cat";

  return x;
}
```
-->
![Const introduces a new variable that forbids reassignment after initialization](https://thepracticaldev.s3.amazonaws.com/i/ekh31843wegsu1ve30x7.png)

**During compilation**, that variable is
1. **scoped to the nearest enclosing lexical environment** (i.e. a block, a function, or the global object) and
2. **created as immutable but not initialized** during the instantiation of that scope

> :bulb: You might come across the term "variable hoisting" in your JS travels: it refers to this 'lifting' behavior of the JS compiler with respect to creating variables during instantiation of the scope itself. [All declarators hoist](https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda#5c82) their variables, but the accessibility of those variables [varies with the tool](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified) you use.

**At run-time, my variable is initialized** and references to it can then be evaluated and manipulated.
<!--
```javascript
function f() {
  // Compile-time: ❌Uncaught SyntaxError: Missing initializer
  //               in const declaration
  // Run-time: n/a
  const a;

  // Compile-time: creates `x` within `f` but does not
  //               initialize it
  // Run-time: initializes `x` to 42
  const x = 42;

  // Compile-time: n/a
  // Run-time: evaluates the expression `x` to 42
  x;
}

// Compile-time: n/a
// Run-time: ❌Uncaught ReferenceError: x is not defined
x;
```
-->
![Const variables are scoped to the nearest enclosing scope and must be given an initial value](https://thepracticaldev.s3.amazonaws.com/i/gqhje754uzp17kq1b4rj.png)

> :warning: In JavaScript error messages, "not defined" is not the same thing as having a value of `undefined` :sweat: The term "not defined," in this context, should really be ["not declared."](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined)

A run-time reference to a variable declared with `const` is not valid unless it occurs _after_ the variable declaration, with respect to the current flow of execution, not necessarily the "physical" location of the declaration in my code. For example, this is valid:
<!--
```javascript
function f() {
  // Compile-time: n/a
  // Run-time: evaluates the expression `x` to 42
  x;
}

// Compile-time: creates `x` within the global scope but
//               does not initialize it
// Run-time: initializes `x` to 42
const x = 42;
f();
```
-->
![Reference to a variable in a function physically above its outer declaration with const is okay](https://thepracticaldev.s3.amazonaws.com/i/agze3e3s3j0u9nbuf5x1.png)

But this will give me a run-time error:
<!--
```javascript
function f() {
  // Compile-time: n/a
  // Run-time: ❌Uncaught ReferenceError: Cannot access 'x'
  //           before initialization
  x;

  // Compile-time: creates `x` within `f` but does not
  //               initialize it
  // Run-time: initializes `x` to 42
  const x = 42;
}
```
-->
![Reference to a variable in a function before its const binding is evaluated throws a run-time error](https://thepracticaldev.s3.amazonaws.com/i/jep945powipxcfqolbu6.png)

Furthermore, additional declarations of the same name in the same scope **using `const` or `let`** are not allowed: the name is essentially reserved by the first declaration encountered by the compiler.
<!--
```javascript
function f() {
  // Compile-time: creates `x` within `f` but does not
  //               initialize it
  // Run-time: initializes `x` to 42
  const x = 42;

  // Compile-time: ❌Uncaught SyntaxError: Identifier 'x'
  //               has already been declared
  // Run-time: n/a
  const x = "cat";

  // Compile-time: ❌Uncaught SyntaxError: Identifier 'x'
  //               has already been declared
  // Run-time: n/a
  let x;
}
```
-->
![Re-declarations with const throw early errors](https://thepracticaldev.s3.amazonaws.com/i/vrnymlunrzky076yu4yb.png)

# What is it good for?
`const`, like `var` and `let`, gives the ability to encapsulate, manipulate, share, and hide data in boxes within my JavaScript.

But unlike `var`, `const` restricts access to my box to the to the nearest enclosing **lexical environment**, not merely the closest function, and so `const` really shines at **close-quarters data management**.

In JavaScript, functions have lexical environments, but so do **blocks**, and this ability to reduce the scope of a variable and hide my data even from the nearest enclosing function is where the strength of `const` lies.

With `const`, unlike `let` and `var`, my box is **initialized with a value and can never be re-assigned**, making it a great tool to employ in an immutable approach to state management. The string "const" in English is highly associated with the word _constant_, and so `const` in JavaScript helps communicate to my reader that neither the _meaning_ of this variable nor its _value_ will ever change.

<!--
```javascript
function f() {
  /**
   * Neither the meaning nor the value of `MY_CATS`
   * ever changes as our program runs.
   *
   * `const` is perfect for communicating this intent
   * at the outset, and combining it with
   * SCREAMING_SNAKE_CASE helps us remember that
   * something about this variable is "constant".
   */
  const MY_CATS = ["Fred"];

  return `These are my cats: ${MY_CATS}.`;
}
```
-->
![Const is better for communicating bindings that keep their meanings and values throughout my program](https://thepracticaldev.s3.amazonaws.com/i/z74zv6qd847e3k32i7go.png)

And since [functions inherit the environment of their parents](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-function-objects) thanks to closure, a function nested within such a block can access the `const` (and `var` and `let`) bindings of their parent scopes, but not vice-versa.
<!--
```javascript
const w = 40;
function f() {
  const x = w + 1; // accessing `w` from global scope

  {
    const y = x + 1; // accessing `x` from scope of `f`
    g(); // accessing `g` from scope of anonymous block

    function g() {
      const z = 42;

      if (z) {
        const a = `${z} cats`;

        // accessing `w` from global scope
        // accessing `x` from scope of `f`
        // accessing `y` from scope of anonymous block
        // accessing `z` from scope of `g`
        // accessing `a` from scope of `if` block
        alert(`${z} is greater than ${w}, ${x}, and ${y},` +
             ` but ${a} is greater still.`);
      }
    }
  }

  a; // Run-time: ❌Uncaught ReferenceError: a is not defined
  g; // Run-time: ❌Uncaught ReferenceError: g is not defined
  z; // Run-time: ❌Uncaught ReferenceError: z is not defined
  y; // Run-time: ❌Uncaught ReferenceError: y is not defined
  x; // 👍
  w; // 👍
}
```
-->
![Showcasing the behavior of const with respect to nested scopes](https://thepracticaldev.s3.amazonaws.com/i/7if6utshxfsotdrbioa2.png)


# When should I use something else?
Sometimes, I want a box that will hold different things as my program executes, like as a counter or a flag. `const` forbids re-assignments, and so it will not work for this use case. I must use `var` or `let` instead.
<!--
```javascript
function f() {
  const myMoney = 41;

  // Run-time: ❌Uncaught TypeError: Assignment to constant variable.
  myMoney++;
}
```
-->
![Const cannot be used when re-assignment is needed](https://thepracticaldev.s3.amazonaws.com/i/bbypp81qq2w6xgtrsiqg.png)

Sometimes, I need to manage state that is accessible across an entire function of decent size, not just a short block of code. Since `const` scopes my data to the nearest lexical environment, it will work for this purpose, but it communicates the wrong thing to my readers and so it's not the best tool for this job. In this situation, `var` is better.
<!--
```javascript
function f() {
  /**
   * This works, but since we clearly intend our data to
   * to be used all throughout the function, or at least
   * to be available at the beginning and the end, `var`
   * would be a better choice to communicate our intent.
   */
  const x = 42;

  /* ... so ... */
  /* ... much ... */
  /* ... code ... */

  alert(`${x} is always the answer.`);
}
```
-->
![Var is better that const for function-wide state management](https://thepracticaldev.s3.amazonaws.com/i/yphs9cuu8508b5a6fzzv.png)

Sometimes, I want a name that always means exactly one thing, but whose bound value may evolve throughout my program. Since `const` prevents re-assignments but doesn't care about changes to inherently mutable values, it will work for this purpose, but it communicates the wrong thing to my readers.

Something that changes is not constant, and the strong association of `const` to the word _constant_ makes it misleading in this context. For this situation, I prefer employing `var` or `let` in combination with [SCREAMING_SNAKE_CASE](https://en.owl.institute/javascript-fundamentals/javascript-the-first-step-is-the-easiest/identifying-good-identifiers-constants-in-screaming_snake_case) to communicate to readers that I intend the _meaning_ to remain constant, but the exact _value_ may vary.
<!--
```javascript
function f() {
  /**
   * This works, but since the value of `MY_CATS` can change,
   * `const` is misleading to my readers and can lead to bugs.
   * Using `var` or `let` is better, and I would tend towards
   * `var` since `MY_CATS` manages function-level state.
   */
  const MY_CATS = ["Fred"];

  if (todayIsPayday()) {
    MY_CATS.push(adoptNewCat());
  }

  return `These are my cats: ${MY_CATS}.`;
}
```
-->
![Var and let are better for values that may change throughout your program](https://thepracticaldev.s3.amazonaws.com/i/9ir9b29ulcul9h8r9408.png)

Using `const` **inappropriately** can hurt the readability and maintainability of my code because I'm communicating the wrong thing and not encapsulating my data as well as I could be.

To learn how to communicate better in my code, I dove into the other tools available and wrote about what I found:

{% link https://dev.to/daniel13rady/using-js-var-5kp %}
{% link https://dev.to/daniel13rady/using-js-let-1k81 %}

# So when _should_ I use it?
The reason to use `const` isn't to declare constant _values_, it's to declare constant _bindings_.

Sometimes, I want to give a name that never changes meaning, to a value that never changes. **No single construct in JavaScript can enforce this.** The best I can do is communicate my intent clearly and leverage the tools available on a case-by-case basis.

In these situations I prefer using `const` in combination with SCREAMING_SNAKE_CASE for communicating, "This is a constant, and will never change in meaning or value over the course of this block." I find the association with the word _constant_ overpowers everything else about `const`, and so I don't tend to use it for any other purpose.

The block could be something like an `if` statement, `for` loop, or even an anonymous block; one of the main values of `const` is in keeping variables close to where they are used without exposing them to the wider world of the enclosing function.

If a function definition is particularly short, say only two or three lines long, and my other criteria hold true, I may prefer to use a `const`, but the value of such a short-lived `const` is highly context-specific. In this case the value of `const` over `var` and `let` is entirely in what it communicates to my readers: this variable is short-lived and it never changes, you can forget about it soon and be at peace :relieved:.

---

_Every tool has its use. Some can make your code clearer to humans or clearer to machines, and some can strike a bit of balance between both._

_"Good enough to work" should not be "good enough for you." **Hold yourself to a higher standard**: learn a little about a lot and a lot about a little, so that when the time comes to do something, you've got a fair idea of how to do it well._
