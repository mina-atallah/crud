let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("submit");


// so can we change the functionality of the create btn to update btn
let mood = "create";
// a temporary variable so we can use later to access an index so we can update a product
let tmp;

// Get Total function
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  }
  else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
}


/*

- check if local storage isn't empty bring data to the array
- create products array called (product)

 */
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

createBtn.addEventListener('click', () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  };

  // create how many products based on count field /based on mood string value condition
  if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    }
    else {
      dataPro[tmp] = newPro;
      mood = "create";
      createBtn = "Create";
      count.style.display = "block";
    }
    // call clearInputs function
    clearInputs();
  }
  // save array to local storage
  localStorage.setItem('product', JSON.stringify(dataPro));

  // call showData function
  showData();
});


// clear inputs
function clearInputs() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  count.value = '';
  discount.value = '';
  category.value = '';
  total.innerHTML = '';
}


// Read /or (show) data func
function showData() {
  getTotal();
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    table += `
  <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updatePro(${i})" id="update">update</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;

  // Create delete all btn when there are data
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = '';
  }
}
showData();


// Delete a product function
function deleteProduct(i) {

  dataPro.splice(i, 1);
  // we have to update the local storage becuz after the deletion the product still in the array that stored in LS
  localStorage.product = JSON.stringify(dataPro);

  // Update the show (read) data function after deletion for the UI
  showData();
}

// Delete All Products
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}


// Update a single product Function
function updatePro(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  createBtn.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth'
  });
}


// Search Function / (with a mood variable so we change the search from search by title to by category)
let searchMood = "title";
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let searchInput = document.getElementById('search');

searchTitle.addEventListener('click', getSearchMood);
searchCategory.addEventListener('click', getSearchMood);

function getSearchMood(id) {
  let table = '';
  if (this.id == 'searchTitle') {
    searchMood = 'title';
  }
  else {
    searchMood = 'category';
  }
  searchInput.placeholder = 'Search by ' + searchMood;

  searchInput.focus();
  searchInput.value = '';
  showData();
}

function searchData(value) {
  let table = '';

  for (let i = 0; i < dataPro.length; i++) {

    if (searchMood == 'title') {
      if (dataPro[i].title.includes(value.toUpperCase()) || dataPro[i].title.includes(value.toLowerCase()))
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updatePro(${i})" id="update">update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
          `;
    } else {
      if (dataPro[i].category.includes(value.toUpperCase()) || dataPro[i].category.includes(value.toLowerCase()))
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updatePro(${i})" id="update">update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
          `;
    }

    document.getElementById('tbody').innerHTML = table;
  }
}