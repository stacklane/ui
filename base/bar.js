/**
 * @see _bar.scss
 */
class UIBar extends HTMLElement{
    constructor(elements) {
        super();
        if (typeof elements === 'string'){
            this.appendChild(Elements.span().text(elements).create());
        } else if (elements instanceof HTMLElement) {
            this.appendChild(elements);
        } else if (elements instanceof Array){
            for (let i = 0; i < elements.length; i++) {
                if (typeof elements[i] === 'string') {
                    this.appendChild(Elements.span().text(elements[i]).create());
                } else {
                    this.appendChild(elements[i]);
                }
            }
        }
    }
    _cls(c){ this.classList.add(c); return this; }
    path(){return this._cls('is-path');}
    grow(){return this._cls('is-grow');}
    growEnd(){return this._cls('is-end')._cls('is-grow');}
    growEven(){return this._cls('is-even')._cls('is-grow');}
    stretch(){return this._cls('is-stretch');}
}
window.customElements.define('ui-bar', UIBar);

class UISideBar extends HTMLElement {
    constructor(elements) {
        super();
        if (typeof elements === 'string'){
            this.appendChild(Elements.span().text(elements).create());
        } else if (elements instanceof HTMLElement) {
            this.appendChild(elements);
        } else if (elements instanceof Array){
            for (let i = 0; i < elements.length; i++) this.appendChild(elements[i]);
        }
    }
}
window.customElements.define('ui-sidebar', UISideBar);

class UIAppBar extends HTMLElement {
    constructor() {super();}
}
window.customElements.define('ui-appbar', UIAppBar);
