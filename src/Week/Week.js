import React from 'react';
import Moment from 'moment';
import Day from '../Day';
import classes from './week.module.css';

/**
* @param {Object} props 
*/

const Week = props => {
    const { period, weekNumber, startDate, totalDays, plantPoints } = props;
  
    const totalWeeks = Math.ceil(totalDays / 7);
    const rest = totalDays % 7;
  
    const weekLine = weekNumber => {
        if(weekNumber > 8) return 'line_3';
        if(weekNumber > 4) return 'line_2';
        return 'line_1';
    };
  
    const weekOdd = weekNumber => {
        return weekNumber % 2 ? 'on' : 'off';
    };
  
    const weekClass = [classes.week, classes[period], classes[weekLine(weekNumber)], classes[weekOdd(weekNumber)]].join(' ');
  
    const toDate = (dateString) => {
        var date = dateString.split('-');
        var startDate = Moment();
            startDate.set('year', date[0]);
            startDate.set('month', (date[1] - 1));
            startDate.set('date', date[2]);
    
        return startDate;
    };

    const Days = () => {
        const weekDay = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        
        var days = [];
        var daysPerWeek = 7;
        var isRest = 7;
    
        var today = Moment();
    
        var date = toDate(startDate);
            date.add(((weekNumber - 1) * 7), 'days');
    
        if(weekNumber === totalWeeks){
            isRest = rest === 0 ? 7 : rest;
        }
    
        for(var i = 1; i <= daysPerWeek; i++){
            var isEmpty = i <= isRest ? false : true;
            var day = ((weekNumber - 1) * 7) + i;
            var condition = (today.diff(date) === 0 ? 'today' : (today.diff(date) > 0 ? 'past': 'future'));

            let dayPoint = {};
            plantPoints.forEach(pp => {
                if(date.format('YYYY-MM-DD') === pp.point_data){
                    dayPoint = pp;
                    // console.log("BATEU", date.format('YYYY-MM-DD'), pp.point_data);
                }
            });
            
            days.push(<Day isEmpty={isEmpty} dayNumber={day} monthDay={date.format('DD/MM')} weekDay={weekDay[date.format('d')]} condition={condition} dayPoint={dayPoint} key={i} />);
            date.add(1, 'days');
        }
    
        return days;
    };
  
    return (
        <div className={weekClass}>
            <h2 className={classes.title}>{`Semana ${weekNumber}`}</h2>
            <Days />
        </div>
    );
}

export default Week;
