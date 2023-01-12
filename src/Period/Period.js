import Week from '../Week';
import classes from './period.module.css';

/**
* @param {Object} props 
*/

const Period = props => {
  
  const { title, startDate, totalDays, plantPoints } = props;

  const totalWeeks = Math.ceil(totalDays / 7);
  
  const Weeks = () => {
    const weeks = [];

    for(var i = 1; i <= totalWeeks; i++){
      weeks.push(<Week period={title.toLowerCase()} weekNumber={i} startDate={startDate} totalDays={totalDays} plantPoints={plantPoints} key={i} />);
    }

    return weeks;
  };

  return (
    <div className={classes.period}>
      <h3 className={classes.title}>{title}</h3>

      <div className={classes.weeks}>
        <Weeks />
      </div>
    </div>
  );
}

export default Period;
