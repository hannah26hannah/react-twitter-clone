import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    const getMyTweets = async (e) => {
        await dbService.collection('tweets')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setTweets(tweetArray);
        })
    }

    useEffect(() => {
        getMyTweets()
    }, [])

    return(
        <main className='homeWrapper wrapper'>
            <TweetFactory userObj={userObj} />
            <section className='displayContainer'>
                {tweets.map(tweet => 
                    <Tweet tweetObj={tweet} key={tweet.id} isOwner={tweet.creatorId === userObj.uid} />
                )}
            </section>
        </main>
    )
}
export default Home;
