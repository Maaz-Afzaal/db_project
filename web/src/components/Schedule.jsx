import React,{useState,useEffect} from "react";

const Schedule=(props)=>{

    const [userData,setUserData]=useState(props.userData);
    const [insert,setInsert]=useState(true);
    const [values,setValues]=useState({
        start_at:null,
        end_at:null,
        on_date:null,
        class_name:null,
        quiz_details:null,
        subject_name:null,
        sec_name:props.allSections[0].sec_name,
        session:props.allSections[0].session,
        p_id:userData.p_id ,
        event:"class",
    });
    const [error,setError]=useState("");
    const [allSections,setAllSections]=useState(props.allSections);
    const handleScheduleSubmit=async (e)=>{
        e.preventDefault();
        const {result,error}=await ("/insertschedule","POST",values);
        if(error){
            setError(JSON.stringify(error))
        }
        else{
            alert("Schedule have been submitted")
        }
    }
 
    return(
        <>
        <div className="btn btn-warning " onClick={()=>{setInsert(true)}}>Insert Schedule</div>
        <div className="btn btn-warning ms-3" onClick={()=>{setInsert(false)}}>See Schedule</div>
            {
                props.isTeacher && insert && <>
                <p>PLease use hh:mm format for time and YYYY-MM-DD for date</p>
                     <form onSubmit={(e)=>{handleScheduleSubmit(e)}} className="d-flex flex-column">
                     <label className="m-3">
                            Lecture Start at:
                            <input onChange={e=>
                                setValues({...values,start_at:e.target.value})
                            }></input>
                        </label>
                        <label className="m-3">
                            Lecture End at:
                            <input onChange={e=>
                                setValues({...values,end_at:e.target.value})
                            }></input>
                        </label>
                        <label className="m-3">
                            Date:
                            <input onChange={e=>
                                setValues({...values,on_date:e.target.value})
                            }></input>
                        </label>
                        <label className="m-3">
                            In class:
                            <input onChange={e=>
                                setValues({...values,class_name:e.target.value})
                            }></input>
                        </label>
                        <label className="m-3">
                            Subject:
                            <input onChange={e=>
                                setValues({...values,subject_name:e.target.value})
                            }></input>
                        </label>
                        {
                            values.event=="quiz" && <>
                                 <label className="m-3">
                            Quiz Details:
                            <input onChange={e=>
                                setValues({...values,quiz_details:e.target.value})
                            }></input>
                        </label>
                            </>
                        }
                        
                        <div className="d-flex ms-3">
                        <p>Select Event:</p>
                        <input type="radio" id="class" name="event" defaultChecked={true} value="class" onClick={(e)=>{
                                setValues({...values,event:e.target.value})
                            }}/>
                            <label>Class</label>
                            <input type="radio" id="quiz" name="event" value="quiz" onClick={(e)=>{
                                setValues({...values,event:e.target.value})
                            }}/>
                            <label >Quiz</label>
                        </div>
                            
                          <label className="m-3">Select Section
                          <select name="section" id="section" 
                          onChange={(e)=>{
                     
                                setValues({...values,sec_name:allSections[e.target.value].sec_name,session:allSections[e.target.value].session})
                            }}>
                                {allSections.length>0 && allSections.map((sec,i)=>{
                                    return(
                                        <>
                                            {allSections.length==0 && <input disabled={true} placeholder="no section in Database"/>}
                                            {allSections.length>=1 && <option value={i}>{sec.sec_name}({sec.session})</option>}
                                        </>
                                    )
                                })}
                            
                                </select></label>
                        
                                <button className="btn btn-warning m-2" style={{width:"fit-content"}} type="submit">Submit</button>

                    </form>
                         
                </>
            }
        </>
    )
}

export default Schedule;