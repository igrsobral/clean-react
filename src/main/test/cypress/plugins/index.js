const cypressTypeScript = require('./cy-ts-preprocessor');

module.exports = on => {
    on('file:preprocessor', cypressTypeScript)
}