/** 
* 马少良
*/

export default class Event {
	constructor(){
		this.obj = {}
	}

	subscribe(_status,handle){
		this.obj[_status] = this.obj[_status] || [];
		this.obj[_status].push(handle);
	}

	publish(_status){
		let listeners = this.obj[_status];

		if(listeners){
			for (let i = 0; i<listeners.length; i++) {
				listeners[i]();
			}
		}
	}

	unsubscribe(_status,handle){
		let listeners = this.obj[_status];

		if(listeners){
			for (let i = 0; i<listeners.length; i++) {
				if(listeners[i] === handle){
					listeners.splice(i,1);
					break;
				}
			}
		}				
	}	
}