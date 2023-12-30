function handleFormSubmit(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var userDetails = {
        username: username,
        email: email,
        phone: phone
    };
    axios.post('https://crudcrud.com/api/904259dd91b640a5b1a1a5a8b3a4d27f/appointment', userDetails)
        .then(function (response) {
            console.log('Data stored in the cloud:', response.data);
        })
        .catch(function (error) {
            console.error('Error storing data in the cloud:', error);
        });
        initUI();
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

function initUI() {
    axios.get('https://crudcrud.com/api/904259dd91b640a5b1a1a5a8b3a4d27f/appointment')
        .then(function (response) {
            var userDetailsArray = response.data;

            var userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous entries

            userDetailsArray.forEach(function (userDetails) {
                var listItem = document.createElement('li');

                listItem.textContent = `Username: ${userDetails.username}, Email: ${userDetails.email}, Phone: ${userDetails.phone}`;


                var deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Delete';
                deleteButton.style.cursor = 'pointer';
                deleteButton.onclick = function () {
                    deleteUser(userDetails._id);
                };

        
                listItem.appendChild(deleteButton);

                
                userList.appendChild(listItem);
            });
        })
        .catch(function (error) {
            
            console.error('Error fetching data from the cloud:', error);
        });
}

function deleteUser(userId) {
   
    axios.delete(`https://crudcrud.com/api/904259dd91b640a5b1a1a5a8b3a4d27f/appointment/${userId}`)
        .then(function (response) {
            
            console.log('User deleted from the cloud:', response.data);
            var userList = document.getElementById('userList');
            var userToDelete = userList.querySelector(`li[data-user-id="${userId}"]`);
            
            if (userToDelete) {
                userList.removeChild(userToDelete);
            }

            initUI();
        })
        .catch(function (error) {
            
            console.error('Error deleting user from the cloud:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    initUI();
});

