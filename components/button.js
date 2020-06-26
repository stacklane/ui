'use strict';

class UIButton extends HTMLElement{
    constructor(text) {
        super();
        if (typeof text === 'string') {
            this.innerText = text;
        }
    }

    _cls(c){ this.classList.add(c); return this; }

    fullWidth(){return this._cls('is-full-width');}
    justifyLeft(){return this._cls('is-justify-left');}
    outlined(){return this._cls('is-outlined');}
    contained(){return this._cls('is-contained');}
    round(){return this._cls('is-round');}
    primary(){return this._cls('is-primary');}
    connectedCallback(){this.setAttribute('tabindex', '0');}
}
window.customElements.define('ui-button', UIButton);

class UIIconButton extends UIButton{
    constructor(value) {
        super();
        if (value instanceof UIIcon){
            this.appendChild(value);
        } else if (value){
            this.appendChild(new UIIcon(value));
        }
    }
}
window.customElements.define('ui-icon-button', UIIconButton);

class UIMenuButton extends UIButton{

    constructor(text) {
        super(text);
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