// Function to navigate to the plant detail page
function openPlantDetail(page) {
    window.location.href = page; // Navigate directly to the page within the same directory
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Search function for the search bar
function searchPlants() {
    // Get the search input value and convert to lowercase for case-insensitive search
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    // Get all plant cards
    const plantCards = document.querySelectorAll('.plant-card');

    // Loop through each plant card and check if the search term matches the plant name
    plantCards.forEach(card => {
        const plantName = card.getAttribute('data-plant-name').toLowerCase();

        // If the plant name includes the search query, display the card, otherwise hide it
        if (plantName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Call the searchPlants function to initialize the page with all plant cards visible
searchPlants(); 

// Function to initialize the 3D model
function init3DModel(modelPath) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('modelContainer').appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zooming
    controls.enablePan = true; // Enable panning

    // Load your 3D model using a loader (GLTFLoader)
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function (gltf) {
        // Scale the model to a more appropriate size
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust scale values as needed
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error('An error occurred:', error);
    });

    camera.position.z = 2; // Adjust camera position for better viewing

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Update controls
        renderer.render(scene, camera);
    }
    animate();
}

// Call the init function if on a detail page
//if (document.getElementById('modelContainer')) {
  //  init3DModel('../models/tulsi.glb'); // Path to your model (adjust path as needed)
//}
// Get the model path from the data attribute
const modelPath = document.getElementById('modelContainer').getAttribute('data-model');

// Initialize the 3D model using the dynamic model path
if (document.getElementById('modelContainer')) {
    init3DModel(modelPath); // Use the model path specified in the data attribute
}




