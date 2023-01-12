import React, { useMemo, useState } from 'react';
import Moment from 'moment';
import Period from '../Period';
import { usePlants } from "../Services/usePlants"
import classes from './plant.module.css';

/**
* @param {Object} props 
*/

const Plant = props => {
    const { growthId } = props;
    const { plants, points } = usePlants(growthId);
    const [ id, setId ] = useState('0');

    const separateDate = (date) => {
        let dateObj = {day: 1, month: 0, year: 1980};
        let dateSep = date.split('-');

        dateObj['day'] = parseInt(dateSep[2]);
        dateObj['month'] = (parseInt(dateSep[1]) - 1);
        dateObj['year'] = parseInt(dateSep[0]);

        return dateObj;
    };

    const plantsMenu = useMemo(() => {
        if(Object.values(plants).length){
            return plants.map(p => {
                var activeClass = 'non_active';
                if(id === p.plant_id){
                    activeClass = 'active';
                }

                return (
                    <dd className={classes[activeClass]} key={p.plant_id} onClick={function(){
                        setId(p.plant_id);
                    }}>{p.plant_strain}</dd>
                )
            });
        }
    }, [plants, id]);

    const allPlants = useMemo(() => {
        if(Object.values(plants).length){
            return plants.map((p, i) => {

                var plantPoints = [];
                Object.values(points).forEach(pp => {
                    if(pp.plant_id === p.plant_id){
                        plantPoints.push(pp);
                    }
                });

                const listPoints = plantPoints.map((pl, i) => {
                    const pointData = Moment(pl.point_data)
                    const pointClass = (
                        i % 2 ? classes.odd : classes.even
                    );

                    return (
                        <li className={pointClass} key={pl.point_id}>
                            <strong>{`${pointData.format('DD/MM/YYYY')}:`}</strong>
                            <span>{pl.point_title}</span>
                        </li>
                    );
                });

                const start = separateDate(p.plant_start_vega);

                var moment = Moment();
                    moment.set('year', start.year);
                    moment.set('month', start.month);
                    moment.set('date', start.day);
                
                const cycleVegaDays = parseInt(p.plant_cycle_vega);
                const cycleBloomDays = parseInt(p.plant_cycle_bloom);
                const startVegaDate = moment.format('DD/MM/YYYY');
                const startBloomDate = moment.add(cycleVegaDays, 'days').format('DD/MM/YYYY');
                const startHarvestDate = moment.add((cycleBloomDays-1), 'days').format('DD/MM/YYYY');
                const finishDate = moment.add(14, 'days').format('DD/MM/YYYY');

                const today = Moment();
                const from = today.diff(p.plant_start_vega, 'days') + 1;

                const startBloom = (date, days) => {
                    var start = date.split('-');
                    var bloom = new Date(start[0], (start[1] - 1), start[2]);
                        bloom.setDate(bloom.getDate() + parseInt(days));
                    var startBloom = [bloom.getFullYear(), (bloom.getMonth() + 1), bloom.getDate()].join('-');
                    
                    return startBloom;
                };

                const contentClasses = [classes.content].join(' ');
                
                if(id === '0'){
                    if(i === 0){
                        return (
                            <div key={i} className={contentClasses}>
                                <aside className={classes.sidebar}>
                                    <form action="http://cultivo.soulseeds.com.br/editplant.php" method="post" onSubmit={function(ev){
                                        ev.preventDefault();
                                        
                                        const update = {
                                            growth_id: ev.target.elements.growth_id.value,
                                            plant_id: ev.target.elements.plant_id.value,
                                            plant_strain: ev.target.elements.plant_strain.value,
                                            plant_pots: ev.target.elements.plant_pots.value,
                                            plant_start_vega: ev.target.elements.plant_start_vega.value,
                                            plant_cycle_vega: ev.target.elements.plant_cycle_vega.value,
                                            plant_cycle_bloom: ev.target.elements.plant_cycle_bloom.value,
                                            plant_details: ev.target.elements.plant_details.value
                                        };
                                        
                                        const options = {
                                            method: 'POST',
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Content-Type': 'application/json',
                                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                                                'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Requested-With'
                                            },
                                            body: JSON.stringify(update)
                                        };

                                        fetch(ev.target.action, options).then(data => {
                                            console.log(data);
                                            // if (!data.ok) {
                                            //     throw Error(data.status);
                                            // }
                                            // return data.json();
                                        }).then(update => {
                                            console.log(update);
                                        }).catch(e => {
                                            console.log(e);
                                        });

                                        console.log(options);
                                    }}>
                                        <input type="hidden" name="growth_id" value="10"/>
                                        <input type="hidden" name="plant_id" value="26"/>
                                        <dl className={classes.infos}>
                                            <dt>Nome:</dt>
                                            <dd><input type="text" name="plant_strain" defaultValue={p.plant_strain} /></dd>
                                            <dt>Total de vasos:</dt>
                                            <dd><input type="number" min="1" max="4" name="plant_pots" defaultValue={p.plant_pots} /></dd>
                                            <dt>Início:</dt>
                                            {/* <dd>{startVegaDate}</dd> */}
                                            <dd><input type="date" name="plant_start_vega" defaultValue={p.plant_start_vega} /></dd>
                                            <dt>Vega / Flora:</dt>
                                            <dd><input type="number" min="20" max="84" name="plant_cycle_vega" defaultValue={cycleVegaDays} /> / <input type="number" min="20" max="84" name="plant_cycle_bloom" defaultValue={cycleBloomDays} /> dias</dd>
                                            {/* <dd>{`${cycleVegaDays} / ${cycleBloomDays} dias`}</dd> */}
                                            <dt>Início Flora:</dt>
                                            <dd>{startBloomDate}</dd>
                                            <dt>Colheita:</dt>
                                            <dd>{startHarvestDate}</dd>
                                            <dt>Secagem Aprox.:</dt>
                                            <dd>{finishDate}</dd>
                                            <dt>Total de dias:</dt>
                                            <dd>{`${cycleVegaDays + cycleBloomDays} dias`}</dd>
                                            <dt>Vida / Colheita:</dt>
                                            <dd>{from} / {(cycleVegaDays + cycleBloomDays) - from} dias</dd>
                                            <dt>Mais detalhes:</dt>
                                            <dd><textarea name="plant_details" defaultValue={p.plant_details}></textarea></dd>
                                            <dt></dt>
                                            <dd><button type="submit">Salvar</button></dd>
                                        </dl>
                                        <ul className={classes.list_points}>
                                            {listPoints}
                                        </ul>
                                    </form>
                                </aside>
                                
                                <main className={classes.main}>
                                    <Period title={'Vega'} startDate={p.plant_start_vega} totalDays={p.plant_cycle_vega} plantPoints={plantPoints} />
                                    <Period title={'Flora'} startDate={startBloom(p.plant_start_vega, p.plant_cycle_vega)} totalDays={p.plant_cycle_bloom} plantPoints={plantPoints} />
                                </main>
                            </div>
                        )
                    }
                }
                
                if(id === p.plant_id){
                    return (
                        <div className={contentClasses}>
                            <aside className={classes.sidebar}>
                                <dl className={classes.infos}>
                                    <dt>Nome:</dt>
                                    <dd>{p.plant_strain}</dd>
                                    <dt>Total de vasos:</dt>
                                    <dd>{p.plant_pots}</dd>
                                    <dt>Início:</dt>
                                    <dd>{startVegaDate}</dd>
                                    <dt>Vega / Flora:</dt>
                                    <dd>{`${cycleVegaDays} / ${cycleBloomDays} dias`}</dd>
                                    <dt>Início Flora:</dt>
                                    <dd>{startBloomDate}</dd>
                                    <dt>Colheita:</dt>
                                    <dd>{startHarvestDate}</dd>
                                    <dt>Secagem Aprox.:</dt>
                                    <dd>{finishDate}</dd>
                                    <dt>Total de dias:</dt>
                                    <dd>{`${cycleVegaDays + cycleBloomDays} dias`}</dd>
                                    <dt>Vida / Colheita:</dt>
                                    <dd>{from} / {(cycleVegaDays + cycleBloomDays) - from} dias</dd>
                                    <dt>Mais detalhes:</dt>
                                    <dd>{p.plant_details}</dd>
                                </dl>
                                <dl className={classes.list_points}>
                                    {listPoints}
                                </dl>
                            </aside>
                            
                            <main className={classes.main}>
                                <Period title={'Vega'} startDate={p.plant_start_vega} totalDays={p.plant_cycle_vega} plantPoints={plantPoints} />
                                <Period title={'Flora'} startDate={startBloom(p.plant_start_vega, p.plant_cycle_vega)} totalDays={p.plant_cycle_bloom} plantPoints={plantPoints} />
                            </main>
                        </div>
                    )
                }

                return <></>;
            });
        }
    }, [plants, points, id]);

    return (
        <>
            <dl key={id} className={classes.menu}>
                {plantsMenu}
            </dl>
            {allPlants}
        </>
    );
}

export default Plant;
