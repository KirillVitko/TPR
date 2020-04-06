<template>
  <div class='q-pa-md'>
    <q-stepper
      v-model='current_step'
      header-nav
      color='secondary'
      animated
    >
      <q-step
        :name='0'
        title='Условие'
        icon='assignment'
        :header-nav='true'
        :done='total_step > 0'
      >
        <condition
          :condition='condition'
          :total_step='total_step'
          :current_step='current_step'
        />
      </q-step>

      <q-step v-for='(item, index) of question.slice(0,2)'
        :key='index'
        :title='`Вопрос ${index + 1}`'
        :name='index + 1'
        icon='assignment'
        :header-nav='total_step > index'
        :done='total_step > index + 1'
      >
        <question
          :question='item'
          :total_step='total_step'
          :current_step='current_step'
          :user_answer='user_answer[index]'
          @error='question_error($event, index)'
          @right='question_right($event, index)'
        />
      </q-step>

      <q-step v-for='index of range(this.condition.criterion.length)'
        :key='index'
        :title='`Критерий ${index + 1}`'
        :name='index+3'
        icon='assignment'
        :header-nav='total_step > index + 2'
        :done='total_step > index + 3'
      >
        <function
          :total_step='total_step'
          :current_step='current_step'
          :criterion='condition.criterion[index]'
          :alternative='condition.alternative'
          :array='first_value[index]'
          @criterion='criterion(index)'
          @error='marking(5,1)'
        ></function>
      </q-step>

      <q-step v-for='(item, index) of question.slice(2,4)'
        :key='index + 2'
        :title='`Вопрос ${index + 3}`'
        :name='index + 7'
        icon='assignment'
        :header-nav='total_step > index + 6'
        :done='total_step > index + 7'
      >
        <question
          :question='item'
          :total_step='total_step'
          :current_step='current_step'
          :user_answer='user_answer[index + 2]'
          @error='question_error($event, index + 2)'
          @right='question_right($event, index + 2)'
        />
      </q-step>

      <q-step v-for='index of range(this.condition.alternative.length)'
        :key='index'
        :title='`Альтернатива ${index + 1}`'
        :name='index + 9'
        icon='assignment'
        :header-nav='total_step > index + 8'
        :done='total_step > index + 9'
      >
      <alternative
        :total_step='total_step'
        :current_step='current_step'
        :array1='second_value[index]'
        :array2='third_value[index]'
        :array3='fourth_value[index]'
        :array4='fifth_value[index]'
        :alternative='condition.alternative[index]'
        :criterion='condition.criterion'
        :rules='condition.rules.text'
        @error='marking($event[0], $event[1])'
      />
      </q-step>

      <q-step
        :name='12'
        title='Вопрос 5'
        icon='assignment'
        :header-nav='total_step > 11'
        :done='total_step > 12'
      >
        <question
          :question='question[4]'
          :total_step='total_step'
          :current_step='current_step'
          :user_answer='user_answer[4]'
          @error='question_error($event, 4)'
          @right='question_right($event, 4)'
        />
      </q-step>

      <q-step
        :name='13'
        title='Ответ'
        icon='assignment'
        :header-nav='total_step > 12'
        :done='total_step > 13'
      >
        <assessment
          :total_step='total_step'
          :current_step='current_step'
          :alternative='condition.alternative'
          :array1='fifth_value'
          :array2='sixth_value'
          @error='marking($event[0], $event[1])'
        />
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
/* eslint no-eval: 0 */
import { bus } from '../router/index.js'
export default {
  name: 'main_page',
  data () {
    return {
      total_step: 14,
      current_step: this.total_step ? this.total_step : 0,
      mark: [8, 8, 8, 8, 8, 12, 12, 12, 12, 12],
      user_answer: [0, 0, 0, 0, 0],
      condition: {
        goal: 'Выбрать лучшую экономическую стратегию',
        criterion: [
          {
            title: 'С1 Производительность',
            description: 'С1 Производительность - объём товаров и услуг (в сотнях в час), создаваемых в единицу времени',
            function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
            path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncfor13graph.png?alt=media&token=de97c7c6-28d2-4040-a2bc-614e835352d4',
            count: 3,
            graphic: '',
            koef: [100, 20, 0.05],
            functioncompute: '100*x**2+20*x+0.05'
          },
          {
            title: 'С2 Финансовая осуществимость стратегии',
            description: 'С2 Финансовая осуществимость стратегии – средства (в млн долл), которые потребуются организации для того, чтобы проводить конкретную стратегию',
            function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusb.png?alt=media&token=6eb0aa60-1e59-4b5a-b2b7-8309b10d2c10',
            path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusbgraph.png?alt=media&token=281736df-180e-4d89-b254-81f42ebc2173',
            count: 2,
            graphic: '',
            koef: [0.5, 0.1],
            functioncompute: 'x**0.5+0.1'
          },
          {
            title: 'С3 Конкурентоспособность',
            description: 'С3 Конкурентоспособность – преимущество одного предприятия по отношению к другим данной отрасли внутри страны и за ее пределами',
            function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1.png?alt=media&token=9ed526ea-3e16-4ce7-ba44-3943644fcec6',
            path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1graph.png?alt=media&token=573b2204-4619-463c-aef0-0c9ac65ff67f',
            functioncompute: '2**x-1'
          },
          {
            title: 'С4 Риск',
            description: 'С4 Риск – возможность невыполнения фирмой своих обязательств перед заказчиком',
            function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.14.png?alt=media&token=af3d0f91-f896-4dc0-ab12-8bf7ab94b1cf',
            path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
            functioncompute: '1-x/4'
          }
        ],
        alternative: [
          {
            description: 'A1 Концентрированный рост',
            1: 100,
            2: 0.4,
            3: ['высокая', 0.75],
            4: ['низкий', 1]
          },
          {
            description: 'A2 Интеграция',
            1: 90,
            2: 0.1,
            3: ['низкая', 0.25],
            4: ['высокий', 3]
          },
          {
            description: 'A3 Диверсификация',
            1: 140,
            2: 0.28,
            3: ['высокая', 0.75],
            4: ['средний', 2]
          }
        ],
        weight: [0.31, 0.23, 0.15, 0.31],
        rules: {
          text: ['Если и С2 = подходящее, и С4 = подходящее, С3 = подходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и С4 = неподходящее, и С1 = неподходящее, то Y = неудовлетворительный', 'Если и С2 = подходящее, и С4 = подходящее, и С1 = подходящее, и С3 = подходящее, то Y = безупречный'],
          formula: ['Math.min(q[1],q[3],q[2])', 'Math.min(1-q[1],1-q[3],1-q[0])', 'Math.min(q[0],q[1],q[2],q[3])']
        },
        tables: {
          importance: [0.2, 0.5, 0.75],
          linguistic: [0.2, 0.4, 0.55, 0.7, 0.75]
        }
      },
      question: [
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        }
      ]
    }
  },
  computed: {
    first_value () {
      const matrix = []
      for (let i = 0; i < this.condition.criterion.length; i++) {
        matrix.push([])
      }
      for (let i = 0; i < this.condition.criterion.length; i++) {
        for (let j = 0; j < this.condition.alternative.length; j++) {
          matrix[i].push(+eval(this.condition.criterion[i].functioncompute.replace(/x/g, typeof this.condition.alternative[j][i + 1] === 'number' ? this.condition.alternative[j][i + 1] : this.condition.alternative[j][i + 1][1])).toFixed(3))
        }
      }
      return matrix
    },
    second_value () {
      const matrix = []
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
      }
      for (let i = 0; i < this.condition.criterion.length; i++) {
        for (let j = 0; j < this.condition.alternative.length; j++) {
          matrix[j][i] = this.first_value[i][j]
        }
      }
      return matrix
    },
    third_value () {
      const matrix = []
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
        for (let j = 0; j < this.condition.rules.formula.length; j++) {
          matrix[i].push(+eval(this.condition.rules.formula[j].replace(/q/g, 'this.second_value[' + i.toString() + ']')).toFixed(3))
        }
      }
      return matrix
    },
    fourth_value () {
      const matrix = []
      let kk
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
        for (const [index, j] of this.third_value[i].entries()) {
          for (let k = 0; k <= 1; k += 0.1) {
            kk = +k.toFixed(3)
            matrix[i].push(+Math.min(1, 1 - j + (index === 0 ? kk : index === 1 ? (1 - kk) : kk === 1 ? 1 : 0)).toFixed(3))
          }
        }
      }
      return matrix
    },
    fifth_value () {
      const matrix = []
      for (let i = 0; i < this.fourth_value.length; i++) {
        matrix.push([])
        for (const j of this.range(11)) {
          matrix[i].push(Math.min(this.fourth_value[i][j], this.fourth_value[i][j + 11], this.fourth_value[i][j + 22]))
        }
      }
      return matrix
    },
    sixth_value () {
      let sortArray
      const Y = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      const array = this.fifth_value.map(item => {
        let mark = 0
        const copyArray = Object.assign([], item)
        sortArray = copyArray.sort().filter((value, index) => copyArray.indexOf(value) === index)
        for (let i = 0; i < sortArray.length; i++) {
          let sum = 0
          let k = 0
          for (let j = 0; j < item.length; j++) {
            if (sortArray[i] <= item[j]) {
              sum += Y[j]
              k += 1
            }
          }
          mark += sum / k * (i === 0 ? sortArray[0] : sortArray[i] - sortArray[i - 1])
        }
        mark = mark / sortArray[sortArray.length - 1]
        return +mark.toFixed(3)
      })
      return array
    }
  },
  created () {
    bus.$on('next_step', () => {
      if (this.total_step === this.current_step) {
        this.total_step += 1
      }
      this.current_step += 1
    })
  },
  methods: {
    range (n) {
      return [...Array(n).keys()]
    },
    marking (n, k) {
      this.mark[n] = this.mark[n] ? this.mark[n] - k : 0
    },
    question_error (array, index) {
      this.user_answer[index] = array
      this.marking(index, 8)
    },
    question_right (array, index) {
      this.user_answer[index] = array
    }
  }
}
</script>

<style>
  * {
    font-size: 20px;
  }

  .clr {
    clear: both;
  }

  .input {
    display: inline-block;
    margin: 30px 100px 40px 0;
  }

  .table {
    display: inline-table;
    margin-bottom: 30px;
  }
</style>
