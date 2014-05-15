module Renderer {
    "use strict";
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

    export class AbstractRenderer {
        public x: number;
        public y: number;
        public z: number;
        public renderObjects: Array<IRenderObject>;
        
        constructor() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.renderObjects = new Array();
        }

        addObject(object: IRenderObject): void {
            if (object) {
                if (this.renderObjects.indexOf(object) === -1) {
                    this.renderObjects.push(object);
                }
            }
        }

        removeObject(object: IRenderObject): void {
            if (object) {
                var index: number = this.renderObjects.indexOf(object);
                if (index !== -1) {
                    this.renderObjects.slice(index, 1);
                }
            }
        }
        
        moveObjects(x?: number, y?: number, z?: number): void {
            this.renderObjects.forEach(function (value: IRenderObject): void {
                value.move(x, y, z);
            });
            this.x += x;
            this.y += y;
            this.z += z;
        }

        static getArea(objects: Array<IRenderObject>,
            startx?: number, starty?: number, startz?: number, endx?: number, endy?: number, endz?: number): Array<IRenderObject> {
            return objects.filter(function (value: IRenderObject): boolean {
                return value.isInArea(startx, starty, startz, endx, endy, endz);
            });
        }

        static getLevel(objects: Array<IRenderObject>, startlevel?: number, endlevel?:number): Array<IRenderObject> {
            return objects.filter(function (value: IRenderObject): boolean {
                return value.isInLevel(startlevel, endlevel);
            });
        }

        static sortRenderObjects(objects: Array<IRenderObject>): Array<IRenderObject> {
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

        start(): void {
            throw new Error("This method is abstract");
        }

        stop(): void {
            throw new Error("This method is abstract");
        }

        clear(): void {
            throw new Error("This method is abstract");
        }

        draw(width?: number, height?: number, depth?: number): void {
            var objects: Array<IRenderObject> = Renderer.AbstractRenderer.getArea(this.renderObjects, this.x, this.y, this.z,
                this.x + width, this.y + height, this.z + depth);
            objects = Renderer.AbstractRenderer.getLevel(objects, 0);
            objects = Renderer.AbstractRenderer.sortRenderObjects(objects);

            objects.forEach(function (value: IRenderObject): void {
                value.draw();
            });
        }
    }
} 