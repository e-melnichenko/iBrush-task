document.addEventListener('click', function(ev) {
  const target = ev.target.closest('[data-slider-toggle]');
  if(!target) return;
  ev.preventDefault();

  // прокрутка списка 
  const slideList = document.getElementById(target.getAttribute('data-target'));
  const slideNum = +target.dataset.value;
  const slidesCount = slideList.children.length;
  slideList.style = `transform: translateX(-${(slideNum - 1) * 100 / slidesCount}%);`;

  // смена активного элемента
  // подразумевается что кнопки всегда в одноуровневом списке
  const toggleContainer = target.closest('ul');

  for (let li of toggleContainer.children) {
    li.classList.remove('similar-posts__toggle--active')
  }

  target.classList.add('similar-posts__toggle--active')
});