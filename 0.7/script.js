$(function() {
    var i = 1

    var $list, $newItemForm;
    $list = $('ul');
    $newItemForm = $('#newItemForm');
  
    $newItemForm.on('submit', function(e) {
      e.preventDefault();
      var text = $('input:text').val();
      $list.append('<li id="'+ i +'">' + text + '</li> <button class="btnEdit">Edit</button> <button class="btnSupp">Supprimer</button>');
      $('input:text').val('');
      i++
    });
  
    $('body').on('click', '.btnSupp', function() {
        var id = $('li').val()
        var ids = $(this).preventDefault().attr('id')
        var text = $(this).preventDefault().html()
        console.log(ids,text)
        //id.remove()
    });


    $('body').on('click','.btnEdit', function(){
        $('.btnEdit').hide();
        var id = $(this).prev().attr('id')
        var text = $(this).prev().html()
        var li = $(this).prev()
        console.log(text,id)
        li.html(`<input id="${id}" type="text" value="${text}"/> <button class="valider">Valider</button>`)
    })

    $('body').on('click','.valider', function(){
        var id = $(this).prev().attr('id')
        var value = $(this).prev().val()// html()
        var li = $(this).prev()
        console.log(value,id,li)
        $(this).closest('li').html(value)

    })


});