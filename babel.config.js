module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@app': './src/app',
                '@routes': './src/routes',
                '@controllers': './src/controllers',
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts',
        '**/*.test.ts'
    ]
};
