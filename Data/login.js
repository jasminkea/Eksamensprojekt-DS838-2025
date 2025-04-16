let users = [{
    username: "admin",
    password: "1234",
    }, ]

function validateForm() {
    let username = document.forms["loginForm"]["username"].value;
    let password = document.forms["loginForm"]["password"].value;
    let password2 = document.forms["loginForm"]["password2"].value;
    if (username == "") {
    alert("Username must be filled out");
    return false;
    } else if (password == "") {
    alert("Password must be filled out");
    return false;
    } else if (password2 == "") {
    alert("Password confirmation must be filled out");
    return false;
    } else if (password !== password2) {
    alert("Password confirmation doesn't match your password");
    return false;
    } else if(username === users[0].username && password === users[0].password) { 
        window.location.href = "index.html";
        return false; // prevent form submission since we're manually rerouting
    } else {
        alert("Incorrect username or password");
        return false;
    }
}