
const USER_FILTER = {}
const flowersContainers = document.getElementById("flowers_container")

function convertResponseToJson(response) {
  return response.json()
}

function createCommonNamesDiv(flower) {
  const otherNames = flower.otherNames || {}

  if ( Object.keys(otherNames).length === 0 ) {
      return ''
  }

  let commonNameHtmStr = ''
  let noogarNameStr = ''
  if ( otherNames.common && otherNames.noongar ) {
      commonNameHtmStr = `
      <div>
          <span>Common name:</span>   <span>${otherNames.common}:</span> 
      </div>
      `
       noogarNameStr = `
          <div>
              <span>Noongar name:</span>   <span>${otherNames.noongar}</span> 
          </div>
      `
  } else if ( otherNames.common && otherNames.noongar === undefined ) {
    commonNameHtmStr = `
       <div>
          <span>Common name:</span>   <span>${otherNames.common}:</span> 
        </div>
    `
  } else {
    commonNameHtmStr = ''
    noogarNameStr = ' '
  }
  return `
      <div>
          ${commonNameHtmStr}
          ${noogarNameStr}
      </div>
  `
}
function createNames(flower) {
  return `
        <div>Name:${flower.name}</div>
        <div>(${flower.shortDesc})</div>
        `
  
}

function createFlowerDescHtml(flower) {
  if ( flower.flowerDesc ) {
    return `
      <div>
        <div>Flower Desc</div>
        <p>
          ${ flower.flowerDesc }
        </p>
      </div>
    `
  }
  return '';
}

function addFlowersToSection(flowersArr, type, season) {
  
  for ( const flower of flowersArr ) {

    if ( 
         (type === undefined && season === undefined)
      || ( type !== undefined && season === undefined && flower.types.includes(type) )
      || ( type === undefined && season !== undefined && flower.floweringPeriod.includes(season) )
      || ( flower.types.includes(type) && flower.floweringPeriod.includes(season) )
    ) {
    
      const flowerEl = document.createElement('div')
      flowerEl.addEventListener('click',function() {


        const modalTitleEl = document.getElementById('flower_title')
        modalTitleEl.innerHTML = flower.name

        const modalBodyEl = document.getElementById('flower_body')
        
        modalBodyEl.innerHTML = `
          <div>
            ${ createNames(flower) }
            ${ createCommonNamesDiv(flower) }
            <div>Description: ${flower.description}</div>
            <div>Habitat: ${flower.habitat}</div>
          </div>
        `

        $('#flower_details').modal({ show: true })
      })
      
      flowerEl.innerHTML = flower.name;    
      flowerEl.classList.add('flower')    
      
      // /img/flowers/id/preview.jpg
      const imgUrl = '/img/flowers/' + flower.id + '/preview.jpg'
      const flowerImg = document.createElement('img')
      flowerImg.src = imgUrl
      flowerEl.appendChild(flowerImg)

      flowersContainers.appendChild(flowerEl)
    }

  }  
}


//retrieve flowers db
function renderAllFlower(type,season) {
  fetch('/flowersdb.json')
    .then(convertResponseToJson)
    .then(function(flowersArr) {
      addFlowersToSection(flowersArr, type, season)
    });
}

document.querySelectorAll('.flower_type')
        .forEach(function(flowerTypeEl) {
          flowerTypeEl.addEventListener('click',function() {
            const type = flowerTypeEl.getAttribute('data-flowertype')
            
            if ( type === USER_FILTER.flowerType ) {              
              delete USER_FILTER.flowerType
            } else {
              //classList.add('selected')
              USER_FILTER.flowerType = type
            }
            
            flowersContainers.innerHTML = ''
            renderAllFlower(USER_FILTER.flowerType,USER_FILTER.floweringSeason)
            console.log(USER_FILTER)

          });
        })
document.querySelectorAll('.flower_season')
        .forEach(function(flowerSeasonEl) {
          flowerSeasonEl.addEventListener('click', function() {
            const season = flowerSeasonEl.getAttribute('data-flowerseason')

            if ( season === USER_FILTER.floweringSeason ) {
              console.log('selected again, deleting')               
              delete USER_FILTER.floweringSeason
            } else {
              USER_FILTER.floweringSeason = season
            }

            console.log('userFilter', USER_FILTER)
            flowersContainers.innerHTML = ''
            renderAllFlower(USER_FILTER.flowerType,USER_FILTER.floweringSeason)
          })
})
        
renderAllFlower();
