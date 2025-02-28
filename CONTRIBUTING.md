# Contributing to Allen Institute for Cell Science Open Source

Thank you for your interest in contributing to this Allen Institute for Cell Science open source project! This document is
a set of guidelines to help you contribute to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of
Conduct][code_of_conduct].

[code_of_conduct]: CODE_OF_CONDUCT.md

## Project Documentation

The `README` in the root of the repository should contain or link to
project documentation. If you cannot find the documentation you're
looking for, please file a GitHub issue with details of what
you'd like to see documented.

## How to Contribute

Typical steps to contribute:

1. Fork the repo on GitHub.

2. Create a branch and make your edits on your branch, pushing back to your fork.

3. Ensure that your changes are working, pass any linting and tests in the project. Add tests and documentation as needed.

4. Submit a pull request to merge your fork's branch into this repository, via GitHub.

## Running locally 

### install Bun 
1. [Instructions](https://bun.sh/docs/installation) 
2. In this repo: `bun install`

### Locally link the viewer (for testing new changes to the viewer, or debugging)
1. clone the [viewer repo](https://github.com/simularium/simularium-viewer) 
1. cd into the viewer repo 
1. build the viewer: `npm run build`
2. type `cat package.json`
3. then `bun link`
4. cd back to this repo
5. type `bun link @aics/simularium-viewer`

### Start the dev server
1. type `bun dev` <= starts the server
2. Open at http://localhost:5173/

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Production deployment
1. Make a new version: `npm version [patch/minor/major]`
2. Push the new package.json version: `git push origin main`
3. Push the new tag: `git push origin [NEW_TAG]`



## Questions or Thoughts?

Talk to us on [one of our community forums][community].

[community]: https://forum.allencell.org/
