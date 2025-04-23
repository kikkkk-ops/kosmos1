function createStars() {
    const container = document.querySelector("body");
    for (let i = 0; i < 1000; i++) {
      // Increase the number of stars to 1000
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = ".1px";
      star.style.height = ".1px";
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      container.appendChild(star);
    }
  }

// Function to handle planet clicks
function handlePlanetClick(planetName) {
    const content = document.querySelector('.content');
    
    // Show the content div
    content.style.display = 'block';
    
    // Load planet information
    fetch(`${planetName}/index.html`)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading planet information:', error);
            content.innerHTML = '<p>Error loading planet information. Please try again.</p>';
        });
}

// Add click event listeners to planet elements
document.addEventListener('DOMContentLoaded', function() {
    const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    
    planets.forEach(planet => {
        const planetElement = document.querySelector(`.${planet}`);
        if (planetElement) {
            planetElement.addEventListener('click', () => handlePlanetClick(planet));
        }
    });
});

createStars();



