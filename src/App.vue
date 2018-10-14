<template>
<div  id="app" class="el-row demo-container">
  <div class="el-col el-col-24">
  <div class="grid-content bg-purple-dark">
     <header class="el-header" >About</header>
     <main class="el-main"> 
        <todo-list></todo-list>  </main>
     
    </div>
  </div>
</div>    
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  border:1px solid lightgray;
  background:white;
  border-radius:3px;
}


#app {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

header {
  height: 30px;
  font-size:12px;
  color:steelblue
}
main {
  background-color: #EFF6FC;
  border:1px solid steelblue;
  color: #333;
}
</style>
