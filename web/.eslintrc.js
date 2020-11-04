module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "@vue/airbnb",
    ],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
		"indent": [
			"error",
			"tab"
		],
		"no-tabs": [
			"error",
			{ allowIndentationTabs: true }
		],
		"no-restricted-syntax": 0,
		"no-underscore-dangle":  0,
		"no-restricted-globals": 0,
		"no-console": 0,
		"no-alert": 0,
		"guard-for-in": 0,
		"no-plusplus": [
			"error",
			{ "allowForLoopAfterthoughts": true }
		],
		"arrow-body-style": 0
    },
};
