[![Build Status](https://travis-ci.com/str1x/gumiho.svg?branch=master)](https://travis-ci.com/str1x/gumiho)
[![Coverage Status](https://coveralls.io/repos/github/str1x/gumiho/badge.svg?branch=master)](https://coveralls.io/github/str1x/gumiho?branch=master)

# gumiho
Experimental client-server store [IN DEV]

## commands
 - `npm run build:dev` builds bundle in development mode
 - `npm run test` runs once all tests
 - `npm run test:watch` runs all tests in watch mode
 - `npm run lint` runs eslint

## how to start
1. Run `npm install`
2. Configure your editor for linting typescript code. For vscode recommended use plugin https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
    and setup validation for typescript in vscode config 
    ```json
        "eslint.validate": [
            ...
            {
                "language": "typescript",
                "autoFix": false,
            }
        ]
    ```
3. For running test use `npm run test:watch`. For vscode recommended use plugin https://marketplace.visualstudio.com/items?itemName=orta.vscode-jest

## TODO:
 - Create docker container for developing
 - Create documentation server
