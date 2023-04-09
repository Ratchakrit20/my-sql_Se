import Axios from 'axios'
import {useState} from 'react'

function App() {
  const [id,setid] = useState(0);
  const [name,setname] = useState("");
  const [newname,setnewname] = useState("");

  const [employeeList, setEmployeeList] = useState([])
  const getEmployees = () =>{
    Axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
        },
      ]);
    });
  };

const updateEmployeename =(id) => {
  Axios.put("http://localhost:3001/update",{name : newname,id:id}).then((response)=>{
    setEmployeeList(
      employeeList.map((val)=>{
        return  val.id == id ?{
          name: newname
        }:val;
      })
    )
  })
}


const deleteEmployee = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setEmployeeList(
      employeeList.filter((val) => {
        return val.id != id;
      })
    );
  });
};

  return (
    <div className="App container">
      <h1>ควย</h1>
      <div className="information">
        <from action="">
          <div>
            <lable>Name : </lable>
            <input type="text" placeholder="Enter name" onChange={(Event)=>{setname(Event.target.value)}}></input>
          </div>
          <button onClick={addEmployee}>Add employees</button>
        </from>
      </div>
      <hr/>
      <div className="employees">
        <button className='btn btn-primary' onClick={getEmployees}>Show employees</button>
        
        {employeeList.map((val,key)=>{
          return(
            <div className='emplyee card'>
              <div className='card-body text-left'>
                <p className="card-text">Name : {val.name}</p>
                <div className='d-flex'>
                  <input 
                    type="text"
                    style={{width:"300px"}}
                    placeholder = "xxxxx"
                    className='form-control'
                    onChange={(event)=>{
                      setnewname(event.target.value)
                    }}
                  />
                  <button className='btn btn-warning' onClick={()=>{updateEmployeename(val.id)}}>Update</button>
                  <button className='btn btn-danger' onClick={()=>{deleteEmployee(val.id)}}>Update</button>
                </div>
                
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;

