var btnSearch = document.getElementById('search');
var result = document.getElementById('result');
var pagination = document.getElementById('pagination');

const key = "bb94b8f2";

btnSearch.addEventListener('click', function (e) {
    e.preventDefault();
    appelAPI();
});

function appelAPI(page) {
    let url = "http://www.omdbapi.com/?apikey=" + key;
    let search = '';
    let xhr = new XMLHttpRequest();

    let valTitle = document.getElementById('title').value;
    let valAnnee = document.getElementById('annee').value;
    let valType = document.getElementById('type').value;

    if(valTitle.length == 0){
        result.innerHTML = "<h1>Entrez un titre de film</h1>"
    } else {

        if (valTitle.length !== 0 && valTitle !== null) {
            search += "&s=" + valTitle;
        };

        if (valAnnee.length !== 0 && valAnnee !== null) {
            search += "&y=" + valAnnee;
        };

        if (valType !== "#") {
            search += "&type=" + valType;
        };

        if(page !== undefined){
            search += "&page=" + page;
        }; 

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                result.innerHTML = "";
                pagination.innerHTML = "";

                let response = JSON.parse(xhr.response);
                if (response.Response == "False") {
                    result.innerHTML = "<h1>Le film demandé n'a pas été trouvé</h1>" 
                }else {
                    let filmResponse = JSON.parse(xhr.response);
                    let page = Math.round(filmResponse.totalResults / filmResponse.Search.length);
                    creerPagination(page);

                    filmResponse.Search.forEach(film => {
                        cardFilm(film);
                    });
                }
            };
        };

        xhr.open('GET', url + search);
        xhr.send();
    };  
};

function cardFilm(film) {

    let poster = film.Poster;
    if (poster =="N/A") { 
        poster = "https://via.placeholder.com/150x220" 
    }
   
    result.innerHTML += 
    ` <div class="card" style="width: 18rem;">
       <img src="${poster}" class="card-img-top" alt="...">
       <div class="card-body">
           <h5 class="card-title">${film.Title}</h5>
           <p class="card-text">${film.Year} - ${film.Type}</p>
       </div>
     </div> `
}

function creerPagination(page) {

    let ulPage = document.createElement('ul');
    ulPage.classList.add('pagination');

    for (let i = 1; i<page; i++){
        let liPage = document.createElement('li');
        liPage.classList.add('page-item');
        let aPage = document.createElement('a');
        aPage.classList.add('page-link');
        aPage.href = i;
        aPage.textContent = i;

        aPage.addEventListener('click', function (e) {
            e.preventDefault();
            appelAPI(this.getAttribute('href'));;
        }) 
        
        liPage.appendChild(aPage);
        ulPage.appendChild(liPage);
    };
    
    pagination.appendChild(ulPage);
    
}