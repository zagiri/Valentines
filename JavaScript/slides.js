const images = [
    'Images/Frames/1.jpg',
    'Images/Frames/2.jpg',
    'Images/Frames/3.jpg',
    'Images/Frames/4.jpg',
    'Images/Frames/5.jpg',
    'Images/Frames/6.jpg',
    'Images/Frames/7.jpg',
    'Images/Frames/8.jpg',
    // Add more images as needed
];

let currentImageIndex = -1;

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const newImgContainer = document.createElement('div');
    newImgContainer.classList.add('image-container', 'fade-in');
    const img = document.createElement('img');
    img.src = images[currentImageIndex];
    img.style.width = '100%';
    img.style.height = '100%';
    newImgContainer.appendChild(img);
    const container = document.getElementById('slideshow-container');
    container.appendChild(newImgContainer);

    if (container.children.length > 1) {
        const oldImgContainer = container.children[0];
        oldImgContainer.classList.remove('fade-in');
        oldImgContainer.classList.add('fade-out');
        setTimeout(() => {
            oldImgContainer.remove();
        }, 2500); // Match the duration of the fade-out animation
    }
}

function fadeVolumeTo(audioElement, targetVolume, duration) {
    const originalVolume = audioElement.volume;
    const volumeChange = targetVolume - originalVolume;
    const stepSize = volumeChange / (duration / 100); // Calculate step size based on duration and frame rate
    let currentVolume = originalVolume;

    const fade = setInterval(() => {
        currentVolume += stepSize;
        if ((stepSize < 0 && currentVolume <= targetVolume) || (stepSize > 0 && currentVolume >= targetVolume)) {
            // When the target volume is reached or exceeded, set it to the exact target to avoid going over and clear the interval
            audioElement.volume = targetVolume;
            clearInterval(fade);
        } else {
            audioElement.volume = currentVolume;
        }
    }, 100); // Adjust volume every 100 milliseconds
}


document.getElementById('play-button').addEventListener('click', function() {
    // Show the content and map
    document.getElementById('valentine').style.display = 'flex';
    // Attempt to play the music with sound
    let music = document.getElementById('background-music');
    music.muted = false; // Unmute the music
    music.play(); // Play the music
    // Hide the play button
    this.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {

    changeImage();
    setInterval(changeImage, 5000); // Adjust as needed

    // Typing animation for h1
    const h1 = document.querySelector('#scrolling-text h1');
    const h1Text = h1.innerText.replace(/ /g, '\u2009');
    const typingSpeedH1 = 150; // milliseconds
    let h1Index = 0;
    h1.innerText = '';

    function typeEffectH1() {
        if (h1Index < h1Text.length) {
            h1.innerText += h1Text.charAt(h1Index);
            h1Index++;
            setTimeout(typeEffectH1, typingSpeedH1);
        } else {
            // Start typing paragraphs after the h1 typing animation finishes
            setTimeout(typeEffectParagraph, 500); // slight delay before starting paragraphs
        }
    }

    typeEffectH1(); // Start the typing effect for h1

    // Array of paragraphs to display with typing effect
    const paragraphs = [
        "I love you more than words can express. You are what I want in life, you are perfect in every way.",
        "Every moment we spend together feels like a blessing.",
        "Thank you for being part of my life.",
        "I may not be good with words but I know what I feel for you is genuine. I can't express it enough.",
        "You're everything I ever wanted!",
        "If you ever feel sad or doubtful, this will always be here for you but I'm sure I will always be there for you if you need me.",
        "I'm sorry if this sound cheesy! I love you so much mi princesa! Happy Valentine's Day!",
        "Don't forget to save your stomach for tomorrow! I'll pick you up before 7! It's a date hehe.",
        // Add more paragraphs as needed
    ];

    let currentParagraphIndex = 0;
    const paragraphElement = document.querySelector('#scrolling-text p');
    const typingSpeedParagraph = 20; // Adjust typing speed for paragraphs

    function typeEffectParagraph() {
        if (currentParagraphIndex < paragraphs.length) {
            let paragraphText = paragraphs[currentParagraphIndex].replace(/ /g, '\u2009'); // Assume any necessary replacements are done beforehand
            let paragraphIndex = 0;
            paragraphElement.innerText = '';

            function typeParagraph() {
                if (paragraphIndex < paragraphText.length) {
                    paragraphElement.innerText += paragraphText.charAt(paragraphIndex);
                    paragraphIndex++;
                    setTimeout(typeParagraph, typingSpeedParagraph);
                } else {
                    currentParagraphIndex++;
                    if (currentParagraphIndex < paragraphs.length) {
                        setTimeout(typeEffectParagraph, 2000); // Wait before starting the next paragraph
                    } else {
                        // If no more paragraphs, display the map with animation
                        var mapContainer = document.getElementById('map-container');
                        mapContainer.style.display = 'block'; // Ensure the map container is block before adding opacity
                        mapContainer.classList.add('show-map'); // This triggers the fade-in animation

                        // document.getElementById('background-music').volume = 0.2; // Set volume to 20%
                        fadeVolumeTo(document.getElementById('background-music'), 0.1, 5000);
                        var music = document.getElementById('music');
                        music.style.display = 'block'; // Make the audio controls visible.
                    }
                }
            }

            typeParagraph();
        }
    }

});

