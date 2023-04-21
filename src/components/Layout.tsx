import React, { useEffect,useRef, useState } from 'react';
import '../App.css';
import { TIMEOUT } from 'dns';

interface ILap {
    min:number;
    sec:number;
    milli:number;
}

const Layout = () =>{

    const [min,setMin] = useState<number>(0);
    const [sec,setSec] = useState<number>(0);
    const [milli,setMilli] = useState<number>(0);

    const [millitimer,setmillitimer] = useState<NodeJS.Timer>();
    //const [sectimer,setsectimer] = useState<any>();
    //const [mintimer,setmintimer] = useState<any>();
    const [isStop,setStop] = useState<boolean>(false);

    const [lap,setLap] = useState<ILap[]>([]);
    //const [todoList,setTodoList] = useState<ITask[]>([]);

    const lapRef = useRef<HTMLDivElement>(null);

    const timer = () => {
            setMilli(prevMilli=>{
                if(prevMilli===99) {
                    setSec(prevSec=>{
                        if(prevSec===59) {
                            setMin(prevMin=>{
                                if(prevMin===59) {
                                    return 0;
                                }
                                return prevMin+1;
                            })
                            return 0
                        }
                        return prevSec+1;
                    });
                    return 0;
                }
                return prevMilli+1;
            });
    }

    const startHandler = () =>{
        setStop(true);
        timer();
        clearInterval(millitimer);
        setmillitimer(setInterval(timer,10));

        // const millisecondId = setInterval(() =>{
        //     setMilli(prevMilli=>{
        //         if(prevMilli===99) {
        //             setSec(prevSec=>{
        //                 if(prevSec===59) {
        //                     setMin(prevMin=>{
        //                         if(prevMin===59) {
        //                             return 0;
        //                         }
        //                         return prevMin+1;
        //                     })
        //                     return 0
        //                 }
        //                 return prevSec+1;
        //             });
        //             return 0;
        //         }
        //         return prevMilli+1;
        //     })
        // },10);

        //setmillitimer(millisecondId);
        //clearInterval(millisecondId);
    }

    // const startHandler = () =>{
    //     setStop(true);
    //     setmillitimer(
    //         setInterval(() =>{
    //             setMilli(prevMilli =>{
    //                 if(prevMilli>=99) {
    //                     return 0;
    //                 }
    //                 return prevMilli+1;
    //             })
    //         },10)
    //     );

    //     setsectimer(
    //         setInterval(()=>{
    //             setSec(prevSec =>{
    //                 if(prevSec>=60) {
    //                     return 0;
    //                 }
    //                 return prevSec+1;
    //             })
    //         },1000)
    //     );

    //     setmintimer(
    //         setInterval(()=>{
    //             setMin(prevMin=>{
    //                 if(prevMin>=60) {
    //                     return 0;
    //                 }
    //                 return prevMin+1;
    //             })
    //         },60000)
    //     );
    // };

    
      

   
const stopHandler = () =>{
    if(isStop) {
    clearInterval(millitimer);
    }
    setStop(false);
}

const resetHandler = () =>{
    clearInterval(millitimer);
    setSec(0);
    setMilli(0);
    setMin(0);
    setLap([]);
    setStop(false);
}
   

const lapHandler = () =>{
    if(min===0 && sec===0 && milli===0) {
        alert("No timer found,first run stopwatch then Lap");
        return;
    }
    
    const newLap:ILap = {
        min:min,
        sec:sec,
        milli:milli
    }

    setLap([...lap,newLap]);
}

useEffect(() => {
    if (lapRef.current) {
      lapRef.current.scrollTop = lapRef.current.scrollHeight;
    }
  }, [lap]);

    return (
        <>
        <div className='container'>
            <div className='timer'>
                <span className='time'> {min} </span> <span className='txt'>Min</span>&nbsp;
                <span className='time'> {sec} </span> <span className='txt'>Sec</span>&nbsp;
                <span className='time'>{milli} </span> <span className='txt'>Msec</span>
            </div>
            
            <br/>
            
            <div className='butns'>

            {
            !isStop ? (
                <button className='btn btn1' onClick={startHandler}>Start</button>
            ):(
                <button className='btn btn2' onClick={stopHandler}>Stop</button>
            )
            }
               &nbsp;
                 <button className='btn btn3' onClick={resetHandler}>Reset</button>
                &nbsp;

                <button className='btn btn4' onClick={lapHandler}>Lap</button> 
            </div>
        </div>

            {
                lap.length > 0 && (
                    <div className='lap' ref={lapRef}>
                        {
                        lap.map((item,index)=>(
                        <div key={index}>
                        <p>
                            <span className='Lnum'>Lap {index+1}:</span>
                            <span className='Ltime'> {item.min} </span> <span className='txt'>Min</span>&nbsp;
                            <span className='Ltime'>{item.sec}</span> <span className='txt'>Sec</span>&nbsp;
                            <span className='Ltime'> {item.milli} </span> <span className='txt'>Msec</span>
                        </p>
                        </div>
                    ))
                        }
                    </div>
                )
            }
        </>
    )

}

export default Layout;