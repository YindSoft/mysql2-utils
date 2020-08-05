module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "globals": {
        "workers": true,
        "cache": true,
        "cluster": true
    },
    "rules": {
        "no-unused-vars": [
            "error"
        ],
        "space-before-blocks": [
            "error"
        ],
        "object-curly-spacing": [
            "error", "always"
        ],
        "keyword-spacing": [
            "error"
        ],
        "space-infix-ops": [
            "error"
        ],
        "curly": [ // no permitir if de una linea sin llave
            "error"
        ],
        "no-var": [
            "error"
        ],
        "yoda": [
            "error"
        ],
        "no-console": [
            "off"
        ],
        "no-case-declarations": [
            "error"
        ],
        "no-useless-escape": [
            "error"
        ],
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-multi-str": [
            "error"
        ],
        "no-lonely-if": [
            "error"
        ],
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 2,
                "maxEOF": 1
            }
        ],
        "nonblock-statement-body-position": [
            "error",
            "below"
        ],
        "func-call-spacing": [
            "error",
            "never"
        ],
        "no-const-assign": [
            "error"
        ],
        "linebreak-style": [
            "off"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};