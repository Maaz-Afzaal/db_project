import {useNavigate} from "react-router-dom"

const Home=()=>{
    const navigate=useNavigate();
    return(
        <div className="homeContainer d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div className="btn btn-primary me-2" onClick={()=>{
                navigate("/dashboard/1");
            }}>
                    Login As Teacher
            </div>
            <div className="btn btn-warning ms-2" onClick={()=>{
                navigate("/dashboard/2");
            }}>
                    Login As Student
            </div>
        </div>
    );
}

export default Home;