

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

    modal(){
        const modal = new UIModal(this);

        const closer = new UIIconButton(UIIcon.x()).round();
        closer.classList.add('ui-dialog-close');

        closer.addEventListener('click', ()=>modal.close());
        this._header.appendChild(closer);

        modal.show();
    }
}
window.customElements.define('ui-dialog', UIDialog);