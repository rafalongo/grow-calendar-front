import { useState, useEffect, useCallback } from 'react';

export const useGrowths = (userId) => {
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1&growthId=9

  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9
  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9&plantId=25
  
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25&pointId=133
  const getGrowthUrl = `http://api.cultivo.soulseeds.com.br/growths/get.php?userId=${userId}`;
  const [growths, setGrowths] = useState({});
  
  const ftc = useCallback(async () => {
    return await fetch(getGrowthUrl).then(data => {
      return data.json();
    });
  }, [getGrowthUrl]);

  useEffect(() => {
    if(!Object.values(growths).length){
      ftc().then(data => {
        if(data.success){
          setGrowths(data.data);
        }
      });
    }
  }, [growths, ftc]);

  return {growths};
};