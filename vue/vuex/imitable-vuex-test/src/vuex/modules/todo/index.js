import actions from './actions';
import mutations from './mutations';

export default {
	state: {
		todoList:[],
		todoInfo:{
            id: 0,
            text: '',
            isDone: false,
        },
        selected: 0
	},
	actions: actions,
	mutations: mutations,
	getters: {
		/**
		 * [filterDoned description]
		 * 	currentState: 	当前 module中的state
		 * 	getters: 		当前 module中的getters
		 * 	ModuleState: 	store中的state
		 */
		filterDoned(currentState, getters, ModuleState, ){
			let todoList = currentState.todoList.filter((item)=>{
				if(item.isDone){
					return item;
				}
			});
			return todoList;
		},

		filterNoDoned(state){
			let todoList = state.todoList.filter((item)=>{
            if(!item.isDone){
              return item;
            }
          });
          return todoList;
		},
	},
};