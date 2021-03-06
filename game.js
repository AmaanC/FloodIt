// I've tried to make the game as flexible as possible, so you can just change any of the variables and not break the game. Try changing the maxSide or the noBlocks. It won't break! :D
// I count blocks from block 0 (top left, 1 being below it, 13 being on its right) to block noBlocks*noBlocks. That is how the arrays blocks and selected work. Selected keeps track of which are all the same color. Blocks keeps track of all of their colors.
function id(i){
	return document.getElementById(i);
}

var canvas = id('canvas');
var ctx = canvas.getContext('2d');
var colors = ['darkblue','lightblue','green','yellow','red','pink'];

function convert(string,from){ //Convert FROM the x,y format to the numbered format. The string is the x,y string or the number to be converted
	if(from==true){
		var co = string.split(',');
		return parseInt(noBlocks*co[0])+parseInt(co[1]);
	}
	else if(from==false){ //Convert a number into the x,y format
		var x=Math.floor(string/noBlocks);
		var y=string%noBlocks;
		return [x,y];
	}
}

function sqr(left,top,color){ // The block number from the top and from the left side
	ctx.fillStyle=color; // ? color : 'black';
	ctx.fillRect(left*side,top*side,side,side);
	blocks[convert(left+','+top,true)]=color;
}

function select(color){
	clicks++;
	selected = [0];
	check(0);
	for(var i=0;i<selected.length;i++){
		var co = convert(selected[i],false);
		sqr(co[0],co[1],color);
	}
	document.getElementById('clicks').textContent = clicks;
}


function reset(max,no){

	//Adding the color buttons
	var div = document.getElementById('colors');
	div.textContent='';
	for(var i=0;i<colors.length;i++){
		var z = document.createElement('span');
		z.id=colors[i];
		z.style.borderRadius='50px';
		z.style.backgroundColor=colors[i];
		z.style.display='inline-block';
		z.style.width=max/colors.length;
		z.style.height=max/colors.length;
		z.addEventListener('click',function(){select(this.id)});
		div.appendChild(z);
	}

	clicks = 0;
	maxSide = max;
	noBlocks = no;
	canvasSide = maxSide-maxSide%noBlocks;
	selected = [0];
	blocks = [];
	side = canvasSide/noBlocks;

	document.getElementById('clicks').textContent = clicks;
	canvas.width = canvas.height = canvasSide;

	for(var x=0;x<noBlocks;x++)
	{
		for(var y=0;y<noBlocks;y++)
			{
			sqr(x,y,colors[Math.floor(Math.random()*6)]);
			}
	}
	check(0);
}
function check(blockNo){
	if(blocks[blockNo] == blocks[blockNo+1] && blockNo<noBlocks*noBlocks-1 && blockNo%noBlocks != noBlocks-1 && selected.indexOf(blockNo+1) == -1){
		selected.push(blockNo+1);
		check(blockNo+1);
	}
	if(blocks[blockNo] == blocks[blockNo+noBlocks] && blockNo<noBlocks*(noBlocks-1) && selected.indexOf(blockNo+noBlocks) == -1){
		selected.push(blockNo+noBlocks);
		check(blockNo+noBlocks);
	}
	if(blocks[blockNo] == blocks[blockNo-noBlocks] && blockNo>=noBlocks && selected.indexOf(blockNo-noBlocks) == -1){
		selected.push(blockNo-noBlocks);
		check(blockNo-noBlocks);
	}
	if(blocks[blockNo] == blocks[blockNo-1] && blockNo>=1 && blockNo%noBlocks != 0 && selected.indexOf(blockNo-1) == -1){
		selected.push(blockNo-1);
		check(blockNo-1);
	}
}
