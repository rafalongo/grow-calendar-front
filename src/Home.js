import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import Growth from './Growth';
import { useUsers } from "./Services/useUsers"

function Home() {
    const { user } = useUsers();
    const [ userId, setUserId ] = useState('');
    const [ userName, setUserName ] = useState('');
  
    useEffect(() => {
        if(Object.values(user).length && userName === ''){
            setUserId(user.user_id);
            setUserName(user.user_name);
        }
    }, [user, userName]);
  
    return (
        <Growth userId={userId} userName={userName} />
    );
}

export default Home;

