//自动读json，然后呈现
class AutoDetails extends HTMLDivElement{
    href:string="";
    constructor(){
        super();
        if (this.dataset.href){
            this.href = this.dataset.href;
        }
    }
    async connectedCallback(){
        if (this.dataset.href){
            fetch(this.dataset.href)
                .then(response => response.json()) // 解析 JSON 数据
                .then(data => console.log(data))   // 处理数据
                .catch(error => console.error('Error:', error)); // 错误处理
        }
    }
}
customElements.define("mengxi-autodetails", AutoDetails, {extends:"div"});