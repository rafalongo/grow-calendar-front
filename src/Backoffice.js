import React, { useEffect, useState } from 'react';
import Growth from './Growth';
import { useUsers } from "./Services/useUsers"

export default function Backoffice() {
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
        <form action="http://cultivo.soulseeds.com.br/editplant.php" method="post">
            <input type="hidden" name="growth_status" value="1" />
            <input type="hidden" name="growth_current" value="1" />
            <input type="hidden" name="user_id" value="1" />
            
            <div>
                <label>Nome:</label>
                <div><input type="text" name="growth_name" /></div>
            </div>


            <input type="hidden" name="growth_id" value="" />
            <div>
                <label>Planta:</label>
                <div><input type="text" name="plant_strain" /></div>
            </div>
            <div>
                <label>Vasos:</label>
                <div><input type="number" name="plant_pots" /></div>
            </div>
            <div>
                <label>Início:</label>
                <div><input type="date" name="plant_start_vega" /></div>
            </div>
            <div>
                <label>Vega:</label>
                <div><input type="number" name="plant_cycle_vega" /></div>
            </div>
            <div>
                <label>Flora:</label>
                <div><input type="number" name="plant_cycle_bloom" /></div>
            </div>
            <div>
                <label>Flora:</label>
                <div><textarea name='plant_details'></textarea></div>
            </div>
        </form>
    );
}
