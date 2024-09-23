document.getElementById('registrationForm').onsubmit = function(event) {
    event.preventDefault();  // Prevent form from submitting the usual way

    // Clear previous messages
    document.getElementById('response').innerHTML = '';
    document.getElementById('errors').innerHTML = '';

    // Gather form data
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value
    };

    // Send POST request
    fetch('http://127.0.0.1:8000/sign_up/', {  // Adjust the URL to your Django API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        // Display success or error message
        if (data.status === 'success') {
            document.getElementById('response').innerHTML = `Success! User created: ${data.user.username}`;
        } else {
            document.getElementById('response').innerHTML = 'Registration failed!';
            displayErrors(data.errors);  // Call function to display errors
        }
    })
    .catch(error => {
        // Handle error
        document.getElementById('response').innerHTML = 'Something went wrong!';
    });
};

// Function to display serializer errors
function displayErrors(errors) {
    let errorDisplay = document.getElementById('errors');
    for (let field in errors) {
        errorDisplay.innerHTML += `<p>${field}: ${errors[field].join(', ')}</p>`;
    }
}
