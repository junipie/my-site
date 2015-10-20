(function(){
$.getJSON( "http://localhost:3000/api/blogs", function(data) {
  var items = [];
  $.each( data, function(key, val) {
    items.push("<div class='post'><div class='entry-meta'><div class='date'>" + val.date + "</div></div><div class='main'><h2 class='entry-title'>" + val.title +"</h2><div class='entry-content'>" + val.content + "</div></div></div>");
  });
  $("<div/>",{
    "class": "blogs-area",
    html: items.join("")
  }).appendTo("#blog-posts");
});
})();