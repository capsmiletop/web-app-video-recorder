/**
 * @file main.js
 * @since 2.2.0
 */

const path = require('path');
const webpack = require('webpack');
const banner = require('./banner');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '..', '..');

// copy fonts, Vercel/static entry (dist has no index.html without this)
let copyFontsPlugin = new CopyWebpackPlugin({
    patterns: [
        {
            from: 'src/fonts/*',
            to: 'fonts/[name][ext]',
            globOptions: {
                dot: false,
                ignore: ['**/*.json', '**/*.md']
            }
        },
        {
            from: 'site/index.html',
            to: 'index.html'
        }
    ]
});

module.exports = {
    entry: {
        code: {
            import: path.join(rootDir, 'src', 'js', 'videojs.record.js'),
            filename: 'videojs.record.js'
        },
        style: {
            import: path.join(rootDir, 'src', 'css', 'videojs.record.scss')
        }
    },
    output: {
        path: path.join(rootDir, 'dist'),
        library: 'VideojsRecord'
    },
    plugins: [
        banner.libBanner,
        copyFontsPlugin
    ]
};
