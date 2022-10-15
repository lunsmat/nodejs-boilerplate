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
                '@prisma': './src/prisma',
                '@controllers': './src/controllers',
                '@middlewares': './src/middlewares',
                '@resources': './src/resources',
                '@services': './src/services',
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts',
        '**/*.test.ts'
    ]
};
