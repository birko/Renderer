declare module Renderer {
    interface RenderEvent {
        (renderer: AbstractRenderer): void;
    }
    interface IRenderObject {
        getX(): number;
        getY(): number;
        getZ(): number;
        getLevel(): number;
        draw(): void;
        isInArea(startx?: number, starty?: number, startz?: number, endx?: number, endy?: number, endz?: number): boolean;
        isInLevel(startLevel?: number, endLevel?: number): boolean;
        move(x?: number, y?: number, z?: number): void;
    }
    abstract class AbstractRenderer {
        private x;
        private y;
        private z;
        private renderObjects;
        private animationFrame;
        private animationFrameId;
        private renderFunction;
        constructor(rednerFunction?: RenderEvent);
        getX(): number;
        setX(x: number): AbstractRenderer;
        getY(): number;
        setY(y: number): AbstractRenderer;
        getZ(): number;
        setZ(z: number): AbstractRenderer;
        protected getRenderFunction(): RenderEvent;
        setRenderFunction(renderFunction?: RenderEvent): AbstractRenderer;
        getRenderObjects(): IRenderObject[];
        setRenderObjects(objects?: IRenderObject[]): AbstractRenderer;
        addObject(object: IRenderObject): void;
        removeObject(object: IRenderObject): void;
        moveObjects(x?: number, y?: number, z?: number): void;
        start(): AbstractRenderer;
        stop(): AbstractRenderer;
        setAnimationFrame(callback: any): AbstractRenderer;
        protected drawOutput(): void;
        protected draw(width?: number, height?: number, depth?: number): AbstractRenderer;
        clear(): AbstractRenderer;
        static getArea(objects: IRenderObject[], startx?: number, starty?: number, startz?: number, endx?: number, endy?: number, endz?: number): IRenderObject[];
        static getLevel(objects: IRenderObject[], startlevel?: number, endlevel?: number): IRenderObject[];
        static sortRenderObjects(objects: IRenderObject[]): IRenderObject[];
    }
}
declare module Renderer {
    interface IHtmlObject extends IRenderObject {
        setCanvas(context: HTMLElement): IHtmlObject;
        getCanvas(): HTMLElement;
    }
    class HtmlRenderer extends AbstractRenderer {
        private canvas;
        constructor(element: HTMLElement);
        getCanvas(): HTMLElement;
        setCanvas(canvas: HTMLElement): HtmlRenderer;
        addObject(object: IHtmlObject): void;
        protected animate(renderer: HtmlRenderer): void;
        clear(): HtmlRenderer;
    }
}
declare module Renderer {
    interface ICanvasObject extends IHtmlObject {
        setContext(context: CanvasRenderingContext2D): ICanvasObject;
        getContext(): CanvasRenderingContext2D;
    }
    class CanvasRenderer extends HtmlRenderer {
        private context;
        constructor(element: HTMLCanvasElement);
        getCanvas(): HTMLCanvasElement;
        setCanvas(canvas: HTMLCanvasElement): CanvasRenderer;
        getContext(): CanvasRenderingContext2D;
        setContext(context: CanvasRenderingContext2D): CanvasRenderer;
        addObject(object: ICanvasObject): void;
        protected animate(renderer: CanvasRenderer): void;
        clear(): CanvasRenderer;
    }
}
