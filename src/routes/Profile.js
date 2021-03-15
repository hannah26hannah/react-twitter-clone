import { authService } from 'fBase';
import React, { useState } from 'react';
import { useHistory } from 'react-router';


const Profile = ({ userObj, refreshuser, setIsLoggedIn }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : '');
    const [error, setError] = useState('');

    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
        setIsLoggedIn(false);
    }
     // useEffect(() => {
    //     getMyTweets();
    // }, [])

    // const getMyTweets = async () => {
    //     await dbService.collection('tweets')
    //     .where('creatorId', '==', userObj.uid)
    //     .orderBy('createdAt', "desc")
    //     .get();
    // }

    const onChange  = (e) => {
        const { target: { value } } = e;
        setNewDisplayName(value.trim()) ;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newDisplayName === '') {
            setError('Name can\'t be empty');
            return
        }
        if (userObj.displayName !== newDisplayName) {
            try {
                await userObj.updateProfile({
                    displayName: newDisplayName
                });
                refreshuser();
            } catch (err) {
                console.log(err)
            }
        }
        
    }

    
    return (
    <main className='profileWrapper wrapper'>
        <form onSubmit={onSubmit}>
            <input type='text' placeholder='Display Name' value={newDisplayName} onChange={onChange} className='factoryInput' />
            <input type='submit' value='Update Profile' className='factoryInput submitBtn'/>
            {error && <span className='error'>{error}</span>}
        </form>
        <button className='profileBtn' onClick={onLogOutClick}>Log Out</button>
    </main>)
} 
export default Profile;
