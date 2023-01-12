import { useState, useEffect, useCallback } from 'react';
import config from '../../config.json';

export const usePlants = (growthId) => {
  var url = [
    config.urlApi,
    'plants'
  ];

  if(growthId){
    url.push(growthId);
  }

  const getPlantUrl = url.join('/');
  const [plants, setPlants] = useState({});
  
  const ftc = useCallback(async () => {
    return await fetch(getPlantUrl).then(data => {
      return data.json();
    });
  }, [getPlantUrl]);

  useEffect(() => {
    ftc().then(data => {
      if(data.status == 'success'){
        setPlants(data);
      }
    });
  }, [growthId, ftc]);

  return {plants};
};