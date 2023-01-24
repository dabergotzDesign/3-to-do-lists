<template>
    <ul @click.self="completedTask()" v-bind:style='{"border-color": (isComplete ? "lightgreen" : "grey")}' class="taskContainer">
        <span>&times;</span>
        <li v-bind:task="taskValue" class="task">Task: {{ taskValue }} </li>
        <li v-bind:date="dateValue" class="date">Date: {{ dateValue }}</li>
    </ul>
</template>
<script>
export default {
    name: "taskItem",
    data(){
        return{
            isComplete: false
        }
    },
    methods: {
        completedTask(){
            this.isComplete = !this.isComplete
        }
    }
}
</script>