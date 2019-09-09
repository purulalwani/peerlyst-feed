import FollowService from '../service/followService';



module.exports = (router) => {
router.post('/tags', FollowService.followTags);
router.post('/user', FollowService.followUser);


return router;
}