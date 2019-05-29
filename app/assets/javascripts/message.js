$(function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__detail">
                    <p class="message__detail__current-user-name">
                      ${message.user_name}
                    </p>
                    <p class="message__detail__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message_body">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  
  
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
      $('.message_content').val('')
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
});


