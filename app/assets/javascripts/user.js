$(function(){
  $('#user-search-field').on('keyup', function() {
   var input = $("#user-search-filed").vall();
    $.ajax({
    url: url,
    type: "/users",
    data: users,
    dataType: 'json'
    })
  })  







})
