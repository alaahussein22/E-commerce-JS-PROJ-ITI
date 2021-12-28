function showMsg() {
    location.assign('email-form.html')
}

// ///////////////
//function to open login form
function openLoginForm(){
    location.assign("LoginForm.html");
}

// login Script
function confirmData(e){
    e.preventDefault();
    var emailText = document.getElementById("emailAddress").value;
    var passText = document.getElementById("password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("get", "userData.json", true);
    xhr.send("");

    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4)
        {
            var jsonResponse = JSON.parse(xhr.response);
           // console.log(jsonResponse);
           var checkValid = false;
            for(var user in jsonResponse){
                if(emailText === jsonResponse[user].email && passText === jsonResponse[user].password){
                    //alert("alf mabrouk");
                    checkValid = true;
                    break;
                }
            }
            if(!checkValid){
                //alert("your email or password is not valid!!!");
                document.getElementById("errorText").innerHTML = "your email or password not valid!!!";
            }
            else{
                var checked = document.getElementById("checkBox").checked;
                if(checked)
                {
                    localStorage.setItem("activeUser", JSON.stringify({
                        "email": emailText,
                        "password": passText
                    }))
                    location.replace("index.html");
                    localStorage.setItem("email", emailText);
                    localStorage.setItem("password", passText);
                }
                else
                {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                }

                var golink = sessionStorage.getItem("orderLogin") ? "userCart.html" : "index.html";
                sessionStorage.setItem("loggedIn", true);
                location.replace(golink);

                console.log(localStorage.email);
                console.log(localStorage.password);
            }
        }
    }

    
    
}

function goRegister(e){
    e.preventDefault();
    document.querySelector(".loginForm").style.display = "none";
    document.querySelector(".registerForm").style.display = "flex";
    document.getElementById("formTitle").innerHTML = "Registration";
}

function saveData(e){
    e.preventDefault();
    var userText = document.getElementById("userName").value;
    var emailText = document.getElementById("regEmailAddress").value;
    var passText = document.getElementById("regPassword").value;

    localStorage.setItem("activeUser", JSON.stringify({
        "userName": userText,
        "email": emailText,
        "password": passText
    }))
    localStorage.setItem("email",emailText);
    localStorage.setItem("password",passText);
    location.replace("index.html");

    // var xhr =new XMLHttpRequest();
    // xhr.open("GET", "userData.json", true);
    // var newId = 0;
    // xhr.onreadystatechange = function(){
    //     if(xhr.status == 200 && xhr.readyState == 4){
    //         var jsonResponse = JSON.parse(xhr.responseText);
    //         jsonResponse.push( {
    //         "id": "3",
    //         "name": userText,
    //         "email": emailText,
    //         "password": passText,
    //         "address": "",
    //         "cart": []
    //     });

    //     xhr.open("POST", "userData.json", true);
    //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     xhr.send("jsonTxt="+JSON.stringify(jsonResponse));

    //     }
    // }
    // xhr.send(null);
}

//userCart form
function goOrder(){
    if(sessionStorage.getItem("loggedIn")){
        document.getElementById("orderForm").classList.remove("d-none");
        
    }
    else{
        sessionStorage.setItem("orderLogin", true);
        location.assign("LoginForm.html");
    }
}


//code of shop page
function addToCart(e){
    //console.log(e.target.localName);
    //[{"id":1, "category":"Women-perfumes","img": "./img/66.jpeg","name":"shrouk khaled", "price":"5000 EGP"} , {"id":2, "category":"Men-perfumes", "img": "./img/66.jpeg","name":"Khaled Shalaby", "price":"6000 EGP"},
    //{"id":1, "category":"Women-perfumes","img": "./img/66.jpeg","name":"Alaa Hussin", "price":"5000 EGP"} ]
    if(e.target.localName == "a"){
        var cartContent = (localStorage.getItem("cartContent"))? localStorage.getItem("cartContent") : [];
        cartContent.push({
            itemCode: document.getElementById("item-code"+e.target.parent.id)
        });
    }
}
if(document.title == "Shop"){
    showPerMenData();
    document.querySelector("#one").addEventListener("click",function(){
        var data= menData.filter(filterByID)
       })
       document.querySelector("#two").addEventListener("click",function(){
        var data= menData.filter(filterByClo)
       })
    document.querySelector("#three").addEventListener("click",function(){
     var data= menData.filter(filterByEle)
    })
  
}
//Add to Queue button
//event delegation

//display product in cart html
function generateCartProduct(productImg, productName, productPrice, productId){
    var cartProduct = 
    '<div class="card card-shadow shadow-lg my-2" onclick="removeItem(event)" id="cart-'+productId+'">'+
        '<div class="card-body row">'+
            '<div class="col-3 my-5">'+
                '<img src="'+productImg+'" alt="" class="card-img" id="cart-productImg" style="width: 150px; max-width: 100%; height: auto;">'+
            '</div>'+
            '<div class="col-7 my-5 d-flex" style="flex-direction: column; justify-content: space-between;">'+
                '<div>'+
                    '<h5 class="card-title">'+productName+'</h5>'+
                    '<p class="card-text">'+productPrice+'</p>'+
                '</div>'+
                '<p class="m-0 item-code">item code: '+productId+'</p>'+
            '</div>'+
            '<div class="col-2 d-flex my-5 text-center" style="flex-direction: column; justify-content: space-between;"> '+
                '<i class="fas fa-trash remove-item " style="font-size:20px; "></i>'+
                // '<select name="quantity" id="quantity" class="px-3">'+
                //     '<option value="1">1</option>'+
                //     '<option value="2">2</option>'+
                //     '<option value="3">3</option>'+
                // '</select>'+
            '</div>'+
            
        '</div>'+
    '</div>';

    return cartProduct;
}

function removeItem(e){
    if(e.target.classList.contains("remove-item")){
        e.target.parentNode.parentNode.parentNode.remove();
        var removedId = e.target.parentNode.parentNode.parentNode.id.split("-")[1];
        var newCartContent =JSON.parse(localStorage.getItem("cartContent")).filter(function(index){
            if(index.id != removedId){
                return index;
            }
            //console.log(index);
        });
       // console.log(document.querySelector(".card-text").innerHTML);
        localStorage.setItem("cartContent", JSON.stringify(newCartContent));

        //console.log(newCartContent);
        //console.log(JSON.parse(localStorage.getItem("cartContent"))[0]);
    }
    
}

var totalpriceAll=0;
if(document.title == "Cart-shopping"){
    
    var cartContent = (localStorage.getItem("cartContent"))? localStorage.getItem("cartContent") : [];
    cartContent = JSON.parse(cartContent);

    var cartContainer = document.getElementById("cartContainer");
    var totalPrice=0;
    for(var i in cartContent){
        //han7to fen fl div
        cartContent[i].price = parseInt(cartContent[i].price);
        totalPrice += cartContent[i].price;
        cartContainer.insertAdjacentHTML("beforeend", generateCartProduct(cartContent[i].img, cartContent[i].name, cartContent[i].price, cartContent[i].id))

    }
    totalpriceAll = document.querySelectorAll(".total-price");
    for(var i=0; i<totalpriceAll.length ; i++){
        totalpriceAll[i].innerHTML = totalPrice;
    }
    //document.querySelector(".total-price").innerHTML = totalPrice;
}







// //////////////////////////////////////////////////////////////////////////////////

function addToCart(e){
    if(e.target.localName == "button"){
        e.target.innerHTML = '<i class="bi bi-check-circle" aria-hidden="true"></i>  Added';
        var productData = e.target.parentNode.parentNode.children;
        var proImage = productData[0].src;
        var proName = productData[2].children[0].innerText;
        var proPrice = productData[2].children[2].innerText;
        var proId = (productData[2].children[4].innerText).split(":")[1];

        var cartContent = (localStorage.getItem("cartContent"))? localStorage.getItem("cartContent") : "[]";
        cartContent = JSON.parse(cartContent);
        cartContent.push({
            id: proId,
            img: proImage,
            name: proName,
            price: proPrice
        });  
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
    }
}



// ////////////////////////////////////////////////////////////////////////////////////////



var menData;


// function showPerMenData() {
  

        
function showPerMenData() {
var xhr = new XMLHttpRequest();
xhr.open("get", "https://fakestoreapi.com/products", true);
xhr.send("");
xhr.onreadystatechange = function () {
if (xhr.status == 200 && xhr.readyState == 4) {
        menData = JSON.parse(xhr.responseText);

    Object.keys(menData).forEach(function (key) {
        // console.log(key, menData[key]);
        var btnContent = '<i id="icon" class="bi bi-plus-circle-fill "></i>Add to queue';
        var cartContent = JSON.parse(localStorage.getItem("cartContent"));
        for(var product in cartContent){
            if(menData[key].id == cartContent[product].id){
                btnContent = '<i class="bi bi-check-circle"></i>  Added';
                break;
            }
        }
        if(menData[key].description.length > 50){
            // console.log( typeof menData[key].description );
            menData[key].description = menData[key].description.slice(0, 50) + "...";
        }
        document.querySelector("#products").insertAdjacentHTML(
            "beforeend",
            `<div class="card p-4 m-3" id="product-${menData[key].id}">
                <img src="${menData[key].image}" class="card-img-top" style="width:300px; max-width: 100%; height:300px" />
                <hr>
                <div class="card-body">
                    <h4 class="card-title">${menData[key].title}</h4>
                    <p class="card-text">${menData[key].description}</p>
                    <span class="price">${menData[key].price}</span><br>
                    <p class="item-code">item-code: ${menData[key].id}</p>
                    <button id="btn-add-${menData[key].id}" onclick="addToCart(event)"
                    class="btn btn-primary icon-added">${btnContent}</button>
                </div>
            </div>`
        );
    });
}}}



let invalidEntries = 0     
function filterByID(item){
    document.querySelector("#clo").style.display='none';
    document.querySelector("#products").style.display='none';
    document.querySelector("#ele").style.display='none';
    document.querySelector("#jew").style.display='flex';
    
   if(item.category == "jewelery"){
    Object.keys(item).forEach(function () {
  
        document.querySelector("#jew").insertAdjacentHTML(
            "beforeend",
            `<div class="card" id="show-data"  onclick="myFunction(event)">
        <img src="${item.image}" class="card-img-top"/>
        <div class="card-body">
            <h4 class="card-title">${item.title}</h4>
            <p class="card-text">${item.description}</p>
           <span class="price">${item.price}</span><br><br>
           <a href=" "  id="btn-add" 
           class="btn btn-primary icon-added"><i  id="icon"  class="bi bi-plus-circle-fill "></i>Add to queue</a>
           </div>
            </div>`
        );
       })
    }
  
}


// /////////////////////////////////////////////////////////////////////////////////

function filterByClo(item){

    document.querySelector("#ele").style.display='none';
    document.querySelector("#products").style.display='none';
    document.querySelector("#jew").style.display='none';
    document.querySelector("#clo").style.display='flex';


    if(item.category == "women's clothing"){
     Object.keys(item).forEach(function () {
        
         document.querySelector("#clo").insertAdjacentHTML(
             "beforeend",
             `<div class="card" id="show-data"  onclick="myFunction(event)">
         <img src="${item.image}" class="card-img-top"/>
         <div class="card-body">
             <h4 class="card-title">${item.title}</h4>
             <p class="card-text">${item.description}</p>
            <span class="price">${item.price}</span><br><br>
            <a href=" "  id="btn-add" 
            class="btn btn-primary icon-added"><i  id="icon"  class="bi bi-plus-circle-fill "></i>Add to queue</a>
            </div>
             </div>`
         );

        })
     }
   
 }


// //////////////////////////////////////////////////////////////////////////////////

 function filterByEle(item){
    document.querySelector("#clo").style.display='none';
    document.querySelector("#jew").style.display='none';
    document.querySelector("#products").style.display='none';
    document.querySelector("#ele").style.display='flex';


    document.querySelector("#products").innerHTML="";
   if(item.category == "electronics"){
    Object.keys(item).forEach(function () {
          document.querySelector("#ele").insertAdjacentHTML(
            "beforeend",
            `<div class="card" id="show-data"  onclick="myFunction(event)">
        <img src="${item.image}" class="card-img-top"/>
        <div class="card-body">
            <h4 class="card-title">${item.title}</h4>
            <p class="card-text">${item.description}</p>
           <span class="price">${item.price}</span><br><br>
           <a href=" "  id="btn-add" 
           class="btn btn-primary icon-added"><i  id="icon"  class="bi bi-plus-circle-fill "></i>Add to queue</a>
           </div>
            </div>`
        );
       })
    }
}
