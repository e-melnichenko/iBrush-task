function customizeSelect() {
  const containers = document.querySelectorAll('.select');
  if(containers.length === 0) return  // prevent adding listeners
  
  for (let container of containers) {
    appendCustomSelect(container)
  };

  addListeners();
} 

function appendCustomSelect(container) {
  const select = container.querySelector('select');
  select.setAttribute('style', 'display: none');

  container.insertAdjacentHTML('afterbegin', `
    <div class="select__selected" tabindex="0">
      <span>${select.value}</span>
    </div>
    <ul class="list-unstyled select__list">
      ${Array.from(select.children).map(opt => (
        !opt.hidden ? `<li tabindex="0" class="select__item">${opt.value}</li>` : ''
      )).join('')}
    </ul>
    `
  );  
}

function addListeners() {
  // open/close 
  document.addEventListener('click', toggleList);
  document.addEventListener('keydown', toggleList);

  function toggleList(ev) {
    const target = ev.target.closest('.select__selected');
    if(!target) return;
    console.log(ev);
    if(ev.type === 'keydown' && !(
      ev.code === 'Enter' ||
      ev.code === 'Space'
      )) return;

    ev.preventDefault();

    const container = target.closest('.select');
    container.classList.toggle('select--active');

    ev.type === "keydown" && target.nextElementSibling.children[0].focus();
  };

  // keyboard navigate
  document.addEventListener('keydown', function(ev) {
    const target = ev.target.closest('.select__list');
    if(!target) return;

    if(!(
      ev.code === 'ArrowUp' ||
      ev.code === 'ArrowDown' ||
      ev.code === 'Escape' ||
      ev.code === 'Tab'
      )) return;

    ev.preventDefault();

    switch(ev.code) {
      case 'ArrowDown':
        const nextSibling = document.activeElement.nextElementSibling;
        nextSibling && nextSibling.focus();
        break;
      case 'ArrowUp':
        const prevSibling = document.activeElement.previousElementSibling;
        prevSibling && prevSibling.focus();
        break;
      case 'Tab':
      case 'Escape':
        const container = ev.target.closest('.select');
        container.classList.remove('select--active');
        container.children[0].focus();
        break;
    }
  });

  // list-item choose
  document.addEventListener('click', chooseItem);
  document.addEventListener('keydown', chooseItem);

  function chooseItem(ev) {
    const target = ev.target.closest('.select__item'); 
    if(!target) return;
    
    if(ev.type === 'keydown' && !(ev.code === 'Enter')) return;

    ev.preventDefault();
    
    const container = target.closest('.select');
    const select = container.querySelector('select');
    const selected = container.querySelector('.select__selected');
    const list = container.querySelector('.select__list');
  
    if(!container || !select || !selected || !list)
      throw new Error('custom select error');
    
    selected.children[0].innerHTML = target.innerHTML;
  
    // добавляем выбранный номер элемента в настоящий select
    const index = Array.from(list.children).indexOf(target);
    select.selectedIndex = index + 1; // поправка на hidden элемент

    container.classList.add('select--chosen');
    container.classList.remove('select--active');
    selected.focus();
  };

  //outside click
  document.addEventListener('click', function(ev) {
    const target = ev.target.closest('.select'); 
    if(target) return;

    const containers = document.querySelectorAll('.select');

    for (let container of containers) {
      container.classList.remove('select--active')
    }
  });
}

export default customizeSelect;
