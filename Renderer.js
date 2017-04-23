var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
"use strict";
var Renderer;
(function (Renderer) {
    "use strict";
    var AbstractRenderer = (function () {
        function AbstractRenderer(rednerFunction) {
            if (rednerFunction === void 0) { rednerFunction = null; }
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.renderObjects = [];
            this.animationFrame = undefined;
            this.animationFrameId = undefined;
            this.renderFunction = null;
            this
                .setX(0)
                .setY(0)
                .setZ(0)
                .setRenderObjects([])
                .setRenderFunction(rednerFunction);
        }
        AbstractRenderer.prototype.getX = function () {
            return this.x;
        };
        AbstractRenderer.prototype.setX = function (x) {
            this.x = x;
            return this;
        };
        AbstractRenderer.prototype.getY = function () {
            return this.y;
        };
        AbstractRenderer.prototype.setY = function (y) {
            this.y = y;
            return this;
        };
        AbstractRenderer.prototype.getZ = function () {
            return this.z;
        };
        AbstractRenderer.prototype.setZ = function (z) {
            this.z = z;
            return this;
        };
        AbstractRenderer.prototype.getRenderFunction = function () {
            return this.renderFunction;
        };
        AbstractRenderer.prototype.setRenderFunction = function (renderFunction) {
            if (renderFunction === void 0) { renderFunction = null; }
            this.renderFunction = renderFunction;
            return this;
        };
        AbstractRenderer.prototype.getRenderObjects = function () {
            return this.renderObjects;
        };
        AbstractRenderer.prototype.setRenderObjects = function (objects) {
            if (objects === void 0) { objects = null; }
            this.renderObjects = objects;
            return this;
        };
        AbstractRenderer.prototype.addObject = function (object) {
            if (object) {
                if (this.getRenderObjects().indexOf(object) < 0) {
                    this.renderObjects.push(object);
                }
            }
        };
        AbstractRenderer.prototype.removeObject = function (object) {
            if (object) {
                var index = this.getRenderObjects().indexOf(object);
                if (index < 0) {
                    this.renderObjects.splice(index, 1);
                }
            }
        };
        AbstractRenderer.prototype.moveObjects = function (x, y, z) {
            this.renderObjects.forEach(function (value) {
                value.move(x, y, z);
            });
            this
                .setX(this.getX() + x)
                .setY(this.getY() + y)
                .setZ(this.getZ() + z);
        };
        AbstractRenderer.prototype.start = function () {
            this.drawOutput();
            return this;
        };
        AbstractRenderer.prototype.stop = function () {
            if (this.animationFrameId !== undefined) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
            return this;
        };
        AbstractRenderer.prototype.setAnimationFrame = function (callback) {
            if (callback && typeof (callback) === "function") {
                this.animationFrame = callback;
            }
            return this;
        };
        AbstractRenderer.prototype.drawOutput = function () {
            var _this = this;
            if (this.animationFrame && typeof (this.animationFrame) === "function") {
                var exec = this.getRenderFunction();
                if (exec !== undefined && exec !== null) {
                    this.animationFrameId = this.animationFrame(function () {
                        exec(_this);
                    });
                }
            }
        };
        AbstractRenderer.prototype.draw = function (width, height, depth) {
            var objects = Renderer.AbstractRenderer.getArea(this.renderObjects, this.x, this.y, this.z, this.x + width, this.y + height, this.z + depth);
            objects = Renderer.AbstractRenderer.getLevel(objects, 0);
            objects = Renderer.AbstractRenderer.sortRenderObjects(objects);
            objects.forEach(function (value) {
                value.draw();
            });
            return this;
        };
        AbstractRenderer.prototype.clear = function () {
            throw new Error("This method is abstract");
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
                }
                else if (a.getZ() !== b.getZ()) {
                    return (a.getZ() - b.getZ());
                }
                else if (a.getY() !== b.getY()) {
                    return (a.getZ() - b.getY());
                }
                else if (a.getX() !== b.getX()) {
                    return (a.getX() - b.getX());
                }
                else {
                    return 0;
                }
            });
        };
        return AbstractRenderer;
    }());
    Renderer.AbstractRenderer = AbstractRenderer;
})(Renderer || (Renderer = {}));
"use strict";
var Renderer;
(function (Renderer) {
    "use strict";
    var HtmlRenderer = (function (_super) {
        __extends(HtmlRenderer, _super);
        function HtmlRenderer(element) {
            var _this = _super.call(this) || this;
            _this.canvas = undefined;
            _this.setRenderFunction(_this.animate);
            return _this;
        }
        HtmlRenderer.prototype.getCanvas = function () {
            return this.canvas;
        };
        HtmlRenderer.prototype.setCanvas = function (canvas) {
            this.canvas = canvas;
            return this;
        };
        HtmlRenderer.prototype.addObject = function (object) {
            if (object) {
                object.setCanvas(this.getCanvas());
                _super.prototype.addObject.call(this, object);
            }
        };
        HtmlRenderer.prototype.animate = function (renderer) {
            renderer.drawOutput();
            if (renderer.getCanvas().style.position !== "relative") {
                this.getCanvas().style.position === "relative";
            }
            renderer.clear();
            renderer.draw(renderer.getCanvas().clientWidth, renderer.getCanvas().clientHeight);
        };
        HtmlRenderer.prototype.clear = function () {
            this.getCanvas().innerHTML = "";
            return this;
        };
        return HtmlRenderer;
    }(Renderer.AbstractRenderer));
    Renderer.HtmlRenderer = HtmlRenderer;
})(Renderer || (Renderer = {}));
"use strict";
var Renderer;
(function (Renderer) {
    "use strict";
    var CanvasRenderer = (function (_super) {
        __extends(CanvasRenderer, _super);
        function CanvasRenderer(element) {
            var _this = _super.call(this, element) || this;
            _this.context = undefined;
            _this
                .setContext(_this.getCanvas().getContext("2d"))
                .setRenderFunction(_this.animate);
            return _this;
        }
        CanvasRenderer.prototype.getCanvas = function () {
            return _super.prototype.getCanvas.call(this);
        };
        CanvasRenderer.prototype.setCanvas = function (canvas) {
            _super.prototype.setCanvas.call(this, canvas);
            return this;
        };
        CanvasRenderer.prototype.getContext = function () {
            return this.context;
        };
        CanvasRenderer.prototype.setContext = function (context) {
            this.context = context;
            return this;
        };
        CanvasRenderer.prototype.addObject = function (object) {
            if (object) {
                object.setContext(this.getContext());
                _super.prototype.addObject.call(this, object);
            }
        };
        CanvasRenderer.prototype.animate = function (renderer) {
            renderer.drawOutput();
            if (renderer.getCanvas().width !== renderer.getCanvas().clientWidth ||
                renderer.getCanvas().height !== renderer.getCanvas().clientHeight) {
                renderer.getContext().canvas.width = renderer.getCanvas().clientWidth;
                renderer.getContext().canvas.height = renderer.getCanvas().clientHeight;
            }
            renderer.clear();
            renderer.draw(renderer.getCanvas().width, renderer.getCanvas().height);
        };
        CanvasRenderer.prototype.clear = function () {
            this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
            return this;
        };
        return CanvasRenderer;
    }(Renderer.HtmlRenderer));
    Renderer.CanvasRenderer = CanvasRenderer;
})(Renderer || (Renderer = {}));
//# sourceMappingURL=renderer.js.map