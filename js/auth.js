// ===============================
// Cloud Resume Builder Login
// ===============================

const LOGIN_API_URL =
"https://t8c6reufha.execute-api.us-east-1.amazonaws.com/dev/login";

const REGISTER_API_URL =
"https://t8c6reufha.execute-api.us-east-1.amazonaws.com/dev/register";


// ===============================
// Login Form
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const message = document.getElementById("message");

        message.style.color = "black";
        message.innerHTML = "Logging in...";

        try {

            const response = await fetch(LOGIN_API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            const result = typeof data.body === "string"
                ? JSON.parse(data.body)
                : data;

            if (response.ok) {

                message.style.color = "green";
                message.innerHTML = result.message;

                if (result.user) {
                    localStorage.setItem("userEmail", result.user.email);
                    localStorage.setItem("userName", result.user.name);
                }

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);

            } else {

                message.style.color = "red";
                message.innerHTML = result.message || "Login Failed";

            }

        } catch (error) {

            console.error(error);

            message.style.color = "red";
            message.innerHTML = "Unable to connect to server.";

        }

    });

}



// ===============================
// Register Form
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        const message = document.getElementById("message");

        if (password !== confirmPassword) {

            message.style.color = "red";
            message.innerHTML = "Passwords do not match!";
            return;

        }

        message.style.color = "black";
        message.innerHTML = "Creating account...";

        try {

            const response = await fetch(REGISTER_API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });

            const data = await response.json();

            const result = typeof data.body === "string"
                ? JSON.parse(data.body)
                : data;

            if (response.ok) {

                message.style.color = "green";
                message.innerHTML = result.message;

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1500);

            } else {

                message.style.color = "red";
                message.innerHTML = result.message || "Registration Failed";

            }

        } catch (error) {

            console.error(error);

            message.style.color = "red";
            message.innerHTML = "Unable to connect to server.";

        }

    });

}