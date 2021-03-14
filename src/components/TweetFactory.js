import React, { useState } from 'react';
import { dbService, storageService } from 'fBase'
import { v4 as uuidv4 } from 'uuid';

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const res = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await res.ref.getDownloadURL();   
        }
        const tweetObj = {
            text: tweet,
            creatorId: userObj.uid,
            createdAt: Date.now(),
            attachmentUrl
        }

        await dbService.collection('tweets').add(tweetObj);
        setTweet('');
        setAttachment('');
    }

    const onChange = (e) => {
        const {target: { value }} = e;
        setTweet(value);
    }

    const onFileChange = (e) => {
        const {target: { files }} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : { result }} = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachement = () => {
        setAttachment('');
    }
    return (
        <form onSubmit={onSubmit}>
                <input type='text' placeholder="What's on Your Mind?" value={tweet} maxLength={120} onChange={onChange} />
                <input type='file' accept='image/*' onChange={onFileChange} />

                <input type='submit' value='tweet' />
                {attachment && <div>
                    <img src={attachment} alt='Profile' width='50px' height='50px' />
                    <button onClick={onClearAttachement}>Clear Photo</button>
                </div>
                }
        </form>
    )
}

export default TweetFactory;