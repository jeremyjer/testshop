var cart={};//корзина
function init(){
    //файл гудс
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data){
    //инит
    console.log(data);
    var out ='';
    for(var key in data){
        // out+='<div class="cart">';
        // out+='<p class="name">'+data[key].name+'</p>';
        // out+='<img src="'+data[key].img+'" alt="">';
        // out+='<div class="cost">'+data[key].cost+'</div>';
        // out+='<button class="add">Kupit</button>';
        // out+='</div>';
        //------------
        out+='<div class="cart">';
        out+=`<p class="name">${data[key].name}</p>`;
        out+=`<img src="${data[key].img}" alt="">`;
        out+=`<div class="cost">${data[key].cost}</div>`;
        out+=`<button class="add" data-id="${key}">Kupit</button>`;
        out+='</div>';
    }
    $('.goodsout').html(out);
    $('.add').on('click',add);
}
function add(){
    //добавляем товар
    var id=$(this).attr('data-id');
    if(cart[id]==undefined){
        cart[id]=1;//eсли в корзине нет товара - то 1
    }
    else{
        cart[id]++;
    }
    showminicart();
    savecart();
}

function savecart(){
    //сохранить корзину
    localStorage.setItem('cart',JSON.stringify(cart));
}

function showminicart(){
    var out="";
    for(var key in cart){
        out+=key+'----'+cart[key]+'<br>';
    }
    $('.minicart').html(out);
}

function loadcart(){
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        showminicart();
    }
}

$(document).ready(function(){
    init();
    loadcart();
});