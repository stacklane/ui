'use strict';

class UIButton extends HTMLElement{

    constructor(text) {
        super();
        if (typeof text === 'string') {
            this.innerText = text;
        }
    }

    connectedCallback(){
        this.setAttribute('tabindex', '0');
    }

}
window.customElements.define('ui-button', UIButton);

class UIMenuButton extends HTMLElement{

    constructor() {
        super();
    }

    /**
     * Uses :focus/:focus-within to show the menu, therefore Escape key should unfocus/hide menu.
     */
    _esc(event){
        this.blur();
        event.preventDefault();
    }

    connectedCallback(){
        this.setAttribute('tabindex', '0');
        //this.setAttribute('aria-haspopup', 'true');
        //this.setAttribute('aria-controls', 'ui-menu');
        const that = this;
        this.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') that._esc(event);
        });
    }
}
window.customElements.define('ui-menu-button', UIMenuButton);

class UIMenu extends HTMLElement{
    constructor() {
        super();
    }
}
window.customElements.define('ui-menu', UIMenu);