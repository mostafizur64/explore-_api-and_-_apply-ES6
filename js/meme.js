const loadMeme = async () => {
    const URL = `https://meme-api.com/gimme/20`;
    const res = await fetch(URL);
    const data = await res.json();
    displayMemes(data.memes);
}

const displayMemes = (memes) => {
    memes.slice(0,10).forEach(meme => {
        const sectionContainer = document.getElementById('section');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 glass shadow-2xl rounded-tl-lg">
            <div class="card-body">
            
                
            </div>
            <figure><img class="w-full h-64" src="${meme.url}" alt="Shoes" /></figure>
        </div>
        `
        sectionContainer.appendChild(div);

    });
}




loadMeme();