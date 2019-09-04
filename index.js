const axios = require('axios');
const http = require('http');
const fs = require('fs');
axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json',{
    responseType: 'json'
  }).then(function(response){
    let datos=response.data;
    let info=cargarTodo(datos);
    fs.writeFile("demofile1.html", info, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
    http.createServer(function (req, res) {
        fs.readFile('demofile1.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
      }).listen(8081);
})
.catch((err)=>{
    console.log(err);
});


function cargarTodo(datos){
    let burg = htmlpers('Burguers',datos);
    let tacos = htmlpers('Tacos',datos);
    let desserts = htmlpers('Desserts',datos);
    let drinks = htmlpers('Drinks',datos);
    let html= `<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Burguers
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">`+
        burg+
      `</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Tacos
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">`+
      tacos+
    `</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Desserts
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">`+
      desserts+
    `</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Drinks and sides
        </button>
      </h2>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div class="card-body">`+
      drinks+
    `</div>
    </div>
  </div>
</div>`;
  return html;
}

function htmlpers(categoria,datos){
    let resp = [];
    let total = "";
    if(categoria=="Burguers"){
        resp = datos[0].products;
    }
    else if(categoria=="Tacos"){
        resp = datos[1].products;
    }
    else if(categoria=="Desserts"){
        resp = datos[2].products;
    }
    else {
        resp = datos[3].products;
    }
    for(let i =0;i<resp.length;i++){
        let texto = `<div class="card" style="width: 18rem;">
    <img src="`+ resp[i].image +`" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">`+ resp[i].name + '[$' + resp[i].price + ']' + `</h5>
      <p class="card-text">`+ resp[i].description +`</p>
      <a href="#" class="btn btn-primary">Add to cart</a>
    </div>
  </div>`;
  total += texto;
    }
    return total;
}

