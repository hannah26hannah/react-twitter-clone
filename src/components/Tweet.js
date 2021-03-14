import { dbService, storageService } from 'fBase';
import React, { useState } from 'react';

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onChangeEdit = (e) => {
        const {target: { value }} = e;
        setNewTweet(value);
    }
    const toggleEditing = () => {
        setEditing((prev) => !prev)
    }
    const onDeleteClick = async (e) => {
        const ok = window.confirm('Are you sure you want to delete this tweet?')
        
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            if (tweetObj.attachmentUrl !== '') {
                await storageService.refFromURL(tweetObj.attachmentUrl).delete();
            }
            
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({text: newTweet});
        setEditing(false);
    }

    return (
        <div className='tweet'>
            {editing ?
            <>
                <form onSubmit={onSubmit} className='container tweetEdit'>
                    <input type='text' placeholder='Edit Your Tweet' value={newTweet} required onChange={onChangeEdit} className='formInput' />
                    <input type='submit' value='Update' className='formBtn' />
                </form>
                <button onClick={toggleEditing} className='formBtn cancelBtn'>Calcel</button>
            </> :
            <>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && (
                    <img src={tweetObj.attachmentUrl} alt='Profile' width='50px' height='50px' />
                )}
                {isOwner && 
                <>
                    <button onClick={toggleEditing}>Edit Tweet</button>
                    <button onClick={onDeleteClick}>Delete Tweet</button>
                </>}
            </>
            }
        </div>)
}

export default Tweet;