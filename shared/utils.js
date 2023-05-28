const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
// Importante mover a chave privada para fora do projeto e acessá-la a partir desse local
const pathToKey = path.join(__dirname, '../auth', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const token = 'Bearer ' + jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

    return { token, expiresIn };
}

/**
 * This function only resume the passport.authenticate method
 * password in the database, the salt and hash are stored for security
 */
function authenticate() {
    return passport.authenticate('jwt', { session: false });
}


module.exports.issueJWT = issueJWT;
module.exports.authenticate = authenticate;