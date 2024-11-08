document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Extract the id and token from the URL
    const urlParams = window.location.pathname.split('/');
    const id = urlParams[4];
    const token = urlParams[5];

    if (newPassword === confirmPassword) {
        fetch(`/api/user/reset-password/${id}/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password reset successfully!');
                window.location.href = "/login";
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Passwords do not match');
    }
});

