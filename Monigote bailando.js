(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Monigote bailando_atlas_1", frames: [[0,0,1976,1339]]},
		{name:"Monigote bailando_atlas_2", frames: [[0,0,1117,1339]]},
		{name:"Monigote bailando_atlas_3", frames: [[1238,0,426,1044],[0,0,1236,1063]]},
		{name:"Monigote bailando_atlas_4", frames: [[1735,0,298,161],[1788,163,258,132],[1492,637,298,161],[1160,637,330,150],[0,0,426,1043],[1800,297,207,161],[1436,800,266,161],[1310,247,476,140],[1160,789,274,161],[1792,637,192,128],[796,800,274,161],[1704,957,258,100],[796,637,362,161],[1310,389,488,96],[1072,952,294,138],[1310,0,423,245],[1704,800,267,155],[796,514,1062,121],[428,0,366,1068],[796,0,512,512]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_61 = function() {
	this.initialize(ss["Monigote bailando_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["Monigote bailando_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(img.CachedBmp_53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2164,868);


(lib.CachedBmp_52 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["Monigote bailando_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["Monigote bailando_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.actualizar = function() {
	this.initialize(ss["Monigote bailando_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.teloni = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgbzAylIA8ioIgIAUIgMAAQgKp6ALqCQABg9gSg/Qh6msg/m2QgTiFAnh4Igii3IAbgCIA0C0IAQAMQApHABjG4QAAmyhsmiQg1iAgBiGIBqF+Ih0qgQivgNimg4QhPAmhXgRQhCgNhHgFQBSH9AgIDQAODcAdDcQAFAmgCAoQA7F0BVFkQBfBogTC0QgMB8gcB5QgDAMgFALIgYgEIgUhUIg8gkQgykThEkRQhsm4gXnIQgGhzgJhyQgQjegnjcQiWtLgItZQgElwBZlfQCRo7HqkvQFSjQF4iNQDRhODfgYIAHgIQE1g9E0AFQBKABBNgLQBFgHBDAPIAJgHQKqBXKiATQEoBiEsgHQDzgFDugrQBagQBQgpQBRgqBOgxIAWgGIgBBAQmfExoTg+Qnsg5nvglQligcligVQAHKmjVKMQhDDPhsC9QhVCVhpCLQi6D1jpDNQjFCujcCUQjECEjaBaQAPA0gmAoQgOAQgTAIQgaALgegBIgOAAIBQFLIAAAMQCPKngBK9QAADdAyDTQANA3AXA1IAAAMIgIAIIhIh0QgoHyhcHiIg8AsgEgafAqwIAABdQAGgwAAgvgEgaTAgFIAAhsIgMhUgA7XNhIAIAMIgIgkgEgoXgFiIAQBwICpBVQC+gTDJAOQATgUAcgFQDUgmC4htQD2iSDlirQEXjQDHkcQJftiAnw5QlggLleAqQn0A6nGDeQhsA2hQBUQidCki1ALQg+Aog4AvIAEAIIlKQJIgIgIQBHmVCJmDIAIgMIAyiWQlNIhBDKBQEFncELnYIARAOQj/ICkiHyIAUKOQFVl3D4maQi7HxmWE8gA6bm2QCWjRCzi7QG/nVDcpXQAWg6Acg5QDdm/BlniQAgAQgGAyQgmFfifFGQiIEUiFEaQlMK8pIH/gEggbgIuQCWiAB/iWQE3lwEul2QEfljC/mdIAQAEIAEAMQgxCehSCQQh2DOiEDDQmhJppCHIgA1n/uQAAgGACgFQCIm8CqmxQABAAABABQABAAAAAAQABAAAAABQAAAAAAABQgDBpgjBoQhqE8hvE7QjJI7mEHWQEzngDhoEgEgarglOIAIgMIAAgMIAIgMIBkkgIAYAEIAIAUQhCDShGDRQhZEFiLDog");
	this.shape.setTransform(276.0434,386.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,61.7,557.1,649);


(lib.telonderecha = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(0.2,57.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.2,57.5,558.5,669.5);


(lib.recrgar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.actualizar();
	this.instance.setTransform(0,0,0.2305,0.2305);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,118,118);


(lib.piernaiz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(168,-38.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_59();
	this.instance_1.setTransform(28.5,23.55,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3399").s().p("Ak8qUIAAgBIAAgGIAAgHIAAgHIAAgIIAAgHIAAgHIAAgBIgCgCIgCgCIgBgCIAAgFIAAgGIAAgFIAAgGIAAgEIAAgCIgBgCIgBgBIAAgCIgBgDIAAgCIgBgBIAAgCIAAgCIAAgCIAAgCIAAgCIgBgBIAAgCIgCgCIAAgCIAAgCIAAgCIgBgBIgCgDIAAgFIAAgGIAAgGIAAgFIAAgEIgBgCIgBgCIAAgBIAAgCIAAgCIAAgCIgCgCIAAgCIgBgBIgCgDIAAgCIAAgSIAAgTIAAgSIAAgTIAAgRIgBgCIAAgCIgBgCIgBgCIAAgDIAAgGIAAgGIAAgFIAAgGIAAgEIgBgBIgBgDIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIgBgBIgBgCIAAgDIAAgCIgBgBIgCgCIAAgCIAAgGIAAgFIAAgGIAAgGIAAgDIgBgCIgBgCIgCgCIgBgBIAAgCIAAgDIAAgCIAAgBIAAgCIgCgCIAAgCIAAgCIgBgCIgCgBIAAgCIAAgCIAAgCIAAgCIgBgCIAAgBIgCgDIAAgMIAAgOIAAgNIAAgBIAEABIFcg6MAFyAisIl4A/g");
	this.shape.setTransform(36.15,114.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-38.9,317,267.3);


(lib.piernader = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_58();
	this.instance.setTransform(-265.95,-38.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_57();
	this.instance_1.setTransform(-110.5,30.55,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3399").s().p("AmeQcMAJKgiQIDKA3IAAAHIAAANIAAANIAAALIABACIABACIAAACIABACIAAACIAAABIAAACIABACIABACIABACIAAACIABABIABADIAAACIAAABIAAACIAAACIAAACIABACIAAABIACACIACADIABAFIAAAGIAAAFIgBAGIAAADIACADIAAACIABABIAAACIABACIAAACIABACIAAABIAAACIAAADIAAACIAAABIABACIABACIAAACIAAADIAAAGIABAGIAAAGIgBAFIAAAEIACABIABACIAAADIAAAQIAAATIAAAVIAAAUIAAATIACACIAAACIACACIAAABIABACIAAACIAAACIABACIABACIABACIAAAEIAAADIAAAEIAAAEIAAADIAAAFIAAABIABACIAAACIABACIAAACIAAABIAAACIABACIABACIAAACIAAACIAAACIAAABIABADIABACIAAABIABACIAAACIAAACIACACIABABIAAAFIAAAFIAAADInydFg");
	this.shape.setTransform(41.5,114.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-265.9,-38.9,348.9,267);


(lib.personaandando = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgIeAiDQlFgZBxkmQDAnzCcoDQA5i6ANjCQi6jWARk1IAXmzQhlEQiMD4QgLAVgYAHQgKgBgIgEQgKgFgGgIQgHgHgCgKQgDgLABgKIACgOQDSmmCMm/QAhhpAthmQAghHAQhMQjyglhbjzQinnCGsisQERhtDTC+QBvBkANCfQAgGJlXCcIANAqQCCDhA6D+QANA8AQA9QFMDxEvEUQBeBWiFgEQgoAJgfgcQjfjFj0isQBfFSh/FHQg8CZiBBYQCkDjBvD/QBUDCgaDcQgkE4DJDsQAVAYggACQikgOhCi8QhtkxA8lgIgPgPQgnijhbiWQhNiAhUh8Ih2gRQgfFghzFPQiHGLhqGVQBxAWAgBfQASA1g8AAIgJgBgAmFjOQgeFmDhDuQAmAnAwgZQBXgvAthlQCvl3ibmMQhHg1g/g+IgygzIgegjQgNgPAAgSQgBgPAFgOIAPgMQANgIAPgGQADgCADAAIAHAAIAHABQAJAFAJAGQAPALANAOQAbAbAeAZQgUhigjhgIgsh2QghhWhNgpIg5AAQhHHagnHcgAlX/3Ql7CECxF6QCNEtFBhqQBdgfAnhdQhJAFhDgjQg2gegeg2IARgPQA0A3BKAQQA5AOA4gMQBHhzgbiDIgDgaQgukhjnAAQhSAAhqAkgAhW6nQgQgQAAgXQAAgWAQgQQAQgQAXAAQAWAAAQAQQAPAQAAAWQAAAXgPAQQgQAQgWAAQgXAAgQgQgAjs8XICriGIARARIisCGg");
	this.shape.setTransform(80.455,203.915);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgL1AgHQBzj/DPjvQGEm9gCpSQigjIgPj8Qgnp+DXpTQkwhJgqlQQhJpLJIgPQDggGBSDKQDZIbnGEVIA0CGQDPG2A0HtQAmFmjZEdIAIAKIhpAsQCJJtByJ2QAeCgC+AKQAcAFAcANQAmBWhjgJQnEgzArnqQACgegFgdQhOnEg9nBIh2gfQAoGgjDFnQjDFlkUEpQBKAxAaBHQAJAYgXAIQgfAKgcAAQhkAAhMh4gAh/jcQgPDMAsDDQBCElD9ANQD9lLhWmdQhkndjUmrQimHKglHlgAkO8MQhzGfF8CbQBcgDBcgUQB2gYAwhwQg/ACg5gaQhDgggnhAIASgTQAmAgAqAaQBLAvBVgbQAuhbAFhnQATmYlzgBIgDAAQkSAAhFD9gAgeEJQgVn/CJnwIAWgLQBnDHhMEUQglCIAJCOQAKClheBrQgLAOgMAAQgOAAgQgVgADC6IQgPgRAAgZQAAgYAPgSQAQgRAXAAQAWAAAQARQAQASAAAYQAAAZgQARQgQASgWAAQgXAAgQgSgAA87+IALgSQAGgJAIgHQBAhEBRgvIAPAbIioCLg");
	this.shape_1.setTransform(51.987,203.6552);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("EAKuAgyQiNhaiChtQjEimBIkKQArifgiiiQgzjzgRj3IhfgQQgKEdhiEMQhcD8kMB7Qh7A5h2BFQgBBIAXBFQAcBShNgaQhngigOhuQgXi8C0hLQCDg2B2hUQBfhEBjhBQAwiUAqiWQAuirAQiyQghgcgRglQhKicg2ilQgZhMgYhOQAKC5h7BgQgiAbAHgwQBwrkCvrUQhfgbhjhHQgxgjgmg4QkEmJGCkPQB4hUCUAKQEmALA9EJQBdGXlcDQQgoAXguAEIAYBLIAeFoQEWC8DYD/QBkB2hqAwQhCAegug/QiRjGioi1QClFsCNF3QAwB/g8B+QhACHiABHQBEElAiEtQAeEHADEEQABAlAlAPQDYBWAbC0QAFAdgPAAQgIAAgOgJgAgKnVIhZDUQgdGsD3FcIAGAKQEyA8gJliQgDiRhQiCQickAh1kXQgzAtgZA9gAhjocIALgWIANgUQApg8BFgcIgnmGgAhi+gQlYCCCpFcQCfFFFCioQA2gcAag5QhZABhIg1QghgYgSghIAPgPQBeBgCFgZQBJh6giiMQg2kUjXAAQhSAAhoApgACg5mQgPgPAAgWQAAgVAPgPQAPgQAVAAQAWAAAPAQQAPAPAAAVQAAAWgPAPQgPAPgWAAQgVAAgPgPgAgF7VICgh8IAPARQhEBOhfAvIgDABg");
	this.shape_2.setTransform(54.0224,204.0663);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AkjeYQAVhYgHhbIgeAlQgWAcgcAXQhlBThjBZQCUCejGhHQiZg3BrhtQB7h8B4iBQEBkThGmIQgWh4AFh9QAFh7AIh7Qg/g0gxhEQh3imgOjMQg1BohfArQgkAQgHguQgSh3BXhgQA+hFAyhRIAAgSIAQgZQAEn8C/nWQmiimBNnXQA9lxF6giQDzgRB2DIQBZCWACCxQADFvksCSIgFADQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABIABAEIhSASQBZDVBQDZQAmBlBNBTQAgAjAXAqQFPE8CBGhQABACgCAEQiHAbhTi7QhJimhsiXQhpiThviMIgHAWQEtG0gMHvQgGDUjKA3QhBASg/gYQDhEsg7FBQgCAIgHAGQipCTicCgIgMIIICJBFQAUA9g7ACIgQAAQkpAABMlAgAh9V7QAlgjArgYQCZhUgiiYQgkijhAibQgihRgbhUIgwgcgAiiqaQgaEHiiDjQgIALgJAGQgmI+IWCBQBXAUAWhaQBmmTkclfQhFhVgShvQgzk8hokxQhyFJhAFRIABAmIBtinIAnhgIAegWgEgESggwQlGBwBWFfQBrG0GaiQQBWgeAihYQg+ACg4gaQhEgfgmhBIARgUQAzA6BJAUQA6APA5gNQBOiNglidQgok7jyAAQhSAAhqAkgAgL6/QgQgSAAgZQAAgZAQgRQAPgSAWAAQAXAAAPASQAQARAAAZQAAAZgQASQgPASgXAAQgWAAgPgSgAih86ICqiSIAPAbIipCKg");
	this.shape_3.setTransform(79.3942,200.2204);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.8,-26.2,184.70000000000002,452.8);


(lib.PERSONAA = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgJHAmPQAbgqAzgUQEmh4gWl9IgamrQgenrgFnrQkZijhYk5QASE9iJD0QgOAZgPgfQhUimAwjUQApi6AVi+QA4nzDimvQggiiA1icQnHlUDDoYQAhhYBXgwQI9k4FJH0QApA+AXBFQBnE2hZEwQgbBdhjAkIgpANQCBHUDmHEQDZGpBTHVQAKA5gEA4QAqDpiSiqQgqgygLhKQhUoyjxoEQhLiig4ipQgXH2DfHGQAcA6gRBBQg2DNitB7QgWAPgXANQgoOMgSOIQgBAjAvAAQEPACDBCXQAdAYgqAGQiUAaikgNQjTgUhpipQg+hjAOh4QBRrOAYrSQAChRAug3IADgbIkkggQCGMMg/MSQgVECi8CRQhJA4hcATQhEAeghAAQhIAABUiGgAn1nDQixI5INDeQEpB/CDkVQBkjUiSjWQhXiAgKiaQgcmsg6moImygqQAiHoiTHZgAoDtjIAAgBIAEgKIgEALgAnyuYIABgCIAAgIIgBAKgEgKYghgQgYBEAKBLQAuFNErClQDNA+DcgiQEsgYhFlHQg7kaigjjQg6hThmgTQhcgShQAAQlIAAhsE3gAmD8uIgUgNQhEgugjhNIAjgfIB/BvIE1gnIAWAVIgGAJQgOAWgZAFQicAoihACIgIgEgEgGoggeQgkgbAOgsIgRAAIAOgJIhEAGIgDgSQB2g0CCAGIAJASIhNAgQAYAkgUAnQgSAggaAAQgUAAgYgTgEgA7ghxIAUgVIg6AAIgVgGIgDgTIDGgSQAUgPAVAMIAFADIAEAFIADADQABANgPAMIgJAGQgFADgGAAQgeAKgfgMQA4A2hDAiQgbAPgTAAQgsAAAHhPg");
	this.shape.setTransform(85.733,257.6108);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgRmAoBQgDgRABgSQDpikDLi+QB+h2BDilQBVjPBIjUQCrn1CZn7IgMgGIADgMQnMkGBvofQAHgggHggQBrkYANkpQkaGmlqFzQg9A/hHAnQgxAcgPg/QgFgXABgYQHRnnGAojQgFh+Amh5QnHlUDDoYQAhhYBXgwQI8k4FKH0QApA+AXBFQBnE2hZEwQgbBdhjAkIgpANQCBHUDmHEQDZGpBTHVQAKA5gEA4QAqDpiSiqQgqgygLhKQhUoyjxoEQhLiig4ipQgXH2DfHGQAcA6gRBBQg2DNitB7QgWAPgXANQgoOMgSOIQgBAjAvAAQEPACDBCXQAdAYgqAGQiUAaikgNQjTgUhqipQg+hjAOh4QBSrOAYrSQAChRAug3IADgbIkageQimI4ijI5Qg4DEhbC1QgbA4ggA1Qi9GNmyBeQgHACgGAAQgeAAgIgqgAjtnZQixI5IMDeQEqB/CDkVQBkjUiSjWQhXiAgKiaQgcmsg6moImygqQAiHoiTHZgAj7t5IAAgBIAEgKIgEALgAjquuIABgCIAAgIIgBAKgEgGQgh2QgYBEAKBLQAuFNErClQDMA+DdgiQEsgYhFlHQg7kaigjjQg6hThngTQhdgShPAAQlHAAhsE3gAhd84IgCAAIgNgDIgIgEIgHgFIgFgDIgBgBIgIgFIgHgEIgFgFIgEgEIgHgFIgEgEIgFgFIgEgEIgFgFIgFgFIgEgEIgFgFIgHgEIgIgFIgEgEIgDgFIgFgFIgEgEIgFgFIgDgEIgBgFIgDgEIgDgFIgCgEIgBgFIgCgEIgBgFIAAgEIgCgFIACgEIAAgFIADgEIADgFIAEgEIAGgFIAIgDIAJgBIAAAAIADAAIAMADIAHAEIAFAFIADAEIADAFIACAEIAAAFIADAEIAEAFIAFAEIAEAFIAHAEIAEAFIAFAEIAEAFIAFAEIAEAFIADADIACABIAEAFIAIAFIAGAEIAGAFIADAEIAHAFIAIAEIAGACIAGgCIAJgBIAGAAIAegCIANgDIAUgBIAHgCIAJgBIAagCIAHgBIAFgCIAJgBIASgDIAbgFIAQgDIAVgCIAHgBIALgDIAJgDIAHgCIAXACIAGAAIADgCIAHgBIACAAIAJADIAGAEIADAFIACAEIAAAFIAAAFIgCAEIgDAFIgGAEIgGAFIgFADIgDACIgGABIgHACIgSADIgLADIgJADIgGADIgHABIgJACIgUADIgLACIgJADIgGABIgDABIgJACIgMACIgJABIgFABIgTAEIghAFIgXADIgDACIgHABIgJACIgVADIgGADIgJABIgbAAgEgCAggbIgVgFIgPgJIgJgJIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgKIADgJIADgCIgUAHIAAgFIABgCIACgBIALgGIgLADIgJAGIgwgDIgGgJIADgJIADgGIAJgDIAkgGIAMgGIAYgHIAGgGIAJgDIAdgCIApgEIALgEIABgCIBDADIAIAJIAAAJIgCAKIgMAGIgxAGIgMAGIgHAAIAJAJIAGAJIAGAJIADAKIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAJIgMAGIgSADIgHgBgEADtggsIgPgJIgJgJIgGgJIgDgJIgDgJIAAgJIgDgJIADgKIAAgJIADgJIAJgJIAGgJIAFgDIgHAAIgCAAIgCAAIgvAAIgVgGIgGgKIADgJIADgGIAJgDIAMgDICvgGIAJgGQAEAAAFgCIAAgBIAVADIAMAJIADAJIgDAJIgMAJIgJAKIgMAGIgdgBIgUgFIgLAAIAFADIAJAJIAGAJIAGAJIADAJIAAAKIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAJIgNAGIgSADIgbgGg");
	this.shape_1.setTransform(59.3406,259.8356);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("EgJxAoQQAyjBDqhhQA3gWAHhEQAbj1APj3QApqOB+qEQn3lIELosQA3hxAFiAQAGiaADicQkrHDkoHEQhVCBhkB1Qg0A+g0hGQDznsFtnEQBoiBBTiQQAfg1AtgsQgMiSAriMQmjkzB/oVQAPhCA6gsQHclpG3F9QBRBIAcBqQBHELAGEUQAGDdjXA0QBgF9DEFqQDtG1ByHjQAwDNgtC7QgHAfgegUQiPhfgHjPQgIjUhGjLQibnBium8QgYH4DgHGQAdA4gRBCQglCUhuB0Qg2A5hIAiQglOHgbODQgBAtA0gHQEzgGCzCrQiuBukRhaQhrgihHhWQh9iZAejbQBirhBBrhIADgbQiqAWiQhNQiPMPghMnQgHCrhbCJQhkCUigBcQghASgjAOgAjcoaQhJEJBJEGQBVEuEwAkQG1Ayg0mqQgJhNglhJQjUmeAcnYQAJihgYijQjdgMjVgeQAdHOh8HDgEgGDgjAQgpBCAGBTQAdFyFDCzQDNA9DcgiQE1gYhQlWQg+kHiNjeQg2hUhjgXQhcgVhSAAQkdAAicD+gAhe9JIgCAAIgNgDIgIgFIgHgEIgFgDIgBgCIgIgFIgHgEIgFgFIgEgEIgHgFIgEgEIgFgFIgEgEIgFgFIgFgEIgEgFIgFgEIgHgFIgIgEIgEgFIgDgEIgFgFIgEgEIgFgFIgDgEIgBgFIgDgEIgDgFIgCgEIgBgFIgCgFIgBgEIAAgFIgCgEIACgFIAAgEIADgFIADgFIAEgEIAGgFIAIgDIAJAAIAAgBIADAAIAMADIAHAEIAFAFIADAEIADAFIACAFIAAAEIADAFIAEAEIAFAFIAEAEIAHAFIAEAFIAFAEIAEAFIAFAEIAEAFIADADIACABIAEAFIAIAFIAGAEIAGAEIADAFIAHAEIAIAFIAGABIAGgBIAJgCIAGAAIAegBIANgDIAUgCIAHgBIAJgBIAagCIAHgCIAFgBIAJgCIASgDIAbgEIAQgDIAVgCIAHgBIALgDIAJgDIAHgCIAXACIAGAAIADgCIAHgBIACAAIAJADIAGAEIADAFIACAEIAAAFIAAAEIgCAFIgDAEIgGAFIgGAEIgFADIgDACIgGABIgHACIgSAEIgLACIgJADIgGADIgHABIgJACIgUADIgLADIgJACIgGABIgDABIgJACIgMACIgJABIgFABIgTAEIghAGIgXADIgDABIgHACIgJABIgVADIgGADIgJACIgbAAgEgCBggtIgVgEIgPgJIgJgKIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIADgCIgUAGIAAgFIABgBIACgCIALgFIgLACIgJAGIgwgDIgGgJIADgJIADgGIAJgDIAkgGIAMgGIAYgGIAGgGIAJgDIAdgDIApgDIALgEIABgCIBDADIAJAJIAAAJIgDAJIgMAGIgxAGIgMAGIgHABIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAKIgMAGIgSADIgHgCgEADsgg+IgPgJIgJgJIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIAJgJIAGgJIAFgEIgHABIgCAAIgCAAIgvgBIgVgGIgGgJIADgJIADgGIAJgDIAMgDICvgGIAJgGQAEAAAFgCIAAgBIAVADIAMAJIADAJIgDAJIgMAJIgJAJIgMAGIgdgBIgUgEIgLAAIAFADIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAJIgNAHIgSADIgbgHg");
	this.shape_2.setTransform(8.2079,261.5683);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("EgJ3Ao1QghgEgUgdQA+jCDnhoQAmgQAHgtQAmjyAQj1QAsqcB4qRQlsjQBQmHQAvjnA8jgQAahgghhiQAghbgQhfIgNAUIgChqQmBFUklGiICWgwQAeB/i5gCQgrgBgggcQA5kXDzjQQDujNDcjgQgGiGAoiBQnAlLC5oZQAehaBVgzQHfkWFzFsQBUBTAjB0QBfE/hKE7QgcB1h5AgIgUAEQB+HMDlG/QDdGuBSHdQAJA5gCA4QApDpiSiqQgqgygLhKQhEnUjAmxQhuj5hWkDQgPIADVHVQAeBBgbBKQhKDQi7BrQgzOSAAOLQAAAaAnAAQDrARDKBtQBXAvhnANQhZAKhegCQjigEipiHQgtgjACg7QAVsEA4sCQAIhvAqhgIADgbQipAViQhNQiPMQgYMnQgGDBh0CQQheB0iEBMQgpAXgnAYIgJABIgTgCgAjrpYQgBAKgFAKIAEAMQj5ILG7FCQBsBPCJgMQFfgfg9lYQgaiTg+iIQiLkwAFlSQAEjhgXjhQjbgKjXggQAVGphJGngEgHHgizQgdA0ADA/QAUGBFMC8QDNA9DcghQFZg/iHl/Qg+iuhHipQhAiViggdQhRgQhGAAQkuAAiXELgAjh96Qgwghgdg2IAggoIB/BvIE0gnIAVAVQgUApgnAPQhZAjhOAAQhkAAhVg5gEgDbghDQglgaAPgsIgSAAIAPgJIhFAGIgDgSQB2g0CCAGIAJASIhLAcQAPAfgJAgQgNAvgfAAQgTAAgcgTgEACQgiVIAUgVIg6AAIgVgGIgDgTIDIgSQASgPAWAMIAJAHIADAEQgDAUgUAMIgFADIgQAEQgZABgagIQA5A2hFAiQgbANgSAAQgsAAAGhNg");
	this.shape_3.setTransform(15.4007,261.2469);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("EgRkAoOQBDjFDnhxQApgTAGgzQAumrArmrQAvnWBLnSQlsjRBKmIQAsjlBCjgQmCANB7lMQAVg6AtgrQBYhVBrg8QgJiMAqiHQmhkpB5oNQAWhfBWg5QG+krGXE0QBwBWApCOQBaE4gsE+QgLBPhGAtQgzAhg6AOQgCB2A1BnQAFAIADAKQBHBXAmBzQHtjUHxgVQAOgEgHAUQgwB/i9AUQilAPidA6QjBBGjCA+QFmKlBZLyQAMBfhKg1QiGhigLi6QgVlGh8ktQhrkFhnkGIg5AUQAoGaCiGEQAfBMggBOQhQDGixBqQgOMShMMPQgNB+AZB9QEdBDD9B8QAPAIgZAHQinAqjGgjQiqgbhQiEQhbiUAdi2QAShsALhsQBDp+Aup3IADgbQiqAPiYhJQiEMUgaMZQgPGwmlCggAmjEfQCVBICfgyQBsgiArhsQBwkTjIkTQg+hVgShqQgOhTAChUQkDBNkNAXIgNAyIANAKIgUBgIgRAAQjMIWHqDugAsIwxIicC0IAABUQA+AeBHAAQAaAEAZgKIAMj2IgNAVIAAhLgAp6tyQAAAxgLAyQEEgFD1heIgwoRQjbgLjYgfQgMEbABEggAAEupIAMgGIgJgbgEgOEgiJQgYBEAKBLQAuFOErCkQDPA9DbgiQFAgghhlfQg+jhhpjNQhAh8iMgbQhbgShOAAQlLAAhtE6gApR9LIgBAAIgOgDIgIgFIgHgEIgFgDIgBgCIgIgFIgHgEIgFgFIgEgEIgGgFIgFgEIgEgFIgFgEIgEgFIgFgEIgEgFIgFgEIgHgFIgIgEIgEgFIgDgEIgFgFIgEgEIgFgFIgDgEIgCgFIgDgEIgDgFIgBgEIgCgFIgBgFIgCgEIAAgFIgBgEIABgFIAAgEIADgFIADgFIAFgEIAGgFIAIgDIAJAAIAAgBIADAAIAMADIAHAEIAFAFIADAEIADAFIABAFIAAAEIADAFIAFAEIAEAFIAFAEIAGAFIAEAFIAFAEIAEAFIAFAEIAEAFIADADIACABIAEAFIAIAFIAGAEIAGAEIADAFIAIAEIAIAFIAGABIAGgBIAJgCIAGAAIAegBIAMgDIAVgCIAHgBIAJgBIAagCIAIgCIAFgBIAJgCIASgDIAbgEIAPgDIAVgCIAHgBIALgDIAJgDIAIgCIAXACIAGAAIADgCIAHgBIACAAIAJADIAGAEIADAFIABAEIAAAFIAAAEIgBAFIgDAEIgGAFIgGAEIgFADIgDACIgGABIgHACIgTAEIgKACIgJADIgHADIgHABIgJACIgUADIgKADIgJACIgGABIgDABIgJACIgMACIgJABIgFABIgUAEIghAGIgYADIgDABIgGACIgJABIgVADIgGADIgJACIgcAAgEgJ0ggvIgUgEIgPgJIgJgKIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIACgCIgUAGIAAgFIABgBIADgCIALgFIgLACIgJAGIgxgDIgGgJIADgJIADgGIAJgDIAlgGIAMgGIAYgGIAGgGIAJgDIAcgDIApgDIAMgEIABgCIBCADIAJAJIAAAJIgDAJIgMAGIgwAGIgMAGIgIABIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAKIgMAGIgSADIgHgCgEgEFghAIgPgJIgKgJIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIAJgJIAGgJIAFgEIgHABIgCAAIgCAAIgvgBIgVgGIgGgJIADgJIADgGIAJgDIAMgDICwgGIAJgGQAEAAAEgCIABgBIAVADIAMAJIADAJIgDAJIgMAJIgJAJIgMAGIgegBIgUgEIgLAAIAFADIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAJIgMAHIgSADIgbgHg");
	this.shape_4.setTransform(60.8558,261.7858);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EgRkAoOQBDjFDnhxQApgTAGgzQAumrArmrQAvnWBLnSQlsjRBKmIQAsjlBCjgQmCANB7lMQAVg6AtgrQBYhVBrg8QgJiMAqiHQmhkpB5oNQAWhfBWg5QG+krGXE0QBwBWApCOQBaE4gsE+QgLBPhGAtQgzAhg6AOQgCB2A1BnQAFAIADAKQBHBXAmBzQHtjUHxgVQAOgEgHAUQgwB/i9AUQilAPidA6QjBBGjCA+QFmKlBZLyQAMBfhKg1QiGhigLi6QgVlGh8ktQhrkFhnkGIg5AUQAoGaCiGEQAfBMggBOQhQDGixBqQgOMShMMPQgNB+AZB9QEdBDD9B8QAPAIgZAHQinAqjGgjQiqgbhQiEQhbiUAdi2QAShsALhsQBDp+Aup3IADgbQiqAPiYhJQiEMUgaMZQgPGwmlCggAmjEfQCVBICfgyQBsgiArhsQBwkTjIkTQg+hVgShqQgOhTAChUQkDBNkNAXIgNAyIANAKIgUBgIgRAAQjMIWHqDugAsIwxIicC0IAABUQA+AeBHAAQAaAEAZgKIAMj2IgNAVIAAhLgAp6tyQAAAxgLAyQEEgFD1heIgwoRQjbgLjYgfQgMEbABEggAAEupIAMgGIgJgbgEgOEgiJQgYBEAKBLQAuFOErCkQDPA9DbgiQFAgghhlfQg+jhhpjNQhAh8iMgbQhbgShOAAQlLAAhtE6gApR9LIgBAAIgOgDIgIgFIgHgEIgFgDIgBgCIgIgFIgHgEIgFgFIgEgEIgGgFIgFgEIgEgFIgFgEIgEgFIgFgEIgEgFIgFgEIgHgFIgIgEIgEgFIgDgEIgFgFIgEgEIgFgFIgDgEIgCgFIgDgEIgDgFIgBgEIgCgFIgBgFIgCgEIAAgFIgBgEIABgFIAAgEIADgFIADgFIAFgEIAGgFIAIgDIAJAAIAAgBIADAAIAMADIAHAEIAFAFIADAEIADAFIABAFIAAAEIADAFIAFAEIAEAFIAFAEIAGAFIAEAFIAFAEIAEAFIAFAEIAEAFIADADIACABIAEAFIAIAFIAGAEIAGAEIADAFIAIAEIAIAFIAGABIAGgBIAJgCIAGAAIAegBIAMgDIAVgCIAHgBIAJgBIAagCIAIgCIAFgBIAJgCIASgDIAbgEIAPgDIAVgCIAHgBIALgDIAJgDIAIgCIAXACIAGAAIADgCIAHgBIACAAIAJADIAGAEIADAFIABAEIAAAFIAAAEIgBAFIgDAEIgGAFIgGAEIgFADIgDACIgGABIgHACIgTAEIgKACIgJADIgHADIgHABIgJACIgUADIgKADIgJACIgGABIgDABIgJACIgMACIgJABIgFABIgUAEIghAGIgYADIgDABIgGACIgJABIgVADIgGADIgJACIgcAAgEgJ0ggvIgUgEIgPgJIgJgKIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIACgCIgUAGIAAgFIABgBIADgCIALgFIgLACIgJAGIgxgDIgGgJIADgJIADgGIAJgDIAlgGIAMgGIAYgGIAGgGIAJgDIAcgDIApgDIAMgEIABgCIBCADIAJAJIAAAJIgDAJIgMAGIgwAGIgMAGIgIABIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAKIgMAGIgSADIgHgCgEgJQgiEIgOADIgGAGIgGAGIAAAGIgCAGIACAGIAAAGIACAGIACAGIAIAGIAIAAIACAAIAQAAIAIgGIACgGIACgGIACgGIAAgGIAAgGIgCgGIgEgGIgIgGIgMgEIAAABgEgEFghAIgPgJIgKgJIgGgJIgDgJIgDgJIAAgJIgDgJIADgJIAAgJIADgJIAJgJIAGgJIAFgEIgHABIgCAAIgCAAIgvgBIgVgGIgGgJIADgJIADgGIAJgDIAMgDICwgGIAJgGQAEAAAEgCIABgBIAVADIAMAJIADAJIgDAJIgMAJIgJAJIgMAGIgegBIgUgEIgLAAIAFADIAJAJIAGAJIAGAJIADAJIAAAJIAAAJIAAAJIgDAJIgDAJIgGAJIgJAJIgMAJIgMAHIgSADIgbgHgEgDQgiKIgKABIgGAEIgGAGIgCAGIgCAGIACAGIAAAGIAEAGIAGAGIAOAEIAKgCIAEgEIAGgGIAEgGIAAgGIAAgGIgCgGIgEgGIgGgGIgMgEg");
	this.shape_5.setTransform(60.8558,261.7858);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("EgRlAoOQA/jFDohsQAtgVAGg3QAumlApmlQAtncBOnYQltjRBLmHQAsjlBCjhQlsAVBhk4QAehfBMhHQBHhDBYgoQgHiMAoiHQmpk0B9oWQAIgkAdgdQEYkWGYBTQFLBEBGFFQAwDfAODmQAHBngzBaQg5BkhxAaQgCB3A2BnQAEAIADAJQA9BMAkBhIAMAdQHtjVHxgTQAOgEgDAXQgMBih8AQQiLAViJApQkPBTkLBaQGPLGAXMKQABAPgYgKQighOACjkQACiGgkiEQh9nFjFmtIg5ATQAsGZCbGGQAnBkgxBgQhVCqigBcQgrONgYOGQgBAkAlABQETAHDQCVQAaATgoAGQjOAajhgxQhRgRg6g8QiUiZAgjsQBjrmBArjIADgbQipAWiRhOQiCMzgoM/QgGB9hIBiQiLC9jXBtgAmiEhQCVBIChg8QCJgzAgiTQAvjWh/jLQh7jEABjoQkCBNkOAYIgNAxIANAKIgUBhIgRAAQjLIXHrDvgAsJwxIicC0IAABUQA/AeBGAAQAbADAYgJIAMj2IgNAUIAAhKgAp6tzQgBAygLAyQEEgHD1hdQAGkEg2kBQjGBoi3hkQgkgUgYgUQADETgHEWgAADupIAMgGIgJgbgEgN0gjQQg1A/AOBZQAxFKDiDxQASATAGAfQE1DWFEkXQCZj0iAkyIhfjjIgKAWIkdiFIAFgfQA1ABAzANQhpgnhiAAQjwAAjCDsgAor4VIBAAPIgMgeIgygSIFRATQgZiWhbh4IgvgIQiTBfgdCtIgEAVIgTgQQgLgKAGgaQAti/CphKQClBEAXDPQACARAEASIARAQIgDAgQhdAphUAAQh1AAhkhPgAk53wIBKAAIAAgeIhKAAgAls3wIAfAAIAAgpIgfAAgAmj31IAiAAIAAgsIgiAAgAjZ33IAPAAIAAgOIgPAAgAnn35IAuAAIAAguIguAAgApL3NQgmgUAKgnIAqA9IgFABQgEAAgFgDgAia3MIAng3QAQAsgwAMIgHgBgArY+cQg4g5AAhQQAAhQA4g5QA5g5BQAAQBQAAA5A5QA5A5AABQQAABQg5A5Qg5A4hQAAQhQAAg5g4gEgLJgihQgzAyAABIQAABHAzAzQAzAzBHAAQBIAAAygzQAzgzAAhHQAAhIgzgyQgygzhIAAQhHAAgzAzgAlQ/LQguguAAhBQAAhBAuguQAuguBBAAQBBAAAuAuQAuAuAABBQAABBguAuQguAuhBAAQhBAAgugugEgFBgibQgpApAAA6QAAA6ApApQApAoA5AAQA6AAAogoQApgpAAg6QAAg6gpgpQgogpg6AAQg5AAgpApgEgJmggSQgFgFAAgIQAAgIAFgGQAGgFAIAAQAIAAAGAFQAGAGAAAIQAAAIgGAFQgGAGgIAAQgIAAgGgGgEgDlggxQgFgFAAgHQAAgHAFgFQAFgFAHAAQAHAAAFAFQAFAFAAAHQAAAHgFAFQgFAFgHAAQgHAAgFgFgEgI+gmLQA0gIAkAjIAJAKQilAfiFBsQAQiXC5gZg");
	this.shape_6.setTransform(61.3765,261.806);

	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-88.55,6.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_56();
	this.instance_1.setTransform(-88.55,6,0.5,0.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("EgKsAoLQA+jFDshlQAXgLAEgcQBHouA7otQAnlpA9lmQn9lOEgo1QBZiugdjGQgQhrAChuQmcEjkSGzICXgwQAmBmiTAaQg7AMgygfIgHgGQAkkZEBjWQDyjJDZjjQgEiHAmiAQnDlQC3oWQAWhCA8gqQD+iwE7AyQGoBEA1HCQAQCHANCJQANCDgvB3QgwB5iGAGQB+HDDiG0QDfGvBQHgQAWCGgLCIQiyAcgMjkQgQlEhzkxIklsOQgXH2DeHHQAcA5gRBBQg5Dci/B7IgXANQgnOGgbODQgCAvA4ABQEFAEDJCOQAjAaguALQibAjirgfQiggchvhvQhWhXANiFQBMsEAosGQACgoAdggIADgbQisANiVhHQh/OihtOaQgKBThJAyIkUC8gAjrphQgCAKgEAKIAEAJQjlHJFiFYQB4B2CrgDQFugOgxloQgOhpgxhhQjHmOAknEQAKh9gUh/QgCgNgFgNIAbgoQjmgMjkhAQAKGzhDG4gEAAFgnSQmcADg0FhQgRBtAiBrQCLG6H1gbQBxAABsgLQDEjEh8kzQg6iQhOiGQhyjDjnAAIgFAAgAi+7OIgBg1IG5gfQC6A8i4AWQh1AOh0AAQhoAAhpgMgEgDnggIQgQgRAAgXQAAgYAQgQQARgRAXAAQAYAAAQARQARAQAAAYQAAAXgRARQgQARgYAAQgXAAgRgRgEgDrgg1QgHAHAAAKQAAAKAHAHQAHAHAJAAQAKAAAHgHQAHgHAAgKQAAgKgHgHQgHgHgKAAQgJAAgHAHgEACmgghQgSgSAAgZQAAgaASgRQARgSAZAAQAZAAASASQASARAAAaQAAAZgSASQgSASgZAAQgZAAgRgSgEACkghVQgIAJAAAMQAAAMAIAIQAIAJAMAAQAMAAAJgJQAIgIAAgMQAAgMgIgJQgJgIgMAAQgMAAgIAIgEABfgh7IAAghQB4hJCEAxIAFADQhvAOh4AtQgFACgFAAQgJAAgHgHgEgF4gjdQAdg9BJABIAfAAQBaAHA+A9QACACACAEQiBgkiCAyg");
	this.shape_7.setTransform(17.9195,266.912);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("EgNWAoLQA+jFDshlQAXgLAEgcQBHouA7otQAnlpA9lmQn9lOEgo1QBZiughjGQgViAARiDQlYKmgbLyIgsANQhHsTGdrXQBMiGARigQnDlQC3oWQAWhCA8gqQD+iwE8AyQGnBEA1HCQAQCHANCJQANCDgvB3QgwB5iGAGQB+HDDiG0QDfGvBQHgQAWCGgLCIQiyAcgMjkQgQlEhzkxIklsOQgXH2DeHHQAcA5gRBBQg5Dci/B7IgXANQgnOGgbODQgCAvA4ABQEFAEDJCOQAjAaguALQibAjirgfQiggchvhvQhVhXANiFQBLsEAosGQACgoAdggIADgbQirANiWhHQh/OihtOaQgKBThJAyIkUC8gAmVphQgCAKgEAKIAEAJQjlHJFiFYQB5B2CqgDQFugOgxloQgOhpgxhhQjHmOAknEQAKh9gUh/QgCgNgFgNIAbgoQjlgMjlhAQAKGzhDG4gEgCkgnSQmdADg0FhQgRBtAiBrQCLG6H1gbQBxAABsgLQDEjEh8kzQg6iQhOiGQhyjDjnAAIgEAAgAlo7OIgBg1IG5gfQC6A8i4AWQh0AOh0AAQhpAAhpgMgEgGRggIQgQgRAAgXQAAgYAQgQQARgRAXAAQAYAAAQARQARAQAAAYQAAAXgRARQgQARgYAAQgXAAgRgRgEgGVgg1QgHAHAAAKQAAAKAHAHQAHAHAJAAQAKAAAHgHQAHgHAAgKQAAgKgHgHQgHgHgKAAQgJAAgHAHgEgAEgghQgRgSAAgZQAAgaARgRQARgSAZAAQAZAAASASQASARAAAaQAAAZgSASQgSASgZAAQgZAAgRgSgEgAFghVQgIAJAAAMQAAAMAIAIQAHAJAMAAQAMAAAIgJQAJgIAAgMQAAgMgJgJQgIgIgMAAQgMAAgHAIgEgBKgh7IAAghQB3hJCEAxIAFADQhvAOh3AtQgFACgFAAQgJAAgHgHgEgIigjdQAdg9BJABIAfAAQBaAHA+A9QACACACAEQiBgkiCAyg");
	this.shape_8.setTransform(34.9305,266.912);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},5).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},4).to({state:[{t:this.shape_4}]},4).to({state:[{t:this.shape_5}]},5).to({state:[{t:this.shape_6}]},11).to({state:[{t:this.instance}]},37).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.shape_7}]},8).to({state:[{t:this.shape_8}]},10).to({state:[{t:this.shape_8}]},12).to({state:[]},1).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-0.4,278,528.4);


(lib.parado = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EABAAgTIgFg0QBXhKBugaQALjsARjtQAgnTgonWQi2g7iPiKQhihfAEh+QACg1AQgzQheEQjRCqQgQANgEgaQgaiSBviQQBgh7A+iTQBwkKCJj3QgXj+Ayj5QjkhjhFjpQh7mZGCiGQF6iEC1E8QAsBMAiBSQCDEyi1DZQBKC9hADNQgHAXgFAYQFjGxDhH5QAsBihpglQhOgagkhOQh1j4iQjsQBpDGAgDcQAUCEhOBuQhOBtiDAtICFUoQDXAWA3CmQAMAhgpgFQj9gThgi2QglhGgHhSQg2o5gio7IiKgOQAuJ/gSJ+QgIEZjvAAQgxAAg7gMgAAAjfQhnEPC1CuQFGE5FKkXQArgkACg8QAMkWi2jpQi7juBaktQAkh6goh0IlMgSQgJHdinG+gAhy8eIgPARQghKdKihEQA+gDAjgyQA1hUgRhoIgCgNQgOkii6ilQgTgQgMgWQhWgXhPAAQjOAAibCYgAy+0XIAGACIgCAEIgCAAIgCgGgAEo0oIgLgCIgHgDIgDgBIgKgDIgJgDIgGgDIgKgDIgMgDIgHgEIgIgEIgGgEIgFgDIgEgEIgGgEIgFgDIgFgEIgFgEIgFgEIgEgDIgDgEIgEgEIgDgEIgDgDIgEgEIgDgEIgCgEIgBgDIgCgEIgCgEIgDgEIgBgDIgBgEIgBgEIgCgEIgBgDIgBgEIgBgEIABgEIAAgDIABgEIAEgEIAEgCIACgCIAGAAIAAgBIAJADIAFADIADAEIABAEIABAEIABADIADAEIACAEIADAEIACADIAEAEIAEAEIACAEIAEADIAGAEIAFAEIAFAEIAFADIAFAEIAIAEIAGADIAIAEIAFADIACABIAIADIAIABIAKACIAIADIACABIAKADIAIACIACABIA/ABIATgBIAMgCQASgDARgGQAMgFANgCIAGgCIAIADIAFAEIACADIACAEIAAAEIAAAEIgCADIgCAEIgEAEIgFAEIgFADIgFAEIgFAEIgHAEIgHADIgDADIgDABIgJADIgFACIgfAGQgVADgWAAQgYAAgYgEgABZ4oIgPgIIgIgHIgHgIIgFgHIgFgIIgDgHIAAgIIAAgHIgCgIIACgHIAAgIIADgHIACgIIAFgHIAIgIIAHgHIANgIIAMgFIASgBIAAgBIAWAFIAPAHIAKAIIAFAHIAFAIIAFAHIADAIIACAHIAAAIIAAAHIAAAIIgCAHIgDAIIgCAHIgFAIIgFAHIgKAIIgKAHIgNAFIgRADIgZgFgAGP5JIgNgIIgKgHIgFgHIgHgIIgDgHIgCgIIAAgHIgDgIIADgHIAAgIIAAgHIACgIIAFgHIAFgIIAIgHIAKgIIAKgFIAHgCIASgCIAAgBIAWAFIAPAIIAKAHIAFAIIAFAHIADAIIACAHIADAIIAAAHIAAAIIAAAHIgDAIIgCAHIgFAIIgFAHIgIAIIgKAHIgHAFIgIADIgRACIgZgFgACW+AIABABIgCABIABgCgAI9+xIgFgFIAIAFIACACIAAAGIgFgIg");
	this.shape.setTransform(48.1121,208.7341);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.4,0.9,243,415.8);


(lib.paraaas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgH7AgCQAPgvA2gNQDrg6AEkZQAJpyg4pzQjCh1hfjOQgIgSgEgSQAZEDiFCpQgQAUgFgdQgojlAcjxQA6noDUmuQgZiGAqiBQkAipgNk6QgRmiGyguQFAghCMERQCkE/hbFJQgZBchjATQCDG+DOGyQCzF4AcGfQAFBPg6g9QhdhigUiPQhFngjPm8QgihIgahKQAEG0ChGaQAUA0gYA2QhGCaiNBSQgjLpgHLpQgBAwBCAHQC/ACCoBSQAQBShdgBQj6gDi2iNQg3grADhJQAjrBBKq5IADgXIjygaQBuKHgxKNQgSD5jFBoQguAXgyAPQgzAegbAAQgwAAAehfgAmYiwQg8DxDDCZQEIDQDIjgQCQigh3jCQi6kzARlwQAHiWgSiXIlngjQAjHyh4HpgAmtrJIABAAIACgJIgDAJgAou82Qg1GSFPDTIFdARQEhgnhvlOQg5ithfiXQgzhThggRQhBgNg8AAQjlAAicC0gAkq3iIgBAAIgLgCIgHgEIgGgEIgEgDIgBAAIgGgEIgGgEIgEgEIgEgDIgFgEIgEgEIgDgEIgEgDIgEgEIgEgEIgDgEIgEgDIgGgEIgHgEIgDgEIgDgDIgEgEIgDgEIgEgEIgDgDIgBgEIgCgEIgDgEIgBgDIgBgEIgCgEIgBgEIAAgDIgBgEIABgEIAAgEIADgDIACgEIAEgEIAFgEIAGgCIAIgBIAAAAIACAAIAKACIAGAEIAEAEIADADIACAEIABAEIAAAEIADADIAEAEIADAEIAEAEIAFADIAEAEIAEAEIADAEIAEADIAEAEIACACIACACIADAEIAHAEIAFADIAFAEIACAEIAGADIAHAEIAFABIAFgBIAHgBIAFAAIAZgBIAKgDIASgBIAGgBIAHgBIAWgCIAGgBIAEgBIAHgCIAPgCIAXgEIAMgCIASgCIAGgBIAJgCIAHgDIAGgBIATABIAFAAIADgBIAGgBIABAAIAIACIAFAEIACAEIABADIAAAEIAAAEIgBAEIgCADIgFAEIgFAEIgEACIgDACIgFABIgGABIgPADIgJACIgHADIgFACIgGABIgIACIgQACIgJACIgHACIgFABIgDABIgHACIgKABIgIABIgEABIgQADIgbAFIgUACIgDACIgFABIgHABIgSADIgFACIgHABIgXAAgAlH6eIgRgEIgMgHIgIgIIgFgHIgCgIIgDgHIAAgIIgCgHIACgIIAAgHIADgIIABgCIgQAFIAAgDIABgCIACgBIAJgEIgJACIgHAFIgogDIgFgHIACgIIADgFIAHgCIAegFIAKgFIAUgFIAFgFIAIgDIAXgCIAigDIAKgDIAAgCIA3ADIAIAHIAAAIIgDAHIgKAFIgoAFIgKAFIgGABIAIAHIAFAIIAFAHIACAIIAAAHIAAAIIAAAHIgCAIIgDAHIgFAIIgHAHIgKAIIgKAFIgPACIgGgBgAgY6sIgMgHIgIgIIgFgHIgCgIIgDgHIAAgIIgCgHIACgIIAAgHIADgIIAHgHIAFgIIAEgDIgGABIgCAAIgBAAIgngBIgRgFIgFgHIACgIIADgFIAHgCIAKgDICQgFIAIgFIAHgBIAAgBIASACIAKAIIACAHIgCAIIgKAHIgIAIIgKAFIgZgBIgQgEIgJAAIAEADIAIAHIAFAIIAFAHIACAIIAAAHIAAAIIAAAHIgCAIIgDAHIgFAIIgHAHIgKAIIgKAFIgOACIgXgFg");
	this.shape.setTransform(71.177,212.6933);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgH0AgEQAWg4BAgPQDLguAHj0QAVqGg/qGQi4hthcjCQgVgsgIgwQAmEciOC0QgQAVgFgdQgojlAcjxQA6npDUmtQgaiGAriCQkAiogPk7QgTmLGYhDQEqguCgDrQBjCQAxCvQBCDtiBC6QgmA2hCANQCDG9DOGzQCzF4AcGfQAFBOg6g8QhdhjgUiOQhFnhjPm8QgihHgahLQAEG1ChGaQAUAzgYA2QhGCaiNBTQgjLogHLpQgBAwBCAHQC/ACCoBTQgWCKjShMQhfgiheglQjahXAzkNQAki/AWjEQAtmhAhmdIADgWIjygbQBuKIgxKNQgSD5jFBmQgtAXgzARQg0AdgaAAQgvAAAkhegAmWi4QhFEoEKCPQFSC2BvlTQAph6hDh8Qi1lPALmCQADiAgLiCIlngjQAeHshxHmgAmtrHIABgBIACgIIgDAJgAod8DQghA7AMBJQAuEcDwCTIFdASQD7gOg7kSQg2j3iWi7QgZgggbgnQhXgUhNAAQkBAAiBDogAlK4AQhGgSghhGIAagjIBpBdIEKgeIAHAWQhhAxhnAAQgyAAgzgLgAlz6sQgQgQAAgWQAAgXAQgQQAQgQAXAAQAWAAAQAQQAQAQAAAXQAAAWgQAQQgQAQgWAAQgXAAgQgQgAgz62QgQgQAAgWQAAgXAQgQQAQgQAXAAQAVAAAQAQQAQAQAAAXQAAAWgQAQQgQAQgVAAQgXAAgQgQgABr77QgVgmgogTIhqAAIAHgjQB3gRBEBXQAGAGAEAJIgIAWIgRAIIgMgXgAmp8AQgBgGABgGQAFgbAUgTQAVgUAagJIBfACIAPAeQgxAMgyAHQgrADgXApg");
	this.shape_1.setTransform(71.177,212.5476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.1,-2,140.20000000000002,429.2);


(lib.ojos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ApiDoQgIgBgHgCIgSgEQgKgDgKgFIgPgHIgPgIIgKgHIgKgIIgHgHIgIgHIgIgIIgHgIIgFgHIgFgIIgFgHIgFgHIgFgIIgDgIIgEgHIgDgIIgDgHIgCgHIAAgIIgCgIIAAgHIgDgIIAAgHIAAgHIAAgIIgDgIIADgHIAAgIIAAgHIAAgGIADgIIAAgIIACgHIACgIIADgHIADgHIACgIIACgIIAGgHIACgIIAFgHIAFgHIAHgIIAGgIIAHgHIAHgIIAIgHIAIgHIAJgIIALgIIANgHIAOgIIAPgHIAPgFIAIgCIAKgDIAOgDQAPABAPgCIAAgBIAPAAQAQABAOACQARADAQAEQAKADAKAFQAOAHANAJIAVANIAKAIIAIAIIAHAHIAFAIIAIAHIAEAHIAGAIIACAIIAFAHIACAIIAGAHIACAHIACAIIADAIIADAHIACAIIAAAHIACAHIAAAIIAAAHIAAAHIAAAIIAAAHIAAAHIAAAIIgCAIIAAAHIgCAIIgDAHIgDAHIgCAIIgCAIIgDAHIgFAIIgDAHIgEAHIgGAIIgEAIIgGAHIgEAIIgIAHIgIAHIgHAIIgLAHIgLAJIgKAHIgQAHIgRAHIgUAIIgNAFIgIADIgKABIgtAGIgdgDgAH6CvQgagJgXgNIgKgIIgLgHIgHgIIgHgIIgIgHIgIgHIgEgIIgGgHIgFgIIgEgIIgGgHIgCgHIgFgIIgDgHIgCgIIgCgIIAAgHIgDgHIAAgIIgDgHIAAgHIAAgIIAAgHIgCgHIACgIIAAgHIAAgIIAAgIIADgHIAAgHIADgIIACgHIACgIIADgIIADgHIAEgHIADgIIAFgHIAFgIIAFgIIAFgHIAIgHIAHgIIAHgHIAIgIIAKgIIAKgHIANgHIAOgIIASgHIAPgGIAKgCIAPgCQAPgBAPgBIAAgBIAPABQAPAAAPADQARACAQAFQAKADAJAEQAPAHANAIIAUAPIAKAHIAHAHIAIAIIAFAHIAHAIIAGAIIAFAHIACAHIAFAIIADAHIAEAIIADAIIADAHIACAHIACAIIADAHIAAAIIADAIIAAAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAGIgDAHIAAAIIgDAHIgCAIIgCAIIgDAHIgDAHIgCAIIgFAHIgDAIIgEAIIgFAHIgGAHIgEAIIgGAHIgHAIIgHAIIgIAHIgKAHIgNAIIgKAHIggAPQgMAEgNACQgWAEgXACIgPABQggAAgfgKg");
	this.shape.setTransform(79.15,23.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Ar5CHIgegFIgRgHIgMgIIgKgHIgIgIIgFgIIgIgHIgCgHIgFgIIgDgHIgCgIIAAgIIAAgHIgCgHIACgIIAAgHIAAgIIACgIIADgGIADgHIACgIIAFgHIAFgIIAHgIIAIgHIAKgHIAQgIIAMgFIAHgCIAXgCICYgGIAfgFIAdgFIAegEIAAgBIA/AAIAeAFIASAIIALAHIALAHIAHAIIAGAHIAEAIIADAIIAFAHIACAHIADAIIADAHIAAAHIAAAIIAAAHIAAAHIAAAIIgDAHIgDAIIgEAIIgDAHIgFAHIgFAIIgFAHIgKAIIgLAHIgMAIIgMAFIgHACIgXADIgjAFIhGAKIgeAFIirAAgAGjBGIgRgHIgNgIIgKgIIgIgHIgEgHIgIgIIgCgHIgGgIIgCgIIgCgGIAAgHIAAgIIgDgHIADgIIAAgIIAAgHIACgHIACgIIADgHIADgIIAEgIIAGgHIAHgHIAHgIIALgHIAOgIIANgFIAHgDQAMABALgCIAAgBIE7AAIAeAFIARAHIANAIIAKAIIAIAHIAEAIIAGAHIACAHIAFAIIADAHIACAIIACAIIAAAHIAAAHIAAAIIAAAHIAAAIIgCAIIgCAGIgGAHIgCAIIgFAHIgFAIIgFAIIgKAHIgKAHIgMAIIgNAFIgIACIgWACIk7ABIgegFg");
	this.shape_1.setTransform(80.15,23.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},37).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.5,0,173.3,47);


(lib.ojoos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-255.05,72.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_53();
	this.instance_1.setTransform(-568.45,-5.45,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3399").s().p("AnLg+IM6jeIBdFbIs6Ddg");
	this.shape.setTransform(46,28.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-568.4,-5.4,1082,434);


(lib.cejasss = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AO5DsQgagJgZgKIgegOIgPgIIgXgIIgRgEIgKgDIgKgDIgHgCIgKgFIgPgIIgNgHIgHgHIgkgPIgWgJIgRgGIgSgIIgMgHIgNgIIgKgIIgIgHIgFgHIgHgIIgPgHIgKgIIgKgIIgKgHIgIgHIgHgIIgIgHIgHgIIgDgHIgHgHIgDgHIgCgIIgDgHIgHgIIgFgIIgIgHIgHgHIgDgIIgFgHIgCgIIgDgIIgFgHIgCgHIgFgIIgFgHIgFgIIgFgIIgDgHIgCgHIAAgIIAAgHIAAgIIAAgIIACgHIADgHIACgIIAFgHIADgIIAHgIIAKgHIAPgHIAZgGIABABIARACIAPAFIAMAIIAIAHIAHAHIAFAIIAFAHIAFAIIAFAIIADAHIAFAHIACAIIAFAHIAFAIIAFAIIAFAHIAFAHIAIAIIAFAHIAFAIIAFAIIADAHIACAHIAIAIIAMAHIANAIIAMAIIAKAHIAIAHIAHAIIAFAHQAXALAYAIIAjANIAPAHIANAIIAIAHIAeAJQAmAKAiATQAZANAcAKIAWAHIAPAHIAKAIIAIAHIAHAIIADAIIAFAHIACAHIAAAIIAAAHIADAIIgDAIIAAAHIgCAHIgDAIIgFAHIgFAIIgHAIIgKAHIgPAHIgZAGQgWgFgUgHgAv7DyIgPgHIgKgHIgHgIIgFgIIgFgHIgDgIIgCgHIAAgHIgDgIIADgIIAAgHIAAgIIACgHIAFgHIADgIIAHgIIAIgHIAKgIIAPgHIAWgHQAcgKAZgNQAigTAmgKIAegJIAIgHIANgIIAPgHIAjgNQAYgIAXgLIAFgHIAHgIIAIgHIAKgHIAMgIIANgIIAMgHIAIgIIACgHIADgHIAFgIIAFgIIAFgHIAIgIIAFgHIAFgHIAFgIIAFgIIAFgHIACgIIAFgHIADgHIAFgIIAFgIIAFgHIAFgIIAHgHIAIgHIAMgIIAPgFIARgCIABgBIAZAGIAPAHIAKAHIAHAIIADAIIAFAHIACAIIADAHIACAHIAAAIIAAAIIAAAHIAAAIIgCAHIgDAHIgFAIIgFAIIgFAHIgFAIIgCAHIgFAHIgDAIIgCAIIgFAHIgDAIIgHAHIgIAHIgFAIIgHAIIgDAHIgCAIIgDAHIgHAHIgDAHIgHAIIgIAHIgHAIIgIAHIgKAHIgKAIIgKAIIgPAHIgHAIIgFAHIgIAHIgKAIIgNAIIgMAHIgSAIIgRAGIgWAJIgkAPIgHAHIgNAHIgPAIIgKAFIgHACIgKADIgKADIgRAEIgXAIIgPAIIgeAOQgZAKgaAJQgUAHgWAFIgZgGg");
	this.shape.setTransform(106.975,24.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("APWEWIgRgDIgIgCIgKgGIgMgHIgIgHIgFgIIgFgHIgFgIIgFgHIgFgIIgFgHIgFgIIgCgHIgDgIIgHgHIgIgIIgCgHIgIgIIgCgHIgIgIIgHgHIgIgIIgNgHIgbgPIgPgIIgPgIIgMgHIgSgIIgPgHIgKgHIgMgIIgZgHIgPgIIgKgHIgKgIIgQgFIgHgCIgKgGIgNgHIgHgGIgIgIIgKgHIgKgIIgHgHIgNgIIgOgIIgNgHIgIgHIgMgIIgSgHIgMgIIgIgHIgHgIIgFgHIgFgIIgFgHIgDgIIgCgHIAAgIIAAgHIAAgIIAAgHIACgIIADgHIACgIIAFgIIADgHIAHgIIAKgHIAPgIIAZgFIABACIARABIAPAFIAMAIIAKAHIASAIIAPAHIAKAHIAMAIIANAIIAHAHIALAIIAHAHIAKAHIAMAIIALAIIAKAHIAPAIIAOAHIANAIIARAHIAQAIIAOAHIANAIIASAHIARAIIAMAHIALAIIARAHIAMAIIALAHIAKAHIAMAIIANAHIAHAHIAMAIIALAHIAHAIIAIAHIAFAIIACAHIAFAIIAFAHIAFAIIAFAHIAIAIIAFAHIAFAIIACAHIAFAIIAIAHIAFAIIACAHIAIAIIAHAHIADAIIAFAHIACAIIAAAHIAAAIIADAHIgDAIIAAAHIgCAIIgDAHIgFAIIgFAHIgHAIIgKAHIgPAIIgZAFIgIAAgAvdDuIgZgFIgPgIIgKgHIgHgIIgFgHIgFgIIgDgHIgCgIIAAgHIgDgIIADgHIAAgIIAAgHIACgIIAFgHIADgIIAHgHIAIgIIACgHIAFgIIAIgHIAFgIIACgHIAFgIIAFgHIAIgIIAFgHIAFgIIAFgHIAFgIIACgHIAFgIIAIgGIAHgIIALgHIAMgIIAHgHIANgIIAMgIIAKgHIALgHIAMgIIARgHIALgIIAMgHIARgIIASgHIANgIIAOgHIAQgIIARgHIANgIIAOgHIAPgIIAKgHIALgIIAMgIIAKgHIAHgHIALgIIAHgHIANgIIAMgIIAKgHIAPgHIASgIIAKgHIAMgIIAPgFIARgBIABgCIAZAFIAPAIIAKAHIAHAIIADAHIAFAIIACAIIADAHIACAIIAAAHIAAAIIAAAHIAAAIIgCAHIgDAIIgFAHIgFAIIgFAHIgHAIIgIAHIgMAIIgSAHIgMAIIgIAHIgNAHIgOAIIgNAIIgHAHIgKAIIgKAHIgIAIIgHAHIgNAHIgKAGIgHACIgQAFIgKAIIgKAHIgPAHIgZAHIgMAIIgKAHIgPAHIgSAIIgMAHIgPAIIgPAIIgbAPIgNAHIgIAIIgHAHIgIAIIgCAHIgIAIIgCAHIgIAIIgHAHIgDAIIgCAHIgFAIIgFAHIgFAIIgFAHIgFAIIgFAHIgFAIIgIAHIgMAHIgKAGIgIACIgRADIgIAAg");
	this.shape_1.setTransform(107.975,20.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},50).wait(32));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-7,214.5,56.5);


(lib.cejasdss = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(292,-73.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_51();
	this.instance_1.setTransform(44.5,-37.45,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0066").s().p("AoLAIIPVkGIBCD2IvVEHg");
	this.shape.setTransform(52.4,25.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-73.9,425,124.80000000000001);


(lib.brazoiz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(161,-72.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_49();
	this.instance_1.setTransform(53.5,-6.45,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3399").s().p("AofpXILKjAIF1VvIrKDAg");
	this.shape.setTransform(54.4,79.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-72.9,298,231.20000000000002);


(lib.brazoder = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-227.95,-11.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_47();
	this.instance_1.setTransform(-91.5,34.55,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3399").s().p("Am7NhIHj8NIGUBMInjcNg");
	this.shape.setTransform(44.4,94.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.9,-11.9,316.7,200.1);


(lib.boooooooca = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(165,-75.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_45();
	this.instance_1.setTransform(28.5,-31.45,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990066").s().p("Aj4hXIGjhxIBOEgImjBxg");
	this.shape.setTransform(24.875,20.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-75.8,346,116);


(lib.bocaa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-10.55,-29.7,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Ag1FLIgUgFIhcgFIgVgFIg5gFIgMgCIgKgDIgGgCIgWgDIgNgCIgJgDIgGgCIgMgDIgMgCIgKgDIgFgCIgXgDIgUgFIgKgFIgMgCIgQgFIgZgIIgOgHIgKgFIgFgDIgUgFIgSgEIgUgGIgNgHIgHgIIgWgHIgQgIIgKgHIgHgIIgIgHIgMgIIgMgHIgIgIIgIgHIgHgIIgIgHIgHgIIgFgHIgIgIIgHgHIgPgIIgHgHIgGgIIgEgHIgIgIIgNgHIgHgIIAAgHIgDgIIADgHIAFgIIAPgHIAIgCIAAgCIgKgEIgIgGIgDgIIAAgHIAAgIIADgHIAIgIIAMgHIAIgIIAHgHIAMgIIAIgHIAKgIIAIgHIAHgFIAMgFIANgIIAHgFIAGgCIAMgFIAHgIIANgHIANgIIAHgFIANgFIAHgFIAMgFIANgHIAHgFIAGgDIAJgCIASgFIASgIIAHgFIAKgCIAPgFIASgIIAHgFIANgFIAHgFIAKgCIAegKIAPgFIAPgFIAPgFIAPgFIAegKIAPgFIAPgFIAegFIAIgFIAMgDIBIgFIASgFIAygCIANgFIARgFIAhgFIAQgFIECgBIAAgCIA/AAIARAGIAMAEIASAFIAoAFIASAFIAgAGIANACIAEACIAjADIASAFIAMAEIASAGIAUAFIASAFIAMAEIASAGIAHAFIAPAFIANAHIAOAIIANAIIAKAHIAFAHIADAIIAHAHIAHAIIAIAHIAHAIIAIAHIAIAIIAHAHIAFAIIACAHIADAIIADAHIgDAIIAAAHIgDAIIgEAHIgGAIIgHAFIgFACIgKACIAAABIACAHIADAIIAAAHIAAAIIgFAHIgCAIIgFAHIgDAIIgFAHIgIAIIgHAGIgHAIIgIAHIgHAIIgKAHIgIAIIgIAHIgKAIIgPAHIgHAIIgFAHIgKAIIgIAHIgEAIIgIAHIgKAIIgRAHIgIAIIgNAHIgOAIIgNAIIgKAHIgIAHIgKAIIgRAHIgHAFIgVAFIgMAFIgRAFIgKAFIgSAFIgKAIIgKAHIgRAIIgNAHIgHAIIgIAFIgFACIgUAFIgPAIIgKAFIgIACIgMADQgLACgMAEQgLADgLAEIgbAMIgGACIgMADIgXAFIgSAFIgnAKIiOgDgAjaDJIgPAFIgIAFIgKADIgRAFIgSAFIASACIARAFIA/AFIARAFIBnAFIARAFIAVADIBygFIARgFIAXgFIASgFIAWgFIAUgIIANgEIARgGIAMgFIANgCIAUgFIAKgIIAKgFIARgFIAKgHIAIgFIAFgDIAPgFIANgHIAMgIIAMgHIAMgFIkrAAIgPAFIg3AFIgOAFIgrAFIgPAFIgYAFIgSAFIgXACIgDACIgMADIgPAGIgUAHIgFAFIgMACIgUAAIgIAFgApZhVIgHAHIgPAIIgNAHIgRAIIgHAHIgNAIIgKAHIgKAIIgJAGIgBAEIgCAHIAAAIIAAAGIAAAIIAAAHIgBADIABAAIAHAHIAHAIIAKAHIAIAIIAHAHIAIAIIAKAHIAIAIIAHAHIAFAFIADACIAMAGIAKAHIAIAIIAHAHIAIAIIAMAFIASAFIAPAHIARAFIARAGIAOAEIARAFIAOAIIALAFIAYAHIAkAKIACgCIAFgFIAKgDIAKgCIANgFIAHgFIAKgDIANgFIAJgEIAAgGIAAgHIAAgIIAAgHIAAgIIAAgHIADgIIAAgHIAFgIIAAgHIAAgIIAAgHIAAgIIACgHIADgIIAFgHIACgIIAGgHIAEgIIADgHIAIgIIAHgHIACgEIgoAAIgTgFIgKgFIg6gDIgUgFIgUgFIgSgFIgEgFIgVgCIgOgFIgSgFIgRgFIgKgFIgGgDIgPgCIgOgFIgGgFIgCgCIgMgGIgIgHIgBgFIgMAFgAi+ABIAAAIIgDAHIgFAIIgFAHIgDAIIgHAHIgFAIIgIAHIgFAIIgCAHIgFAIIAAAHIAAAIIAAAHIgDAIIAAAHIgEAIIgGAHIAAAIIAAABIADgBIAjgOQAGgCAHgEIARgFIAKgFIAMgDIAQgFIAMgFIANgCIAMgFIASgFIAZgFIARgFIAjgFIARgFIA0gFIASgFIAtgCICJgCIgFgGIgCgIIgFgHIgCgDIAAgFIgDgHIgFgIIgFgHIgPgHIgKgHIgHgIIgGgHIgCgIIAAAAIgCABIgHABIgDgCIgDgHIgHgIIgPgFIgIgFIgHAAIgIgFIgKgHIgHgIIgPgHIgKgIIgagCIgTAAIgKAAIgBABIgnABIgKAFIhYAIIgMAHIgPAIIgPAHIgHAIIgIAHIgIAIIgEAHIgDAIIgFAHIgDAIIAAAFIgFAAIABABgAH2A2IARAFIACABIAKgGIANgIIAHgHIAIgIIAHgHIAIgIIAIgHIAHgIIANgGIAMgIIAHgHIAIgIIAMgHIALgIIACgHIAFgIIAFgHIACgIIAGgHIAHgIIAKgFIAMgBIAAgBIAGAAIgIgIIgHgHIgIgIIgIgHIgHgIIgHgHIgGgIIgEgHIgLgIIgKgHIgHgFIgRgGIgNgEIgSgFIgOgFIgSgFIgKgFIgHgCIAAAHIgDAHIgDAIIgEAHIgIAIIgKAHIgPAIIgIAHIgJAIIgKAHIgQAIIgOAHIgLAFIgEADIgSAFIgRAIIgQAHIgOAHIgZANIgUAFIgKAFIgGABIABABIAFAIIACAEIgCABIgDAAIgBABIgHABIgEADIgDAFIAFAFIgCAHIAAAFIgDAAIADAIIABAAIABACIAFAIIADAGIAFAIIAEAHIADAIIAFAFIACAHIAGAIIAAAGIBNgBIBxAAgAARj/IgRAFIghAFIgSAFIgQAAIgxACIgRAFIhJAFIgOAFIgNABIgWACIgQAFIgPAFIgOAFIgPAFIgQAFIgRAFIgWAHIgKAFIgKADIgPAFIgSAIIgPAHIgHAFIgFACIgKADIgPAFIgSAHIgIAFIgKADIgWAFIgGAEIAEABIARACIANAFIAHADIASAAIAOAFIAcAFIAKACIAFADIAZACIAPAFIBBADIASAFIBgAAIABgDIAHgHIAIgFIANgFIAHgIIAFgFIAFgCIAKgDIAMgFIAIgFIAKgCIAogDQAdgDAdgFIAAgCIBlAAIANAEIADABIAZADIAOAEIAXAGIAPAFIAMACIASgEQAfgIAggKIAdgKIAKgFIANgFIAPgIIAPgHIAPgIIAWgHIAPgIIANgHIAIgIIAHgHIAMgIIAEgCIgLgDIgSgFIgqgFIgRgFIgOgEIgRgGQgcgCgdAAIh+gBIh+ABgAuCDMIgMgFIgIgIIgCgHIgDgIIgDgHIAAgIIgCgHIAAgIIgCgHIAAgIIAAgHIAAgIIgDgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIADgHIAAgIIACgHIACgIIADgHIADgHIACgHIACgIIADgHIAAgIIADgHIACgIIACgHIADgIIADgHIACgIIADgHIAAgIIACgHIACgIIAGgHIAHgIIAHgFIANgBIAAgBIAPAFIAKAHIAFAIIACAHIAAAIIAAAHIgCAIIAAAHIgCAIIgDAHIgDAIIAAAHIgCAIIgCAHIgDAIIgDAHIgCAIIgCAGIAAAIIgDAHIgDAIIgCAHIgDAIIgCAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIgCAIIAAAHIAAAIIgDAHIAAAIIAAAHIgDAIIgCAHIAAAIIgCAHIgDAIIgDAHIgHAIIgKAAgANWA2IgCgIIACgHIACgIIADgHIADgIIAAgHIACgIIAAgGIACgIIAAgHIADgIIAAgHIAAgIIAAgPIAAgPIAAgPIAAgPIAAgPIgFgHIgCgIIAAgHIgDgIIgFgHIgCgIIgDgHIgDgIIgCgHIAAgIIACgHIAAgIIAIgHIAIgFIAJgBIABgCIAMAFIAKAIIAFAHIACAIIADAHIADAIIAEAHIADAIIAFAHIAFAIIAFAHIAAAIIADAHIAAAIIACAHIAAAIIAAAHIAAAPIAAAPIAAAPIAAAPIAAAPIgCAIIAAAHIgDAIIgDAGIgHAIIgFAHIgFAIIgFAHIgHAIIgIAHIgIAIIgRACIgKgHg");
	this.shape.setTransform(92.85,29.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AgvI1IgWgFIgFgHIACgIIADgFIAHgCIAPgDIBmgHIAegPIAjgPIAhgNIAKgHIAMgIIAIgFIAFAAIACAAIADAIIgFAHIgFAIIgDAHIgFAIIgHAHIgNAIIgMAHIgmAQIgeAOIgbANIhfgDgAgnHKIgPgIIgPgHIgIgIIgHgHIgIgIIgHgHIgIgIIgHgHIgFgIIgIgHIgHgIIgIgHIgHgIIgDgHIgCgIIgIgHIgHgIIgDgHIgCgIIgFgHIgIgIIgHgHIgFgIIgDgIIgHgHIgDgIIgHgHIgIgIIgFgHIgFgIIgFgHIgCgIIgDgHIgFgIIgCgHIgFgIIAAgHIAAgIIgDgHIgCgIIAAgHIgDgIIgCgHIgFgIIgFgHIgDgIIgFgHIgCgIIgFgHIgDgIIAAgHIAAgIIAAgHIgCgIIgDgHIgCgIIgFgHIgDgIIgCgHIgDgIIAAgHIAAgHIgCgHIAAgIIgFgHIgDgIIAAgHIgCgIIAAgHIAAgPIAAgPIAAgXIAAgPIAAgWIAAgXIAAgPIAAgPIAAgPIACgHIADgIIACgHIAAgIIAAgHIADgIIAAgHIAAgIIAAgHIAAgIIACgHIADgIIACgHIADgIIACgHIAFgIIADgHIACgIIAFgHIADgIIACgHIADgIIACgHIAFgIIADgHIACgIIADgHIAAgIIACgHIADgIIACgHIAFgIIADgHIAFgIIAFgHIAHgIIADgHIAFgIIAFgHIAHgIIAIgHIAHgIIANgFIAMgFIANgHIAHgFIAIgDIAPgFIAPgDIAAgCIBuADIAMAHIAMAIIANAHIARAIIAIAHIAFAIIAHAHIAMAIIALAHIAHAIIAIAHIAFAIIAKAHIAHAIIAFAHIAKAIIAIAHIAMAIIAKAHIAIAIIAFAHIAFAIIAFAHIAHAIIAFAHIAKAIIAFAHIAFAIIADAHIAFAIIACAHIAFAIIADAHIAFAIIACAHIAFAIIADAHIAFAIIACAHIAAAIIADAHIAFAIIACAHIAFAIIADAHIACAIIADAHIAAAIIACAHIADAIIACAHIADAIIAAAHIACAIIAAAHIAFAIIADAHIAAAIIACAHIAFAIIAAAHIADAIIACAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIADAIIACAHIADAIIACAHIAAAHIAAAHIAAAIIAAAHIAAAIIAAAPIAAAHIAAAIIAAAPIAAAPIAAAPIgCAHIAAAIIgDAHIgCAIIgDAHIAAAIIAAAHIAAAIIAAAHIAAAEIADAEIACAHIAAAIIAAAHIgCAIIgFAHIgIACIgCAGIgDAHIgCAIIgFAHIgDAIIgFAHIgCAIIgFAHIgFAIIgDAIIgCAHIgFAIIgDAHIgFAIIgHAHIgIAIIgHAHIgDAIIgCAHIgIAIIgHAHIgIAIIgHAHIgIAIIgFAFIgDABIgOAGIgIAIIgFAFIgDABIgOAGIgFAFIgSAFIgUAIIgHAFIgIACIh8gCgAhjFeIAKAIIACAHIAFAIIAIAHIAHAIIANAHIAHAIIAFAHIANAFIADABIBogBIAMgFIAPgFIAMgIIAIgEIAFgDIANgFIAHgHIAFgFIAFgDIANgFIAHgHIAIgIIAFgHIAFgIIACgHIAIgIIAAAAIgKADIgKAFIgUAFIgKAFIgeAFIgKAFIgeAFIgKAFIgeAFIgKAFIhagDIgFgFIgOgDIgVgEIgKgIIgCgBIAFAGgAhRFAIAJADIAXACIAKAFIBNgCIAMgFIAcgFIAMgFIAcgFIAMgFIAcgFIAMgFIAPgGIAKgEIANgGIAKgCIAHgDIAKAGIADgDIACgIIAFgHIADgIIAFgHIACgIIADgHIAFgIIACgHIAAgIIADgHIAFgIIACgHIAAgDIgCgCIgNgIIgRgHIgFgFIgZgFIgFgFIiUACIADAIIAAAHIAAAPIAAAPIAAAPIAAAPIAAAIIAFAHIACAIIADAHIACAIIgHACIgPgFIgKgHIgIgIIgCgHIAAgPIAAgPIAAgPIAAgPIAAgPIAAgEIgIABIgKAFIgQAFIgSAIIgNAHIgPAIIgKAHIgHAIIgIAHIgFAIIgHAHIgFAIIgDAHIgHAIIgFAHIgDAIIAAAHIAAAIIgCAIIgDAHIgRADIgFgIIgDgIIAAgHIAAgIIAAgHIAAgIIADgHIAFgIIAFgHIAFgIIAFgHIAHgIIAIgHIACgIIAFgHIAIgIIAFgHIAHgIIAPgHIAPgIIANgHIARgIIALgEIALgGIAKgFIAbgFQAGgBAEgCIABgCIClADIAHAFIAXAFIAMAHIALAHIACgHIACgHIADgIIACgHIAAgIIAAgHIAAgIIAAgHIAAgPIAAgPIAAgPIAAgPIAAgPIgCgHIgFgHIAAgIIgDgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIgCgHIgFgIIAAgHIgDgIIgCgHIgFgIIAAgHIgDgIIAAgHIgCgIIgDgHIgCgIIgDgHIAAgIIAAgHIgFgIIgCgHIgFgIIgDgHIgCgIIgDgHIADgIIAAgHIgDgIIgFgHIgCgIIgFgHIgDgIIgFgHIgCgIIgFgHIgDgIIgFgHIgKgIIgEgGIgDAEIgKAHIgjAIIgKAFIgXAFIgKAFIgRAFIgKAFIgeAFIgKAFIgdAFIgKAFIgXAFIgKAFIg8AFIgKAFIg6ABIggABIgKAFIgtAAIgPgCIgDAHIAAAIIAAAHIgCAIIgDAHIgCAIIAAAPIAAAPIAAAeIAAAeIAAAeIAAAeIAAAPIgDAHIAAAIIAFAHIAAAIIADAHIACAIIAAAHIAAAHIADAHIACAIIAFAHIADAIIACAHIADAIIAAAHIACAIIAAAHIAAAIIAFAHIADAIIAFAHIACAIIADAHIACAIIADAHIACAIIADAHIAAAIIACAHIAAAIIADAHIACAIIADAHIACAIIAIAHIAFAIIAKAHIAMAIIAIAHIAKAIIAHAHIADAIIAFAHIAHAIIAIAHIAHAIIADAIIAFAHIAFAIIAFAHIAFAIIAAABIACgGIANgIIASAFgAiBoPIgUAIIgNAHIgPAIIgPAHIgFAIIgFAHIgFAIIgFAHIgFAIIgFAHIgFAIIgCAHIgFAIIAAAHIgDAIIAAAHIgCAIIgDAHIgFAIIgCAHIgFAIIgDAHIgCAIIgDAHIgCAIIgFAHIgDAIIgCAHIgFAIIgDAHIgCAHIAPgCIAlgFIAKgFIAogDIAwgEIAMgFIA6gFIAMgFIAcgFIANgFIATgFIAMgFIAZgFIANgFIARgGIANgEIAZgFIAMgFIAUgFIAGgCIgGgGIgKgHIgMgIIgIgHIgKgIIgHgHIgFgIIgKgHIgFgIIgIgHIgHgIIgLgHIgMgIIgHgHIgFgIIgNgHIgHgIIgIgHIgLgIIhxgCIgFACg");
	this.shape_1.setTransform(95.225,35.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AkbFzIgNgFIglgFIgMgEIgRgGIgOgFIglgFIgKgFIgRgFIgNgFIgUgFIgKgFIgegFIgKgFIgUgFIgNgHIgHgIIgPgHIgRgIIgKgHIgIgIIgHgHIgIgIIgIgHIgHgIIgFgHIgIgIIgCgHIgHgIIgDgHIgDgIIgCgHIgCgIIgDgHIgDgIIgEgHIgDgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgPIAAgXIAAgWIAAgXIAAgPIADgGIAEgIIAIgHIAIgIIAFgHIACgIIAKgFIAcgFIAFgFIAHgCIAtgFIAPgFIAUgDIAUgFIARgHIANgFIAcgDIAPgEIAggJIAPgEIAcgDIAPgEIAWgFIAegGIAPgFIAtgFIAPgFIBGgCIAXgFIAlgGIAXgEIBCgFIAXgFIBzgFIAPgFIDLgIQAHgBAHgCIAAgCICRADIANAFIAvAFIANAEIARAGIANAHIAMAIIAGAHIACAIIAIAHIAHAIIADAHIACAIIAHAHIAGAIIAEAHIADAIIAAAHIAAAIIADAHIACAIIACAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAGIAAAIIAAAHIAAAIIAAAHIAAAIIgDAHIgCAIIgIAHIgCAIIgFAHIgHAIIgIAHIgFAIIgKAHIgPAIIgFAFIAIAFIACAHIAAAIIgFAHIgFAFIgHADIgrAFIgKAFIgIABIgHAEIgNAHIgHAIIgPAHIgPAIIgPAHIgPAIIgHAHIgNAIIgZAHIgHAIIgQAHIgZAJIgRAGIgKAIIgSAHIgYAIIgOAFIgRAFIgMAFIgUAFIgNAFIg3AFIgPAFIglAFIgMAFIgmAFIgNAFIgtAFIgLAFIgvAFIgNAFIgyAFIgNAFIiggDgAG5CzIgMAFIgKAAIgoACIgKAFIhDAFIgLAFIhIAFIgMAFIhYAFIgMAFIgSABIgoACIgNAFIg1AFIgNAFIg8AFIgKAFIg9AFIgKAFIhDAFIgNAFIhkAFIgFACIgEABIg9AEIgKAFIgKABIAIAEIASAGIAMAEIAeAFIANAFIARAGIAMAEIAmAFIANAFICggCIAMgFIA6gFIANgFIAmgFIANgFIAtgFIANgFIAlgFIANgFIAtgFIAOgFIAwgFIANgFIAZgFIAMgFIARgFIANgFIARgFIAKgHIAIgGIAHgCIAQgFIAMgFIAPgDIAKgFIAKgHIAbgIIAIgHIALgHIgTACgAqIBRIAAAIIAAAHIAAAIIAAAHIAAAIIAIAHIACAIIACAHIgCAIIAFAHIADAIIACAHIACAIIAGAHIAFAIIAEAHIAGAIIAKAHIAKAIIAEAHIAOAIIAOAIIANAHIAEAFIAEACIATAFIAHAEIAIgBIADgFIAHgDIA8gFIAKgFIA6gFIAEgFIAIgCIADgFIAHgDIAegFIAPgHIAHgIIASgHIAPgIIAPgHIANgIIAbgHIAKgFIAUgFIAKgFIAUgFIAKgFIAegFIAKgFIAcgFIAFgFIAIgDIA4gFQAFgBAEgCIABgCIDrADIAHAFIA/ABIA/ABIAPAIIAOAHIABABIAHgBIAKgFIAHgCIA3gFIANgFIAogFIAMgEIAAgBIADAAIAIgFIAUgIIAHgHIAHgIIAIgHIAKgIIAFgHIAIgIIAHgHIAFgIIAFgHIAAgIIAAgHIAAgIIAAgHIAAgHIAAgHIAAgIIAAgHIAAgIIgDgHIgEgIIgDgHIAAgIIAAgHIAAgIIgFgHIgIgIIgBgBIgDAEIgZAHIgKAFIhdAFIgKAFIgyAFIgKAFIgoAFIgKAFIgeAFIgNAFIglAFIgMAFIgjADIgKAFIgIACIgjAFIgKAFIgyAFIgNAEIg5AFIgKAFQg5ADg5AEIhBAGIgLAFIgxAFIgKAFIgzAFIgKAFIgvAFIgNAFIgoAFIgJAFIhHAFIgJAFQghACggABQhDAChCAAIgKgDIAAAAgAATCcIgKAFIhAAFIgjAIIgKAFIgcAFIgKAFIgUAFIgKAFIgMAFIgKAFIgUAFIgLAFIgRAFIgRAIIgGADIASgBIAMgFIA/gFIAKgFIA8gFIAKgFIBEgFIAMgFIAygFIAKgFIAlgDIAWgFIALgFIBagFIAKgFIBCgEIgqgDIgEgFIjfACgAFpiZIgOAFIjDAFIgSAFIh1AFIgWAFIhDAFIgYAFIglAGIgUAEIhLAFIgPAFIgtAFIgPAFIgUABIgZACIgSAFIggAFIgPAFIgZAFIgSAFIggAFIgRAHIgSAIIAAAHIgFAFIgPADIgKACIgPADIgPACIgPAFIgFAFIgIADIgZAFIgHAGIgFAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAKgCIA1gDIBKgFIAGgFIAHgCIAygFIAKgFIBQgFIAKgFIAtgFIANgFIAqgFIAKgFIAogFIAKgEIA8gFIAKgFIA9gFIAEgFIAIgDIBrgFIAKgFIA8gFIAKgFIAxgFIAKgFIAmgCIANgFIAngIIALgFIAogFIAJgFIAegFIALgFIAogFIAJgFIAwgFIAKgFIBTgFQAFgBAEgCIABgCIAVACIgBgCIgIgHIgMgIIgNgFIgFgCIgvgFIgNgFIiRAAIgIACgArxFxIgMgIIgKgHIgQgIIgHgHIgFgIIgFgHIgCgIIgGgHIgCgIIgCgHIgDgIIgDgHIgCgIIgCgHIAAgIIAAgHIACgIIAAgHIAAgIIAAgHIAAgIIAFgFIAFAAIACAAIAGAIIACAHIAAAIIAAAHIAAAIIACAHIAAAIIAAAHIADAIIACAHIADAIIAFAHIACAIIAGAHIACAIIAIAHIAOAIIALAHIAKAGIACACIAKACIAXAFIAHAIIgHAHIgfADIgRgFgAMdg8IgDgIIAFgHIAAgIIgCgHIAAgIIAAgHIgDgIIAAgHIAAgIIAAgHIgCgIIAAgHIAAgIIAAgHIAAgIIgDgHIgDgIIgEgHIgGgIIgEgHIgDgIIgDgHIgCgIIgFgHIgHgIIgIgHIgFgIIgFgHIgFgIIgIgHIgEgIIgIgHIgHgIIgKgHIgIgIIgKgHIgFgFIgjgFIgHgIIgDgHIADgIIAEgFIADgBIAHgCIAAgCIAXAAIAPAFIAKAIIAPAIIANAHIAKAHIAHAIIAHAHIAIAIIAFAHIAIAIIAEAHIAGAIIAEAHIAIAIIAFAHIAFAIIAFAHIACAIIADAHIADAIIAEAHIAGAIIAEAHIADAIIADAHIACAIIACAHIAAAIIAAAHIAAAIIAAAHIgCAIIAAAHIAAAIIAAAHIgCAIIAAAHIAAAIIgGAHIgCAIIgIAHIgHAIIgHAAg");
	this.shape_2.setTransform(100.85,26.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AjWE3IgKgCIgFgCIgPgDIgPgGIgPgFIgPgEIgPgIIgKgFIgDgDIgPgEIgMgHIgKgGIgKgDIgPgFIgPgEIgPgGIgFgEIgPgGIgIgHIgHgHIgKgIIgIgHIgHgIIgIgIIgHgHIgIgHIgHgIIgFgHIgFgIIgDgIIgHgHIgIgHIgCgIIgDgHIgHgIIgIgIIgCgHIgDgHIAAgIIgFgHIgCgIIgDgIIAAgHIAAgHIAAgIIADgHIAAgIIAAgIIAAgGIACgHIAFgIIADgHIAAgIIACgIIAIgHIAFgHIAFgIIACgHIAFgIIAIgIIAHgHIAKgHIAIgIIAHgHIAPgIIANgIIAKgHIAbgIIANgFIAPgHIAMgFIANgHIAPgIIAPgIIAPgHIAPgIIAKgEIAHgDIAZgFIAXgIIARgHIASgHIAPgHIAUgIIAXgIIAWgCIASgGIARgHIANgFIAUgCIAUgFIAigJIAPgEIAjgDIAPgCIAPgCIAFgDIAHgBIAAgCICyADIAMAFIARAGIANADIASAGIAMAIIAIAHIAPAHIAKAIIAHAIIAIAHIAPAIIAKAHIAHAHIAIAIIAFAIIAFAHIACAIIAFAHIADAHIACAIIADAIIACAHIADAIIACAHIADAHIAAAIIAAAIIAAAHIACAIIADAHIACAHIADAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIgDAHIgFAIIgCAHIgDAGIgCAGIACACIADAIIgDAHIgHAFIgFgBIgDAEIgCAHIgDAHIgFAIIgHAIIgIAHIgHAIIgIAHIgHAHIgPAQIgIAHIgPAPIgHAHIgKAIIgPAIIgIAHIgFAFIgFADIgMAEIgNAIIgMAIIgSAHIgWAHIgPAIIgQAHIgRAIIgWAIIgPAHIgKAFIgKACIgKAEIgPAEIgQAFIgWAFIgPAFIgbAFIgUAIIgMAFIgKACIglACIgFADIgKACIgKADIgZADIgFADIgKACIgKACIhTAAgADkAGIgmAFIgKAFIgUAFIgKAFIgRAFIgSAIIgPAHIgPAIIgWAHIgIAHIgHAIIgNAHIgMAIIgIAIIgPAIIgLAGIiUAIIgKAFIgUAFIgPAHIgKAIIgPAIIgKAHIgIAIIgCAHIgFAHIgFAIIgIAIIgFAHIgCAIIgDAHIgCAHIgCAIIAHACIARAGIANAEIAPAGIAMAFIAIAEIBYgCIAPgFIAggFIAPgFIAtgFIATgHIAIgGIAKgCIAjgFIAPgEIARgGIANgFIAZgFIAPgIIAHgEIAKgDIASgFIAPgIIAPgHIAJgFIADgDIAKgCIASgFIAPgHIAKgIIAHgFIADgCIAMgFIAKgIIAFgFIADgCIAMgGIAKgHIAIgHIAHgIIAIgIIAHgHIAIgIIAHgHIAIgHIAHgIIAFgIIADgGIgKgGIgNgHIgHgIIiFAAIgMAFgABOkKIgUAGIgKAAIgtACIgOAFIgeAFIgVAFIgWAFIgUAHIgPAGIgNACIgdAFIgSAIIgPAHIgSAIIgTAIIgSAHIgNAEIgKADIgWAFIgPAIIgPAHIgPAIIgPAHIgKAHIgIAIIgKAIIgPAEIgMAIIgPAHIgPAIIgKAIIgIAHIgHAHIgKAIIgFAHIgFAIIgIAIIgFAHIgCAHIgFAIIgDAHIgCAHIgFAIIAAAHIAAAHIACAIIAAAHIAFAIIADAIIACAHIAFAHIADAIIAFAHIAHAIIAFAIIADAHIAFAHIAHAIIAFAHIADAIIAHAIIAIAHIAHAHIALAIIAMAHIAHAIIAPAIIALAEIAMAGIARAFIANAEIAHAGIANAEIAGAEIAEgGIACgIIAAgHIADgIIAFgHIAHgHIAFgIIAFgIIAFgHIAFgIIAIgHIAHgHIAIgIIAPgIIAHgHIAIgIIARgHIAKgFIAVgFIAMgFICHgFIAKgEIAMgGIAHgIIANgHIAMgHIAIgIIAHgIIAFgFIAIgCIAUgFIAPgHIAHgGIAIgCIAOgEIANgFIAMgFIALgFIAUgFIAKgFIAogFQAFgBAEgCIABgCICHADIAKAHIAHAHIASAIIAKADIACgGIADgHIAFgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIgDgHIgFgHIgCgIIAAgIIAAgHIAAgIIAAgHIgDgHIgFgIIgCgIIAAgHIgDgIIgFgHIgCgHIgFgIIgIgHIgMgIIgNgIIgHgHIgIgHIgMgIIgNgHIgHgIIgSgHIgWgIIgNgFIi0AAIgHACgAnzDsIgWgIIgSgHIgKgHIgIgIIgHgHIgIgIIgHgIIgIgHIgKgHIgMgIIgIgHIgFgIIgFgIIgFgHIgHgHIgFgIIgFgHIAAgIIACgIIADgEIAHAAIAFAAIAFAHIADAHIAHAIIAFAHIAIAIIACAIIAIAHIAMAIIAKAHIAIAHIAHAIIAIAIIAHAHIAIAHIAKAIIAWAHIAPAGIAIACIAMACIANAGIACAHIgFAFIgKACIgPADIgRgFgAIwB0IADgHIAFgIIACgIIADgHIACgHIADgIIACgHIAFgIIADgIIAFgHIAHgHIAFgIIADgHIAFgIIAFgIIAFgGIACgHIADgIIACgHIAAgIIADgIIACgEIADgCIAFgBIACAAIAFAHIAAAIIAAAIIgCAHIgDAIIAAAHIgCAGIgDAIIgCAIIgFAHIgFAIIgDAHIgFAHIgHAIIgFAIIgDAHIgFAIIgCAHIgFAHIgIAIIgHAIIgNAHIgFAAgAnEAGIgFgGIAFgIIANgHIAKgGIAHgCIAZgCIA3gGIAIgEIAIgCIATgGIAKgFIAUgFIAKgFIAUgFIAKgFIAUgFIANgHIAKgGIAHgCIAagFIARgHIAKgGIAIgCIAZgFIAMgIIAKgHIAPgHIAhgIIAMgFIARgFIAMgFIAhgFIAKgFIAUgFIAKgFIAogFIAKgFIAogFIAKgFIAegFIAKgFIAvgFIAKgFIAXgFQAFgBAEgCIABgCIAZADIAHAHIADAHIgDAIIgHAIIgPAHIgKAFIghAFIgKAFIgyAFIgKAFIgeAFIgKAFIgoAFIgMAFIgmAFIgNAFIgRAGIgMAEIgjAFIgMAFIgRAGIgQADIgWAGIgKAIIgKAHIgKAFIgIACIgKADIgWAFIgPAHIgMAGIgLACIgWAFIgKAHIgKAGIgIACIgvAQIgeAKIgNAEIgRAEIgKACIgDAAIhSAAIgIADIgUAAg");
	this.shape_3.setTransform(108.725,34.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AmmC/IgRgFIgSgGIgCABIgDAAIg3gCIgRgFIgFgIIACgHIACgEIgHgEIgPgHIgFgIIADgHIAFgIIAWAAIAPAIIAKAFIADACIAgAFIAJADIABAAIAIgFIAHgDIAogFIAKgFIAUgFIAKgFIAIgCIAUgFIANgFIAbgKIAegKIAUgFIANgFIARgFIANgFIARgFIAPgIIAPgHIAPgIIAZgHIANgFIARgFIAegPIAegOIAZgNIAHgCIAZgFIARgIIAKgFIAIgCIAOgFIANgFIAUgFIANgFIARgFIANgFIAbgFIANgFIAZgFIAMgFIAmgFIAMgFIBOgFIAMgFIAogFIANgFIARgFIANgFIAPgFIAHgIIAIgHIAHgIIAIgHIAHgIIAPgHIAKgFIAFgDIAIAAIAFAAIAKAIIACAHIADAIIgDAHIgCAIIACAHIADAIIgDAHIgCAIIgFAHIgKAIIgIAHIgFAIIgCAHIgFAIIgIAHIgHAIIgKAHIgIAIIgMAIIgLAHIgMAIIgKAHIgHAHIgIAIIgPAGIgKAIIgKAHIgMAIIgFAHIgIAIIgMAFIgNAFIgKAHIgrAWIgvAXQgOAHgOAFIgOAGIgNAHIgMAFIgKADIgZAFIgPAFIgmAFIgMAFIgtAFIgPAFIgiAFIgPAFIgZAFIgPAFIgZAFIgPAFIk3gDgAHPhaIgKAFIgXAFIgKAFIgvAFIgKAFIhQAFIgNAFIglAFIgNAFIgbAFIgKAFIgeAFIgKAFIgUAFIgNAFIgZAFIgRAHIgSAHIgPAHIgZAIIgKAFIgQAFIgeAPIgfAOIgdALIgSAHIgIAFIgHADIgSAFIgPAHIgRAIIgPAHIgZAIIgKAFIgcAFIgMAFIgeAKIgaAIIDBACIApgFIAPgFIAZgFIAPgFIAZgFIAMgFIAlgFIAPgFIAlgFIANgFIAtgFIAPgFIAZgFIAKgHIAHgGIAIgCIARgFIAegPIAtgXIAcgPIAHgHIAPgIIAKgGIAKgIIAPgHIAIgIIAMgHIANgIIAFgHIAKgIIAHgHIAIgIIAHgHIAPgIIAHgFIgJADg");
	this.shape_4.setTransform(104.725,28.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("Ai8FZIgIgFIgWgFIgKgFIgegFIgKgFIg6gFIgMgFIgygFIgKgFIghgFIgHgFIgWgFIgNgHIgNgIIgHgIIgPgHIgKgHIgDgIIgEgHIgGgIIgCgIIgFgHIgDgHIgCgIIgFgHIgCgIIgDgIIgDgHIgEgHIgDgIIgDgHIgEgIIgDgIIAAgHIgDgHIgEgIIgDgHIgDgIIgEgIIgDgHIgFgHIgDgIIgEgHIgGgIIgCgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgHIAAgHIACgHIAGgIIACgHIAAgIIAAgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgIIACgHIAGgHIAFgIIACgHIAIgIIAHgIIAKgHIAHgHIANgGIAjgFIAMgEIA7ABIAGgHIA1AAIAIAGICOgDIAMgFIANgCIBLgGIAPgEIGNgGIAMgEIA6gGIAPgFIAlgEIANgGIBLgEIAMgEIABgCIAXADIABgFIAGgIIAKgCIAFAAIAHAIIADAHIACAHIACAIIADAHIAAAIIAAAIIAAAHIgDAHIgCAIIgFAHIAAABIAFgBIAAgCIACABIANAEIAAADIAAAHIAAAHIgDAIIgCAIIgCAHIAAACIgDADIgNAFIgCAAIgFAIIAAAHIAAAHIAAAIIAAAIIgCAHIAAAIIgGAHIgCAHIAAAIIAAAIIAAAHIgCAIIgDAHIgDAGIgCAIIAAAHIAAAIIAAAIIgCAHIgDAHIgFAIIAAAHIgCAIIgDAIIgFAHIAAAHIgCAIIgDAHIgIAIIAAAIIgEAHIgIAHIgFAIIgDAHIgEAIIgIAIIgFAHIgIAHIgJAKIACAFIADAIIAAAIIgCAEIgIAGIgNAHIAAAAIgXACIgFADIgOAHIgIAIIgKAIIgHAHIgQAHIgHAGIgMAEIgKAIIgGAFIgDACIgJADIgRAFIgNAFIgeAFIgMAFIgjAFIgNAFIgtAFIgPAFIglAFIgNAFIj8gFgAnth+IgMAEIgeAFIgNAIIgIAIIgCAHIgFAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIgDAHIgEAIIgDAHIAAAGIAAAIIAAAHIADAIIACAIIACAHIAGAHIAEAIIADAHIAFAIIADAIIAEAHIADAHIADAIIACAHIAAAIIACAIIADAHIADAHIAEAIIADAHIADAIIAEAIIAGAHIACAHIAAAIIAFAHIACAIIAGAIIAEAHIAKAHIAQAIIAPAHIARAJIAKAEIAeAFIAKAFIAyAFIAKAFIA8AFIAKAFIAeAFIAKAFIAbAFIAKAFIDrgFIANgFIAqgFIAPgFIAogFIANgFIAbgFIAMgFIAcgFIANgFIARgFIAPgIIADgCIjhACIgNAGIgoAEIgKAGIlMgGIgFgEIgogDIgogDIgWADIgKAAIgIgFIAAgHIAFgIIAHgIIAcgEIAogBIA1ABIAHAEIE2gEIAMgGIAqgEIANgGID6gHIANgFIAzgBIAGgGIAIgIIAHgIIAFgHIADgIIAHgHIAHgHIAGgIIAHgIIADgHIAEgIIADgHIADgHIAFgIIACgIIAAgHIACgIIAGgHIACgHIACgIIAGgIIACgHIAAgIIAAgHIAAgGIACgIIAGgIIACgHIAAgIIAAgHIAAgHIAAgIIACgIIAGgHIACgIIAAgHIAAgHIAAgIIAAgDIgIADIgUAFIgMAFIgRAGIgNAEIgcAFIgMAFIgZAFIgMAFIgzAFIgMAFIg5AFIgNAFIh/ADIgNAEIh0AGIgLAFInlgDIgWgFIgGgHIgCgIIAFgIIAKgEIAPgDIBXgBIAAABIANAAIADgCIF8gFIANgFIB0gGIANgEIB/gIIANgFIA5gFIAMgFIAtgFIANgFIAegFIAMgFIAcgFIAegKIAMgFIAfgKIAHgBIAAgEIAAgIIAAgHIAAgHIADgIIgKACIgLAGIhPAEIgNAGIgtAEIgMAFIgzAGIgMAEImXAGIgNAEIhDAAIgUADIgPAFIiIgCIgCACIgHAFIgKAAIgHgDIhdAGgArYgOIgFgHIAAgIIAAgHIAAgIIAAgIIACgHIAAgHIADgIIAAgHIADgIIACgIIACgHIAAgHIADgIIAAgHIAAgIIAAgIIADgHIACgHIAFgIIADgHIAEgIIADgIIAHgHIAIgHIARgHIAQgGIAHAAIAFAAIAHAHIAAAIIgCAIIgHAEIgIADIgPAFIgKAIIgDAHIgEAIIgDAHIgFAHIAAAIIAAAIIAAAHIgDAIIAAAHIgCAHIgCAIIgDAIIgFAHIgCAIIAAAHIgDAHIgFAIIAAAIIAAAHIgCAIIgGAHIgHAAgAK9izIAAgIIAAgHIAAgHIgCgIIAAgHIAAgIIAAgIIAAgHIgFgHIgFgIIgCgHIAAgIIgDgIIgKgHIgKgHIgIgIIgHgFIgKgCIgMgDIgegFIgLgIIgEgHIACgHIAFgIQAFgBAFgDIAAgBIAPACIANADIAMADIARAFIAQAHIAHAHIAKAIIAMAIIANAHIAFAIIACAHIADAHIADAIIACAIIADAHIAAAIIACAHIAAAHIAAAIIAAAIIgCAHIAAAIIgDAHIgCAHIgGAIIgKAFIgKgFg");
	this.shape_5.setTransform(98.35,18.05);

	this.instance_1 = new lib.CachedBmp_44();
	this.instance_1.setTransform(22.95,-7.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[]},1).to({state:[{t:this.instance_1}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.5,-29.7,211.5,122.5);


(lib.baile = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ApQesQAGgXAaACQC/gOAiisQBhngBQnnQAaiegGijIgXgZQgNADgNACIgYAGQgNAAgLgDQgYgDgWgJQgZgJgUgQQhNg4gshVQAAhQAGhQQABgXANgTQBEhiBJhfIhziaQi8CajLCFQjNCGBUjKQAVgyAtgjQCuiCCoiJQgag3gbg2QgUgmAEgpQAVjODlhCQAygPA1gFIABgDIAAgDQACgLgCgKQgCgWgIgUIgIgWQg2iCALiQIgSgIIAEgPQg6gfgqg0QkKlIEAkgQBEhLBigPQIRhNA8ImQAQCWhDCDQgeA7hBARQBVGcDCF9QDFGEloEEQAJAZAQATQD6EdhPGFQhbHEDHF4QAzBhBtAfQBbAaA+BCQAEATgOAKQiSBljMipQhuhbgoiHQhrlwBDmJQA8lbjEkPIgMguIgBgeIhDAxIihCKQATH7iIHrQghBzgIB5QgTEtkKBTQg6ASgmAAQheAAAfhvgABCp8QAZGilJE7QhVBRBRBEIBkBWIAMgIQFLiqC+k4QAphFgdhaQhEjWhcjOgAkWl6IBiBzQBvhyAKiWIABgXgAmlpyIApBxID+jFIguhFgAhYzIIhQAJQguD8DGCwQAUgOAUgQQAngfAtgTQAXgLAZgJIAagLIg5iVQgihXgKhbgAjt+9Qh6AlhIBpQgeD0CHDMQDCCOD2gvQDugUhJkQQgtinhpiDQhdh0iOAAQg9AAhGAVgAk8ywIABgFIACgFIAAAKgAhJ2WIgtAAIgIgBIgOgBIgIgDIgKgCIgIgDIgEgEIgCgDIgBgEIABgEIAAgEIAEgDIACgDIADgBIAFgBIADAAIAFABQAmADAlgDIAHgBIANgCIAegHIAdgIIAegHQASgEAQgGIAGgEIAHgEIADgDIAHgEIAIgEIAIgEIAEgDIADgEIAEgEIAFgEIABgDIADgEIACgEIAEgEIAEgDIAFgEIAEgEIADgEIAIgBIABgBIADAAIAGAEIABADIABAEIgBAEIgBAEIAAADIgDAEIAAAEIgCAEIgBADIgCAEIgBAEIgCAEIgCADIgCAEIgEAEIgCAEIgHADIgCAEIgDAEIgCAEIgFADIgJAEIgJAEIgIAEIgFADIgFAEQgbAKgbAHIgnAJIgeAIIgPAEIgLACIgPAAgAAr5/IgMgIIgIgHIgFgIIgCgHIgDgIIAAgHIgCgIIACgHIAAgIIADgHIAHgIIAFgHIAKgIIANgFQAHAAAHgBIABgBIAUAFIAMAHIAIAIIAFAHIAFAIIACAHIAAAIIAAAHIAAAIIgCAHIgDAIIgFAHIgHAIIgKAHIgKAFIgPADIgXgFgAji5/IgMgIIgIgHIgFgIIgCgHIgDgIIAAgHIgCgIIACgHIAAgIIADgHIAHgIIAFgHIAKgIIANgFQAHAAAHgBIABgBIAUAFIAMAHIAIAIIAFAHIAFAIIACAHIAAAIIAAAHIAAAIIgCAHIgDAIIgFAHIgHAIIgKAHIgKAFIgPADIgXgFgACZ7qIgEgHIgDgGIgCgHIgEgGIgEgGIgHgHIgGgGIgHgHIgJgGIgKgHIgHgEIgCgBIhQAAIgJABIgFgHIAAgGIgCgHIAEgGIAIgDIAAgBIBhACIALAGIANAHIALAGIAGAHIAHAGIAGAHIAHAGIAEAHIAEAGIACAHIACAGIgCAGIgCAHIgCAGIgEAHIgLAAgAk477IgEgHIAAgGIAAgHIAEgGIACgHIACgGIAHgHIAEgGIAGgHIAHgGIAJgHIANgGIAIgDIAAgBIBSACIAHAGIAGAHIACAGIgCAHIgCAEIgHACIgPgCIgEgEIg6ACIgPAGIgJAHIgGAGIgFAHIgGAGIgCAHIgHAGIgGAHIgLAAg");
	this.shape.setTransform(116.3575,207.2432);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AvkfnIAEgXQBlhOCPA0QCcsiC8sZQlkiuhylZQk4gpBjkWQARgwAygZQCJhDCBhQQB5kCBIkEQjIiDBEj7QAviyBiiWQCNjaETA1QHVBbikHJQhGDChvClQghAygEBCQgLC/hPCsQHqpgLWjJQAkgKgGAsQgQBlhyAWQiCAbhyBHQoLFHmrHCQCED2CZD/QBxC7hhC4IghAkIgoBFQCmGUhUG6QgbCOA0CMQBgEBEFBnQAiAOgoAJQjeAqiDjRQj8mVBynbQA3jqhnjcQh7gkhygyQgGgDgFgEQiHM1jDMkQhUAbhJAAQhuAAhVg8gAnjx1QACBOgaBLIgJAYIgKAdIgcBVQhcEMgoEbQgBAGgEAFIgHCWIAXAZQAlDEC3BmQC+BrDVATIATgXIAAgWQiklSjBlEQgXgmAOguQBslhCElYQhzAYh0gGIgmgDIgmgFgAuBkRIAIgCIBCjgIi/BwIgCAeQAUApApAXQAWAOAbAGIAEAAIAFAAgAnDzoIE8gQQDSh5AxjrQAThYgqhJQiMjzkiBSQkkBTAOFnIABAAQhHDhDiAbgAnv4CQCFCADAgWIAGARIgDABQhDAUg2AAQiVAAg6iQgAiT6HQgQgQAAgWQAAgXAQgQQAQgQAXAAQAWAAAQAQQAQAQAAAXQAAAWgQAQQgQAQgWAAQgXAAgQgQgAmr6HQgQgQAAgWQAAgXAQgQQAQgQAXAAQAWAAAQAQQAQAQAAAXQAAAWgQAQQgQAQgWAAQgXAAgQgQgAn87fIgHgVIAHgNQA5hSByATIAHAfIhhAAIhBBIgAgX7xQgYgrgzgDQghgFggAGIAFgZIBcgJQAZAKARARQASASAEAXIABALg");
	this.shape_1.setTransform(151.7818,205.8049);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},7).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.6,-2.5,240.4,417.3);


(lib.baiila = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgFEAgaQhcguBXg7QBlhEBrg1QBHi0AIi/QAVojg5ogQhZgbhLg0QjDiLg9jwQgoidATieQgpA/g0A4IgIAHQgRANgVALQgXAMgYABQgeADgTgVQgcjCBBi7QBSjsABj4QiFgahbhjQjBjSAIkaQACg8AnguQE0l2GdDFQBNAlAwBJQCmD+AIElQACBGg6AyQgUARgYAMIArB3QEJlHFUj5QBYhBBVhFIgwgqIAAgYIAJgIIAIgHIAJgDIAJgBIAKABIAIAEIAUANIAKAHIALAIIANAIIBtjyIAiAHQAIANgDARIgDAMIgDAMQgGASgIARIgQAkQgKAYgMAZIgZAvICahyIAaAIQADAPgFAOQgDAJgGAHQgJAPgOAJIgvAgQg0AngtAuIA/gDIBAAJQAGACAGADQAFACAEAEQAHAIAHAJIgGAQQgpAAgqgEIgdgDIgVgCQgWACgUAGQgdAHgegFQl4ECk2FMIh0B/QBGCPAxCcQBhE1DWD9QAnAugBBEQAAC9h/CNQADB2gJB2Qg3KUAFKTQAAAWAcAAQDoAACjB7QAYATgeAGQjeAnjphlQhjgsABhvQAGmMA3mHQAulJgUlMIgsALQgWAHgXAFIgXADIgXADIgwACQgbCEAZCHQBeH9hEIBQgZDCiRBqQg7AshKAQQgPAWgZALQgKADgJAAQgMAAgMgFgAi2v1IARAGIARAJIgIAIQgHAHgIAHQgIAGgKAEIgUAJIgLACQgvD4iaDMQg6F9DlEDQCoC/DxhbQDwhZhhjyQgthwhUhfQjEjfhEkqQgnirhBilIlkA7QA5DkA+DmQACAIgCAJQBXiHAwiXQACgIABgIIhIhAIAAgSIAYgOIAkAGIAChCIAhgVIAVAPIAAA+IAwhEIAMAGIgfBTIAKgEIAKgDIAKgBIAJAAgAqykuIAKAAICojMQgFishJifIAHgLIgJgLQhCEUggEZgAoWqrIABgBIgDgIIACAJgApf+8QjwA8hTDhQgcBKAfBOQBwEbEjBSQC0gDCjhHQCogegfilQgFgfgJgeIADgIQhklTkihyQgvgUgxAAQghAAghAJgAl+y+IgMgEIgMgEIgMgEIgMgGIgIgGIgGgGIgGgGIgEgGIgCgGIgEgGIgCgGIgEgGIgCgGIgCgGIgCgGIgCgGIgEgGIgCgGIgCgGIgEgGIgCgGIgCgGIAAgGIgCgGIAAgGIgCgGIAAgGIACgGIAAgGIAAgGIAAgGIAAgGIAAgMIAAgGIAAgGIAAgGIACgGIAAgGIAAgGIAAgGIAAgGIAAgMIAAgGIAAgGIAAgGIACgGIACgGIACgGIAEgGIACgGIAEgGIACgGIAEgGIgCgGIgCgEIAGgEIAKgEIAKgEIACAAIAGAAIAEgCIAMAAIAEAAIAKAAIAMAAIAIACIACAAIAKAEIAIAGIAGAGIAMAGIAKAGIAGAGIAGAGIAEAGIAGAGIAEAGIAEAGIACAGIAEAGIACAGIAEAGIACAGIACAGIACAGIACAGIACAGIACAGIAAAGIACAGIACAGIACAGIACAGIAEAGIACAGIAAAGIACAGIAAAGIAAAGIAAAGIAAAGIAAAMIAAAGIAAAGIAAAGIAAAGIgCAGIAAAGIgEAGIgCAGIgEAGIgEAGIgCAGIgEAGIgCAGIgEAGIgCAGIgEAGIgEAGIgKAGIgKAGIgIAGIgIAGIgOAEIgIACIgQAAgAmw36IgCACIgCAGIgEAGIgCAGIgEAGIgCAGIgEAGIACAGIAAAGIAAAGIAAAGIAAAGIAAAGIAAAGIAAAGIAAAGIACAGIAAAGIAAAGIAAAGIAAAGIAAAGIAAAGIAAAMIAAAMIACAGIAAAGIACAGIACAGIACAGIACAGIACAGIAEAGIACAGIACAGIACAGIACAGIACAGIAEAGIACAGIAEAGIAGAEIAGACIAMAEIAUAAIAIgGIAIgGIAIgGIACgGIAEgGIAEgGIAEgGIAGgGIAEgGIACgGIAAgGIAAgGIAAgGIAAgGIAAgGIAAgGIAAgMIAAgMIgEgGIgCgGIgCgGIgCgGIAAgGIgCgGIgCgGIgCgGIgCgGIgCgGIgCgGIgCgGIgEgGIgEgGIgEgGIgEgGIgEgGIgGgGIgGgGIgIgGIgIgGIgGgGIgMgEIgOgEIgGgEIgEAAgArT5NIgKgGIgGgGIgFgGIgEgHIgCgHIgFgHIABgHIgCgIIABgIIABgCIgOAKIgCgEIABgCIACgCIAHgGIgIAEIgGAHIgnAIIgHgGIAAgIIACgFIAGgFIAcgNIAIgHIASgKIAEgGIAGgFIA3gTIAIgGIAAgCIA2gLIAJAFIACAHIAAAIIgJAIIglAPIgJAHIgFACIAJAGIAGAFIAHAHIAFAGIACAHIACAHIACAIIgBAIIAAAIIgDAIIgGAJIgHAKIgJAIIgOAFIgWACIgOgEgAmh6qIgJgFIgHgGIgEgGIgFgHIgCgHIgEgHIAAgIIgCgHIABgIQACgFAEgEIACgJIADgEIgGACIgBABIgBAAIgmAKIgSgBIgHgFIABgJIAAgFIAHgEIAJgFICLgrIAGgGQAEgBACgDIAAgBIASgCIALAFIAFAHIgBAHIgHAKIgFAJIgJAIIgYAGIgRAAIgIACIAEACIAJAFIAHAGIAHAGIAEAHIACAHIACAHIACAHQgBAEABAEIgBAIIgDAJIgFAJIgIAKIgIAHIgOAGIgXABIgOgEg");
	this.shape.setTransform(54.1792,219.8901);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgFfAgCQgjhhB3ggQBRgVBDgtQB3mmgxm3QgjksAIktQhtgchQhKQjVjHgtkrQgNhYAThVQgnA7guA0QgbAdgkAQQgYAKgbgDQgRgEgNgLIgKgJQgKkOBVkHQAyiegBioQilgkhriDQjSj9BokaQAdhNBBg0QGEk0FIE8QAtAsAhAxQCbDpgKELQgBAuggAlQgeAigoATIArB3QD6k6FCjvQBohMBmhRIgwgqIAAgYIAJgJIAIgGIAJgEIAJgBIAKABIAJAEIAJAGIAVAPIAXAQIBtjyIAiAHQAIAOgCARQgEAYgKAXIgWAvIgXAwIgZAwICahyIAaAIQACAOgEAPQgFAPgLAIIg/AyQgzAmguAuIBBgDQAfAEAfAHQAJABAIAGQAHAEAFAGIAGAJIgGAQQgpABgqgFIgygGQghABggAFQgSAEgSABQlMDnkaEgQheBghbBiQBSDIBRDZQBODUCSCuQCWCzhzDXQghA9gzAzIgcF7QgrIzgMIzQgBBKBHAAQDmgBCZCEQARAOgaAEQjrAqjrh4QhYgtADhiQAOoQA9oNQAXjEgJjGIgsAMIgtAMIgvAGIgvABQgiC6AmC7QB6JgjeI0QgYA8hDAQQgvAKgtASQgVAdgiADIgNACQggAAgMgigAjNu1QhOD6h4DkQgPAbgFAkQgoEnCnDcQCiDXD8hBQEEhFg8kDQgUhYhChAQj3j0hLlbQgXhngghlIgGACIgGAAIgdgCIgGAAQgHACgFADQgEACgDAEIgBADIABABIABABIAEgBIALgEQAMgBALABQAMADALAHIAEAEIABApIgFAEQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgNgGgMgJIgCAAIgEACIgCABIgDABIAEANIgIgIgAqwknIAKAAICojMQgCishMifIAHgLIgJgLQhBEUghEZgAolxEQA5DkA+DlQACAJgCAJQBJh1Ayh/QAMgeAAgeIgqgrIgJgDQgDgBgDgCIgGgEIgDgDIgDgDIgDgIQgDgFAAgEQAAgIABgIIA/gEIgzghIA1AWIABg5IALgKIgGgUIAJAMIBFAKIgBAJIAhgGIAHAFIACAEIACADIAEAFIADAGIAEAJQACAGAAAIQABAFgCAFIgBAEIAUALQgVhCgahCgAoUqkIABgBIgDgHIACAIgAjMv7IARgHIgHgLgAj4wWIANAAIAAgOIgNAAgAn8/AQl2AhgvFEQgHAtARAtQBpEcEkBSQCyABClhLQCogegfilQgFgfgJgeIADgIQhklGkPiGQghgPgjAAIgQAAgAlR0FQi4gCAEiMQABgzAsgcQAugeA2gEQDwA9iDCiQgaAgguAAIgCAAgAnE28IgxA9QA1AuBFATQBJATA6gmIgLg9IhQhBIgjgBgArx6EIgPAEIAKgKIg1ATIgHgOIC9hZIALAMIg3AmQADAPALAJQAHAHgDAHQgXBAgZAAQgYAAgag+gAm07UQgGgPAGgTIguANIgSgBIgHgFIABgJIDEhBIAFAHQgCAQgMAKQgEAEgEACQgXALgagBQAuAUgYApQgXAogTAAQgWAAgSgxg");
	this.shape_1.setTransform(54.1946,218.602);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("EgFPAgVQhTg7BngzQBjgwA/hPQA5hIAMhjQBOp4hKp7QhXgbhLg1QjEiJg9jxQgoieATidQgjA1grAyIgPAQQgfAdgnANQgSAFgTgCQgRgDgNgMIgKgKQgTjbBIjQQBIjSAAjeQiVgehlhzQjQjtBEkaQAeh+BshLQFpj4ErELQA7A0ArBAQCdDpgMELQgCAugfAmQgdAhgpAUIArB3QDykuE2jnQB0hWBthcIgwgqIAAgYIAJgIIAJgHIAJgDIAJgBIAJABQAFABAEADQAKAGAJAIIAVAOIANAIIBtjyIAjAIQAIAPgDAPIgGAYQgGAYgMAYQgSAigRAlIgZAvICahyIAaAIQAEAPgFAPQgDAJgGAIQgOATgVANQg3AhgvAsIgfAeIA1ACIAcgBIAbgDIAMADIAVAIQAKAFAHAKIADAFIgFAVQgqAAgpgEIgygFQggAAggAEQgSAFgTACQlSDjkXEmIi5DEQBQCqA7C4QBTEAC2DOQBrB6gtCZQgkB6hZBcQgFCOgICNQgdIxhBIuQgNBqBJAvQA4AmBDgCQDMgFBWCLQAHALgVgEQjfAMjdhWQhlgnAChwQAGnJA7nHQAikKgNkOIgrANIgWAGIgXAEIgXADIgvAFIgZAAQgfCSAbCVQBYHtg2HyQgTC2iFBsQhEA3hYATQgYAhgcAAQgTAAgWgQgAjRu0QhQD4hrDoQgVAvgIA5QglEKCYDJQClDcEDhAQD5g+grj8QgRhhhJhHQjrjkhNlGQgch5gnh2IgFABIgHABIgdgCIgMAAQgEACgDACQgDADgCAEIgBAFIAWgFQAXgHARARQAIAHACANQACAMgHALIgDAGIgsgJIAHAMIgJgIgAq0kmIAKAAICpjMQgEithKidIAHgMIgKgLQhCEUggEZgAn7xMQgZAAgVAKQA5DjA+DmQACAIgBAKQBIh1A0h/QAMgdgCgfIgpgsIgJgDQgEAAgDgCIgFgFIgEgDIAAgCQgDgDgCgDQgDgGAAgGQgBgIACgHIA+gFIgyggIA0AVIACg4IAIgKIgEgUIAKALIBEALIAAAIIAggFIAbAxIgFAKIAVAMQgWhDgZhBQiYAxifAAgAoXqhIAAgCIgBgIIABAKgAk0v1IAAgBQgIAFAIgEgAjPv5IARgHIgHgLgAj8wVIANAAIAAgNIgNAAgAn7+8QleAbhNE0QgLAvARAyQBoEmErBUQCyABClhKQCogfgfilQgFgfgKgdIADgIQhklDkQiIQgdgPghAAIgQABgApG1nQBcitDkgdQDcBcjNCRQhQA5hLAAQhfAAhVhcgAoF2OIgIAFIgEAJQBkBkCEg8QA9gdAmg2QAAgPgBgOQgBgJgEgJQgFgMgIgKQgIgIgJgHIgbAAQiIAnh4BKgAsB6CIgPADIAKgKIg1ATIgHgOIC9hZIALANIg3AlQACAPAMAJQAIAGgDAIQgZBBgaAAQgYAAgYg+gAnP7eIALgWIguAMIgSAAIgHgGIABgIIDEhCIAFAHQgDAQgMALQgDADgEACQgXAMgagBQAYAKgEAUQgQBGgYAAQgWAAgdg8g");
	this.shape_2.setTransform(54.623,219.5239);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("EgFFAgcQhhg0Blg8QBhg8Bmg1QBNjWAGjiQANoAg1n/QhPgahFgtQjRiHg/j8QgoieATidQgnA8guAzIgIAIQgQAPgUAKIghANQgwAQgdgiQgTi/A+i2QBRjsAAj6Qh0gVhVhSQjsjkAjk4QAJhPA5g4QFkldF3EMQA6ApAoA8QCdDvADEVQAABHg4AxQgVARgYAMIArB3QD9k4E/jyIDOidIgwgqIAAgYIAJgIIAJgGIAIgEIAJgBIAKABIAIAEIAUANIAKAIIALAHIANAIIBtjyIAiAIQAJATgGAXIgDAMIgDAMQgFAMgGAMIgLAXIgQAkQgRAlgUAiICahyIAaAIQACAPgEAPQgDAJgGAHQgGAJgIAGQgcASgdAXQgzAmgtAuIBAgCIA/AIIAMAFIAIAHIAPAQIgGAQQgpABgqgFIgdgEIgVgBIgrADIgnAIIgTAAQitCBimCJQj7DOjUD1QBDCFAqCUQBcFEDkEAQAzA5gIBNQgQCwhzCGQAGBtgGBuQgaIThJIQQgXChBIBzQAUAhAogHQDogDB9CMQANAPgcAEQjMAHjKhJQi7hEAijXIAdjBQBTo0gKo7IgsAMIgtALIgXAEIgYACIgvACQgRBVAOBTQBbIeg0IjQgTDIiNB2QhDA4hYATQgQAVgYAKQgLAFgKAAQgLAAgLgGgAjQu6QhbEChrDyQgOAggFApQgnEnC2DMQDlEDEii5QBXg5AFhrQAKjOiyiVQhIg8gfhXQh1lYiJlRIlkA7QA3DkBADlQACAIgCAKQBjiOAkiiIgqgsIgEAAIgFgBIgGgEIgEgDIgCgCIgDgEIgDgDIgFgJIgCgJIAAgFIACgIIABgCIACgCIAZgFIAfAIIAAAAIABgBIAAAAIACgCIABgBIgzggIA1AWIAJhDIgDgUIAJALIBFALIgBAIIAhgFIAEACIADADIACADIACADIAEAGQADAEACAFQADAJABAKIAAAIIgCAGIAVAMIgFACIgHABIgdgCIgGAAIgOAFIgDADIgCADIAAACIACABQAQgGARAAQAOABAKAIQAGAFADAHQAFAOgEAQIgCAGIgEAEQgBABgBAAQAAAAgBAAQgBABAAgBQgBAAAAAAQgNgGgMgIIgCAAIgDABIgDABIgDACIgBACIAFALIgIgIgAqzksIAKAAICojMQgGigg/iWIgJgUIAHgMIgJgLQhBEVghEYgAoXqnIABgCIgCgIIABAKgAk0v7QABABAAgCQgKADAJgCgAjPv/IARgHIgHgLgAj7wbIANAAIAAgNIgNAAgAph+8QkVBCgwEFQgKA3AVA5QBrEdEjBQQCyABClhKQCmgfgdilQgFgegJgeIADgIQhmkzkBiJQg8gghBAAQgiAAgjAJgAm80LQizgSA6iNIAQgBICsjEIAggLQDjA/iKDUQg8BdhrAAIgVgBgAoR1zQgBACABAEQC4BpBOjDQAag/gug6Ig3gLQhzBghIB4gAry5/IgBgKQAbgjAugCQA4AkgqAyQgWAOgRAAQghAAgOg1gAmx6xQgQgQAAgVQAAgWAQgPQAPgQAWAAQAVAAAQAQQAPAPAAAWQAAAVgPAQQgQAPgVAAQgWAAgPgPgAtQ6nIAJgPQgFgwAUgrIAGgRIAkgXQA7gDAwAhIABABIgNAKIhqgIIgrB1gAo18HQAQhwBhgxIBQAiIAIATQgfAPgegTQgLgIgMgDQhEAugeBTg");
	this.shape_3.setTransform(53.388,221.3849);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("EgE0AgYQh+gqB7hGQBeg2A/hOQA6hIANhjQBOp3hLp8QhPgahEguQjpihg4kkQgYh8AUh8QgnA8guAzIgIAIQgQAPgUAKQgQAHgSAGQgxAQgcgiQgTibAxiTQBbkQAEkdQh0gVhVhSQjsjjAjk5QAHg8AogtQE5leGIDIQBcAvA4BaQCUDtAMERQADBMg9A0QgWATgaALIArB3QD9k4E/jyIDNidIgwgqIAAgYIAJgIIAJgGIAJgEIAIgBIAKABQAEABAEADQAKAGAKAIIALAHIAKAHIANAIIBtjyIAmAMQADAZgHAZIgIAYIgFAMIgRAiIgSAlIgUApIgKASICahyIAaAIQAEAPgFAPQgDAJgGAHQgHAJgIAGIg4ApQg0AmgtAuIBAgCIA/AKIAMAEQAFADADAEQAIAHAHAIIgGAQQgoABgrgFIgdgEIgVgBIgqADIgoAIIgTAAQklDHj8D4QiFCEh8CKQAwBgAZBuQBTFjEAELQBABDgFBiQgKCxh4CHQAGBtgIBuQguJ0gQJ1QgEChDJgWQC4gZBCB9QgQAfgigBQkWATjLibQgxglAGhAQA+rUAYrVIgsAMIgtALIgXAEIgXACIgwACQgPBVAOBTQBSICgmIHQgQDbiPCRQhCBEhgARQgTAbgbAAQgJAAgLgDgAjRu4QhwEDhND+QgRA2gHA8QgxGoFzCTQEFBnCFjvQBqi+iliYQj/juhLlbQgWhngghlIgFACIgHAAIgOABIgPgCQgKABgJAEQgDACgCAEIgBAEIAVgGQAUgEASAMQAJAGADAMQADAKgCAHIgBAHIgDAFIgEAGQgEABgBgBQgNgGgMgIIgDgBIgDACIgDABIgCACIgCACIAGALIgJgIgAq0kqIAKAAICpjMQgHishHieIAHgMIgKgLQhCEUggEZgAoExQIglAKQA3DkBADlQACAIgBAKQBWiHAuiYQADgIgBgJIgpgsIgEAAIgFgCIgHgDIgFgFIgEgDIgFgIQgDgFgBgGIAAgIIABgIIA/gFIgyggIA1AWIAJhDIgEgUIAKALIBEALIAAAIIAggFIAEACIADADIACAEIADACIAEAGIAFAJQADAGAAAGQABAIgBAHIgCAGIAVAMQgWhDgZhBQieAriiAGgAoXqlIAAgCIgCgIIACAKgAjPv9IARgHIgHgLgAj8wZIANAAIAAgNIgNAAgAn7/FQldAghME1QgNA0AVA5QBrEcEkBRQCyABClhKQC5gqg2i4IgJgeIADgIQhklFkOiIQghgSgnAAIgIABgApb14QgUgbAggOQCghHCog7QClBjjfBpQhPAlg/AAQhWAAg2hGgAoL2eIgGAJIgeALIgDAcQA0ADA1gKQB8gTBehPIAAgSIgsgHgAq341IgNgGIgIgGIgIgFIgEgGIgEgGIgEgGIgCgGIgCgGIAAgGIAAgGIAAgFIAAgGIACgGIACgGIABgCIAAgBIAEgEIADgFIAEgGIAIgGIAIgFIAJgEIAGgCIAGgBQANgEAPgBIgCABIADAGIABABIALAGIAIAFIAGAGIAEAGIAEAGIAEAGIACAGIAAAGIACAGIAAAFIAAAGIgCAGIgCAGIgCAGIgEAGIgEAGIgGAGIgIAFIgJAGIgKAEIAAABIgggBgAmd6yQgPgPAAgWQAAgVAPgQQAQgPAVAAQAWAAAPAPQAQAQAAAVQAAAWgQAPQgPAQgWAAQgVAAgQgQgAs86oIAKgOIAUhsIAkgYQA7gBAwAfIACACIgNAJIhrgIIgqB2gAog8IQAQhvBhgyQAvADAeAiQAGAHAEAJQgaANgZgOQgPgIgSgGQhDApgZBSg");
	this.shape_4.setTransform(52.1883,221.1928);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EgFBAghQhkgvBkg+QBcg5BHhLQA5g9ANhbQBYqChOqHQhWgchLg3Qjcijg3kXQgYh8ATh8QgZAoggAmQgRAUgUAUQgdAdgnANQgSAGgTgDQgRgDgOgMIgJgJQgRjWBEjLQBKjYgBjiQimgjhriDQjNj6BokPQBAioCrhOQFoijDlEbQDrEjg3FHQgMBFhCAgIArB3QDzktE1joQBzhWBvhbIgwgqIAAgYIAJgJQAEgDAFgCQAEgDAEgCIAJgBIAJABQAFACAEADIAUANIAVAOIANAJIBtjyIAiAHQAIAPgDAPIgFAYQgFAagNAXQgTAjgRAjQgLAYgNAYICahyIAaAIQADAOgFAPQgDAJgFAIQgPATgVANQg2AigvAsIgfAeIA1ABIAbAAIAcgDIAMACIAUAKQAKAFAHAIIADAFIgEAWQgqAAgpgFIgygEQgigBgfAGQgSAEgSABQlSDkkZEkQheBhhZBkQBRCtBCC5QBhESC4DnQBHBYgdBuQgkCKhdBqQgLCmgICmQgaIBg5H/QgQCOBeBCQA4AnBFgHQC+gNBLCCQAOAXgiABQjsAHjZhjQhZgoAChiQAKniA8nfQAfjzgMjzIi3AfQgdCEAZCHQBgIPhIIRQgmEakFAsQgVAggdAAQgOAAgQgHgAjPuvQhdEAhpDyQgNAegFAkQg2FuEKDNQEJDODfjtQBNhRgbhuQggiJhmhoQjLjRhGklQgdh5gnh2IgFACIgGAAIgdgCIgNABQgEABgCADQgEADgCAEIgBADIABABIACAAIAEgCQAOgCAPAAQAJAAAIAEQAHADAHAGIgDAtIgpgKIAEANIgIgIgAqykhIAKAAICojMQgCishMifIAHgLIgJgLQhBEUghEZgAn5xJQgaABgUAKQA4DkA/DmQACAIgCAJQBOh/A2iKQAHgUgEgTIgqgrIgJgDQgEgBgCgCIgGgEIgEgEIgCgDIgCgEIgDgGIgCgHIgBgHIADgHQABgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQALgEANgDIAfAJIABgBIAAgBIACgCIABAAIgzghIA1AWIAJhCIgDgVIAJAMIBFAKIgBAJIAhgGIADACIADAEIADADIACADIAFAFIAFAJIAEANQABAFgBAFIgDALIAUALQgWhCgZhCQiYAuieACgAoWqdIABgCIgDgHIACAJgAjOv1IARgHIgHgLgAj6wQIANAAIAAgOIgNAAgApf+wQlyBVBAFJQASBdA3BQQByClDKAzQCzABCkhLQCogfgfikQgFgfgJgeIADgIQhmlCkTh+Qg2gYg6AAQgfAAggAHgApa0wQgNhNA4g3IAQgOQBBgIA7AcQAUAJATABQAigtAggvQANgSAWgGQDuBNi3CAQhuBNhoAAQhUAAhQgygAoS2bIgpBPQDSAsCuhoIACgqIgNgYIg6ghIgWACQhQCnijhXQgEgCgDAAIgCAAgAsZ45IAKgOIAUhsIAkgYIBsAdIh3AEIglBygArB5HQgPgOAAgUQAAgUAPgPQAQgOAWAAQAWAAAQAOQAQAPAAAUQAAAUgQAOQgQAOgWAAQgWAAgQgOgAmO6YQgPgPAAgWQAAgVAPgQQAQgPAVAAQAWAAAPAPQAQAQAAAVQAAAWgQAPQgPAQgWAAQgVAAgQgQgAn/66QAqhnBtgXQAsAPAUApQAFAIABAKQgnAFgcgeQgHgIgJgFQhKAigwBEg");
	this.shape_5.setTransform(50.7331,219.0957);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},3).to({state:[{t:this.shape_5}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.7,10.3,212.60000000000002,419.3);


(lib.Símbolo1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_7
	this.instance = new lib.paraaas("synched",0);
	this.instance.setTransform(919.3,268.5,1,1,0,0,0,71.9,214);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(104).to({_off:false},0).to({startPosition:2},32).to({_off:true},1).wait(1));

	// Capa_6
	this.instance_1 = new lib.baile("synched",0);
	this.instance_1.setTransform(883.75,273.25,1,1,0,0,0,96.6,210.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(67).to({_off:false},0).to({_off:true},37).wait(34));

	// Capa_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ADYdxQhJrHgerJIiVgYQB3KUhZKgQgzF4logRQgbABAKggQAwieDBg9QANgFADgOQBJmgALmtQAHkog/kkQhqgghPhLQjHi/AvkRQjzhohui9QgPgaAegcQD5jsEfi+QABAAABAAQABgBAAAAQAAAAABgBQAAAAAAAAQAAgLgCgKIgCgKIgBgLIgBgLQgBgLgEgLQgEgKgGgIIgGgJIgvjnQlikfCbmtQAahJBGgmQHokMEAGvQAjA7AdBAQCcFbjiDuIAQBcIAFCmQF4CRCoE7QAJAPgXASIl1EcQArB4gMB/QgbEaj0BgQBcK6AvLEQAEA5AZA0QDvg4ACCsQABAxg4AGQgtAHgmAAQjzAAgbkDgAiqELQDEBiDUgxQBnh/AOigQACgdgHgcQguAtg8geQgpgXAPgtQAYhIA+g1Qj5lWB6mDQBSkEjiAFQiEACiCgGIAKBhQBsGPjIF9QgSAjgKAoQAGAPAQAHQAcALAFAfQACARgKARIgHAIQgPARgUAHQgQAFgQAAQgcEGDgBwgAqsmaIDkCAICbnKgAFOm3QAmA6AfBAIEQi8QiTh7imhrQgtgegqggQgyC8BtCqgAnx9VQg3GSFSDTIFdARQDugXgkjnQgqkPiojBQgcgigdgoQhMgQhIAAQjwAAizCygAjP2nIgDgeIGthOIATAKIADAXIgOAOQjOAbjMAkIgIAAQgIAAgIgCgAj64FIAGAAIgDAGgAkg6SQgNgPAAgUQAAgVANgOQANgPATAAQASAAAOAPQANAOAAAVQAAAUgNAPQgOAPgSAAQgTAAgNgPgAAS7AQgSgTAAgZQAAgaASgSQASgSAaAAQAZAAATASQASASAAAaQAAAZgSATQgTASgZAAQgaAAgSgSg");
	this.shape.setTransform(907.8619,270.3221);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(51).to({_off:false},0).to({_off:true},16).wait(71));

	// Capa_4
	this.instance_2 = new lib.parado("synched",0);
	this.instance_2.setTransform(904.05,272.2,1,1,0,0,0,85.4,208.7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(44).to({_off:false},0).to({_off:true},7).wait(87));

	// Capa_2
	this.instance_3 = new lib.personaandando("synched",0);
	this.instance_3.setTransform(119.45,245.55,1,1,0,0,0,80.5,182.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:928.4,startPosition:1},44).to({_off:true},1).wait(93));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1050.1,489.4);


(lib.Interpolación1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.telonderecha("synched",0);
	this.instance.setTransform(-0.05,0,1,1,0,0,0,277.4,363.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277.2,-306,558.5,669.5);


// stage content:
(lib.animacion201222 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {L:175,Uh:178,"L":181,Ah:182,"L":184,Ee:187,"Uh":192,"L":204,"Uh":205,M:208,"Uh":210,"L":214,"Ah":217,"L":222,"Ah":227,S:231,"Uh":233,"L":235,"M":237,"Uh":238,"L":244,"Ah":247,"M":250,"Ee":252,"L":254,"Uh":256,"M":259,"L":261,"Uh":262,"L":264,"Ah":266,"M":270,Oh:272,"L":274,"M":276,"Uh":278,"L":284,"Uh":288,F:290,Woo:292,"L":294,"M":296,"Oh":298,"M":301,"Uh":303,"L":305,"Ah":308,"M":313,"Uh":316,"L":320,"Uh":325,D:334,"Ee":336,"Uh":338,"D":341,"Uh":343,"M":348,"Uh":352,"L":355,"Uh":357,"M":360,"Woo":363,"Ee":367,"Uh":369,"D":371,"Oh":373,"D":381,"F":383,"S":385,"Uh":387,"Oh":394,"L":397,"Uh":399,"S":402,"L":404,"Ee":408,"D":409,"Uh":411,"S":421,"Uh":423,"L":425,"Uh":427,"Ee":431,"Ah":434,"L":444,"Ah":448,"D":452,"Uh":454,"M":457,"Uh":458,"Ee":462,"L":463,"Uh":468,"Ee":471,"S":474,"Ee":476,"Uh":478,"D":481,"Uh":482,"L":484,"Ee":487,"Uh":490,"S":494,"Ee":496,"S":507,"Uh":517,"L":520,"Ee":522,"S":529,"Oh":534,"Ah":538,"Woo":545,"Ee":547,"Oh":549,"S":551,"Woo":553,"Uh":556,"Ah":557,"Ee":566,"Uh":568,"L":571,"Ee":577,"L":581,"M":583,"Uh":585,"L":590,"Uh":592,"M":595,"Oh":598,"Ah":599,"M":601,"Oh":603,"D":605,"Woo":607,"M":610,"L":615,"Uh":620,"Oh":622,"M":630,"Oh":633,"M":637,"Uh":640,"Oh":642,"Ah":647,"L":651,"Uh":655,"Oh":658,"Woo":660,"Oh":665,"M":668,"Woo":670,"M":673,"Woo":688,"M":690,"Uh":691,"M":694,"Woo":695,"Ah":697,"Uh":703,"Ah":705,"L":715,"Uh":716,"Ee":720,"L":723,"M":725,"Uh":728,"M":733,"L":735,"M":736,"Ah":737,"Uh":738,"Ah":743,"Uh":744,"Oh":754,"Ah":758,"Ee":761,"L":764,"M":766,"Uh":768,"L":770,"Ah":772,"L":774,"M":776,"Ah":778,"Oh":784,"Uh":786,"L":798,"Uh":799,"D":801,"Uh":803,"L":810,"Ah":813,"L":815,"Uh":817,"M":820,"Uh":823,"L":830,"Ah":832,"L":835,"Uh":838,"L":844,"Uh":848,"L":850,"Ah":852,"L":854,"M":856,"Uh":857,"L":875,"Ah":877,"Ee":881,"L":884,"M":886,"Uh":888,"F":890,"Uh":892,"L":894,"M":896,"Ah":898,"M":901,"Uh":902,"Ah":906};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,175,1142];
	this.streamSoundSymbolsList[175] = [{id:"a",startFrame:175,endFrame:1024,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_175 = function() {
		var soundInstance = playSound("a",0);
		this.InsertIntoSoundStreamData(soundInstance,175,1024,1);
	}
	this.frame_1142 = function() {
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop();
		
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_2.on('click', function(){
		/*
		Mueve la cabeza lectora al número de fotograma especificado en la línea de tiempo y continúa la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		*/
		_this.gotoAndPlay(0);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(175).call(this.frame_175).wait(967).call(this.frame_1142).wait(2));

	// Actions
	this.button_2 = new lib.recrgar();
	this.button_2.name = "button_2";
	this.button_2.setTransform(865,533,1,1,0,0,0,59,59);
	this.button_2._off = true;
	new cjs.ButtonHelper(this.button_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_2).wait(1142).to({_off:false},0).wait(2));

	// Capa_4
	this.instance = new lib.cejasdss();
	this.instance.setTransform(544.3,102.6,1,1,0,0,0,52.4,25.4);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.cejasdss(), 3);

	this.instance_1 = new lib.boooooooca();
	this.instance_1.setTransform(565.5,166.7,1,1,0,0,0,24.9,20.1);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.boooooooca(), 3);

	this.instance_2 = new lib.CachedBmp_39();
	this.instance_2.setTransform(23.85,8.1,0.5,0.5);

	this.instance_3 = new lib.piernader();
	this.instance_3.setTransform(516.6,489.45,1,1,0,0,0,41.5,114);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 2, false, new lib.piernader(), 3);

	this.instance_4 = new lib.piernaiz();
	this.instance_4.setTransform(591.1,489.65,1,1,0,0,0,36.1,114.2);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 2, false, new lib.piernaiz(), 3);

	this.instance_5 = new lib.brazoder();
	this.instance_5.setTransform(500.2,290.85,1,1,0,0,0,44.4,94.1);
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.brazoder(), 3);

	this.instance_6 = new lib.brazoiz();
	this.instance_6.setTransform(629,267.95,1,1,0,0,0,54.4,79.2);
	new cjs.ButtonHelper(this.instance_6, 0, 1, 2, false, new lib.brazoiz(), 3);

	this.instance_7 = new lib.ojoos();
	this.instance_7.setTransform(559,132.3,1,1,0,0,0,46,28.4);
	new cjs.ButtonHelper(this.instance_7, 0, 1, 2, false, new lib.ojoos(), 3);

	this.instance_8 = new lib.CachedBmp_38();
	this.instance_8.setTransform(483.5,79.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1142).wait(2));

	// persona
	this.instance_9 = new lib.CachedBmp_41();
	this.instance_9.setTransform(121.05,103.9,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_40();
	this.instance_10.setTransform(23.35,67.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10},{t:this.instance_9}]},1142).wait(2));

	// Capa_2
	this.instance_11 = new lib.CachedBmp_42();
	this.instance_11.setTransform(-8.1,-11.35,0.5,0.5);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1142).to({_off:false},0).wait(2));

	// teloni
	this.instance_12 = new lib.teloni("synched",0);
	this.instance_12.setTransform(-284,318.3,1,1,0,0,0,277.3,355.4);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(175).to({_off:false},0).to({x:189.2},227).to({x:189.75},1).to({startPosition:0},227).to({_off:true},513).wait(1));

	// telond
	this.instance_13 = new lib.Interpolación1("synched",0);
	this.instance_13.setTransform(1247.4,324.05);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(175).to({_off:false},0).to({x:736.05,y:330.4},227).to({x:735.45},1).to({startPosition:0},227).to({_off:true},513).wait(1));

	// boca
	this.instance_14 = new lib.bocaa("single",2);
	this.instance_14.setTransform(504.7,355.15,1,1,0,0,0,88.1,25.1);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(175).to({_off:false},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(1).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:8},0).wait(5).to({startPosition:6},0).wait(12).to({startPosition:2},0).wait(1).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(4).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:2},0).wait(5).to({startPosition:1},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(6).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:7},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(6).to({startPosition:2},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(5).to({startPosition:7},0).wait(3).to({startPosition:6},0).wait(4).to({startPosition:2},0).wait(5).to({startPosition:6},0).wait(9).to({startPosition:4},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(5).to({startPosition:7},0).wait(4).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(3).to({startPosition:3},0).wait(4).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(8).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(7).to({startPosition:3},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:8},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(10).to({startPosition:11},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(4).to({startPosition:8},0).wait(3).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(4).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(4).to({startPosition:8},0).wait(1).to({startPosition:2},0).wait(5).to({startPosition:6},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:4},0).wait(1).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:6},0).wait(4).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(11).to({startPosition:11},0).wait(10).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:8},0).wait(7).to({startPosition:11},0).wait(5).to({startPosition:3},0).wait(4).to({startPosition:1},0).wait(7).to({startPosition:3},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:6},0).wait(1).to({startPosition:1},0).wait(9).to({startPosition:8},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(6).to({startPosition:8},0).wait(4).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(5).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(3).to({startPosition:3},0).wait(1).to({startPosition:1},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:7},0).wait(5).to({startPosition:2},0).wait(5).to({startPosition:6},0).wait(2).to({startPosition:3},0).wait(8).to({startPosition:7},0).wait(3).to({startPosition:3},0).wait(4).to({startPosition:7},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:3},0).wait(5).to({startPosition:1},0).wait(4).to({startPosition:2},0).wait(4).to({startPosition:6},0).wait(3).to({startPosition:3},0).wait(2).to({startPosition:3},0).wait(5).to({startPosition:3},0).wait(3).to({startPosition:7},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:7},0).wait(15).to({startPosition:3},0).wait(2).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:6},0).wait(2).to({startPosition:1},0).wait(10).to({startPosition:2},0).wait(1).to({startPosition:6},0).wait(4).to({startPosition:8},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(3).to({startPosition:6},0).wait(5).to({startPosition:7},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:6},0).wait(5).to({startPosition:1},0).wait(1).to({startPosition:6},0).wait(10).to({startPosition:3},0).wait(4).to({startPosition:1},0).wait(3).to({startPosition:8},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:1},0).wait(6).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(12).to({startPosition:2},0).wait(1).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(7).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:7},0).wait(3).to({startPosition:6},0).wait(7).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:6},0).wait(6).to({startPosition:2},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(18).to({startPosition:2},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:8},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(4).to({startPosition:1},0).to({_off:true},1).wait(237));

	// ojos
	this.instance_15 = new lib.ojos("synched",0);
	this.instance_15.setTransform(490,257.55,1,1,0,0,0,79.2,23.5);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(175).to({_off:false},0).to({_off:true},732).wait(237));

	// cejas
	this.instance_16 = new lib.cejasss("synched",0);
	this.instance_16.setTransform(486.05,196.85,1,1,0,0,0,107,24.8);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(175).to({_off:false},0).to({_off:true},732).wait(237));

	// cuerpo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ANMXHQgah4AMh9QgdgugDg0QgEhMgBhMQqTAQpzh9QgmgHgmgEQg0BjAIBuQADAxgiAkQAhJHA0JAQATDVhCDHImQgFIAKhbIgdBWQi1ALirgxQCCmyDomHQAfgzAtgrQhonKCUnBQARgzALg3Ql6injylFQjIkNg2lDQgHgsgPgrQgph0glh0QhHjhgZjsQgvnGCvmFQAVgvAeguQChj3D/iTQNbnvPaDEQJwB7FOIcQBvC1A0DRQBJEkBAEoICaK+QBoIMjbG/QhICViCBkQhCAzhOAYIjOBBQACFHCFEdQAgBEAYBHIBCAnQDnH2DKIFImigOIh2mDIAAGBQjrgYjfBIQAqqkiOqFgEgPYAolIAHgMIAMgpgA0Z91QhFA2gnBQQizFsB2GsQBWE5BEE9QEhJWJUE6QAbAOALAhQKPCbKlhYQBQgfBQAgIAHADQH9g3AUnYQAIi1AAi3QhLmrh4nDQhjlwiSlfQiNlRlNijQgVgKgOgXIhXgJIgaAOQkEgzj2AAQrxAApvHhgAAAj1IAAgEIAHAAIgDAIIAAAMIgCALIgCAEIAAgfgAY8mAIAFACIADAEIgIgGgAYXmNIgBgCIATAIIgSgGg");
	this.shape.setTransform(483.7449,371.1182);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(175).to({_off:false},0).to({_off:true},732).wait(237));

	// MICRO
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(6,1,1).p("AAA79MAAAA37");
	this.shape_1.setTransform(368.85,427.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#333333").ss(6,1,1).p("AiD79UAIQAIHgIQAv0");
	this.shape_2.setTransform(382.0754,427.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(6,1,1).p("A1/50UBYAgURhYABML");
	this.shape_3.setTransform(509.6995,414.1806);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#333333").ss(6,1,1).p("AiD79UAIOAGCgIOAx5");
	this.shape_4.setTransform(382.032,427.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#333333").ss(6,1,1).p("AhQ79UAFDAItgFDAvO");
	this.shape_5.setTransform(376.9372,427.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#333333").ss(6,1,1).p("AAp79UgCiAKmACiAtV");
	this.shape_6.setTransform(364.7696,427.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#333333").ss(6,1,1).p("AB079UgHQALdAHQAse");
	this.shape_7.setTransform(357.2093,427.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#333333").ss(6,1,1).p("AAt79UgC0ANPAC0Aqs");
	this.shape_8.setTransform(364.3002,427.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#333333").ss(6,1,1).p("AAP8LUgAvAqgAAcAIaQAEBPADA9QADArAJCJAADY7QASFigOj2QgJizAFBHg");
	this.shape_9.setTransform(367.3433,429.2602);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},955).to({state:[{t:this.shape_2}]},15).to({state:[{t:this.shape_3}]},4).to({state:[{t:this.shape_4}]},53).to({state:[{t:this.shape_5}]},27).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},2).wait(82));

	// añadir
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("Amjc0QlXioiLltQgHgUgLgRQgNgXgEgaQADGpilFPQgNAZgggRQgvgbgFg0QgNiEAMiHQBUvNE6uVQAahLA7g2QgyjgBPjaQkdibhbk5QgPg1gTgzQhykyB1ktQA3iQCDhMQKrmNINIDQBVBTAmBwQCeHLhKHVQgaCpipA3QggAMggAKQgDCVA9B5QAPAeALAfIAdARQHmOSD5PkIBeF8QAaBrgsBYQgsBWhHhDQh8h1gVi7QhSrfk1qcQh3kBhXkLQhCJYE0IFQAYApAQArQBMDKhZDHQhxD/jsCVQgXDaALDdIiXgHQgGjKA4i6QjOAJjIg1IAiGuIisA3QgikNAikRgAoor9IgCABQgdFfATFlQAHBxgbBxQhdGKguGOQguGQFPDjQEIC1E9hQQCIgjBYh5QBziehRisQihlYhVlxQgnipgDisQgHmug8mpQjbgNjYguQgrgIgrAAQgoAAgpAHgAs2GWIAIgNIAAgMgArrAYIgZCbIAiijgAu092QhmKkI8FYQEcBZEzgzQF1ABg+mRQhDmsjZlvQgjg8hAgoQgXgOgOgWIglgEIgLAGQh/gbh1AAQmBAAkTEqgAlAyAQgZgDgZgGQgIgCgHgEIgNgFIgVgJQgGgCgFgDIgDgCIgIgDIgJgEIgDgCIgDgBIgBgCIgDgBIgIgEIgIgEIgEgCIgCgCIgDgBIgGgDIgEgCIgCgCIgDgBIgBgCIgDgBIgBgBIgCgBIgCgCIgCgBIgCgCIgBAAIgBgBIgCAAIgCgBIgDgBIgCgBIgBgBIAAgCIAAgBIAAgBIABgCIAEAAIABAAIACAAIACAAIACABIACAAIACABIADABIABABIACAAIACACIACABIABABIABAAIACABIACACIADABIACABIACABIACABIADABIAEACIACABIAhAQIAgAOIAaALIAGACIAMAEIAGABIAKACIAEABQAuAGAugCIACAAQAQABAPgDIANgBQAbgEAagHIAkgKQAZgHAXgKQAagLAYgNIAOgIIAMgIIAQgLIAMgIIAKgGIADgCIAEgCIAFgEIAGgEIABgCIACgBIACgBIACgCIACgBIACgBIABgCIACgBIACgBIACgCIABgBIAEgDIACgBIABgBIACgCIABgBIABgBIACgCIACgBIACgBIABgCIACgBIABgBIACgCIACgBIABgBIACgCIAEAAIAAgBIADABIACACIABABIABABIABACIAAABIAAABIAAACIAAABIgBABIgBACIgBABIgBABIgCACIgBABIgBABIgCACIgBABIgDABIgBACIgCABIgBABIgBACIgCABIgBABIgDADIgBABIgCACIgCABIgCABIgCACIgBABIgCABIgCACIgCABIgEADIgCABIgBABIgCACIgCABIgEADIgDACIgCACIgBABIgGAEIgKAHIgKAGIgGAEIgCACQgSAMgSAKQgSAKgTAJQgVAJgVAIIgLADQgXAHgXAGQgWAFgWAEQgnAHgmAAQgaAAgZgDgAox49IgPgHIgKgIIgIgHIgFgIIgFgHIgCgIIgDgHIAAgIIgCgHIACgIIAAgHIAAgIIADgHIAFgIIACgHIAIgIIAHgHIAKgIIANgFIAHgCQAJAAAIgCIABgBIAZAFIAPAIIAKAHIAHAIIADAHIAFAIIACAHIADAIIACAHIAAAIIAAAHIAAAIIgCAHIgDAIIgCAHIgFAIIgFAHIgIAIIgMAHIgKAFIgIADIgRACIgZgFgAgL5RIgPgHIgKgIIgIgHIgFgIIgFgHIgCgIIgDgHIAAgIIgCgHIACgIIAAgHIAAgIIADgHIAFgIIACgHIAIgIIAHgHIAKgIIANgFIAHgCQAIAAAJgCIAAgBIAZAFIAPAIIAKAHIAHAIIADAHIAFAIIACAHIADAIIACAHIAAAIIAAAHIAAAIIgCAHIgDAIIgCAHIgFAIIgFAHIgIAIIgMAHIgKAFIgIADIgRACIgYgFgAC97vIgJgNIgEgNIgEgMIgIgNIgJgMIgMgNIgNgNIgMgMIgSgNIgUgNIgNgIQgCgCgCAAQhNAAhNABIgVABIgJgMIAAgNIgEgMIAJgNIAPgGIABgCIC8AEIAVALIAZAOIAVAMIANANIAMANIANAMIANANIAIAMIAIANIAFANIAEAMIgEANIgFAMIgEANIgIANIgVAAgArN8RIgIgNIAAgMIAAgNIAIgMIAFgNIAEgNIAMgMIAJgNIAMgMIANgNIARgMIAZgNIAQgGIABgCICfAEIANAMIAMANIAFAMIgFANIgEAIIgMAFIgegFIgIgIIhyAEIgdANIgRAMIgMANIgJANIgMAMIgEANIgNAMIgNANIgVAAg");
	this.shape_10.setTransform(686.9345,410.8012);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("EATvAncQlrtPkztkQhYOaHXMZIk4AEQmjqiAxsYQATkvgkkpQgDgYgGgbQgXhdgIhgQgKhzgYhwQgJgoADgrQm/gDm1hLQhAHQA7HaQATCRgZCQQhhIriSIgQgiB9ADCDIABBDIohAAQB/vNFSuNQAphtBRhQQhElJBxk9Qpxmdg6sHQgTj/Avj7QAGgeAQgaQCWj1D5iEQEMiOEtgXQFHgcE+BGQCYAiCBBYQEfDFBOFSQBhGgBYGmQBKFhibEhQhEB+iFBDQhIAkhQAOQgFDXBcC3QAVAqAQAvIArAZQHeQdG0QyQibgYicANgAxAYcIAMgTIAAgSgAvRPpIglDlQAJgTAEgTQAVhlAQhmgAuaNTIAHgLIAAgSgAzk8kQggAjgDA4QgnI5FFHKQBvCeCwBYQBbAuAwBUQGpBnG4g7QHyARggn2QgUkthbkvQhQkGhmj3QhdjijZhyQgNgIgKgOIg4gGIgJAGQiqgiieAAQpGAAmXHIgAoJsbQh6gihmhIQFeDDF+iBQDPhGCoiRIANAWQkdEOlYAAQiBAAiKglgAgJ19QgqgqAAg8QAAg8AqgqQApgqA8AAQA8AAAqAqQArAqAAA8QAAA8grAqQgqArg8AAQg8AAgpgrgAsB2vQgqgqAAg8QAAg8AqgqQAqgqA8AAQA8AAAqAqQArAqAAA8QAAA8grAqQgqArg8AAQg8AAgqgrgAGS5yQgWg2gmgtQgzg9hHgpIkGADIgSg3IAMgTIAYgMQE4g2CjDwQAHALAGANIgfBKgAul6kIgLgSQAAgTAFgRQAbhWBJg2QAjgYAngQIDrAGIArA3IgMAfIg+AAIgNgMQhNAKhOAQQhwAWg9BqgABO77IAUgFIATAFg");
	this.shape_11.setTransform(628.8786,386.4852);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("EAXiAq+IholXIAAFXInKAJQAQqrh2qWQgijBgPjFQqKAVpmh3QgwgKgygMQg2BoAGB2QACAqgdAeQA0J3AZJzQAFB/gPCBIgNASImgAAIAKg5IgZA5IltAoQB6oWFFmyQhvoDC3nyQprk1jUqdIhVkIQgwiTgriXQgQg5gMg6IgGgjQgpkUAGkZQAJoHGyk8QKyn1NSAXQE3AJElBaQIfCmEMHtQBsDHBCDUQAlB2AbB1QB0HuBkHzQABAHAFAGQBiIKjYHBQhOCjicBkQiPBcisAiIAABWQA9CVgLCpQgDApAMAqQBnBvAdCZIBCAnQDkHiC6H2QjNgqjQATgEgPYApNIAHgMIAMgpgA0F9aQhWBBg3BgQhlCwANDTQAgIKCiHzQEiJXJTE5QAaAOAMAhQKOCaKmhXQBRghBPAiIAHADQIihBgGoIQgDjHAAjHIgHgKQiJn6iEn2QhCj6hijtQiJlMlHifQgagMgTgeIhXgJIgaAOQkCgzj0AAQrlAAprHUgAoOlCQgQgMgRgKQFfChGZAKQEPAQD4huQEYh7DujHIAXASQlaF2oJBYQhuAThrAAQl4AAlHjogAH9wRQg9g+AAhXQAAhXA9g9QA+g9BXAAQBXAAA9A9QA9A9AABXQAABXg9A+Qg9A9hXAAQhXAAg+g9gAqoxDQg9g+AAhXQAAhXA9g9QA9g9BXAAQBXAAA9A9QA+A9AABXQAABXg+A+Qg9A9hXAAQhXAAg9g9gARU1jQgSgmgUgiQhYiYibhVImVAEIgbhVIA4gwQH5hfDuGPIAJATIgwBzgAuz2wIgSgdQAAgcAIgaQAahRA5hAQBNhXBrguIFqAJIBDBVIgTAwQgPAFgOAAQghAAghgFIgUgSQidgDiKA7QiEA2hOB/g");
	this.shape_12.setTransform(485.3489,368.7224);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("ATYEIIholWIAAFWInJAJQAGkWgQkTIBFAAQB3AAB3AEQDoAHDnATQBxEJBlEQQjNgqjQATgA2qkeIJeACIALD/QAFB+gPCBIgNASImfAAIAJg5IgZA5IltAoQBFksCFkOgAziCXIAHgMIAMgpg");
	this.shape_13.setTransform(511.9,617.3125);

	this.instance_17 = new lib.baiila("synched",0);
	this.instance_17.setTransform(550.45,338.75,1.2763,1.2763,0,0,0,71.9,214);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#333333").ss(6,1,1).p("AAAczIAAh2MAAAg2EIAAhr");
	this.shape_14.setTransform(368.85,422.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("AgRCuIgDgBQgLgCgJgDIgRgHQgTgKgRgRIgBgCIgCgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgCgBIgBgCIgBgCIgBgBIgBgBIgBgCIgBgBIgBgCIgBgCIgBgCIgCgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIAAgCIgBgCIgBgCIgBgCIgBgBIgBgCIAAgCIgBgCIgBgCIgBgBIAAgCIgBgCIAAgCIgBgCIgBgBIAAgCIgBgCIAAgCIgBgCIAAgCIgBgBIAAgCIgBgCIAAgCIgBgCIAAgBIAAgCIgBgCIAAgCIAAgCIgBgBIAAgCIAAgCIgBgCIAAgCIAAgBIAAgCIAAgCIgBgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIgBgCIABAAIAAgCIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAAAIABgCIAAgCIAAgCIAAgCIABgBIAAgCIAAgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIABgCIAAgBIABgCIAAgCIABgCIAAgCIABgBIABgCIAAgCIABgCIABgCIAAgBIABgCIABgCIABgCIAAgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIACgCIABgBIABgCIABgCIACgCIABgCIACgBIABgCIACgCIABgCIACgCIACgBIABgCIACgCIACgCIAGgFQALgKAMgHIARgIIALgEQARgEAQAAIAAAAIAUABQALACAKAEIATAIQAKAGAJAHIAPANIABABIACACIACACIABACIACACIABABIACACIABACIACACIABACIABABIACACIABACIABACIABACIABABIABACIACACIABACIABACIABABIABACIABACIABACIAAACIABABIABACIABACIABACIABACIAAABIABACIABACIAAACIABACIABACIAAABIABACIABACIAAACIABACIAAABIABACIAAACIABACIABADIABAEIAAACIABACIAAABIAAACIABACIAAACIAAACIABABIAAACIAAACIAAACIABACIAAABIAAACIAAACIAAACIAAACIABABIAAACIAAACIAAACIAAACIAAACIAAABIAAADIAAAEIAAADIAAACIAAACIAAACIgBABIAAACIAAACIAAACIAAACIgBABIAAACIAAACIAAACIgBACIAAABIAAACIAAACIgBACIAAACIgBABIAAACIAAACIgBACIAAACIgBABIAAACIgBACIAAACIgBACIAAABIgBACIAAACIgBACIgBACIAAACIgBABIgBACIAAACIgBACIgBACIgBABIAAACIgBACIgBACIgBACIgBABIgBACIgBACIgBACIgBACIgBABIgBACIgBACIgBACIgBACIgBABIgBACIgCACIgBACIgBACIgBABIgCACIgBACIgCACIgBACIgCABIgBACIgCACIgCACIgBACIgBABIgBABIgCABIgCACIgCACIgEAEIgFADIgCACQgPALgRAGQgLAFgNACQgKACgKAAIgRgBg");
	this.shape_15.setTransform(387.425,223.0192);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AE6fWIgUAAIlPAAIgggJIgUgGIgYAFQgwACgwACIiEAAIgkgKIgcgIIgYgGIgYgJIgUgOIgMgPIgIgOIgIgPIAAgOIgEgOIAAgPIAAgOIAEgPIAAgPIAIgOIAIgPIAMgNIAMgPIAQgPIAQgKIAYgDIAggGIAIgEQAMAAALgDIABgDICMAAIAgAKICzAEIACAAIAGAAIAAB2IAAh2IAYAAQCAABCAAAIAgAFIAYAFIBIAAIAgAJIATAPIANALIAEADIAIAPIAEAOIAEAPIAEAOIAAAOIAAAPIgEAOIgEAPIgEAOIgIAOIgEAEIgMALIgIAOIgIAPIgQAOIgQAKIgUAEIhAAFIgMABIgQAAgAAObHIAAAAgAiA6GIgDgBIgDgCIgDgCIgFgEIgCgBIgCgCIgCgCIgBgCIgCgCIgBgBIgCgCIgCgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIgCgCIgBgBIgBgCIAAgCIgBgCIgBgCIAAgCIAAgBIgBgCIgBgCIAAgCIAAgCIgBgBIAAgCIgBgCIAAgCIgBgCIAAgBIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIgBgCIAAgCIABgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIABgCIAAgCIABgCIAAgBIABgCIAAgCIAAgCIABgCIAAgBIABgCIAAgCIABgCIAAgBIABgCIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIACgCIABgCIACgCIABgBIABgCIACgCIACgCIACgCIACgBIAGgGIAKgJIAKgJIAQgNIATgPIAGgGIACgCIABgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIADgCIABgCIACgBIABgCIACgCIACgCIACgCIAEgDIAGgGIAFgDIAFgEIAHgFIAGgGIACgBIACgCIABgDIACgBIACgCIABgBIACgCIABgDIACgBIACgCIACgCIACgBIABgDIADgBIACgCIACgCIABgBIACgDIACgBIADgCIABgCIACgBIACgDIACgBIACgCIADgCIABgBIACgDIACgCIACgBIABgCIACgBIAHgGIAAABIAAACIAAADIgBABIAAACIAAABIAAACIAAADIAAABIAAACIAAACIAAABIAAADIAAABIAAACIAAACIAAABIAAADIAAABIAAACIABACIAAABIAAADIAAABIAAACIAAACIAAABIAAADIABACIAAABIAAACIABABIAAADIAAACIABABIAAACIAAABIABADIAAACIABABIABACIAAABIABADIAAACIABABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIABACIABABIABACIABACIAAACIABACIABABIABACIAAACIABACIABACIABABIACACIABACIABACIABACIABACIABABIABACIABACIACACIAAAAIABABIACACIAAACIACACIABACIACABIACACIABACIABACIACACIACABIACACQAQARAUAKIgBAAIgGAGIgGADIgEAEIgFADIgDAEIgCACIgHAFIgLAJIgMAJIgSANQgKAHgLAFIgCACIgDACIgCACIgEAEIgDABIgCACIgCACIgCACIgCABIgCACIgCACIgEAEIgDABIAAhrIAABrIgCACIgCACIgCACIgCACIgQAMQgNALgPAJQgVAOgXAHQgJACgIAAQgPAAgOgHg");
	this.shape_16.setTransform(367.4,421.5);

	this.instance_18 = new lib.PERSONAA("synched",0);
	this.instance_18.setTransform(554.5,351,1,1,0,0,0,86.9,258.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AE6fVIljAAIgggJIgUgFIgYAFQgwACgwABIiEACIgkgLIgcgIIgYgFIgYgKIgUgPIgMgOIgIgPIgIgOIAAgOIgEgPIAAgOIAAgPIAEgOIAAgOIAIgPIAIgOIAMgPIAMgOIAQgOIAQgKIAYgFIAggFIAIgFQAMABAMgDIAAgCICMAAIAgAJICzADIACAAIAHAAIAXAAIAPABIDxABIAgAGIAYADIBIAAIAgAKIAUAPIAQAOIAIAOIAEAPIAEAOIAEAPIAAAPIAAANIgEAPIgEAOIgEAPIgIAPIgQAOIgIAPIgIAOIgQAOIgQAKIgUAFIhAAEIgMAAIgQAAgAiA6FIgDgCIgDgCIgDgCIgFgDIgCgCIgCgCIgCgCIgCgBIgBgCIgCgCIgBgCIgBgCIgCgBIgBgCIgCgCIgBgCIgBgCIAAgBIgBgCIgBgCIgBgCIgBgCIgBgBIgBgCIAAgDIgBgBIgBgCIAAgBIgBgCIAAgDIAAgBIAAgCIgBgBIAAgCIAAgDIAAgBIgBgCIAAgBIAAgCIAAgDIAAgBIAAgCIAAgCIAAgBIAAgDIAAgBIAAgCIAAgCIAAgBIAAgDIABgBIAAgCIAAgCIAAgBIABgDIAAgBIAAgCIAAgCIABgBIAAgDIABgCIABgBIAAgCIABgBIAAgDIACgCIABgBIAAgCIABgBIABgDIABgCIABgBIABgCIABgBIABgDIABgCIACgBIABgCIABgBIABgDIACgCIACgBIACgCIABgCIACgCIABgCIAGgFIAKgJIAKgJIARgNIASgQIAHgFIABgCIACgCIABgCIADgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIABgCIADgCIACgBIABgCIACgCIAEgEIAGgFIAFgDIAFgEIAHgGIAGgFIACgCIABgCIACgBIADgCIABgCIABgCIABgCIACgBIACgCIACgCIABgCIACgCIACgBIADgCIACgCIABgCIACgBIADgCIACgCIABgCIACgCIACgCIACgBIACgCIACgCIACgCIADgCIABgBIACgCIACgCIABgCIADgCIAFgFIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIgBACIABABIAAACIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAABIABACIAAACIAAACIAAACIAAABIABACIAAACIAAACIABACIAAABIABACIAAACIABACIAAACIAAABIABACIAAACIABACIAAACIAAACIABABIAAACIABACIAAACIABABIABACIAAACIABACIABACIABABIAAACIABACIABACIAAACIABABIABACIABACIABACIAAACIACABIABACIABACIABACIABACIAAACIACABIABACIABACIABACIACABIABACIAAABIABABIABACIABACIACABIACACIABACIABACIACACIABABIACACIACACIACACQAQARAUAKIgBAAIgHAFIgEAFIgFADIgEADIgFAEIgBACIgHAGIgLAJIgLAIIgTANIgPAJIgGADIgDADIgBABIgDACIgEADIgCADIgDACIgDABIgBACIgCABIgCADIgCACIgEADIgCABIgDADIgCACIgCABIgCACIgQAMQgOALgOAKQgUAOgYAFQgJADgIAAQgPAAgOgGg");
	this.shape_17.setTransform(366.8,424.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#666666").s().p("AgRCuIgDgBQgLgCgJgDIgRgHQgTgKgRgRIgBgCIgCgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgCgBIgBgCIgBgCIgBgBIgBgBIgBgCIgBgBIgBgCIgBgCIgBgCIgCgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIAAgCIgBgCIgBgCIgBgCIgBgBIgBgCIAAgCIgBgCIgBgCIgBgBIAAgCIgBgCIAAgCIgBgCIgBgBIAAgCIgBgCIAAgCIgBgCIAAgCIgBgBIAAgCIgBgCIAAgCIgBgCIAAgBIAAgCIgBgCIAAgCIAAgCIgBgBIAAgCIAAgCIgBgCIAAgCIAAgBIAAgCIAAgCIgBgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIgBgCIABAAIAAgCIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAAAIABgCIAAgCIAAgCIAAgCIABgBIAAgCIAAgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIABgCIAAgBIABgCIAAgCIABgCIAAgCIABgBIABgCIAAgCIABgCIABgCIAAgBIABgCIABgCIABgCIAAgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIACgCIABgBIABgCIABgCIAAAAIACgCIABgCIACgBIABgCIACgCIABgCIACgCIACgBIABgCIACgCIACgCIAGgFQALgKAMgHIARgIIALgEQARgEAQAAIAAAAIAUABQALACAKAEIATAIQAKAGAJAHIAQAOIACACIACACIABACIACACIABABIACACIABACIACACIABABIAAABIABABIACACIABACIABACIABACIABABIABACIACACIABACIABACIABABIABACIABACIABACIAAACIABABIABACIABACIABACIABACIAAABIABACIABACIAAACIABACIABACIAAABIABACIABACIAAACIABACIAAABIABACIAAACIABACIABADIABAEIAAACIABACIAAABIAAACIABACIAAACIAAACIABABIAAACIAAACIAAACIABACIAAABIAAACIAAACIAAACIAAACIABABIAAACIAAACIAAACIAAACIAAACIAAABIAAADIAAAEIAAADIAAACIAAACIAAACIgBABIAAACIAAACIAAACIAAACIgBABIAAACIAAACIAAACIgBACIAAABIAAACIAAACIgBACIAAACIgBABIAAACIAAACIgBACIAAACIgBABIAAACIgBACIAAACIgBACIAAABIgBACIAAACIgBACIgBACIAAACIgBABIgBACIAAACIgBACIgBACIgBABIAAACIgBACIgBACIgBACIgBABIgBACIgBACIgBACIgBACIgBABIgBACIgBACIgBACIgBACIgBABIgBACIgCACIgBACIgBACIgBABIgCACIgBACIgCACIgBACIgCABIgBACIgCACIgCACIgBACIgCACIgCABIgCACIgCACIgEAEIgFADIgCACQgPALgRAGQgLAFgNACQgKACgKAAIgRgBg");
	this.shape_18.setTransform(386.825,225.6692);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("EgORAphQiWgXiNg2QiohBCVh6QAlgeAygOQGrgbGTBeQAHADAGAGQEhhsAckSQBMrmBwriIAhjdQj8iShHkjQgKgpAOgnQBvksAZk2QAQjIgDjLQjSGxhrHTQg8EHAJENIgwALIgOgKQgxoqD7n5QCvljBKl2QjFh8hajfQjCnjGpjcQEricEwCYQELCFAtE2QAeDMgEDSQgFDajOAnQCzC4CzDRQDgEFhPFbQg0Djh7C/QgXAigeAdQgFAvgNAkQhODSi8BwQgGHEg2HDQg2HMAkHJQDgBSDyA7QCXAmiPApQg1APg5gEQj4gHi0iOQhdhJAIiBQA3s2BVsvQAAgCACgCIADgbIhcgEQg7gGg6gLQg7gLg2gaQh3J4gPJ7QgJFwifE2QgkBFg/AyQhrBTh2AXQgHABgHgEQi5CAj/AAQhbAAhjgQgACrvfQADCugqCqIAEALQj6IbHVE1QBvBJCHgRQFkg1hjlfQghh3gyh0QihlvAfmaQAKh9gVh/QgCgNgEgNIASgcIgFgLQjkgPjag+QgcEPAEEYgAMysxQADEeCUD8QATAfAQAhQDzlaiYmLQgZhAgxgxQh1h2hyh5gEgBUgjVQgbBDAMBLQBaIoJGgIQBvgBBugUQC8ithnkXQg2iRhEiJIAAAJIgMAIIgMAAIgUAAIgUAEIgYgIIgYgMIgcgJIgYgHIgRgMIgTgMIgUgMIgUgNIgQgLIgcgMIgcgMIgMgMIAAgMIgEgMIAEgMIAIgMIAMgIQAIAAAHgCIABgCIAEAAIAYAIIAcALIAfANIAZAMIAQALIAUANIAUAHIAYAJIAUAMIAMAMIAYAMIAQAMIAIAIIgPgdQhNiQilgYQg7gIg3AAQlOAAh4ExgAuXwSIgDgCIgDgCIgDgCIgFgDIgCgCIgCgCIgCgCIgCgBIgBgCIgCgCIgBgCIgCgCIgBgBIgBgCIgCgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIAAgCIgBgBIgBgCIAAgCIgBgCIgBgCIAAgBIgBgCIAAgCIAAgCIgBgCIAAgBIAAgCIgBgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIgBgCIAAgBIABgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIAAgCIABgBIAAgCIABgCIABgCIAAgCIABgBIAAgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIACgBIABgCIACgCIABgCIACgCIACgCIACgBIABgCIAGgGIAKgJIAKgJIAQgNIATgPIAHgGIABgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIAEgDIAGgGIAFgDIAFgEIAHgFIAGgGIABgBIACgCIACgCIACgCIACgCIACgBIABgCIACgCIACgCIACgCIABgCIACgBIACgCIADgCIACgCIABgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIABgCIACgBIAGgFIAAABIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIgBACIABACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIABABIAAACIAAACIAAACIAAACIABACIAAABIAAACIABACIAAACIAAACIABABIAAACIAAACIABACIAAACIABABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIABACIAAABIABACIAAACIABACIABACIABABIAAACIABACIABACIABACIABABIABACIAAACIABACIABACIABABIABACIABACIABACIACACIABACIABABIABACIABACIABACIABAAIABACIABABIABACIACACIABACIACACIABABIACACIABACIACACIACACIABABQARARATAKIAAAAIgHAGIgFAEIgFADIgEAEIgEADIgBACIgHAGIgLAJIgMAIIgSANIgQAKIgFADIgDACIgCABIgCACIgEAEIgDACIgCACIgDABIgBACIgCACIgCACIgCACIgEADIgDACIgCACIgCACIgCABIgCACIgRAMQgOALgOAKQgVAOgXAGQgJACgJAAQgOAAgOgGgAGN7lIgQgEIgYgEIgkgEIgcgIIgQgMIgEgMIgEgMIAEgMIAEgMIAIgIIAIgEIAQgEIAEAAIAYAEIAUAEIAYAEIBogEIAUgMIAUgMIAQgIIAQgEIAEAAIAcgFIAUgDIAIgEIAMAAIAIAAIAIAMIAAAMIgEAMIgIAMIgkAYIgkAXIgUANIgUAMIgUAIIgMADIgQAFIhMAAgEADhggdIgUgMIgMgMIgIgMIgEgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAMgMIAIgMIAQgMIAUgIQAMAAALgCIABgCIAgAIIAUAMIAMAMIAIAMIAIAMIAEAMIAAAMIAAAMIAAAMIgEAMIgEAMIgIAMIgMAMIgQAMIgQAIIgYAEIgkgIgEAIRghJIgUgMIgMgMIgIgMIgIgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAIgMIAIgMIAMgMIAUgMQASgCARgEIABgCIAgAIIATAMIARAMIAIAMIAEAMIAEAMIAEAMIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgRALIgTANIggAIIgkgIgEABdgi9IgMgMIAAgMIgEgMIAEgMIAIgMIAkgkIAYgYIAYgYIAYgYIAMgMIAQgMIAUgIIAIgEQAGAAAFgCQADAAACgCIAIAAIAMAEIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgIAMIgYAYIgYAYIgYAYIgYAYIgIAMIgQAMIgYAIIgYgIg");
	this.shape_19.setTransform(445.9075,361.4041);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("EgTYAuVQiXgXiMg2QiohACUh6QAmgfAxgOQGsgbGSBfQAHACAHAHQEhhtAckRQBNrmBvrjIAhjcQj8iThIkjQgKgpAPgoQBwkrAZk1QAQjJgDjLQjTGxhsHTQg8EGAKEOIgwALIgOgKQgyopD8n6QCwliBKl3QjHh7hZjgQjDnjGqjcQEricEwCYQEKCGAuE2QAeDMgFDSQgEDZjOAoQCyC3C0DRQDgEGhQFbQg0Dhh7C/QgWAjgfAcQgEAwgOAlQhODSi8BvQgFHEg2HEQg3HLAkHJQDgBTDzA7QCXAliPAqQg1AOg5gDQj4gIi1iNQhdhJAJiCQA3s2BUsuQABgDACgCIADgbIhcgEQg8gFg6gLQg6gLg2gbQh3J4gPJ7QgJFwifE3QgjBFhBAyQhqBSh2AXQgHABgIgEQi5CBj/AAQhaAAhjgRgAibqqQADCugqCpIADAMQj7IZHWE3QBuBJCIgSQFkg0hjlgQgih4gyhyQiglvAfmbQAJh9gUh+QgCgOgFgMIATgdIgGgLQjkgOjYg/QgdEQAFEYgAHrn8QACEdCVD7QASAfAQAhQDzlYiXmLQgZhBgygxQh1h2hyh5gAmc+hQgbBEAMBKQBaIoJHgHQBugCBugUQC9ithokXQg1iRhFiIIAAAIIgMAIIgMAAIgUAAIgUAEIgYgIIgYgMIgcgIIgYgIIgQgLIgUgNIgUgMIgTgMIgRgMIgcgMIgcgMIgMgMIAAgMIgEgMIAEgMIAIgMIAMgIQAIAAAIgCIAAgCIAEABIAYAIIAcALIAgANIAYALIARAMIATAMIAUAIIAYAIIAUAMIAMAMIAYAMIAQAMIAIAIIgPgcQhNiRikgYQg8gIg2AAQlOAAh5ExgAzfreIgDgBIgDgCIgDgCIgFgEIgCgBIgCgCIgCgCIgBgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIAAgCIgBgCIAAgBIgBgCIgBgCIAAgCIAAgCIgBgBIAAgCIgBgCIAAgCIAAgCIAAgBIgBgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIABgBIAAgCIAAgCIAAgCIABgCIAAgBIABgCIAAgCIAAgCIABgCIAAgCIABgBIABgCIAAgCIABgCIABgCIABgBIAAgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIACgBIABgCIABgCIACgCIABgCIACgBIACgCIABgCIACgCIACgCIAGgFIAKgJIAKgJIAQgNIATgQIAGgFIACgCIABgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIABgCIACgCIAEgEIAGgFIAFgEIAGgDIAGgGIAGgFIACgCIACgCIACgCIACgBIABgCIACgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIACgCIADgCIACgCIABgCIACgCIACgBIACgCIACgCIAGgFIAAABIAAACIAAACIgBACIAAACIAAABIAAACIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIABACIAAACIAAABIAAACIABACIAAACIABACIAAABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIAAACIABACIAAABIABACIABACIAAACIABACIABABIAAACIABACIABACIABACIAAABIABACIABACIABACIABACIABABIABACIABACIABACIABACIABABIABACIABACIABACIABACIACABIABACIAAABIABABIACACIABACIABABIACACIABACIACACIABACIACABIABACIACACIACACQAQARAUAKIgBAAIgGAFIgFAEIgFAEIgEADIgEAEIgCACIgHAFIgLAJIgLAJIgTANIgPAJIgGADIgCACIgCACIgDACIgEADIgCACIgDACIgCACIgCACIgCABIgCACIgCACIgEAEIgCABIgCACIgDACIgCACIgCACIgRAMQgNALgPAJQgUAOgYAGQgIADgJAAQgPAAgOgHgABF2xIgQgDIgYgEIgjgFIgcgIIgQgMIgEgMIgEgMIAEgMIAEgMIAIgIIAIgEIAQgEIAEABIAXADIAUAEIAYAEIBogEIAUgMIAUgLIAQgJIAQgEIAEAAIAcgEIAUgEIAIgEIAMAAIAIAAIAIAMIAAAMIgEAMIgIAMIgkAYIgkAYIgUAMIgUAMIgUAIIgMAEIgQAEIhMAAgAhm7pIgUgMIgMgMIgIgMIgEgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAMgMIAIgMIAQgMIAUgIQAMAAAMgCIAAgCIAgAIIAUAMIAMAMIAHAMIAIAMIAEAMIAAAMIAAAMIAAAMIgEAMIgEAMIgIAMIgLAMIgQAMIgQAIIgYAEIgkgIgADJ8VIgUgMIgMgMIgIgMIgIgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAIgMIAIgMIAMgMIAUgMQASgCASgEIAAgCIAgAIIAUANIAQALIAIAMIAEAMIAEAMIAEAMIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgQAMIgUAMIggAIIgkgIgAjq+JIgMgMIAAgMIgEgMIAEgMIAIgMIAkgkIAYgYIAYgYIAYgYIAMgMIAQgMIAUgIIAIgEQAGAAAGgBQACgBACgCIAIAAIAMAEIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgIAMIgYAYIgYAYIgYAYIgYAYIgIAMIgQAMIgYAIIgYgIgEAXxgkJIgMgMIgMgMIAAgMIgEgMIAAgMIAAgMIAAgMIAAgMIAAgMIAEgMIAAgMIAIgMIAEgMIAAgMIAEgMIAAgMIAAgYIAAgkIAAgkIAAgkIAAgkIAAgYIAEgMIAAgMIAAgMIAAgYIAAgYIAAgYIAAgYIAAgYIAAgMIAEgMIAAgMIAAgMIAAgMIAAgMIAAgMIAEgMIAEgMIAMgMQAMgCAMgEIAAgCIAYAIIAQAMIAIAMIAAAMIAAAMIgEAMIAAAMIAAAMIAAAMIAAAMIAEAMIAAAMIAAAMIAAAYIAAAYIAAAYIAAAYIAAAYIAAAMIAEAMIAAAMIAAAYIAAAkIAAAkIAAAkIAAAkIAAAMIAEAMIAAAMIAAAMIAAAMIAAAMIgEAMIAAAMIgIAMIgEAMIAAAMIgEAMIAAAMIgEAMIgIAMIgQAMIgYAIIgcgIg");
	this.shape_20.setTransform(478.6662,330.5547);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#666666").s().p("Ag0CbQhfhAAIhxIAAgDQBqkECRDeQBCBkhUBWQgrArgzAAQgZAAgbgLg");
	this.shape_21.setTransform(386.3946,226.2462);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("EgTZAuVQiWgXiNg2QiohACVh6QAlgfAygOQGrgbGTBfQAHACAGAHQEhhtAdkRQBMrmBwrjIAhjcQj9iThHkjQgKgpAOgoQBwkrAZk1QAQjJgDjLQjTGxhrHTQg8EGAJEOIgwALIgOgKQgxopD7n6QCwliBKl3QjGh7hajgQjCnjGqjcQEqicEwCYQELCGAtE2QAeDMgEDSQgFDZjOAoQCzC3CzDRQDgEGhPFbQg0Dhh7C/QgXAjgeAcQgFAwgNAlQhODSi8BvQgGHEg2HEQg2HLAkHJQDgBTDyA7QCXAliPAqQg1AOg5gDQj4gIi0iNQhdhJAIiCQA3s2BVsuQAAgDACgCIADgbIhcgEQg7gFg6gLQg7gLg2gbQh2J4gPJ7QgJFwifE3QgkBFhAAyQhrBSh2AXQgHABgHgEQi6CBj/AAQhaAAhjgRgAicqqQADCugqCpIAEAMQj7IZHVE3QBvBJCHgSQFkg0hjlgQghh4gyhyQihlvAfmbQAKh9gVh+QgCgOgEgMIASgdIgFgLQjkgOjZg/QgcEQAEEYgAHqn8QADEdCUD7QATAfAQAhQDzlYiYmLQgZhBgxgxQh1h2hyh5gAmc+hQgbBEAMBKQBaIoJGgHQBvgCBugUQC8ithnkXQg2iRhEiIIgMAQQiugKiKh2IgEgYIAogkQCgAxB8BzIgbg0QhNiRilgYQg8gIg2AAQlNAAh5ExgAzzsQQgdgRARggQBLiMCNhgIAAADQgHByBeBBQhkCChkAAQguAAgtgbgAXhvlIgGjAQgDhggBhgQAAhfgWhVIgDgsIgDgtQgGg8ATg3QAEgNAJgLIAYoQIgUgUQADhBAHhBQAUi6gHi8QgDhEAYhAIAYgIIAwAgIgKO1QgBCdgFCaIggAhQApELAQEJQAGBrhPA0gAgy3RIgIgYQCfg+DQgSIAIAMQhVB/iFAAQhFAAhQgjgAiC77QgZgaAAgkQAAgkAZgZQAagaAkAAQAkAAAZAaQAZAZAAAkQAAAkgZAaQgZAZgkAAQgkAAgagZgACq8oQgagbAAgmQAAglAagbQAbgbAmAAQAlAAAbAbQAbAbAAAlQAAAmgbAbQgbAaglAAQgmAAgbgagAj2+VIgEgYQBFhzB7g5IAUAEQgaCKiEBFQgHAEgHABg");
	this.shape_22.setTransform(478.7374,330.5547);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("EgUFAuYQibgLiSgpQjghACtiWQAigeAvgEQHBgyGLB/QCOhZB/hqQBBg2AIhXQAVjiAPjiQArqMB1qDQiGhGhch6QiQi9BRjYQBqkbgEkqQgCivAUixQh0EbhnEhQhVDvgaD7QgTC6gVC4IgtANQg+hwAQiSQAQiGAiiBQCapKDeorIA3iOQhKgrg/hAQhihkg0h+QjHnkGsjcQFhi2E+DJQC0BxAnDSQAmDNAYDPQAfEcj7A/IAqA2IgQAUQB4BsCjAJQEcAUEZglQBNgIBNgMQA6iwgZjFQgQiCgUh/QgLhEAcg7QADgGAFgFIAYoQIgUgUQAEhCAHhAQAUi6gEi8QgBg8ANg8QACgGADgGIAYgIIAwAgIgJO0QgCCdgFCbIggAhIAgJ3IAcAQIC1FNIgFAXIgmANIgmALIgSAGQgJgBgJgDQgIgBgHgFQgJgGgIgGIgghIIgUCUIgfAHIglgrIgpAvQgEAEgFADIgVAHIgTgEQgKgDgJgGIgLgIIAAgwQgGgEgGgDQgIgCgJgBQglgIgFgmQgEgoAWghQAJgNAGgPIAHgOIAEgQQALgyAZgiQgngHgoAFQk+Afk/gbQiWgNhvhmIAMAoQgZBLASBNQAbB0AAB3QgBDnBwDHQDBFXiiFAQhAB9h+BAQgMEegOEdQgOEvgtEsQg2FoB4ErQANAgAtgEQEjgSCOCrQgSAhgjAKQgmAKgkAAQkYgdjhiIQgzgfABg/QARtzBttiIADgbIhcgEIhcgHQhAgIg4ggQgIgEgJgDQg6H/hAH6QgVCrgDCqQgEE+iREHQg0BehgA0QhSAuhTAcQgTAHgXgFQgaAyg2ANQjFAwjNAAQguAAgugCgAj3qfQADCugqCqIADALQj7IaHXE2QBtBJCIgRQFkg1hjlgQgih3gyhzQiglvAfmaQAJh9gUh/QgCgNgFgNIATgcIgGgLQjjgPjZg+QgdEPAFEYgAn4+VQgbBDAMBLQBaIoJHgIQBugBBugUQC9ithokXQg2iShEiIIAAAJIgMAIIgMAAIgUAAIgUAEIgYgIIgYgMIgcgJIgYgHIgQgMIgUgMIgUgMIgTgNIgRgLIgcgMIgcgMIgMgMIAAgMIgEgMIAEgMIAIgMIAMgIQAIAAAIgCIAAgCIAEAAIAYAIIAcALIAgANIAYAMIARALIATANIAUAHIAYAJIAUAMIAMAMIAYAMIAQAMIAIAIIgPgdQhNiQikgYQg8gJg2AAQlOAAh5EygA07rSIgDgCIgDgCIgDgCIgFgDIgCgCIgCgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgCgBIgBgCIgBgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIAAgCIgBgCIAAgCIgBgCIgBgBIAAgCIAAgCIgBgCIAAgCIgBgBIAAgCIAAgCIAAgCIgBgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIABgCIAAgCIAAgCIAAgBIABgCIAAgCIABgCIAAgCIAAgBIABgCIAAgCIABgCIABgCIAAgBIABgCIABgCIABgCIAAgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIACgCIABgCIABgBIACgCIABgCIACgCIACgCIABgCIACgBIACgCIAGgGIAKgJIAKgJIAQgNIATgPIAGgGIACgCIABgCIACgBIACgCIABgCIACgCIACgCIACgBIACgCIACgCIACgCIABgCIACgBIACgCIACgCIABgCIACgCIAEgDIAGgGIAFgDIAGgEIAGgFIAGgGIACgBIACgCIACgCIACgCIABgCIACgBIACgCIACgCIABgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIABgCIACgBIACgCIACgCIACgCIADgCIACgBIABgCIACgCIACgCIACgCIACgBIAGgFIAAABIAAACIAAACIgBABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIABACIAAACIAAACIAAABIAAACIABACIAAACIAAACIAAACIABABIAAACIAAACIAAACIABACIAAABIABACIAAACIAAACIABACIAAABIABACIAAACIABACIAAACIABABIAAACIABACIAAACIABACIABABIAAACIABACIABACIAAACIABABIABACIABACIAAACIABACIABABIABACIABACIABACIABACIABABIABACIABACIABACIABACIABACIABABIABACIACACIABACIAAAAIABACIACABIABACIABACIACACIABACIACABIABACIACACIABACIACACIACABQAQARAUAKIgBAAIgGAGIgFAEIgFADIgEAEIgEADIgCACIgHAGIgLAJIgLAIIgTANIgPAKIgGADIgCACIgCABIgDACIgEAEIgCACIgDACIgCABIgCACIgCACIgCACIgCACIgEADIgCACIgCACIgDACIgCABIgCACIgRAMQgNALgPAKQgUAOgYAGQgJACgIAAQgPAAgOgGgAgW2lIgQgEIgYgEIgkgEIgcgIIgQgMIgEgMIgEgMIAEgMIAEgMIAIgIIAIgEIAQgEIAEAAIAYAEIAUAEIAYAEIBngEIAUgMIAUgMIAQgIIAQgEIAEAAIAcgFIAUgDIAIgEIAMAAIAIAAIAIAMIAAAMIgEAMIgIAMIgkAYIgkAXIgUANIgUAMIgUAIIgMADIgQAFIhLAAgAjC7dIgUgMIgMgMIgIgMIgEgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAMgMIAIgMIAQgMIAUgIQAMAAAMgCIAAgCIAgAIIAUAMIAMAMIAIAMIAIAMIAEAMIAAAMIAAAMIAAAMIgEAMIgEAMIgIAMIgMAMIgQAMIgQAIIgYAEIgkgIgABt8JIgUgMIgMgMIgIgMIgIgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAIgMIAIgMIAMgMIAUgMQASgCASgEIAAgCIAgAIIAUAMIAQAMIAIAMIAEAMIAEAMIAEAMIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgQALIgUANIggAIIgkgIgAlG99IgMgMIAAgMIgEgMIAEgMIAIgMIAkgkIAYgYIAYgYIAYgYIAMgMIAQgMIAUgIIAIgEQAGAAAGgCQACAAACgCIAIAAIAMAEIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgIAMIgYAYIgYAYIgYAYIgYAYIgIAMIgQAMIgYAIIgYgIg");
	this.shape_23.setTransform(487.8929,329.449);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("EgSeAufQjzgMjchSQh4grBfhjQBmhpCdAIQFTAUFMA6QASAEAJAQQCPhZB/hqQBAg2AJhXQAUjPANjRQAoqgB7qTQiMhKhbiBQhWh6ANiOQAdkkBTkhQAZhUgKhXQgSicAZibQh0EahjEgQhAC6gmDCQgvDwgFDyIg2AJQgojDAfjQQAOhfAXhcQCAoHDmnkQAag4AMhCQAJgtALgsQhvg6hLhlQhChZgnhqQi+oDHYi+QFWiLEgDAQCrBxAjDLQAbCYAjCZQBSFikqBjIArA2IgQAUQBiBcCFAQQEBAbEBgUQCBgLB/gYQA6iwgYjFQgQiCgUh/QgLhEAcg7QADgGAFgFIAYoQIgUgUQADhCAHhAQAWjMgJjPQgCgsAQgmIAHgNIAYgIIAwAgIgKO0QgBCdgFCbIggAhIAgJ3IAcAQIC0FNIgEAXIgmANIgmALIgTAGQgJgBgIgDQgJgBgHgFQgJgGgHgGIgghIIgUCUIggAHIgkgrIgpAvQgEAEgGADIgUAHIgUgEQgKgDgJgGIgKgIIAAgwQgGgEgHgDQgIgCgIgBQgmgIgEgmQgFgoAWghQAJgNAHgPIAGgOIAFgQQALgyAYgiQgngIgoAGQlXAvlYg1Qh7gUhXhVIAMAoQgZBLARBNQAbB0AAB3QgBCiBCCQQCXFFgSFZQgDA5giA1QhQB9iABHQgLE8gWE8QgaFvgtFsQgfD+BWDVQAKAZAhACQEdgTCsCsQAWAXgoAEQk8ATkVicQg0gdADg/QAgtiBTtgQABgKAIgJIADgbIhcgEIhcgHQg/gIg4ggQgJgEgJgDQg6H/g/H6QgWCrgBCqQgEFCiYEIQg3BfheA6QhMAwhWAbQgQAFgOgKQgdAYgzAVQizBGjGAAIgWAAgAj4qkQADCugqCqIAEALQj7IaHWE2QBuBJCHgRQFkg1hjlgQghh3gyhzQihlvAfmaQAKh9gVh/QgCgNgEgNIASgcIgFgLQjjgPjag+QgcEPAEEYgAn4+aQgbBDAMBLQBaIoJGgIQBvgBBugUQC8ithnkXQg2iRhEiJIAAAJIgMAIIgMAAIgUAAIgUAEIgYgIIgYgMIgcgJIgYgHIgRgMIgTgMIgUgMIgUgNIgQgLIgcgMIgcgMIgMgMIAAgMIgEgMIAEgMIAIgMIAMgIQAIAAAHgCIABgCIAEAAIAYAIIAcALIAfANIAZAMIAQALIAUANIAUAHIAYAJIAUAMIAMAMIAYAMIAQAMIAIAIIgPgdQhNiQilgYQg8gIg1AAQlPAAh4ExgA07rXIgDgCIgDgCIgDgCIgFgDIgCgCIgCgCIgCgCIgCgBIgBgCIgCgCIgBgCIgCgCIgBgBIgBgCIgCgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIAAgCIgBgBIgBgCIAAgCIgBgCIgBgCIAAgBIgBgCIAAgCIAAgCIgBgCIAAgBIAAgCIgBgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIgBgCIAAgBIABgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIABgCIAAgBIAAgCIABgCIAAgCIAAgCIABgBIAAgCIABgCIABgCIAAgCIABgBIAAgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIACgBIABgCIACgCIABgCIACgCIACgCIACgBIABgCIAGgGIAKgJIAKgJIAQgNIATgPIAHgGIABgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIAEgDIAGgGIAFgDIAFgEIAHgFIAGgGIABgBIACgCIACgCIACgCIACgCIACgBIABgCIACgCIACgCIACgCIABgCIACgBIACgCIADgCIACgCIABgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIABgCIACgBIAGgFIAAABIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIgBACIABACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIABABIAAACIAAACIAAACIAAACIABACIAAABIAAACIABACIAAACIAAACIABABIAAACIAAACIABACIAAACIABABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIABACIAAABIABACIAAACIABACIABACIABABIAAACIABACIABACIABACIABABIABACIAAACIABACIABACIABABIABACIABACIABACIACACIABACIABABIABACIABACIABACIABAAIABACIABABIABACIACACIABACIACACIABABIACACIABACIACACIACACIABABQARARATAKIAAAAIgHAGIgFAEIgFADIgEAEIgEADIgBACIgHAGIgLAJIgMAIIgSANIgQAKIgFADIgDACIgCABIgCACIgEAEIgDACIgCACIgDABIgBACIgCACIgCACIgCACIgEADIgDACIgCACIgCACIgCABIgCACIgRAMQgOALgOAKQgVAOgXAGQgJACgJAAQgOAAgOgGgAgW2qIgQgEIgYgEIgkgEIgcgIIgQgMIgEgMIgEgMIAEgMIAEgMIAIgIIAIgEIAQgEIAEAAIAYAEIAUAEIAYAEIBngEIAUgMIAUgMIAQgIIAQgEIAEAAIAcgFIAUgDIAIgEIAMAAIAIAAIAIAMIAAAMIgEAMIgIAMIgkAYIgkAXIgUANIgUAMIgUAIIgMADIgQAFIhLAAgAjC7iIgUgMIgMgMIgIgMIgEgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAMgMIAIgMIAQgMIAUgIQAMAAALgCIABgCIAgAIIAUAMIAMAMIAIAMIAIAMIAEAMIAAAMIAAAMIAAAMIgEAMIgEAMIgIAMIgMAMIgQAMIgQAIIgYAEIgkgIgABt8OIgUgMIgMgMIgIgMIgIgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAIgMIAIgMIAMgMIAUgMQASgCARgEIABgCIAgAIIATAMIARAMIAIAMIAEAMIAEAMIAEAMIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgRALIgTANIggAIIgkgIgAlG+CIgMgMIAAgMIgEgMIAEgMIAIgMIAkgkIAYgYIAYgYIAYgYIAMgMIAQgMIAUgIIAIgEQAGAAAFgCQADAAACgCIAIAAIAMAEIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgIAMIgYAYIgYAYIgYAYIgYAYIgIAMIgQAMIgYAIIgYgIg");
	this.shape_24.setTransform(487.9463,329.9103);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("EgV3AuVQiXgXiMg2QiohACUh6QAmgfAxgOQGsgbGSBfQAHACAHAHQEhhtAckRQBNrmBvrjIAhjcQj8iThIkjQgKgpAPgoQBwkrAZk1QAQjJgDjLQjTGxhsHTQg8EGAKEOIgwALIgOgKQgyopD8n6QCwliBKl3QjHh7hZjgQjDnjGqjcQEsicEvCYQEKCGAuE2QAeDMgFDSQgEDZjOAoIAqA1IgQAUIAMAJQBnDuDfBkQEABzEdgeQCCgOB/gdQA5i2gmjLQgljGAoi6IAGgvQAci/gVi+IAHAkIAEiIIgUgUIAdmYIgRhlQgZiTAPiWIAIhaIAkgSQBkCTglDoQgHAxACAvQAJDPgJDQQANAjABAlQAIEtgaErIgcAgIAcJ5IAcAPIAMAsICpEiIgFAWIgNAGIgPAGIgPACIgPAEIgQAEQgeAHgagMIgHgDIgnhOIAAAIIAAAMIAAAMIAAA8IgBAMQgCAUgMARIgdAPIgLgEIgLgGIgGgFIgGgGQgDgFgCgGIgFgMIgpAvQgCADgDABIgGAEIgIADIgIACQgbgEgZgQIAAgwIg5gWIgLhOIBNiqQlcAtlchDQkgg4h6kaQASBvAHB0QAcHRCxGpQA+CUhICHQhVCgicBXQgFHEg2HEQg3HLAkHJQDgBTDzA7QCXAliPAqQg1AOg5gDQj4gIi1iNQhdhJAJiCQA3s2BUsuQABgDACgCIADgbIhcgEQg8gFg5gLQg6gLg2gbQh4J4gPJ7QgJFwifE3QgjBFhBAyQhqBSh2AXQgHABgIgEQi5CBj/AAQhaAAhjgRgAk6qqQADCugqCpIADAMQj7IZHXE3QBuBJCHgSQFkg0hjlgQgih4gyhyQiglvAfmbQAJh9gUh+QgCgOgFgMIATgdIgGgLQjjgOjZg/QgdEQAFEYgAo7+hQgbBEAMBKQBaIoJHgHQBugCBugUQC9ithokXQg2iRhEiIIAAAIIgMAIIgMAAIgUAAIgUAEIgYgIIgYgMIgcgIIgYgIIgQgLIgUgNIgUgMIgTgMIgRgMIgbgMIgcgMIgMgMIAAgMIgEgMIAEgMIAIgMIAMgIQAIAAAIgCIAAgCIAEABIAXAIIAcALIAgANIAYALIARAMIATAMIAUAIIAYAIIAUAMIAMAMIAYAMIAQAMIAIAIIgPgcQhNiRijgYQg8gIg3AAQlOAAh5ExgA1+reIgDgBIgDgCIgDgCIgFgEIgCgBIgCgCIgCgCIgBgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIAAgCIgBgCIAAgBIgBgCIgBgCIAAgCIAAgCIgBgBIAAgCIgBgCIAAgCIAAgCIAAgBIgBgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIABgBIAAgCIAAgCIAAgCIABgCIAAgBIABgCIAAgCIAAgCIABgCIAAgCIABgBIABgCIAAgCIABgCIABgCIABgBIAAgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIACgBIABgCIABgCIACgCIABgCIACgBIACgCIABgCIACgCIACgCIAGgFIAKgJIAKgJIAQgNIATgQIAGgFIACgCIABgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIABgCIACgCIAEgEIAGgFIAFgEIAGgDIAGgGIAGgFIACgCIACgCIACgCIACgBIABgCIACgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIACgCIADgCIACgCIABgCIACgCIACgBIACgCIACgCIAGgFIAAABIAAACIAAACIgBACIAAACIAAABIAAACIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIABACIAAACIAAABIAAACIABACIAAACIABACIAAABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIAAACIABACIAAABIABACIABACIAAACIABACIABABIAAACIABACIABACIABACIAAABIABACIABACIABACIABACIABABIABACIABACIABACIABACIABABIABACIABACIABACIABACIACABIABACIAAABIABABIACACIABACIABABIACACIABACIACACIABACIACABIABACIACACIACACQAQARAUAKIgBAAIgGAFIgFAEIgFAEIgEADIgEAEIgCACIgHAFIgLAJIgLAJIgTANIgPAJIgGADIgCACIgCACIgDACIgEADIgCACIgDACIgCACIgCACIgCABIgCACIgCACIgEAEIgCABIgCACIgDACIgCACIgCACIgRAMQgNALgPAJQgUAOgYAGQgJADgIAAQgPAAgOgHgAhZ2xIgQgDIgYgEIgkgFIgcgIIgQgMIgEgMIgEgMIAEgMIAEgMIAIgIIAIgEIAQgEIAEABIAYADIAUAEIAYAEIBogEIATgMIAUgLIAQgJIAQgEIAEAAIAcgEIAUgEIAIgEIAMAAIAIAAIAIAMIAAAMIgEAMIgIAMIgkAYIgkAYIgUAMIgUAMIgUAIIgMAEIgPAEIhMAAgAkF7pIgUgMIgMgMIgIgMIgEgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAMgMIAIgMIAQgMIAUgIQAMAAAMgCIAAgCIAgAIIAUAMIAMAMIAIAMIAIAMIAEAMIAAAMIAAAMIAAAMIgEAMIgEAMIgIAMIgMAMIgQAMIgQAIIgYAEIgkgIgAAq8VIgUgMIgMgMIgIgMIgHgMIgEgMIAAgMIgEgMIAEgMIAAgMIAEgMIAHgMIAIgMIAMgMIAUgMQASgCASgEIAAgCIAgAIIAUANIAQALIAIAMIAEAMIAEAMIAEAMIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgQAMIgUAMIggAIIgkgIgAmJ+JIgMgMIAAgMIgEgMIAEgMIAIgMIAkgkIAYgYIAYgYIAYgYIAMgMIAQgMIAUgIIAIgEQAGAAAGgBQACgBACgCIAIAAIAMAEIAAAMIAAAMIgEAMIgEAMIgEAMIgIAMIgIAMIgYAYIgYAYIgYAYIgYAYIgIAMIgQAMIgYAIIgYgIgEAVSgtVIAAgMIAAgMIAAgMIAEgMIAEgMIAMgMQAMgCAMgEIAAgCIAYAIIAQAMIAIAMIAAAMIAAAMIgEAMIAAAMIAAAEIhMAAIAAACIgMACIAAgIg");
	this.shape_25.setTransform(494.5912,330.5547);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("EgVvAuCQiXgXiMg2QiohACUh6QAmgfAxgOQGsgbGSBfQAHACAHAHQEhhtAckRQBNrmBvrjIAhjcQj8iThIkjQgKgpAPgoQBwkrAZk1QAQjJgDjLQjTGxhsHTQg8EGAKEOIgwALIgOgKQgyopD8n6QCwliBKl3QjHh7hZjgQjDnjGqjcQEsicEvCYQEKCGAuE2QAeDMgEDSQgEDbjQAgIgVAvICEGkQBWDpCkCxQB3B/BvCDQA8AHA8ABQDbgKDZghIAeg1QAJizgbivQgdi8AniuIAYoQIgUgUIAAhsQAPm4gCnEQAAguAZgmIASmQIgmAPIAAgLIAshCIAgASIAQgEQBuCkgqD1QhZIHAWIUQABAYgIAYQAKAaADAcQAWDtgjDhIgECcIggAhIAgJ4IAcAPIAMAsICpEhIgFAWIhsAcIgdgOIgnhOIgPCNIgdAPIgLgEIgLgHIgGgEIgGgGQgDgFgCgGIgFgMQgUAYgVAXIgLAIIgQAFIgHAAIgtgUIAAgwIg5gWIgLhOIBNiqQkoA5kMhmQg/gYgwg0QjxkHiXlBQAPGdCdF/QB+E2kPDWQghAagmAPQgFHEg2HEQg3HLAkHJQDgBTDzA7QCXAliPAqQg1AOg5gDQj4gIi1iNQhdhJAJiCQA3s2BUsuQABgDACgCIADgbIhcgEQg8gFg5gLQg6gLg2gbQh4J4gPJ7QgJFwifE3QgjBFhBAyQhqBSh2AXQgHABgIgEQi5CBj/AAQhaAAhjgRgAkyq9QADCugqCpIADAMQj7IZHXE3QBuBJCHgSQFkg0hjlgQgih4gyhyQiglvAfmbQAJh9gUh+QgCgOgFgMIATgdIgGgLQjjgOjZg/QgdEQAFEYgAoz+0QgbBEAMBKQBaIoJHgHQBugCBugUQC9ithokXQg2iRhEiIIgMAQQitgKiKh2IgEgYIAogkQCfAxB8BzIgbg0QhNiRikgYQg7gIg3AAQlOAAh5ExgA12rxIgDgBIgDgCIgDgCIgFgEIgCgBIgCgCIgCgCIgBgCIgCgCIgBgBIgCgCIgBgCIgCgCIgBgCIgBgBIgBgCIgBgCIgBgCIgBgCIgBgBIgBgCIgBgCIgBgCIAAgCIgBgCIAAgBIgBgCIgBgCIAAgCIAAgCIgBgBIAAgCIgBgCIAAgCIAAgCIAAgBIgBgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIAAgBIAAgCIAAgCIAAgCIAAgCIABgBIAAgCIAAgCIAAgCIABgCIAAgBIABgCIAAgCIAAgCIABgCIAAgCIABgBIABgCIAAgCIABgCIABgCIABgBIAAgCIABgCIABgCIABgCIABgBIABgCIABgCIABgCIABgCIACgBIABgCIABgCIACgCIABgCIACgBIACgCIABgCIACgCIACgCIAGgFIAKgJIAKgJIAQgNIATgQIAGgFIACgCIABgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIABgCIACgCIAEgEIAGgFIAFgEIAGgDIAGgGIAGgFIACgCIACgCIACgCIACgBIABgCIACgCIACgCIACgCIABgBIACgCIACgCIACgCIACgCIACgBIACgCIACgCIACgCIACgCIACgBIACgCIABgCIACgCIACgCIACgBIACgCIADgCIACgCIABgCIACgCIACgBIACgCIACgCIAGgFIAAABIAAACIAAACIgBACIAAACIAAABIAAACIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIAAACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIAAACIABACIAAABIAAACIAAACIABACIAAACIAAABIAAACIABACIAAACIABACIAAABIAAACIABACIAAACIABACIAAABIABACIAAACIABACIAAACIABACIAAABIABACIABACIAAACIABACIABABIAAACIABACIABACIABACIAAABIABACIABACIABACIABACIABABIABACIABACIABACIABACIABABIABACIABACIABACIABACIACABIABACIAAABIABABIACACIABACIABABIACACIABACIACACIABACIACABIABACIACACIACACQAQARAUAKIgBAAIgGAFIgFAEIgFAEIgEADIgEAEIgCACIgHAFIgLAJIgLAJIgTANIgPAJIgGADIgCACIgCACIgDACIgEADIgCACIgDACIgCACIgCACIgCABIgCACIgCACIgEAEIgCABIgCACIgDACIgCACIgCACIgRAMQgNALgPAJQgUAOgYAGQgJADgIAAQgPAAgOgHgAjJ3kIgIgYQCgg+DPgSIAIAMQhVB/iDAAQhFAAhSgjgAkY8OQgagaAAgkQAAgkAagZQAZgaAkAAQAkAAAaAaQAZAZAAAkQAAAkgZAaQgaAZgkAAQgkAAgZgZgAAU87QgagbAAgmQAAglAagbQAbgbAlAAQAmAAAaAbQAbAbAAAlQAAAmgbAbQgaAagmAAQglAAgbgagAmN+oIgEgYQBGhzB6g5IAUAEQgZCKiEBFQgHAEgIABg");
	this.shape_26.setTransform(493.7912,332.4547);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},137).to({state:[{t:this.shape_11}]},7).to({state:[{t:this.shape_12}]},6).to({state:[{t:this.shape_13}]},24).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.instance_17}]},733).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.instance_18}]},49).to({state:[{t:this.shape_18},{t:this.shape_19}]},111).to({state:[{t:this.shape_20},{t:this.shape_18}]},20).to({state:[{t:this.shape_20},{t:this.shape_18}]},10).to({state:[{t:this.shape_22},{t:this.shape_21}]},3).to({state:[{t:this.shape_23},{t:this.shape_18}]},6).to({state:[{t:this.shape_24},{t:this.shape_18}]},9).to({state:[{t:this.shape_25},{t:this.shape_18}]},6).to({state:[{t:this.shape_26},{t:this.shape_18}]},6).wait(17));

	// Capa_1
	this.instance_19 = new lib.Símbolo1("synched",0);
	this.instance_19.setTransform(-151.05,368.3,1,1,0,0,0,100.1,217.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({_off:true},137).wait(1007));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-83.8,0,1612.5,693.9);
// library properties:
lib.properties = {
	id: 'A822B06FED81C74B8E76025DB2610668',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_53.png", id:"CachedBmp_53"},
		{src:"images/Monigote bailando_atlas_1.png", id:"Monigote bailando_atlas_1"},
		{src:"images/Monigote bailando_atlas_2.png", id:"Monigote bailando_atlas_2"},
		{src:"images/Monigote bailando_atlas_3.png", id:"Monigote bailando_atlas_3"},
		{src:"images/Monigote bailando_atlas_4.png", id:"Monigote bailando_atlas_4"},
		{src:"sounds/a.mp3", id:"a"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A822B06FED81C74B8E76025DB2610668'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;