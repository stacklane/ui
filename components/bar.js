/**
 * @see _bar.scss
 */
class UIBar extends HTMLElement{
    constructor() {
        super();
    }
    isPath(){
        this.classList.add('is-path');
        return this;
    }
    isSeparated(){
        this.classList.add('is-separated');
        return this;
    }
}
window.customElements.define('ui-bar', UIBar);