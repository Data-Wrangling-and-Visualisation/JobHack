const levelColors = {
    'junior': '#66c2a5',
    'middle': '#fc8d62',
    'senior': '#8da0cb'
  };
  
  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2 - 50;
  const g = svg.append("g").attr("transform", `translate(${width/2},${height/2})`);
  
  let selectedLocations = [];
  let allLocations = [];
  
  // Classify job level based on title
  function classifyLevel(title) {
    title = title.toLowerCase();
    if (title.includes("junior")) return "junior";
    if (title.includes("senior")) return "senior";
    return "middle";
  }
  
  // Abbreviate location name for display
  function abbreviate(text) {
    return text.length > 10 ? text.slice(0, 10) + '…' : text;
  }
  
  // Draw the radial stacked bar chart
  function draw(data) {
    g.selectAll("*").remove();
  
    const grouped = d3.rollup(
      data,
      v => d3.rollup(v, vv => vv.length, d => d.level),
      d => d.Location
    );
  
    const locations = Array.from(grouped.keys()).sort();
    const angleScale = d3.scaleBand()
      .domain(locations)
      .range([0, 2 * Math.PI])
      .padding(0.1);
  
    const maxTotal = d3.max(locations, loc => {
      return d3.sum(Array.from(grouped.get(loc)?.values() || []));
    });
  
    const radiusScale = d3.scaleLinear()
      .domain([0, maxTotal])
      .range([innerRadius, outerRadius]);
  
    for (const loc of locations) {
      if (selectedLocations.length === 0 || selectedLocations.includes(loc)) {
        const levels = grouped.get(loc) || new Map();
        let start = innerRadius;
  
        for (const level of ["junior", "middle", "senior"]) {
          const count = levels.get(level) || 0;
          const end = radiusScale(count + radiusScale.invert(start));
  
          const arc = d3.arc()
            .innerRadius(start)
            .outerRadius(end)
            .startAngle(angleScale(loc))
            .endAngle(angleScale(loc) + angleScale.bandwidth());
  
          g.append("path")
            .attr("d", arc)
            .attr("fill", levelColors[level]);
  
          start = end;
        }
  
        const angle = angleScale(loc) + angleScale.bandwidth() / 2;
        const labelRadius = outerRadius + 20;
        g.append("text")
          .attr("transform", `rotate(${(angle * 180 / Math.PI - 90)}) translate(${labelRadius},0) rotate(${angle > Math.PI ? 180 : 0})`)
          .attr("text-anchor", angle > Math.PI ? "end" : "start")
          .attr("alignment-baseline", "middle")
          .attr("font-size", "10px")
          .text(abbreviate(loc));
      }
    }
  }
  
  // Fetch data with the applied filters
  function fetchData(filters = {}) {
    const params = new URLSearchParams(filters);
    fetch('/data?' + params.toString())
      .then(res => res.json())
      .then(data => {
        draw(data);
        // Populate locations from the full dataset (not filtered data)
        populateLocations(data);
      });
  }
  
  // Populate the location checkboxes with all locations from the dataset
  function populateLocations(data) {
    const locationContainer = document.getElementById('location-checkboxes');
    
    // Fetch all unique locations from the full dataset
    allLocations = Array.from(new Set(data.map(d => d.Location))).sort();
  
    locationContainer.innerHTML = '';
    allLocations.forEach(loc => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = loc;
      checkbox.checked = selectedLocations.includes(loc);
      checkbox.name = 'location';
      checkbox.id = `loc-${loc}`;
  
      const label = document.createElement('label');
      label.htmlFor = `loc-${loc}`;
      label.innerText = loc;
      label.style.marginRight = '15px';
  
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
  
      locationContainer.appendChild(wrapper);
    });
  
    // Add event listener to update the filter when a checkbox is clicked
    document.querySelectorAll('input[name="location"]').forEach(cb => {
      cb.addEventListener('change', handleFilterChange);
    });
  }
  
  // Get filters from the UI (date, keyword, etc.)
  function getFilters() {
    const date = document.getElementById("date-filter").value;
    const keyword = document.getElementById("keyword-filter").value;
    const minCount = document.getElementById("min-count-filter").value;
  
    selectedLocations = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(cb => cb.value);
  
    return {
      date,
      keyword,
      minCount,
      location: selectedLocations.join(',') // Static locations from all data
    };
  }
  
  // Handle filter changes and fetch data
  function handleFilterChange() {
    const filters = getFilters();
    fetchData(filters);
  }
  
  // Event listeners for filter changes (real-time updates)
  document.getElementById("date-filter").addEventListener("input", handleFilterChange);
  document.getElementById("keyword-filter").addEventListener("input", handleFilterChange);
  document.getElementById("min-count-filter").addEventListener("input", handleFilterChange);
  
  // Toggle the filter drawer visibility
  document.getElementById("toggle-filters").addEventListener("click", () => {
    document.getElementById("filter-drawer").classList.toggle("open");
  });
  
  // Clear all filters
  document.getElementById("clear-filters").addEventListener("click", () => {
    selectedLocations = [];
    document.getElementById("date-filter").value = '';
    document.getElementById("keyword-filter").value = '';
    document.getElementById("min-count-filter").value = '';
    fetchData();
  });
  
  // Initial fetch to load data and populate locations
  fetchData();
  