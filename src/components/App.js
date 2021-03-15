import { useEffect, useState } from 'react';
import AppRouter from 'components/Router'
import { authService } from 'fBase';
import Footer from './Footer';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user)
                // setUserObj({
                //     displayName: user.displayName,
                //     uid: user.uid,
                //     updateProfile: (args) => user.updateProfile(args)
                // });
                setIsLoggedIn(true)
            } else {
                setUserObj(null)
            }
            setInit(true)
        })

        window.addEventListener('scroll', () => {
            console.log(window.scrollY)
        })
        
    }, [])

    const refreshuser = () => {
        const user = authService.currentUser;
        // setUserObj(Object.assign({}, user)); This will throw an error in Updating User Profile 
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args)
        });
    }
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userObj={userObj} refreshuser={refreshuser} /> : <h1 className='initial'>Initializing ...</h1>}
            <Footer />
        </>
    ) 
}

export default App