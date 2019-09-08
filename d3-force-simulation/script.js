
document.getElementById("myBtn").addEventListener('click', start, false);

function start() {
	var nodes = [
		{"label": "Performance", "id": 1, "r": 25},
    	{"label": "Quality", "id": 2, "r": 25},
    	{"label": "Tooling", "id": 3, "r": 25},
    	{"label": "HTTP/2", "id": 4, "r": 18},
    	{"label": "ES6", "id": 5, "r": 18},
    	{"label": "Galen", "id": 6, "r": 18},
    	{"label": "Unit Test", "id": 7, "r": 18},
    	{"label": "Sample App", "id": 8, "r": 18},
    	{"label": "CommandLine", "id": 9, "r": 18},
    	{"label": "Secure", "id": 10},
    	{"label": "Parallel Requests", "id": 11},
    	{"label": "Faster Apps", "id": 12},
    	{"label": "More Responsive", "id": 13},
    	{"label": "Developer Engagement", "id": 14},
    	{"label": "Lighter Apps", "id": 15},
    	{"label": "Better Symantics", "id": 16},
    	{"label": "Pixel Perfect UI", "id": 17},
    	{"label": "Less UI Bugs", "id": 18},
    	{"label": "DIT Integration", "id": 19},
    	{"label": "Correct Functions", "id": 20},
    	{"label": "Better Units", "id": 21},
    	{"label": "Less Regressions", "id": 22},
    	{"label": "Less Function Bugs", "id": 23},
    	{"label": "Easier Integration", "id": 24},
    	{"label": "Helps Mobile Customer", "id": 25},
    	{"label": "Better Sales", "id": 26},
    	{"label": "Breaks Stereotypes", "id": 27},
    	{"label": "Helps Developers", "id": 28},
    	{"label": "Debug Mobile Apps", "id": 29},
    	{"label": "Less Mobile Bugs", "id": 30},
    ];

	var links = [
		{"source": 0, "target": 1},
		{"source": 1, "target": 2},
		{"source": 0, "target": 3},
		{"source": 0, "target": 4},
		{"source": 1, "target": 5},
		{"source": 1, "target": 6},
		{"source": 2, "target": 7},
		{"source": 2, "target": 8},
		{"source": 9, "target": 3},
		{"source": 10, "target": 3},
		{"source": 11, "target": 3},
		{"source": 12, "target": 3},
		{"source": 13, "target": 4},
		{"source": 14, "target": 4},
		{"source": 15, "target": 4},
		{"source": 16, "target": 5},
		{"source": 17, "target": 5},
		{"source": 18, "target": 5},
		{"source": 19, "target": 6},
		{"source": 20, "target": 6},
		{"source": 21, "target": 6},
		{"source": 21, "target": 5},
		{"source": 22, "target": 6},
		{"source": 23, "target": 7},
		{"source": 24, "target": 7},
		{"source": 25, "target": 7},
		{"source": 26, "target": 8},
		{"source": 27, "target": 8},
		{"source": 28, "target": 8},
		{"source": 29, "target": 8}
	];

	var width = 1160,
	    height = 700;
	var svg = d3.select('#container').append('svg')
				.attr("width", width)
				.attr("height", height);

	var simulation = d3.forceSimulation(nodes)
				  .force('charge', d3.forceManyBody().strength(-400))
				  .force('center',  d3.forceCenter(width / 2, height / 2))
				  .force('link', d3.forceLink().distance(5).strength(0.1))
				  .force("collide", d3.forceCollide())
				  .force("y", d3.forceY(200))
        		  .force("x", d3.forceX(200))
				  .on('tick', ticked);
  	simulation.force("link").links(links);

  	var link = svg.append('g')
  	   .attr('class', 'links')
  	   .selectAll('line')
  	   .data(links)
  	   .enter()
  	   .append('line')
  	   .attr('class', 'link');

	   	var node = svg.append('g')
	   		.attr('class', "nodes")
	   		.selectAll('circle')
	   		.data(nodes)
	   		.enter()
	   		.append('circle')
	   		.attr('class', function(d) {
	   			if(d.r === 25) {
	   				return "node node-a";
	   			} else if(d.r === 18) {
	   				return "node node-b";
	   			} else {
	   				return "node node-c";
	   			}
	   		})
	   		.attr('r', function(d) {
	   			if(d.r) {
	   				return d.r;
	   			} else {
	   				return 10;
	   			}
	   		})
	   		.attr('cursor', 'pointer')
	   		.call(d3.drag()
	   		          .on("start", dragstarted)
	   		          .on("drag", dragged)
	   		          .on("end", dragended));

		var text = svg.append('g')
			.attr('class', 'texts')
			.selectAll('text')
			.data(nodes)
			.enter()
			.append('text')
			.attr('class', 'text')
			.attr('cursor', 'pointer')
			.text(function(d) {return d.label})
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'middle')
			.call(d3.drag()
			          .on("start", dragstarted)
			          .on("drag", dragged)
			          .on("end", dragended));

	function dragstarted(d) {
	  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

  	function ticked() {
  		link
  			.attr("x1", function(d) {return d.source.x;  })
  			.attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) {return d.x;})
        	.attr("cy", function(d) {return d.y});

    	text.attr('dx', function(d) {return d.x;})
    		.attr('dy', function(d) {return d.y;});
  	}
}
//start();
