class UIIcon extends HTMLElement{
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

    /**
     * @deprecated
     */
    small(){
        this.classList.add('is-small');
        return this;
    }

    /**
     * @deprecated
     */
    em(){
        this.classList.add('is-em');
        return this;
    }

    classes(...classes){
        (typeof classes === 'string') ? this.classList.add(classes) : this.classList.add(...classes);
        return this;
    }
}
window.customElements.define('ui-icon', UIIcon);