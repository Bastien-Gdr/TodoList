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
      })
    },
    addTask(){
      this.tasks.push({
        title: this.newTask,
        done: false
      })
      this.newTask = ''

      axios.get('https://http://localhost:9000/api/?something=1').then(response => {
        console.log(ok);
      }).catch(e => {
        console.log(pasok);
      })
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
