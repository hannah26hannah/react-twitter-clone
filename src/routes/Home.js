import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';


const Home = () => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const getTweets = async () => {
        const dbTweets = await dbService.collection('tweets').get(); 
        dbTweets.forEach((doc) => {
            setTweets((prev) => [doc.data(), ...prev]);
        })
    }

    useEffect(() => {
        getTweets();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection('tweets').add({
            tweet: tweet,
            createdAt: Date.now()
        })
        setTweet('');
    }
    const onChange = (e) => {
        const {target: { value }} = e;
        setTweet(value);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="What's on Your Mind?" value={tweet} maxLength={120} onChange={onChange} / >
                    <input type='submit' value='tweet' />
            </form>

        </div>
    )
}
export default Home;
