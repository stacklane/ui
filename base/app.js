'use strict';

// Un-opinionated 45 degree crossed lines:
const _UI_ICON_SVG_X = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
// Un-opinionated crossed lines:
const _UI_ICON_SVG_PLUS = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
// Un-opinionated 3 horizontal lines, e.g. hamburger:
const _UI_ICON_SVG_MENU = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
const _UI_ICON_SVG_MENU_CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/></svg>';

class UISkeleton extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-skeleton', UISkeleton);

class UISkeletons extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        const n = this.getAttribute('count');
        const nodes = this.childNodes;
        const result = [];
        for (let i = 0; i < n; i++) {
            for (let z = 0; z < nodes.length; z++){
                result.push(nodes[z].cloneNode(true));
            }
        }
        this.replaceWith(...result);
    }
}
window.customElements.define('ui-skeletons', UISkeletons);

class UIBox extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-box', UIBox);

class UISpinner extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        this.innerHTML = '<div></div><div></div><div></div><div></div>';
    }
    activated(){
        this.classList.add('is-activated');
        return this;
    }
}
window.customElements.define('ui-spinner', UISpinner);

/**
 * May be subclassed.
 */
class UIScrollable extends HTMLElement{
    constructor(type) {
        super();
        this._type = type;
    }
    connectedCallback(){
        this.classList.add('ui-scrollable');
        switch (this._type){
            case 'x':{this.classList.add('is-x'); break;}
            case 'xy':{this.classList.add('is-xy'); break;}
            default:{this.classList.add('is-y'); break;}
        }
    }
}
window.customElements.define('ui-scrollable', UIScrollable);

class UIIcon extends HTMLElement{
    static x(){return new UIIcon(_UI_ICON_SVG_X);}
    static plus(){return new UIIcon(_UI_ICON_SVG_PLUS);}
    static menu(){return new UIIcon(_UI_ICON_SVG_MENU);}
    static menuClose(){return new UIIcon(_UI_ICON_SVG_MENU_CLOSE);}

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

    connectedCallback(){
        /**
         * Declaratively create standard icons via 'data-type'
         */
        if (this.getAttribute('data-type')){
            switch (this.getAttribute('data-type')){
                case 'x': {this.innerHTML = _UI_ICON_SVG_X;break;}
                case 'plus': {this.innerHTML = _UI_ICON_SVG_PLUS;break;}
                case 'menu': {this.innerHTML = _UI_ICON_SVG_MENU;break;}
                case 'menu-close': {this.innerHTML = _UI_ICON_SVG_MENU_CLOSE;break;}
            }
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

    static append(parent, elements){
        if (typeof elements === 'string'){
            parent.appendChild(Elements.span().text(elements).create());
        } else if (elements instanceof HTMLElement) {
            parent.appendChild(elements);
        } else if (elements instanceof Array){
            for (let i = 0; i < elements.length; i++)
                Elements.append(parent, elements[i]);
        }
    }

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

/**
 * Base class for simple, declarative action handling.
 * Subclass, then nest as a child within a UIButton or UIIconButton.
 */
class UIButtonAction extends HTMLElement{
    constructor() {super();}

    handle(){}

    connectedCallback(){
        // CSS target for uniformly hiding regardless of subclass:
        this.setAttribute('data-ui-button-action', 'true');
    }
}

/**
 * Action to alter window.location.hash, which in turn fires 'hashchange' event.
 */
class UIButtonHashAction extends UIButtonAction{
    constructor(hash) {
        super();
        this._hash = hash;
    }
    handle(){
        window.location.hash = this._hash;
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this._hash) this._hash = this.getAttribute('value');
    }
}
window.customElements.define('ui-button-hash-action', UIButtonHashAction);

class UIButtonMenu extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        const button = this.parentElement;
        // click event for UIMenuButton is to give it focus to display the menu
        button._retainFocus = true; // see UIButton
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
class UIButtonBase extends HTMLElement{
    /**
     * https://www.sarasoueidan.com/blog/accessible-icon-buttons/
     */
    static isAccessibleActionKey(keyboardEvent){
        return (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ');
    }

    static addAccessibleAction(target, action){
        target.addEventListener('keydown', function (event) {
            if (target.hasAttribute('disabled')) return;
            if (UIButton.isAccessibleActionKey(event)) action(event);
        });

        target.addEventListener('click', function (event) {
            if (target.hasAttribute('disabled')) return;
            action(event);
        });
    }

    constructor() {
        super();
    }

    _cls(c){ this.classList.add(c); return this; }

    fullWidth(){return this._cls('is-full-width');}
    //justifyLeft(){return this._cls('is-justify-left');}
    outlined(){return this._cls('is-outlined');}
    contained(){return this._cls('is-contained');}
    round(){return this._cls('is-round');}
    primary(){return this._cls('is-primary');}
    negative(){return this._cls('is-negative');}

    hash(hash){
        return this.addAction(()=>{
            window.location.hash = hash;
        })
    }

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

        if (!(this._retainFocus === true)){
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

    set ariaLabel(label){
        this._label = label;
    }

    connectedCallback() {
        /**
         * Use tabindex to treat this is a native <button> in the sense that
         * it is by default focusable (default focus order).
         */
        this.setAttribute('tabindex', '0');

        const that = this;

        UIButton.addAccessibleAction(that, (event)=>{that._do(event)});

        that.addEventListener('keydown', function (event) {
            if (event.key === 'Escape')
                // Primarily to hide any nested UIButtonMenu,
                // however makes sense for any button to be able to unfocus from keyboard.
                that.blur();
        });

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
        if (this._label) this.setAttribute('aria-label', this._label);
        this.setAttribute('role', 'button');
        this.querySelectorAll('svg').forEach((e)=>{
            e.setAttribute('area-hidden', 'true');
            e.setAttribute('focusable', 'false');
        })
    }
}

class UIButton extends UIButtonBase{
    constructor(iconOrText, textAfterIcon) {
        super();
        if (iconOrText instanceof UIIcon){
            this.appendChild(iconOrText);
            if (typeof textAfterIcon === 'string')
                this.appendChild(Elements.span().text(textAfterIcon).create());
        } else if (typeof iconOrText === 'string'){
            this.innerText = iconOrText;
        }
    }
    vertical(){return this._cls('is-vertical');}
    even(){return this._cls('has-even-spacing');}
}
window.customElements.define('ui-button', UIButton);

/**
 * Highly recommended to pass or define aria-label
 */
class UIIconButton extends UIButtonBase{
    constructor(value, label) {
        super();
        if (value instanceof UIIcon){
            this.appendChild(value);
        } else if (value){
            this.appendChild(new UIIcon(value));
        }
        this.ariaLabel = label;
    }
    tiny(){ return this._cls('is-tiny');}
}
window.customElements.define('ui-icon-button', UIIconButton);

class UIEmpty extends HTMLElement{
    constructor(children) {
        super();
        Elements.append(this, children);
    }
}
window.customElements.define('ui-empty', UIEmpty);


/**
 * @see _modal.scss
 *
 * https://css-tricks.com/a-css-approach-to-trap-focus-insui-of-an-element/
 *
 * // https://css-tricks.com/considerations-styling-modal/

 // TODO accessibility...
 // https://github.com/gdkraus/accessible-modal-dialog

 TODO dialog element as it becomes available:
 https://caniuse.com/#search=dialog
 polyfill
 https://blog.logrocket.com/the-dialog-element-the-way-to-create-tomorrows-modal-windows-f1d4ab14380b/

 */
class UIModalBackdrop extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-modal-backdrop', UIModalBackdrop);
class UIModal extends HTMLElement{
    static _isVisibleElement(element){
        // jquery approach
        // https://stackoverflow.com/questions/13388616/firefox-query-selector-and-the-visible-pseudo-selector
        return element.offsetWidth > 0 || element.offsetHeight > 0;
    }

    constructor(content) {
        super();

        this.setAttribute('tabindex', '0'); // necessary for focus() call to work
        this.setAttribute('aria-hidden', 'true');
        this.setAttribute('role', 'dialog');

        const bg = document.createElement('div');
        bg.classList.add('ui-modal-background');
        bg.setAttribute('tabindex', '-1');
        this.appendChild(bg);

        this._putContent(content);

        this._backdrop = new UIModalBackdrop();

        const that = this;
        this.addEventListener('keydown', function(event){
            if (event.key === 'Escape') {
                that._esc(event);
            } else if (event.key === 'Tab'){
                that._tab(event);
            }
        });
    }

    _esc(event){
        this.close();
        event.preventDefault();
    }

    /**
     * Trap the tab key within the modal, to prevent it from going to 'outer' / main document.
     */
    _tab(event){
        event.preventDefault(); // always?

        // get list of all children elements:
        const o = Array.from(this.querySelectorAll('.ui-modal-content *'));

        // get list of focusable items
        const focusableItems = o.filter((e)=>UIModal._isVisibleElement(e));

        // get currently focused item
        const focusedItem = document.activeElement;

        // get the number of focusable items
        const numberOfFocusableItems = focusableItems.length

        // get the index of the currently focused item
        const focusedItemIndex = focusableItems.index(focusedItem);

        if (event.shiftKey) {
            // back tab
            // if focused on first item and user preses back-tab, go to the last focusable item
            if (focusedItemIndex == 0) {
                focusableItems.get(numberOfFocusableItems - 1).focus();
                event.preventDefault();
            }
        } else {
            // forward tab
            // if focused on the last item and user preses tab, go to the first focusable item
            if (focusedItemIndex == numberOfFocusableItems - 1) {
                focusableItems.get(0).focus();
                event.preventDefault();
            }
        }
    }

    get dynamic(){
        return true; //!this.hasAttribute('id');
    }

    _putContent(element){
        //const content = document.createElement('div');
        //content.classList.add('ui-modal-content');
        this.appendChild(content);
        //content.appendChild(element);
    }

    show(){
        this._currentActiveElement = document.activeElement;
        if (this.dynamic) document.body.appendChild(this);
        this.setAttribute('open', '');
        this.setAttribute('aria-hidden', 'false');

        document.body.appendChild(this._backdrop);
        this.focus();
    }

    close(){
        this.removeAttribute('open');
        this.setAttribute('aria-hidden', 'true');

        if (this.dynamic) document.body.removeChild(this);

        document.body.removeChild(this._backdrop);

        // Restore focus
        if (this._currentActiveElement) this._currentActiveElement.focus();
    }

    connectedCallback(){
        this.removeAttribute('open');
        this.setAttribute('aria-hidden', 'true');
    }
}
window.customElements.define('ui-modal', UIModal);

/**
 * @see _bar.scss
 */
class UIBar extends HTMLElement{
    constructor(elements) {
        super();
        Elements.append(this, elements);
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

/**
 * @see _dialog.scss
 */
class UIDialog extends HTMLElement{
    constructor(content, title) {
        super();

        const header = document.createElement('div');
        header.classList.add('ui-dialog-title');
        this.appendChild(header);
        this._header = header;

        header.appendChild(Elements.h5().text(title).create());

        const contentHolder = document.createElement('div');
        contentHolder.classList.add('ui-dialog-content');

        if (content instanceof HTMLElement) {
            contentHolder.appendChild(content);
        } else if (content instanceof Array){
            for (let i = 0; i < content.length; i++)
                contentHolder.appendChild(content[i]);
        } else {
            throw '' + content;
        }

        this.appendChild(contentHolder);
    }

    set title(title){
        this.querySelector('.ui-dialog-title h5').innerText = title;
    }

    /**
     * Wrap this in a UIModal, make it closable, show the UIModal.
     */
    modal(){
        const modal = new UIModal(this);

        const closer = new UIIconButton(UIIcon.x()).round().tiny();
        closer.classList.add('ui-dialog-close');

        closer.addEventListener('click', ()=>modal.close());
        this._header.appendChild(closer);

        modal.show();
    }
}
window.customElements.define('ui-dialog', UIDialog);