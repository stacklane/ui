'use strict';

class UIButton extends HTMLElement{

    connectedCallback(){
        this.setAttribute('tabindex', '0');
    }
}
window.customElements.define('ui-button', UIDialog);

class UIMenuButton extends HTMLElement{

    connectedCallback(){
        this.setAttribute('tabindex', '0');
    }
}
window.customElements.define('ui-menu-button', UIDialog);