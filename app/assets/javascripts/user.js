$(function() {

 var search_list = $("#user-search-result");   //search_list←検索結果
 var member_list = $(".chat-group-user__name");

  function appendUserToSearchList(user) {   //検索リスト
  var html = 
     `<div class="chat-group-user clearfix">
         <p class="chat-group-user__name">${ user.name }</p>
         <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
     </div>`
　　 search_list.append(html);
　　 return html;
  }

  function appendUserToMemberList(name, user_id) {   //メンバーに追加
   var html = 
     `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
       <input name='group[user_ids][]' type='hidden' value=${ user_id }>
       <p class='chat-group-user__name'>${ name }</p>
       <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
     </div>`
　　 member_list.append(html);
 }

  function appendNoUserToSearchList(user) {
   var html = 
     `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${ user }</p>
     </div>`
   search_list.append(html);
 }

$(function(){                                            
   $("#user-search-field").on("keyup", function() {      //keyupは検索のクリックした時
    var input = $("#user-search-field").val();           //val()をinputに代入
 
      $.ajax({
       type: 'GET',
       url: '/users',
       data: { keyword: input },
       dataType: 'json'
     })
     .done(function(user) {
      $("#user-search-result").empty();    //empty() ：指定したDOM要素の”子要素のみ”を削除する。.remove()：指定したDOM要素自体を削除する
        if (user.length !== 0) {
          user.forEach(function(user){   //jbuilderから返ってきたuser,配列の出力
          appendUserToSearchList(user);  //appendUserToSearchList←user
          });
        }
        else {
          appendNoUserToSearchList("一致するユーザーはいません");
        }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
  $(function(){
    $(document).on('click', '.user-search-add', function() {
      var name = $(this).attr("data-user-name");    //attr名前取得
      var user_id = $(this).attr("data-user-id");   //id取得
      $(this).parent().remove();     //クリックした子要素と親要素を削除
      appendUserToMemberList(name, user_id);    //メンバーに追加
    });

　    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
})

})