class UIDrawerOverlay extends HTMLElement{
    constructor() {super();}
    connectedCallback(){
        const that = this;
        that.addEventListener('click', ()=>{
            const layout = that.closest('ui-drawer-layout');
            layout.closeDrawer();
        });
    }
}
window.customElements.define('ui-drawer-overlay', UIDrawerOverlay);

class UIDrawer extends HTMLElement{
    constructor() {super();}
}
window.customElements.define('ui-drawer', UIDrawer);

class UIDrawerLayout extends HTMLElement{
    constructor() {super();}
    isDrawerForcedOpen(){
        return this.classList.contains('is-opened');
    }
    openDrawer(){
        this.classList.remove('is-closed');
        this.classList.add('is-opened');
    }
    closeDrawer(){
        this.classList.remove('is-opened');
        this.classList.add('is-closed');
    }
    connectedCallback(){
        const that = this;
        that.appendChild(new UIDrawerOverlay());
    }
}
window.customElements.define('ui-drawer-layout', UIDrawerLayout);

class UIDrawerCloser extends UIButtonAction{
    constructor() {super();}
    handle(){ this.closest('ui-drawer-layout').closeDrawer();}
}
window.customElements.define('ui-drawer-closer', UIDrawerCloser);

class UIDrawerOpener extends UIButtonAction{
    constructor() {super();}
    handle(){ this.closest('ui-drawer-layout').openDrawer();}
}
window.customElements.define('ui-drawer-opener', UIDrawerOpener);