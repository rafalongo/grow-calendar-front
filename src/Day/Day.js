import React from 'react';
import classes from './day.module.css';

/**
* @param {Object} props 
*/

const Day = props => {
    const { isEmpty, dayNumber, monthDay, weekDay, condition, dayPoint } = props;

    const point = (
        Object.values(dayPoint).length ? <div className={classes.dayPoint}><span className={classes.point}></span><div className={classes.title}>{dayPoint.point_title}</div></div> : <></>
    );
  
    const dayContent = () => {
        if(isEmpty) return <></>;
    
        return (
            <>
                <span className={classes.dayNumber}>{dayNumber}</span>
                <span className={classes.weekDay}>{weekDay}</span>
                {point}
                <p>{monthDay}</p>
            </>
        );
    };
  
    const dayClass = [classes.day, classes[condition]].join(' ');
  
    return (
        <div className={dayClass}>
            {dayContent()}
        </div>
    );
}

export default Day;
