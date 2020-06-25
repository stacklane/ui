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
}
window.customElements.define('ui-icon', UIIcon);