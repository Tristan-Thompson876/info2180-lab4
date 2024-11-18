document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const outputDiv = document.getElementById('output');

    const sanitizeInput = (input) => {
        return input.replace(/[<>{}]/g, '').trim();
    };

    // Function to fetch the heroes
    const fetchSuperheroes = async (query = '') => {
        try {
            const sanitizedQuery = sanitizeInput(query);
            const url = sanitizedQuery 
                ? `superheroes.php?query=${encodeURIComponent(sanitizedQuery)}`
                : 'superheroes.php';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const htmlContent = await response.text();
            
            if (htmlContent.includes('SUPERHERO NOT FOUND')) {
                outputDiv.innerHTML = '<div class="not-found">SUPERHERO NOT FOUND</div>';
                return;
            }

            outputDiv.innerHTML = htmlContent;

            if (htmlContent.includes('<ul>')) {
                const listItems = outputDiv.querySelectorAll('li');
                listItems.forEach(li => {
                    // bullet points
                    if (!li.textContent.startsWith('•')) {
                        li.textContent = '• ' + li.textContent;
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error);
            outputDiv.innerHTML = '<div class="error">Failed to load superhero data.</div>';
        }
    };

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        fetchSuperheroes(searchInput.value);
    });

    // Event listener for Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchSuperheroes(searchInput.value);
        }
    });
});
//