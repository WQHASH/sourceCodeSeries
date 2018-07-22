import Vue from 'vue';

const bus = new Vue();

export default bus;

/**
 * wq: 这里定义一个空的vue实例应该是作为中央事件总线，作为vue 组件之间通信的媒介。
 */