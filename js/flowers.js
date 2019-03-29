
const USER_FILTER = {}
const flowersContainers = document.getElementById("flowers_container")

function convertResponseToJson(response) {
  return response.json()
}

function createImagesDiv(flower) {
  const images = flower.images
  let imgs = ''

  images.forEach( function(image) {
      imgs =  `${imgs}\n<img src="/img//flowers/${flower.id}/${image}.jpg"/>`
  })
  return `<div style="width: 550px; height 600px;">${imgs}</div>`
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
        <div>
          <div> <b>Name</b>: ${flower.name}</div>
          <div style="font-size:15px;">(${flower.shortDesc})</div>
        </div>
        ` 
}
function createFlowerDescHtml(flower) {
  const flowerDesc = flower.flowerDesc
 
  if ( flowerDesc ) {
    return `
      <div>
        <div> <b>Flower Description:</b> ${flowerDesc}<p> 
        </div>
      </div>
    `
  } else {
    return '';
  }
}

function createFruitDescHtml(flower) {
  const fruitDesc = flower.fruitDesc

  if ( fruitDesc ) {
    return `
      <div>
        <div><b>Fruit Description:</b>  ${fruitDesc}</div>
      </div>
    `
  } else {
    return '';
  }
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
            <div><b>Description:</b> ${flower.description}</div>
            <div><b>Habitat:</b> ${flower.habitat}</div>
            ${ createFlowerDescHtml(flower) }
            ${ createFruitDescHtml(flower) }
            ${ createImagesDiv(flower) } 
          </div>
        `

        $('#flower_details').modal({ show: true })
      })
      //idIcon to put the ID visible 
      const idIcon = document.createElement('img')
      idIcon.src = '/img/idIcon.png'

      const iconContainer = document.createElement('div')
      iconContainer.classList.add('icon')
      iconContainer.style.width = '30px'
      iconContainer.style.height = '30px'
      iconContainer.style.top = 0
      iconContainer.appendChild(idIcon)
      
      flowerEl.innerHTML = flower.name;    
      flowerEl.classList.add('flower')    
      
      // /img/flowers/id/preview.jpg
      const previewImgUrl = '/img/flowers/' + flower.id + '/preview.jpg'
      const flowerImg = document.createElement('img')
      flowerImg.src = previewImgUrl
      flowerEl.appendChild(iconContainer)
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
