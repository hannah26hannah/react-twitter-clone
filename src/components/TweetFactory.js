import React, { useState } from 'react';
import { dbService, storageService } from 'fBase'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [attachment, setAttachment] = useState('');
    const [error, setError] = useState('');

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
        setError('');
    }

    const onChange = (e) => {
        setError('');
        const {target: { value }} = e;
        setTweet(value);
    }
    const onKeyUp = (e) => {
        const {target: { value }} = e;
        if (value.length >= 120) {
            setError('120자 이내로 작성해주세요.')
        }
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
        <form onSubmit={onSubmit} className='factoryContainer'>
            <section className='factoryInput__container'>
                <input type='text' placeholder="What's on Your Mind?" value={tweet} maxLength={120}  onKeyUp={onKeyUp} onChange={onChange} className='factoryInput' />
                {error && <span className='error'>{error}</span>}
                <input type='submit' value='Tweet' className='factoryInput submitBtn'/>
            </section>
            <section className='factoryAttachment__container'>
                <input id='attach-file' type='file' accept='image/*' onChange={onFileChange} />
                <label htmlFor='attach-file'><FontAwesomeIcon icon={faPlus} />Add Photo</label>
                {attachment &&
                <>
                    <img src={attachment} alt='Profile' width='50px' height='50px' className='attachmentImg' />
                    <button onClick={onClearAttachement} className='factoryInput attachmentClear'>Clear Photo</button>
                </>}
            </section>
        </form>
    )
}

export default TweetFactory;