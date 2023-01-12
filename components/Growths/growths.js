import { useState } from 'react';
import Plants from '../Plants';
import { useGrowths } from './useGrowths';
import classes from './growths.module.css';

/**
* @param {Object} props 
*/

 const Growths = props => {
    const { } = props;

    const [growth, setGrowth] = useState(null);
    
    const { growths } = useGrowths();

    const cultivos = () => {
        if(growths?.data){
            return growths.data.map((item, i) => {
                return (
                    <option key={i} value={item.growth_id}>
                        {item.growth_name}
                    </option>
                )
            });
        }
    };

    return (
        <main className={classes.growths}>
            <h2>{'Todos os Cultivos'}</h2>
            <select onChange={(sel) => {setGrowth(sel.target.value)}}>
                <option value={''}>{'Selecione um cultivo'}</option>
                {cultivos()}
            </select>

            <Plants growthId={growth} />
        </main>
    );
}

export default Growths;
