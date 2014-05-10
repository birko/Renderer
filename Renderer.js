var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Renderer;
(function (Renderer) {
    "use strict";
    var AbstractRenderer = (function () {
        function AbstractRenderer() {
        }
        AbstractRenderer.prototype.start = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.stop = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.animate = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.clear = function () {
            throw new Error("This method is abstract");
        };

        AbstractRenderer.prototype.draw = function () {
            throw new Error("This method is abstract");
        };
        return AbstractRenderer;
    })();
    Renderer.AbstractRenderer = AbstractRenderer;

    var CanvasRenderer = (function (_super) {
        __extends(CanvasRenderer, _super);
        function CanvasRenderer(element) {
            _super.call(this);
            this.canvas = undefined;
            this.context = undefined;
            this.animationFrame = undefined;
            this.animationFrameId = undefined;
            this.canvas = element;
            this.context = element.getContext("2d");
        }
        CanvasRenderer.prototype.start = function () {
            this.drawOutput();
        };

        CanvasRenderer.prototype.stop = function () {
            if (this.animationFrameId !== undefined) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
        };

        CanvasRenderer.prototype.setAnimationFrame = function (callback) {
            if (callback && typeof (callback) === "function") {
                this.animationFrame = callback;
            }
        };
        CanvasRenderer.prototype.drawOutput = function () {
            if (this.animationFrame && typeof (this.animationFrame) === "function") {
                this.animationFrameId = this.animationFrame(function () {
                    this.animate();
                }.bind(this));
            }
        };

        CanvasRenderer.prototype.animate = function () {
            // update
            // resize canvas if windows size has changed
            if (this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight) {
                this.context.canvas.width = this.canvas.clientWidth;
                this.context.canvas.height = this.canvas.clientHeight;
            }

            // clear
            this.clear();

            // draw stuff
            this.draw();
            this.drawOutput();
        };

        CanvasRenderer.prototype.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        return CanvasRenderer;
    })(AbstractRenderer);
    Renderer.CanvasRenderer = CanvasRenderer;
})(Renderer || (Renderer = {}));
