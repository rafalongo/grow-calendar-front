import React, { useEffect, useState } from 'react';
import { useUsers } from "../Services/useUsers"
import classes from './user.module.css';

/**
* @param {Object} props 
*/

const User = () => {
  const { user } = useUsers();

  const [ name, setName ] = useState('');
  
  useEffect(() => {
    if(Object.values(user).length && name === ''){
      console.log(user);
      setName(user.user_name);
    }
  }, [user, name]);
  
  return (
    <div className={classes.user}>
      {name}
    </div>
  );
}

export default User;
