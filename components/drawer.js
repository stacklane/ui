
class UIDrawer extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-drawer', UIDrawer);

class UIDrawerLayout extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        this.appendChild(new UIDrawerOverlay());
    }
}
window.customElements.define('ui-drawer-layout', UIDrawerLayout);

class UIDrawerOverlay extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-drawer-overlay', UIDrawerOverlay);

class UIDrawerCloser extends UIButtonAction{
    constructor() {super();}
    handle(){
        const layout = this.closest('ui-drawer-layout');
        if (!layout) console.error('!ui-drawer-layout');
        layout.classList.remove('is-opened');
        layout.classList.add('is-closed');
        return true;
    }
}
window.customElements.define('ui-drawer-closer', UIDrawerCloser);

class UIDrawerOpener extends UIButtonAction{
    constructor() {super();}
    handle(){
        const layout = this.closest('ui-drawer-layout');
        if (!layout) console.error('!ui-drawer-layout');
        layout.classList.remove('is-closed');
        layout.classList.add('is-opened');
        return true;
    }
}
window.customElements.define('ui-drawer-opener', UIDrawerOpener);