
//object constructor for individual activities
function Activity(actName,value,price,day,start,end){
	this.actName = actName;
	this.value = value;
	this.price = price;
	this.day = (typeof day === 'undefined')? '': day;
	this.start = (typeof start === 'undefined')? '': start;
	this.end = (typeof end === 'undefined')? '' : end;
	this.id = this.value;
	
	//keeps track of how many activities this activity conflicts with
	this.conflictCount = 0;
}

//method for converting initial 24hr clock format into 12hr format
//takes 2 args(the time, whether or not to print trailing zeros)
Activity.prototype.convertTo12Hr = function(time,printZeroMins){
	//if time is not defined return an empty string
	if(time !== ''){
		//else split time into array with the zero index being hours and 1 index being minutes
		var splitTime = time.split(':');
		var hr = parseInt(splitTime[0]);
		var min = parseInt(splitTime[1]);
		
		//if before 12 hours, time of day is am otherwise its equal to pm
		if(hr < 12){
			var timeOfDay = 'am';
		}else{
			var timeOfDay = 'pm';
		}
		
		//if midnight or 0 hour change to 12am
		//else if hour is after twelve subtract twelve to find equivilent 12hr time and convert
		//to string
		if(hr === 0){
			hr = '12';
		}else if(hr > 12){
			hr = String((hr - 12));
		}
		//if minutes are less than 10 print padding zero
		//otherwise go ahead and convert minutes to string
		if(min < 10){
			min = '0' + min;
		}else{
			min = String(min);
		}
		
		//if printing zero minutes is true return time with zero minutes
		//otherwise just print the hour
		if(printZeroMins){
			return hr + ':' + min + timeOfDay;
		}else{
			if (min === '00'){
				return hr + timeOfDay;
			}else{
				return hr + ':' + min + timeOfDay;
			}
		}
	}else{
		return '';
	}
}

//function for converting time into seconds

Activity.prototype.convertToSeconds = function(time){
	if(time === ''){
		return false;
	}else{
		var splitTime = time.split(':');
		var hr = parseInt(splitTime[0]);
		var min = parseInt(splitTime[0]);
		
		//find seconds in hr
		var secHr = 60 * 60 * hr;
		var secMin = 60 * min;
		
		return secHr + secMin;
	}
}


//method returns a checkbox
Activity.prototype.toCheckBox = function(cbName){
	var label = document.createElement('label');
	var checkBox = document.createElement('input');
	checkBox.setAttribute('type','checkbox');
	checkBox.setAttribute('value',this.value);
	checkBox.setAttribute('name',cbName);
	checkBox.setAttribute('id',this.id);
	label.appendChild(checkBox);
	var description = this.actName + ' — ';
	 if(this.day !== ''){
		description +=  this.day + ' ';
	 }
	 if(this.start !== ''){
		description +=  this.convertTo12Hr(this.start,false);
	 }
	if(this.end !== ''){
		description += '-' + this.convertTo12Hr(this.end,false) +', ';
	}
	description += '$' + String(this.price);
	var descNode = document.createTextNode(description);
	label.appendChild(descNode);
	return label;
	
}

