
class Elements{
    static h1(){return new Elements('h1')};
    static h2(){return new Elements('h2')};
    static h3(){return new Elements('h3')};
    static h4(){return new Elements('h4')};
    static h5(){return new Elements('h5')};
    static h6(){return new Elements('h6')};
    static div(){return new Elements('div')};
    static section(){return new Elements('section')};
    static footer(){return new Elements('footer')};
    static blockquote(){return new Elements('blockquote')};
    static select(){return new Elements('select')};
    static option(){return new Elements('option')};
    static button(){return new Elements('button')};
    static input(){return new Elements('input')};
    static template(){return new Elements('template')};

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
            for (let c in this._children) {
                (c instanceof Elements) ? e.appendChild(c.create()) : e.appendChild(c);
            }
        }
        return e;
    }
}

