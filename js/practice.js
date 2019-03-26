const flowerDef = {
    "id": "g_hiemalis",
    "index": 13,
    "name": "",      
    "types": ["flower", "cone_fruit"],
    "images": ["cone", "tree", "flower"],
    "otherNames": {
        "common": "Heath-leaf banksia",
        "noogar": "Some Other Name",
        "x": "ABC",
        "bbb": "Yzasd"
    }, 
    "floweringPeriod": ["spring, winter"],
    "shortDesc": "named after Charles Gardner, a former Government botanist of WA",    
    "description": "A prostrate form which has three different varieties (var gardneri, var hiemalis, var brevidentata). Variety gardneri has deep green leaves with deep lobes. It flowers in Spring with rusty brown conical spikes. Variety brevidentata has large green leaves with toothed margins. It flowers in winter with rusty brown flower spikes. Variety hiemalis has pale green leaves with deep lobes and pink flower spikes in winter.", 
    "flowerDesc": "It has orange-brown and cream flower spikes that appear in late spring (October – December)",
    "habitat": "B gardneri occurs on heathland along the south coast of WA from Albany to Hopetoun."   
}

/**
 * <div>
 *     <div>
 *          <span>Common</span> <span>Heath-leaf banksia</span>
 *     </div>
 *     <div>
 *          <span>Noogar</span> <span>Some Other Name</span>
 *     </div>
 * </div>
 * 
 */
function createCommonNamesDiv(flower) {
    const otherNames = flower.otherNames
    
    Object.keys(otherNames).forEach( key => {
        console.log(key, otherNames[key])        
    })

    //console.log(otherNames.common)
    //console.log(otherNames.noogar)
    
    //console.log(otherNames['common'])
}

/**
 * 
 * <div>
 *      <img src="/img/flowerid/cone.jpg"/>
 *      <img src="/img/flowerid/tree.jpg"/>
 *      <img src="/img/flowerid/flower.jpg"/>
 * </div>
 */
function createImagesDiv(flower) {
    const images = flower.images
    let imgs = ''
    images.forEach( function(image) {
        imgs =  `${imgs}\n<img src="/img/${flower.id}/${image}.jpg"/>`
    })
    return `<div>${imgs}</div>`
}  

// const flowerImagesDiv = createImagesDiv(flowerDef)
// const flowerCommonNamesDiv = createCommonNamesDiv(flowerDef)

//console.log(flowerCommonNamesDiv)

// function createImagesDiv2(flower) {
//     const images = flower.images // ['cone', 'tree', 'flower ]

//     const result = images.map(function(image) {
//         return `<img src="/img/flower/${flower.id}/${image}.jpg" />`
//     }).reduce((a,b) => `${a}\n${b}`)

//     console.log(result)
// }

createImagesDiv2(flowerDef)