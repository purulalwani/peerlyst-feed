import PostService from '../service/postService'

//const PostService = require('../service/postService');

module.exports = (router) => {
router.post('/addPost', PostService.addPost);
router.get('/getPost', PostService.getPost);

router.get('/getFeed', PostService.getFeed);


return router;
}