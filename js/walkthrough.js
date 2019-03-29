const FLOWERCOORDINATES = {}

function convertResponseToJson(response) {
    return response.json()
}

function getFlowers() {
    fetch('flowersdb.json') 
  .then(convertResponseToJson)
  .then(createFlowerCoords)
}

function createFlowerCoords(flowers) {

    for ( const flower of flowers ) { 
       // console.log('flower', flower)
       const key = flower.id
       const value = flower.locations

       FLOWERCOORDINATES[key] = value
      
    }


    const ashbyiLocations = getFlowerLocations('ashbyi')
    const flowerMapEl = document.getElementById('walkthrough_map')

    for ( const location of ashbyiLocations ) {
        const markerEl = document.createElement('div')
        markerEl.style.position = 'absolute'
        markerEl.style.left = `${location.left}px`
        markerEl.style.top = `${location.top}px`

        const markerImg = document.createElement('img')
        markerImg.src = '/img/marker.png'
        markerEl.appendChild(markerImg)
        

        flowerMapEl.appendChild(markerEl)

    }


} 

function getFlowerLocations(id) {

    const locations = FLOWERCOORDINATES[id]

    return locations
}

getFlowers()


