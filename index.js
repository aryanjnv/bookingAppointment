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
    axios.post('https://crudcrud.com/api/eb70361877f84d66bf2c7b632c3d1477/appointment', userDetails)
        .then(function (response) {
            console.log('Data stored in the cloud:', response.data);
        })
        .catch(function (error) {
            console.error('Error storing data in the cloud:', error);
        });
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    initUI();
}

function initUI() {
    axios.get('https://crudcrud.com/api/eb70361877f84d66bf2c7b632c3d1477/appointment')
        .then(function (response) {
            var userDetailsArray = response.data;

            var userList = document.getElementById('userList');
            userList.innerHTML = ''; 

            userDetailsArray.forEach(function (userDetails) {
                var listItem = document.createElement('li');

                listItem.textContent = `Username: ${userDetails.username}, Email: ${userDetails.email}, Phone: ${userDetails.phone}`;


                var deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Delete';
                deleteButton.style.cursor = 'pointer';
                deleteButton.onclick = function () {
                    deleteUser(userDetails._id);
                };

                var editButton = document.createElement('button');
                editButton.innerHTML = 'Edit';
                editButton.style.cursor = 'pointer';
                editButton.addEventListener('click', function () {
                    editUser(userDetails);
                });

                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
                
                userList.appendChild(listItem);
            });
        })
        .catch(function (error) {
            
            console.error('Error fetching data from the cloud:', error);
        });
}

function deleteUser(userId) {
   
    axios.delete(`https://crudcrud.com/api/eb70361877f84d66bf2c7b632c3d1477/appointment/${userId}`)
        .then(function (response) {
            
            console.log('User deleted from the cloud:', response.data);
            var userList = document.getElementById('userList');
            var userToDelete = userList.querySelector(`li[data-user-id="${userId}"]`);
            
            if (userToDelete) {
                userList.removeChild(userToDelete);
            }
            
        })
        initUI();
        .catch(function (error) {
            
            console.error('Error deleting user from the cloud:', error);
        });
        
}

function editUser(userDetails) {

    document.getElementById('username').value = userDetails.username;
    document.getElementById('email').value = userDetails.email;
    document.getElementById('phone').value = userDetails.phone;


    var currentUserId = userDetails._id;
        deleteUser(currentUserId);
        axios.post('https://crudcrud.com/api/eb70361877f84d66bf2c7b632c3d1477/appointment', userDetails)
        .then(function (response) {
            console.log('Data stored in the cloud:', response.data);
        })
        .catch(function (error) {
            console.error('Error storing data in the cloud:', error);
        });
        initUI();
          
}

document.addEventListener('DOMContentLoaded', function () {
    initUI();
});

