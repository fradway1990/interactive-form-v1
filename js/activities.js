function Activities(array){
	this.array = array;
}

Activities.prototype.displayList = function(el,name){
	var _this = this;
	var array = this.array;
	for(var i = 0; i < array.length ;i++){
		var activity = array[i];
		var checkBox = activity.toCheckBox(name);
		el.appendChild(checkBox);
		(function(activity){
				document.getElementById(activity.id).onchange = function(){
				
				if(this.checked){
					//check for conflict
					_this.handleConflicting(activity,true);
				}else{
					//enable conflicting activities
					_this.handleConflicting(activity,false);
				}
			}
		})(activity);
	}
}
Activities.prototype.handleConflicting = function(activity,disable){
	var array = this.array;
	//initialize variables for activity time and day
	var startTime = activity.convertToSeconds(activity.start);
	var endTime = activity.convertToSeconds(activity.end);
	var day = activity.day;
	for(var i = 0; i < array.length ; i++){
		//initialize variables for competingActivity time and day
		var competingActivity = array[i];
		var competingStart = competingActivity.convertToSeconds(array[i].start);
		var competingEnd = competingActivity.convertToSeconds(array[i].end);
		var competingDay = competingActivity.day;
		
		//if days are different continue loop or activities are the same
		//continue loop
		if(day != competingDay || activity.id === competingActivity.id){
			continue;
		}
		
		//function used for disabling or enabling events
		function handleEvent(){
			if(disable){
				document.getElementById(competingActivity.id).disabled = true;
				document.getElementById(competingActivity.id).checked = false;
				competingActivity.conflictCount += 1;
			}else{
				competingActivity.conflictCount -= 1;
				if(competingActivity.conflictCount === 0){
					document.getElementById(competingActivity.id).disabled = false;
					
				}
			}
		}
		
		if(startTime === competingStart){
			//if start times are the same
			handleEvent();
		}else if(endTime === competingEnd ){
			//if end times are the same
			handleEvent();
		}else if(competingStart > startTime && competingEnd < endTime){
			//if competing event starts after and ends before
			handleEvent();
		}else if(competingStart < startTime && competingEnd > endTime){
			//if competing event starts before and ends after
			handleEvent();
		}else{
			continue;
		}
	}
	
}
