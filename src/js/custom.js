
// Mobile menu	
$( document ).ready(function() {
   $(".rmenubar").click(function(){
   $(".cmenu ul:first-child").addClass("navopen");
   $(".mynavlayr").toggle("display-block");
});
 $(".clsebtn").click(function(){
   $(".cmenu ul:first-child").removeClass("navopen");
   $(".mynavlayr").toggle("display-none");
});
$(".mynavlayr").click(function(){
  $(".cmenu ul:first-child").removeClass("navopen");
  $(".mynavlayr").toggle("display-none");
});
$(".filtermenubar").click(function(){
  $(".filterbox").toggleClass("display-block");
  $(".toggle-icon").toggleClass("fa-bars fa-times");
});
});

function toggleFilterBox() {
  const filterBox = document.querySelector('.filterbox');
  filterBox.classList.toggle('d-none');
}
  
// Get cartProductsLS from localStorage and parse it
const cartProductsLS = JSON.parse(localStorage.getItem("cartProductsLS")) || [];

// Set the count to the <sup> tag
document.getElementById("cart-count").textContent = cartProductsLS.length;

$(window).scroll(function(){
    if ($(this).scrollTop() >600) {
        $('#topHeader').addClass("sticky");
    }else{
        $('#topHeader').removeClass("sticky");
    }
});

//  Product Slider
// $('.abtproductslider').slick({
//   dots: false,
//   infinite: true,
//   speed: 300,
//   arrows: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   responsive: [
//       {
//           breakpoint: 1024,
//           settings: {
//               slidesToShow: 2
//           }
//       },
//       {
//           breakpoint: 767,
//           settings: {
//               slidesToShow: 1
//           }
//       }
//   ]
// });


// Quantity panel  

// jQuery(document).ready(($) => {
//   $('.quantity').on('click', '.plus', function(e) {
//       let $input = $(this).prev('input.qty');
//       let val = parseInt($input.val());
//       $input.val( val+1 ).change();
//   });

//   $('.quantity').on('click', '.minus', 
//       function(e) {
//       let $input = $(this).next('input.qty');
//       var val = parseInt($input.val());
//       if (val > 0) {
//           $input.val( val-1 ).change();
//       } 
//   });
// });



// product slider
 $('.main-slide').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.sub-slide',
  infinite:true,
});

$('.sub-slide').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.main-slide',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
   centerMode:true,
   infinite:true,
});


//-----JS for Price Range slider-----

function getVals(){
  // Get slider values
  let parent = this.parentNode;
  let slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  let displayElement = parent.getElementsByClassName("rangeValues")[0];
      displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
}

// price range slider
window.onload = function(){
  // Initialize Sliders
  let sliderSections = document.getElementsByClassName("range-slider");
      for( let x = 0; x < sliderSections.length; x++ ){
        let sliders = sliderSections[x].getElementsByTagName("input");
        for( let y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}

//-----JS for logout functionality-----
 // Check login status from storage
 const isLoggedIn = localStorage.getItem("isloggedin") === "1" || sessionStorage.getItem("loggedIn") === "true";

 const userIconLi = document.querySelector(".usericon");
 const logoutBtn = document.getElementById("logoutBtn");

 if (isLoggedIn) {
   // Add class to enable hover behavior via CSS
   userIconLi.classList.add("logged-in");
 } else {
   // Optionally hide the user icon menu entirely
   logoutBtn.style.display = "none";
 }

 // Logout functionality
 logoutBtn.addEventListener("click", function () {
   localStorage.removeItem("isloggedin");
   sessionStorage.removeItem("loggedIn");
   sessionStorage.removeItem("currentUser"); // optional
   window.location.href = "sign-in.html";
 });



//  document.addEventListener("DOMContentLoaded", () => {
//   const wishlistContainer = document.getElementById("wishlist-products");
//   const template = document.getElementById("wishlistCardTemplate");

//   const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

//   wishlistData.forEach(product => {
//     const clone = template.content.cloneNode(true);

//     clone.querySelector(".product-image").src = product.productImage;
//     clone.querySelector(".product-name").textContent = product.productName;
//     clone.querySelector(".product-mrp").innerHTML = `<del>$${parseFloat(product.mrp).toFixed(2)}</del>`;
//     clone.querySelector(".product-price").textContent = `$${parseFloat(product.price).toFixed(2)}`;
//     clone.querySelector(".addtocart").setAttribute("data-id", product.id);

//     clone.querySelector(".viewbtn").href = `product-details.html?id=${product.id}`;

//     clone.querySelector('.addtocart').addEventListener('click', (event) => {
//         console.log("add to cart clicked");
//         addToCart(event, id, stock);
//     });
    

//     wishlistContainer.appendChild(clone);
//   });
// });