var Renderer;
(function (Renderer) {
    "use strict";

    var AbstractRenderer = (function () {
        function AbstractRenderer() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.renderObjects = new Array();
        }
        AbstractRenderer.prototype.addObject = function (object) {
            if (object) {
                this.renderObjects.push(object);
            }
        };

        AbstractRenderer.prototype.removeObject = function (object) {
            if (object) {
                var index = this.renderObjects.indexOf(object);
                if (index !== -1) {
                    this.renderObjects.slice(index, 1);
                }
            }
        };

        AbstractRenderer.prototype.moveObjects = function (x, y, z) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof z === "undefined") { z = 0; }
            this.renderObjects.forEach(function (value) {
                value.x += x;
                value.y += y;
                value.z += z;
            });
            this.x += x;
            this.y += y;
            this.z += z;
        };

        AbstractRenderer.getArea = function (objects, startx, starty, startz, endx, endy, endz) {
            if (typeof startx === "undefined") { startx = undefined; }
            if (typeof starty === "undefined") { starty = undefined; }
            if (typeof startz === "undefined") { startz = undefined; }
            if (typeof endx === "undefined") { endx = undefined; }
            if (typeof endy === "undefined") { endy = undefined; }
            if (typeof endz === "undefined") { endz = undefined; }
            return objects.filter(function (value) {
                return (((startx === undefined) || (startx !== undefined && value.x >= startx)) && ((endx === undefined) || (endx !== undefined && value.x <= endx)) && ((starty === undefined) || (starty !== undefined && value.y >= starty)) && ((endy === undefined) || (endy !== undefined && value.y <= endy)) && ((startz === undefined) || (startz !== undefined && value.z >= startz)) && ((endz === undefined) || (endz !== undefined && value.z <= endz)));
            });
        };

        AbstractRenderer.getLevel = function (objects, startlevel, endlevel) {
            if (typeof startlevel === "undefined") { startlevel = undefined; }
            if (typeof endlevel === "undefined") { endlevel = undefined; }
            return objects.filter(function (value) {
                return (((startlevel === undefined) || (startlevel !== undefined && value.level >= startlevel)) && ((endlevel === undefined) || (endlevel !== undefined && value.level <= endlevel)));
            });
        };

        AbstractRenderer.sortRenderObjects = function (objects) {
            return objects.sort(function (a, b) {
                if (a.level !== b.level) {
                    return (a.level - b.level);
                } else if (a.x !== b.x) {
                    return (a.x - b.x);
                } else if (a.y !== b.y) {
                    return (a.y - b.y);
                } else if (a.z !== b.z) {
                    return (a.z - b.z);
                } else {
                    return 0;
                }
            });
        };

        AbstractRenderer.prototype.start = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.stop = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.clear = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.draw = function (width, height, depth) {
            if (typeof width === "undefined") { width = undefined; }
            if (typeof height === "undefined") { height = undefined; }
            if (typeof depth === "undefined") { depth = undefined; }
            var objects = Renderer.AbstractRenderer.getArea(this.renderObjects, this.x, this.y, this.z, this.x + width, this.y + height, this.z + depth);
            objects = Renderer.AbstractRenderer.getLevel(objects, 0);
            objects = Renderer.AbstractRenderer.sortRenderObjects(objects);

            objects.forEach(function (value) {
                value.draw();
            });
        };
        return AbstractRenderer;
    })();
    Renderer.AbstractRenderer = AbstractRenderer;
})(Renderer || (Renderer = {}));
//# sourceMappingURL=Renderer.js.map
