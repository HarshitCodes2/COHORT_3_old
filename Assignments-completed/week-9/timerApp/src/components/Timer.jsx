import React from 'react'
import { formatTime, calculateTime } from '../utils/auxiliaryFunctions'
import { useState } from 'react'
import { useEffect } from 'react';
import style from './Timer.module.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState({field: null, value: ""});

  useEffect(function (){
    const progress = (initialTime > 0) ? ((initialTime - time) / initialTime) * 100 : 0;
    document.documentElement.style.setProperty('--progress', `${100 - progress}%`);
  }, [time, initialTime])

  useEffect(function (){
    let interval = null;    
    if(isRunning){
      interval = setInterval(function(){
        setTime((prevtime) => {
          if(prevtime > 0){
            return prevtime - 1;
          }else{
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000)
    }else if(!isRunning && time !== 0){
      clearInterval(interval);
    }
    return(() => {if(interval){
      clearInterval(interval);
    }});
  }, [isRunning, time])

  function handleFieldEdit(field){
    if(editState.field === field){
      const newTime = {
        ...formatTime(time),
        [field] : editState.value.padStart(2, "0")
      };

      const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);

      setTime(calculatedTime);
      setInitialTime(calculatedTime);

      setEditState({field: null, value: ""});
    }else{
      setIsRunning(false); // Pause the timer while editing
      setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') }); // Set field and remove leading zeros for easier editing
    }
  }

  function handleFieldChange(e){
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditState((prevState) => ({ ...prevState, value }));
  }

  const { hours, minutes, seconds } = formatTime(time);

  return(
    <>
      <div className={style.timerApp}>
        <div className={style.timerDisplay}>
          <div className={style.timerCircle}>
            <div className={style.timerTime}>
              {(editState.field === "hours") ?
                <input
                  className={style.timeInput}
                  type="text" 
                  value={editState.value}
                  onChange={handleFieldChange}
                  onBlur={() => handleFieldEdit("hours")}
                  autoFocus
                />
                :
                <span onClick={() => handleFieldEdit("hours")} className={style.timeUnit}>{hours}</span>
              }:
              {(editState.field === "minutes") ?
                <input
                  type="text" 
                  className={style.timeInput}
                  value={editState.value}
                  onChange={handleFieldChange}
                  onBlur={() => handleFieldEdit("minutes")}
                  autoFocus
                />
                :
                <span onClick={() => handleFieldEdit("minutes")} className={style.timeUnit}>{minutes}</span>
              }:
              {(editState.field === "seconds") ?
                <input
                  type="text" 
                  className={style.timeInput}
                  value={editState.value}
                  onChange={handleFieldChange}
                  onBlur={() => handleFieldEdit("seconds")}
                  autoFocus
                />
                :
                <span onClick={() => handleFieldEdit("seconds")} className={style.timeUnit}>{seconds}</span>
              }
            </div>
          </div>
        </div>
        <div className={style.actionButtons}>
          <button onClick={() => setIsRunning(!isRunning)} className={style.actionButton}>{isRunning ? "Pause" : "Start"}</button>
          <button onClick={() => {setTime(0); setInitialTime(0); setIsRunning(false);}} className={style.actionButton}>Reset</button>
        </div>
      </div>
    </>
  )
  
}

export default Timer

// import React, { useState, useEffect } from 'react';
// import styles from './Timer.module.css'; // Import the CSS module

// const Timer = () => {
//   const [time, setTime] = useState(60); // Initial time set to 60 seconds
//   const [initialTime, setInitialTime] = useState(60); // Initial time set by the user
//   const [isRunning, setIsRunning] = useState(false);
//   const [editState, setEditState] = useState({ field: null, value: '' });

//   useEffect(() => {
//     let interval = null;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setTime((prevTime) => {
//           if (prevTime > 0) {
//             return prevTime - 1;
//           } else {
//             clearInterval(interval);
//             setIsRunning(false);
//             return 0;
//           }
//         });
//       }, 1000);
//     } else if (!isRunning && time !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval); // Clear interval on component unmount or isRunning change
//   }, [isRunning, time]);

//   const handleFieldEdit = (field) => {
//     if (editState.field === field) {
//       const newTime = {
//         ...formatTime(time),
//         [field]: editState.value.padStart(2, '0')
//       };
//       const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);
//       setTime(calculatedTime);
//       setInitialTime(calculatedTime);
//       setEditState({ field: null, value: '' });
//     } else {
//       setIsRunning(false);
//       setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') });
//     }
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 2);
//     setEditState((prevState) => ({ ...prevState, value }));
//   };

//   const toggleTimer = () => {
//     setIsRunning(!isRunning);
//   };

//   const resetTimer = () => {
//     setIsRunning(false);
//     setTime(initialTime); // Reset time to initial value
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
//     const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
//     const secs = (seconds % 60).toString().padStart(2, '0');
//     return { hours: hrs, minutes: mins, seconds: secs };
//   };

//   const calculateTime = (hours, minutes, seconds) => {
//     return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
//   };

//   const { hours, minutes, seconds } = formatTime(time);

//   return (
//     <div className={styles.timerApp}>
//       <div className={styles.timerDisplay}>
//         <div className={styles.timerCircle}>
//           <div className={styles.timerTime}>
//             {editState.field === 'hours' ? (
//               <input
//                 className={styles.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleFieldEdit('hours')}
//                 autoFocus
//               />
//             ) : (
//               <span className={styles.timeUnit} onClick={() => handleFieldEdit('hours')}>{hours}</span>
//             )}
//             :
//             {editState.field === 'minutes' ? (
//               <input
//                 className={styles.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleFieldEdit('minutes')}
//                 autoFocus
//               />
//             ) : (
//               <span className={styles.timeUnit} onClick={() => handleFieldEdit('minutes')}>{minutes}</span>
//             )}
//             :
//             {editState.field === 'seconds' ? (
//               <input
//                 className={styles.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleFieldEdit('seconds')}
//                 autoFocus
//               />
//             ) : (
//               <span className={styles.timeUnit} onClick={() => handleFieldEdit('seconds')}>{seconds}</span>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className={styles.actionButtons}>
//         <button className={styles.actionButton} onClick={toggleTimer}>
//           {isRunning ? "Pause" : "Start"}
//         </button>
//         <button className={styles.actionButton} onClick={resetTimer}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default Timer;