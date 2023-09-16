let addToy = false;
const toyCollection = document.getElementById('toy-collection');
document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/toys';

    // GET REQUEST
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((toy) => {
                const toyCard = document.createElement('div');
                toyCard.className = 'card';

                toyCollection.append(toyCard);

                const toyName = document.createElement('h2');
                toyName.textContent = toy.name;

                const toyImage = document.createElement('img');
                toyImage.src = toy.image;
                toyImage.className = 'toy-avatar';

                const likes = document.createElement('p');
                likes.textContent = `${toy.likes} likes`;

                const likeButton = document.createElement('button');
                likeButton.className = 'like-btn';
                likeButton.id = toy.id;
                likeButton.textContent = 'Like ❤️';
                likeButton.addEventListener('click', handleClick);

                function handleClick(e) {
                    toy.likes++;
                    likes.textContent = `${toy.likes} likes`;
                    fetch(`http://localhost:3000/toys/${e.target.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            likes: toy.likes,
                        }),
                    });
                }

                toyCard.append(likeButton, likes, toyImage, toyName);
            });
        });

    const submitForm = document.querySelector('.add-toy-form');
    submitForm.addEventListener('submit', handleSubmit);
    function handleSubmit(e) {
        e.preventDefault();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },

            body: JSON.stringify({
                name: e.target.name.value,
                image: e.target.image.value,
                likes: num,
            }),
        })
            .then((resp) => resp.json())
            .then((newToy) => {
                const toyCard = document.createElement('div');
                toyCard.className = 'card';

                const toyName = document.createElement('h2');
                toyName.textContent = newToy.name;
                console.log(toyName);
                const toyImage = document.createElement('img');
                toyImage.src = newToy.image;
                toyImage.className = 'toy-avatar';

                const likes = document.createElement('p');
                likes.textContent = `${num} likes`;

                const likeButton = document.createElement('button');
                likeButton.className = 'like-btn';
                likeButton.id = newToy.id;
                likeButton.textContent = 'Like ❤️';

                toyCollection.append(toyCard);

                toyCard.append(likeButton, likes, toyImage, toyName);
                console.log(e.target.reset());
            });
    }

    const addBtn = document.querySelector('#new-toy-btn');
    const toyFormContainer = document.querySelector('.container');
    addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = 'block';
        } else {
            toyFormContainer.style.display = 'none';
        }
    });
});
