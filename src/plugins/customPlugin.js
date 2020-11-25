const customPlugin = {
  install: function (Vue, options) {

    // 1. Add global method or property
    Vue.myGlobalMethod = function () {
      alert('I am Global method')
    }

    Vue.myCustomProperty = 'I am Custom Property'

    // 2. Add global asset
    Vue.directive('blue-color', {
      bind(el, binding) {
        el.style.color = 'blue'
      }
    })

    // 3. inject som component options, mixins
    Vue.mixin({
      data () {
        return {
          custom_message: 'RAAAAAAWR'
        }
      },
      created() {
        console.log('Custom mixins created');
      },
      methods: {
        scream () {
          alert(this.custom_message)
        }
      }
    })

    // 4. Add an instance method or property
    Vue.prototype.$customMethod = function () {
      alert('I am Custom Instance method')
    }
  }
}

export default customPlugin
