var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const utils = require('./../../shared/utils');
const User = require('./../../models/user.model');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).exec();
    if (!user) return res.sendStatus(401);
    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) return res.sendStatus(401);

    const { token, expiresIn } = utils.issueJWT(user);
    res.status(200).send({ success: true, token, expiresIn });
});

router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;
    const hashedPw = bcrypt.hashSync(password, 12);

    const newUser = new User({
        name,
        username,
        password: hashedPw,
        avatar: "https://admin.dircedecoracoes.com.br/assets/images/dashboard/man.png"
    });

    const userSaved = await newUser.save();
    if (!userSaved) res.json({ message: 'Ocorreu algum erro ao cadastrar o usuário!' });
    delete userSaved.password;
    res.json({ message: 'Usuário cadastrado com sucesso!', user: userSaved });
});

router.post('/logout', async (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
