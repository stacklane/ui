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
    negative(){return this._cls('is-negative');}

    connectedCallback(){
        this.setAttribute('tabindex', '0');

        // TBD
        // this.setAttribute('aria-haspopup', 'true');
        // this.setAttribute('aria-controls', 'ui-menu');
        // For menus -- :focus/:focus-within to show the menu,
        // therefore Escape key should unfocus/hide menu.
        const that = this;

        that.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') that.blur();
        });

        /**
         * Pass through click event to any UIActionHandler children.
         */
        that.addEventListener('click', function(event){
            for (let i = 0; i < that.childElementCount; i++){
                const c = that.children.item(i);
                if (c instanceof UIActionHandler) c.click();
            }
        })
    }
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

class UIMenu extends HTMLElement{
    constructor() {
        super();
    }
}
window.customElements.define('ui-menu', UIMenu);