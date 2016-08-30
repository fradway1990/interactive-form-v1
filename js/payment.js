//Payment Stuff
var currentForm = '';

var paymentSelect = document.getElementById('payment');
var cvv = document.getElementById('cvv');
var zip = document.getElementById('zip');
var creditCardForm = document.getElementById('credit-card');
var creditCardClone = creditCardForm.cloneNode('true');
var paypalTxt = document.getElementById('paypalTxt');
var paypalTxtClone = paypalTxt.cloneNode('true');
var bitCoinTxt = document.getElementById('bitCoinTxt');
var bitCoinTxtClone = bitCoinTxt.cloneNode('true');

//remove forms

creditCardForm.parentNode.removeChild(creditCardForm);
paypalTxt.parentNode.removeChild(paypalTxt);
bitCoinTxt.parentNode.removeChild(bitCoinTxt);


paymentSelect.onchange = function(){
	if(currentForm !== ''){
		this.parentNode.removeChild(currentForm);
	}
	if(this.value === 'select_method'){
		currentForm = '';
	}else if(this.value === 'credit_card'){
		this.parentNode.appendChild(creditCardClone);
		currentForm = creditCardClone;
	}else if(this.value === 'paypal'){
		this.parentNode.appendChild(paypalTxtClone);
		currentForm = paypalTxtClone;
	}else if(this.value === 'bitcoin'){
		this.parentNode.appendChild(bitCoinTxtClone);
		currentForm = bitCoinTxtClone;
	}
}


function validateCard(cardNum){
	var valid = false;
	var total = 0;
	var number = String(cardNum);
	//convert card number to array
	var numberArray = number.split('');
	//remove last number in string and convert to integer
	var lastDigit = parseInt(numberArray.pop());
	//convert strings in array to numbers
	for(var i in numberArray){
		numberArray[i] = parseInt(numberArray[i]);
	}
	
	//reverse the digits
	var lastNumber = numberArray[numberArray.length - 1];
	numberArray[numberArray.length - 1] = numberArray[0];
	numberArray[0] = lastNumber;
	
	//multiply odd digits by 2
	for(var i in numberArray){
		if( i % 2 !== 0){
			numberArray[i] *= 2 ;
		}
		
		//subtract 9 from numbers over 9
		if(numberArray[i] > 9){
			numberArray[i] -= 9;
		}
		
		//add to total
		total += numberArray[i];
	}
	
	//if mod10 of total === lastDigit number is valid
	if(total % 10 === lastDigit){
		valid = true;
	}
	
	return valid;
}