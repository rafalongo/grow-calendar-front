import React, { useMemo, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import Plant from '../Plant';
import { useGrowths } from "../Services/useGrowths"
import classes from './growth.module.css';

/**
* @param {Object} props 
*/

const Growth = props => {
    const { userId, userName } = props;
    const { growths } = useGrowths(userId);
    const [ selectedGrowthId, setSelectedGrowthId ] = useState('0');
    
    const growthOptions = useMemo(() => {
        if(Object.values(growths).length){
            const gr = Object.values(growths).reverse();
            
            return gr.map(g => {
                return (
                    <option value={g.growth_id} key={g.growth_id}>{g.growth_name}</option>
                )
            });
        }

        return (
            <option value=""></option>
        );
    }, [growths]);

    // const currentGrowthId = useMemo(() => {
    //     console.log( "selectedGrowth", selectedGrowth );
    //     if(Object.values(growths).length){
    //         const gr = growths.filter(g => {
    //             if(selectedGrowth === '0'){
    //                 return g.growth_current === "1";
    //             }
    //             return g.growth_id === selectedGrowth;
    //         });

    //         return gr[0].growth_id;
    //     }
    // }, [growths, selectedGrowth]);

    useEffect(() => {
        if(Object.values(growths).length){
            const gr = growths.filter(g => {
                if(selectedGrowthId === '0'){
                    return g.growth_current === "1";
                }
                return g.growth_id === selectedGrowthId;
            });
            setSelectedGrowthId(gr[0].growth_id);
        }
    }, [growths, selectedGrowthId]);

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1 className={classes.title}>{`Bem vindo(a), ${userName}!`}</h1>
                {/* <div><Link to="/sobre">Sobre</Link></div> */}
                <select className={classes.growths} onChange={function(ev){
                    // console.log("EVEV",ev.target.value);
                    setSelectedGrowthId(ev.target.value);
                }}>
                    {growthOptions}
                </select>
            </header>
            
            <div className={classes.content}>
                <Plant growthId={selectedGrowthId} />
            </div>
        </div>
    );
}

export default Growth;
