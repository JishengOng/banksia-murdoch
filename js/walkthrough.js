  let FLOWERS_WALKTHROUGH = []
  let FLOWERS_WALKTHROUGH_SHOWN = {}
  const BASE_MAP_WIDTH = 660
  const BASE_MAP_HEIGHT = 594
  function convertResponseToJson(response) {  
    return response.json()
  }
  function getParentWithFlowerId(element) {
      let possibleFlowerIdEl = element     
      while ( possibleFlowerIdEl ) {
          const flowerId = possibleFlowerIdEl.getAttribute('data-id')
          if ( Boolean(flowerId) ) {            
              return possibleFlowerIdEl
          }         
          possibleFlowerIdEl = possibleFlowerIdEl.parentElement
      }
  }
  function redrawLocations() {
    const flowersToCleanup = Object.keys(FLOWERS_WALKTHROUGH_SHOWN).map( function(key) {
      return FLOWERS_WALKTHROUGH_SHOWN[key]
    })
    flowersToCleanup.forEach(function(flower) {
      removeCoordinates(flower.id)
    })
    flowersToCleanup.forEach(function(flower) {
      drawLocationsOnMap(flower.id)
    })
  }

  $(window).resize(function() {
    redrawLocations()
  })
  function drawLocationsOnMap(id) {
    
    const flower = FLOWERS_MAP[id]
    if (!FLOWERS_WALKTHROUGH_SHOWN[id] ) {
      FLOWERS_WALKTHROUGH_SHOWN[id] = flower
    }
    // get current width height of image
    const imageEl = document.getElementById('walkthough_img')
    const currentWidth = imageEl.clientWidth
    const currentHeight = imageEl.clientHeight

    const resizedPositions = flower.locations.map(function(loc) {
      return {        
        left: loc.left/(BASE_MAP_WIDTH/currentWidth),
        top: loc.top / ( BASE_MAP_HEIGHT/currentHeight)
      }
    })

    const mapEl = document.getElementById('walkthrough_map')
    
    resizedPositions.forEach( location => { // left and top
      const markerLocationEl = document.createElement('div')
      markerLocationEl.classList.add(`${flower.id}-marker__`)
      markerLocationEl.setAttribute('data-toggle','tooltip')
      markerLocationEl.setAttribute('title',flower.name)
      markerLocationEl.style.position = 'absolute';
      markerLocationEl.style.top = `${location.top}px`;
      markerLocationEl.style.left = `${location.left}px`;
      markerLocationEl.innerHTML = `
          <img src='/img/marker.png' />
      `
      mapEl.appendChild(markerLocationEl)
      
    })
  }
  function removeCoordinates(id) {
      const markerClassName = `.${id}-marker__`
      const mapEl = document.getElementById('walkthrough_map')
      
      const markerElements = document.querySelectorAll(markerClassName)

      markerElements.forEach( function(markerEl) {
          mapEl.removeChild(markerEl)
      })
      delete FLOWERS_WALKTHROUGH_SHOWN[id]
  }


  function handleFlowerClick(event) {
    const targetEl = getParentWithFlowerId(event.target)
    const id = targetEl.getAttribute('data-id')
    if ( targetEl.classList.contains('walkthrough_filter_selected') ) {
          // remove, being unselected
          targetEl.classList.remove('walkthrough_filter_selected')        
          // remove coordinates
          removeCoordinates(id)
    } else {
      targetEl.classList.add('walkthrough_filter_selected')
          // add coordinates
      drawLocationsOnMap(id)
    }
  }

  function renderFlowersDropdown() {
      const windowWidth = document.body.clientWidth
      let container = 'walkthrough_filter_anchor'
      const filterToggle = document.getElementById('walkthrough_filter_toggle')
      filterToggle.style.display = 'none'
      if ( windowWidth < 900 ) {
        container = 'walkthrough_filter'
        filterToggle.style.display = 'block';
      } 
      
      const flowersFilterEl = document.getElementById(container)
      console.log('flowersFilterEl', flowersFilterEl, container)
      FLOWERS_WALKTHROUGH.forEach(function(flower) {
          if ( flower.locations && flower.locations.length > 0 ) {

              const filterEl = document.createElement('div')              
              filterEl.setAttribute('data-id', flower.id)              
              filterEl.classList.add('walkthrough_flower')
              const flowerName = flower.id.charAt(0).toUpperCase() + flower.id.substring(1)
              // filterEl.innerHTML = flower.name
              filterEl.innerHTML = `            
                  <div class='walkthrough_filter_img'><img src="/img/marker.png"/></div>
                  <div>${flowerName}</div>        
              `
              
              filterEl.addEventListener('click', handleFlowerClick)

              flowersFilterEl.appendChild(filterEl);
          }    
      })
  }
  
  
  document.getElementById('walkthrough_select_flowers').addEventListener('click', function() {    
    const reference = document.querySelector('#walkthrough_select_flowers');
    const popper = document.querySelector('#walkthrough_filter');    
    var popperInstance = new Popper(reference, popper, {
      placement: 'bottom'
    });
    $('#walkthrough_filter').css('visibility', 'visible')
  })
  function renderWalkthroughInterface(flowers) {    
    FLOWERS_WALKTHROUGH = flowers;    
    renderFlowersDropdown()
  }

  function getFlowers() {

      fetch('/flowersdb.json')
          .then( convertResponseToJson)
          .then(renderWalkthroughInterface)
  }

  getFlowers()
