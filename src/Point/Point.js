import React from 'react';
import classes from './point.module.css';

/**
* @param {Object} props 
*/

const Point = props => {
    const { isEmpty, dayNumber, monthDay, weekDay, condition } = props;
  
    const dayContent = () => {
        if(isEmpty) return <></>;
    
        return (
            <>
                <span className={classes.dayNumber}>{dayNumber}</span>
                <span className={classes.weekDay}>{weekDay}</span>
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

export default Point;
