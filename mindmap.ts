//思维导图，我想做成兼顾紧凑和信息展示的那种







async function fetchFile(dest:string):Promise<Blob | null>{//从服务器要东西
    var response = await fetch(dest);
    if (response.ok){
        var raw = response.blob();
        return raw;
    }
    return null;
}






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
        this.dpiScale = window.devicePixelRatio
        this.pixelPerfect();

    }
    pixelPerfect(){
        this.style.width = this.width.toString + "px";
        this.style.height = this.height.toString + "px";
        this.width = Math.floor(this.width * this.dpiScale)
        this.height = Math.floor(this.height * this.dpiScale)
        this.canvasContext.scale(this.dpiScale,this.dpiScale)
    }
}

interface interactableObj{//人可以与之互动的东西

}
interface GraphObj extends interactableObj{
    visible:Boolean;//可视性
    content:any;//将显示的内容
}

class MindMap extends Graph{//思维导图
    static observedAttributes = ["devicePixelRatio", "size"];
    XMLDoc:Document;
    XMLRaw:string = ""
    contents: any;
    href:string="";
    constructor(){//构造函数
        super();
        var acanvas = this.getContext("2d");
        if (!acanvas || !(acanvas instanceof CanvasRenderingContext2D)){
            throw new Error('Failed to get 2D context');
        }
        else{this.canvasContext = acanvas}
        this.XMLDoc = new Document();
        
        this.dpiScale = window.devicePixelRatio;
        this.pixelPerfect()

        console.log(this.dataset.href);
        
        
    }
        
    async connectedCallback(){
        if (this.dataset.href){
            this.href = this.dataset.href;
            await this.fetchMMFile();
            await this.loadMMXML(this.XMLRaw);
        }
        else{
            this.rootObj = new MindMapObj("空导图")
        }


        //测试图样
        var acanvas = this.canvasContext
        acanvas.strokeRect(1,1,100,100)
        acanvas.font = "12px serif"
        acanvas.fillText(this.XMLRaw,-10000,100)
        acanvas.moveTo(0,0)
        acanvas.lineTo(600,400)
        acanvas.moveTo(0,0)
        acanvas.lineTo(400,600)
        acanvas.stroke()
    }
    async fetchMMFile(){
        var fileBlob = await fetchFile(this.href) || new Blob();
        this.XMLRaw = await fileBlob.text();
        
    }
    async loadMMXML(mm:string){//读freemind的mm(XML)
        var parse = new DOMParser();
        this.XMLDoc = parse.parseFromString(this.XMLRaw,"application/xml")
        
    }
    
    rootObj:MindMapObj = new MindMapObj("");
}
customElements.define("mengxi-mindmap", MindMap, {extends:"canvas"});

class MindMapObj implements GraphObj{
    position:[number,number] = [0,0];
    children:MindMapObj[] = [];//小孩(bushi)子级
    //connectors:MindMapConnector[] = [];//指示关系用的连接符
    visible=false;//可见性
    content;
    constructor(content:String){
        this.content = content;
    }
}