import { useState, useEffect, useCallback } from 'react';
import config from '../../config.json';

export const useLogin = () => {
  var url = [
    config.urlApi,
    'login'
  ];
  
  const getLoginUrl = url.join('/');
  const [login, setLogin] = useState({});
  
  const ftc = useCallback(async () => {
    return await fetch(getLoginUrl).then(data => {
      return data.json();
    });
  }, [getLoginUrl]);

  useEffect(() => {
    if(!Object.values(login).length){
      ftc().then(data => {
        if(data.status == 'success'){
          console.log(getLoginUrl, data);
          setLogin(data);
        }
      });
    }
  }, [login, ftc]);

  return {login};
};