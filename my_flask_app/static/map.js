// city_coords.js
// city_coords.js
const cityCoords = {
    "Ташкент": [69.2401, 41.2995],
    "Алматы": [76.9458, 43.2220],
    "Астана": [71.4667, 51.1667],
    "Петрозаводск": [34.3606, 61.7833],
    "Москва": [37.6173, 55.7558],
    "Минск": [27.5667, 53.9000],
    "Тамбов": [41.4304, 52.7317],
    "Волгоград": [44.5167, 48.7083],
    "Екатеринбург": [60.6122, 56.8431],
    "Чита": [113.5000, 52.0333],
    "Санкт-Петербург": [30.3351, 59.9343],
    "Нижний Новгород": [44.0020, 56.3269],
    "Атырау": [51.9167, 47.1167],
    "Саранск": [45.1833, 54.1833],
    "Чебоксары": [47.2500, 56.1333],
    "Ярославль": [39.8700, 57.6333],
    "Красноярск": [92.8667, 56.0167],
    "Белгород": [36.5833, 50.6000],
    "Тверь": [35.9167, 56.8581],
    "Уфа": [56.0667, 54.7333],
    "Ижевск": [53.2333, 56.8500],
    "Истра (Московская область)": [36.8647, 55.9197],
    "Омск": [73.3667, 54.9667],
    "Новороссийск": [37.7667, 44.7167],
    "Кемерово": [86.0833, 55.3500],
    "Батуми": [41.6458, 41.6417],
    "Брест": [23.7000, 52.1000],
    "Краснодар": [38.9769, 45.0333],
    "Тольятти": [49.4229, 53.5167],
    "США": [-77.0369, 38.9072], // Washington D.C.
    "Воронеж": [39.1697, 51.6717],
    "Тбилиси": [44.7833, 41.7167],
    "Калуга": [36.2667, 54.5333],
    "Самара": [50.1500, 53.1833],
    "Альметьевск": [52.3000, 54.9000],
    "Орел": [36.0833, 52.9667],
    "Великий Новгород": [31.2833, 58.5250],
    "Кронштадт": [29.7667, 60.0000],
    "Новосибирск": [82.9200, 55.0300],
    "Ростов-на-Дону": [39.7000, 47.2333],
    "Иркутск": [104.3000, 52.2833],
    "Челябинск": [61.4000, 55.1500],
    "Бишкек": [74.6000, 42.8667],
    "Мальта": [14.5147, 35.8989], // Valletta
    "Киселевск": [86.6500, 54.0000],
    "Барнаул": [83.7667, 53.3500],
    "Хабаровск": [135.0833, 48.4833],
    "Набережные Челны": [52.3333, 55.7000],
    "Караганда": [73.1000, 49.8000],
    "Новоуральск": [60.0833, 57.2500],
    "Пермь": [56.2500, 58.0000],
    "Норильск": [88.2167, 69.3333],
    "Тюмень": [65.5333, 57.1500],
    "Сыктывкар": [50.8167, 61.6667],
    "Курск": [36.1875, 51.7373],
    "Казань": [49.1222, 55.7908],
    "Пенза": [45.0000, 53.2000],
    "Муром": [42.0500, 55.5667],
    "Тула": [37.6167, 54.2000],
    "Баку": [49.8920, 40.3777],
    "Павлодар": [72.9667, 52.3000],
    "Калининград": [20.5000, 54.7167],
    "Андижан": [72.3441, 40.7833],
    "Томск": [84.9667, 56.5000],
    "Усть-Каменогорск": [82.6167, 49.9500],
    "Череповец": [37.9000, 59.1333],
    "Комсомольск-на-Амуре": [137.0167, 50.5667],
    "ОАЭ": [54.3667, 24.4667], // Abu Dhabi
    "Ждановичи": [27.4333, 53.9333],
    "Щелково (Московская область)": [37.9667, 55.9167],
    "Испания": [-3.7038, 40.4168], // Madrid
    "Владивосток": [131.9000, 43.1167],
    "Саратов": [46.0333, 51.5333],
    "Сербия": [20.4500, 44.8167], // Belgrade
    "Пушкино (Московская область)": [37.8333, 56.0167],
    "Оренбург": [55.1000, 51.7667],
    "Кострома": [40.9333, 57.7667],
    "Чехия": [14.4208, 50.0880], // Prague
    "Апрелевка (Московская область)": [37.0500, 55.5500],
    "Таганрог": [38.9000, 47.2167],
    "Гомель": [30.9833, 52.4333],
    "Турция": [32.8667, 39.9333], // Ankara
    "Гатчина": [30.1333, 59.5667],
    "Ивантеевка (Московская область)": [37.9167, 55.9667],
    "Ульяновск": [48.4000, 54.3167],
    "Сергиев Посад (Московская область)": [38.1333, 56.3000],
    "Иваново (Ивановская область)": [40.9833, 57.0000],
    "Киров (Кировская область)": [49.6681, 58.5975],
    "Мытищи (Московская область)": [37.7333, 55.9167],
    "Обухово (Московская область)": [38.2833, 55.8333],
    "Благовещенск (Амурская область)": [127.5333, 50.2667],
    "Вологда": [39.8833, 59.2167],
    "Стерлитамак": [55.9500, 53.6333],
    "Красногорск (Московская область)": [37.3167, 55.8167],
    "Актау": [51.1667, 43.6500],
    "Шымкент": [69.5833, 42.3000],
    "Могилев": [30.3500, 53.9000],
    "Навои": [65.3792, 40.1022],
    "Майкоп": [40.1000, 44.6000],
    "Улан-Удэ": [107.6000, 51.8333],
    "Бобруйск": [29.2167, 53.1500],
    "Нахабино (Московская область)": [37.1833, 55.8333],
    "Гродно": [23.8333, 53.6667],
    "Йошкар-Ола": [47.9167, 56.6333],
    "Южно-Сахалинск": [142.7333, 46.9500],
    "Липецк": [39.6000, 52.6167],
    "Рязань": [39.7333, 54.6167],
    "Владимир": [40.4000, 56.1333],
    "Кызылорда": [63.6333, 44.8500],
    "Армения": [44.5150, 40.1811], // Yerevan
    "Брянск": [34.3667, 53.2500],
    "Рамонь": [39.3333, 51.9167],
    "Петропавловск-Камчатский": [158.6500, 53.0167],
    "Раменское (Московская область)": [38.2167, 55.5667],
    "Балашиха (Московская область)": [37.9500, 55.8000],
    "Тучково (Московская область)": [37.0167, 55.6000],
    "Ставрополь": [41.9733, 45.0500],
    "Ханты-Мансийск": [69.0167, 61.0000],
    "Белово": [86.2833, 54.4167],
    "Ногинск (Московская область)": [38.4333, 55.8500],
    "Тараз": [71.3667, 42.9000],
    "Лида": [25.2944, 53.8875],
    "Егорьевск (Московская область)": [39.0333, 55.3833],
    "Одинцово (Московская область)": [37.2833, 55.6833],
    "Волоколамск (Московская область)": [35.9500, 56.0333],
    "Подольск (Московская область)": [37.5500, 55.4333],
    "Псков": [28.3333, 57.8167],
    "Курган": [65.3333, 55.4500],
    "Зубцов": [34.5833, 56.1667],
    "Ишимбай": [56.0500, 53.4500],
    "Абакан": [91.4333, 53.7167],
    "Люберцы (Московская область)": [37.8833, 55.6833],
    "Алмалык": [69.6000, 40.8500],
    "Обнинск": [36.6167, 55.1000],
    "Шуя": [41.3667, 56.8500],
    "Витебск": [30.2042, 55.1900],
    "Самарканд": [66.9500, 39.6500],
    "Коркино": [61.4000, 54.8833],
    "Сургут": [73.4167, 61.2500],
    "Динская станица": [39.2167, 45.2167],
    "Польша": [21.0122, 52.2297], // Warsaw
    "Севастополь": [33.5333, 44.6000],
    "Смоленск": [32.0500, 54.7833],
    "Лыткарино (Московская область)": [37.9000, 55.5833],
    "Химки (Московская область)": [37.4500, 55.9000],
    "Сочи": [39.7303, 43.5853],
    "Ачинск": [90.5000, 56.2833],
    "Феодосия": [35.3833, 45.0500],
    "Каменск-Уральский": [61.9333, 56.4000],
    "Уссурийск": [131.9500, 43.8000],
    "Алушта": [34.4000, 44.6667],
    "Симферополь": [34.1000, 44.9500],
    "Кипр": [33.3667, 35.1667], // Nicosia
    "Дмитров (Московская область)": [37.5167, 56.3500],
    "Верхоянск": [133.3833, 67.5500],
    "Астрахань": [48.0333, 46.3333],
    "Искитим": [83.3000, 54.6333],
    "Можайск (Московская область)": [36.0167, 55.5000],
    "Заречный (Пензенская область)": [45.1667, 53.2000],
    "Волжский (Волгоградская область)": [44.7667, 48.7833],
    "Сафоново": [33.3000, 55.1000],
    "Новокузнецк": [87.1167, 53.7500],
    "Свободный": [128.1167, 51.3833],
    "Сингапур": [103.8198, 1.3521],
    "Каменск-Шахтинский": [40.2500, 48.3167],
    "Шатура (Московская область)": [39.5333, 55.5667],
    "Белогорск": [128.4000, 50.9167],
    "Голицыно (Московская область)": [36.9833, 55.6167],
    "Ялта": [34.1667, 44.5000],
    "Костанай": [63.6000, 53.2167],
    "Выкса": [42.1667, 55.3167],
    "Кокшетау": [69.4000, 53.2833],
    "Дзержинск (Нижегородская область)": [43.4500, 56.2333],
    "Димитровград": [49.5833, 54.2333],
    "Архангельск": [40.5333, 64.5333],
    "Таджикистан": [68.7739, 38.5737], // Dushanbe
    "Нижнекамск": [51.8167, 55.6333],
    "Аксай (Ростовская область)": [39.9167, 47.2667],
    "Солигорск": [27.5333, 52.7833],
    "Ессентуки": [42.8667, 44.0333],
    "Фрязино (Московская область)": [38.0500, 55.9500],
    "Анапа": [37.3167, 44.8833],
    "Якутск": [129.7333, 62.0333],
    "Бугульма": [52.3333, 54.5333]
  };
  
  // SVG and projection setup
  const svg = d3.select('#map');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  const projection = d3.geoMercator()
    .scale(150)
    .translate([width / 2, height / 1.5]);
  
  const path = d3.geoPath().projection(projection);
  
  const g = svg.append('g'); // all content inside this group
  
  // Zoom and pan behavior
  svg.call(d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    }));
  
  let allStaticLocations = [];
  let selectedLocations = [];
  
  Promise.all([
    d3.json('https://unpkg.com/world-atlas@2/countries-110m.json')
  ]).then(([world]) => {
    const countries = topojson.feature(world, world.objects.countries).features;
  
    g.append('g')
      .selectAll('path')
      .data(countries)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#999');
  
    fetchAndInit();
  });
  
  function fetchAndInit() {
    // Get full list of locations first
    fetch('/maps/api/jobs')
      .then(res => res.json())
      .then(data => {
        allStaticLocations = data.locations;
        populateLocations();  // render from full list
        drawBubbles(data.jobs);
      });
  }
  
  function fetchAndDraw(filters = {}) {
    const params = new URLSearchParams(filters);
    fetch('/maps/api/jobs?' + params.toString())
      .then(res => res.json())
      .then(data => {
        drawBubbles(data.jobs); // only redraw plot
      });
  }
  
  function drawBubbles(jobs) {
    g.selectAll('circle.job-bubble').remove();
  
    const counts = d3.rollup(jobs, v => v.length, d => d.Location);
    const maxCount = d3.max(Array.from(counts.values()));
    const rScale = d3.scaleSqrt().domain([0, maxCount]).range([0, 20]);
  
    const validData = Array.from(counts.entries()).filter(([city]) => {
      if (!(city in cityCoords)) {
        console.warn(`City not found in coords: ${city}`);
        return false;
      }
      return true;
    });
  
    g.append('g')
      .selectAll('circle.job-bubble')
      .data(validData)
      .join('circle')
      .attr('class', 'job-bubble')
      .attr('cx', d => projection(cityCoords[d[0]])[0])
      .attr('cy', d => projection(cityCoords[d[0]])[1])
      .attr('r', d => rScale(d[1]))
      .attr('fill', 'rgba(252,141,98,0.7)')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .append('title')
      .text(d => `${d[0]}: ${d[1]} jobs`);
  }
  
  function populateLocations() {
    const container = document.getElementById('location-checkboxes');
    container.innerHTML = '';
    allStaticLocations.forEach(loc => {
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.value = loc;
      cb.checked = selectedLocations.includes(loc);
      cb.name = 'location'; cb.id = `loc-${loc}`;
  
      const label = document.createElement('label');
      label.htmlFor = `loc-${loc}`; label.innerText = loc;
      label.style.marginRight = '10px';
  
      const wrap = document.createElement('div');
      wrap.style.display = 'flex'; wrap.style.alignItems = 'center';
      wrap.append(cb, label);
      container.append(wrap);
    });
  
    document.querySelectorAll('input[name="location"]')
      .forEach(cb => cb.addEventListener('change', handleFilterChange));
  }
  
  function getFilters() {
    const date = document.getElementById('date-filter').value;
    const keyword = document.getElementById('keyword-filter').value;
    const minCount = document.getElementById('min-count-filter').value;
    selectedLocations = Array.from(
      document.querySelectorAll('input[name="location"]:checked')
    ).map(cb => cb.value);
    return {
      date,
      keyword,
      minCount,
      locations: selectedLocations.join(',')
    };
  }
  
  function handleFilterChange() {
    fetchAndDraw(getFilters());
  }
  
  document.getElementById('date-filter').addEventListener('input', handleFilterChange);
  document.getElementById('keyword-filter').addEventListener('input', handleFilterChange);
  document.getElementById('min-count-filter').addEventListener('input', handleFilterChange);
  document.getElementById('toggle-filters').addEventListener('click', () => {
    document.getElementById('filter-drawer').classList.toggle('open');
  });
  document.getElementById('clear-filters').addEventListener('click', () => {
    selectedLocations = [];
    document.getElementById('date-filter').value = '';
    document.getElementById('keyword-filter').value = '';
    document.getElementById('min-count-filter').value = '';
    document.querySelectorAll('input[name="location"]').forEach(cb => cb.checked = false);
    fetchAndDraw();
  });