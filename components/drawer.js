
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

class UIDrawerCloser extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        const that = this;

        that.addEventListener('click', (event)=>{
            const layout = that.closest('ui-drawer-layout');
            if (!layout) console.error('!ui-drawer-layout');
            layout.classList.remove('is-open');
            event.stopPropagation();
            event.preventDefault();
        });
    }
}
window.customElements.define('ui-drawer-closer', UIDrawerCloser);

class UIDrawerOpener extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        const that = this;

        that.addEventListener('click', (event)=>{
            const layout = that.closest('ui-drawer-layout');
            if (!layout) console.error('!ui-drawer-layout');
            layout.classList.add('is-open');
            event.stopPropagation();
            event.preventDefault();
        });
    }
}
window.customElements.define('ui-drawer-opener', UIDrawerOpener);