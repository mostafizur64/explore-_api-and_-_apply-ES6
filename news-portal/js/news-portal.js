let fetchData = [];
const fetchCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            showSingleCategory(data.data.news_category);
        })
}


const showSingleCategory = (singleCategories) => {
    const categoriesContainer = document.getElementById('categories-container');
    singleCategories.forEach(singleCategory => {
        // console.log(singleCategory);
        // categoriesContainer.innerHTML +=`<a class="nav-link" href="#">${singleCategory?.category_name}</a>`;

        const linkContainer = document.createElement('p');
        linkContainer.innerHTML = `
    <a class="nav-link" onclick="showCategory('${singleCategory.category_id}','${singleCategory?.category_name}')">${singleCategory?.category_name}</a>
    `;
        categoriesContainer.appendChild(linkContainer);

    });
}

// category show by id 

const showCategory = async (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    const res = await fetch(url);
    const data = await res.json();
    fetchData = data.data;
    singleCategoryShow(data.data, category_name);

}
const singleCategoryShow = (data, category_name) => {
    console.log(data, category_name);
    document.getElementById('news_count').innerText = data.length;
    document.getElementById('category_name').innerText = category_name;
    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        // console.log(singleNews);
        const singleCard = document.createElement('div');
        singleCard.classList.add('card', 'mb-3');
        // Destructuring here 
        const { _id, image_url, title, details, author, total_view, rating } = singleNews;



        // singleCard.innerHTML += ``;
        singleCard.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <img src=${image_url} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex flex-column">
                <div class="card-body">
                        <h5 class="card-title">${title} </h5>
                        <p class="card-text">${details.slice(0, 200)}...  </p>
                       
                </div>
            <div class="card-footer border-0 d-flex justify-content-between">
            <div class="d-flex gap-2">
            <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40">
            <div>
            <p class="m-0 p-0">${author.name}</p>
            <p class="m-0 p-0">${author.published_date}</p>
            </div>
            </div>
            <div class="d-flex align-items-center gap-2">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0 ">${total_view}</p>
            </div>
            <div class="d-flex align-items-center">
            <div>${generateStar(rating.number)}</div>
            <p class="m-0 p-0">${rating.number}</p>
             </div>


           <div class="d-flex align-items-center">
             <i class="fas fa-arrow-right" onclick="fetchSingleDetails('${_id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
             </div>
            
            </div>
            </div>
      </div>
        ` ;
        newsContainer.appendChild(singleCard);

    });
}


// show single details to click array function 
const fetchSingleDetails = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url).then(res => res.json()).then(data => {
        showSingleDetails(data.data[0]);
    });

}
const showSingleDetails = (detail) => {
    // Destructuring here 
    const { _id, image_url, title, details, author, total_view, others_info } = detail;

    // singleCard.innerHTML += ``;
    document.getElementById('modal-body').innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
    <div class="col-md-12">
    <img src=${image_url} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
                <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : "Not Trending"}</span></h5>
                <p class="card-text">${details} </p>
               
        </div>
    <div class="card-footer border-0 d-flex justify-content-between">
    <div class="d-flex gap-2">
    <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40">
    <div>
    <p class="m-0 p-0">${author.name}</p>
    <p class="m-0 p-0">${author.published_date}</p>
    </div>
    </div>
    <div class="d-flex align-items-center gap-2">
    <i class="fas fa-eye"></i>
    <p class="m-0 p-0 ">${total_view}</p>
    </div>
   <div class="d-flex align-items-center">
     <i class="fas fa-star"></i>
     </div>
    </div>
    </div>
</div>
    <div/>
    `;



}

// show trending data 
const showTrending = () => {
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const categoriesName = document.getElementById('category_name').innerText;

    singleCategoryShow(trendingNews, categoriesName);
}


// genarate star here 
const generateStar = rating => {
    let ratingHTML = ``;
    for (let i = 1; i <= Math.floor(rating); i++) {
        ratingHTML += `<i class="fas fa-star"></i>`


    }
    if (rating - Math.floor(rating) > 0) {
        ratingHTML += `  <i class="fas fa-star-half"></i>`

    }
    return ratingHTML;


}