
class UIDrawer extends HTMLElement{
    constructor() {
        super();
    }
}
window.customElements.define('ui-drawer', UIDrawer);

class UIDrawerLayout extends HTMLElement{
    constructor() {
        super();
    }
}
window.customElements.define('ui-drawer-layout', UIDrawerLayout);

class UIDrawerCloser extends UIButtonAction{
    constructor() {
        super();
    }
    handle(){
        const layout = this.closest('ui-drawer-layout');
        if (!layout) console.error('!ui-drawer-layout');
        layout.classList.remove('is-open');
        return true;
    }
}
window.customElements.define('ui-drawer-closer', UIDrawerCloser);

class UIDrawerOpener extends UIButtonAction{
    constructor() {
        super();
    }
    handle(){
        const layout = this.closest('ui-drawer-layout');
        if (!layout) console.error('!ui-drawer-layout');
        layout.classList.add('is-open');
        return true;
    }
}
window.customElements.define('ui-drawer-opener', UIDrawerOpener);