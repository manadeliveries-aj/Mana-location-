
// Global Cart Integration (localStorage-based)
(function(){
  const CART_KEY = 'cart';
  function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[] }catch(e){return []} }
  function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
  function addToCart(item){
    const cart = loadCart();
    // if same name, increase qty
    const idx = cart.findIndex(i=>i.name===item.name);
    if(idx>-1){ cart[idx].qty = (cart[idx].qty||1) + (item.qty||1); }
    else { cart.push({name:item.name, qty:item.qty||1, price:item.price||0}); }
    saveCart(cart);
  }
  function clearCart(){ localStorage.removeItem(CART_KEY); updateCartCount(); }
  function updateCartCount(){
    const cart = loadCart();
    const count = cart.reduce((s,i)=>s+ (i.qty||0),0);
    document.querySelectorAll('.cart-count').forEach(el=> el.innerText = count);
  }
  // Expose to window
  window.CartAPI = { addToCart, loadCart, saveCart, clearCart };

  // Attach handlers to existing add-to-cart buttons (class) or whatsapp_checkout links
  document.addEventListener('click', function(e){
    const el = e.target.closest('.add-to-cart, a[data-add-to-cart]');
    if(el){
      e.preventDefault();
      // read data attributes
      const name = el.getAttribute('data-name') || el.getAttribute('data-item') || el.getAttribute('data-product') || el.dataset.name || el.dataset.item || el.innerText.trim();
      const priceAttr = el.getAttribute('data-price') || el.dataset.price || '0';
      const price = parseFloat(priceAttr.replace(/[^\d\.]/g,''))||0;
      addToCart({name, price, qty:1});
      alert('Added to cart: ' + name);
      return;
    }
    // Intercept links to whatsapp_checkout with item query to add to cart instead
    const link = e.target.closest('a[href*="whatsapp_checkout.html?item="]');
    if(link){
      e.preventDefault();
      try{
        const url = new URL(link.href, location.href);
        const item = url.searchParams.get('item') || 'Item';
        const price = parseFloat(url.searchParams.get('price')||'0')||0;
        addToCart({name:item, price, qty:1});
        alert('Added to cart: ' + item);
      }catch(err){}
    }
  });

  // Update cart count on load
  document.addEventListener('DOMContentLoaded', updateCartCount);
})();
