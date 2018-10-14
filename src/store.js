import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const STORAGE_KEY = 'todo-storage';
let storeData = {
    newTodo: '',
    idForTodo: 1,
    beforeEditCache: '',
    todos: []
}
const getters = {
    todosFiltered: state => state.list.todos
}
const mutations = {
    addTodo(state) {


        state.list.todos.push({
            id: state.list.idForTodo,
            title: state.list.newTodo,
            completed: false
        })
        state.list.newTodo = ''
        state.list.idForTodo++

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list))
    },
    removeTodo(state, { index }) {
        state.list.todos.splice(index, 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list))
    },
    completeTodo(state, { todoSelected }) {
        state.list.todos.forEach((todo) => { if (todo.id == todoSelected.id) { todo.completed = todoSelected.completed } })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list))
    },
    loadTodo(state) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            console.log("inside")
            axios.get(`/static/json/todo-data.json`)
                .then(response => {
                    state.list.todos=response.data,
                    state.list.newTodo = ''
                    state.list.idForTodo=(response.data).length+1;
                    console.log(state);
                })
                .catch(e => {
                   console.log("Error Occured")
                })

        }



    }


}
const actions = {
    addTodo: ({ commit }) => {
        commit('addTodo')
    },
    removeTodo: ({ commit }, index) => {
        commit('removeTodo', { index })
    },
    completeTodo: ({ commit }, todoSelected) => {
        commit('completeTodo', { todoSelected })
    },
    loadTodo: ({ commit }, todoSelected) => {
        commit('loadTodo', { todoSelected })
    },

}

if (localStorage.getItem(STORAGE_KEY)) {
    storeData = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export const store = new Vuex.Store({
    state: {
        list: storeData
    },
    getters,
    mutations,
    actions
});
export default store;
