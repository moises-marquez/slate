module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: `${__dirname}/tsconfig.jest.json`,
        },
    },
    moduleNameMapper: {
        '#lodash': 'lodash-es',
        '#components': `${__dirname}/src/components`,
        '#icons': `${__dirname}/src/icons`,
        '#lib': `${__dirname}/src/lib`,
        '#modules/(.*)': `${__dirname}/src/modules/$1`,
        '\\.(scss|svg)$': `${__dirname}/../../universalMock.js`,
    },
    preset: 'ts-jest',
    setupFiles: [`${__dirname}/../../mockRange.cjs`, 'jest-canvas-mock'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
