var modelVizInstanceCounter = 0;
function ModelViz(settings, parent, model) {

    var instance = modelVizInstanceCounter++;

    var scale = d3.scale.category10();

    var force = d3.layout.force()
        .charge(settings.forceCharge)
        .linkDistance(settings.forceDistance)
        .on("tick", tick)
        .size([settings.width, settings.height]);

    var svg = d3.select(parent || "body").append("svg");
        // .attr("width", settings.width)
        // .attr("height", settings.height);
    var linkGroup = svg.append("g").attr("class", "links");
    var nodeGroup = svg.append("g").attr("class", "nodes");
    var legendGroup = svg.append("g").attr("class", "legend");

    var link, node, text, legend;

    svg.append('svg:defs')
        .append('svg:marker')
            .attr('viewBox', '0 -4 10 10')
            .attr('refX', 25).attr('refY', 0)
            .attr('markerWidth', 7)
            .attr('markerHeight', 7)
            .attr("id", "end-marker-" + instance)
            .attr('orient', 'auto')
            .append('svg:path')
                .attr('d', 'M0,-4L10,0L0,4')
                .attr('class', 'arrowhead');

    prepareModel(model);

    function prepareModel(m) {
        m.links.forEach(function(l) {
            l.source = m.nodes[l.source];
            l.target = m.nodes[l.target];
        });
    }

    function update() {

        var nodes = model.nodes.filter(function(n) {return n._visible;});
        var links = model.links.filter(function(l) {
            return l.source._expanded || l.target._expanded;
        });

        force
            .nodes(nodes)
            .links(links)
            .start();

        link = linkGroup.selectAll(".link")
            .data(links);
        link.enter().append("line")
            .attr("class", "link")
            .attr('marker-end', "url(#end-marker-" + instance + ")");
        link.exit().remove();

        node = nodeGroup.selectAll(".node")
            .data(nodes)
            .style("fill", nodeColor)
            .style("stroke-dasharray", strokeDasharray);
        node.enter()
            .append("circle")
                .attr("class", "node")
                .attr("r", settings.nodeRadius)
                .style("fill", nodeColor)
                .style("stroke-dasharray", strokeDasharray)
                .on("click", expand)
                .call(force.drag);
        node.exit().remove();

        text = nodeGroup.selectAll(".text")
            .data(nodes)
            .text(function (d) { return d.name; });
        text.enter()
            .append("text")
                .attr("class", "text")
                .text(function (d) { return d.name; });
        text.exit().remove();

        legend = legendGroup.selectAll(".legend")
            .data(model.labels);
        legend.enter().append("circle")
                .attr("class", "node")
                .attr("r", settings.nodeRadius)
                .attr("cx", settings.nodeRadius*2)
                .attr("cy", function(d, i) { return settings.nodeRadius*2 + (i) * settings.nodeRadius*3; })
                .style("fill", legendColor);
        legend.enter()
                .append("text")
                .attr("x", settings.nodeRadius*4)
                .attr("y", function(d, i) { return settings.nodeRadius*2.5 + (i) * settings.nodeRadius*3; })
                .text(function(d) { return d; });

    }

    function expand(node) {
        if (node._expanded === true) return;
        node._expanded = true;
        getNeighborLinks(node).forEach(function(link) {
            show(getOtherNode(node, link));
        });
        update();
    }

    function show(node) {
        node._visible = true;
        var neighbors = getNeighborNodes(node);
        var numExpandedNeighbors = neighbors.filter(function(node) { return node._expanded; }).length;
        if (neighbors.length == numExpandedNeighbors) {
            node._expanded = true;
        }
    }

    function getNeighborLinks(node) {
        return model.links.filter(function(link) {
            return nodeHasLink(node, link);
        });
    }

    function getNeighborNodes(node) {
        return getNeighborLinks(node).map(function (link) {
            return getOtherNode(node, link);
        });
    }

    function nodeHasLink(node, link) {
        return getOtherNode(node, link) !== null;
    }

    function getOtherNode(node, link) {
        if (link.source === node) return link.target;
        if (link.target === node) return link.source;
        return null;
    }

    function nodeColor(d) {
        return scale(d.label)
    }

    function legendColor(d) {
        return scale(d)
    }

    function strokeDasharray(d) {
        return d._expanded ? "0" : "2.5";
    }

    function tick(e) {
        if (model.style == "tree") {
            var k = 20 * e.alpha;
            model.links.forEach(function (d, i) {
                d.source.y -= k;
                d.target.y += k;
            });
        }

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        text.attr("x", function(d) { return d.x + settings.textOffsetX; })
            .attr("y", function(d) { return d.y + settings.textOffsetY; });
    }

    update();

    function destroy() {
        force.stop();
        svg.remove();
    }

    return {
        destroy: destroy
    }
}