<template>
  <div>
    <p>Критерий: {{ criterion.description }}</p>
    <p>График функции принадлежности данного критерия:</p>
    <img :src="criterion.path" alt="график" align="middle" width="700"/>
    <p>Вид функции:</p>
    <img :src="criterion.function">
    <div v-if='step === 0'>
      <p>Необходимо по графику функции принадлежности и её общему виду восстановить неизвестные коэффициенты</p>
      <q-input v-for='(item, index) of letter.slice(0, criterion.koef.length)'
       :key='index'
       class='input'
       outlined
       v-model="user_koef[index]"
       placeholder='0.000'
       :label='item'
       @change='valid(user_koef[index])'
      />
      <div class="clr"></div>
      <q-btn @click='first_check()' color='secondary' label='Проверить'/>
    </div>
    <div v-else-if='step === 1'>
      <p v-for='(item, index) of letter.slice(0, criterion.koef.length)'
       :key='index'
       class='alternative'
      >
        {{ item }} = {{ criterion.koef[index] }};
      </p>
      <div class="clr"></div>
      <q-table
        class='table'
        :title='criterion.title'
        :columns='columns'
        :data='data'
        separator='cell'
        hide-bottom
      >
      </q-table>
      <div class="clr"></div>
      <q-input v-for='(item, index) of letter.slice(0, criterion.koef.length)'
       :key='index'
       class='input'
       outlined
       v-model="user_koef[index]"
       placeholder='0.000'
       :label='item'
       @change='valid(user_koef[index])'
      />
      <q-btn @click='second_check()' color='secondary' label='Проверить'/>
    </div>
    <div v-else>
      56
      <button-next :total_step='total_step' :current_step='current_step' label='Продолжить'/>
    </div>
    <p v-if='error' style='color: red'>Неверно</p>
    <p v-if='validation' style='color: red'>Проверьте корректность ввода</p>
  </div>
</template>

<script>
export default {
  name: 'function',
  data () {
    return {
      step: this.internal_step,
      letter: ['a', 'b', 'c'],
      user_koef: ['', '', ''].slice(0, this.criterion.koef.length),
      error: false,
      validation: false,
      columns: [
        { name: 'name', required: true, label: 'Альтернатива', field: row => row.name, align: 'left' },
        { name: 'value', label: 'Значение данного критерия', field: 'value', align: 'right' }
      ]
    }
  },
  props: ['total_step', 'current_step', 'criterion', 'alternative', 'internal_step', 'matrix'],
  computed: {
    data () {
      const array = []
      for (let i = 0; i < 3; i++) {
        array.push({ name: this.alternative[i].description, value: this.alternative[i][this.step] })
      }
      return array
    }
  },
  methods: {
    compare (a, b) {
      if (Math.abs(a) < 1) {
        if (b < a + 0.1 && b > a - 0.1) { return false } else { return true }
      } else {
        if ((a / b < 1.1 && a / b > 0.9) || (b / a < 1.1 && b / a > 0.9)) { return false } else { return true }
      }
    },
    valid (a) {
      if (((!+a && +a !== 0) || a[a.length - 1] === '.' || a[0] === '.') && a !== '') {
        this.validation = true
        return true
      } else {
        this.validation = false
        return false
      }
    },
    first_check () {
      for (let i = 0; i < this.user_koef.length; i++) {
        if (this.valid(this.user_koef[i]) || this.user_koef[i] === '') {
          this.validation = true
          return true
        }
      }
      for (let i = 0; i < this.user_koef.length; i++) {
        if (this.compare(this.criterion.koef[i], +this.user_koef[i])) {
          this.error = true
          this.$emit('error', [2, 1])
          return 0
        }
      }
      this.error = false
      this.step++
      this.$emit('criterion')
    },
    second_check () {
      for (let i = 0; i < this.user_koef.length; i++) {
        if (this.valid(this.user_koef[i]) || this.user_koef[i] === '') {
          this.validation = true
          return true
        }
      }
      for (let i = 0; i < this.user_koef.length; i++) {
        if (this.compare(this.matrix[i], +this.user_koef[i])) {
          this.error = true
          this.$emit('error', [2, 1])
          return 0
        }
      }
      this.error = false
      this.step++
      this.$emit('criterion')
    }
  }
}
</script>

<style scoped>
  .input {
    display: inline-block;
    margin: 30px 100px 40px 0;
  }

  .clr {
    clear: both;
  }

  .alternative {
    display: inline-block;
    font-family: Arial, sans-serif;
  }

  .table {
    display: inline-table;
  }
</style>
