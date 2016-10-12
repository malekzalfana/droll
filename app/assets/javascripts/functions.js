/*global $*/
var functions;
var finalImage;
functions =  function() {
	var lineWidth;
	var lineColor;
	console.log('functionssssssssssssssssssss');
	var image3 = false;
	
	var droppedFaces = 0;
	console.log('ss')
	
	//document.getElementById('all-tools').style.height = document.body.clientHeight;
	//document.getElementById('right-column').style.height = document.body.clientHeight;
	if ( $('#paint').length > 0 ) {
		var canvas = document.querySelector('#paint');
		var ctx = canvas.getContext('2d');
		var sketch = document.querySelector('#sketch');
		var tmp_canvas = document.createElement('canvas');
		var tmp_ctx = tmp_canvas.getContext('2d');
		tmp_canvas.id = 'tmp_canvas';
		//tmp_canvas.width = canvas.width;
		//tmp_canvas.height = canvas.height;
		tmp_canvas.crossOrigin = "anonymous";
		sketch.appendChild(tmp_canvas);
	
		canvas.width = 1500; //horizontal resolution (?) - increase for better looking text
		canvas.height = 600; //vertical resolution (?) - increase for better looking text
		//canvas.style.width=750;//actual width of canvas
		//canvas.style.height=300;//actual height of canvas
	
	
		tmp_canvas.width = 1500; //horizontal resolution (?) - increase for better looking text
		tmp_canvas.height = 600; //vertical resolution (?) - increase for better looking text
		//tmp_canvas.style.width=750;//actual width of canvas
		//tmp_canvas.style.height=300;//actual height of canvas
	
		tmp_ctx.scale(2, 2);
		//ctx.scale(2,2);
		ctx.fillStyle = 'white';
		//$(document).on('click', '#rage-comics-tab', function(){
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		//})
		//tmp_canvas.addEventListener('click', chooseBro);
		if (tool != 'text') {
		var mouse = {
			x: 0
			, y: 0
		};
		var start_mouse = {
			x: 0
			, y: 0
		};
		var last_mouse = {
			x: 0
			, y: 0
		};

		var sprayIntervalID;

		// Pencil Points
		var ppts = [];

		//undo array
		var undo_arr = []; // NEWTHING

		var undo_count = 0; // NEWTHING

		var empty_canv; // NEWTHING

		// current tool

		//NEWTHING
		$('.color-box').on('click', function () {
			tmp_ctx.strokeStyle = $(this).attr('id');
			tmp_ctx.fillStyle = tmp_ctx.strokeStyle;
			console.log(tmp_ctx.strokeStyle);
			drawBrush();
		})

		/* Mouse Capturing Work */
		tmp_canvas.addEventListener('mousemove', function (e) {
			mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		}, false);

		canvas.addEventListener('mousemove', function (e) {
			mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		}, false);


		//NEWTHING
		var drawBrush = function () {

			//context_small.clearRect(0, 0, canvas_small.width, canvas_small.height);

			radius = tmp_ctx.lineWidth;
			radius = radius / 2;

			//context_small.beginPath();
			//context_small.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			//context_small.fillStyle = tmp_ctx.strokeStyle;
			//context_small.globalAlpha = tmp_ctx.globalAlpha;
			//context_small.fill();

		};

		/* Drawing on Paint App */
		//tmp_ctx.lineWidth = document.getElementById("width_range").value;
		tmp_ctx.lineWidth = '3';
		tmp_ctx.lineJoin = 'round';
		tmp_ctx.lineCap = 'round';
		tmp_ctx.strokeStyle = lineColor;
		tmp_ctx.fillStyle = 'black';
		tmp_ctx.save();
		//tmp_ctx.globalAlpha = 0.5;

		//show current brush view  //NEWTHING
		drawBrush();

		empty_canv = canvas.toDataURL(); //NEWTHING
		undo_arr.push(empty_canv); //NEWTHING

		tmp_canvas.addEventListener('mousedown', function (e) {
			tmp_canvas.addEventListener('mousemove', onPaint, false);

			mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

			start_mouse.x = mouse.x;
			start_mouse.y = mouse.y;

			ppts.push({
				x: mouse.x
				, y: mouse.y
			});

			//spraying tool.
			sprayIntervalID = setInterval(onPaint, 50);

			onPaint();
			//onPaintCircle();

		}, false);

		function stopDrawing() {
			tmp_canvas.removeEventListener('mousemove', onPaint, false);
			// for erasing
			ctx.globalCompositeOperation = 'source-over';
			//spraying tool.
			clearInterval(sprayIntervalID);

			// Writing down to real canvas now
			ctx.drawImage(tmp_canvas, 0, 0);
			// Clearing tmp canvas
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

			// Emptying up Pencil Points
			ppts = [];

			undo_arr.push(canvas.toDataURL()); //NEWTHING
			//window.alert(undo_arr.length);
			undo_count = 0; //NEWTHING
			painting = false;
			console.log(painting)
		}
		function stopDrawing2() {
			if ( painting === true ) {
				stopDrawing()
			}
		}

		tmp_canvas.addEventListener('mouseup', stopDrawing, false);
		tmp_canvas.addEventListener('mouseleave', stopDrawing2, false);
		tmp_canvas.addEventListener('ondrag', stopDrawing2, false);

		//NEWTHING

		document.getElementById("undo").addEventListener("click", function () {

			/*window.alert(undo_count);
			window.alert(undo_arr.length);*/

			if (undo_arr.length > 1) {

				if (undo_count + 1 < undo_arr.length) {
					if (undo_count + 2 == undo_arr.length) {
						if (confirm("Do you really want to UNDO ??? WARNING ! You will not be able to REDO this step ")) {
							undo_count++;
							UndoFunc(undo_count);
						}
					} else {
						undo_count++;
						//window.alert(undo_count);
						UndoFunc(undo_count);
					}

					if (undo_count + 1 == undo_arr.length) {
						undo_count = 0;
						undo_arr = [];
						undo_arr.push(empty_canv);
					}

				}

				//else { undo_count = 0; undo_arr = []; undo_arr.push(empty_canv); }
			}

		});

		document.getElementById("redo").addEventListener("click", function () {
			if (undo_count > 0) {
				undo_count--;
				UndoFunc(undo_count);
			}

		});

		document.getElementById("clear").addEventListener("click", function () {
			//.//$('.dragged, .textareas').remove();
			droppedFaces = 0;
			textCalls = 0;
			$('#placeholder-1').droppable({
				disabled: false,
			});
				canvas.height = 600;
				tmp_canvas.height = 600;
				$('#sketch, #paint, #tmp_canvas').css({'height':'300px'});
				$('.splitter').not('#splitter-1').remove();
				$('#splitter-1').html('unsplit')
				$('.placeholder').not('#placeholder-1').remove();
				$('#remove-panel-button').hide();
				sketch.style.height = 300 + 'px';
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				//document.getElementsByClassName('splitter').innerHTML = 'split';
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 3;
				ctx.beginPath();
				ctx.moveTo(750, 1);
				ctx.lineTo(750, 599);
				ctx.stroke();
				tmp_ctx.scale(2,2);
				tmp_ctx.lineWidth = lineWidth;
				tmp_ctx.lineJoin = 'round';
				tmp_ctx.lineCap = 'round';
				tmp_ctx.strokeStyle = lineColor;
				tmp_ctx.fillStyle = 'black';	
				tmp_ctx.lineWidth = lineWidth;
				//alert(lineWidth);
			
		});

	}
	var onPaintCircle = function () {

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		var x = (mouse.x + start_mouse.x) / 2;
		var y = (mouse.y + start_mouse.y) / 2;

		var radius = Math.max(
			Math.abs(mouse.x - start_mouse.x)
			, Math.abs(mouse.y - start_mouse.y)
		) / 2;

		tmp_ctx.beginPath();
		tmp_ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		// tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
		tmp_ctx.stroke();
		tmp_ctx.closePath();

	};

	var onPaintBrush = function () {

		// Saving all the points in an array
		ppts.push({
			x: mouse.x
			, y: mouse.y
		});

		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.beginPath();
			//ctx.moveTo(b.x, b.y);
			//ctx.lineTo(b.x+50, b.y+50);
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();

			return;
		}

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		tmp_ctx.quadraticCurveTo(
			ppts[i].x
			, ppts[i].y
			, ppts[i + 1].x
			, ppts[i + 1].y
		);
		tmp_ctx.stroke();

	};

	var onPaintLine = function () {

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
		tmp_ctx.lineTo(mouse.x, mouse.y);
		tmp_ctx.stroke();
		tmp_ctx.closePath();

	};

	var onPaintRect = function () {

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = Math.abs(mouse.y - start_mouse.y);
		tmp_ctx.strokeRect(x, y, width, height);

	};

	function drawEllipse(ctx) {

		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);

		var w = Math.abs(mouse.x - start_mouse.x);
		var h = Math.abs(mouse.y - start_mouse.y);

		var kappa = .5522848
			, ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w, // x-end
			ye = y + h, // y-end
			xm = x + w / 2, // x-middle
			ym = y + h / 2; // y-middle

		ctx.beginPath();
		ctx.moveTo(x, ym);
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		ctx.closePath();
		ctx.stroke();
	};
	var toErase = false;
	var onErase = function () {
		if (toErase === true ){
			// Saving all the points in an array
		ppts.push({
			x: mouse.x
			, y: mouse.y
		});

		ctx.globalCompositeOperation = 'destination-out';
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'white';
		ctx.lineWidth = tmp_ctx.lineWidth;

		if (ppts.length < 3) {
			var b = ppts[0];
			ctx.beginPath();
			//ctx.moveTo(b.x, b.y);
			//ctx.lineTo(b.x+50, b.y+50);
			ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			ctx.fill();
			ctx.closePath();

			return;
		}

		// Tmp canvas is always cleared up before drawing.
		// ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		ctx.quadraticCurveTo(
			ppts[i].x
			, ppts[i].y
			, ppts[i + 1].x
			, ppts[i + 1].y
		);
		ctx.stroke();
		}
		// Else erase
		else {
			tmp_ctx.strokeStyle = '#ffffff';
			// Saving all the points in an array
		ppts.push({
			x: mouse.x
			, y: mouse.y
		});

		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.beginPath();
			//ctx.moveTo(b.x, b.y);
			//ctx.lineTo(b.x+50, b.y+50);
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();

			return;
		}

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		tmp_ctx.quadraticCurveTo(
			ppts[i].x
			, ppts[i].y
			, ppts[i + 1].x
			, ppts[i + 1].y
		);
		tmp_ctx.stroke();
		}

	};

	var getRandomOffset = function (radius) {

		var random_angle = Math.random() * (2 * Math.PI);
		var random_radius = Math.random() * radius;

		// console.log(random_angle, random_radius, Math.cos(random_angle), Math.sin(random_angle));

		return {
			x: Math.cos(random_angle) * random_radius
			, y: Math.sin(random_angle) * random_radius
		};
	};

	var generateSprayParticles = function () {
		// Particle count, or, density
		var density = tmp_ctx.lineWidth * 2;

		for (var i = 0; i < density; i++) {
			var offset = getRandomOffset(tmp_ctx.lineWidth);

			var x = mouse.x + offset.x;
			var y = mouse.y + offset.y;

			tmp_ctx.fillRect(x, y, 1, 1);
		}
	};

	var UndoFunc = function (count) {

		var number = undo_arr.length;
		var img_data = undo_arr[number - (count + 1)];
		var undo_img = new Image();

		undo_img.src = img_data.toString();

		ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		ctx.drawImage(undo_img, 0, 0);

		//window.alert('undoing'); 

	};
	var onPaint = function () {
		painting = true;
		if (tool == 'brush') {
			onPaintBrush();
		} else if (tool == 'circle') {
			onPaintCircle();
		} else if (tool == 'line') {
			onPaintLine();
		} else if (tool == 'rectangle') {
			onPaintRect();
		} else if (tool == 'text-#d40000' || tool == 'text-black') {
			tmp_canvas.addEventListener('click', createText, false);
			//textCalls++;
			tmp_canvas.style.cursor = 'text';
		} else if (tool == 'ellipse') {
			drawEllipse(tmp_ctx);
		} else if (tool == 'eraser') {
			onErase();
		} else if (tool == 'spray') {
			generateSprayParticles();
		} else if (tool == 'edit') {
			//none();
		}

	};
	}
	
	//if ( $('#sketch').length > 0 ) {
		
	//}

	//canvas.crossOrigin="anonymous";
	
	var textCalls = 0;

	// Creating a tmp canvas
	
/*	$(document).on('click', '#button', function(){
		alert('ss');
		var tmp_canvas = document.createElement('canvas');
		var tmp_ctx = tmp_canvas.getContext('2d');
		tmp_ctx.fillText(document.getElementById('text-' + '1').value.toUpperCase(), Number(document.getElementById('text-' + '1').parentElement.parentElement.offsetLeft) + Number(document.getElementById('text-' + '1').parentElement.offsetLeft) + 10, Number(document.getElementById('text-' + '1').parentElement.parentElement.offsetTop) + Number(document.getElementById('text-' + '1').parentElement.offsetTop) + 15);
	});*/
	
	
	var tool = 'none';
	lineWidth = '3';
	lineColor = 'black';

	//function chooseBro() {
	//	$('#talking').fadeIn(200).fadeOut(1300);
	//}
	

	$('#tools .direct-tools').on('click', function () {

		$('#shapes-button, #texts-button').css({
			//'border-bottom': '0px solid #d40000',
			//'color':'black'
			'background':'none'
		});

		tool = $(this).attr('id');
		//$('.rageface').toggleClass('rageface');
		$('#tools .direct-tools').not(this).css({
			'background': 'none'
			//, 'color': 'black'
			//, 'border': 'none'
				//"box-shadow": "inset 0px 0px 0px 0px #D40000",
				//  "background": "whitesmoke"
		});
		
		$(this).css({
			'background': 'rgb(253, 97, 61)'
			, 'color': 'black'
			//, 'border-bottom': '#d40000 2px solid'
				//,"box-shadow": "inset 0px 0px 0px 3px #D40000",
				//  'background': 'white'
		});
		console.log(lineWidth);

		function lowerIndex() {
			$('.text-parent .ui-wrapper').css({
				'z-index': '1'
			}).addClass('hidden-textareas');
			$('.img-parent .ui-wrapper, #placeholder-wrapper').css({
				'z-index': '1',
			});
			$('.dragged-helper, .ui-wrapper').removeClass('dragged-shadow');
			//$(tmp_canvas).css({'cursor':'crosshair'});
			$(tmp_canvas).removeClass('default-cursor');
			$('.ui-resizable-handle').addClass('transparent-handle');
			$('.textareas').addClass('no-border');
			//$('#canvas').css({'border':'red 5px solid'});
		}

		function imgIndex() {
			$('.text-parent .ui-wrapper').css({
				'z-index': '1'
			});
			$('.img-parent .ui-wrapper').css({
				'z-index': '4'
			});
			$('#placeholder-wrapper').css({
				'z-index': '3'
			});
			$('.dragged-helper, .ui-wrapper').removeClass('dragged-shadow');
			$(tmp_canvas).removeClass('default-cursor');
			$('.img-parent .ui-resizable-handle').removeClass('transparent-handle');
			$('.text-parent .ui-resizable-handle').addClass('transparent-handle');
			$('.textareas').addClass('no-border');
			$('.text-parent .delete-handle').hide();
			//$('#canvas').css({'border':'green 5px solid'});
		}

		function textIndex() {
			$('.img-parent .ui-wrapper, #placeholder-wrapper').css({
				'z-index': '1'
			});
			$('.text-parent .ui-wrapper').css({
				'z-index': '3'
			}).removeClass('hidden-textareas');
			$('.dragged-helper, .ui-wrapper').removeClass('dragged-shadow');
			$(tmp_canvas).removeClass('default-cursor');
			$('.text-parent .ui-resizable-handle').removeClass('transparent-handle');
			$('.img-parent .ui-resizable-handle').addClass('transparent-handle');
			$('.textareas').removeClass('no-border');
			$('.text-parent .delete-handle').show();
			//$('#paint').css({'border':'blue 5px solid'});
		};

		function upperIndex() {
			$('.img-parent .ui-wrapper, .text-parent .ui-wrapper').css({
				'z-index': '4'
			});
			$('#placeholder-wrapper').css({
				'z-index': '3'
			});
			$('.dragged-helper, .ui-wrapper').addClass('dragged-shadow');
			//$(tmp_canvas).css({'cursor':'crosshair'});
			$(tmp_canvas).addClass('default-cursor');
			$('.ui-resizable-handle').fadeIn();
			//$('#tmp_canvas').css({'border':'1px green solid'})
		}
		//console.log(tool);
		if (tool == 'text-#d40000') {
			tmp_canvas.style.cursor = "text";
			textIndex();
		} else if (tool == 'text-black') {
			tmp_canvas.style.cursor = "text";
			textIndex();
			//alert('sds');
		} else if (tool == 'edit') {
			tmp_canvas.style.cursor = "move";
			imgIndex();
		} else if (tool == 'brush') {
			tmp_ctx.strokeStyle = lineColor;
			tmp_canvas.style.cursor = "url('assets/pen.cur'), auto";
			lowerIndex();
		} else if (tool == 'spray') {
			tmp_canvas.style.cursor = "url('assets/spray.cur'), auto";
			lowerIndex();

		} else if (tool == 'eraser') {
			tmp_canvas.style.cursor = "url('assets/eraser.cur'), auto";
			lowerIndex();
		} else if (tool == 'none') {
			alert('mmm');
		} else {
			console.log('other')
			tmp_canvas.style.cursor = "crosshair";
		}
		lineSize();

		function lineSize() {
			$('.line-wrapper').click(function () {
				var linesize = $(this).attr('id');
				//tmp_ctx.lineWidth =
				if (linesize == 'line1') {
					lineWidth = 2;
					tmp_ctx.lineWidth = 2;
				} else if (linesize == 'line2') {
					lineWidth = 3;
					tmp_ctx.lineWidth = 3;
				} else {
					lineWidth = 6;
					tmp_ctx.lineWidth = 6;
				}
			})
		}
		//$('#addRageFaces').on('click', function(){
		//  tool = 'none';
		//  $('#tools button').css({
		//  "box-shadow": "inset 0px 0px 0px 0px #D40000",
		//  'background': 'whitesmoke'
		//  });
		//});
		
		console.log(tool);

	});
	//  COLOR FUNCTION

	$('.color-box').click(function () {
		//tool = $(this).attr('id');
		$('.color-box').parent().css({
			//"border": "1px solid #616161"
			'box-shadow': 'none'
		, });
		$(this).parent().css({
			//"border": "1px solid #F15247"
			'box-shadow': '3px 3px 1px rgba(0,0,0,0.4)'
		, });
		lineColor = $(this).attr('id');
		$('.dot').css({'background':lineColor})
	});
	//$('#line2').click();
	$('#000000').click();

	



	function callDownload(link, canvasId, filename, todownload) {
		//document.getElementById('paint').crossOrigin="anonymous";
		var downloadCANVAS = document.createElement('canvas');
		downloadCANVAS.setAttribute('id', 'downloadCanvas');
		downloadCTX = downloadCANVAS.getContext('2d');
		downloadCANVAS.width = canvas.width;
		downloadCANVAS.height = canvas.height;
		originalCanvas = ctx.getImageData(0,0,canvas.width,canvas.height);
		downloadCTX.putImageData(originalCanvas,0,0);
		//downloadCTX.fillStyle = 'black';
		downloadCTX.font="20px schoolbell";
		downloadCTX.scale(2,2);
		downloadCANVAS.getContext('2d').font="schoolbell";
		downloadCTX.save()
		
				downloadCTX.fillStyle = "black";
				//downloadCTX.fillText('text',-4,10);
				//REMOVED
				//var added1 = $('#text-11').val()
				//var added3 = $('#text-22').val()
		//downloadCTX.scale(0.5,0.5);
		for (var droppedNumbers = 1; droppedNumbers <= droppedFaces; ++droppedNumbers) {
			if (  $("#rage-" + droppedNumbers).hasClass('panel2') ) {
				var image = document.getElementById("rage-" + droppedNumbers);
			$(image).attr('crossOrigin', '')
			var originalImage = new Image();
			$(originalImage).attr('crossOrigin', '')
			originalImage.src = image.src;
			originalImage.crossOrigin = "";
			ctx.ImageSmoothingEnabled = false;
			//ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;

			//var img = document.getElementsByTagName('img')[0];
			var canvas2 = document.createElement('canvas');
			canvas2.width = originalImage.width;
			canvas2.height = originalImage.height;

			canvas2.getContext('2d').drawImage(originalImage, 0, 0);
			canvas2.crossOrigin = "Anonymous";
			canvas.crossOrigin = "Anonymous";
			function downScaleCanvas(cv, scale) {
				if (!(scale < 1) || !(scale > 0)) {
					downloadCTX.drawImage(originalImage, Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetLeft) + Number(document.getElementById('paint').offsetLeft), Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetTop) + Number(document.getElementById('paint').offsetTop), image.width, image.height);
				}
				var sqScale = scale * scale; // square scale = area of source pixel within target
				var sw = cv.width; // source image width
				var sh = cv.height; // source image height
				var tw = Math.floor(sw * scale); // target image width
				var th = Math.floor(sh * scale); // target image height
				var sx = 0
					, sy = 0
					, sIndex = 0; // source x,y, index within source array
				var tx = 0
					, ty = 0
					, yIndex = 0
					, tIndex = 0; // target x,y, x,y index within target array
				var tX = 0
					, tY = 0; // rounded tx, ty
				var w = 0
					, nw = 0
					, wx = 0
					, nwx = 0
					, wy = 0
					, nwy = 0; // weight / next weight x / y
				// weight is weight of current source point within target.
				// next weight is weight of current source point within next target's point.
				var crossX = false; // does scaled px cross its current px right border ?
				var crossY = false; // does scaled px cross its current px bottom border ?
				//var imgg = new Image();
				//imgg.setAttribute('crossOrigin', 'anonymous');
				//imgg.src = cv.toDataURL();
				
				var sBuffer = cv.getContext('2d').
				getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
				
				
				var tBuffer = new Float32Array(4 * sw * sh); // target buffer Float32 rgb
				var sR = 0
					, sG = 0
					, sB = 0; // source's current point r,g,b
				// untested !
				var sA = 0; //source alpha    

				for (sy = 0; sy < sh; sy++) {
					ty = sy * scale; // y src position within target
					tY = 0 | ty; // rounded : target pixel's y
					yIndex = 4 * tY * tw; // line index within target array
					crossY = (tY != (0 | ty + scale));
					if (crossY) { // if pixel is crossing botton target pixel
						wy = (tY + 1 - ty); // weight of point within target pixel
						nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
					}
					for (sx = 0; sx < sw; sx++, sIndex += 4) {
						tx = sx * scale; // x src position within target
						tX = 0 | tx; // rounded : target pixel's x
						tIndex = yIndex + tX * 4; // target pixel index within target array
						crossX = (tX != (0 | tx + scale));
						if (crossX) { // if pixel is crossing target pixel's right
							wx = (tX + 1 - tx); // weight of point within target pixel
							nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
						}
						sR = sBuffer[sIndex]; // retrieving r,g,b for curr src px.
						sG = sBuffer[sIndex + 1];
						sB = sBuffer[sIndex + 2];
						sA = sBuffer[sIndex + 3];

						if (!crossX && !crossY) { // pixel does not cross
							// just add components weighted by squared scale.
							tBuffer[tIndex] += sR * sqScale;
							tBuffer[tIndex + 1] += sG * sqScale;
							tBuffer[tIndex + 2] += sB * sqScale;
							tBuffer[tIndex + 3] += sA * sqScale;
						} else if (crossX && !crossY) { // cross on X only
							w = wx * scale;
							// add weighted component for current px
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// add weighted component for next (tX+1) px                
							nw = nwx * scale
							tBuffer[tIndex + 4] += sR * nw; // not 3
							tBuffer[tIndex + 5] += sG * nw; // not 4
							tBuffer[tIndex + 6] += sB * nw; // not 5
							tBuffer[tIndex + 7] += sA * nw; // not 6
						} else if (crossY && !crossX) { // cross on Y only
							w = wy * scale;
							// add weighted component for current px
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// add weighted component for next (tY+1) px                
							nw = nwy * scale
							tBuffer[tIndex + 4 * tw] += sR * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 1] += sG * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 2] += sB * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 3] += sA * nw; // *4, not 3
						} else { // crosses both x and y : four target points involved
							// add weighted component for current px
							w = wx * wy;
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// for tX + 1; tY px
							nw = nwx * wy;
							tBuffer[tIndex + 4] += sR * nw; // same for x
							tBuffer[tIndex + 5] += sG * nw;
							tBuffer[tIndex + 6] += sB * nw;
							tBuffer[tIndex + 7] += sA * nw;
							// for tX ; tY + 1 px
							nw = wx * nwy;
							tBuffer[tIndex + 4 * tw] += sR * nw; // same for mul
							tBuffer[tIndex + 4 * tw + 1] += sG * nw;
							tBuffer[tIndex + 4 * tw + 2] += sB * nw;
							tBuffer[tIndex + 4 * tw + 3] += sA * nw;
							// for tX + 1 ; tY +1 px
							nw = nwx * nwy;
							tBuffer[tIndex + 4 * tw + 4] += sR * nw; // same for both x and y
							tBuffer[tIndex + 4 * tw + 5] += sG * nw;
							tBuffer[tIndex + 4 * tw + 6] += sB * nw;
							tBuffer[tIndex + 4 * tw + 7] += sA * nw;
						}
					} // end for sx 
				} // end for sy

				// create result canvas
				var resCV = document.createElement('canvas');
				resCV.width = tw;
				resCV.height = th;
				var resCtx = resCV.getContext('2d');
				var imgRes = resCtx.getImageData(0, 0, tw, th);
				var tByteBuffer = imgRes.data;
				// convert float32 array into a UInt8Clamped Array
				var pxIndex = 0; //  
				for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 4, tIndex += 4, pxIndex++) {
					tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
					tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
					tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
					tByteBuffer[tIndex + 3] = Math.ceil(tBuffer[sIndex + 3]);
				}
				// writing result to canvas.
				resCtx.putImageData(imgRes, 0, 0);
				//downloadCTX.scale(2,2);
				downloadCTX.drawImage(resCV, Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetLeft) + Number(document.getElementById('paint').offsetLeft), Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetTop) + Number(document.getElementById('paint').offsetTop), image.width + addedX, image.height + addedY);
				resCtx.clearRect(0,0,resCV.width,resCV.height);
				//stopDrawing();
				//return resCV;
			}
			var theScale = image.width *2 / originalImage.width;
			var addedX = 0;
			var addedY = 0;
			
			downScaleCanvas(canvas2, theScale);
			}

		}
		for (var droppedNumbers = 1; droppedNumbers <= droppedFaces; ++droppedNumbers) {
			if (  !$("#rage-" + droppedNumbers).hasClass('panel2') ) {
				var image = document.getElementById("rage-" + droppedNumbers);
			$(image).attr('crossOrigin', '')
			var originalImage = new Image();
			$(originalImage).attr('crossOrigin', '')
			originalImage.src = image.src;
			originalImage.crossOrigin = "";
			ctx.ImageSmoothingEnabled = false;
			//ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;

			//var img = document.getElementsByTagName('img')[0];
			var canvas2 = document.createElement('canvas');
			canvas2.width = originalImage.width;
			canvas2.height = originalImage.height;

			canvas2.getContext('2d').drawImage(originalImage, 0, 0);
			canvas2.crossOrigin = "Anonymous";
			canvas.crossOrigin = "Anonymous";
			function downScaleCanvas(cv, scale) {
				if (!(scale < 1) || !(scale > 0)) {
					downloadCTX.drawImage(originalImage, Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetLeft) + Number(document.getElementById('paint').offsetLeft), Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetTop) + Number(document.getElementById('paint').offsetTop), image.width, image.height);
				}
				var sqScale = scale * scale; // square scale = area of source pixel within target
				var sw = cv.width; // source image width
				var sh = cv.height; // source image height
				var tw = Math.floor(sw * scale); // target image width
				var th = Math.floor(sh * scale); // target image height
				var sx = 0
					, sy = 0
					, sIndex = 0; // source x,y, index within source array
				var tx = 0
					, ty = 0
					, yIndex = 0
					, tIndex = 0; // target x,y, x,y index within target array
				var tX = 0
					, tY = 0; // rounded tx, ty
				var w = 0
					, nw = 0
					, wx = 0
					, nwx = 0
					, wy = 0
					, nwy = 0; // weight / next weight x / y
				// weight is weight of current source point within target.
				// next weight is weight of current source point within next target's point.
				var crossX = false; // does scaled px cross its current px right border ?
				var crossY = false; // does scaled px cross its current px bottom border ?
				//var imgg = new Image();
				//imgg.setAttribute('crossOrigin', 'anonymous');
				//imgg.src = cv.toDataURL();
				
				var sBuffer = cv.getContext('2d').
				getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
				
				
				var tBuffer = new Float32Array(4 * sw * sh); // target buffer Float32 rgb
				var sR = 0
					, sG = 0
					, sB = 0; // source's current point r,g,b
				// untested !
				var sA = 0; //source alpha    

				for (sy = 0; sy < sh; sy++) {
					ty = sy * scale; // y src position within target
					tY = 0 | ty; // rounded : target pixel's y
					yIndex = 4 * tY * tw; // line index within target array
					crossY = (tY != (0 | ty + scale));
					if (crossY) { // if pixel is crossing botton target pixel
						wy = (tY + 1 - ty); // weight of point within target pixel
						nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
					}
					for (sx = 0; sx < sw; sx++, sIndex += 4) {
						tx = sx * scale; // x src position within target
						tX = 0 | tx; // rounded : target pixel's x
						tIndex = yIndex + tX * 4; // target pixel index within target array
						crossX = (tX != (0 | tx + scale));
						if (crossX) { // if pixel is crossing target pixel's right
							wx = (tX + 1 - tx); // weight of point within target pixel
							nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
						}
						sR = sBuffer[sIndex]; // retrieving r,g,b for curr src px.
						sG = sBuffer[sIndex + 1];
						sB = sBuffer[sIndex + 2];
						sA = sBuffer[sIndex + 3];

						if (!crossX && !crossY) { // pixel does not cross
							// just add components weighted by squared scale.
							tBuffer[tIndex] += sR * sqScale;
							tBuffer[tIndex + 1] += sG * sqScale;
							tBuffer[tIndex + 2] += sB * sqScale;
							tBuffer[tIndex + 3] += sA * sqScale;
						} else if (crossX && !crossY) { // cross on X only
							w = wx * scale;
							// add weighted component for current px
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// add weighted component for next (tX+1) px                
							nw = nwx * scale
							tBuffer[tIndex + 4] += sR * nw; // not 3
							tBuffer[tIndex + 5] += sG * nw; // not 4
							tBuffer[tIndex + 6] += sB * nw; // not 5
							tBuffer[tIndex + 7] += sA * nw; // not 6
						} else if (crossY && !crossX) { // cross on Y only
							w = wy * scale;
							// add weighted component for current px
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// add weighted component for next (tY+1) px                
							nw = nwy * scale
							tBuffer[tIndex + 4 * tw] += sR * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 1] += sG * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 2] += sB * nw; // *4, not 3
							tBuffer[tIndex + 4 * tw + 3] += sA * nw; // *4, not 3
						} else { // crosses both x and y : four target points involved
							// add weighted component for current px
							w = wx * wy;
							tBuffer[tIndex] += sR * w;
							tBuffer[tIndex + 1] += sG * w;
							tBuffer[tIndex + 2] += sB * w;
							tBuffer[tIndex + 3] += sA * w;
							// for tX + 1; tY px
							nw = nwx * wy;
							tBuffer[tIndex + 4] += sR * nw; // same for x
							tBuffer[tIndex + 5] += sG * nw;
							tBuffer[tIndex + 6] += sB * nw;
							tBuffer[tIndex + 7] += sA * nw;
							// for tX ; tY + 1 px
							nw = wx * nwy;
							tBuffer[tIndex + 4 * tw] += sR * nw; // same for mul
							tBuffer[tIndex + 4 * tw + 1] += sG * nw;
							tBuffer[tIndex + 4 * tw + 2] += sB * nw;
							tBuffer[tIndex + 4 * tw + 3] += sA * nw;
							// for tX + 1 ; tY +1 px
							nw = nwx * nwy;
							tBuffer[tIndex + 4 * tw + 4] += sR * nw; // same for both x and y
							tBuffer[tIndex + 4 * tw + 5] += sG * nw;
							tBuffer[tIndex + 4 * tw + 6] += sB * nw;
							tBuffer[tIndex + 4 * tw + 7] += sA * nw;
						}
					} // end for sx 
				} // end for sy

				// create result canvas
				var resCV = document.createElement('canvas');
				resCV.width = tw;
				resCV.height = th;
				var resCtx = resCV.getContext('2d');
				var imgRes = resCtx.getImageData(0, 0, tw, th);
				var tByteBuffer = imgRes.data;
				// convert float32 array into a UInt8Clamped Array
				var pxIndex = 0; //  
				for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 4, tIndex += 4, pxIndex++) {
					tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
					tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
					tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
					tByteBuffer[tIndex + 3] = Math.ceil(tBuffer[sIndex + 3]);
				}
				// writing result to canvas.
				resCtx.putImageData(imgRes, 0, 0);
				//downloadCTX.scale(2,2);
				downloadCTX.drawImage(resCV, Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetLeft) + Number(document.getElementById('paint').offsetLeft), Number(document.getElementById("rage-" + droppedNumbers).parentElement.offsetTop) + Number(document.getElementById('paint').offsetTop), image.width + addedX, image.height + addedY);
				resCtx.clearRect(0,0,resCV.width,resCV.height);
				//stopDrawing();
				//return resCV;
			}
			var theScale = image.width *2 / originalImage.width;
			var addedX = 0;
			var addedY = 0;
			
			downScaleCanvas(canvas2, theScale);
			}

		}
		for (var textNumbers = 1; textNumbers <= textCalls; ++textNumbers) {
			if (document.getElementById('text-' + textNumbers).classList.contains('red-textareas')) {
				downloadCTX.font= 32+"px schoolbell";
				downloadCTX.fillStyle = "#d40000";
				added1 = 0;
				added2 = 32;
				downloadCTX.fillText(document.getElementById('text-' + textNumbers).value.toUpperCase(), Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetLeft) + Number(document.getElementById('text-' + textNumbers).parentElement.offsetLeft) + added1, Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetTop) + Number(document.getElementById('text-' + textNumbers).parentElement.offsetTop) + added2);
				//downloadCTX.save()
			//document.getElementById('text-' + textNumbers).style.display = 'none';
			console.log(document.getElementById('text-' + textNumbers).width);
			}
			
			else {
				downloadCTX.font="20px schoolbell";
				downloadCTX.fillStyle = "black";
				//downloadCTX.save()
				console.log('w')
				added1 = 1;
				added2 = 20;
				downloadCTX.fillText(document.getElementById('text-' + textNumbers).value, Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetLeft) + Number(document.getElementById('text-' + textNumbers).parentElement.offsetLeft) + Number(added1), Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetTop) + Number(document.getElementById('text-' + textNumbers).parentElement.offsetTop) + Number(added2));
			//document.getElementById('text-' + textNumbers).style.display = 'none';
			console.log(Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetLeft));
			console.log(Number(document.getElementById('text-' + textNumbers).parentElement.parentElement.offsetLeft) + Number(document.getElementById('text-' + textNumbers).parentElement.offsetLeft)  )
			}
		};
		finalImage = $('<img/>').attr('src', downloadCANVAS.toDataURL())
		if ( todownload === true ){
			//$('#sketch-wrapper').append(downloadCANVAS)
			//$(downloadCANVAS).css({'width':'600px'})
				link.href = downloadCANVAS.toDataURL();
				link.download = filename;
		}
		else {
			$(finalImage).load(function(){
				var dataURL3 = downloadCANVAS.toDataURL();
				$('#base64-2').val(dataURL3)
			})
		    
		    if ( image3 == false ) {
			    
			    	if ( $('.choosen-content input[type="checkbox"]:checked').length ) {
		          if ( $('.choosen-content:visible .anonymous-image').children('img').length ) {
		          	setTimeout(function(){
		          	$("#submit-image-button-3").click();
			    	image3 = true
			    	$('#ragefaces-buttons-wrapper').hide()
        			$('#tools .loading-icon').addClass('loading-animation')
		          	}, 2000)
		          }
		          else {
		          	$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide().show().addClass('buzz')
		          }
			  }
			  else {
			  	console.log( downloadCANVAS.toDataURL() )
			  	$('<img/>').attr('src', downloadCANVAS.toDataURL()).load(function() {
			  		$("#submit-image-button-3").click();
			    	image3 = true
			    	$('#ragefaces-buttons-wrapper').hide()
        			$('#tools .loading-icon').addClass('loading-animation')
			  	})
			  }
			    	
			    
		    }
		}	

	}
	
	$(document).on('click', '#submit-image-button-before-3', function(){
		$('#ragefaces-buttons-wrapper').fadeOut()
		finalImage = false;
	    callDownload(this, 'downloadCanvas', 'ragecomic' + Math.round(Math.random()*500) + '.png', false);
	  })
	//document.getElementsByClassName('rageface').setAttribute('crossOrigin', 'anonymous');
	/** 
	 * The event handler for the link's onclick event. We give THIS as a
	 * parameter (=the link element), ID of the canvas and a filename.
	 */
	$(document).on('click', '.download-image', function(){
		callDownload(this, 'downloadCanvas', 'ragecomic' + Math.round(Math.random()*500) + '.png', true);
		console.log('called to download')
	});
var painting;
	
	
	//var textCalls = 0;
	var textFocused = false;
	function createText(e) {
		for ( i=0; i <= $('.textareas').length; i++  ) {
			if ( $('.textareas').eq(i).val() == '' ) {
				$('.textareas').eq(i).fadeOut(100).remove()
				textCalls -- ;
			}
		}
		
		if ( textFocused == false ) {
		console.log(textFocused)
			console.log('dfsdas');
		textCalls++;
		//tmp_ctx.fillRect(0, 0, 56, 56);
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		e.stopPropagation;

		tmp_canvas.removeEventListener('mousedown', function (e) {
			tmp_canvas.removeEventListener('mousemove', onPaint, false);

			mouse.x = e.clientX //typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
			mouse.y = e.clientY //typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

			start_mouse.x = mouse.x;
			start_mouse.y = mouse.y;

			ppts = [];

			//spraying tool.
			sprayIntervalID = setInterval(onPaint, 50);

			onPaint();
			//onPaintCircle();

		}, false);
		var onPaint = function () {

			// Tmp canvas is always cleared up before drawing.
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

			textarea.style.display = 'block';
		};
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		var textarea = document.createElement('textarea');
		setTimeout(function(){
			$(textarea).focus();
		}, 100)
		$(textarea).focus();
		if (tool == 'text-#d40000') {
			textarea.className = 'textareas red-textareas';
			//alert('true dat')
			tmp_canvas.style.cursor = 'text';
		}
		else {
			textarea.className = 'textareas normal-textareas';
		}
		
		//textarea.setAttribute("class", "text-" + textCalls);
		//textarea.addEventListener('mousedown', mouseDownOnTextarea);
		sketch.appendChild(textarea);
		var x = e.clientX - canvas.offsetLeft
			, y = e.clientY - canvas.offsetTop;
		$(textarea).wrap("<div class='text-parent'></div>");
		textarea.parentElement.style.top = e.offsetY + 'px';
		textarea.parentElement.style.left = e.offsetX + 'px';
		//sconsole.log(e.clientX + "," + e.clientY);
		//console.log(textarea.style.top + "," + textarea.style.left);
		//console.log(document.getElementsByClassName('textareas').length);
		var textID = textarea.setAttribute("id", "text-" + textCalls);
		//textarea.parentElement.style.postion = 'relative';
		$('.textareas').resizable({
			handles: 'se'
		, }).parent().draggable({
			cancel: ''
			, containment: sketch
			, start: function () {
				$(textarea).focus();
				$('.ui-resizable-handle').css({});

			}
			, stop: function () {
				$(textarea).focus();
			}
		, });
		//$('.textareas').dblclick(function(){
		//  $(this).resizable();
		//});
		$('.textareas').click(function () {
			$(this).focus();
			$(this).siblings().fadeIn();
		});
		var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated-fast fadeIn';
				$(deleteHandle).prependTo($(textarea).parent());
				//var deleteHandle = document.createElement('div');
				//deleteHandle.className = 'delete-handle';
				//$(deleteHandle).prependTo($(theClone1).parent());
				//$(theClone)
				//$(this).wrap('<div class="img-parent"></div>');
				$(deleteHandle).click(function(){
					$(this).parent().parent().remove();
					//$(this).parent().remove();
					//$(this).remove();
					//$('#placeholder-1').addClass('cancel');
					textCalls--;
				});
				//$(theClone1).click(function(){
				//	$(theClone1).focus();
				//});
				$(textarea).parent().mouseenter(function(){
			$(textarea).parent().find('.delete-handle').show();
			console.log($(textarea).find('.delete-handle'))
			});
			$(textarea).parent().mouseleave(function () {
				$(this).parent().find('.delete-handle').hide();
			});
		tmp_canvas.removeEventListener('click', createText, false);
		}
		else {
			return false;
		}
		
	}//ends here


	droppedFaces = 0;
	/*$(document).ready(function () {*/
		
		$('#tags p').click(function () {
			var tag = $(this).attr("id");
			$('.rageface').hide();
			$('.' + tag).fadeIn(100);
			$("#tags p").removeClass('clickedTag');
			$(this).addClass('clickedTag');
		})

		$('#addRageFaces').click(function () {
			$('#ragecontainer').fadeToggle(200);
			$('#ragecontainer').toggleClass('clicked');
			$('#add-button').hide();
			if ($('#ragecontainer').hasClass('clicked')) {
				$('#addRageFaces i').hide().text('remove').fadeIn(200)
			} else {
				$('#addRageFaces i').hide().text('add').fadeIn(200)
			}
			$('#tags p').addClass('animated-very-fast fadeInUp');
			$('#ragefaces .rageface').slice(0,40).trigger("loadEmBoys");
			//tmp_canvas.removeEventListener('click', chooseBro);

		});
		$("#ragefaces img.rageface").slice(0,40).lazyload({
			event: 'loadEmBoys',
			//effect : "fadeIn",
			threshold: 100,
			
		});
		$("#ragefaces img.rageface").slice(40,  $('#ragefaces .rageface').length ).lazyload({         
		    //effect : "fadeIn",
		    container: $("#ragecontainer"),
			threshold: 100,
			event: 'scrollstop'
		});

		$('#tags p').click(function(){
			var thisTag = $(this).attr('id');
			console.log(thisTag);
			$('.'+thisTag).lazyload({
				threshold: 100,
			})
		});
		/*dragg = function() {
			$('.rageface.stock.ne').draggable({
			helper: 'clone'
			, appendTo: sketch
			, revert: 'invalid'
			, disabled: false
			, start: function (event, ui) {
				$('#ragecontainer').hide();
				$(tmp_canvas).css({
					'cursor': 'move'
				});
				$('#edit').click();
				//$(ui.helper).animate({'width':'75','height':'auto'});
				//if ( $(this).hasClass('panel2')) {
				//	$(ui.helper).addClass('dragged-panel2');
				//}
			}
			
			, stop: function (event, ui) {
				droppedFaces++;
				var currentFace = document.getElementById('rage' + droppedFaces);
				$(ui.helper).addClass("dragged-helper");
				var theClone1 = $(ui.helper).clone(true).removeClass('rageface ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable').addClass('dragged').attr('id', 'rage-' + droppedFaces).appendTo(sketch).wrap('<div class="img-parent"></div>').resizable({
					aspectRatio: true
					, minHeight: 50
					, disabled: false
					, handles: 'se'
					, start: function () {
						//$('.ui-wrapper').addClass('dragged-shadow');
						//$(this).parent().addClass('img-wrapper');
					}
					, containment: sketch
				}).parent().draggable({
					containment: sketch
				, });
				var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated fadeIn';
				$(deleteHandle).prependTo($(theClone1).parent().children());
				$(deleteHandle).click(function(){
					$(this).parent().parent().remove();
					//$(this).parent().remove();
					//$(this).remove();
					$('#placeholder-1').addClass('cancel');
					droppedFaces--;
				});
				//$(theClone1).click(function(){
				//	$(theClone1).focus();
				//});
				$(theClone1).parent().mouseover(function(){
			$(theClone1).find('.delete-handle').show();
			console.log($(theClone1).find('.delete-handle'))
			});
			$(theClone1).parent().mouseout(function () {
				$(this).find('.delete-handle').hide();
			});
			}
		});	
		}*/
		dragg = function(){
			$('#ragefaces .rageface.rageface-normal:not(.panel2),#ragefaces .dragged.rageface-normal:not(.panel2)').draggable({
			helper: 'clone'
			, appendTo: sketch
			, revert: 'invalid'
			, disabled: false
			, start: function (event, ui) {
				$('#ragecontainer').hide();
				$(tmp_canvas).css({
					'cursor': 'move'
				});
				$('#edit').click();
				//$(ui.helper).animate({'width':'75','height':'auto'});
				//if ( $(this).hasClass('panel2')) {
				//	$(ui.helper).addClass('dragged-panel2');
				//}
			}
			
			, stop: function (event, ui) {
				droppedFaces++;
				var currentFace = document.getElementById('rage' + droppedFaces);
				$(ui.helper).addClass("dragged-helper");
				var theClone1 = $(ui.helper).clone(true).removeClass('rageface ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable').addClass('dragged').attr('id', 'rage-' + droppedFaces).appendTo(sketch).wrap('<div class="img-parent"></div>').resizable({
					aspectRatio: true
					, minHeight: 65
					, disabled: false
					, handles: 'se'
					, start: function () {
						//$('.ui-wrapper').addClass('dragged-shadow');
						//$(this).parent().addClass('img-wrapper');
					}
					, containment: sketch
				}).parent().draggable({
					containment: sketch
				, });
				/*if ( !$(theClone).attr('facenumber') ) {
					$(theClone).addClass('sto')
				}*/
				var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated fadeIn';
				$(deleteHandle).prependTo($(theClone1).parent().children());
				//var deleteHandle = document.createElement('div');
				//deleteHandle.className = 'delete-handle';
				//$(deleteHandle).prependTo($(theClone1).parent());
				//$(theClone)
				//$(this).wrap('<div class="img-parent"></div>');
				$(deleteHandle).click(function(){
					$(this).parent().parent().remove();
					//$(this).parent().remove();
					//$(this).remove();
					$('#placeholder-1').addClass('cancel');
					droppedFaces--;
				});
				//$(theClone1).click(function(){
				//	$(theClone1).focus();
				//});
				$(theClone1).parent().mouseover(function(){
			$(theClone1).find('.delete-handle').show();
			console.log($(theClone1).find('.delete-handle'))
			});
			$(theClone1).parent().mouseout(function () {
				$(this).find('.delete-handle').hide();
			});
			}
		});
		}
		dragg()
		$('.rageface.panel2').draggable({
			helper: 'clone',
			appendTo: sketch,
			start: function(){
				$('#ragecontainer').hide();
				$('#edit').click();
				//$('.placeholder').css({'z-index'});
			}
			, stop: function (event, ui) {
				console.log('ss');
				
			},
		});
		$('#placeholder-1').droppable({
			hoverClass: 'border-2',
			accept: $('.rageface.panel2'),
			drop: function(event,ui){
				
				droppedFaces++;
				var currentFace = document.getElementById('rage' + droppedFaces);
				$(ui.helper).addClass("dragged-helper");
				var theClone2 = $(ui.helper).clone(true).removeClass('rageface ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable').addClass('dragged dragged-panel2').attr('id', 'rage-' + droppedFaces).appendTo(this).wrap('<div class="img-parent"></div>');
				console.log(theClone2)
				//$(this).appendChild(theClone2);
				//$(theClone2).appendTo('#panel2-holder');
				//var dropIn = $(this)
				//console.log(dropIn);
				$(theClone2).css({'top':'0','left':'0'});
				$(theClone2).animate({width: '750', height: '300'},200);
				theClone2.parent().parent()/*.draggable({
					containment: sketch,
					//appendTo: 'body',
					grid: [1, 300]
				 })*/.droppable({
					disabled: true,
				});
				$(theClone2).draggable({
					disabled: true,
				})
				//$('#sketch').sortable('refresh');
				var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated fadeIn';
				$(deleteHandle).prependTo($(theClone2).parent());
				$(this).removeClass('cancel');
				$(deleteHandle).click(function(){
					$(this).parent().remove();
					$(this).remove();
					$('#placeholder-1').addClass('cancel').droppable({disabled:false});
					droppedFaces--;
				});
				$(tmp_canvas).addClass('default-cursor');
				$('#ragecontainer').removeClass('clicked');
				$('#add-button').hide();
				document.getElementById('add-button').innerHTML = 'add';
				$('#add-button').fadeIn();
			$(theClone2).parent().mouseover(function(){
			$(theClone2).siblings().show();
			console.log($(theClone2))
			});
			$(theClone2).parent().mouseout(function () {
				$(theClone2).siblings('.delete-handle').hide();
				console.log($(theClone2).siblings('.delete-handle'))
			});
			}
		});
		$('#placeholder-wrapper').sortable({
			items: ".placeholder",
			tolernce: 'touch',
			cancel: '.cancel',
			placeholder:'border-3',
			//containment: sketch,
			axis:'y'
		}).disableSelection();
		$('#sketch').droppable({
			hoverClass: 'border'
			, accept: ".rageface.rageface-normal , .dragged, .textareas, .img-parent"
			, tolerance: 'intersect'
			, drop: function (event,ui) {
				//$('.dragged-helper').removeClass('dragged-shadow');
				$(tmp_canvas).addClass('default-cursor');
				$('#ragecontainer').removeClass('clicked');
				$('#add-button').hide();
				document.getElementById('add-button').innerHTML = 'add';
				$('#add-button').fadeIn();
				//alert('dropped');
				
				
				
			}
		, });
		
		var dropIn = 'none';
		
		$('.delete-handle').click(function(){
			$(this).parent().remove();
			$(this).remove();
			alert('about to ');	
		});
		
		$('#more-tools').click(function () {
			$('.hidden-tools').fadeToggle(200);
			$(this).toggleClass('more-tools-rotation');
		});
		$(document).on('click', '#cancel-button-3', function(){
		    $('#clear-button').click()
		  })
		$('#more-tools').click();
		$('#black').click();
		$('.splitter').click(splitting);
		//m$('#remove-panel-button').fadeOut();
		$('#add-panel').click(function () {
			addPanel();
			$('#placeholder-wrapper').sortable('refresh');
		});
		$('#remove-panel').click(removePanel);
		$('#line2').click();
		$('.line-wrapper').click(function () {
			$('.line-wrapper').css({
				'background':'#616161'
			});
			$(this).css({
				'background': 'rgb(241, 82, 71)', 
				'color': 'white'
			});
		});



		$('#shapes button').click(function () {
			//var shape = $(this).attr('id');
			//$('#shapes button').not(this).css({'border':'none'});
			if (tool == 'rectangle') {
				$('#shapes-button').html('<div id="replaced" class="rectangle"></div>')
			} else if (tool == 'line') {
				$('#shapes-button').html('<div id="replaced" class="line"></div>')
			} else if (tool == 'circle') {
				$('#shapes-button').html('<i id="replaced" class="material-icons circle">panorama_fish_eye</i>')
			} else if (tool == 'ellipse') {
				$('#shapes-button').html('<div id="replaced" class="ellipse"></div>')
			}
		});
		var textStyle = 'black';
		$('#texts button').click(function(){
			var textStyle = $(this).attr('id').replace('text-','');
			console.log(textStyle);
			$('#texts-button').css({'color':textStyle});
			console.log(tool);
		});
		$(document).on('focus','.textareas', function(){
			textFocused = true;
			console.log(textFocused)
		});
		$(document).on('focusout','.textareas', function(){
			textFocused = false
			console.log(textFocused)	
		});
		
		$('#colors, #sizes, #shapes, #texts').focusout(function () {
			var thisTool = $(this).attr('id');
			//console.log("this" + thisTool)
			$('#' + thisTool + '-wrapper').fadeOut(400);
			//console.log($('#' + thisTool + '-wrapper'));
			//console.log($('#' + thisTool + ' .options'));
			//console.log($('#' + thisTool + '-button'));
			$('#' + thisTool + ' .options').removeClass('red-options');
			$('#' + thisTool + '-button').removeClass('red-button');
			if (tool == 'line' || tool == 'rectangle' || tool == 'ellipse' || tool == 'circle') {
				$('#' + thisTool + '-button').css({
					'background': '#F15247'
				});
			}
			else if (tool == 'text-#d40000') {
				$('#texts-button').children('.schoolbell-text').hide()
				$('#texts-button').children('.text').eq(0).show()
				$('#texts-button').css({'background':'#F15247'});
			}
			else if ( tool == 'text-black' ) {
				$('#texts-button').children('.schoolbell-text').show()
				$('#texts-button').children('.text').eq(0).hide()
				$('#texts-button').css({'background':'#F15247'});
			}
		});
		//$('#shapes').click(function(){
		//  $('#line').click();
		//});
		$('#rectangle, #line, #circle, #ellipse, .hidden-wrapper, .color-box, .line-1, .line-2, .line-3').mousedown(function (e) {
			e.preventDefault();
		});
		$('#sizes, #shapes, #colors, #texts').hover(function (e) {
			e.preventDefault();
			var thisTool = $(this).attr('id');
			//alert(thisTool);
			console.log("this" + thisTool);
			$('#' + thisTool + '-wrapper').fadeToggle(300);
			$('#' + thisTool + ' .options').toggleClass('red-options');
			$('#' + thisTool + '-button').toggleClass('red-button');
			
		});
		$('#splitter-1').click();
		
	function splitting(y) {
		var numberSplitter = Number($(this).attr('id').replace('splitter-', '') - 1);
		y = 300 * numberSplitter;
		console.log(y);

		function midLine() {
			tmp_ctx.lineWidth = 2;
			tmp_ctx.beginPath();
			tmp_ctx.moveTo(375, y + 1);
			tmp_ctx.lineTo(375, y + 299);
			tmp_ctx.stroke();
		}
		console.log(this.innerHTML);
		if (this.innerHTML == 'split') {
			tmp_ctx.strokeStyle = "#202020";
			tmp_ctx.lineWidth = 2;
			midLine();
			console.log('splitted');
			this.innerHTML = "unsplit";
		} else if (this.innerHTML == 'unsplit') {
			tmp_ctx.strokeStyle = "white";
			midLine();
			this.innerHTML = "split";
			console.log('unsplitted');
		};
		tmp_ctx.lineWidth = lineWidth;
		tmp_ctx.lineJoin = 'round';
		tmp_ctx.lineCap = 'round';
		tmp_ctx.strokeStyle = lineColor;
		//tmp_ctx.fillStyle = 'black';	
		tmp_ctx.lineWidth = lineWidth;
		//tmp_ctx.restore();
		stopDrawing();
	};

	//document.getElementsByClassName('ragefacec').addEventListener('ondrop', undragshadow, false);
	function addPanel() {
		var panelNumber = document.getElementsByClassName('splitter').length;
		//console.log(panelNumber);
		var oldWidth = canvas.width;
		var oldHeight = canvas.height;

		//var oldWidthStyle = canvaso.ffsetWidth;
		//$(document).ready(function(){
		var oldHeightStyle = $(canvas).height();
		//})


		var prevCanvas = ctx.getImageData(0, 0, oldWidth, oldHeight);

		tmp_canvas.height = oldHeight + 600;
		document.getElementById('paint').style.height = oldHeightStyle + 300 + 'px';
		document.getElementById('tmp_canvas').style.height = oldHeightStyle + 300 + 'px';
		document.getElementById('sketch').style.height = oldHeightStyle + 300 + 'px';
		canvas.height = oldHeight + 600;
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.putImageData(prevCanvas, 0, 0);
		prevCanvas.crossOrigin = "Anonymous";
		//ctx.fillStyle = "black";
		tmp_ctx.strokeStyle = "#202020";
		//tmp_ctx.scale(1,1);
		tmp_ctx.lineWidth = '3';
		tmp_ctx.moveTo(0, oldHeight);
		tmp_ctx.lineTo(1500, oldHeight);
		tmp_ctx.stroke();
		stopDrawing();
		tmp_ctx.restore();
		splitters = document.createElement('p');
		splitters.className = 'splitter';
		splitters.setAttribute("id", "splitter-" + Number(panelNumber + 1));
		sketch.appendChild(splitters);
		splitters.style.top = 150 + 300 * (panelNumber) + 'px';
		splitters.innerHTML = "split";
		panel2s = document.createElement('div');
		panel2s.className = 'placeholder cancel';
		panel2s.setAttribute("id", "placeholder-" + Number(panelNumber +1 ));
		document.getElementById('placeholder-wrapper').appendChild(panel2s);
		panel2s.style.top = 300 * (panelNumber) + 'px';
		$(panel2s).droppable({
			hoverClass: 'border-2',
			accept: $('.rageface.panel2, .dragged-panel2'),
			drop: function(event,ui){
				var thisPanel2 = $(this);
				droppedFaces++;
				var currentFace = document.getElementById('rage' + droppedFaces);
				$(ui.helper).addClass("dragged-helper");
				var theClone2 = $(ui.helper).clone(true).removeClass('rageface ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable').addClass('dragged dragged-panel2').attr('id', 'rage-' + droppedFaces).appendTo(this).wrap('<div class="img-parent"></div>');
				console.log(theClone2)
				//$(this).appendChild(theClone2);
				//$(theClone2).appendTo('#panel2-holder');
				//var dropIn = $(this)
				//console.log(dropIn);
				$(tmp_canvas).addClass('default-cursor');
				$('#ragecontainer').removeClass('clicked');
				$('#add-button').hide();
				document.getElementById('add-button').innerHTML = 'add';
				$('#add-button').fadeIn();
				$(theClone2).draggable({
					disabled: true,
				});
				$(theClone2).css({'position':'inherit'});
				$(theClone2).animate({width: '750', height: '300'},200);
				theClone2.parent().parent().droppable({
					disabled: true,
				});
				$(this).removeClass('cancel');
				var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated fadeIn';
				$(deleteHandle).prependTo($(theClone2).parent());
				$('#placeholder-wrapper').sortable('refresh');
				$(deleteHandle).click(function(){
					$(this).parent().remove();
					$(this).remove();
					$(thisPanel2).addClass('cancel').droppable({disabled:false});;
					droppedFaces--;
					//alert(droppedFaces)
				});
				$(theClone2).parent().mouseover(function(){
			$(theClone2).siblings().show();
			console.log($(theClone2))
			});
			$(theClone2).parent().mouseout(function () {
				$(theClone2).siblings('.delete-handle').hide();
				console.log($(theClone2).siblings('.delete-handle'))
			});
			},
		
		});
		splitters.addEventListener('click', splitting, false);
		//$(splitters).click();
		//alert(oldHeightStyle);
		tmp_ctx.scale(2, 2);
		//ctx.scale(2,2);

		$('html, body').animate({
        scrollTop: $("#add-remove").offset().top
    }, 1000);
		$('#remove-panel-button').fadeIn();
	};

	function removePanel() {
		var panelNumber = document.getElementsByClassName('splitter').length;
		//console.log(panelNumber);
		var oldWidth = canvas.width;
		var oldHeight = canvas.height;
		//var oldWidthStyle = canvaso.ffsetWidth;
		//$(document).ready(function(){
		var oldHeightStyle = $(canvas).height();
		//})
		var prevCanvas2 = ctx.getImageData(0, 0, oldWidth, oldHeight);
		tmp_canvas.height = oldHeight - 600;
		document.getElementById('paint').style.height = oldHeightStyle - 300 + 'px';
		document.getElementById('tmp_canvas').style.height = oldHeightStyle - 300 + 'px';
		document.getElementById('sketch').style.height = oldHeightStyle - 300 + 'px';
		canvas.height = oldHeight - 600;

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		tmp_ctx.putImageData(prevCanvas2, 0, 0);
		tmp_ctx.strokeStyle = "white";
		tmp_ctx.lineWidth = '2';
		tmp_ctx.moveTo(0, oldHeight - 600);
		tmp_ctx.lineTo(1500, oldHeight - 600);
		tmp_ctx.stroke();
		tmp_ctx.restore();
		prevCanvas2.crossOrigin = "Anonymous";
		var lastSplitter = document.getElementById('splitter-' + panelNumber).remove();
		tmp_ctx.scale(2, 2);
		console.log(panelNumber);
		$("#add-remove").get(0).scrollIntoView(400);
		stopDrawing();
		//$('#placeholder-' + (panelNumber)).remove();
		$('.placeholder:nth-child('+ panelNumber +')').remove();
		//console.log($('.placeholder').index(panelNumber));
		console.log($('#placeholder-' + panelNumber).parent());
		panelNumber--;
		if ( $('#placeholder-' + panelNumber).hasClass('cancel') ) {
			droppedFaces--;
		}

		if (document.getElementsByClassName('splitter').length == 1) {
			//document.getElementById('remove-panel-button').style.display = 'none';
			$('#remove-panel-button').fadeOut();
			//alert('none');
		}

	};
	if (document.getElementsByClassName('splitter').length == 1) {
		//document.getElementById('remove-panel-button').style.display = 'none';
		$('#remove-panel-button').fadeOut();
		//alert('none');
	} else if (document.getElementsByClassName('splitter').length > 1) {		
		//document.getElementById('remove-panel-button').style.display = 'inline-block';
		$('#remove-panel-button').fadeIn();
		//alert('yes');
	} else {
		//alert('wgat');
	}
	
	function addRage(){
		droppedFaces++;
	}

	$('#upload-button, #clear-button').click(function(){
		$("body").get(0).scrollIntoView(500);
		var thisPopup = $('#'+ $(this).attr('id') + '-popup');
		console.log(thisPopup);
		$(thisPopup).addClass('show-upload');
		$('.overlay').addClass('show-upload');
		$('.overlay, .close, #no, #clear').click(function(){
			$(thisPopup).removeClass('show-upload');
			$('.overlay').removeClass('show-upload');
		})
	});
	
	$('#create-wrapper').focus(function(){
		$('.create').css({'opacity':'1','display':'block'})
	});
	$('#create-wrapper').focusout(function(){
		$('.create:nth-child(n+2)').css({'opacity':'0','display':'none'})
	})
	
	$('.create:nth-child(n+2)').click(function(e){
		$('.left-column').removeClass('fadeInLeft animated-delayed').addClass('fadeOutLeft animated');
		$('.right-button').removeClass('animated-delayed rotateIn').addClass('rotateOut animated');
		$('.middle-column').addClass('fadeOut animated');
		var toLoad = $(this).attr('id') + '.html' + ' #content';
		console.log(toLoad);
		setTimeout(function() {
			$( "#content" ).load( toLoad );
		},1000);
		$('.create:nth-child(n+2)').hide();
		function loadJS(file) {
		// DOM: Create the script element
		var jsElm = document.createElement("script");
		// set the type attribute
		jsElm.type = "text/javascript";
		// make the script element load file
		jsElm.src = file;
		// finally insert the element to the body element in order to load the script
		document.body.appendChild(jsElm);
		}
		console.log($(this).attr('id') + '.js');
		//loadJS( $(this).attr('id') + '.js');
		
	});


function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {
      //$('.image-upload-wrap').hide();
		var newRageface = document.createElement('img')
      $(newRageface).attr('src', e.target.result);
      //$('.file-upload-content').show();
	$(newRageface).appendTo('#uploads');
		$(newRageface).addClass('rageface rageface-normal animated-fast bigEntrance');
		setTimeout(function(){
			$(newRageface).removeClass('bigEntrance')
		}, 1000)
$(newRageface).draggable({
			helper: 'clone'
			, appendTo: $('#sketch')
			, revert: 'invalid'
			, disabled: false
			, start: function (event, ui) {
				$('#ragecontainer').hide();
				$(tmp_canvas).css({
					'cursor': 'move'
				});
				$('#edit').click();
				//$(ui.helper).animate({'width':'75','height':'auto'});
				//if ( $(this).hasClass('panel2')) {
				//	$(ui.helper).addClass('dragged-panel2');
				//}
			}
			
			, stop: function (event, ui) {
				//droppedFaces = document.getElementsByClassName('dagged').length;
				droppedFaces++;
				console.log(droppedFaces);
				var currentFace = document.getElementById('rage' + droppedFaces);
				$(ui.helper).addClass("dragged-helper");
				var theClone1 = $(ui.helper).clone(true).removeClass('bigEntrance rageface ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable').addClass('dragged').attr('id', 'rage-' + droppedFaces).appendTo($('#sketch')).wrap('<div class="img-parent"></div>').resizable({
					aspectRatio: true
					, minHeight: 75
					, disabled: false
					, handles: 'se'
					, start: function () {
						//$('.ui-wrapper').addClass('dragged-shadow');
						//$(this).parent().addClass('img-wrapper');
					}
					, containment: sketch
				}).parent().draggable({
					containment: $('#sketch'),
					appendTo: $('#sketch'),
				 });
				var deleteHandle = document.createElement('div');
				deleteHandle.className = 'delete-handle animated-fast fadeIn';
				$(deleteHandle).prependTo($(theClone1).parent().children());
				//var deleteHandle = document.createElement('div');
				//deleteHandle.className = 'delete-handle';
				//$(deleteHandle).prependTo($(theClone1).parent());
				//$(theClone)
				//$(this).wrap('<div class="img-parent"></div>');
				$(deleteHandle).click(function(){
					$(this).parent().parent().remove();
					//$(this).parent().remove();
					//$(this).remove();
					$('#placeholder-1').addClass('cancel');
					droppedFaces--;
				});
				//$(theClone1).click(function(){
				//	$(theClone1).focus();
				//});
				$(theClone1).parent().mouseover(function(){
					$('#addRageFaces i').hide().text('remove').fadeIn(200)
			$(theClone1).find('.delete-handle').show();
			console.log($(theClone1).find('.delete-handle'))
			});
			$(theClone1).parent().mouseout(function () {
				$(this).find('.delete-handle').hide();
			});
			}
		});
      //$('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
	//$("<a href='#'></a>").click().$('#rageface').click();
	//$('.overlay, .popup').hide();
	$('.popup').removeClass('show-upload');
	$('.overlay').removeClass('show-upload');
}
$('.image-upload-wrap').bind('dragover', function () {
		$('.image-upload-wrap').addClass('image-dropping');
	});
	$('.image-upload-wrap').bind('dragleave', function () {
		$('.image-upload-wrap').removeClass('image-dropping');
});
//}


//alert('functions')
}

$(document).ready(functions);
$(document).on('page:load', function(){
		functions;
	}
)