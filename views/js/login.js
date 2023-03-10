const apiUrl = 'http://localhost:3000';
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
let popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup");
}
function closePopup() {
    popup.classList.remove("open-popup");
    window.location.href = "chatGUI.html"
}
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");

})

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");

})


async function handleSignInSubmit(event) {
    event.preventDefault();

    const userName = event.target.userName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const picLink = event.target.url.value;
    const password = event.target.password.value;

    const newUser = {
        userName,
        email,
        phone,
        password,
        picLink
    };

    try {
        const response = await axios.post(`${apiUrl}/newUser/signin`, newUser);

        // If the server returns a success message, show an alert with the message
        if (response.data.message) {
            alert(response.data.message);
            swal({
                title: "Congratulations!🎆",
                text: "You are added in GroupieHive. Please Login",
                icon: "success",
            });
        }
    } catch (err) {
        // If the server returns an error, show an alert with the error message
        //let mess = err.data.message || 'User already exists! Please sign in or try a different email address';
        let mess = 'User already exists! Please sign in or try a different email address';
        swal("Ooops!!", `${mess}`);
        alert('try again!!');
    }
}


async function handleLoginSubmit(event) {
    event.preventDefault();

    const mail = event.target.mail.value;
    const password = event.target.password.value;
    const loginDetail = { mail, password };

    try {
        console.log('00000', loginDetail);
        const response = await axios.post(`${apiUrl}/user/login`, loginDetail);

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);

            alert(response.data.message);
            openPopup();

            //window.location.href = "chatGUI.html"

        }
    } catch (err) {

        const errorMessage = err.response?.data.message || "Incorrect Credentials! Please try again";
        alert(errorMessage);
        console.error("Error during login", JSON.stringify(err));
        document.body.innerHTML += `<div style="color:red;"> ${err.message} <div>`;
    }
}
