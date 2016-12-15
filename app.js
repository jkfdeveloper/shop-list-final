
var state = {
		items:[]
	}
var itemTemplate = (
		'<li>'+
			'<span class="shopping-item js-shopping-item"></span>' +
    			'<div class="shopping-item-controls">' +
		      		'<button class="js-shopping-item-toggle">' +
		       		'<span class="button-label">check</span>' +
		      		'</button>' +
		      		'<button class="js-shopping-item-delete">' +
		        	'<span class="button-label">delete</span>' +
		      		'</button>' +
		      		'<button class="refresh">' +
		      		'<span class="button-label">refresh</span>'+
		      		'</button>'+
	    		'</div>' +
  		'</li>'
	)

function addItem(state, item, element){
	var newItemObj = {
			displayName:item,
			checkedOff: false
		}

	state.items.push({
	displayName: item,
	checkedOff: false
	});
	//new
	var htmlToAdd = renderItem(newItemObj);
	element.append(htmlToAdd);
}
var renderList = function(state, element) {
	element.empty();
	
    var itemsHTML = state.items.map(function(item , index) {
        return renderItem(item);
    });

    for (var i = 0; i< itemsHTML.length; i++){
    	element.append(itemsHTML[i]);
    }
    
    
};
function UpdateAddItem(){

}

function renderItem(item){
	var element = $(itemTemplate);
	if (item.checkedOff == false){
	element.find('.js-shopping-item').text(item.displayName);
	console.log('check false');
	return element;
	}else{
		element.find('.js-shopping-item').addClass('shopping-item__checked').text(item.displayName);
		return element;
		//add class first, then .text, code below did not work
		//var $xxx = element.find('.js-shopping-item');
		//$xxx.text(item.displayName);
		//$xxx.addClass('shopping-item__checked');
		//console.log('check working');
		//element =  $xxx;
		//return element;
	}
}
function clearList(){
	state.items = [];
	$('.shopping-list').empty();
	//renderList(state, $('.shopping-list'));
}
///////////////////// GO ////////////////////////////////////////
$(function(){
	
	//SUBMIT ENTRY
		$('#js-shopping-list-form').on('submit',function(event){
		event.preventDefault();
		var newItem = $(this).find('#shopping-list-entry').val();
		if (newItem == ''){
			return;
			}else{
				addItem(state, newItem , $('.shopping-list'));
		
				//renderList(state, $('.shopping-list'));
				this.reset();
			}
	})
		////CLEAR ALL
		$('#clear').on('click', function(event) {
			event.preventDefault();
			console.log("clicked clear");
			clearList();
		})
		//CHECK OFF AND DELETE
		$('.shopping-list').on('click','button' ,function(event){
			console.log('toggle clicked');
			var buttonType = $(this);

			if (buttonType.is('[class="js-shopping-item-toggle"]')){
				var checkedItem = $(event.target.closest('li'));//.find('.shopping-item');
				var num = checkedItem.index();
				state.items[num].checkedOff = true;
				checkedItem.find('.shopping-item').toggleClass('shopping-item__checked');
				if (state.items[num].checkedOff == true){
							state.items[num].checkedOff = false;
						}else{
							state.items[num].checkedOff = true;
						}
				//state.splice(num, 1);
				//checkedItem.remove();
				/*
				for (i=0; i < state.items.length; i++){
					if (state.items[i].displayName == checkedItem.text()){
						if (state.items[i].checkedOff == true){
							state.items[i].checkedOff = false;
						}else{
							state.items[i].checkedOff = true;
						}	
						checkedItem.toggleClass('shopping-item__checked', state.items[i].checkedOff);
					}
				}*/
				}

			//DELETE
			if (buttonType.is('[class="js-shopping-item-delete"]')){
				//var toRemove =  $(event.target.closest('li')).find('.shopping-item').text();
				var toRemove =  $(event.target.closest('li'));
				toRemove.remove();
				state.items.splice([toRemove.index()],1);
				//$(event.target.closest('li')).remove();
				/*for (i=0; i < state.items.length; i++){
					if (state.items[i].displayName == toRemove){
						state.items.splice([i], 1);
					}
				}	*/		
				}	
				if (buttonType.is(['class="refresh'])){
					renderList(state, $('.shopping-list'));
				}
		})	
})