document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchValue = document.getElementById('searchInput').value;

    // Default endpoint for searching users
    let userEndpoint = `https://api.github.com/search/users?q=${searchValue}`;
    
    // Add custom header to the request
    const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json'
    });

    // Fetch data from GitHub API for user search
    fetch(userEndpoint, { headers })
        .then(response => response.json())
        .then(data => displayResults(data.items));
});

function displayResults(users) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
        `;

        userCard.addEventListener('click', function () {
            // Fetch repositories for the selected user
            const repoEndpoint = `https://api.github.com/users/${user.login}/repos`;
            fetch(repoEndpoint, { headers })
                .then(response => response.json())
                .then(repos => displayRepos(repos));
        });

        resultsContainer.appendChild(userCard);
    });
}

function displayRepos(repos) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;

        resultsContainer.appendChild(repoCard);
    });
}
