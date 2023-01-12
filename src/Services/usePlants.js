import { useState, useEffect, useCallback } from 'react';

export const usePlants = (growthId) => {
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1&growthId=9

  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9
  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9&plantId=25
  
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25&pointId=133
  const [plantUrl, setPlantUrl] = useState(`http://api.cultivo.soulseeds.com.br/plants/get.php?growthId=${growthId}`);
  const [pointUrl, setPointUrl] = useState([]);
  const [plants, setPlants] = useState({});
  const [points, setPoints] = useState({});

  useEffect(() => {
    setPlantUrl(`http://api.cultivo.soulseeds.com.br/plants/get.php?growthId=${growthId}`);
  }, [growthId]);

  useEffect(() => {
    if(plants.length){
      const url = plants.map(p => {
        return `http://api.cultivo.soulseeds.com.br/points/get.php?plantId=${p.plant_id}`;
      });
      setPointUrl(url);
    }
  }, [plants]);
  
  const ftc = useCallback(async () => {
    return await fetch(plantUrl).then(data => {
      return data.json();
    });
  }, [plantUrl]);

  const ftc2 = useCallback(async (url) => {
    return await fetch(url).then(data => {
      return data.json();
    });
  }, []);

  useEffect(() => {
    ftc().then(data => {
      if(data.success){
        setPlants(data.data);
      }
    });
  }, [plantUrl, ftc]);

  useEffect(() => {
    var obj = {};

    pointUrl.map(u => {
      return ftc2(u).then(data => {
        if(data.success){
          data.data.forEach(p => {
            obj[p.point_id] = p;
          });
          setPoints(obj);
        }
      });
    });
  }, [pointUrl, ftc2]);

  return {plants, points};
};