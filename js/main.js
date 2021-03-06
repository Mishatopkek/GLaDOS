$(function() {
	updateBlocks();
	
	//IN PREPARATION FOR A LIST OF THE RUNNING SYSTEMS
	window.systems=[
		["Courage",""],
		["is",""],
		["Not",""],
		["the",""],
		["Abscence",""],
		["of",""],
		["Fear",""],
		["A",""],
		["Trusted",""],
		["Friend",""],
		["in",""],
		["Science",""],
	];
	
	var systemsdevices="";
	var i=0;
	while (i<window.systems.length) {
		//ONLY TILL I HAVE THE SYSTEM STATS
		direction="up";
		flo="right";
		if (i<6) {
			direction="down";
			flo="left";
		}
		systemsdevices+='<div id="'+window.systems[i][0]+'" class="column '+direction+'" style="float:'+flo+';">';
		//END FILLER
		
		var bittybits=stringToBits(window.systems[i][0]);
		//systemsdevices+='<div id="'+window.systems[i][0]+'" class="column" style="float:'+flo+';">';
		var bits="";
		var j=0;
		while (j<bittybits.length) {
			if (bittybits[j]=="1") {
				bits+='<div class="one"></div>';
			} else {
				bits+='<div class="zero"></div>';
			}
			j++;
		}
		systemsdevices+=bits+bits+bits+bits+'</div>';
		i++;
	}
	$("#systems").html(systemsdevices);
	
	//NOT NECESSARY YET
	/*
	setInterval(function() {
		updateSystems();
	},10000);
	updateSystems();
	*/
	
	window.ctrlDown = false;

    $(document).keydown(function(e) {
        if (e.which == 17) ctrlDown = true;
    }).keyup(function(e) {
        if (e.which == 17) ctrlDown = false;
    });
});

setInterval(function() {
	updateBlocks();
},60000);

window.cursorstate=true;
setInterval(function() {
	if (window.cursorstate) {
		$("#cursorblinking").text("\
		.mark {\
			text-decoration:none;\
		}\
		");
		window.cursorstate=false;
	} else {
		$("#cursorblinking").text("\
		.mark {\
			text-decoration:underline;\
		}\
		");
		window.cursorstate=true;
	}
},350);

function updateSystems() {
	var i=0;
	while (i<window.systems.length) {
		request=$.getJSON(window.systems[i][1]);
		request.done(function(data) {
			time=new Date().getTime() / 1000;
			difference = time - data[1];
			if (difference < 60) {
				$("#"+data[0]).removeClass("down");
				$("#"+data[0]).addClass("up");
			} else {
				$("#"+data[0]).removeClass("up");
				$("#"+data[0]).addClass("down");
			}
		});
		request.fail(function() {
			console.log("Failed to load systems status.");
		});
		i++;
	}
}

function updateBlocks() {
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=YM17fqok3rdBeQfPD1F1CzqB0jqS3hPO");
	request.done(function(data) {
		$("#temperature").html(data.substr(0,4));
	});
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=BXLm1Mlg1PQhw5kaAQaLEMx8cZCSrOMR");
	request.done(function(data) {
		$("#humidity").html(data.substr(0,4));
	});
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=f8KxOxivgxtkm33mve6yUrADJS7R8EE0");
	request.done(function(data) {
		$("#dewpoint").html(data.substr(0,4));
	});
}
	
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function stringToBits(input) {
	output="";
	for (i=0; i < input.length; i++) {
        output +=input[i].charCodeAt(0).toString(2);
    }
	return output;
}

function doGetCaretPosition (oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus ();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange ();

    // Move selection start to 0 position
    oSel.moveStart ('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return (iCaretPos);
}