import { getProducts,getProduct } from "./firebase.js";

let total = 0
const cart = []
const empty = document.querySelector ('.delete');
const buyEnd = document.querySelector ('.buyEnd');


const emptyCart = () =>{

   total = 0;
   document.querySelector ('.visualTotal').textContent = total;

   cart.length = 0;

   document.querySelector('.innerCart').innerHTML ='';
   
}
const successBuy = ()=> {

    
   total = 0;
   document.querySelector ('.visualTotal').textContent = total;

   cart.length = 1;

   document.querySelector('.innerCart').innerHTML ='';

   Swal.fire(
      'Compra Finalizada',
      'Gracias por tu compra!',
      'success'
    );
 }



  empty.addEventListener ('click', emptyCart);
  buyEnd.addEventListener('click', successBuy); 
 





const renderCart = () =>{
const innerCart = document.querySelector('.innerCart');

innerCart.innerHTML = '';

cart.forEach (product => {

const card = document.createElement ('div');



card.className = 'card md-3';

card.innerHTML = `

   <div class="row g-0">
       <div class="col-md-4">
         <img src= ${product.data().img} class="img-fluid rounded-start" alt=${product.data().name}>
       </div>
          <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title">${product.data().name} </h5>
           <p class="card-text">$${product.data().price} </p>
         </div>
       </div>
     </div>
`;
 innerCart.append(card);
})

   
}

const checkCart = (id) => cart.some (product => product.id === id);
 
const updatePrice = (price)=> {

  const visualTotal = document.querySelector('.visualTotal');

  total += price;

  visualTotal.textContent = total  

}


const addCart =  async (e) =>{

   if (checkCart(e.target.id)){
      return false

   }
   else{
       const productCart = await getProduct(e.target.id);
       updatePrice(productCart.data().price);

       cart.push(productCart);

       renderCart();
   }

 
}
const addEvent = () => {
  const buyBtns = document.querySelectorAll ('.buyBtn');

  buyBtns.forEach (btn => btn.addEventListener ('click', addCart));
   
 }
 
 const renderCard = async (productsArr) => { //products = arr
   const products = await productsArr;
   const productsContainer = document.querySelector ('.productsContainer');

   products.forEach(product =>{
       const card = document.createElement ('div');

     card.classList.add('card', 'col-lg-3','col-sm-6');

    card.innerHTML = `

       <img src=${product.data().img} class="card-img-top productImg" alt=${product.data().name}>
        <div class="card-body">
            <h5 class="card-title">${product.data().name}</h5>
            <p class="card-text">$${product.data().price}</p>
            <a href="#" class="btn btn-primary buyBtn" id=${product.id}>Comprar</a>
        </div>
    
  `;
  productsContainer.append (card)
   })
     
  
   addEvent();
 }

 renderCard (getProducts ());


    

  
