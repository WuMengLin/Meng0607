var body = document.body;
var todo = document.querySelector(".todo");
var btn = document.querySelector(".btn");
var list = document.querySelector(".list");
var data = JSON.parse(localStorage.getItem("todolist"))||[];//若是空值則放[]

function showlist(){
    var str = '';
    for(i=0;i<data.length;i++){
        var whattodo='<li><div class="'+data[i].mark+'" data-num='+i+'></div><div class="text">'+data[i].thing+'</div><a class="del" data-num='+i+' href="#">刪除</a></li>';
        str=str+whattodo;
    }
    list.innerHTML=str;
}

function addlist(e){
	e.preventDefault();
    if(todo.value==''){alert('請輸入內容'); return;}
    var str={
        thing:todo.value,
        mark:'circle'
    };
    data.push(str);
    localStorage.setItem("todolist",JSON.stringify(data));
    showlist();
    todo.value='';
}

function clearlist(e){
    e.preventDefault();
    if(e.target.nodeName!=='A'){return;}
        data.splice(e.target.dataset.num,1);
        localStorage.setItem("todolist",JSON.stringify(data));
        showlist();
}

list.addEventListener('click',function(e){
    event.preventDefault();
    if(e.target.className=='circle'||e.target.className=='circle active'){
        if(data[e.target.dataset.num].mark=='circle'){
            data[e.target.dataset.num].mark='circle active';
        }
        else{
            data[e.target.dataset.num].mark='circle';
        }
    }
    localStorage.setItem("todolist",JSON.stringify(data));
    showlist();
},false);

body.addEventListener('keydown',function(e){
	if(e.keyCode=='13'){addlist(e);}
},false);

btn.addEventListener('click',addlist,false);
list.addEventListener('click',clearlist,false);
showlist();