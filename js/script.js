var mainConference = new Activity('Main Conference','all',200);
var jsFrameWork= new Activity('JavaScript Frameworks Workshop','js-frameworks',100,'Tuesday','9:00','12:00');
var jsLibs = new Activity('JavaScript Libraries Workshop','js-libs',100,'Tuesday','13:00','16:00');
var expressWorkshop = new Activity('Express Workshop','express',100,'Tuesday','9:00','12:00');
var nodeWorkshop = new Activity('Node.js Workshop','node',100,'Tuesday','13:00','16:00');
var buildTools = new Activity('Build tools Workshop','build-tools',100,'Wednesday','9:00','12:00');
var npmWorkshop = new Activity('npm Workshop','npm',100,'Wednesday','13:00','16:00');

var activities = [mainConference,jsFrameWork,jsLibs,expressWorkshop,nodeWorkshop,buildTools,npmWorkshop];

var checkBoxList = new Activities(activities);
var actFieldset = document.querySelector('.activities');
var checkBoxNodes = actFieldset.querySelectorAll('label');

for(var i = 0; i < checkBoxNodes.length; i++){
	checkBoxNodes[i].parentNode.removeChild(checkBoxNodes[i]);
}

var activityList = new Activities(activities);

activityList.displayList(actFieldset,'activities');

//on pageload focus on first input
var theForm = document.getElementById('fullStackForm');
var firstInput = theForm.getElementsByTagName('input')[0];
firstInput.focus();

//polyfill for trim method
if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}


function empty(el){
	if(el.value.trim() === ''){
		return true;
	}else{
		return false;
	}
}

function validateEmail(email){
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
