document.totalCost=0
document.selectCount=0

$(document).ready(function() {
	$("#choose-hall").on("click", ()=>
		{
			document.totalCost=0
			$("#cost").html(document.totalCost)
			window.console.log(document.getElementById("hall-value").value)
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	drawLayout($("#layout_svg"),this, document.getElementById("hall-value").value);
			    	$("#receipt").css("visibility","visible")
			    }
			}
			xhttp.open("GET", "docs/layout.xml", true);
			xhttp.send();
		})

	$("#book").on("click", function(e) {
		//populateReceipt()
		if ($(this).hasClass("button--disabled"))
		{
			//no seats are chosen
			let tooltip = $("#custom-tooltip")
			tooltip.html('No seats are selected')					
			tooltip.css({top: e.pageY - 40 + 'px', left: e.pageX + 'px' })
			tooltip.fadeIn(250, function() {
				setTimeout(function () {
					tooltip.fadeOut(200)
				},400)				
			})
		}
		else {
			let seatList = $("<ul>")
			$('.selected-seat').each(function(seat) {
				seatList.append(`<li>${$(this).children('circle').attr('data-title')}</li>`)
				$(this).removeClass('selected-seat')
				$(this).addClass('booked-seat')
				$(this).off()

				$(this).children('circle').tooltipster('content','BOOKED')
				$(this).children('circle').attr('r',document.radius*0.8)
			})
			
			$("#curtain").css("visibility","visible");
			$("#message .text").html(`You have successfully booked the following seats:`);
			$("#message .text").append(seatList);
			$("#message .text").append(`Total price: ${$('#cost').html()}$`);
			$("#message").css("visibility","visible")
			$("#book").addClass('button--disabled')
			document.selectCount=0
			document.totalCost=0
			$('#cost').html(document.totalCost)
		}		
	})

	$('#curtain').on("click", ()=> {
		$("#message").css("visibility","hidden");
		$("#curtain").css("visibility","hidden");
	})
	$("#close").on("click", ()=> {
		$("#message").css("visibility","hidden");
		$("#curtain").css("visibility","hidden");		
	})
})

function drawLayout(svgElement, xml, hall) {
    let xmlDoc = xml.responseXML;
    let rows = xmlDoc.getElementsByTagName(hall)[0].getElementsByTagName("row")
    let seatsInRow = rows[0].getElementsByTagName("seat").length
    let rowNumber=1
    let width = $(svgElement).css("width").slice(0,-2)
    let height = $(svgElement).css("height").slice(0,-2)
    let side
    let radius
    let offsetX
    let offsetY
    const paddingX = width*0.07
    const paddingY = height*0.07;
    const screenJeight = height/30
    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    $(svgElement).empty(); //clear the SVG
    
    //define proportions
    if ((seatsInRow+1)/(rows.length+1)>(width/height)) {
    	effWidth = width;
    	effHeight = width * (rows.length + 1)/(seatsInRow + 1);
    }
    else {
    	effWidth = height * (seatsInRow+1)/(rows.length+1);
    	effHeight = height;		    	
    }
    side = effWidth/(seatsInRow+1)
    offsetX = (width - effWidth)/2
    offsetY = (height - effHeight)/2
    radius = side * 0.4
    document.radius = radius

    //draw screen
    let altScreen = document.createElementNS("http://www.w3.org/2000/svg", "path")
    let dStr = "M" + parseInt(offsetX+side/3) + " " + parseInt(offsetY+side/2) + " Q "+ parseInt(offsetX+effWidth/2) +" "+ offsetY + " " + parseInt(offsetX+effWidth-side/3) + " " + parseInt(offsetY+side/2)
    $(altScreen).attr({d: dStr, stroke: "grey", "stroke-width": side/4, "stroke-linecap": "round", fill:"transparent"})
    $(svgElement).append(altScreen)

    //draw seats
    for (var i = 0; i<rows.length; i++) {	
    	let seats = rows[i].getElementsByTagName("seat")
    	let cost = rows[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue
    	let seatNumber = 1
    	for(var j=0; j<seats.length; j++) {
    		let value = seats[j].childNodes[0].nodeValue 
    		if (value != "Empty")
    		{
    			let group = document.createElementNS("http://www.w3.org/2000/svg", "g")
	    		let seat = document.createElementNS("http://www.w3.org/2000/svg", "circle")
	    		let seatNumberElt = document.createElementNS("http://www.w3.org/2000/svg", "text")
	    		let styleClass = (value == "Vacant") ? "vacant-seat" : "booked-seat";
	    		let title = (value == "Vacant") ? 'Price: '+cost+'$<br>' + 'Row: ' + alphabet[(rowNumber-1)%alphabet.length] + ' Seat: ' + seatNumber : "Booked";
	    		let m = (value == "Vacant") ?  1 : 0.8 
	    		$(seat).attr({cx: offsetX + side/2 + side/2 + j*side, cy: offsetY + side + side/2 + side*i, r: radius*m})
	    		$(seat).attr({"data-cost":rows[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue})
	    		$(seat).attr({title: title})
	    		$(seat).attr('data-title',`Row ${alphabet[(rowNumber-1)%alphabet.length]}, seat ${seatNumber}`)
	    		$(seatNumberElt).attr({x: offsetX + side/2 + side/2 + j*side, y:offsetY + side + side/2 + side/6 + side*i, "font-family":"Verdana", "font-size": radius})
	    		$(seatNumberElt).html(seatNumber)
	    		$(seat).addClass("tooltip")
	    		$(seat).tooltipster({
			        theme: 'tooltipster-light',
			        delay: 200,
			        contentAsHTML: true,
			        trigger: 'custom', // add custom trigger
			       	triggerOpen: { // open tooltip when element is clicked, tapped (mobile) or hovered
			           click: true,
			           tap: true,
			           mouseenter: true
			        },
			        triggerClose: { // close tooltip when element is clicked again, tapped or when the mouse leaves it
			           click: true,
			           scroll: false, // ensuring that scrolling mobile is not tapping!
			           tap: true,
			           mouseleave: true			           
			        }
			    });

	    		$(group).append(seat)
	    		
	    		if (value != "Booked") {
	    			$(group).append(seatNumberElt)	    			
		    		$(group).on("mouseover",function() {
		    			$($(this).find("circle")[0]).attr("r",radius*1.2)
		    		})
		    		$(group).on("mouseout", function() {
		    			$($(this).find("circle")[0]).attr("r",radius)
		    		})
		    		$(group).on("click", function() {
		    			let circle = $(this).find("circle")[0]
		    			let cost = rows
		    			if ($(this).attr("class")=="selected-seat") {
		    				$(this).attr("class", "vacant-seat")
		    				$(circle).attr("r",radius)
		    				$(this).on("mouseover",function() {
				    			$(circle).attr("r",radius*1.2)
				    		})
				    		$(this).on("mouseout", function() {
				    			$(circle).attr("r",radius)
				    		})
		    				document.totalCost-=parseInt($($(this).find("circle")[0]).attr("data-cost"));
		    				document.selectCount--;
		    				$("#cost").html(document.totalCost)
		    				if (document.selectCount == 0) {
		    					//disable #book button
		    					$("#book").addClass('button--disabled')
		    				}

		    			}
		    			else {
		    				$(this).attr("class","selected-seat");
		    				$(circle).attr("r",radius*1.2)
		    				$(this).off("mouseout")
		    				document.totalCost+=parseInt($($(this).find("circle")[0]).attr("data-cost"));
		    				document.selectCount++;
		    				$("#cost").html(document.totalCost)
		    				if (document.selectCount > 0) {
		    					//enable #book button
		    					$("#book").removeClass('button--disabled')
		    				}

		    			}
		    		})
		    	}
		    	$(group).addClass(styleClass)
		    	$(svgElement).append(group)
		    	seatNumber+=1
	    	}
	    }
	    rowNumber+=1	
    }		
}

function populateReceipt() {
	ul = $('ul')
	
}