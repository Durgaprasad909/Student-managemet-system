import React, { use, useEffect, useState } from 'react'
import './Home.css'
import { replace, useNavigate } from 'react-router-dom'
import {useRef} from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { jwtDecode } from 'jwt-decode'
export const Home = () => {
 const navigate = useNavigate();
 var logout=(e)=>{
   console.log(localStorage.getItem("token"))
   localStorage.removeItem("token");
    console.log(localStorage.getItem("token"))
  navigate('/',replace(true))
 }
 //these are for filter
 const[name,setname]=useState("")
 const[backlogs,setbacklogs]=useState(5)
 const[attend,setattend]=useState(0)
 const[cgpa,setcgpa]=useState(0)
 const[branchhover,setbranchhover]=useState("")
const[yearhover,setyearhover]=useState("")
//  const[cgpabox,setcgpabox]=useState(true)
//  const[attendbox,setattendbox]=useState(true)
//  const[phonebox,setphonebox]=useState(true)
 const[students,setstudents]=useState([])
 const[yearone,setyearone]=useState(0)
 const studentsRef = useRef(null);
 const [message,setmessage]=useState("")
 useEffect(()=>{
  const token=localStorage.getItem("token")
  if (!token){
    navigate('/',{replace:"true"})

  }
  else{
    const decoded=jwtDecode(token)
    setname(decoded.name)

  }
 })
 var validate=()=>{
     fetch(`http://127.0.0.1:8000/api/students/?backlogs=${backlogs}&attendence=${attend}&cgpa=${cgpa}&year=${yearhover}&branch=${branchhover}`).then(response =>
      
      response.json()).then(data =>setstudents(data)).catch(()=>alert("Enter The year and branch"));
       
    // if (students=="False")
    // {
    //   alert("Please enter valid credintials")
    // }
     
  }
  // var validatebranch=(e)=>{
  //   setbranchhover(e)
  //   console.log(e)
  //   fetch(`http://127.0.0.1:8000/api/validateone/?branch=${e}`).then((response)=>response.json()).then((data)=>setstudents(data))
  // }

// const execute=(()=>{
//   console.log(yearhover,branchhover)
  // fetch(`http://127.0.0.1:8000/api/validateone/?year=${yearhover}&branch=${branchhover}`).then(response=>response.json())
  //   .then(data=>setstudents(data))
      
// })
useEffect(()=>{
  setyearhover("0")
},[branchhover])
// useEffect(()=>{
//   if (message!=""){

//     alert(message)
//   }
// },[message])
 var validateyear=(e)=>{
    setyearhover(e)
    fetch(`http://127.0.0.1:8000/api/validateone/?year=${e}&branch=${branchhover}`).then(response=>response.json())
    .then(data=>{setstudents(data.student)
      // setstudents(data.students)

      // setmessage(data.msg)
     
 })
 
 }
 var validatebranch=(a)=>{
  console.log(a)
  setbranchhover(a)
  //  fetch(`http://127.0.0.1:8000/api/validatebranch/?branch=${a}`).then(response=>response.json())
  //   .then(data=>setstudents(data))
 }
 


const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text("Student List", 14, 15);

  const tableColumn = [
    "ROLL NUMBER",
    "Name",
    "Branch",
    "Year",
    "Backlogs",
    "CGPA",
    "Attendance",
    "Email",
    "Phone Number"
  ];

  const tableRows = students.map(student => [
    student.roll_num,
    student.name,
    student.branch,
    student.year,
    student.backlogs,
    student.cgpa,
    student.attendence,
    student.email,
    student.phone_num
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25
  });

  doc.save("students.pdf");
};



  return (
    <div>
        <div className='topbar'>
            <h2 className='faculty-portal'>Faculty Portal</h2>
            <h3 className='welcome'>welcome, {name}</h3>
            <p>|</p>
            <button className='logout-btn' onClick={logout}>logout</button>
        </div>

        {/*this section is for selecting years */}

        <div className='section-years'>
          <h1 className='top-heading'>Welcome, {name}</h1>
          <h4 className='sub-heading'>select a branch to view students</h4>
          <div className='sections-list'>
            <h4 className='select-year'>Select Branch</h4>
            <buttons>
            <button className={`btn-year ${branchhover==="CSE"?"active":""}`}  onClick={()=>validatebranch("CSE")}>CSE</button>
            <button className={`btn-year ${branchhover==="AIDS"?"active":""}`} onClick={()=>validatebranch("AIDS")}>AI & DS</button>
            <button className={`btn-year ${branchhover==="ECE"?"active":""}`} onClick={()=>validatebranch("ECE")}>ECE</button>
            <button className={`btn-year ${branchhover==="EEE"?"active":""}`} onClick={()=>validatebranch("EEE")}>EEE</button>
             <button className={`btn-year ${branchhover==="CIVIL"?"active":""}`} onClick={()=>validatebranch("CIVIL")}>CIVIL</button>
            </buttons>
          </div>
        </div>
        <br></br>
        {/*this section is for filtering the data */}
        <div className='sections-list'>
            <h4 className='select-year'>Select Year</h4>
            <buttons> 
            <button className={`btn-year ${yearhover==="1"?"active":""}`}  onClick={()=>validateyear("1")}>1st Year</button>
            <button className={`btn-year ${yearhover==="2"?"active":""}`} onClick={()=>validateyear("2")}>2nd Year</button>
            <button className={`btn-year ${yearhover==="3"?"active":""}`} onClick={()=>validateyear("3")}>3rd Year</button>
            <button className={`btn-year ${yearhover==="4"?"active":""}`} onClick={()=>validateyear("4")}>4th Year</button>
             <button className={`btn-year ${yearhover==="5"?"active":""}`} onClick={()=>validateyear("5")}>All Years</button>
            </buttons>
          </div>
        <div className='section-filters'>
          <h4 className='filters'>Filters</h4>
          <div className='filter-list'>
            <span className='year'>{`Backlogs  <=`}</span>
           <input type='number' className='input-year' placeholder='e.g. 0 or 1'  onChange={(e) => setbacklogs(e.target.value)}/>
            <span className='cgpa'>Attendence{` >`}</span>
           <input type='text' placeholder='e.g. 70'className='input-cgpa' onChange={(e)=> setattend(e.target.value)}/>
           <br></br>
           <span className='attendence'>{`CGPA >`}</span>
           <input type='number' className='input-attend' placeholder='e.g. 7.5' onChange={(e)=> setcgpa(e.target.value)}/>
            <br></br>
           {/* <button className='btn-filter'>Apply Filters </button> */}
            <button className='btn-filter' onClick={validate} >Apply</button>
          </div>
          {/*this section is columns selecting section*/}
          {/* <h4 className='columns'>Columns</h4>
          <div className='column-list'>
            {/* <span className='column-year'>{`CGPA  =`}</span>
           <input type='checkbox' className='column-input-year' defaultChecked/>
            <span className='column-attend'>Attendence{`  =`}</span>
           <input type='checkbox' className='column-input-attend' defaultChecked/>
           <span className='column-email' >{`Email  = `}</span>
           {/* <input type='checkbox' className='cloumn-input-email' defaultChecked />
           <br></br> */}
           {/* <input type='checkbox' className='column-inpu-email' defaultChecked/>
           <span className='column-cgpa'>{`Phone Number  = `}</span>
           <input type='checkbox' className='cloumn-input-attend' defaultChecked  ref={studentsRef}/>
           <br></br> */} 
          
          {/* </div> */}
        </div>

        {/*this section is displaying the data in table form */}
        <button className='btn-download' onClick={downloadPDF}>Download</button>
        
        <div className='table-section'>
          <table  className='table'>
            <thead className='table-head'>

            <tr>
              <td>ROLL-NUM</td>
              <td>NAME</td>
              <td>BRANCH</td>
              <td>Year</td>
              <td>backlogs</td>
              <td>CGPA</td>
              <td>ATTENDENCE</td>
              <td>Phone Num</td>
              <td>Email</td>
            </tr>
            </thead>
            <tbody>
             {
              students.map((student)=>(
                  <tr>
                    <td>{student.roll_num}</td>
                    <td>{student.name}</td>
                    <td>{student.branch}</td>
                    <td>{student.year}</td>
                    <td>{student.backlogs}</td>
                    <td>{student.cgpa}</td>
                    <td>{student.attendence}</td>
                    <td>{student.phone_num}</td>
                    <td>{student.email}</td>
                  </tr>
              ))
             }
            </tbody>
          </table>
        </div>
    </div>
  )
}
export default Home; 