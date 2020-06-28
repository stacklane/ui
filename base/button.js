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

    //get stop(){ return true; }

    handle(){}
}

/**
 * For declarative actions, add child elements which extend UIButtonAction.
 *
 * For programmatic actions, use UIButton#addAction
 */
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

    addAction(callback){
        if (!this._actions) this._actions = [];
        this._actions.push(callback);
        return this;
    }

    _action(event){
        const that = this;

        for (let i = 0; i < that.childElementCount; i++){
            const c = that.children.item(i);
            if (c instanceof UIButtonAction) {
                const result = c.handle();
                //if (result && c.stop) event.stopPropagation();
            }
        }

        if (this._actions){
            for (let i = 0; i < that._actions.length; i++){
                this._actions[i](event);
            }
        }

        if (!(that instanceof UIMenuButton)){ // click event for UIMenuButton is to give it focus to display the menu
            /**
             * TBD hard to find too much guidance here.
             * Intuitively a button is usually a single action --
             * not something that you repeatedly want to perform.
             * So doesn't it make sense to blur it when the action is performed?
             * It does at least from a styling standpoint.
             */
            that.blur();
        }
    }

    connectedCallback(){
        /**
         * Use tabindex to treat this is a native <button> in the sense that
         * it is by default focusable (default focus order).
         */
        this.setAttribute('tabindex', '0');

        const that = this;

        that.addEventListener('keydown', function(event) {
            if (event.key === 'Escape')
                // Primarily for ui-menu-button, to hide the menu,
                // however makes sense for any button to be able to unfocus from keyboard.
                that.blur();
            else if (event.key == 'Enter')
                // Same as 'click'
                that._action(event);
        });

        that.addEventListener('click', function(event){ that._action(event);})
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