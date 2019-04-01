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
  $('a[href*=\\#]').on('click', function(e) {
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
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


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

const textButton = document.getElementById("onoffbutton");

textButton.addEventListener('click', function() {
  if(textButton === undefined) {
    textButton.unbind('click')
    console.log('undefined')
  } else {
    console.log('hovering')
  }
})


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


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})