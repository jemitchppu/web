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
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(error => console.log(error))
        $.toaster({priority : "success", title : "Inventory", message : "Team information has been changed"})
    }
});

async function populateDropdown() {
    try {
      const response = await fetch('https://api-16yv.onrender.com/api/v1/teams');
      const data = await response.json();
  
      const dropdown = document.getElementById('id');
  
      dropdown.innerHTML = '';
  
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.id;
        dropdown.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const ID = document.getElementById('id');
  const teamname = document.getElementById('teamname');
  const teamcity = document.getElementById('teamcity');
  
  ID.addEventListener('change', function() {
    const selectedValue = ID.value;
    console.log('Selected ID:', selectedValue);
    fetch(`https://api-16yv.onrender.com/api/v1/teams/${selectedValue}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        if (Array.isArray(data) && data.length > 0) {
          const teamData = data.find(item => item.id === parseInt(selectedValue));
          if (teamData) {
            teamname.value = teamData.teamname;
            teamcity.value = teamData.teamcity;
          } else {
            console.error('Team data not found for selected ID');
            teamname.value = '';
            teamcity.value = '';
          }
        } else {
          console.error('Invalid data received from API');
          teamname.value = '';
          teamcity.value = '';
        }
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
        teamname.value = '';
        teamcity.value = '';
      });
  });
  
  document.addEventListener('DOMContentLoaded', populateDropdown);