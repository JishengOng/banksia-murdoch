const flowerDef = [
    { 
      "id": "aemula",    
      "index": 1,    
      "name": "Banksia Aemula", 
      "otherNames": {
        "common" : "blah",
        "noongar": "hello"
      },
      "images": ["cone","flower","tree"], 
      "types": ["flower", "cone_fruit", "tree_leaf"],
      "floweringPeriod": ["autumn", "winter"],
      "shortDesc": "the name means to emulate as this species is very similar to Banksia serrata",    
      "description": "A small, spreading tree with dark grey, rough bark. The leaves are obovate with evenly serrated margins and green on both sides. The upper surface is glossy green and the underside is pale green and glabrous. The new leaves are rusty brown.",
      "flowerDesc": "The flower spikes are silvery yellow and about 8-15cm high and 5-10cm in diameter and are ovoid to cylindrical. It flowers in later winter and autumn.",
      "habitat": "Banksia aemula occurs on sandy dunes from southern Queensland to the Sydney region."
    },
    {
      "id": "ashbyi",
      "index": 2,
      "name": "Banksia Ashbyi",    
      "otherNames": {
        "common" : "blah",
        "noongar": "hello"
      },
      "images": ["cone","flower","tree"], 
      "types": ["flower", "cone_fruit", "tree_leaf"],
      "floweringPeriod": ["spring", "summer", "winter"],
      "shortDesc": "named after Edwin Ashby, a South Australian plant collector",
      "description": "This species is usually a medium sized shrub 2-4 metres high, with long, narrow, sharply serrated leaves (15-20cm long and up to 3cm wide), with a prominent yellow mid-rib.",
      "flowerDesc": "The flowers are large and upright and orange in colour and cylindrical or ovoid in shape. It flowers between August and November.",
      "habitat": "This species is from the mid-west coast of WA and is found on the coastal sandplain from Geraldton to Carnarvon. It is an attractive garden specimen and is widely planted on the Murdoch campus."
    }
]

// function createCommonNamesDiv(flower) {
//     const otherNames = flower.otherNames || {}

//     if ( Object.keys(otherNames).length === 0 ) {
//         return ''
//     }

//     let commonNameHtmStr = ''
//     let noogarNameStr = ''
//     if ( otherNames.common ) {
//         commonNameHtmStr = 
//         `<div>
//             <div>
//                 <span>Common name:</span>   <span>${otherNames.common}:</span> 
//             </div>
//             <div>
//                 <span>Noongar name:</span>   <span>${otherNames.noongar}</span> 
//             </div>
//         </div>
//         `
//     }
//     return `
//         <div>
//             ${commonNameHtmStr}
//             ${noogarNameStr}
//         </div>
//     `
    
//     Object.keys(otherNames).forEach( key => {
//         console.log(key, otherNames[key])        
//     })

//     console.log(otherNames.common)
//     console.log(otherNames.noogar)
    
//     console.log(otherNames['common'])

//     return 
    
// }
function createImagesDiv(flowerDef) {
    // const images = flower.images
    // let imgs = ''

    for ( const flower of flowerDef ) {
    const images = flower.images
    let imgs = ''
    images.forEach( function(image) {
        imgs =  `${imgs}\n<img src="/img/${flower.id}/${image}.jpg"/>`
    })
    return `<div>${imgs}</div>`
    }
}  

 //const flowerImagesDiv = createImagesDiv(flowerDef)
// const flowerCommonNamesDiv = createCommonNamesDiv(flowerDef)

//console.log(flowerCommonNamesDiv)

// function createImagesDiv2(flower) {
//     const images = flower.images // ['cone', 'tree', 'flower ]

//     const result = images.map(function(image) {
//         return `<img src="/img/flower/${flower.id}/${image}.jpg" />`
//     }).reduce((a,b) => `${a}\n${b}`)

//     console.log(result)
// }

createImagesDiv(flowerDef)
//const otherNamesString = createCommonNamesDiv(flowerDef[1])
//console.log(otherNamesString)
//createCommonNamesDiv(flowerDef)





/**
 * 
 * <div>
 *      <img src="/img/flowerid/cone.jpg"/>
 *      <img src="/img/flowerid/tree.jpg"/>
 *      <img src="/img/flowerid/flower.jpg"/>
 * </div>
 */