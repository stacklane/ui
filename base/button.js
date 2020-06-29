'use strict';

/**
 * Base class for simple, declarative action handling.
 *
 * Nest as a child within a UIButton or UIIconButton.
 */
class UIButtonAction extends HTMLElement{
    constructor() {
        super();
    }

    handle(){}

    connectedCallback(){
        // CSS target for uniformly hiding:
        this.setAttribute('data-ui-button-action', 'true');
    }
}

class UIButtonMenu extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        const button = this.parentElement;
        // click event for UIMenuButton is to give it focus to display the menu
        button._blurAfterAction = false; // see UIButton
        button.setAttribute('aria-haspopup', 'true');

        // TBD..
        // button.setAttribute('aria-controls', 'ui-menu');
    }
}
window.customElements.define('ui-button-menu', UIButtonMenu);

/**
 * For declarative actions, add child elements which extend UIButtonAction.
 *
 * For programmatic actions, use UIButton#addAction
 */
class UIButton extends HTMLElement{
    constructor(text) {
        super();
        if (typeof text === 'string') this.innerText = text;
        this._blurAfterAction = true;
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

    _do(event){
        for (let i = 0; i < this.children.length; i++){
            const c = this.children.item(i);
            if (c instanceof UIButtonAction) c.handle();
        }

        if (this._actions){
            for (let i = 0; i < this._actions.length; i++)
                this._actions[i](event);
        }

        if (this._blurAfterAction){
            /**
             * TBD hard to find too much guidance here.
             * Intuitively a button is usually a single action --
             * not something that you repeatedly want to perform.
             * So doesn't it make sense to blur it when the action is performed?
             * It does at least from a styling standpoint.
             */
            this.blur();
        }
    }

    connectedCallback() {
        /**
         * Use tabindex to treat this is a native <button> in the sense that
         * it is by default focusable (default focus order).
         */
        this.setAttribute('tabindex', '0');

        const that = this;

        that.addEventListener('keydown', function (event) {
            if (event.key === 'Escape')
                // Primarily to hide UIButtonMenu,
                // however makes sense for any button to be able to unfocus from keyboard.
                that.blur();
            else if (event.key === 'Enter' || event.key === ' ') // https://www.sarasoueidan.com/blog/accessible-icon-buttons/
                // Same as 'click'
                that._do(event);
        });

        that.addEventListener('click', function (event) { that._do(event);})

        /**
         * Allow CSS to target the parent of the UIButtonAction (the UIButton containing the action).
         * However we can't test "instanceof UIButtonAction", because they are not 'connected' yet.
         * Therefore we are more broad.
         */
        {
            for (let i = 0; i < this.children.length; i++) {
                const c = this.children.item(i);
                const tagNameLower = c.tagName.toLowerCase();
                if (tagNameLower.startsWith('ui-') && !tagNameLower.startsWith('ui-icon'))
                    this.classList.add('has-' + tagNameLower);
            }
        }

        /**
         * ARIA
         *
         * https://www.sarasoueidan.com/blog/accessible-icon-buttons/
         */
        this.setAttribute('role', 'button');
        this.querySelectorAll('svg').forEach((e)=>{
            e.setAttribute('area-hidden', 'true');
            e.setAttribute('focusable', 'false');
        })
    }
}
window.customElements.define('ui-button', UIButton);

/**
 * Highly recommended to pass or define aria-label
 */
class UIIconButton extends UIButton{
    constructor(value, label) {
        super();
        if (value instanceof UIIcon){
            this.appendChild(value);
        } else if (value){
            this.appendChild(new UIIcon(value));
        }
        this._label = label;
    }
    connectedCallback() {
        if (this._label) this.setAttribute('aria-label', this._label);
    }
}
window.customElements.define('ui-icon-button', UIIconButton);
