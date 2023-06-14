<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
      v-model="newTask"
      @keyup.enter="addTask"
      class="col"
      square
      filled
      bg-color="white"
      placeholder="Ajouter une tâche"
      dense>
        <template v-slot:append>
          <q-btn
          @click="addTask"
          round
          dense
          flat
          icon="add" />
        </template>
      </q-input>
    </div>
    <h5>À faire</h5>
    <q-list
    class="bg-white"
    separator
    bordered>
      <q-item
      v-for="(task, index) in tasks"
      :key="task.title"
      @click="task.done = !task.done"
      :class="{ 'done bg-grey-1' : task.done }"
      clickable
      v-ripple>
        <q-item-section avatar>
          <q-checkbox
          v-model="task.done"
          class="no-pointer-events"
          color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section
        v-if="task.done"
        side>
          <q-btn
          @click.stop="deleteTask(index)"
          flat
          round
          dense
          color="primary"
          icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!tasks.length"
      class="no-tasks absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary"/>
      <div class="text-h5 text-primary text-center">
        Pas de tâches
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({

  data(){
    return{
      newTask: '',
      tasks: [
        // {
        //   title: 'Get bananas',
        //   done: false
        // },
        // {
        //   title: 'Eat bananas',
        //   done: true
        // },
        // {
        //   title: 'Poo bananas',
        //   done: false
        // },
      ]
    }
  },
  methods:{
    deleteTask(index){
      this.$q.dialog({
        title: 'Confirm',
        message: 'Êtes vous sûr de vouloir supprimer cet item ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('Tâche effacée')
        axios.default.delete('http://localhost:3000').then(response => {
        console.log('tâche supprimée');
      }).catch(e => {
        console.log('erreur lors de la suppression');
      })
      })
    },
    addTask(){
      this.tasks.push({
        title: this.newTask,
        done: false
      })
      // this.newTask = ''

     var newTask = ''

      axios({
    method: 'post',
    url: 'http://localhost:3000/task',
    data: newTask
})
.then(function (reponse) {
    //On traite la suite une fois la réponse obtenue
    console.log(reponse);
})
.catch(function (erreur) {
    //On traite ici les erreurs éventuellement survenues
    console.log(erreur);
});

      // axios.default.get('http://localhost:3000').then(response => {
      //   console.log('ok');
      // }).catch(e => {
      //   console.log('non transmis');
      // })
    },
  }

})

</script>

<style lang="scss">
  .done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb
    }
  }
  .no-tasks {
    opacity: 0.5;
  }
</style>
