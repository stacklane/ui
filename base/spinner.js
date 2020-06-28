
class UISpinner extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        this.innerHTML = '<div></div><div></div><div></div><div></div>';
    }
}
window.customElements.define('ui-spinner', UISpinner);