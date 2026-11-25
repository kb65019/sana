(() => {
  const tCheckout = key => translations[lang][key] || translations.en[key] || key;
  const checkoutTranslations = {
    en: {
      checkout: 'Checkout →', checkoutTitle: 'Complete your order', checkoutIntro: 'Add your delivery details and review your items before continuing to WhatsApp.', checkoutDetails: 'Delivery details', checkoutReview: 'Review order', customerName: 'Full name',
      phoneLabel: 'Phone number', addressLabel: 'Delivery location / address', sendOrder: 'Continue on WhatsApp',
      deliveryLater: 'Delivery is not included in the invoice; the delivery fee will be sent later.',
      deliveryIncluded: 'Delivery is included for this order.', deliveryProgress: 'Order {amount} more to get free delivery at 50 JOD.', deliveryReached: 'You reached 50 JOD — delivery is free!', orderLabel: 'Order summary',
      checkoutNameError: 'Please enter your full name.', checkoutPhoneError: 'Enter a number starting with 07 and containing exactly 10 or 15 digits.',
      checkoutAddressError: 'Please enter your delivery address.', checkoutNeedItems: 'Your bag is empty. Add a product before checkout.',
      checkoutQty: 'Quantity', checkoutTotal: 'Total', checkoutSent: 'Your order is ready to send on WhatsApp.', added: 'Added to cart'
    },
    ar: {
      checkout: 'إتمام الطلب ←', checkoutTitle: 'إتمام الطلب', checkoutIntro: 'أدخلي بيانات التوصيل وراجعي المنتجات قبل متابعة الطلب عبر واتساب.', checkoutDetails: 'بيانات التوصيل', checkoutReview: 'مراجعة الطلب', customerName: 'الاسم الكامل',
      phoneLabel: 'رقم الهاتف', addressLabel: 'مكان التوصيل / العنوان', sendOrder: 'متابعة عبر واتساب',
      deliveryLater: 'التوصيل غير مجموع بالفاتوره سوف يتم ارسالك رسوم التوصيل لاحقا',
      deliveryIncluded: 'التوصيل مجاني لهذا الطلب.', deliveryProgress: 'اطلبي بقيمة {amount} إضافية لتحصلي على توصيل مجاني عند 50 دينار.', deliveryReached: 'وصل طلبك إلى 50 دينار — التوصيل مجاني!', orderLabel: 'ملخص الطلب',
      checkoutNameError: 'يرجى إدخال الاسم الكامل.', checkoutPhoneError: 'أدخلي رقم يبدأ بـ07 ويتكوّن من 10 أو 15 خانة.',
      checkoutAddressError: 'يرجى إدخال عنوان التوصيل.', checkoutNeedItems: 'الحقيبة فارغة. أضيفي منتجاً قبل إتمام الطلب.',
      checkoutQty: 'الكمية', checkoutTotal: 'الإجمالي', checkoutSent: 'طلبك جاهز للإرسال عبر واتساب.', added: 'تمت إضافتها إلى السلة'
    }
  };
  Object.assign(translations.en, checkoutTranslations.en);
  Object.assign(translations.ar, checkoutTranslations.ar);

  const modal = document.createElement('div');
  modal.className = 'modal checkout-modal';
  modal.id = 'checkoutModal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <section class="checkout-card" id="checkoutCard" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
      <header class="checkout-header">
        <div><span class="checkout-kicker">${lang === 'ar' ? 'خطوة أخيرة' : 'ONE LAST STEP'}</span><h2 id="checkoutTitle">${tCheckout('checkoutTitle')}</h2><p class="checkout-intro">${tCheckout('checkoutIntro')}</p></div>
        <button class="checkout-close" type="button" aria-label="${lang === 'ar' ? 'إغلاق' : 'Close'}" onclick="toggleCheckout(false)">×</button>
      </header>
      <div class="checkout-steps" aria-label="${lang === 'ar' ? 'خطوات الطلب' : 'Order steps'}"><span class="is-current"><i>1</i>${tCheckout('checkoutDetails')}</span><b></b><span><i>2</i>${tCheckout('checkoutReview')}</span></div>
      <form id="checkoutForm" class="checkout-layout" novalidate>
        <div class="checkout-fields">
          <h3 class="checkout-section-title">${tCheckout('checkoutDetails')}</h3>
          <label><span class="checkout-label">${tCheckout('customerName')}</span><input class="checkout-field" id="customerName" name="name" autocomplete="name" maxlength="80" required></label>
          <label><span class="checkout-label">${tCheckout('phoneLabel')}</span><input class="checkout-field" id="customerPhone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" pattern="07(?:[0-9]{8}|[0-9]{13})" minlength="10" maxlength="15" placeholder="07XXXXXXXX" required></label>
          <label><span class="checkout-label">${tCheckout('addressLabel')}</span><textarea class="checkout-field" id="customerAddress" name="address" rows="3" maxlength="300" autocomplete="street-address" required></textarea></label>
          <p class="checkout-error" id="checkoutError" role="alert" aria-live="polite"></p>
          <button class="btn checkout-submit" type="submit">${tCheckout('sendOrder')}</button>
        </div>
        <div class="checkout-summary" id="checkoutSummary" aria-live="polite"></div>
      </form>
    </section>`;
  document.body.appendChild(modal);

  function getCartTotals() {
    const entries = Object.entries(cart).filter(([id, qty]) => products.some(p => p.id === Number(id)) && Number.isInteger(qty) && qty > 0);
    const total = entries.reduce((sum, [id, qty]) => sum + products.find(p => p.id === Number(id)).price * qty, 0);
    return { entries, total };
  }

  function renderCheckoutSummary() {
    const root = document.getElementById('checkoutSummary');
    if (!root) return;
    const { entries, total } = getCartTotals();
    const rows = entries.map(([id, qty]) => {
      const product = products.find(p => p.id === Number(id));
      const name = lang === 'ar' ? product.ar : product.name;
      return `<article class="checkout-order-row">
        <img src="${product.img}" alt="" loading="lazy">
        <div><strong>${name}</strong><small>${currency(product.price)} · ${tCheckout('checkoutQty')}: ${qty}</small>
          <div class="checkout-qty"><button type="button" onclick="changeQty(${product.id},-1)" aria-label="${lang === 'ar' ? 'تقليل الكمية' : 'Decrease quantity'}">−</button><span>${qty}</span><button type="button" onclick="changeQty(${product.id},1)" aria-label="${lang === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}">+</button></div>
        </div><b>${currency(product.price * qty)}</b>
      </article>`;
    }).join('');
    const delivery = total >= 50 ? tCheckout('deliveryIncluded') : tCheckout('deliveryLater');
    const progressText = total >= 50 ? tCheckout('deliveryReached') : tCheckout('deliveryProgress').replace('{amount}', currency(50 - total));
    root.innerHTML = `<h3>${tCheckout('orderLabel')}</h3>
      <div class="checkout-order">${rows || `<p>${tCheckout('checkoutNeedItems')}</p>`}</div>
      <div class="checkout-total"><span>${tCheckout('checkoutTotal')}</span><strong>${currency(total)}</strong></div>
      <div class="delivery-progress"><p>${progressText}</p><div class="delivery-progress-track"><i style="width:${Math.min(total / 50 * 100, 100)}%"></i></div><div class="delivery-progress-labels"><span>0</span><strong>50 ${lang === 'ar' ? 'دينار' : 'JOD'}</strong></div></div>
      <p class="delivery-note ${total >= 50 ? 'is-free' : 'is-later'}" id="checkoutDeliveryMessage">${delivery}</p>`;
  }

  function updateCheckoutCopy() {
    document.getElementById('checkoutTitle').textContent = tCheckout('checkoutTitle');
    document.querySelector('.checkout-intro').textContent = tCheckout('checkoutIntro');
    document.querySelector('.checkout-steps').innerHTML = `<span class="is-current"><i>1</i>${tCheckout('checkoutDetails')}</span><b></b><span><i>2</i>${tCheckout('checkoutReview')}</span>`;
    document.querySelector('.checkout-section-title').textContent = tCheckout('checkoutDetails');
    const labels = document.querySelectorAll('.checkout-label');
    ['customerName', 'phoneLabel', 'addressLabel'].forEach((key, index) => { if (labels[index]) labels[index].textContent = tCheckout(key); });
    document.querySelector('.checkout-submit').textContent = tCheckout('sendOrder');
    document.querySelector('.checkout-close').setAttribute('aria-label', lang === 'ar' ? 'إغلاق' : 'Close');
    document.getElementById('checkoutCard').dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  function renderCheckoutCart() {
    const validEntries = Object.entries(cart).filter(([id, qty]) => products.some(p => p.id === Number(id)) && Number.isInteger(qty) && qty > 0);
    cart = Object.fromEntries(validEntries);
    const qty = validEntries.reduce((sum, [, count]) => sum + count, 0);
    const total = validEntries.reduce((sum, [id, count]) => sum + products.find(p => p.id === Number(id)).price * count, 0);
    document.getElementById('cartCount').textContent = qty;
    document.getElementById('subtotal').textContent = currency(total);
    document.getElementById('shipFill').style.width = `${Math.min(total / 50 * 100, 100)}%`;
    document.getElementById('shipMessage').innerHTML = total >= 50 ? tCheckout('shipFree') : tCheckout('shipMore').replace('{amount}', currency(50 - total));
    document.getElementById('cartItems').innerHTML = validEntries.length ? validEntries.map(([id, count]) => {
      const p = products.find(product => product.id === Number(id));
      const name = lang === 'ar' ? p.ar : p.name;
      return `<div class="cartrow"><img src="${p.img}" alt="${name}" loading="lazy"><div><h3>${name}</h3><small>${p.brand} · ${currency(p.price)}</small><div class="qty"><button onclick="changeQty(${p.id},-1)" aria-label="Remove one">−</button><span>${count}</span><button onclick="changeQty(${p.id},1)" aria-label="Add one">+</button></div></div><span class="price">${currency(p.price * count)}</span></div>`;
    }).join('') : `<p class="empty">${tCheckout('empty')}</p>`;
    try { localStorage.setItem('jameelati-cart', JSON.stringify(cart)); } catch (error) { console.warn('Cart could not be saved in this browser.', error); }
    renderCheckoutSummary();
  }

  function saveCartSafely() {
    try { localStorage.setItem('jameelati-cart', JSON.stringify(cart)); }
    catch (error) { console.warn('Cart changes will last for this browser session only.', error); }
  }

  function addProductToCart(id) {
    if (!products.some(product => product.id === Number(id))) return;
    cart[id] = (Number.isInteger(cart[id]) && cart[id] > 0 ? cart[id] : 0) + 1;
    saveCartSafely();
    renderCheckoutCart();
    toast(tCheckout('added'), 'success');
  }

  function updateCartQuantity(id, delta) {
    if (!products.some(product => product.id === Number(id))) return;
    const next = (Number.isInteger(cart[id]) && cart[id] > 0 ? cart[id] : 0) + Number(delta);
    if (next > 0) cart[id] = next;
    else delete cart[id];
    saveCartSafely();
    renderCheckoutCart();
  }

  let checkoutOpener = null;
  function toggleCheckout(open) {
    if (open && getCartTotals().entries.length === 0) {
      toast(tCheckout('checkoutNeedItems'));
      return;
    }
    if (open) {
      checkoutOpener = document.activeElement;
      document.getElementById('drawer').classList.remove('open');
      document.getElementById('overlay').classList.remove('open');
    }
    modal.classList.toggle('open', open);
    modal.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : (document.getElementById('drawer').classList.contains('open') ? 'hidden' : '');
    if (open) {
      updateCheckoutCopy();
      document.getElementById('checkoutError').textContent = '';
      renderCheckoutSummary();
      window.setTimeout(() => document.getElementById('customerName').focus(), 40);
    } else if (checkoutOpener && typeof checkoutOpener.focus === 'function') {
      checkoutOpener.focus();
    }
  }

  function normalizePhone(value) {
    return value.replace(/[٠-٩۰-۹]/g, digit => String('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹'.indexOf(digit) % 10)).replace(/\D/g, '');
  }
  document.getElementById('customerPhone').addEventListener('input', event => {
    event.currentTarget.value = normalizePhone(event.currentTarget.value).slice(0, 15);
  });

  function submitCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const phoneDigits = normalizePhone(phone);
    const address = document.getElementById('customerAddress').value.trim();
    const error = document.getElementById('checkoutError');
    const { entries, total } = getCartTotals();
    const fields = [['customerName', name.length >= 2, 'checkoutNameError'], ['customerPhone', /^07(?:\d{8}|\d{13})$/.test(phoneDigits), 'checkoutPhoneError'], ['customerAddress', address.length >= 5, 'checkoutAddressError']];
    document.querySelectorAll('.checkout-field').forEach(field => field.removeAttribute('aria-invalid'));
    error.textContent = '';
    if (!entries.length) { error.textContent = tCheckout('checkoutNeedItems'); return; }
    const invalid = fields.find(([id, valid]) => !valid);
    if (invalid) {
      error.textContent = tCheckout(invalid[2]);
      const field = document.getElementById(invalid[0]);
      field.setAttribute('aria-invalid', 'true');
      field.focus();
      return;
    }
    const itemLines = entries.map(([id, qty]) => {
      const p = products.find(product => product.id === Number(id));
      return `• ${lang === 'ar' ? p.ar : p.name} × ${qty} — ${currency(p.price * qty)}`;
    });
    const deliveryLine = total >= 50 ? tCheckout('deliveryIncluded') : tCheckout('deliveryLater');
    const message = [lang === 'ar' ? 'مرحباو' : 'Hello', '', `${tCheckout('customerName')}: ${name}`, `${tCheckout('phoneLabel')}: ${phone}`, `${tCheckout('addressLabel')}: ${address}`, '', ...itemLines, '', `${tCheckout('checkoutTotal')}: ${currency(total)}`, deliveryLine].join('\n');
    const whatsappUrl = `https://wa.me/962797459207?text=${encodeURIComponent(message)}`;
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!opened) error.textContent = lang === 'ar' ? 'تعذر فتح واتساب. اسمحي بالنوافذ المنبثقة ثم حاولي مجدداً.' : 'WhatsApp could not open. Allow pop-ups and try again.';
    else toast(tCheckout('checkoutSent'));
  }

  function handleEscape(event) {
    if (event.key === 'Escape' && modal.classList.contains('open')) toggleCheckout(false);
  }

  window.renderCart = renderCheckoutCart;
  window.addToCart = addProductToCart;
  window.changeQty = updateCartQuantity;
  window.checkout = () => toggleCheckout(true);
  window.toggleCheckout = toggleCheckout;
  window.submitCheckout = submitCheckout;
  document.getElementById('checkoutForm').addEventListener('submit', submitCheckout);
  modal.addEventListener('click', event => { if (event.target === modal) toggleCheckout(false); });
  document.addEventListener('keydown', handleEscape);
  window.addEventListener('storage', event => {
    if (event.key !== 'jameelati-cart') return;
    try { cart = Object.fromEntries(Object.entries(JSON.parse(event.newValue || '{}')).filter(([id, qty]) => products.some(p => p.id === Number(id)) && Number.isInteger(qty) && qty > 0)); }
    catch (error) { cart = {}; }
    renderCheckoutCart();
  });
  setLanguage(lang);
  renderCheckoutCart();
})();
