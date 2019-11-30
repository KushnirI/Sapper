module.exports = {

    extends: "eslint:recommended",

    root: true,

    "parser": "babel-eslint",

    env: {
        browser: true
    },

    plugins: [],

    rules: {
        // Strict rules
        camelcase: 2,
        "new-cap": 2,
        "multiline-comment-style": [2, "bare-block"],
        "valid-jsdoc": [2, {
            requireReturn: false,
            requireParamDescription: false,
            requireReturnDescription: false

        }],
        "consistent-this": [2, "me"],
        quotes: [2, "double"],
        "quote-props": [2, "as-needed"],
        eqeqeq: 2,
        curly: 2,

        // Soft rules
        "max-params": [1, 5],
        "max-statements-per-line": ["error", {max: 1}],
        "no-alert": 1,
        "block-spacing": 1,
        /*"no-magic-numbers": 1,*/

        // Removed rules
        "no-undef": 0,
        "no-console": 0,
        "vars-on-top": 0,
    }
}