import Vue from 'vue';
import Router from 'vue-router';
import Content from '@/views/Content'
import Charts from '@/views/Charts'
import Control_T from '@/views/Control_T'
import Control_RS from '@/views/Control_RS'
import Control_OC from '@/views/Control_OC'
import Splashscreen from '@/views/Splashscreen'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/monitor',
        name: 'Content',
        component: Content
    },
    {
        path: '/visual',
        name: 'Charts',
        component: Charts
    },
    {
        path: '/controlTorque',
        name: 'Control_T',
        component: Control_T
    },
    {
        path: '/controlRotarySpeed',
        name: 'Control_RS',
        component: Control_RS
    },
    {
        path: '/controlOperatingCond',
        name: 'Control_OC',
        component: Control_OC
    },
    {
        path: '/',
        name: 'Splashscreen',
        component: Splashscreen
    }]
    })
    