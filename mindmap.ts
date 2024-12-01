//思维导图，我想做成兼顾紧凑和信息展示的那种
class Graph extends HTMLCanvasElement{//图

    static observedAttributes = ["devicePixelRatio", "size"];
    dpiScale:number
    contents:any
    canvasContext:CanvasRenderingContext2D;
    constructor(){//
        super();
        var acanvas = this.getContext("2d");
        if (!acanvas || !(acanvas instanceof CanvasRenderingContext2D)){
            throw new Error('Failed to get 2D context');
        }
        else{this.canvasContext = acanvas}

        this.dpiScale = window.devicePixelRatio;
    }
    pixelPerfect(){
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";
        this.width = Math.floor(this.width * this.dpiScale)
        this.height = Math.floor(this.height * this.dpiScale)
    }
}
interface GraphObj{
    visible:Boolean;//可视性
    content:any;//将显示的内容
}

class MindMap extends Graph{//思维导图
    static observedAttributes = ["devicePixelRatio", "size"];
    contents: any;
    canvasContext:CanvasRenderingContext2D;
    constructor(){//
        super();
        var acanvas = this.getContext("2d");
        if (!acanvas || !(acanvas instanceof CanvasRenderingContext2D)){
            throw new Error('Failed to get 2D context');
        }
        else{this.canvasContext = acanvas}
        this.rootObj = new MindMapObj("空导图")
        
        this.dpiScale = window.devicePixelRatio;
        this.pixelPerfect()
    }
        
    connectedCallback(){
        var acanvas = this.getContext("2d");
        if (!acanvas || !(acanvas instanceof CanvasRenderingContext2D)){
            throw new Error('Failed to get 2D context');
        }
        else{this.canvasContext = acanvas}
        acanvas.font="48px serif";
        acanvas.fillText("canvas可以用，好欸！",0,48)    
    }
    read_MM_XML(mm:XMLDocument){//读freemind的mm(XML)
        
    }
    
    rootObj:MindMapObj
}
customElements.define("mengxi-mindmap", MindMap, {extends:"canvas"});

class MindMapObj implements GraphObj{
    position:[number,number] = [0,0];
    children:MindMapObj[] = [];//小孩
    connectors:MindMapConnector[] = [];//连接符
    visible=false;
    content;
    constructor(content:String){
        this.content = content;
    }
}
class MindMapConnector implements GraphObj{
    content=null;
    visible=false;

}