$(function() {
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="main__message__box" data-message-id= "${message.id}">
          <div class="main__message__box__top">
            <div class="main__message__box__top__name">
              ${message.user_name}
            </div>
            <div class="main__message__box__top__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main__message__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  }
  
  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},);
  }
  //非同期通信
  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);   
    var url = $(this).attr('action');  
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $("form")[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.form__submit').attr('disabled', false);　
    })
    function scrollBottom(){        
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    }
  });
  //自動更新
  var reloadMessages = function() {
    last_message_id = $(".message").last().data("id");     //messageはクラス名
    $.ajax({
      url: 'api/messages',  
      type: 'get',  
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
      insertHTML = buildHTML(message);         
      $('.messages').append(insertHTML)
      ScrollToNewMessage();
      });
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
});


