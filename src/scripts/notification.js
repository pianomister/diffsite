class Notification {

    constructor() {
        this.classes = {
            default: 'notification',
            error: 'notification notification--error',
            info: 'notification notification--info',
            loading: 'notification notification--info',
            warning: 'notification notification--warning'
        };
        this.types = {
            error: 'error',
            info: 'info',
            loading: 'loading',
            warning: 'warning'
        };
    }

    set($selector, type, text, actionText, actionCallback) {
        if (!(type in this.classes)) {
            return;
        }

        // set background
        $selector.className = this.classes[type];

        // set icon
        let icon = null;
        switch (type) {
            case 'info':
                icon = 'info';
                break;
            case 'warning':
            case 'error':
                icon = 'warning';
                break;
        }

        const $icon = $selector.querySelector('i');
        if (icon) {
            $icon.innerText = icon;
        } else {
            $icon.innerText = '';
        }

        // set loader
        $selector.querySelector('.loader').classList.toggle('hidden', type !== 'loading');

        // set text
        $selector.querySelector('span').innerText = text;

        // set skip link
        if (actionText) {
            $selector.querySelector('a').innerText = actionText;
            $selector.querySelector('a').addEventListener('click', actionCallback);
        } else {
            // remove event listeners
            const el = $selector.querySelector('a');
            el.innerText = '';
            const elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
        }
    }

    hide($selector) {
        $selector.className = this.classes.default;
        $selector.querySelector('.loader').classList.add('hidden');
        $selector.querySelector('i').innerText = '';
        $selector.querySelector('span').innerText = '';
        $selector.querySelector('a').innerText = '';
    }
}

export const notification = new Notification();