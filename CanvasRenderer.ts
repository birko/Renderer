/// <reference path="Renderer.ts" />
/// <reference path="HtmlRenderer.ts" />
module Renderer {
    "use strict";
    export interface ICanvasObject extends IHtmlObject {
        setContext(context: CanvasRenderingContext2D): ICanvasObject;
        getContext(): CanvasRenderingContext2D;
    }

    export class CanvasRenderer extends HtmlRenderer {
        private context: CanvasRenderingContext2D = undefined;

        constructor(element: HTMLCanvasElement) {
            super(element);
            this
                .setContext(this.getCanvas().getContext("2d"))
                .setRenderFunction(this.animate)
            ;
        }
        public getCanvas(): HTMLCanvasElement{
            return <HTMLCanvasElement>super.getCanvas();
        }

        public setCanvas(canvas: HTMLCanvasElement): CanvasRenderer {
            super.setCanvas(canvas);
            return this;
        }

        public getContext(): CanvasRenderingContext2D  {
            return <CanvasRenderingContext2D >this.context;
        }

        public setContext(context: CanvasRenderingContext2D): CanvasRenderer {
            this.context = context;
            return this;
        }

        public addObject(object: ICanvasObject): void {
            if (object) {
                object.setContext(this.getContext());
                super.addObject(object);
            }
        }        

        protected animate(renderer: CanvasRenderer): void {
            //asign new frame call
            renderer.drawOutput();
            // update
            // resize canvas if windows size has changed
            if (renderer.getCanvas().width !== renderer.getCanvas().clientWidth ||
                renderer.getCanvas().height !== renderer.getCanvas().clientHeight) {
                renderer.getContext().canvas.width = renderer.getCanvas().clientWidth;
                renderer.getContext().canvas.height = renderer.getCanvas().clientHeight;
            }
            // clear
            renderer.clear();
            // draw stuff
            renderer.draw(renderer.getCanvas().width, renderer.getCanvas().height);
            
        }

        public clear(): CanvasRenderer {
            this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
            return this;
        }
    }
} 