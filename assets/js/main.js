'use strict';
(() => {
  const cfg = window.DARENDE_CONFIG || {};
  const products = Array.isArray(window.DARENDE_PRODUCTS) ? window.DARENDE_PRODUCTS : [];
  const brands = Array.isArray(window.DARENDE_BRANDS) ? window.DARENDE_BRANDS : [];
  const qs = (s, root=document) => root.querySelector(s);
  const qsa = (s, root=document) => [...root.querySelectorAll(s)];
  const iconPath = 'assets/icons/';

  const normalizeTR = value => String(value || '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g,'i');

  function whatsappUrl(productName='') {
    const message = productName
      ? `Merhaba Darende Tarım, ${productName} hakkında fiyat ve detaylı bilgi almak istiyorum.`
      : 'Merhaba Darende Tarım, ürünleriniz hakkında bilgi almak istiyorum.';
    return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  function imageIcon(name, alt='') {
    const img = document.createElement('img');
    img.src = `${iconPath}${name}.svg`;
    img.alt = alt;
    img.width = 18; img.height = 18;
    return img;
  }

  function setupContactLinks() {
    qsa('[data-wa]').forEach(a => {
      a.href = whatsappUrl(a.dataset.product || '');
      a.target = '_blank'; a.rel = 'noopener noreferrer';
    });
    qsa('[data-phone]').forEach(a => a.href = `tel:${cfg.phoneTel}`);
    qsa('[data-maps]').forEach(a => {
      a.href = cfg.maps; a.target = '_blank'; a.rel = 'noopener noreferrer';
    });
    qsa('[data-facebook]').forEach(a => {
      if (cfg.facebook) { a.href = cfg.facebook; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    });
    qsa('[data-instagram]').forEach(a => {
      if (cfg.instagram) { a.href = cfg.instagram; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    });
  }

  function setupMenu() {
    const toggle = qs('[data-menu-toggle]');
    const nav = qs('[data-mobile-nav]');
    const backdrop = qs('[data-menu-backdrop]');
    const closeButton = nav ? qs('[data-menu-close]', nav) : null;
    if (!toggle || !nav) return;

    let lastFocused = null;

    const resetState = ({ restoreFocus = false } = {}) => {
      toggle.setAttribute('aria-expanded','false');
      nav.classList.remove('is-open');
      nav.setAttribute('aria-hidden','true');
      backdrop?.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');

      if (restoreFocus && lastFocused && document.contains(lastFocused)) {
        lastFocused.focus({preventScroll:true});
      }
      if (!restoreFocus) lastFocused = null;
    };

    const open = () => {
      lastFocused = document.activeElement;
      toggle.setAttribute('aria-expanded','true');
      nav.classList.add('is-open');
      nav.setAttribute('aria-hidden','false');
      backdrop?.classList.add('is-open');
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      requestAnimationFrame(() => closeButton?.focus({preventScroll:true}));
    };

    // Browsers can restore a previous page from bfcache with DOM classes intact.
    // Always start every page/view with a clean, closed drawer state.
    resetState();

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle.getAttribute('aria-expanded') === 'true'
        ? resetState({restoreFocus:true})
        : open();
    });

    closeButton?.addEventListener('click', () => resetState({restoreFocus:true}));
    backdrop?.addEventListener('click', () => resetState({restoreFocus:true}));

    // Navigation links must close the drawer without re-focusing the old button.
    // This prevents broken positioning when following anchors, category filters,
    // moving to products.html, or returning with browser back/forward cache.
    qsa('a', nav).forEach(a => {
      a.addEventListener('click', () => resetState({restoreFocus:false}), {capture:true});
    });

    document.addEventListener('pointerdown', e => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      resetState({restoreFocus:false});
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        resetState({restoreFocus:true});
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) resetState({restoreFocus:false});
    }, {passive:true});

    // Critical stability reset for page/category/product navigation and bfcache.
    window.addEventListener('pageshow', () => resetState({restoreFocus:false}));
    window.addEventListener('pagehide', () => resetState({restoreFocus:false}));
    window.addEventListener('popstate', () => resetState({restoreFocus:false}));
    window.addEventListener('hashchange', () => resetState({restoreFocus:false}));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') resetState({restoreFocus:false});
    });
  }

  function productCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';

    const media = document.createElement('div'); media.className = 'product-media';
    const img = document.createElement('img');
    img.src = product.image; img.alt = product.alt || product.name;
    img.width = 1000; img.height = 1000; img.loading = 'lazy'; img.decoding = 'async';
    media.appendChild(img);

    const body = document.createElement('div'); body.className = 'product-body';
    const meta = document.createElement('div'); meta.className = 'product-meta';
    const cat = document.createElement('span'); cat.textContent = product.category;
    const brand = document.createElement('span'); brand.className = 'product-brand'; brand.textContent = product.brand || 'Darende Tarım';
    meta.append(cat, brand);

    const h3 = document.createElement('h3'); h3.textContent = product.name;
    const p = document.createElement('p'); p.textContent = product.shortDescription || '';

    const footer = document.createElement('div'); footer.className = 'product-footer';
    const price = document.createElement('span'); price.className = 'price-label'; price.textContent = product.price ? `${product.price} TL` : 'Fiyat için WhatsApp';
    const wa = document.createElement('a'); wa.className = 'product-wa'; wa.href = whatsappUrl(product.name); wa.target = '_blank'; wa.rel = 'noopener noreferrer';
    wa.append(imageIcon('whatsapp',''), document.createTextNode('Fiyat Sor'));
    footer.append(price, wa);

    body.append(meta,h3,p,footer); article.append(media,body);
    return article;
  }

  function renderProducts(container, list) {
    if (!container) return;
    const fragment = document.createDocumentFragment();
    if (!list.length) {
      const empty = document.createElement('div'); empty.className = 'empty-state';
      empty.textContent = 'Bu filtreye uygun ürün henüz eklenmedi.';
      fragment.appendChild(empty);
    } else list.forEach(p => fragment.appendChild(productCard(p)));
    container.replaceChildren(fragment);
  }

  function setupFeatured() {
    const target = qs('[data-featured-products]');
    if (!target) return;
    renderProducts(target, products.filter(p => p.featured).slice(0,8));
  }

  function setupGlobalSearch() {
    qsa('[data-global-search-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = qs('input[type="search"]', form);
        const value = input ? input.value.trim() : '';
        const onCatalog = Boolean(qs('[data-products-grid]'));
        if (onCatalog) {
          const catalogSearch = qs('[data-product-search]');
          if (catalogSearch) {
            catalogSearch.value = value;
            catalogSearch.dispatchEvent(new Event('input',{bubbles:true}));
            catalogSearch.focus();
          }
        } else {
          window.location.href = `urunler.html${value ? `?q=${encodeURIComponent(value)}` : ''}`;
        }
      });
    });
  }

  function setupCatalog() {
    const grid = qs('[data-products-grid]');
    if (!grid) return;
    const search = qs('[data-product-search]');
    const category = qs('[data-category-filter]');
    const brand = qs('[data-brand-filter]');
    const sort = qs('[data-sort]');
    const count = qs('[data-result-count]');
    const params = new URLSearchParams(window.location.search);

    brands.forEach(name => {
      if (!brand || [...brand.options].some(o => o.value === name)) return;
      const option = document.createElement('option'); option.value = name; option.textContent = name; brand.appendChild(option);
    });

    if (search && params.get('q')) search.value = params.get('q');
    if (category && params.get('cat') && [...category.options].some(o => o.value === params.get('cat'))) category.value = params.get('cat');
    if (brand && params.get('brand') && [...brand.options].some(o => o.value === params.get('brand'))) brand.value = params.get('brand');

    const apply = () => {
      const term = normalizeTR(search?.value);
      const cat = category?.value || 'all';
      const selectedBrand = brand?.value || 'all';
      let list = products.filter(p => {
        const haystack = normalizeTR([p.name,p.brand,p.model,p.category,...(p.keywords||[])].join(' '));
        return (!term || haystack.includes(term)) && (cat === 'all' || p.category === cat) && (selectedBrand === 'all' || p.brand === selectedBrand);
      });
      const order = sort?.value || 'featured';
      list.sort((a,b) => {
        if (order === 'az') return a.name.localeCompare(b.name,'tr');
        if (order === 'za') return b.name.localeCompare(a.name,'tr');
        return Number(b.featured)-Number(a.featured) || a.name.localeCompare(b.name,'tr');
      });
      renderProducts(grid,list);
      if (count) count.textContent = `${list.length} ürün gösteriliyor`;
    };
    search?.addEventListener('input',apply);
    category?.addEventListener('change',apply);
    brand?.addEventListener('change',apply);
    sort?.addEventListener('change',apply);
    apply();
  }

  function setupBrands() {
    const buttons = qsa('[data-brand]');
    const showcase = qs('[data-brand-showcase]');
    const title = qs('[data-brand-showcase-title]');
    const link = qs('[data-brand-showcase-link]');
    const grid = qs('[data-brand-products]');
    if (!buttons.length || !showcase || !title || !grid) return;

    const brandShowcaseData = {
      Bosch: [
        { image: 'assets/images/brands/bosch-product-01.webp', name: 'Bosch Professional Akülü Kırıcı Delici', text: 'Beton ve duvar uygulamalarına yönelik Bosch Professional kırıcı delici ürün grubu.' },
        { image: 'assets/images/brands/bosch-product-02.webp', name: 'Bosch Professional Akülü El Aletleri Seti', text: 'Matkap, kırıcı delici, taşlama ve akü ekipmanlarından oluşan profesyonel ürün grubu.' },
        { image: 'assets/images/brands/bosch-product-03.webp', name: 'Bosch Professional Akülü Kesme ve Delme Seti', text: 'Kesme, delme ve taşlama işleri için farklı Bosch Professional akülü makineler.' },
        { image: 'assets/images/brands/bosch-product-04.webp', name: 'Bosch Professional Akülü Matkap ve Taşlama Seti', text: 'Atölye ve saha kullanımı için matkap, kırıcı delici ve taşlama makinesi ürün grubu.' }
      ],
      Husqvarna: [
        { image: 'assets/images/brands/husqvarna-product-01.webp', name: 'Husqvarna Profesyonel Motorlu Testere', text: 'Odun ve kütük kesim uygulamalarında kullanılan profesyonel motorlu testere ürün grubu.' },
        { image: 'assets/images/brands/husqvarna-product-02.webp', name: 'Husqvarna Benzinli Motorlu Testere', text: 'Bahçe, odun kesimi ve farklı saha uygulamaları için benzinli motorlu testere seçeneği.' },
        { image: 'assets/images/brands/husqvarna-product-03.webp', name: 'Husqvarna Güçlü Kesim Motorlu Testere', text: 'Yoğun kesim işlerinde kullanılmak üzere tasarlanmış motorlu testere ürün grubu.' },
        { image: 'assets/images/brands/husqvarna-product-04.webp', name: 'Husqvarna Ağır Hizmet Motorlu Testere', text: 'Kalın odun ve kütük kesimi için güçlü motorlu testere ürün grubu.' }
      ]
    };

    const fallbackItems = brandName => Array.from({length:4}, (_,index) => ({
      image: `assets/images/placeholders/brand-product-${String(index + 1).padStart(2,'0')}.webp`,
      name: `${brandName} Ürün ${index + 1}`,
      text: 'Ürün bilgisi ve fiyat için WhatsApp üzerinden ulaşın.'
    }));

    const show = (brandName, shouldScroll = true) => {
      buttons.forEach(b => b.classList.toggle('is-active', b.dataset.brand === brandName));
      title.textContent = `${brandName} Ürünleri`;
      if (link) link.href = `urunler.html?brand=${encodeURIComponent(brandName)}`;
      const items = brandShowcaseData[brandName] || fallbackItems(brandName);
      const fragment = document.createDocumentFragment();

      items.forEach((product, index) => {
        const item = document.createElement('article'); item.className = 'brand-product';
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.width = 800;
        img.height = 800;
        img.loading = index < 2 ? 'eager' : 'lazy';
        img.decoding = 'async';
        const copy = document.createElement('div');
        const strong = document.createElement('strong'); strong.textContent = product.name;
        const span = document.createElement('span'); span.textContent = product.text;
        const wa = document.createElement('a');
        wa.className = 'brand-product-wa';
        wa.href = whatsappUrl(product.name);
        wa.target = '_blank';
        wa.rel = 'noopener noreferrer';
        wa.append(imageIcon('whatsapp',''), document.createTextNode('Fiyat Sor'));
        copy.append(strong,span,wa); item.append(img,copy); fragment.appendChild(item);
      });

      grid.replaceChildren(fragment);
      showcase.hidden = false;
      if (shouldScroll) showcase.scrollIntoView({block:'nearest',behavior:'smooth'});
    };

    buttons.forEach(button => button.addEventListener('click', () => show(button.dataset.brand)));
    show('Bosch', false);
  }

  function setupGuides() {
    qsa('[data-guide-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        const open = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!open)); panel.hidden = open;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupContactLinks();
    setupFeatured();
    setupCatalog();
    setupGlobalSearch();
    setupBrands();
    setupGuides();
  });
})();
