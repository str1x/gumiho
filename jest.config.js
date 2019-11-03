module.exports = {
    bail: 1,
    browser: false,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/*.ts',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageReporters: ['text-lcov'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tests/tsconfig.json'
        }
    }
};
