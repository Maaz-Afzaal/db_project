import { useParams } from "react-router-dom"
import React,{useState} from "react";
import { Table } from "reactstrap";

const Dashboard=()=>{
    const [currentState,setCurrentState]=useState(AppState.SCHEDULE);
    const [name,setName]=useState("Your Name");
    const [email,setEmail]=useState("demoEmail@uet.edu.pk");
    const [section,setSection]=useState(["B"]);
    const params=useParams();

    const [lectures,setLectures]=useState({
        Lecture1:["Database(Class 123:A)","Machine Learning(Class 125)","Computer Networks(Class 126)","Computer Architecture(Class 127)","Database Lab(Class 211)",null,null],
        Lecture2:["Machine Learning(Class 125)",null,"Operation Systems(Class 225)",null,"Database Lab(Class 212)",null,null],
        Lecture3:["Operation Systems(Class 125)","Machine Learning(Class 123:A)","Computer Architecture(Class 225)",null,"Database Lab(Class 126)",null,null],
        Lecture4:[null,"Computer Networks Lab(Class 126)","Machine Learning(Class 123:A)","Computer Architecture(Class 225)","Database Lab(Class 127)",null,null],
        Lecture5:["Database(Class 211)",null,"Computer Networks(Class 225)","Machine Learning Lab(Class 126)",null,null,null],
        Lecture6:["Machine Learning(Class 123:A)","Operation Systems(Class 125)","Database(Class 126)",null,null,null,null],
    
    });
    const [todo,setToDO]=useState([
        {
            name:"check mid papers",
            descrption:"To be Done on weekend"
        },
        {
            name:"DB project",
            descrption:"Should provide students with project document",
        }
    ])
    const [assignments,setAssignments]=useState({
        monday:{
            Assignment:null,
            VenueDeadline:null,
            Quiz:"Operating Systems Quiz",
            Venue:"Class 123:A",
        },
        tuesday:{
            Assignment:"Database",
            Deadline:"11:00PM",
            Quiz:"Machine Learning Quiz",
            Venue:"Class 123:A",
        },
        wednesday:{
            Assignment:null,
            Deadline:null,
            Quiz:null,
            Venue:null
        },
        thursday:{
            Assignment:null,
            Deadline:null,
            Quiz:null,
            Venue:null
        },
        friday:{
            Assignment:null,
            Deadline:null,
            Quiz:null,
            Venue:null
        },
        saturday:{
            Assignment:null,
            Deadline:null,
            Quiz:null,
            Venue:null
        },
        sunday:{
            Assignment:"Machine Learning",
            Deadline:"12-00PM",
            Quiz:null,
            Venue:null
        }
    })
    const handleAddQuiz=(e)=>{
        e.preventDefault();

    }
    return(
        <div className="dashboardContainer d-flex">
            <div className="sideBar p-4" style={{width:"400px",background:"DimGray",height:"100vh",borderRight:"1px white solid"}}>
               <div className="about">
                    <div className="name bold whiteText">
                        {name} ({`${parseInt(params.id)===1?"Teacher":"Student"}`})
                    </div>
                    <div className="email bold whiteText">
                        {email}
                    </div>
                    
                </div>
                <div className="tabs">
                    <div className="section">
                        <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.SCHEDULE)
                            }}>
                            Schedules:
                        </div>
                        {section.map((sec)=>{
                            return(
                                <>
                                    <li className="singleScetion ps-3 whiteText pointer">Section {sec}</li>
                                </>
                            )
                        })}
                    </div>
                    <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.TODO);
                            }}>
                            To Do
                    </div>
                    {
                        parseInt(params.id)===1 &&
                        <>
                            <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.CHANGE_SCHEDULE);
                            }}>
                                Change Schedule
                            </div>
                            <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.ADD_QUIZ);
                            }}>
                                Quizes
                            </div>
                            <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.ADD_ASSIGNMENT)
                            }}>
                                Assignments
                            </div>
                        </>
                    }
                </div>
            </div>  
            <div className="rightSide w-100">
                <div className="w-100 bold whiteText text-center p-3" style={{background:"DimGray"}}>
                    Your Next Week Schedule
                </div>
                    {currentState===AppState.SCHEDULE && 
                        <>
                            <div>
                                <Table striped bordered>
                                    <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Monday</th>
                                        <th>Tuessday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                        <th>Sunday</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">8:00AM-10:00AM</th>
                                        {lectures.Lecture1.map((lec1,index)=>{
                                            return(
                                                <>
                                                   <th>{lec1 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th scope="row">10:00AM-11:00PM</th>
                                        {lectures.Lecture2.map((lec2,index)=>{
                                            return(
                                                <>
                                                   <th>{lec2 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th scope="row">11:00AM-12:30PM</th>
                                        {lectures.Lecture3.map((lec3,index)=>{
                                            return(
                                                <>
                                                   <th>{lec3 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th scope="row">1:00PM-2:00PM</th>
                                        {lectures.Lecture4.map((lec4,index)=>{
                                            return(
                                                <>
                                                   <th>{lec4 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th scope="row">2:00PM-3:00PM</th>
                                        {lectures.Lecture5.map((lec5,index)=>{
                                            return(
                                                <>
                                                   <th>{lec5 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th scope="row">3:00AM-4:30PM</th>
                                        {lectures.Lecture6.map((lec6,index)=>{
                                            return(
                                                <>
                                                   <th>{lec6 || "-"}</th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                    {
                                        parseInt(params.id)===2 && 
                                        <>
                                             <tr>
                                                <th scope="row">Quizes</th>
                                                <th>{assignments.monday.Quiz || "-"}{assignments.monday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.tuesday.Quiz || "-"}{assignments.tuesday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.wednesday.Quiz || "-"}{assignments.wednesday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.thursday.Quiz || "-"}{assignments.thursday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.friday.Quiz || "-"}{assignments.friday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.saturday.Quiz || "-"}{assignments.saturday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                                <th>{assignments.sunday.Quiz || "-"}{assignments.sunday.Venue?`(${assignments.monday.Venue})`:""}</th>
                                            </tr>
                                            <tr>
                                                <th scope="row">Assignments</th>
                                                <th>{assignments.monday.Assignment || "-"}{assignments.monday.Deadline?`(${assignments.monday.Deadline})`:""}</th>
                                                <th>{assignments.tuesday.Assignment || "-"}{assignments.tuesday.Deadline?`(${assignments.tuesday.Deadline})`:""}</th>
                                                <th>{assignments.wednesday.Assignment || "-"}{assignments.wednesday.Deadline?`(${assignments.wednesday.Deadline})`:""}</th>
                                                <th>{assignments.thursday.Assignment || "-"}{assignments.thursday.Deadline?`(${assignments.thursday.Deadline})`:""}</th>
                                                <th>{assignments.friday.Assignment || "-"}{assignments.friday.Deadline?`(${assignments.friday.Deadline})`:""}</th>
                                                <th>{assignments.saturday.Assignment || "-"}{assignments.saturday.Deadline?`(${assignments.saturday.Deadline})`:""}</th>
                                                <th>{assignments.sunday.Assignment || "-"}{assignments.sunday.Deadline?`(${assignments.sunday.Deadline})`:""}</th>
                                            </tr>
                                        </>
                                    }
                                   
                                   
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    }
                    {currentState===AppState.TODO && 
                    <>
                        <div className="todoContainer">
                            <div className="currentToDoBlock">
                                <div className="todoHeading bold m-2">
                                    To Do    
                                </div>
                                {todo.map((todos,i)=>{
                                    return(
                                        <>
                                        <li className="ms-3">{todos.name}({todos.descrption})</li>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="addToDoBlock">
                                <div className="addTodoHeading bold m-2">
                                    Add To Do    
                                </div>
                                <form onSubmit={(e)=>handleAddQuiz(e)} className="d-flex flex-column">
                                    <label className="m-2">
                                        Name:&nbsp;
                                        <input type="text" name="todoName" />
                                    </label>
                                    <label className="m-2">
                                        Description:&nbsp;
                                        <input type="text" name="todoDescription" />
                                    </label>
                                    <label className="m-2">
                                        Day:&nbsp;
                                        <select name="quizDay">
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </select>
                                    </label>
                                    <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Add
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </>
                    }
                    {
                        currentState===AppState.CHANGE_SCHEDULE &&
                        <>
                            <div className="changeScheduleContainer p-2">
                                <div className="addLecture m-2">
                                    <div className="addLectureHeading bold ">
                                        Add Lecture
                                    </div>
                                    <form className="flex-column d-flex">
                                        <label className="m-2">
                                            Subject Name: &nbsp;
                                            <input type="text"/>
                                        </label>
                                        <label className="m-2">
                                            Time: &nbsp;
                                            <input type="text"/>
                                        </label>
                                        <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Add
                                    </div>
                                    </form>
                                </div>
                                <div className="addLecture m-2 ">
                                    <div className="addLectureHeading bold ">
                                        Edit Existing Lecture
                                    </div>
                                    <form className="d-flex flex-column">
                                        <label className="m-2">
                                            Select Lecture Time:&nbsp;
                                            <select>
                                        {Object.entries(lectures).map(([key, val], i) => (
                                            <option key={i}>
                                                {key}
                                            </option>
                                        ))}
                                        </select>
                                        </label>
                                        <label className="m-2">
                                            Select Subject:&nbsp;
                                            <select>
                                            {lectures.Lecture1.map((lec)=>{
                                                return(
                                                    <>
                                                        {lec && <option>
                                                            {lec}
                                                            </option>}
                                                    </>
                                                )
                                            })}
                                        </select>
                                        </label>
                                        <label className="m-2">
                                            Change Time:&nbsp;
                                            <input type="text"/>
                                        </label>
                                        <label className="m-2">
                                            Change Subject:&nbsp;
                                            <input type="text"/>
                                        </label>
                                        <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                            Submit
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                    {
                        currentState===AppState.ADD_QUIZ &&
                        <>
                            <div className="quizContainer p-3">
                                <div className="bold quizHeading mt-4 mb-2">
                                    Add Quiz
                                </div>
                                <div className="addQuizBlock">
                                    <form onSubmit={(e)=>handleAddQuiz(e)} className="d-flex flex-column">
                                    <label className="m-2">
                                        Quiz Subject:&nbsp;
                                        <input type="text" name="subjectName" />
                                    </label>
                                    <label className="m-2">
                                        Venue:&nbsp;
                                        <input type="text" name="subjectName" />
                                    </label>
                                    <label className="m-2">
                                        Quiz Day:&nbsp;
                                        <select name="quizDay">
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </select>
                                    </label>
                                    <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Add
                                    </div>
                                    </form>
                                </div>
                                <div className="bold quizHeading mt-4 mb-2">
                                    Edit Quiz
                                </div>
                                <div className="editQuizBlock">
                                    <form onSubmit={(e)=>handleAddQuiz(e)} className="d-flex flex-column">
                                    <label className="m-2">
                                        Select Quiz:&nbsp;
                                        <select name="quizDay">
                                        {Object.entries(assignments).map(([key, val], i) => (
                                            val.Quiz &&
                                            <option key={i}>
                                                {val.Quiz}
                                            </option>
                                        ))}
                                        </select>
                                    </label>
                                   
                                    <label className="m-2">
                                        Venue:&nbsp;
                                        <input type="text" name="subjectName" />
                                    </label>
                                    <label className="m-2">
                                        Quiz Day:&nbsp;
                                        <select name="quizDay">
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </select>
                                    </label>
                                    <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Edit
                                    </div>
                                    </form>
                                </div>
                                <div className="bold quizHeading mt-4 mb-2">
                                    Quizes This Week
                                </div>
                                <div className="currentQuizesBlock">
                                    {Object.entries(assignments).map(([key,val])=>{
                                        return(
                                            <>
                                                {
                                                    val.Quiz && <li className="ms-3">{val.Quiz}</li>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    }
                    {
                        currentState===AppState.ADD_ASSIGNMENT &&
                        <>
                            <div className="quizContainer p-3">
                                <div className="bold quizHeading mt-4 mb-2">
                                    Add Assignment
                                </div>
                                <div className="addQuizBlock">
                                    <form onSubmit={(e)=>handleAddQuiz(e)} className="d-flex flex-column">
                                    <label className="m-2">
                                        Subject Name:&nbsp;
                                        <input type="text" name="subjectName" />
                                    </label>
                                    <label className="m-2">
                                        Deadline time:&nbsp;
                                        <input type="text" name="deadline" />
                                    </label>
                                    <label className="m-2">
                                        To be submitted before:&nbsp;
                                        <select name="assignmentDay">
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </select>
                                    </label>
                                    <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Add
                                    </div>
                                    </form>
                                </div>
                                <div className="bold quizHeading mt-4 mb-2">
                                    Edit Assignment
                                </div>
                                <div className="editAssignmentBlock">
                                    <form onSubmit={(e)=>handleAddQuiz(e)} className="d-flex flex-column">
                                    <label className="m-2">
                                        Select Assignment:&nbsp;
                                        <select name="quizDay">
                                        {Object.entries(assignments).map(([key, val], i) => (
                                            val.Assignment &&
                                            <option key={i}>
                                                {val.Assignment}
                                            </option>
                                        ))}
                                        </select>
                                    </label>
                                   
                                    <label className="m-2">
                                        Deadline time:&nbsp;
                                        <input type="text" name="deadlineTime" />
                                    </label>
                                    <label className="m-2">
                                        To be submitted before:&nbsp;
                                        <select name="assignmetnEditDay">
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </select>
                                    </label>
                                    <div className="button m-2" type="submit" onClick={(e)=>{handleAddQuiz(e)}}>
                                        Edit
                                    </div>
                                    </form>
                                </div>
                                <div className="currentAssignmentBlock">
                                <div className="bold quizHeading mt-4 mb-2">
                                    Assignements for next week
                                </div>
                                    {Object.entries(assignments).map(([key,val],i)=>{
                                        return(
                                            <>
                                                {
                                                    val.Assignment && <li className="ms-3">{val.Assignment}</li>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    }
            </div>  
        </div>
    )
};

export class AppState{
    static SCHEDULE="schedule";
    static TODO="todo";
    static CHANGE_SCHEDULE="change_shecdule";
    static ADD_QUIZ="add_quiz";
    static ADD_ASSIGNMENT="add_assignment";
}

export default Dashboard;