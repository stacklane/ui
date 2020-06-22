'use strict';

class UIButton extends HTMLElement{

    connectedCallback(){
        this.setAttribute('tabindex', '0');
    }
}
window.customElements.define('ui-button', UIButton);

class UIMenuButton extends HTMLElement{

    connectedCallback(){
        this.setAttribute('tabindex', '0');
    }
}
window.customElements.define('ui-menu-button', UIMenuButton);