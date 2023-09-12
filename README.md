# React app (Vite)

## Installation

```
yarn
```

## Running dev server

```
yarn start
```

This will start a local server listening for http requests on port 3000.

It will also ask your browser to open a tab to `http://localhost:3000/`

Any type-check and linting errors will appear in the browser and in the terminal output as you browse.

## Getting type-check and lint errors into vscode's problem list

Run the default build task in vscode using ctrl-shift-B (or mac: Cmd-shift-B)
This will run first type-checking and if that passes will then run eslint.
VSCode's problems list will be populated with errors from the first of those tasks to fail.

This is configured in .vscode/tasks.json

## Relaxing complains from ESLint

If you find lint is too strict, you can edit the rules section of [.eslintrc.cjs](.eslintrc.cjs).

## Building and previewing a static version of your app:

This process is normally performed automatically by a build&host service such as Netlify or Vercel.

However, you can [run it yourself](https://vitejs.dev/guide/static-deploy.html#building-the-app) to observe the outputs.

```
yarn build
```

This will bundle your many source files into very few in `dist/`, ready for deployment on a web server. As part of the process, it will convert your TypeScript files into JavaScript, using the TypeScript compiler, `tsc`.

If you've run a local build, you can start a local server to host those files, using:

```
yarn preview
```

## Automatic Deployment with Netlify

See [Netlify with Git](https://vitejs.dev/guide/static-deploy.html#building-the-app)
or more generally, ["Deploying a Static Site" in the Vite Guide](https://vitejs.dev/guide/static-deploy.html).

## Other scripts

See [package.json](package.json) for other scripts.

## Feature summary

-   React app (hot-reloaded when you make changes)
-   TypeScript
-   ESLint and custom config
-   Formatting with prettier
-   Testing with
    -   vitest (jest-equivalent) and
    -   react-testing-library
-   CI with GitHub Actions
-   vscode default build task configured (in tasks.json) to type-check and lint to problems list
-   vscode debugger launch config
-   Vite
    -   Type-checking and linting errors presented into the browser (vite-plugin-checker)
-   As little other junk as possible

## Attaching the vscode javascript debugger to your react app (in dev)

(This is meant as an optional alternative to the excellent chrome devtools.)

-   Start the dev server (e.g. yarn start)
-   In vscode, switch to the "Run and debug" tab from the side menu
-   At the top, click the green play button entitled "Launch Chrome against localhost"
    -   Browser should also launch, eventually
-   Add breakpoint(s) to your react code in vscode, or add the `debugger` keyword
-   Interact with the React app so that your breakpoints / `debugger` keyword are encountered.
-   vscode's debugger should now present you with the local variables, the call stack, etc.
-   Use the transport controls at the top to step through your code or continue execution

## Alternative to vite-plugin-checker

If you don't want to use vite-plugin-checker but you do want to get type-checking errors in the terminal, you can run dev and type-check at the same time by adding this script to package.json:

```
"dev-and-type-check": "npx concurrently 'vite --port 3000' 'tsc --noEmit --watch'"
```

## Misc notes on Vite

-   [Vite guide](https://vitejs.dev/guide/)
-   [About the `public` directory](https://vitejs.dev/guide/assets.html#the-public-directory)
-   [Vite powerful React project setup](https://dev.to/equiman/vite-powerful-react-project-g4m) (Camilo Martinez)
