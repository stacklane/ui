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
        //this.setAttribute('aria-haspopup', 'true');
        //this.setAttribute('aria-controls', 'ui-menu');
    }
}
window.customElements.define('ui-menu-button', UIMenuButton);