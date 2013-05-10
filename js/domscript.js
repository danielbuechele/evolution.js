var timer = false;
var selfSurvive = 0.5;
var neighborSpawn = 0.2;
var size = 50;
var cells = {};

function init() {
	
	cells.x = parseInt($(window).width()/size)-1;
	cells.y = parseInt($(window).height()/size)-1;
	
	for (y = 0; y <= cells.y; y++) {
		for (x = 0; x <= cells.x; x++) {
			color = Math.floor(Math.random()*5)+1;
			$("#cells").append('<div class="cell color'+color+'" data-position="'+x+':'+y+'"></div>');
			if (x == cells.x) {
				$("#cells").append('<div class="break"></div>');
			}
		}
	}
	
	
	$(".cell").click(function () {
		$(this).toggleClass("active");
	});
	
	
	$(".cell").mouseenter(function () {
		$(this).addClass("active");
	});
	
	start();
	
}

function start() {
	
	if (!timer) {
		timer = setInterval(function () {step()},100);
		$("#btn-start").text("stop");
	} else {
		clearInterval(timer);
		timer = false;
		$("#btn-start").text("start");
	}
}

function step() {
	
	
	$(".active").each(function () {
		pos = $(this).attr("data-position").split(":");
		pos[0] = parseInt(pos[0]);
		pos[1] = parseInt(pos[1]);

		if (Math.random() > selfSurvive) $(this).removeClass("active");
		
		//north
		if (Math.random() < neighborSpawn && pos[1]>0) $(".cell[data-position='"+pos[0]+":"+(pos[1]-1)+"']").addClass("active");
		
		//south
		if (Math.random() < neighborSpawn && pos[1]!=cells.y) $(".cell[data-position='"+pos[0]+":"+(pos[1]+1)+"']").addClass("active");
		
		//west
		if (Math.random() < neighborSpawn && pos[0]>0) $(".cell[data-position='"+(pos[0]-1)+":"+pos[1]+"']").addClass("active");
		
		//east
		if (Math.random() < neighborSpawn && pos[0]!=cells.x) $(".cell[data-position='"+(pos[0]+1)+":"+pos[1]+"']").addClass("active");
		
	});
	
}


$(function(){
	
	init();

});