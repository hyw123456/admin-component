import ElmForm from './components/form/elmForm'
import ElmFormAlert from './components/form/alertForm'
export const plugin =   {

    install(Vue, options) {
        Vue.prototype.$myMethod = function (options) {
            // 逻辑...
            console.log('hyw');
        }
        var form = Vue.extend(ElmForm)
        var alert = Vue.extend(ElmFormAlert)
        Vue.component('elm-form', form)
        Vue.component('elm-alert-form', alert)

    }

}
