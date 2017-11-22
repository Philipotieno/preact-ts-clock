# preact-ts-clock
Example of a clock component in Preact with TypeScript typings (`ClockPreact.tsx`). Also includes an equivalent one made without the use of a framework (`ClockRegular.ts`).

## Why?

I found it quite hard to initially set up Preact with proper TypeScript typings for all properties (as most examples I can find seem to avoid writing in all typings, and cheat a bit with those for their state & props), but this repository should provide a good start. It was written in a bit of a rush – and littered with my comments for understanding Preact as a first-time adopter, which makes it messier than it has to be – but I hope that it proves somewhat useful at least for someone.

# Initial setup

In the root directory of the project, run:

`npm install`

... This will install all the dependencies.

# Building

In the root directory of the project, run:

* `npm run build-bundle` (to make the webpack source bundle), or:

* `npm run build-bundle-watch` (to continuously make the webpack source bundle in watch mode).

These also have corresponding commands to generate minified builds:

* `npm run build-bundle-minified`, and:

* `npm run build-bundle-minified-watch`

# Running

Simply open `index.xhtml` on your file system from your favourite web browser.

*(Your favourite web browser is **not** Internet Explorer).*
