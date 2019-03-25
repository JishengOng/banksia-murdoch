
const USER_FILTER = {}
const flowersContainers = document.getElementById("flowers_container")

function convertResponseToJson(response) {
  return response.json()
}

function addFlowersToSection(flowersArr, type, season) {
  console.log('filtering', type, season)
  for ( const flower of flowersArr ) {

    if ( 
         (type === undefined && season === undefined)
      || ( type !== undefined && season === undefined && flower.types.includes(type) )
      || ( type === undefined && season !== undefined && flower.floweringPeriod.includes(season) )
      || ( flower.types.includes(type) && flower.floweringPeriod.includes(season) )
    ) {
    
      const flowerEl = document.createElement('div')    
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
              delete USER_FILTER.floweringSeason
            } else {
              USER_FILTER.floweringSeason = season
            }

            USER_FILTER.floweringSeason = season
            console.log('userFilter', USER_FILTER)
            flowersContainers.innerHTML = ''
            renderAllFlower(USER_FILTER.flowerType,USER_FILTER.floweringSeason)
          })
})
        
renderAllFlower()
