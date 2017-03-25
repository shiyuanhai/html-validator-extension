$(document).ready(function(){

  var htmlString = "<!DOCTYPE html>";

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.executeScript(tab.id, {
      code: 'document.documentElement.outerHTML'
    }, function(results){
      console.log(results[0]);
      htmlString += results[0];
    });;
  });

  $("#validate").click(function(){
    var formData = new FormData();
    formData.append("content", htmlString);
    $.ajax({
      url: 'https://validator.w3.org/nu/',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        $("#results").html($(data).filter("div#results").html());
      }
    });
  });
});
