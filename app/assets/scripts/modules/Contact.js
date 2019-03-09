import $ from 'jquery';

class Contact {
    constructor() {
        this.contact = $('.contact');
        this.contactBtn = $('.main-menu__contact-btn');
        this.contactClose = $('.contact__close');
        this.events();
    }

    events() {
        this.contactBtn.click(this.toggleTheModal.bind(this));
        this.contactClose.click(this.toggleTheModal.bind(this));
    }

    toggleTheModal() {
        this.contact.toggleClass('contact--is-visible');
    }
}

export default Contact;