'use strict';

/**
 * Base class for simple, declarative action handling.
 *
 * Nest as a child within a UIButton.
 */
class UIButtonAction extends HTMLElement{
    constructor() {
        super();
    }

    get stop(){ return true; }

    handle(){}
}

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
        /**
         * Use tabindex to treat this is a native <button> in the sense that
         * it is by default focusable (default focus order).
         */
        this.setAttribute('tabindex', '0');

        const that = this;

        /**
         * Primarily for ui-menu-button, to hide the menu,
         * however makes sense for any button to be able to unfocus from keyboard.
         */
        that.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') that.blur();
        });

        /**
         * Pass through click event to any UIActionHandler children.
         *
         * TODO what about Enter key?
         */
        that.addEventListener('click', function(event){
            for (let i = 0; i < that.childElementCount; i++){
                const c = that.children.item(i);
                if (c instanceof UIButtonAction) {
                    const result = c.handle();
                    if (result && c.stop) event.stopPropagation();
                }
            }
            if (!(that instanceof UIMenuButton)){
                /**
                 * TBD hard to find too much guidance here.
                 * Intuitively a button is usually a single action --
                 * not something that you repeatedly want to perform.
                 * So doesn't it make sense to blur it when the action is performed?
                 * It does at least from a styling standpoint.
                 */
                that.blur();
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

class UIMenuButton extends UIButton{
    constructor() { super();}

    connectedCallback() {
        super.connectedCallback();

        // const that = this;

        // TBD
        // this.setAttribute('aria-haspopup', 'true');
        // this.setAttribute('aria-controls', 'ui-menu');
    }
}
window.customElements.define('ui-menu-button', UIMenuButton);

class UIMenu extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-menu', UIMenu);