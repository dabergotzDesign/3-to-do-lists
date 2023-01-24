<template>
    <header>
    <h1>TO DO LIST VUE</h1>
    </header>
    <main class="container">
        <div class="addTaskMenu">
            <h3>create a new task</h3>
            <div class="formContainer">
                <form v-if="showForm">

                    <label>
                        <input v-model="taskValue" ref="taskInput" type='text' id='task' name='task' placeholder='Task' />
                    </label>

                    <label>
                        <input v-model="dateValue" ref="dateInput" type='text' id='date' name='date' placeholder='Date' />
                    </label>

                    <button id="submit" @click.prevent="getFormValue(); saveToDo();">Add</button>

                </form>
            </div>

            <button @click="toggleForm">
                <font-awesome-icon class="btnIcon" :icon="iconDirection" />
            </button>

        </div>
        <div v-for="(item, index) in newTask" :key="item.index" class="taskList">

        <ul :remove="removeItem"
            class="taskContainer">

            <span @click="completedTask()"><input type="checkbox" class="check"/></span>
            <li class="item">{{ item }} </li>
            <span class="remove" @click="removeItem(index)">&times;</span>

        </ul>

        </div>
    </main>
</template>


<script>
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faAngleDown, faAngleUp)

/* import ToDoTask from './ToDoTask.vue'; */


export default{
    name: 'ToDoList',
    components:{
        FontAwesomeIcon,
    },
    props:{
        item: Object
        },
    data(){
        return{
            showForm: false,
            isComplete: false,
            iconDirection: 'fa-angle-down',
            taskValue: '',
            dateValue: '',
            newTask: [],
            toDoStore: null,
        }
    },
    mounted(){
        if(localStorage.getItem('newTask')){
            try{
                this.newTask = JSON.parse(localStorage.getItem('newTask'))
            }catch(e){
                localStorage.removeItem('newTask');
            }
        }
    },
    computed:{
        sortIcon (){
            return this.iconDirection === 'fa-angle-down' ? ['fa-angle-down'] : ['fa-angle-up'];
        },
    },
    methods:{
        toggleForm(){
            this.showForm = !this.showForm
            this.iconDirection = this.iconDirection === 'fa-angle-down' ? 'fa-angle-up' : 'fa-angle-down';
        },
        completedTask(){
            this.isComplete = !this.isComplete
        },
        getFormValue(){

            this.taskValue = this.$refs.taskInput.value
            this.dateValue = this.$refs.dateInput.value            
            

            /* check if both form field are filled & create new task + date */
            if(this.taskValue !== '' && this.dateValue !== ''){
                
                this.newTask.push(
                "Task: " +
                this.$refs.taskInput.value +
                ' - ' +
                "Date: " +
                this.$refs.dateInput.value
                ) 
                               
            }

            /* alert if task/date field is not filled */
            if(this.taskValue === ''){
                alert("please fill out the task field")
            }
            if(this.dateValue === ''){
                alert("please fill out the date field")
            }

            /* empty form fields */
            this.taskValue = ''
            this.dateValue = '' 

        },
        /* remove item only when it's marked as "complete" */
        removeItem(index){
            if(this.isComplete == true){

                this.newTask.splice(index, 1)
                this.saveToDo();
                console.log("removed Item") 

            }   
        },
        addStoreItem(){
            if(!this.newTask){
                return;
            }

            this.newTask.push(this.toDoStore);
            this.toDoStore = '',
            this.saveToDo()
        },
        saveToDo(){
            const parsed = JSON.stringify(this.newTask);
            localStorage.setItem('newTask', parsed);
        }

    }
}
</script>