(() => {
  const tCheckout = key => translations[lang][key] || translations.en[key] || key;
  const checkoutTranslations = {
    en: {
      checkout: 'Place order', checkoutTitle: 'Complete your order', checkoutKicker: 'SECURE CHECKOUT', checkoutIntro: 'Enter your details, then review your invoice and delivery terms before placing your order.', checkoutDetails: 'Delivery details', checkoutReview: 'Complete order', next: 'Next', back: 'Back', customerName: 'Full name', invoiceCustomer: 'Delivery details',
      phoneLabel: 'Phone number', addressLabel: 'Delivery location / address', sendOrder: 'Next',
      deliveryLater: 'Delivery is not included. We will contact you shortly to confirm its fee.',
      deliveryIncluded: 'Free delivery — your order is 50 JOD or more.', deliveryProgress: 'Order {amount} more to get free delivery at 50 JOD.', deliveryReached: 'You reached 50 JOD — delivery is free!', orderLabel: 'Order invoice', deliveryTime: 'Your order should arrive within 1 to 2 days.', deliveryContact: 'We will contact you as soon as possible to confirm your order and tell you the delivery fee when delivery is not free.', cancellationPolicy: 'You may cancel only before the second day after placing your order. Please contact us and tell us the reason for cancellation.', termsAgreement: 'I agree to the terms and conditions.', termsRequired: 'Please agree to the terms and conditions to continue.',
      checkoutNameError: 'Please enter your full name.', checkoutPhoneError: 'Enter a number starting with 07 and containing exactly 10 or 15 digits.',
      checkoutAddressError: 'Please enter your delivery address.', checkoutNeedItems: 'Your bag is empty. Add a product before checkout.',
      checkoutQty: 'Quantity', checkoutTotal: 'Total', checkoutSent: 'Your order is ready to send on WhatsApp.', added: 'Added to cart'
    },
    ar: {
      checkout: 'إتمام الطلب', checkoutTitle: 'إتمام الطلب', checkoutKicker: 'إتمام آمن لطلبك', checkoutIntro: 'أدخلي بياناتك، ثم راجعي الفاتورة وشروط التوصيل قبل تأكيد الطلب.', checkoutDetails: 'بيانات التوصيل', checkoutReview: 'إتمام الطلب', next: 'التالي', back: 'السابق', customerName: 'الاسم الكامل', invoiceCustomer: 'بيانات التوصيل',
      phoneLabel: 'رقم الهاتف', addressLabel: 'مكان التوصيل / العنوان', sendOrder: 'التالي',
      deliveryLater: 'التوصيل غير مشمول. سنتواصل معك قريباً لتأكيد رسومه.',
      deliveryIncluded: 'التوصيل مجاني لأن قيمة طلبك 50 دينار أو أكثر.', deliveryProgress: 'اطلبي بقيمة {amount} إضافية لتحصلي على توصيل مجاني عند 50 دينار.', deliveryReached: 'وصل طلبك إلى 50 دينار — التوصيل مجاني!', orderLabel: 'فاتورة الطلب', deliveryTime: 'توصلك البضاعة خلال يوم إلى يومين.', deliveryContact: 'سنتواصل معك بأقرب وقت لتأكيد الطلب، وإذا لم يكن التوصيل مجانياً سنخبرك برسومه.', cancellationPolicy: 'يمكنك إلغاء الطلب فقط قبل اليوم الثاني من بدء الطلب. يرجى إبلاغنا وذكر سبب الإلغاء.', termsAgreement: 'أوافق على الشروط والأحكام.', termsRequired: 'يرجى الموافقة على الشروط والأحكام للمتابعة.',
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
        <div><span class="checkout-kicker">${tCheckout('checkoutKicker')}</span><h2 id="checkoutTitle">${tCheckout('checkoutTitle')}</h2><p class="checkout-intro">${tCheckout('checkoutIntro')}</p></div>
        <button class="checkout-close" type="button" aria-label="${lang === 'ar' ? 'إغلاق' : 'Close'}" onclick="toggleCheckout(false)">×</button>
      </header>
      <div class="checkout-steps" aria-label="${lang === 'ar' ? 'خطوات الطلب' : 'Order steps'}"><span class="is-current" data-step="1"><i>1</i>${tCheckout('checkoutDetails')}</span><b></b><span data-step="2"><i>2</i>${tCheckout('checkoutReview')}</span></div>
      <form id="checkoutForm" novalidate>
        <section class="checkout-panel is-active" id="checkoutStep1">
        <div class="checkout-fields">
          <h3 class="checkout-section-title">${tCheckout('checkoutDetails')}</h3>
          <label><span class="checkout-label">${tCheckout('customerName')}</span><input class="checkout-field" id="customerName" name="name" autocomplete="name" maxlength="80" required></label>
          <label><span class="checkout-label">${tCheckout('phoneLabel')}</span><input class="checkout-field" id="customerPhone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" pattern="07(?:[0-9]{8}|[0-9]{13})" minlength="10" maxlength="15" placeholder="07XXXXXXXX" required></label>
          <label><span class="checkout-label">${tCheckout('addressLabel')}</span><textarea class="checkout-field" id="customerAddress" name="address" rows="3" maxlength="300" autocomplete="street-address" required></textarea></label>
        </div>
        </section>
        <section class="checkout-panel" id="checkoutStep2" hidden>
          <div class="checkout-layout"><div class="checkout-summary" id="checkoutSummary" aria-live="polite"></div>
            <div class="checkout-policy"><h3>${tCheckout('checkoutReview')}</h3><p>${tCheckout('deliveryTime')}</p><p>${tCheckout('deliveryContact')}</p><p>${tCheckout('cancellationPolicy')}</p><label class="terms-check"><input type="checkbox" id="termsAgreement"><span>${tCheckout('termsAgreement')}</span></label></div>
          </div>
        </section>
        <p class="checkout-error" id="checkoutError" role="alert" aria-live="polite"></p>
        <div class="checkout-actions"><button class="btn checkout-next" type="submit">${tCheckout('next')}</button><button class="btn outline checkout-back" type="button" hidden>${tCheckout('back')}</button><button class="btn checkout-submit" type="submit" hidden>${tCheckout('checkout')}</button></div>
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
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const customer = `<div class="invoice-customer"><h4>${tCheckout('invoiceCustomer')}</h4><p><b>${tCheckout('customerName')}</b><span>${escapeHtml(document.getElementById('customerName').value.trim())}</span></p><p><b>${tCheckout('phoneLabel')}</b><span>${escapeHtml(document.getElementById('customerPhone').value.trim())}</span></p><p><b>${tCheckout('addressLabel')}</b><span>${escapeHtml(document.getElementById('customerAddress').value.trim())}</span></p></div>`;
    root.innerHTML = `<h3>${tCheckout('orderLabel')}</h3>
      <div class="checkout-order">${rows || `<p>${tCheckout('checkoutNeedItems')}</p>`}</div>
      ${customer}
      <div class="checkout-total"><span>${tCheckout('checkoutTotal')}</span><strong>${currency(total)}</strong></div>
      <div class="delivery-progress"><p>${progressText}</p><div class="delivery-progress-track"><i style="width:${Math.min(total / 50 * 100, 100)}%"></i></div><div class="delivery-progress-labels"><span>0</span><strong>50 ${lang === 'ar' ? 'دينار' : 'JOD'}</strong></div></div>
      <p class="delivery-note ${total >= 50 ? 'is-free' : 'is-later'}" id="checkoutDeliveryMessage">${delivery}</p>`;
  }

  function updateCheckoutCopy() {
    document.getElementById('checkoutTitle').textContent = tCheckout('checkoutTitle');
    document.querySelector('.checkout-kicker').textContent = tCheckout('checkoutKicker');
    document.querySelector('.checkout-intro').textContent = tCheckout('checkoutIntro');
    document.querySelector('.checkout-steps').innerHTML = `<span class="is-current" data-step="1"><i>1</i>${tCheckout('checkoutDetails')}</span><b></b><span data-step="2"><i>2</i>${tCheckout('checkoutReview')}</span>`;
    document.querySelector('.checkout-section-title').textContent = tCheckout('checkoutDetails');
    const labels = document.querySelectorAll('.checkout-label');
    ['customerName', 'phoneLabel', 'addressLabel'].forEach((key, index) => { if (labels[index]) labels[index].textContent = tCheckout(key); });
    document.querySelector('.checkout-next').textContent = tCheckout('next');
    document.querySelector('.checkout-back').textContent = tCheckout('back');
    document.querySelector('.checkout-submit').textContent = tCheckout('checkout');
    document.querySelector('.checkout-policy h3').textContent = tCheckout('checkoutReview');
    document.querySelectorAll('.checkout-policy>p').forEach((item, index) => { item.textContent = tCheckout(['deliveryTime', 'deliveryContact', 'cancellationPolicy'][index]); });
    document.querySelector('.terms-check span').textContent = tCheckout('termsAgreement');
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
      document.getElementById('checkoutForm').reset();
      showCheckoutStep(1);
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

  function showCheckoutStep(step) {
    const first = step === 1;
    document.getElementById('checkoutStep1').hidden = !first;
    document.getElementById('checkoutStep2').hidden = first;
    document.querySelector('.checkout-next').hidden = !first;
    document.querySelector('.checkout-back').hidden = first;
    document.querySelector('.checkout-submit').hidden = first;
    document.querySelectorAll('.checkout-steps [data-step]').forEach(item => item.classList.toggle('is-current', Number(item.dataset.step) === step));
    document.querySelector('.checkout-steps').classList.toggle('step-two', step === 2);
    document.getElementById('checkoutError').textContent = '';
    document.getElementById('checkoutCard').scrollTop = 0;
  }

  function validateCustomerFields() {
    const name = document.getElementById('customerName').value.trim();
    const phoneDigits = normalizePhone(document.getElementById('customerPhone').value);
    const address = document.getElementById('customerAddress').value.trim();
    const fields = [['customerName', name.length >= 2, 'checkoutNameError'], ['customerPhone', /^07(?:\d{8}|\d{13})$/.test(phoneDigits), 'checkoutPhoneError'], ['customerAddress', address.length >= 5, 'checkoutAddressError']];
    document.querySelectorAll('.checkout-field').forEach(field => field.removeAttribute('aria-invalid'));
    const invalid = fields.find(([, valid]) => !valid);
    if (invalid) {
      document.getElementById('checkoutError').textContent = tCheckout(invalid[2]);
      const field = document.getElementById(invalid[0]);
      field.setAttribute('aria-invalid', 'true');
      field.focus();
      return false;
    }
    return true;
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (document.getElementById('checkoutStep2').hidden) {
      if (!getCartTotals().entries.length) { document.getElementById('checkoutError').textContent = tCheckout('checkoutNeedItems'); return; }
      if (validateCustomerFields()) { renderCheckoutSummary(); showCheckoutStep(2); }
      return;
    }
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const phoneDigits = normalizePhone(phone);
    const address = document.getElementById('customerAddress').value.trim();
    const error = document.getElementById('checkoutError');
    const { entries, total } = getCartTotals();
    error.textContent = '';
    if (!entries.length) { error.textContent = tCheckout('checkoutNeedItems'); return; }
    if (!validateCustomerFields()) { showCheckoutStep(1); return; }
    if (!document.getElementById('termsAgreement').checked) { error.textContent = tCheckout('termsRequired'); document.getElementById('termsAgreement').focus(); return; }
    const itemLines = entries.map(([id, qty]) => {
      const p = products.find(product => product.id === Number(id));
      return `• ${lang === 'ar' ? p.ar : p.name} × ${qty} — ${currency(p.price * qty)}`;
    });
    const deliveryLine = total >= 50 ? tCheckout('deliveryIncluded') : tCheckout('deliveryLater');
    const message = [lang === 'ar' ? 'مرحبا' : 'Hello', '', `${tCheckout('customerName')}: ${name}`, `${tCheckout('phoneLabel')}: ${phone}`, `${tCheckout('addressLabel')}: ${address}`, '', ...itemLines, '', `${tCheckout('checkoutTotal')}: ${currency(total)}`, deliveryLine].join('\n');
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
  document.querySelector('.checkout-back').addEventListener('click', () => showCheckoutStep(1));
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
