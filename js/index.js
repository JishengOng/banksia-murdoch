/*document.getElementById("orchestra").addEventListener("click", function()
{
	var audio = document.getElementById('testAudio');

  if(this.className == 'is-playing')
  {
    alert("will become a pause in the next step");
    this.className = "";
    /* this.innerHTML = "Play"; 
    audio.pause();
  }
  
  else
  {
    alert("will play in the next step");
    this.className = "is-playing";
    /*this.innerHTML = "Pause";  
    audio.play();
  }

});  */


// Scroll button for Homepage
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});




function toggleSound() {
  var audioElem = document.getElementById('testAudio');
  if (audioElem.paused)
    audioElem.play();
  else
    audioElem.pause();
}

jQuery(function($) 
              {
                $('#musica')
                  .on('click', function() 
                      {
                     /* alert('orchestra on click'); */ 
                      var $el = $(this),
                      textNode = this.lastChild;
                     /*  alert(textNode); */

                      $el.find('span').toggleClass("muted_music");
                      /*textNode.nodeValue = 'Gimme' + 
                      ($el.hasClass('btn btn-danger btn-lg                                       btn3d') ?  'Orchestra On':'Music Gone') */ 
                      //$el.toggleClass("muted_music");               
                      }
                    );
              }
          );


/*
var bgm=document.getElementById("bgm");

function bgmPlay()
{
  /*
  alert('isPlaying');
  alert('bgmplay'); 
   if (isPlaying) 
   {
    alert ('currently playing. now this will pause');
              
     bgm.pause();
    }
    else
    {
      alert('currently not playing. now this will play');
      bgm.play();
    }
};

bgm.onplaying = function() {
  alert('bgm on playing'); 
  isPlaying = true;
};

bgm.onpause = function() {
  alert('bgm pause');
  isPlaying = false;
};

*/

/* Slides for the Homepage */
var slideshowDuration = 4000;
var slideshow=$('.main-content .slideshow');

function slideshowSwitch(slideshow,index,auto){
  if(slideshow.data('wait')) return;

  var slides = slideshow.find('.slide');
  var pages = slideshow.find('.pagination');
  var activeSlide = slides.filter('.is-active');
  var activeSlideImage = activeSlide.find('.image-container');
  var newSlide = slides.eq(index);
  var newSlideImage = newSlide.find('.image-container');
  var newSlideContent = newSlide.find('.slide-content');
  var newSlideElements=newSlide.find('.caption > *');
  if(newSlide.is(activeSlide))return;

  newSlide.addClass('is-new');
  var timeout=slideshow.data('timeout');
  clearTimeout(timeout);
  slideshow.data('wait',true);
  var transition=slideshow.attr('data-transition');
  if(transition=='fade'){
    newSlide.css({
      display:'block',
      zIndex:2
    });
    newSlideImage.css({
      opacity:0
    });

    TweenMax.to(newSlideImage,1,{
      alpha:1,
      onComplete:function(){
        newSlide.addClass('is-active').removeClass('is-new');
        activeSlide.removeClass('is-active');
        newSlide.css({display:'',zIndex:''});
        newSlideImage.css({opacity:''});
        slideshow.find('.pagination').trigger('check');
        slideshow.data('wait',false);
        if(auto){
          timeout=setTimeout(function(){
            slideshowNext(slideshow,false,true);
          },slideshowDuration);
          slideshow.data('timeout',timeout);}}});
  } else {
    if(newSlide.index()>activeSlide.index()){
      var newSlideRight=0;
      var newSlideLeft='auto';
      var newSlideImageRight=-slideshow.width()/8;
      var newSlideImageLeft='auto';
      var newSlideImageToRight=0;
      var newSlideImageToLeft='auto';
      var newSlideContentLeft='auto';
      var newSlideContentRight=0;
      var activeSlideImageLeft=-slideshow.width()/4;
    } else {
      var newSlideRight='';
      var newSlideLeft=0;
      var newSlideImageRight='auto';
      var newSlideImageLeft=-slideshow.width()/8;
      var newSlideImageToRight='';
      var newSlideImageToLeft=0;
      var newSlideContentLeft=0;
      var newSlideContentRight='auto';
      var activeSlideImageLeft=slideshow.width()/4;
    }

    newSlide.css({
      display:'block',
      width:0,
      right:newSlideRight,
      left:newSlideLeft
      ,zIndex:2
    });

    newSlideImage.css({
      width:slideshow.width(),
      right:newSlideImageRight,
      left:newSlideImageLeft
    });

    newSlideContent.css({
      width:slideshow.width(),
      left:newSlideContentLeft,
      right:newSlideContentRight
    });

    activeSlideImage.css({
      left:0
    });

    TweenMax.set(newSlideElements,{y:20,force3D:true});
    TweenMax.to(activeSlideImage,1,{
      left:activeSlideImageLeft,
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlide,1,{
      width:slideshow.width(),
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlideImage,1,{
      right:newSlideImageToRight,
      left:newSlideImageToLeft,
      ease:Power3.easeInOut
    });

    TweenMax.staggerFromTo(newSlideElements,0.8,{alpha:0,y:60},{alpha:1,y:0,ease:Power3.easeOut,force3D:true,delay:0.6},0.1,function(){
      newSlide.addClass('is-active').removeClass('is-new');
      activeSlide.removeClass('is-active');
      newSlide.css({
        display:'',
        width:'',
        left:'',
        zIndex:''
      });

      newSlideImage.css({
        width:'',
        right:'',
        left:''
      });

      newSlideContent.css({
        width:'',
        left:''
      });

      newSlideElements.css({
        opacity:'',
        transform:''
      });

      activeSlideImage.css({
        left:''
      });

      slideshow.find('.pagination').trigger('check');
      slideshow.data('wait',false);
      if(auto){
        timeout=setTimeout(function(){
          slideshowNext(slideshow,false,true);
        },slideshowDuration);
        slideshow.data('timeout',timeout);
      }
    });
  }
}

function slideshowNext(slideshow,previous,auto){
  var slides=slideshow.find('.slide');
  var activeSlide=slides.filter('.is-active');
  var newSlide=null;
  if(previous){
    newSlide=activeSlide.prev('.slide');
    if(newSlide.length === 0) {
      newSlide=slides.last();
    }
  } else {
    newSlide=activeSlide.next('.slide');
    if(newSlide.length==0)
      newSlide=slides.filter('.slide').first();
  }

  slideshowSwitch(slideshow,newSlide.index(),auto);
}

function homeSlideshowParallax(){
  var scrollTop=$(window).scrollTop();
  if(scrollTop>windowHeight) return;
  var inner=slideshow.find('.slideshow-inner');
  var newHeight=windowHeight-(scrollTop/2);
  var newTop=scrollTop*0.8;

  inner.css({
    transform:'translateY('+newTop+'px)',height:newHeight
  });
}

$(document).ready(function() {
 $('.slide').addClass('is-loaded');

 $('.slideshow .arrows .arrow').on('click',function(){
  slideshowNext($(this).closest('.slideshow'),$(this).hasClass('prev'));
});

 $('.slideshow .pagination .item').on('click',function(){
  slideshowSwitch($(this).closest('.slideshow'),$(this).index());
});

 $('.slideshow .pagination').on('check',function(){
  var slideshow=$(this).closest('.slideshow');
  var pages=$(this).find('.item');
  var index=slideshow.find('.slides .is-active').index();
  pages.removeClass('is-active');
  pages.eq(index).addClass('is-active');
});

/* Lazyloading
$('.slideshow').each(function(){
  var slideshow=$(this);
  var images=slideshow.find('.image').not('.is-loaded');
  images.on('loaded',function(){
    var image=$(this);
    var slide=image.closest('.slide');
    slide.addClass('is-loaded');
  });
*/

var timeout=setTimeout(function(){
  slideshowNext(slideshow,false,true);
},slideshowDuration);

slideshow.data('timeout',timeout);
});

if($('.main-content .slideshow').length > 1) {
  $(window).on('scroll',homeSlideshowParallax);
}


// Select navigation button
const menuButton = document.querySelector(".navigation__btn");
// Add click event listener to menu button
menuButton.addEventListener("click", showMenu);
// Selevt navigation list
const navigationList = document.querySelector(".navigation__list");

// Toggle Navigation Menu
function showMenu() {
  menuButton.classList.toggle("navigation__btn--active");
  navigationList.classList.toggle("navigation__list--active");
  if (menuButton.getAttribute("aria-expanded") === "false") {
    menuButton.setAttribute("aria-expanded", true);
  } else {
    menuButton.setAttribute("aria-expanded", false);
  }
}

// Select dropdown button
const dropBtn = document.querySelectorAll(".navigation__drop-btn");
console.log(typeof dropBtn);

// Set click event listener on each dropdown button
dropBtn.forEach(v => {
  v.addEventListener("click", showDropdown);
});

// Toggle dropdown items
function showDropdown(e) {
  console.log(e.target.classList);
  e.target.classList.toggle("triangle");
  if (e.target.classList.contains("more")) {
    console.log("hello");
    document
      .querySelector(".navigation__dropdown--more")
      .classList.toggle("navigation__dropdown--active");
  } else if (e.target.classList.contains("shop")) {
    document
      .querySelector(".navigation__dropdown--shop")
      .classList.toggle("navigation__dropdown--active");
  }
}

// Select slideshow elements
const slides = document.getElementsByClassName("header__back");

// Select slideshow arrows
const handleLeft = document.querySelector(".arrow-left");
const handleRight = document.querySelector(".arrow-right");
// Set initial slide index
let slideIndex = 1;

// Add 1 or subtract 1 if right or left arrow are clicked
handleLeft.addEventListener("click", () => {
  plusSlide(-1);
});
handleRight.addEventListener("click", () => {
  plusSlide(+1);
});

// Call first slide
slideImg(slideIndex);

// Add or subtract 1 to the slideshowIndex
function plusSlide(num) {
  console.log("click");
  slideImg((slideIndex += num));
}

//Slide the images
function slideImg(n) {
  console.log(n);
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log(slideIndex);
  slides[slideIndex - 1].style.display = "flex";
}

// Select all links in navigation menu
const navigationLink = document.querySelectorAll(".navigation__link");

// Set click event listener on each navigation link
navigationLink.forEach(v => {
  v.addEventListener("click", closeMenu);
});

// If a link in the navigation menu is clicked close the menu and change
// menu button shape
function closeMenu() {
  navigationList.classList.remove("navigation__list--active");
  menuButton.classList.toggle("navigation__btn--active");
  menuButton.setAttribute("aria-expanded", false);
}



// RESPONSIVE FIXED SIDE MENU 
			$(document).ready(function () {
			  $('.menuIcon').click(function () {
				  if ($('.NavigationSlideOut').css("left") == "-300px") {
					  $('.NavigationSlideOut').animate({left: '0px'}, 350);
				  } 
				  else  {
					  $('.NavigationSlideOut').animate({left: '-300px'}, 350); 
				  } 
			  });
			  $(document).click(function(){
				if($('.NavigationSlideOut').css('left') == '0px' && $('.menuIcon').hasClass('on') ) {
				  $('.NavigationSlideOut').animate({left: '-300px'}, 350);
				  $('.menuIcon').toggleClass("on");
				}
			  })
			  $('.menuIcon').click(function () {
				$(this).toggleClass("on"); 
			  }); // animation = -> x
          });
		


// ENLARGE TEXT BOIIII START --------------------------------------------------------------------

	// Increase/descrease font size
	$('#increasetext').click(function() {
		curSize = parseInt($('#content').css('font-size')) + 2;
		if (curSize <= 32)
			$('#content').css('font-size', curSize);
	});

	$('#resettext').click(function() {
		if (curSize != 18)
			$('#content').css('font-size', 18);
	});

	$('#decreasetext').click(function() {
		curSize = parseInt($('#content').css('font-size')) - 2;
		if (curSize >= 14)
			$('#content').css('font-size', curSize);
	});
// ENLARGE TEXT BOIIII END --------------------------------------------------------------------








 
// CODE FOR FLOWERS FILTERING TABLE START---------------

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("filterbtn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
 
// CODE FOR FLOWERS FILTERING TABLE END--------------





// CODE FOR WHERE MURDOCH BANKSIA GARDEN IS AT START--------------------------------------

// jQuery v3.3.1 is supported
const marker = document.getElementById('marker');
const card = document.getElementById('card');

marker.addEventListener('click', function() {
	marker.classList.add('inactive');
	card.classList.add('active');
})

card.addEventListener('click', function() {
	marker.classList.remove('inactive');
	card.classList.remove('active');
})


// CODE FOR WHERE MURDOCH BANKSIA GARDEN IS AT END--------------------------------------