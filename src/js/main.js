// ie 11
import "@babel/polyfill";
import './ie/picturefill';
import './ie/closest';

import customizeSelect from './select/select';
import './slider/slider';

customizeSelect();

// const form = document.querySelector('.feedback__form');

// form.addEventListener('submit', function(ev) {
//   const target = ev.target;
//   debugger;
// })
// function addFocus(elem) {
//   if(elem.children.length !== 0) {
//     for (let child of elem.children) {
//       addFocus(child)
//     }
//   }
//   elem.addEventListener('focus', (ev) => {
//     console.log(ev.target)
//   })
// }

// addFocus(form)

