export default {
	testEnvironment: 'node',
	injectGlobals: true,
	transform: {
		'^.+\\.(js|mjs|cjs)$': ['@swc/jest'],
	},
	setupFilesAfterEnv: ['./tests/setup.js'],
};
