module Renderer {
    "use strict";
    export interface IRenderObject {
        x: number;
        y: number;
        z: number;
        level: number;

        draw(): void;
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
                this.renderObjects.push(object);
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
        
        moveObjects(x: number = 0, y: number = 0, z: number = 0): void {
            this.renderObjects.forEach(function (value: IRenderObject): void {
                value.x += x;
                value.y += y;
                value.z += z;
            });
            this.x += x;
            this.y += y;
            this.z += z;
        }

        static getArea(objects: Array<IRenderObject>,
            startx: number = undefined, starty: number = undefined, startz: number = undefined,
            endx: number = undefined, endy: number = undefined, endz: number = undefined
            ): Array<IRenderObject> {
            return objects.filter(function (value: IRenderObject): boolean {
                return (
                    ((startx === undefined) || (startx !== undefined && value.x >= startx)) &&
                    ((endx === undefined) || (endx !== undefined && value.x <= endx)) &&
                    ((starty === undefined) || (starty!== undefined && value.y >= starty)) &&
                    ((endy === undefined) || (endy !== undefined && value.y <= endy)) &&
                    ((startz === undefined) || (startz !== undefined && value.z >= startz)) &&
                    ((endz === undefined) || (endz !== undefined && value.z <= endz))
                );
            });
        }

        static getLevel(objects: Array<IRenderObject>, startlevel: number = undefined, endlevel:number = undefined): Array<IRenderObject> {
            return objects.filter(function (value: IRenderObject): boolean {
                return (
                    ((startlevel === undefined) || (startlevel !== undefined && value.level >= startlevel)) &&
                    ((endlevel === undefined) || (endlevel !== undefined && value.level <= endlevel))
                    );
            });
        }

        static sortRenderObjects(objects: Array<IRenderObject>): Array<IRenderObject> {
            return objects.sort(function (a: IRenderObject, b: IRenderObject): number {
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

        draw(width: number = undefined, height: number = undefined, depth: number = undefined): void {
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