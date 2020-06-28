/**
 * Base class for simple, declarative action handling.
 */
class UIActionHandler extends HTMLElement{
    constructor() {
        super();
    }

    click(){}
}

class UIIcon extends HTMLElement{
    // Un-opinionated 45 degree crossed lines.
    static x(){
        return new UIIcon('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>');
    }
    // Un-opinionated crossed lines.
    static plus(){
        return new UIIcon('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>');
    };

    constructor(string) {
        super();
        if (!string) {
            // Ignore, may be constructed directly from HTML
        } else if (string.indexOf("<svg") === 0){
            this.innerHTML = string;
        } else if ([...string].length == 1){ // actual character count (for emoji), via MDN
            this.innerText = string;
        } else {
            throw string;
        }
    }
}
window.customElements.define('ui-icon', UIIcon);

/**
 * Low-level utility for building elements/nodes.
 */
class Elements{
   // static ui(name){return new Elements('ui-' + name)};
    static h1(){return new Elements('h1')};
    static h2(){return new Elements('h2')};
    static h3(){return new Elements('h3')};
    static h4(){return new Elements('h4')};
    static h5(){return new Elements('h5')};
    static h6(){return new Elements('h6')};
    static div(){return new Elements('div')};
    static span(){return new Elements('span')};
    static section(){return new Elements('section')};
    static footer(){return new Elements('footer')};
    static blockquote(){return new Elements('blockquote')};
    static select(){return new Elements('select')};
    static option(){return new Elements('option')};
    static button(){return new Elements('button')};
    static input(){return new Elements('input')};
    static template(){return new Elements('template')};
    static ul(){return new Elements('ul')};
    static li(){return new Elements('li')};

    constructor(name){
        this._name = name;
    }

    attr(name, value){
        if (!this._attr) this._attr = {};
        this._attr[name] = value;
        return this;
    }

    classes(...classes){
        this._classes = classes;
        return this;
    }

    html(html){
        this._html = html;
        return this;
    }

    text(text){
        this._text = text;
        return this;
    }

    child(child){
        if (!this._children) this._children = [];
        this._children.push(child);
        return this;
    }

    create(){
        const e = document.createElement(this._name);
        if (this._text) e.innerText = this._text;
        if (this._html) e.innerHTML = this._html;
        if (this._classes) {
            (typeof this._classes === 'string') ?
                e.classList.add(this._classes) : e.classList.add(...this._classes);
        }
        if (this._attr){
            for (let name in this._attr) e.setAttribute(name, this._attr[name]);
        }
        if (this._children){
            this._children.forEach(
                (c)=>(c instanceof Elements) ? e.appendChild(c.create()) : e.appendChild(c)
            );
        }
        return e;
    }
}