module.exports = {
    bail: 1,
    browser: false,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    moduleNameMapper: {
        '@src(.*)$': '<rootDir>/src$1',
        '@utils(.*)$': '<rootDir>/src/utils$1',
    },
};
