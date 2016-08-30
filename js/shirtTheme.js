var shirtThemes = { 'JS Puns':[
						{'colorVal':'cornflowerBlue','colorTxt':'Cornflower Blue'},
						{'colorVal':'darkSlateGrey','colorTxt':'Dark Slate Grey'}
					],
					'I &#9829; JS':[
						{'colorVal':'gold','colorTxt':'Gold'},
						{'colorVal':'Tomato','colorTxt':'Tomato'},
						{'colorVal':'steelBlue','colorTxt':'Steel Blue'},
						{'colorVal':'dimGrey','colorTxt':'Dim Grey'}
					]
				};
var shirtSizes = {'small':'S','medium':'M','large':'L','xtra-large':'XL'}
function createShirtSizeSelect(){
	//create dropdown for sizes
	var sizeDiv = document.createElement('div');
	var sizeLabel = document.createElement('label');
	sizeLabel.setAttribute('for','size');
	sizeLabel.innerHTML = 'Size:';
	var sizeSelect = document.createElement('select');
	sizeSelect.setAttribute('id','size');
	for(var i in shirtSizes){
		var shirtOption = document.createElement('option');
		shirtOption.setAttribute('value',i);
		shirtOption.innerHTML = shirtSizes[i];
		sizeSelect.appendChild(shirtOption);
	}
	sizeDiv.appendChild(sizeLabel);
	sizeDiv.appendChild(sizeSelect);
	
	return sizeDiv;
}

function createShirtThemeSelect(){
	var themeDiv = document.createElement('div');
	var themeLabel = document.createElement('label');
	themeLabel.setAttribute('for','design');
	themeLabel.innerHTML = 'Design:';
	var themeSelect = document.createElement('select');
	themeSelect.setAttribute('id','design');
	
	var firstOption = document.createElement('option');
	firstOption.setAttribute('value','none');
	firstOption.innerHTML = 'Select Theme';
	themeSelect.appendChild(firstOption);
	for(var i in shirtThemes){
		var themeOption = document.createElement('option');
		themeOption.setAttribute('value',i);
		themeOption.innerHTML = i;
		themeSelect.appendChild(themeOption);
	}
	
	themeDiv.appendChild(themeLabel);
	themeDiv.appendChild(themeSelect);
	
	themeSelect.onchange = function(){
		if(this.value !=='none'){
			if(document.getElementById('colors-js-puns') !== null){
				var cs = document.getElementById('colors-js-puns');
				cs.parentNode.removeChild(cs);
			}
			var colorSelect = createColorSelect(this.value);
			this.parentNode.parentNode.appendChild(colorSelect);
		}else{
			if(document.getElementById('colors-js-puns') !== null){
				var cs = document.getElementById('colors-js-puns');
				cs.parentNode.removeChild(cs);
			}
		}
	}
	
	return themeDiv;
}

function createColorSelect(theme){
	var colorDiv = document.createElement('div');
	colorDiv.setAttribute('id','colors-js-puns');
	var colorLabel = document.createElement('label');
	colorLabel.setAttribute('for','color');
	colorLabel.innerHTML = 'Color:'
	var colorSelect = document.createElement('select');
	colorSelect.setAttribute('id','color');
	for(var i in shirtThemes[theme]){
		var colorOption = document.createElement('option');
		colorOption.setAttribute('value',shirtThemes[theme][i].colorVal);
		colorOption.innerHTML = shirtThemes[theme][i].colorTxt;
		colorSelect.appendChild(colorOption);
	}
	colorDiv.appendChild(colorLabel);
	colorDiv.appendChild(colorSelect);
	return colorDiv;
}

var shirtFieldSet = document.querySelector('.shirt');
shirtFieldSet.innerHTML = '';
var sizeSelect = createShirtSizeSelect();
var themeSelect = createShirtThemeSelect();
shirtFieldSet.appendChild(sizeSelect);
shirtFieldSet.appendChild(themeSelect);