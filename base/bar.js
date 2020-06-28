/**
 * @see _bar.scss
 */
class UIBar extends HTMLElement{
    constructor() {
        super();
    }
    _cls(c){ this.classList.add(c); return this; }
    path(){return this._cls('is-path');}
    grow(){return this._cls('is-grow');}
    growEnd(){return this._cls('is-end')._cls('is-grow');}
    growEven(){return this._cls('is-even')._cls('is-grow');}
    stretch(){return this._cls('is-stretch');}
}
window.customElements.define('ui-bar', UIBar);