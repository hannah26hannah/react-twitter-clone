import { authService } from 'fBase';
import React, { useState } from 'react';
import { useHistory } from 'react-router';


const Profile = ({ userObj, refreshuser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
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
        setNewDisplayName(value) ;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshuser();
        }
    }

    

   

    return (
    <>
        <form onSubmit={onSubmit}>
            <input type='text' placeholder='Display Name' value={newDisplayName} onChange={onChange} />
            <input type='submit' value='Update Profile' />

        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>)
} 
export default Profile;
