var mainConference = new Activity('Main Conference','all',200);
var jsFrameWork= new Activity('JavaScript Frameworks Workshop','js-frameworks',100,'Tuesday','9:00','12:00');
var jsLibs = new Activity('JavaScript Libraries Workshop','js-libs',100,'Tuesday','13:00','16:00');
var expressWorkshop = new Activity('Express Workshop','express',100,'Tuesday','9:00','12:00');
var nodeWorkshop = new Activity('Node.js Workshop','node',100,'Tuesday','13:00','16:00');
var buildTools = new Activity('Build tools Workshop','build-tools',100,'Wednesday','9:00','12:00');
var npmWorkshop = new Activity('npm Workshop','npm',100,'Wednesday','13:00','16:00');
var railsWorkshop = new Activity('Rails Workshop','rails',100,'Wednesday','14:00','17:00');
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
var attendeeName = document.getElementById('name');
var mail = document.getElementById('mail');
var activities = document.getElementsByName('activities');
var shirtTheme = document.getElementById('design');
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

function validateName(){
	var valid = true;
	var error = document.createElement('p');
	error.setAttribute('class','error');
	error.setAttribute('id','nameError');
	var nameLabel = document.querySelector('label[for="name"]');
	if(empty(attendeeName)){
		valid = false;
	}
	
	if(!valid){
		if(document.getElementById('nameError') === null){
			error.innerHTML = 'Please enter a value for name.';
			attendeeName.parentNode.insertBefore(error,nameLabel);
		}
		return valid;
	}else{
		if(document.getElementById('nameError')){
			attendeeName.parentNode.removeChild(document.getElementById('nameError'));
		}
		return valid;
	}
	
}

function validateEmail(){
	var valid = true;
	var error = document.createElement('p');
	error.setAttribute('class','error');
	error.setAttribute('id','emailError');
	var emailLabel = document.querySelector('label[for="mail"]');

	if(empty(mail)){
		valid = false;
	}
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    valid = regex.test(mail.value);
	
	if(!valid){
		if(document.getElementById('emailError') === null){
			error.innerHTML = 'Please enter a valid email.';
			mail.parentNode.insertBefore(error,emailLabel);
		}
		return valid;
	}else{
		if(document.getElementById('emailError')){
			mail.parentNode.removeChild(document.getElementById('emailError'));
		}
		return valid;
	}
	
	
}



function validateActivities(){
	var valid = false;
	var error = document.createElement('p');
	error.setAttribute('class','error');
	error.setAttribute('id','activityError');
	var activityLabel = document.querySelector('.activities').querySelector('label');
	for(var i in activities){
		if(activities[i].checked){
			valid = true;
			break;
		}
	}
	
	if(!valid){
		if(document.getElementById('activityError') === null){
			error.innerHTML = 'Please select an activity to attend.';
			activityLabel.parentNode.insertBefore(error,activityLabel);
		}
	}else{
		if(document.getElementById('activityError')){
			activityLabel.parentNode.removeChild(document.getElementById('activityError'));
		}
	}
	return valid;
}

function validateshirtSelect(){
	var valid = false;
	var error = document.createElement('p');
	error.setAttribute('class','error');
	error.setAttribute('id','shirtError');
	var shirtLabel = document.querySelector('label[for="size"]');
	if(shirtTheme.value === 'none'){
		valid = false;
	}else{
		valid = true;
	}
	
	if(!valid){
		if(document.getElementById('shirtError') === null){
			error.innerHTML = 'Shirt theme is not selected.';
			shirtLabel.parentNode.parentNode.insertBefore(error,shirtLabel.parentNode);
		}
	}else{
		if(document.getElementById('shirtError')){
			shirtLabel.parentNode.parentNode.removeChild(document.getElementById('shirtError'));
		}
	}
	return valid;
}


function validatePayment(){
	var valid = true;
	var error = document.createElement('p');
	error.setAttribute('class','error');
	error.setAttribute('id','cardError');
	var cardLabel = document.querySelector('label[for="payment"]');
	if(paymentSelect.value === 'select_method'){
		valid = false;
		error.innerHTML = 'Please select a payment method.'
	}else if(paymentSelect.value === 'credit_card'){
		if(empty(cvv)){
			error.innerHTML = 'Please enter a cvv.';
			valid = false;
		}else if(! /^[0-9]{3,4}$/.test(cvv)){
			error.innerHTML = 'Please enter a valid cvv.'
			valid = false;
		}
		
		if(empty(zip)){
			error.innerHTML = 'Please enter a zip code.';
			valid = false;
		}else if(! /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)){
			error.innerHTML = 'Please enter a valid zip code.';
			valid = false;
		}
		
		
		var validNumberResult = validateCard(document.getElementById('cc-num').value);
		valid = validNumberResult;
		if(!valid){
			error.innerHTML = 'Please enter a valid credit card number.'
		}
	}
	
	if(!valid){
		if(document.getElementById('cardError') === null){
			cardLabel.parentNode.insertBefore(error,cardLabel);
		}else{
			cardLabel.parentNode.removeChild(document.getElementById('cardError'));
			cardLabel.parentNode.insertBefore(error,cardLabel);
		}
	}else{
		if(document.getElementById('cardError')){
			cardLabel.parentNode.removeChild(document.getElementById('cardError'));
		}
	}
	
	return valid;
	
}

//validateForm
attendeeName.onblur = function(){
	validateName();
}
mail.onblur = function(){
	validateEmail();
}

shirtTheme.onblur = function(){
	validateshirtSelect();
}

paymentSelect.onblur = function(){
	validatePayment();
}

var fullStackForm = document.getElementById('fullStackForm');

fullStackForm.addEventListener('submit',function(e){
	
	
	if(validateName() && validateEmail() && validateshirtSelect() && validatePayment() && validateActivities()){
		console.log('valid');
		e.preventDefault();
	}else{
		validateName();
		validateEmail();
		validateshirtSelect();
		validatePayment();
		validateActivities();
		console.log('not valid');
		e.preventDefault();
	}
}); 



