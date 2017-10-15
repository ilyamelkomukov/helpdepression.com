import Nav from '../components/Nav/Nav.js';

"use strict";

$("document").ready(()=> {

  Nav.changeNavIfPageAlreadyScrolled();
  Nav.showHideNav();
  Nav.makeHamburgerToggleable();
  Nav.makeNavScrollable();
});
