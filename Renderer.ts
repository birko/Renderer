module Renderer {
    "use strict";

    export interface RenderEvent {
        (renderer: AbstractRenderer): void;
    }

    export interface IRenderObject {
        getX(): number;
        getY(): number;
        getZ(): number;
        getLevel(): number;
        draw(): void;
        isInArea(startx?: number, starty?: number, startz?: number, endx?: number, endy?: number, endz?: number): boolean;
        isInLevel(startLevel?: number, endLevel?: number): boolean;
        move(x?: number, y?: number, z?: number): void;
    }

    export abstract class AbstractRenderer {
        private x: number = 0;
        private y: number = 0;
        private z: number = 0;
        private renderObjects: IRenderObject[] = [];
        private animationFrame: any = undefined;
        private animationFrameId: number = undefined;
        private renderFunction: RenderEvent = null;


        constructor(rednerFunction: RenderEvent = null) {
            this
                .setX(0)
                .setY(0)
                .setZ(0)
                .setRenderObjects([])
                .setRenderFunction(rednerFunction);
        }

        public getX(): number {
            return this.x;
        }

        public setX(x: number): AbstractRenderer {
            this.x = x;
            return this;
        }

        public getY(): number {
            return this.y;
        }

        public setY(y: number): AbstractRenderer {
            this.y = y;
            return this;
        }

        public getZ(): number {
            return this.z;
        }

        public setZ(z: number): AbstractRenderer {
            this.z = z;
            return this;
        }

        protected getRenderFunction(): RenderEvent {
            return this.renderFunction
        }

        public setRenderFunction(renderFunction: RenderEvent = null): AbstractRenderer {
            this.renderFunction = renderFunction;
            return this;
        }

        public getRenderObjects(): IRenderObject[] {
            return this.renderObjects;
        }

        public setRenderObjects(objects: IRenderObject[] = null): AbstractRenderer {
            this.renderObjects = objects;
            return this;
        }


        public addObject(object: IRenderObject): void {
            if (object) {
                if (this.getRenderObjects().indexOf(object) <0) {
                    this.renderObjects.push(object);
                }
            }
        }

        public removeObject(object: IRenderObject): void {
            if (object) {
                var index: number = this.getRenderObjects().indexOf(object);
                if (index < 0) {
                    this.renderObjects.splice(index, 1);
                }
            }
        }
        
        public moveObjects(x?: number, y?: number, z?: number): void {
            this.renderObjects.forEach(function (value: IRenderObject): void {
                value.move(x, y, z);
            });
            this
                .setX(this.getX() + x)
                .setY(this.getY() + y)
                .setZ(this.getZ() + z)
        }

        public start(): AbstractRenderer{
            this.drawOutput();
            return this;
        }

        public stop(): AbstractRenderer {
            if (this.animationFrameId !== undefined) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
            return this;
        }

        public setAnimationFrame(callback: any): AbstractRenderer {
            if (callback && typeof (callback) === "function") {
                this.animationFrame = callback;
            }
            return this;
        }

        protected drawOutput(): void {
            if (this.animationFrame && typeof (this.animationFrame) === "function") {
                var exec = this.getRenderFunction();
                if (exec !== undefined && exec !== null) {
                    this.animationFrameId = this.animationFrame(() => {
                        exec(this);
                    });
                }
            }
        }

        protected draw(width?: number, height?: number, depth?: number): AbstractRenderer {
            var objects: IRenderObject[] = Renderer.AbstractRenderer.getArea(this.renderObjects, this.x, this.y, this.z,
                this.x + width, this.y + height, this.z + depth);
            objects = Renderer.AbstractRenderer.getLevel(objects, 0);
            objects = Renderer.AbstractRenderer.sortRenderObjects(objects);

            objects.forEach(function (value: IRenderObject): void {
                value.draw();
            });
            return this;
        }

        public clear(): AbstractRenderer {
            throw new Error("This method is abstract");
        }

        ///static methods
        static getArea(objects: IRenderObject[],
            startx?: number, starty?: number, startz?: number, endx?: number, endy?: number, endz?: number): IRenderObject[] {
            return objects.filter(function (value: IRenderObject): boolean {
                return value.isInArea(startx, starty, startz, endx, endy, endz);
            });
        }

        static getLevel(objects: IRenderObject[], startlevel?: number, endlevel?: number): IRenderObject[] {
            return objects.filter(function (value: IRenderObject): boolean {
                return value.isInLevel(startlevel, endlevel);
            });
        }

        static sortRenderObjects(objects: IRenderObject[]): IRenderObject[] {
            return objects.sort(function (a: IRenderObject, b: IRenderObject): number {
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
        }

    }
} 