var cart ={};

function loadcart(){
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        if(!isempty(cart)){
            $('.maincart').html('Козина пуста');
        }
        else{
            showcart();
        }
        
    }
    else{
        $('.maincart').html('Козина пуста');
    }
}

function showcart(){
    if(!isempty(cart)){
        $('.maincart').html('Козина пуста');
    }
    else{
        $.getJSON('goods.json',function(data){
            var out='';
            var goods = data;
            for(var id in cart){
                //key is my id
                out+=`<button data-id="${id}" class="delgoods">x</button>`;
                out+=`<img src="${goods[id].img}">`;
                out+=`  ${goods[id].name}`;
                out+=`  <button data-id="${id}" class="minusgoods">+</button>`;
                out+=`  ${cart[id]  }`;
                out+=`  <button data-id="${id}" class="plusgoods">+</button>`;
                out+=cart[id]*goods[id].cost;
                out+='<br>';
            }
            $('.maincart').html(out);
            $('.delgoods').on('click',delgoods);
            $('.plusgoods').on('click',plusgoods);
            $('.minusgoods').on('click',minusgoods);
        });
    }
}

function delgoods(){
    var id=$(this).attr('data-id');
    delete cart[id];
    savecart();
    showcart();
}

function plusgoods(){
    var id=$(this).attr('data-id');
    cart[id]++;
    savecart();
    showcart();
}

function minusgoods(){
    var id=$(this).attr('data-id');
    if(cart[id]!=0){
        cart[id]--;
    }
    else{
        delete cart[id];
    }
    savecart();
    showcart();
}

function savecart(){
    //сохранить корзину
    localStorage.setItem('cart',JSON.stringify(cart));
}

function isempty(object){
    for(var key in object){
        if(object.hasOwnProperty(key)) return true;
        return false;
    }
}

function sendem(){
    var ename= $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if(ename!='' && email!='' && ephone!=''){
        if(isempty(cart)){
            $.post(
                "core/mail.php",
                {
                    "ename":ename,
                    "email":email,
                    "ephone":ephone,
                    "cart":cart
                },
                function(data){
                    console.log(data);
                }
            );
        }
        else
        {
            alert('Корзина пуста');
        }
    }
    else{
        alert('Заполните поля');
    }
}

$(document).ready(function(){
    loadcart();
    $('.sendem').on('click',sendem);
});