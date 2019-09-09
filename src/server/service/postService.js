import { Post, PostCrud } from '../model/post';



export default {

    addPost: async (req, res) => {

        let post = req.body;

        post.createdBy = req.session.user;

        //console.log("Post ->", post);

        let addPostResponse = await PostCrud.create(post);

        res.status(200).json({ status: 200, message: 'Post added successfully.' });


    },

    getPost: async (req, res) => {

        let getAllPostResponse = await Post.find()
        .sort({
            createdAt: 'desc'
        })
        .exec();

        //console.log("Post ->", getAllPostResponse);

        res.status(200).json({ status: 200, payload: getAllPostResponse });

    },

    getFeed: async (req, res) => {

        console.log("Req -> ", req.query);

        let pageSize = 10;
        let pageNo = parseInt(req.query.pageNo);
        let nextPostFollowedCount = parseInt(req.query.nextPostFollowedCount);
        let nextPostTypeACount = parseInt(req.query.nextPostTypeACount);
        let nextPostTypeBCount = parseInt(req.query.nextPostTypeBCount);
        let isNextPage = req.query.isNextPage == 'true'? true:false;

        let skipFollowed = 0;
        let skipTypeA = 0;
        let skipTypeB = 0;

        console.log("isNextPage -> ", isNextPage);

        
            skipFollowed = nextPostFollowedCount;
            skipTypeA = nextPostTypeACount;
            skipTypeB = nextPostTypeBCount;
        

        let maxRecord = pageSize;


        let user = req.session.user;

        
        let totalsFollowedPostPromise
            = Post.find(
                {
                    $or:
                        [{ tags: { $in: [...user.tagsFollowed] } },
                        { createdBy: { $in: [...user.usersFollowed] } }
                        ]
                })
                .limit(10)
                .skip(skipFollowed)
                .sort({
                    createdAt: 'desc'
                })
                .exec();

        let totalsTypeAPostPromise
            = Post.find(
                { postType: 'TypeA' })
                .limit(10)
                .skip(skipTypeA)
                .sort({
                    createdAt: 'desc'
                })
                .exec();

        let totalsTypeBPostPromise
            = Post.find(
                { postType: 'TypeB' })
                .limit(10)
                .skip(skipTypeB)
                .sort({
                    createdAt: 'desc'
                })
                .exec();

        let [totalsFollowedPost, totalsTypeAPost, totalsTypeBPost] =
            await Promise.all([totalsFollowedPostPromise,
                totalsTypeAPostPromise,
                totalsTypeBPostPromise]);

        
       

        let totalsFollowedPostFeed = [];
        let totalsTypeAPostFeed = [];
        let totalsTypeBPostFeed = [];

        let followedCount = 0;
        let typeACount = 0;
        let typeBCount = 0;
        let isNextEnabled = false;



        if ((totalsFollowedPost.length
            + totalsTypeAPost.length
            + totalsTypeBPost.length) > 10) {

            let isFollowedDone = false;
            let isTypeADone = false;
            let isTypeBDone = false;
            isNextEnabled = true;

            while (maxRecord > 0 && !(isFollowedDone && isTypeADone && isTypeBDone)) {

                console.log("Enter into while loop")
                if (!isFollowedDone) {
                    if (totalsFollowedPost && totalsFollowedPost.length < 6) {

                        isFollowedDone = true;
                        followedCount = totalsFollowedPost.length;
                        maxRecord = maxRecord - totalsFollowedPost.length;
                        console.log("totalsFollowedPost.length < 6", maxRecord, followedCount, isFollowedDone)

                    } else if (totalsFollowedPost && totalsFollowedPost.length >= 6 && totalsFollowedPost.length > followedCount)  {
                        if(followedCount > 0) {

                            followedCount = followedCount + 1;
                            maxRecord = maxRecord - 1;
                        } else {
                            followedCount = 6;
                            maxRecord = maxRecord - 6;
                            console.log("totalsFollowedPost.length >= 6 -> ", maxRecord, followedCount, isFollowedDone)
                        }
                        
                    } else {
                        isFollowedDone = true;
                        totalsFollowedPost = [];
                    }
                }

                console.log("Before Type A")

                if (!isTypeADone && maxRecord > 0) {
                    if (totalsTypeAPost && totalsTypeAPost.length < 2) {

                        isTypeADone = true;
                        typeACount = totalsTypeAPost.length;
                        maxRecord = maxRecord - totalsTypeAPost.length;
                        console.log("totalsTypeAPost.length < 2 -> ", maxRecord, typeACount, isTypeADone)

                    } else if (totalsTypeAPost && totalsTypeAPost.length >= 2 && totalsTypeAPost.length > typeACount)  {
                        if(typeACount > 0) {

                            typeACount = typeACount + 1;
                            maxRecord = maxRecord - 1;
                        } else {
                            typeACount = 2;
                            maxRecord = maxRecord - 2;
                        }
                        console.log("totalsTypeAPost.length >= 2 -> ", maxRecord, typeACount, isTypeADone)
                        
                    } else {
                        isTypeADone = true;
                        totalsTypeAPost = [];
                    }
                }

                console.log("Before Type B");
                if (!isTypeBDone && maxRecord > 0) {
                    if (totalsTypeBPost && totalsTypeBPost.length < 2 ) {

                        isTypeBDone = true;
                        typeBCount = totalsTypeBPost.length;
                        maxRecord = maxRecord - totalsTypeBPost.length;
                        console.log("totalsTypeBPost.length < 3 -> ", maxRecord, typeACount, isTypeADone)

                    } else if (totalsTypeBPost && totalsTypeBPost.length >= 2 && totalsTypeBPost.length > typeBCount) {
                        if(typeBCount > 0) {

                            typeBCount = typeBCount + 1;
                            maxRecord = maxRecord - 1;
                        } else {
                            typeBCount = 2;
                            maxRecord = maxRecord - 2;
                        }
                        console.log("totalsTypeBPost.length >= 2 -> ", maxRecord, typeACount, isTypeADone)
                    } else {
                        isTypeBDone = true;
                        totalsTypeBPost = [];
                    }
                }

            }

            console.log("Counts -> ", followedCount, typeACount, typeBCount);

            totalsFollowedPostFeed = totalsFollowedPost.slice(0, followedCount);
            totalsTypeAPostFeed = totalsTypeAPost.slice(0, typeACount);
            totalsTypeBPostFeed = totalsTypeBPost.slice(0, typeBCount);


        } else {
            totalsFollowedPostFeed = totalsFollowedPost;
            totalsTypeAPostFeed = totalsTypeAPost;
            totalsTypeBPostFeed = totalsTypeBPost;
            followedCount = totalsFollowedPost.length;
            typeACount = totalsTypeAPost.length;
            typeBCount = totalsTypeBPost.length;

        }

       


        let totalFeed = {
            totalsFollowedPost: {
                posts: totalsFollowedPostFeed,
                nextCount: nextPostFollowedCount + totalsFollowedPostFeed.length, 
            },
            totalsTypeAPost: {
                posts: totalsTypeAPostFeed,
                nextCount: nextPostTypeACount + totalsTypeAPostFeed.length, 
            },
            
            totalsTypeBPost: {
                posts: totalsTypeBPostFeed,
                nextCount: nextPostTypeBCount + totalsTypeBPostFeed.length, 
            },
            isNextEnabled: isNextEnabled,
        }


        console.log("Total Feed -> ", totalFeed);

       

        res.status(200).json({ status: 200, payload: totalFeed });



    },


}