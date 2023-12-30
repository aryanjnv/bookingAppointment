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
    axios.post('https://crudcrud.com/api/e46d73537f1049cd86330acab07c52d1/appointment', userDetails)
        .then(function (response) {
            console.log('Data stored in the cloud:', response.data);
        })
        .catch(function (error) {
            console.error('Error storing data in the cloud:', error);
        });
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}


