
const USER_FILTER = []
const flowersContainers = document.getElementById("flowers_container")
let FLOWERS =  [] // array of flowers
let FLOWERS_MAP = {}

const flowerSvg = (width=24,height=24) => {
  return `
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="${width}" height="${height}" viewBox="0 0 24 24">
      <path  d="M3,13A9,9 0 0,0 12,22A9,9 0 0,0 3,13M5.44,15.44C7.35,16.15 8.85,17.65 9.56,19.56C7.65,18.85 6.15,17.35 5.44,15.44M12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,22M14.42,19.57C15.11,17.64 16.64,16.11 18.57,15.42C17.86,17.34 16.34,18.86 14.42,19.57M12,14A6,6 0 0,0 18,8V3C17.26,3 16.53,3.12 15.84,3.39C15.29,3.62 14.8,3.96 14.39,4.39L12,2L9.61,4.39C9.2,3.96 8.71,3.62 8.16,3.39C7.47,3.12 6.74,3 6,3V8A6,6 0 0,0 12,14M8,5.61L9.57,7.26L12,4.83L14.43,7.26L16,5.61V8A4,4 0 0,1 12,12A4,4 0 0,1 8,8V5.61Z" />
    </svg>
  `
}

const coneSvg = (width=24, height=24) => {
  return `
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="${width}" height="${height}" viewBox="0 0 24 24">
    <path  d="M12,2L1,21H23M12,6L19.53,19H4.47" />
    </svg>
  `
}  

const leafSvg = (width=24, height=24) => {
  return `
    <svg fill="currentColor" width=${width} height=${height} viewBox="0 0 24 24">
      <path  d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
    </svg>
  ` 
}
const summerSvg = (width=24, height=24) => {
  return `
    <svg fill="currentColor" width=${width} height=${height} viewBox="0 0 24 24">
      <path  d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z" />
    </svg>
  `
}
const autumnSvg = (width=24, height=24) => {
  return `
    <svg fill="currentColor"  width=${width} height=${height} viewBox="0 0 24 24">
      <path d="M21.79,13L16,16L17,18L13,17.25V21H11V17.25L7,18L8,16L2.21,13L3.21,11.27L1.61,8L5.21,7.77L6.21,6L9.63,9.9L8,5H10L12,2L14,5H16L14.37,9.9L17.79,6L18.79,7.73L22.39,7.96L20.79,11.19L21.79,13Z" />
    </svg>
  `
}

const springSvg = (width=24, height=24) => {
  return `
    <svg fill="currentColor" style="width:${width}px;height:${width}px" viewBox="0 0 24 24">
      <path  d="M10.5,3C8,3 6,5 6,7.5C6,8.11 6.13,8.71 6.37,9.27C5.5,10.12 5,11.28 5,12.5C5,15 7,17 9.5,17C10,17 10.5,16.89 11,16.72V21H13V15.77C13.5,15.91 14,16 14.5,16A5.5,5.5 0 0,0 20,10.5A5.5,5.5 0 0,0 14.5,5C14.41,5 14.33,5 14.24,5C13.41,3.76 12,3 10.5,3M10.5,5C11.82,5 12.91,6.03 13,7.35C13.46,7.12 14,7 14.5,7A3.5,3.5 0 0,1 18,10.5A3.5,3.5 0 0,1 14.5,14C13.54,14 12.63,13.61 11.96,12.91C11.76,14.12 10.72,15 9.5,15A2.5,2.5 0 0,1 7,12.5C7,11.12 7.8,10.54 9,9.79C8.2,8.76 8,8.16 8,7.5A2.5,2.5 0 0,1 10.5,5Z" />
    </svg>
  `
}
const winterSvg = (width=24, height=24) => {  
  return `
    <svg fill="currentColor" style="width:${width}px;height:${height}px" viewBox="0 0 24 24">
      <path  d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z" />
    </svg>
  `
}
const SVG_ICONS = {
  flower: flowerSvg,
  cone_fruit: coneSvg,
  tree_leaf: leafSvg,
  summer: summerSvg,
  autumn: autumnSvg,
  spring: springSvg,
  winter: winterSvg
}

function createSvgAttribIcon(name) {
  let svgStrFn = SVG_ICONS[name]
  if ( !svgStrFn ) {
    throw new Error('unable to find ' + name)
  }
  return `<i>${svgStrFn(16,16)}</i>`
}

document.getElementById('flower_filter_flower').innerHTML = `
  <i>${flowerSvg()}</i> <span>Flower</span>
`
document.getElementById('flower_filter_cone').innerHTML = `
  <i>${coneSvg()}</i> <span>Cone/Fruit</span>
`
document.getElementById('flower_filter_leaf').innerHTML = `
  <i>${leafSvg()}</i> <span>Tree/Leaf</span>
`
document.getElementById('flower_filter_summer').innerHTML = `
  <i>${summerSvg()}</i> <span>Summer</span>
`
document.getElementById('flower_filter_autumn').innerHTML = `
  <i>${autumnSvg()}</i> <span>Autum</span>
`
document.getElementById('flower_filter_spring').innerHTML = `
  <i>${springSvg()}</i> <span>Spring</span>
`
document.getElementById('flower_filter_winter').innerHTML = `
  <i>${winterSvg()}</i> <span>Winter</span>
`


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

function createAttribsIcon(attribs) {

  let attribIcons = ''
  for ( const attr of attribs ) {
    attribIcons += createSvgAttribIcon(attr);    
  }
  
  return attribIcons

}

function flowerHasAllFilterAttributes(flower) {  
  for ( const filter of USER_FILTER ) {
    if ( flower.attributes.indexOf(filter) < 0 ) {     
      return false;
    }
  }

  return true
}

function renderFlowers() {
  const flowersArr = FLOWERS
  const renderedFlowers = []  
  for ( const flower of flowersArr ) {

    if ( USER_FILTER.length === 0 || flowerHasAllFilterAttributes(flower) ) {
      let imgPreviewPath = `/img/flowers/${flower.id}/preview.jpg`
      if ( Boolean(flower.as) ) {
        imgPreviewPath = `/img/flowers/${flower.as}/preview.jpg`
      }

      const flowerEl = document.createElement('div')
      flowerEl.classList.add('flower')       
      flowerEl.innerHTML = `
        
        <div style="position: relative;" data-desc="image-container">
          <div class="flower_index">${flower.index}</div> 
          <div class="flower_img"><img src="${imgPreviewPath}"/></div>
          <div class="flower_icon_cont"/>          
        </div>
        <div class="flower_name">${flower.name}</div>
        <div class="flower_attributes">
          <div>${createAttribsIcon(flower.types)}</div>
          <div>${createAttribsIcon(flower.floweringPeriod)}</div>
        </div>
      `
      flowerEl.addEventListener('click', function() {
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

      flowersContainers.appendChild(flowerEl)
      renderedFlowers.push(flowerEl)
    }
  }  
    
  renderedFlowers.forEach( el => {
    window.requestAnimationFrame( () => {
      setTimeout( function() {
        el.classList.add('flower_visible')
      }, Math.floor(Math.random() * 600))
    })
    
  })

  
  
}

function isFilterInSelectedFilter(filter) {
  return USER_FILTER.indexOf(filter) >= 0
}
function removeUserFilter(filter) {
  const index = USER_FILTER.indexOf(filter)
  if ( index >= 0 ) {
    USER_FILTER.splice(index, 1)
  }
}
//retrieve flowers db
function fetchAndRenderAllFlowers(type,season) {  
  fetch('/flowersdb.json')
    .then(convertResponseToJson)
    .then(function(flowersArr) {
      
      // add attributes to the flower, combine 
      // type and season so its easier to filter      
      FLOWERS = flowersArr.map(flower => {
        const floweringPeriod = flower.floweringPeriod.map( period => period.toLowerCase())
        const updatedFlower = Object.freeze(Object.assign({}, flower, { floweringPeriod: floweringPeriod, attributes: [].concat(flower.types).concat(flower.floweringPeriod) }))
        FLOWERS_MAP[flower.id] =updatedFlower
        return updatedFlower
      })

      renderFlowers()
    });
}

document.querySelectorAll('.flower_type')
        .forEach(function(flowerTypeEl) {
          flowerTypeEl.addEventListener('click',function() {
            const filter = flowerTypeEl.getAttribute('data-filter')            
            if ( isFilterInSelectedFilter(filter) ) {
              //remove
              removeUserFilter(filter)
              flowerTypeEl.classList.remove('filter_type_selected')
            } else {
              USER_FILTER.push(filter)
              flowerTypeEl.classList.add('filter_type_selected')
            }
            // check if its inside the filter           
            flowersContainers.innerHTML = '' 
            renderFlowers()

          });
        })
document.querySelectorAll('.flower_season')
        .forEach(function(flowerSeasonEl) {

          flowerSeasonEl.addEventListener('click', function() {
            const filter = flowerSeasonEl.getAttribute('data-filter')  
            if ( isFilterInSelectedFilter(filter) ) {
              //remove
              removeUserFilter(filter)
              flowerSeasonEl.classList.remove('filter_flowerings_selected')
            } else {
              USER_FILTER.push(filter)
              flowerSeasonEl.classList.add('filter_flowerings_selected')
            }
            flowersContainers.innerHTML = ''
            renderFlowers()
          })
})
        
fetchAndRenderAllFlowers();
