import { useState, useEffect, useCallback } from 'react';
import config from '../../config.json';

export const useGrowths = (userId) => {
  var url = [
    config.urlApi,
    'growths'
  ];
  
  const getGrowthUrl = url.join('/');
  const [growths, setGrowths] = useState({});
  
  const ftc = useCallback(async () => {
    return await fetch(getGrowthUrl).then(data => {
      return data.json();
    });
  }, [getGrowthUrl]);

  useEffect(() => {
    if(!Object.values(growths).length){
      ftc().then(data => {
        if(data.status == 'success'){
          setGrowths(data);
        }
      });
    }
  }, [growths, ftc]);

  return {growths};
};