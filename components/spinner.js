
class UISpinner extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = '<div></div><div></div><div></div><div></div>';
    }
}