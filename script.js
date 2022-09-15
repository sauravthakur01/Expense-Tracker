let form = document.querySelector("#myForm");

form.addEventListener("submit" , onSubmit);
window.addEventListener("DOMContentLoaded",loadStorage);


function loadStorage(e){
        e.preventDefault();
        Object.keys(localStorage).forEach((key)=>{
            showOnScreen(JSON.parse(localStorage.getItem(key)));
        })
}



function onSubmit(e){
    e.preventDefault();
    let details = {
        amount:e.target.amount.value,
        desc:e.target.description.value,
        cat:e.target.category.value,
    }

    localStorage.setItem(details.desc , JSON.stringify(details));

    showOnScreen(details);

}

function showOnScreen(data){

    if(localStorage.getItem(data.desc)){
        removefromscreen(data.desc);
    }

    let list = document.getElementById("expensesList");
    let childHTML = `<li id=${data.desc}> ${data.amount} - ${data.cat} - ${data.desc} 
    <button onclick="edit('${data.desc}','${data.amount}','${data.cat}')">Edit</button>
    <button onclick="remove('${data.desc}')">Delete</button>
    </li>`

    list.innerHTML = list.innerHTML + childHTML ;

    document.getElementById("amount").value="" ;
    document.getElementById("description").value="" ;
    document.getElementById("category").value="" ;

}

function remove(desc){
    localStorage.removeItem(desc);
    removefromscreen(desc);
}


function removefromscreen(desc){
    
    let parent = document.getElementById("expensesList");
    let child = document.getElementById(desc);
    if(child){
        parent.removeChild(child);
    }
}

function edit(desc,amount,category){
    
    document.getElementById("amount").value=amount ;
    document.getElementById("description").value=desc ;
    document.getElementById("category").value=category ;
    
    remove(desc);

}