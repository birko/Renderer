/// <reference path="Renderer.ts" />
module Renderer {
    "use strict";
    export interface IHtmlObject extends IRenderObject {
        setCanvas(context: HTMLElement): IHtmlObject;
        getCanvas(): HTMLElement;
    }

    export class HtmlRenderer extends AbstractRenderer {
        private canvas: HTMLElement = undefined;

        constructor(element: HTMLElement) {
            super();
            this.setRenderFunction(this.animate);
        }

        public getCanvas(): HTMLElement {
            return <HTMLElement>this.canvas;
        }

        public setCanvas(canvas: HTMLElement): HtmlRenderer{
            this.canvas = canvas;
            return this;
        }

        public addObject(object: IHtmlObject): void {
            if (object) {
                object.setCanvas(this.getCanvas());
                super.addObject(object);
            }
        } 

        protected animate(renderer: HtmlRenderer): void {
            //asign new frame call
            renderer.drawOutput();
            // update
            // resize canvas if windows size has changed
            if (renderer.getCanvas().style.position !== "relative") {
                this.getCanvas().style.position === "relative";
            }
            // clear
            renderer.clear();
            // draw stuff
            renderer.draw(renderer.getCanvas().clientWidth, renderer.getCanvas().clientHeight);
        }

        public clear(): HtmlRenderer {
            this.getCanvas().innerHTML = "";
            return this;
        }
    }
}