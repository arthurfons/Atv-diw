
async function fetchUserData(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    const userData = await response.json();
    return userData;
}

async function fetchRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(url);
    const repos = await response.json();
    return repos;
}

function createRepoCard(repo, user) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('imgcarre');
    img.src = user.avatar_url;
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = repo.name;
    cardBody.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = user.name || user.login;
    cardBody.appendChild(description);

    const link = document.createElement('a');
    link.href = repo.html_url;
    link.textContent = 'Ir ao local';
    cardBody.appendChild(link);

    card.appendChild(cardBody);
    return card;
}

async function displayRepos() {
    const username = 'arthurfons';
    const user = await fetchUserData(username);
    const repos = await fetchRepos(username);
    const repoContainer = document.getElementById('repositorios');
    repos.forEach(repo => {
        const repoCard = createRepoCard(repo, user);
        repoContainer.appendChild(repoCard);
    });
}

displayRepos();

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { src: 'img/imgneutra.jpg', alt: 'Imagem 1', caption: 'Legenda para a Imagem 1' },
        { src: 'img/imagem2.jpg', alt: 'Imagem 2', caption: 'Legenda para a Imagem 2' },
        { src: 'img/imgneutra.jpg', alt: 'Imagem 3', caption: 'Legenda para a Imagem 3' },
    ];

    const indicatorsContainer = document.getElementById('carousel-indicators');
    const innerContainer = document.getElementById('carousel-inner');

    images.forEach((image, index) => {
        // Create indicator button
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#carouselExampleIndicators';
        indicator.dataset.bsSlideTo = index;
        indicator.ariaLabel = `Slide ${index + 1}`;
        if (index === 0) {
            indicator.classList.add('active');
            indicator.ariaCurrent = 'true';
        }
        indicatorsContainer.appendChild(indicator);

        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = image.src;
        img.classList.add('d-block', 'w-100');
        img.alt = image.alt;

        const caption = document.createElement('div');
        caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
        caption.textContent = image.caption;

        carouselItem.appendChild(img);
        carouselItem.appendChild(caption);
        innerContainer.appendChild(carouselItem);
    });
});