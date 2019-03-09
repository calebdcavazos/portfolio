import $ from 'jquery';

class Contact {
    constructor() {
        this.contact = $('.contact');
        this.contactBtn = $('.main-menu__contact-btn');
        this.events();
    }

    events() {
        this.contactBtn.click(toggleTheModal.bind(this));
    }

    toggleTheModal() {
        this.contact.toggleClass('.contact--is-visible');
    }
}

export default Contact;