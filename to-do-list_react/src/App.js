import React from 'react';
import './App.css';


/* import ToDoList from './list-component'; */
/* import {toDoForm} from './data.json'; */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';



function AppHeader(){
  return (
    <header>
      <h1>To-Do-List</h1>
    </header>    
  )
}

class AddTask extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      task: '',
      date: '',
      itemsList: [],
      isActive: false,
      isOpen: false
    };
  
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.removeTask = this.removeTask.bind(this);
 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

  }


    /* handle Change on items */
       
    handleTaskChange = (e) => {
      this.setState({
        task: e.target.value
    });     
    }

    handleDateChange = (e) =>{
      this.setState({
        date: e.target.value
      })
    }
    

     /* handle Submit */
     handleSubmit = (e) => {
      /* add Task & date to List */
      e.preventDefault();
      
      /* update task & date state */
      const formData = {
        task: this.state.task,
        date: this.state.date
      }

      /* if(this.state.task !== '' && this.state.date !== ''){
        toDoForm.push(formData);
      } */

      /* const iArr = JSON.stringify(toDoForm);
      const iObj = JSON.parse(iArr); */

      /* check if both fields are filled out & push */
      if(this.state.task !== '' && this.state.date !== ''){
        this.state.itemsList.push(formData);
      }

      /* this.setState({
        itemsList: [
          ...this.state.itemsList,
          {
            task: this.state.task,
            date: this.state.date,
            id: Math.floor(Math.random() * 1000) +1,
          },
        ],
      }); */
      
      
      
      console.log(this.state.itemsList)
      
      /* let updateList = this.state.items.concat(formData)
      this.setState({items: updateList})
      console.log(updateList) */
                    
      /* reset form */
      this.setState({
        task: '',
        date: ''
      });
      
      
      /* Error handle if one field is not filled */
      if(this.state.task === ''){
        alert('please add a task');
      }

      if(this.state.date === ''){
        alert('please add a date');
      }
    } 

    /* remove task object*/
    removeTask=()=>{ 

      /* const taskList = document.querySelector(".taskListContainer");
      let item = document.querySelector(".taskWrapper"); */

      /* remove item from Array */
      const itemsList = this.state.itemsList;

      const index = 0;

      itemsList.splice(index, 1);
      console.log(itemsList);
      /* console.log(taskList.childNodes.length) */  
      
      
      /* remove created list item */
          

    }

    clickMe = (id) =>{
      this.props.clickMe(id);
    };
        

   /* toggle Add Task between open & closed*/
   handleToggle = () =>{
    this.setState({isActive: !this.state.isActive});
    this.setState({isOpen: !this.state.isOpen});
  };


  render() {

    const isActive = this.state.isActive;

    return(

      <div className='taskContainer'>
 
       {/* add tasks */}
 
       <div className='addTask'>
         <h3>create new task</h3>
         <form 
         className={isActive ? 'taskSubmit' : 'taskSubmitHidden'}
         onSubmit={this.handleSubmit}>
 
           <label className='taskName'>
             <input type='text' id='task' name='task' placeholder='Task' value={this.state.task} onChange={this.handleTaskChange}/>
           </label>
 
           <label className='taskDate'>
             <input type='text' placeholder='Date' id='date' name='date' value={this.state.date} onChange={this.handleDateChange}/>
           </label>

           <input type='submit' name='addtask' className='submit' value='Add Task'/>          
         </form>
 
       {/* show & hide add task; toggle arrow icon from up & down */}
         <div>
           <button className='taskBtn' onClick={this.handleToggle}><FontAwesomeIcon className='icon' icon={this.state.isOpen ? faChevronUp : faChevronDown}/></button>
         </div>
       </div>
 
       {/* Tasklist */}
       <div className='taskListContainer'>

          {/* {<ToDoList onClick={this.removeTask}/>} */}

          {
            this.state.itemsList.map((data) =>
            <div key={data.id} id={data.id} className="taskWrapper">
                <ul>
                <li className='task'>To do: {data.task}</li>
                <li className='date'>Date due: {data.date}</li>
                </ul>
                <span className='removeBtn' onClick={()=>(this.removeTask)(()=> this.clickMe(data.id))}>&times;</span>
            </div>
            )
          }
       </div> 

     </div>
   )

  }  
}


function App() {

  return (
    <div className="App">
      <AppHeader/>
      <AddTask/>
    </div>
  );
}

export default App;
