import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <div className='tweetContainer'>
                <form onSubmit={onSubmit} className='tweetEdit'>
                    <input type='text' placeholder='Edit Your Tweet' value={newTweet} required onChange={onChangeEdit} className='factoryInput editInput' />
                    <input type='submit' value='Update' className='factoryInput factorySubmit' />
                    <input type='reset' value='Cancel' onClick={toggleEditing} className='factoryInput factoryCancle' />
                </form>
                
                
            </div> :
            <div className='tweetContainer'>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && (
                    <img className='factoryImg' src={tweetObj.attachmentUrl} alt='Profile' width='50px' height='50px' />
                )}
                {isOwner && 
                <div className='factoryBtns'>
                    <button className='factoryBtn editBtn' onClick={toggleEditing} title='Edit Tweet'>
                        <FontAwesomeIcon icon={faEdit} /></button>
                    <button className='factoryBtn deleteBtn' onClick={onDeleteClick} title='Delete Tweet'>
                        <FontAwesomeIcon icon={faTrash} /></button>
                </div>}
            </div>
            }
        </div>)
}

export default Tweet;