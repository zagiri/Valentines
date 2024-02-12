

let yesBtn = document.getElementById("Yes");
let confirmBtn = document.getElementById("Confirm");
let noBtn = document.getElementById("No");

let h2 = document.querySelector("#valentine h2");
let h1 = document.getElementById("red");

var noButtonImages = [
    "Images/No1.gif",
    "Images/No2.gif",
    "Images/No3.gif",
    "Images/No4.gif",
];

var texts = [
    {h2: "Are you sure?", h1: "Think again!"},
    {h2: "I thought you love me!", h1: "Whyyy!"},
    {h2: "You got no choice", h1: "Yes or... yes?"},
    {h2: ":(", h1: "Pleaseeeee!"},
];

var currentNoImageIndex = 0;
var clickCount = 0; // Counter for the number of clicks
var maxClicks = 4; // Maximum number of clicks allowed

yesBtn.onclick = function () {
    if (this.id === "Yes") {
        noBtn.style.display = 'none';
        this.textContent = "Confirm";
        this.id = "confirm";
        document.getElementById("password-container").style.display = 'flex';
        h2.textContent = "";
        h1.textContent = "I love you!";
        fadeImage("Images/yes.gif");
    } else if (this.id === "confirm") {
        var passwordInput = document.getElementById("pwd");
        var correctPassword = "chorizo".toLowerCase();
        var userInput = passwordInput.value.toLowerCase();

        if (userInput === correctPassword) {
            // Apply fade-out effect to all elements
            document.body.querySelectorAll("*").forEach(function(element) {
                element.classList.add("fade-out");
            });

            // After the fade-out, clear the content and display the thank you message
            setTimeout(function() {
                document.body.innerHTML = '<div class="zoom-in-text">Thank you for being so perfect!</div>';

                // Redirect to main.html after the animation and some time to read the message
                setTimeout(function() {
                    window.location.href = "main.html";
                }, 5000); // Wait for the zoom-in animation plus some reading time
            }, 2000); // Wait for the fade-out to complete
        } else {
            // Incorrect password logic
            passwordInput.classList.add("shake");
            passwordInput.style.borderColor = "red";
            passwordInput.value = "";
            passwordInput.placeholder = "Incorrect password!";
            setTimeout(() => passwordInput.classList.remove("shake"), 500);
        }
    }
};

noBtn.scaleFactor = 1;

noBtn.onclick = function () {
    if (clickCount < maxClicks) {
        // Force reflow/repaint to reset animation
        void h2.offsetWidth;
        void h1.offsetWidth;

        // Update the texts based on clickCount
        h2.textContent = texts[clickCount].h2;
        h1.textContent = texts[clickCount].h1;

        // Immediately add zoom-in animation class after resetting
        h2.classList.add("zoom-in");
        h1.classList.add("zoom-in");

        var nextImageSrc = noButtonImages[currentNoImageIndex];
        fadeImage(nextImageSrc);

        currentNoImageIndex = (currentNoImageIndex + 1) % noButtonImages.length;

        // Scale down the button for the first three clicks
        if (clickCount < maxClicks - 1) {
            noBtn.scaleFactor *= 0.8;
            noBtn.style.transform = `scale(${noBtn.scaleFactor})`;
        }
    }

    clickCount++; // Increment the click counter at the end to ensure updates happen on the fourth click

    // After updating the text and image for the fourth click, make the button disappear
    if (clickCount >= maxClicks) {
        noBtn.style.display = 'none';
    }

    // Remove zoom-in class to allow animation to be triggered again on next click
    setTimeout(() => {
        h2.classList.remove("zoom-in");
        h1.classList.remove("zoom-in");
    }, 500); // Timeout duration matches the animation time
};

function fadeImage(newSrc) {
    var img = document.getElementById("gif");
    img.style.opacity = 0;
    setTimeout(function() {
        img.src = newSrc;
        img.style.opacity = 1;
    }, 500);
}
