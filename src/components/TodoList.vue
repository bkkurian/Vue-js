<template>
  <div class="container">
   <div  class="el-row mainContent" > 
      <div class="el-row">
        <div class="el-col el-col-20">
          <el-input placeholder="Create task" name="addTodoItem"  v-model="newTodo" @keyup.enter.native="addTodo()"></el-input> 
        </div>
        <div class="el-col el-col-1">&nbsp;
        </div>
        <div class="el-col el-col-3">
              <el-button type="button" name="AddButton"  size="medium" class="el-button--primary" @click="addTodo()"><span>Add</span></el-button>
        </div>
      </div>
      
    </div>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <el-checkbox  type="checkbox" name="completedCheckbox" v-model="todo.completed" @change="completeTodo(todo)"></el-checkbox>
        <div class="todo-item-label" :class="{ completed : todo.completed }">{{ todo.title }}</div>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
    </transition-group>
  </div>
</template>

<script>
const STORAGE_KEY='todo-storage';
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'todo-list',
  data () {
    return this.$store.state.list;
  },
  computed: mapGetters([
   'todosFiltered'
  ]),
  methods: mapActions([
    "addTodo",
    "removeTodo",
    "completeTodo",
    "loadTodo"
  ]),
  mounted() {
    console.log("inside");
  
   this.$store.dispatch( "loadTodo" );
  }
}
</script>

<style lang="scss">
  .mainContent{
    border-bottom:1px solid lightgray;
    padding:1em;
  }
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    padding-left:1em;
    padding-right:1em;
    border-bottom:1px solid #EFF6FC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
    font-size: 12px !important;
  }
  .todo-item:hover{
      background:#EFF6FC;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }

  .todo-item-left { 
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    margin-left: 12px;
  }


  .completed {
    text-decoration: bold;
    color: black;
  }


  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
