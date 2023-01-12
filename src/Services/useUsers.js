import { useState, useEffect } from 'react';

export const useUsers = () => {
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1
  // https://api.cultivo.soulseeds.com.br/growths/get.php?userId=1&growthId=9

  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9
  // https://api.cultivo.soulseeds.com.br/plants/get.php?growthId=9&plantId=25
  
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25
  // https://api.cultivo.soulseeds.com.br/points/get.php?plantId=25&pointId=133
  const getUserUrl = "https://growcalendar.soulseeds.com.br/public_html/api/users/1";
  // const getUserUrl = "http://localhost:8080/public_html/api/users/1";
  const [user, setUser] = useState({});
  
  const ftc = async () => {
    return await fetch(getUserUrl).then(data => {
      return data.json();
    });
  };

  useEffect(() => {
    if(!Object.values(user).length){
      ftc().then(data => {
        if(data.status){
          setUser(data.data);
        }
      });
    }
  }, [user]);

  return {user};
};