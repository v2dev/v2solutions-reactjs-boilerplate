# React Boilerplate

React Boilerplate with auth and Crud operation using api with webpack and used redux for state management.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Changes](#Changes)

## Prerequisites

List any software, tools, or dependencies needed to run the project.

- Node.js (version 12.x.x)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/v2shashikant/react-boilerplate.git

cd react-boilerplate

npm install
# or
yarn install
```
## Usage

2. Explain how to run the project locally.

```bash
npm start
# or
yarn start
```

## Changes
 # migration approach
  # Intent: The boiler plate code is developed using Javascript. To get most benefits of Typescript, this project to be converted/upgraded to Typescript
  # Action: The below actions being performed for the Intent:
1. Update to react 18(latest version by Feb.2024) and other relative libraries. e.g. react-router, dom etc
2. tsconfig.json file setup with essential rules setup
3. Convert files from .js/.jsx to .ts/.tsx(resolve errors/imports etc)
4. Update webpackConfig to support TS (loader, test file, entry file etc.)
5. Update jest to setup with TS
6. Add rootReducer file - it has all reducers mentioned in it (Modular)
7. Update component code and introduced Typescript types wherever needed

# Blocker : There are two blockers as of now - Coverage and Test files as it kept out of scope for now.


