import AuthService from '../service/authService';

//const AuthService = require('../service/authService');

module.exports = (router) => {
router.post('/register', AuthService.register);
router.post('/login', AuthService.login);
router.post('/logout', AuthService.logout);
router.get('/getUser', AuthService.getUser);
router.get('/getAllUser', AuthService.getAllUser);


return router;
}