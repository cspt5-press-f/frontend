/* config-overrides.js */

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
            limit: false
        }
    });
    return config;
};
