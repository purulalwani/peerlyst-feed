import TagsService from '../service/tagsService';

//const TagsService = require('../service/tagsService');

module.exports = (router) => {
router.post('/addTags', TagsService.addTags);
router.get('/searchTags', TagsService.searchTags);


return router;
}