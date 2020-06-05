(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype));

function customizeSelect() {
  const containers = document.querySelectorAll('.select');
  if(containers.length === 0) return
  
  for (let container of containers) {
    appendCustomSelect(container)
  }

  // listeners

  // open/close click
  document.body.addEventListener('click', function(ev) {
    const target = ev.target.closest('.select__selected');
    if(!target) return;
    ev.preventDefault();

    const container = target.closest('.select')
    container.classList.toggle('select--active');
  });
  
  // list-item click
  document.body.addEventListener('click', function(ev) {
    const target = ev.target.closest('.select__item'); 
    if(!target) return;
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
    select.selectedIndex = index;

    container.classList.add('select--chosen');
    container.classList.remove('select--active');
  });

  //outside click
  document.body.addEventListener('click', function(ev) {
    const target = ev.target.closest('.select'); 
    if(target) return;

    for (let container of containers) {
      container.classList.remove('select--active')
    }
  })
} 

function appendCustomSelect(container) {
  const select = container.querySelector('select');
  select.classList.add('visually-hidden');

  const label = container.querySelector('label');
  label.classList.add('visually-hidden');

  // для серого цвета текста дефолтного значения
  container.classList.add('select--default');

  container.insertAdjacentHTML('afterbegin', `
    <div class="select__selected">
      <span>${select.dataset.default}</span>
    </div>
    <ul class="list-unstyled select__list">
      ${Array.from(select.children).map(opt => (
        `<li class="select__item">${opt.value}</li>`
      )).join('')}
    </ul>
    `
  );
}

export default customizeSelect;
