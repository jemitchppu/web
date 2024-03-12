const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    if(data.id == "" || data.teamname == "" || data.teamcity == ""){
        $.toaster({priority : "danger", title : "Error", message : "Please fill all fields"});
    }
    else {
        fetch('https://api-16yv.onrender.com/api/v1/teams',{
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(error => console.log(error))
        $.toaster({priority : "success", title : "Inventory", message : "New team has been added"})
    }
});