
var alphabet="abcdefghijklmnopqrstuvwxyz".split('');

//linear swap

function simplecode(){
	var displaceby=parseInt(document.getElementById('displaceby').value);
	var textin=document.getElementById('simpletextin').value +'';
	var textout=document.getElementById('simpletextout');
	

	
	var original=textin.toLowerCase().split('');
	var message='';
	for (i=0; i <original.length;i++){
		for (j=0; j<alphabet.length; j++){
			if (original[i]==alphabet[j]){
				original[i]=alphabet[(j+displaceby)%26];
				break;
			}
		}
		message+=original[i];
	}
	textout.value=message.toString();
}

function simpledecode(){
	var displaceby=parseInt(document.getElementById('displaceby').value);
	var textin=document.getElementById('simpletextin').value +'';
	var textout=document.getElementById('simpletextout');
	
	var original = textin.toLowerCase().split('');
	var message='';
	for (i=0; i<original.length;i++){
		for (j=0; j<alphabet.length; j++){
			if (original[i]==alphabet[j]){
				original[i]=alphabet[(j-displaceby+26)%26];
				break;
			}
		}
		message+=original[i];
	}
	textout.value=message.toString();
}



//random swap

function letterswapkeygen(){
	var sackey ="abcdefghijklmnopqrstuvwxyz".split('');
	var letterswapkey='';
	var letterkey=document.getElementById('letterkey');
	for (i=0; i<26; i++){
		var rannum=Math.floor(Math.random()*(sackey.length));
		letterswapkey+=sackey[rannum];
		sackey.splice(rannum,1);
	}
	letterkey.value=letterswapkey;
}

function letterswapcode(){
	var swapkey=document.getElementById('letterkey').value+'';
	var letterswapin=document.getElementById('letterswapin').value+'';
	var letterswapout=document.getElementById('letterswapout');

	var scramblebase="abcdefghijklmnopqrstuvwxyz".split('')
	var swapkeytwo= swapkey.toLowerCase().split('');
	
	var original = letterswapin.toLowerCase().split('');

	var message = '';
	for (i=0; i<original.length; i++){
		for (j=0; j<scramblebase.length;j++){
			if (original[i]==scramblebase[j]){
				original[i]=swapkeytwo[j];
				break;
			}
		}
		message+=original[i];
	}
	letterswapout.value=message.toString();

}

function letterswapdecode(){
	var swapkey=document.getElementById('letterkey').value+'';
	var letterswapin=document.getElementById('letterswapin').value+'';
	var letterswapout=document.getElementById('letterswapout');

	var scramblebase="abcdefghijklmnopqrstuvwxyz".split('')
	var swapkeytwo= swapkey.toLowerCase().split('');
	
	var original = letterswapin.split('');

	var message='';

	for (i=0; i<original.length; i++){
		for (j=0; j<swapkeytwo.length;j++){
			if (original[i]==swapkeytwo[j]){
				original[i]=scramblebase[j];
				break;
			}
		}
		message+=original[i];
	}
	letterswapout.value=message.toString();
}