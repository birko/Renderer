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
                if (this.renderObjects.indexOf(object) === -1) {
                    this.renderObjects.push(object);
                }
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
            this.renderObjects.forEach(function (value) {
                value.move(x, y, z);
            });
            this.x += x;
            this.y += y;
            this.z += z;
        };

        AbstractRenderer.getArea = function (objects, startx, starty, startz, endx, endy, endz) {
            return objects.filter(function (value) {
                return value.isInArea(startx, starty, startz, endx, endy, endz);
            });
        };

        AbstractRenderer.getLevel = function (objects, startlevel, endlevel) {
            return objects.filter(function (value) {
                return value.isInLevel(startlevel, endlevel);
            });
        };

        AbstractRenderer.sortRenderObjects = function (objects) {
            return objects.sort(function (a, b) {
                if (a.getLevel() !== b.getLevel()) {
                    return (a.getLevel() - b.getLevel());
                } else if (a.getZ() !== b.getZ()) {
                    return (a.getZ() - b.getZ());
                } else if (a.getY() !== b.getY()) {
                    return (a.getZ() - b.getY());
                } else if (a.getX() !== b.getX()) {
                    return (a.getX() - b.getX());
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
