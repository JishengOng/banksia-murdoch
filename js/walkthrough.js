const FLOWERSMAP = {}
    

function removeCoordinates(flowerId) {
    const markerClassName = `.${flowerId}-marker__`
    const mapEl = document.getElementById('walkthrough_map')

    const markerElements = document.querySelectorAll(markerClassName)

    markerElements.forEach( function(markerEl) {
        mapEl.removeChild(markerEl)
    })
}

function addCoordinates(flowerId) {
    const flower = FLOWERSMAP[flowerId]
    const locations = flower.locations
    const mapEl = document.getElementById('walkthrough_map')
    
    locations.forEach( location => { // left and top
        const markerLocationEl = document.createElement('div')
        markerLocationEl.classList.add(`${flower.id}-marker__`)

        markerLocationEl.style.position = 'absolute';
        markerLocationEl.style.top = `${location.top}px`;
        markerLocationEl.style.left = `${location.left}px`;
        markerLocationEl.innerHTML = `
            <img src='/img/marker.png' />
        `
        mapEl.appendChild(markerLocationEl)
    })
}


function getParentWithFlowerId(element) {
    let possibleFlowerIdEl = element
    console.log('searching for parent start ', element)
    while ( possibleFlowerIdEl ) {
        const flowerId = possibleFlowerIdEl.getAttribute('data-id')
        if ( Boolean(flowerId) ) {            
            return possibleFlowerIdEl
        }         
        possibleFlowerIdEl = possibleFlowerIdEl.parentElement
    }
}

function convertResponseToJson(response) {
    return response.json()
}

//
function drawLocationsOnMap(event) {
    const targetEl = getParentWithFlowerId(event.target)

    const flowerId = targetEl.getAttribute('data-id')
    if ( targetEl.classList.contains('walkthrough_filter_selected') ) {
        // remove, being unselected
        targetEl.classList.remove('walkthrough_filter_selected')        
        // remove coordinates
        removeCoordinates(flowerId)
    } else {
        targetEl.classList.add('walkthrough_filter_selected')
        // add coordinates
        addCoordinates(flowerId)
    }
}

function renderWalkthroughInterface(flowers) {    
    const flowersFilterEl = document.getElementById('walkthrough_filter')

    flowers.forEach(function(flower) {
        if ( flower.locations && flower.locations.length > 0 ) {
            FLOWERSMAP[flower.id] = flower

            const filterEl = document.createElement('div')
            filterEl.setAttribute('data-id', flower.id)
            filterEl.classList.add('walkthrough_filter_id')
            
            // filterEl.innerHTML = flower.name
            filterEl.innerHTML = `            
                <div class='walkthrough_filter_img'><img src="/img/marker.png"/></div>
                <div>${flower.name}</div>        
            `
            
            filterEl.addEventListener('click', drawLocationsOnMap)

            flowersFilterEl.appendChild(filterEl);
        }    
    })

}

function getFlowers() {

    fetch('/flowersdb.json')
        .then( convertResponseToJson)
        .then(renderWalkthroughInterface)
}

getFlowers()
