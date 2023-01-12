import { useState, useEffect } from 'react';
import { usePlants } from './usePlants';
import classes from './plants.module.css';

/**
* @param {Object} props 
*/

 const Plants = props => {
    const { growthId } = props;

    const { plants } = usePlants(growthId);

    const plantas = () => {
        if(plants?.data){
            return plants.data.map((item, i) => {
                return (
                    <div key={i}>
                        <h3><a href={`/growth/${item.plant_id}`}>{item.plant_strain}</a></h3>
                        <ul>
                            {Object.keys(item).map((x, y) => {
                                return (
                                    <li key={y}>{`${x}: ${Object.values(item)[y]}`}</li>
                                );
                            })}
                        </ul>
                    </div>
                )
            });
        }
    };

    return (
        <main className={classes.plants}>
            <h2>{'Todas as Plantas'}</h2>

            <div>
                {plantas()}
            </div>
        </main>
    );
}

export default Plants;
