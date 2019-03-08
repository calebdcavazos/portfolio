import $ from 'jquery';

//main-menu__menu-icon

class Header {
    constructor() {
        this.menuIcon = $('.main-menu__menu-icon');
        this.menuContent = $('.main-menu__menu-content');
        this.menu = $('.main-menu');
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
        this.menuContent.toggleClass("main-menu__menu-content--is-visible");
        this.menu.toggleClass('main-menu__is-toggled');
    }
}

export default Header;