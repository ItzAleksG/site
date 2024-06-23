function formatDate(dateString) {
    const months = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    
    const dateParts = dateString.split(".");
    const day = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const year = dateParts[2];
    
    return `${day} ${months[monthIndex]} ${year}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper');
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(person => {
          const container = document.createElement('div');
          container.classList.add('container');
  
          const shadow = document.createElement('div');
          shadow.classList.add('shadow');
  
          const header = document.createElement('div');
          header.classList.add('header');
          header.style.backgroundImage = `url('IMGs/back/${person.id}.gif')`;

          const img = document.createElement('img');
          img.id = 'img';
          img.loading = 'lazy';
          img.src = `IMGs/avatar/${person.id}.gif`;
  
          const name = document.createElement('h1');
          name.id = 'name';
          name.textContent = person.name;
  
          const id = document.createElement('p');
          id.id = 'id';
          id.textContent = person.id;
  
          const content = document.createElement('div');
          content.classList.add('content');
  
          const elements = [
            { class: 'icon-birthday-cake', id: 'birthday', text: formatDate(person.birthday) },
            { class: 'icon-graphics-card', id: 'card', text: person.card },
            { class: 'icon-processor', id: 'processor', text: person.processor },
            { class: 'icon-clock', id: 'clock', text: 'Мск'+person.clock },
          ];
          
          header.appendChild(img);
          header.appendChild(name);
          header.appendChild(id);
  
          elements.forEach(elementData => {
            const p = document.createElement('p');
            p.classList.add(elementData.class);
            p.id = elementData.id;
            p.textContent = elementData.text;
            content.appendChild(p);
          });
  
          shadow.appendChild(header);
          shadow.appendChild(content);
          container.appendChild(shadow);
  
          wrapper.appendChild(container);
        });
      })
      .catch(error => console.error('Ошибка загрузки данных: ', error));
  });
