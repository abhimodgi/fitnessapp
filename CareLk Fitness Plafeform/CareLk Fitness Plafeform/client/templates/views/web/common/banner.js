Template.banner.onCreated(function() {
  
    setTimeout(function() {
     window.scrollTo(0,1);   
    }, 0);     
	
   $().UItoTop({ easingType: 'easeOutQuart' });
});

Template.banner.onRendered(function() {
  
		 console.log("banner.onRendered timeout");
    
	$(".scroll").click(function(event){		
				event.preventDefault();
				$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
			});
			              
});
