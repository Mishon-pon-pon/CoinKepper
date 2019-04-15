import {highChart} from './highcharts.js'
import {vue} from './vue.js'

export const view = {
    vue: {
        instance: vue,
        updateVue: function(data) {
            this.instance.categories = data;
        }
    }, 
    highchart: {
        init: highChart,
        container: 'container',
        updateHighCart: function(data) {
            this.init(this.container, data);
        }
    }
}