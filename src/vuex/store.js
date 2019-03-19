import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// // 应用初始状态
// const state = {
//     count: 10
// }

// // 定义所需的 mutations
// const mutations = {
//     INCREMENT(state) {
//         state.count++
//     },
//     DECREMENT(state) {
//         state.count--
//     }
// }

// // 创建 store 实例
// export default new Vuex.Store({
//     actions,
//     getters,
//     state,
//     mutations
// })
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
     dataSave (state,value) {
      state.count =value
    }
  },
  getters: {
    getCount: state => {
      return state.count
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    //  dataSave (cont,value) {
    //     console.log("123123+++++"+value)
    //   cont.commit('dataSave',value)
    // }
    dataSave ({ commit },value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('dataSave',value)
        resolve("success")
      }, 1000)
    })
  }
  }
})

export default store