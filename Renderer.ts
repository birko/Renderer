module Renderer {
    "use strict";
    export class AbstractRenderer {
        start(): void {
            throw new Error("This method is abstract");
        }

        stop(): void {
            throw new Error("This method is abstract");
        }

        animate(): void {
            throw new Error("This method is abstract");
        }

        clear(): void {
            throw new Error("This method is abstract");
        }

        draw(): void {
            throw new Error("This method is abstract");
        }
    }

    export class CanvasRenderer extends AbstractRenderer {
        public canvas: HTMLCanvasElement = undefined;
        public context: CanvasRenderingContext2D = undefined;
        private animationFrame: any = undefined;
        private animationFrameId: number = undefined;

        constructor(element: HTMLCanvasElement) {
            super();
            this.canvas = element;
            this.context = element.getContext("2d");
        }

        start():void {
            this.drawOutput();
        }

        stop():void {
            if (this.animationFrameId !== undefined) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
        }

        setAnimationFrame(callback: any):void {
            if (callback && typeof (callback) === "function") {
                this.animationFrame = callback;
            }
        }
        private drawOutput():void {
            if (this.animationFrame && typeof (this.animationFrame) === "function") {
                this.animationFrameId = this.animationFrame(function ():void { this.animate(); }.bind(this));
            }
        }

        animate():void {
            // update
            // resize canvas if windows size has changed
            if (this.canvas.width !== this.canvas.clientWidth ||
                this.canvas.height !== this.canvas.clientHeight) {
                this.context.canvas.width = this.canvas.clientWidth;
                this.context.canvas.height = this.canvas.clientHeight;
            }
            // clear
            this.clear();
            // draw stuff
            this.draw();
            this.drawOutput();
        }

        clear():void {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
} 