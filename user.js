// ==UserScript==
// @name       RCMB Moderator Tool
// @description Adds useful buttons for RCMB Moderators
// @namespace  http://www.davemulder.com/
// @version    0.1
// @match      http://michiganstate.247sports.com/*
// @require    http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
  

var threadId = typeof $tfs.Content === "object" ? $tfs.Content.Key : false;
  
 
function createButtons(){
    
   
    $(".comment_lst > li").each(function(){
	    
	    // add a class to make selection easier
	    $(this).addClass("reply-row");
	    
	    // get the post url
	    var postUrl = $(this).attr("data-posturl");
        
        // get the alias
        var alias = $(this).attr("data-alias");
        	    

	    
	    
	 
	    $(this).find(".avatarinfo_lst").each(function(){
		    
		   var html = "";
           html += "<li style='margin-top:15px;'>";
		   
		   html += "<button class='delete-link' data-delete-url='" + postUrl + "'>";
		   html += "Remove This Post";
		   html += "</button>";
            
           html += "</li>";
            
            
           html += "<li style='margin-top: 10px;'>";

           

           html += "<button class='thread-ban-link' data-alias='" + alias + "'>";
           html += "Thread Permaban";
           html += "</button>";
            
		   html += "</li>";
		   
		   $(this).after(html);
		   		    
	    });
	      
	      
    });
    
    bindDeleteLinks();
    bindThreadBanLinks();
}
 
  
function bindThreadBanLinks(){
	
    //
	
	
	$(".thread-ban-link").click(function(){
		

        // url
        var postUrl = "/User/" + $(this).attr("data-alias") + "/UserBanContents";
                
        // post it
        $.post(postUrl, { "submit": "Blacklist", "Filter_Content.Key": threadId, "Content.Key": threadId, "Expire": "12/31/2040 11:59:59 PM", "Site.Key": "17", "Reason": "Banned from thread at Moderator Discretion" });
	
	});
	
}
  
  
function bindDeleteLinks(){
		
	
	$(".delete-link").click(function(){
		
		console.log("delete link clicked");
				
		var postUrl = $(this).attr("data-delete-url");
		
		
		if (typeof postUrl === "string"){
			deletePost(postUrl);
		}
		
			
		$(this).parents(".reply-row").fadeOut(500);
			
		

	});
	
}
  
  
function deletePost(postUrl){

	$.post(postUrl, { "X-HTTP-Method-Override": "Delete", "Reason": "Removed at Moderator Discretion" });
	
}


createButtons();
  

