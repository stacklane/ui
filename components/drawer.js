
class UIDrawer extends HTMLElement{
    constructor() {
        super();
    }
    _cls(c){ this.classList.add(c); return this; }
}
window.customElements.define('ui-drawer', UIDrawer);