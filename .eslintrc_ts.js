module.exports = {

    extends: "tslint:latest",

    root: true,

    "parser": "@typescript-eslint/parser",

    env: {
        browser: true
    },

    "plugins": [
        "@typescript-eslint",
        "jsdoc"
    ],

    rules: {
        "ordered-imports": false,
        "interface-name": [false, "always-prefix"],
        "object-literal-sort-keys": false,
        "member-access": false,
        "arrow-parens": false,
        "space-before-function-paren": [true, {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }]
    }
};