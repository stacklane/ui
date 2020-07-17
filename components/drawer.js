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
    get _id(){
        if (this.id) return 'ui-drawer-layout' + this.id;
        return 'ui-drawer-layout';
    }
    openDrawer(){
        this.classList.remove('is-closed');
        this.classList.add('is-opened');
        localStorage.setItem(this._id + '-state', 'opened');
    }
    closeDrawer(){
        this.classList.remove('is-opened');
        this.classList.add('is-closed');
        localStorage.setItem(this._id + '-state', 'closed');
    }
    connectedCallback(){
        this.appendChild(new UIDrawerOverlay());
        const state = localStorage.getItem(this._id + '-state');
        if (state){
            switch (state){
                case 'opened': { this.openDrawer(); break; }
                case 'closed': { this.closeDrawer(); break; }
            }
        }
        const that = this;
        this.addEventListener('keydown', function(event){
            if (event.key === 'Escape' && that.classList.contains('is-opened')) {
                that.closeDrawer();
            }
        });
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