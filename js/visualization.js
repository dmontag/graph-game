function GraphVisualization(elementOrId, w, h, data) {
    'use strict';

    var color = d3.scale.category20b();

    function hash(s) {
        if (!s) {
            return 0;
        }
        for (var ret = 0, i = 0, len = s.length; i < len; i++) {
            ret = ( 31 * ret + s.charCodeAt(i) ) << 0;
        }
        return ret;
    }

    var ignore = {
        source: 1,
        target: 1,
        type: 1,
        selected: 1,
        index: 1,
        x: 1,
        y: 1,
        weight: 1,
        px: 1,
        py: 1,
        id: 1
    };

    function propertyHash(ob) {
        var ret = 0;
        for (var prop in ob) {
            if (ignore.hasOwnProperty(prop)) {
                continue;
            }
            if (ob.hasOwnProperty(prop)) {
                ret += hash(prop);
            }
        }
        return ret;
    }

    function toString(ob) {
        var ret = '';
        for (var prop in ob) {
            if (ignore.hasOwnProperty(prop)) {
                continue;
            }
            if (ob.hasOwnProperty(prop)) {
                ret += prop + ': ' + ob[prop] + ' ';
            }
        }
        return ret + 'id: ' + ob.id;
    }

    function labels(ob) {
        if (!ob.labels || ob.labels.length == 0) {
            return '';
        }
        return ':' + ob.labels.join(':') + ' ';
    }

    function title(ob) {
        function _title(ob) {
            if (ob.name) {
                return ob.name;
            }
            if (ob.title) {
                return ob.title;
            }
            for (var prop in ob) {
                if (ignore.hasOwnProperty(prop) || prop == 'labels') {
                    continue;
                }
                if (ob.hasOwnProperty(prop)) {
                    return ob[prop];
                }
            }
            return ob.id;
        }

        return labels(ob) + _title(ob);
    }


    function visualize() {

        console.log(data);

        var k = Math.sqrt(data.nodes.length / (w * h));
        var fill = d3.scale.category10();
        var select = ( typeof elementOrId === 'string' ) ? '#' + elementOrId : elementOrId;
        var vis = d3.select(select).append('svg').attr('class', 'd3-graph').attr('height', h)
            .attr('style', 'pointer-events:fill;');

        var force = d3.layout.force()
            .charge(-50 / k)
            .gravity(100 * k)
            .linkDistance(40)
            .size([w, h]);

        force
            .nodes(data.nodes)
            .links(data.links)
            .on("tick", tick)
            .start();

        // end-of-line arrow
        vis.append('svg:defs')
            .selectAll('marker')
            .data([{id:'end-marker', color:"black"}, {id:'end-marker-selected', color:"red"} ])
            .enter()
                .append('svg:marker')
                    .attr('viewBox', '0 -5 10 10')
                    .attr('refX', 27).attr('refY', 0)
                    .attr('markerWidth', 12)
                    .attr('markerHeight', 12)
                    .attr("id", function(d) {return d.id;})
                    .attr('class', 'd3-marker')
                    .attr('orient', 'auto')
                    .append('svg:path')
                        .attr('d', 'M0,-5L10,0L0,5')
                        .attr("stroke", function(d) {return d.color;})
                        .attr("fill", function(d) {return d.color;});

        var link = vis
            .selectAll('line.link')
            .data(data.links)
            .enter()
            .append('svg:line')
                .attr('class', 'd3-link')
                .attr('marker-end', function(d) { return "url(#end-marker" + (d['selected'] ? "-selected" : "") + ")";})
                .attr('x1',function (d) { return d.source.x; })
                .attr('y1',function (d) { return d.source.y; })
                .attr('x2',function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; })
                .style('stroke',function (d) { return d['selected'] ? 'red' : 'black'; });

        var node = vis
            .selectAll('g.d3-node')
            .data(data.nodes)
            .enter()
            .append('circle')
                .attr('class', 'd3-node')
                .attr('r', 20)
                .style('fill', function (d) { return d['selected'] ? 'red' : fill(d.group); })
                .style('stroke-width',function (d) { return d['selected'] ? 1 : 1; })
                .style('stroke',function (d) { return d3.rgb(fill(d.group)).darker(); })
                .call(force.drag);

        node.append('title').text(function (d) {
            return toString(d);
        }).attr('class', 'd3-text');

        var text = vis
            .append('svg:g')
            .selectAll('g')
            .data(force.nodes())
            .enter()
            .append('svg:text')
                .attr('x', 16)
                .attr('y', '-.31em')
                .attr('class', 'd3-text')
                .text(function (d) {
                    return title(d);
                });

        var pathText = vis
            .append('svg:g')
            .selectAll('g')
            .data(force.links())
            .enter()
            .append('svg:g');

        pathText
            .append('svg:text')
            .attr('class', 'd3-path-text').text(function (d) {
                return d.type;
            });

        function tick(e) {
            // Push sources up and targets down to form a weak tree.
            var k = 20 * e.alpha;
            data.links.forEach(function (d, i) {
                d.source.y -= k;
                d.target.y += k;
            });

            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            text.attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

            node.attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

            pathText.attr('transform', function (d) {
                var dx = ( d.target.x - d.source.x ), dy = ( d.target.y - d.source.y );
                var dr = Math.sqrt(dx * dx + dy * dy);
                var sinus = dy / dr;
                var cosinus = dx / dr;
                var l = d.type.length * 6;
                var offset = ( 1 - ( l / dr ) ) / 2;
                var x = ( d.source.x + dx * offset );
                var y = ( d.source.y + dy * offset );
                return 'translate(' + x + ',' + y + ') matrix(' + cosinus + ', ' + sinus + ', ' + -sinus + ', ' + cosinus
                    + ', 0 , 0)';
            });

        }

    }

    function render(id, w, h, url) {
        d3.json(url, function (data) {
            visualize(id, w, h, data);
        });
    }

    return {
        'render': render,
        'visualize': visualize
    };
}
