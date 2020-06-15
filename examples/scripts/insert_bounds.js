

var quad;
var canvas;
var stage;
var shape;
var drawColor;

function init()
{
	if(!(!!document.createElement('canvas').getContext))
	{
		var d = document.getElementById("canvasContainer");
		d.innerHTML = "This example requires a browser that supports the HTML5 Canvas element."
		return;
	}	
	
	canvas = document.getElementById("canvas");
	
	//prevent doublclicking on canvas from selecting text on the
	//page
	canvas.onselectstart = function () { return false; }
	
	stage = new Stage(canvas);
	shape = new Shape();
	stage.addChild(shape);

	drawColor = Graphics.getRGB(0,0,0);

	stage.onMouseUp = onMouseUp;
	
	quad = new QuadTree({
		x:0,
		y:0,
		width:canvas.width,
		height:canvas.height
	});
}

function onMouseUp(e)
{
	quad.insert({x:e.stageX, y:e.stageY, width:10, height:5});
	renderQuad();
	stage.update();
}

function renderQuad()
{
	var g = shape.graphics;
	g.clear();
	g.setStrokeStyle(1);
	g.beginStroke(drawColor);
	
	drawNode(quad.root);
}

function drawNode(node)
{
	var bounds = node._bounds;
	var g = shape.graphics;

	g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
	
	//console.log(node);
	var children = node.getChildren();
	var cLen = children.length;
	var childNode;
	if(cLen)
	{
		for(var j = 0; j < cLen; j++)
		{
			childNode = children[j];
			g.beginStroke(drawColor);

			g.drawRect(childNode.x, childNode.y, childNode.width, childNode.height);
			//g.drawCircle(childNode.x, childNode.y,3);
		}
	}
	
	var len = node.nodes.length;
	
	for(var i = 0; i < len; i++)
	{
		drawNode(node.nodes[i]);
	}
	
}



window.onload = init;