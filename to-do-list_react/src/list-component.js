import React from "react";
import {toDoForm} from "./data.json"


function ToDoList() {
   return(

    toDoForm.map((data, key) =>
        <div key={key} className="taskWrapper">
            <ul>
            <li className='task'>To do: {data.task}</li>
            <li className='date'>Date due: {data.date}</li>
            </ul>
            <span className='removeBtn'>&times;</span>
        </div>
        )

)
}

export default ToDoList;