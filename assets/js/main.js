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

  function slugify(value='') {
    return normalizeTR(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'urun';
  }

  function siteBase() {
    return String(cfg.domain || 'https://darendetarim.com').replace(/\/$/, '');
  }

  function catalogProductUrl(product) {
    if (!product || !product.name) return `${siteBase()}/urunler.html`;
    if (product.id) {
      return `${siteBase()}/urunler.html?product=${encodeURIComponent(product.id)}#urunler`;
    }
    const query = new URLSearchParams({ q: product.name });
    if (product.brand) query.set('brand', product.brand);
    return `${siteBase()}/urunler.html?${query.toString()}#urunler`;
  }

  function brandProductUrl(brandName, productName) {
    const query = new URLSearchParams({
      brand: brandName || '',
      item: slugify(productName)
    });
    return `${siteBase()}/?${query.toString()}#markalar`;
  }

  function whatsappUrl(product='') {
    const info = typeof product === 'string' ? { name: product } : (product || {});
    if (!info.name) {
      const message = 'Merhaba Darende Tarım, ürünleriniz hakkında bilgi almak istiyorum.';
      return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    const shareUrl = info.shareUrl || catalogProductUrl(info);
    const lines = [
      'Merhaba Darende Tarım,',
      '',
      'Aşağıdaki ürün hakkında güncel fiyat ve detaylı bilgi almak istiyorum.',
      '',
      `Ürün: ${info.name}`
    ];
    if (info.brand && info.brand !== 'Genel') lines.push(`Marka: ${info.brand}`);
    if (info.model) lines.push(`Model: ${info.model}`);
    if (info.category) lines.push(`Kategori: ${info.category}`);
    lines.push(`Ürün bağlantısı: ${shareUrl}`);
    lines.push('', 'Müsait olduğunuzda fiyat ve teknik detayları paylaşabilir misiniz? Teşekkür ederim.');

    return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
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
    article.id = `product-${product.id || slugify(product.name)}`;

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
    const wa = document.createElement('a'); wa.className = 'product-wa'; wa.href = whatsappUrl(product); wa.setAttribute('aria-label', `${product.name} için WhatsApp'tan fiyat sor`); wa.target = '_blank'; wa.rel = 'noopener noreferrer';
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

    const getProduct = (id) => products.find(p => p.id === id);
    const featuredSelections = [
      {
        id: 'bosch-professional-akulu-kirici-delici',
        name: 'Bosch Professional Akülü Kırıcı Delici',
        category: 'El Aletleri',
        brand: 'Bosch',
        model: '',
        image: 'assets/images/brands/bosch-product-01.webp',
        alt: 'Bosch Professional akülü kırıcı delici ürün görseli',
        shortDescription: 'Bosch Professional kırıcı delici ürün grubu için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.',
        price: null,
        shareUrl: brandProductUrl('Bosch', 'Bosch Professional Akülü Kırıcı Delici')
      },
      {
        ...getProduct('husqvarna-445-x-torq-testere'),
        brand: 'Husqvarna & Qvarna',
        shareUrl: brandProductUrl('Husqvarna & Qvarna', 'Husqvarna 445 X-Torq Motorlu Testere')
      },
      {
        ...getProduct('moil-5w-40-dx2-motor-yagi-4l'),
        category: 'Motor Yağları',
        shareUrl: brandProductUrl('Moil', 'Moil 5W-40 DX2 Motor Yağı 4L')
      },
      {
        ...getProduct('karadeniz-kirmizi-kabinli-capa-makinasi'),
        shareUrl: brandProductUrl('Karadeniz Kapalı Çapa', 'Karadeniz Kırmızı Kabinli Çapa Makinası')
      },
      {
        ...getProduct('rapco-od-16a-1-ilaclama-makinasi'),
        brand: 'Kawashima & Rapco',
        shareUrl: brandProductUrl('Kawashima & Rapco', 'Rapco OD-16A-1 İlaçlama Makinası')
      },
      {
        ...getProduct('catpower-sarjli-matkap'),
        shareUrl: brandProductUrl('CAT Power Tools', 'CATPOWER Şarjlı Matkap')
      },
      {
        ...getProduct('rtrmax-18v-akulu-matkap'),
        shareUrl: brandProductUrl('RTRMAX', 'RTRMAX 18V Akülü Matkap')
      },
      {
        ...getProduct('kama-factor-jenerator-cozumleri'),
        brand: 'Kama & Factor',
        shareUrl: brandProductUrl('Kama & Factor', 'KAMA & Factor Jeneratör Çözümleri')
      }
    ].filter(item => item && item.image && item.name);

    renderProducts(target, featuredSelections);
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

    const requestedProduct = params.get('product')
      ? products.find(p => p.id === params.get('product'))
      : null;

    if (search && requestedProduct) search.value = requestedProduct.name;
    else if (search && params.get('q')) search.value = params.get('q');
    if (category && params.get('cat') && [...category.options].some(o => o.value === params.get('cat'))) category.value = params.get('cat');
    if (brand && requestedProduct?.brand && [...brand.options].some(o => o.value === requestedProduct.brand)) brand.value = requestedProduct.brand;
    else if (brand && params.get('brand') && [...brand.options].some(o => o.value === params.get('brand'))) brand.value = params.get('brand');

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
      if (requestedProduct) {
        const requestedCard = document.getElementById(`product-${requestedProduct.id}`);
        requestedCard?.classList.add('is-shared-product');
      }
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
    const brandParams = new URLSearchParams(window.location.search);
    const requestedBrand = brandParams.get('brand');
    const requestedItem = brandParams.get('item');

    const brandShowcaseData = {
      Bosch: [
        { image: 'assets/images/brands/bosch-product-01.webp', name: 'Bosch Professional Akülü Kırıcı Delici', text: 'Beton ve duvar uygulamalarına yönelik Bosch Professional kırıcı delici ürün grubu.' },
        { image: 'assets/images/brands/bosch-product-02.webp', name: 'Bosch Professional Akülü El Aletleri Seti', text: 'Matkap, kırıcı delici, taşlama ve akü ekipmanlarından oluşan profesyonel ürün grubu.' },
        { image: 'assets/images/brands/bosch-product-03.webp', name: 'Bosch Professional Akülü Kesme ve Delme Seti', text: 'Kesme, delme ve taşlama işleri için farklı Bosch Professional akülü makineler.' },
        { image: 'assets/images/brands/bosch-product-04.webp', name: 'Bosch Professional Akülü Matkap ve Taşlama Seti', text: 'Atölye ve saha kullanımı için matkap, kırıcı delici ve taşlama makinesi ürün grubu.' }
      ],
      Husqvarna: [
        { image: 'assets/images/brands/husqvarna/husqvarna-445-x-torq-testere-800x800.webp', name: 'Husqvarna 445 X-Torq Motorlu Testere', brand: 'Husqvarna', model: '445 X-Torq', category: 'Motorlu Testereler', text: 'Husqvarna 445 X-Torq motorlu testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/husqvarna/husqvarna-sirt-motoru-tirpan-800x800.webp', name: 'Husqvarna Sırt Motorlu Tırpan', brand: 'Husqvarna', category: 'Bahçe Ekipmanları', text: 'Husqvarna sırt motorlu tırpan için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],
      'Husqvarna & Qvarna': [
        { image: 'assets/images/brands/husqvarna/husqvarna-445-x-torq-testere-800x800.webp', name: 'Husqvarna 445 X-Torq Motorlu Testere', brand: 'Husqvarna', model: '445 X-Torq', category: 'Motorlu Testereler', text: 'Husqvarna 445 X-Torq motorlu testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/husqvarna/husqvarna-sirt-motoru-tirpan-800x800.webp', name: 'Husqvarna Sırt Motorlu Tırpan', brand: 'Husqvarna', category: 'Bahçe Ekipmanları', text: 'Husqvarna sırt motorlu tırpan için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],

      Moil: [
        { image: 'assets/images/brands/moil/moil-motor-yaglari-toplu.webp', name: 'Moil Motor Yağları Ürün Grubu', category: 'Motor Yağları', text: 'Moil 5W-30, 5W-40 ve 10W-40 motor yağı seçenekleri hakkında fiyat ve detaylı bilgi alabilirsiniz.' },
        { image: 'assets/images/brands/moil/moil-5w-30.webp', name: 'Moil 5W-30 Motor Yağı 4L', model: '5W-30', category: 'Motor Yağları', text: 'Moil 5W-30 4 litre motor yağı için güncel fiyat ve ürün detaylarını WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/moil/moil-5w-40.webp', name: 'Moil 5W-40 DX2 Motor Yağı 4L', model: '5W-40 DX2', category: 'Motor Yağları', text: 'Moil 5W-40 DX2 4 litre motor yağı için güncel fiyat ve ürün detaylarını WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/moil/moil-10w-40.webp', name: 'Moil 10W-40 Diesel DX3 Motor Yağı 4L', model: '10W-40 DX3', category: 'Motor Yağları', text: 'Moil 10W-40 Diesel DX3 4 litre motor yağı için güncel fiyat ve ürün detaylarını WhatsApp üzerinden sorabilirsiniz.' }
      ],
      Kawashima: [
        { image: 'assets/images/brands/kawashima/kawashima-jenerator-ka10000cle3.webp', name: 'Kawashima Jeneratör KA10000CLE3', brand: 'Kawashima', text: 'Kawashima KA10000CLE3 jeneratör için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kawashima/kawashima-tirpan-ka-t520.webp', name: 'Kawashima Tırpan KA-T520', brand: 'Kawashima', text: 'Kawashima KA-T520 tırpan için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kawashima/kawashima-dal-budama-testere-ka-cs260.webp', name: 'Kawashima Dal Budama Testeresi KA-CS260', brand: 'Kawashima', text: 'Kawashima KA-CS260 dal budama testeresi için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' }
      ],
      'Kawashima & Rapco': [
        { image: 'assets/images/brands/kawashima/kawashima-jenerator-ka10000cle3.webp', name: 'Kawashima Jeneratör KA10000CLE3', brand: 'Kawashima', model: 'KA10000CLE3', category: 'Jeneratörler', text: 'Kawashima KA10000CLE3 jeneratör için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kawashima/kawashima-tirpan-ka-t520.webp', name: 'Kawashima Tırpan KA-T520', brand: 'Kawashima', model: 'KA-T520', category: 'Bahçe Ekipmanları', text: 'Kawashima KA-T520 tırpan için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kawashima/kawashima-dal-budama-testere-ka-cs260.webp', name: 'Kawashima Dal Budama Testeresi KA-CS260', brand: 'Kawashima', model: 'KA-CS260', category: 'Motorlu Testereler', text: 'Kawashima KA-CS260 dal budama testeresi için ürün bilgisi ve fiyatı WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rapco/rapco-od-16a-1-ilaclama-makinasi-800x800.webp', name: 'Rapco OD-16A-1 İlaçlama Makinası', brand: 'Rapco', model: 'OD-16A-1', category: 'Zirai Ekipmanlar', text: 'Rapco OD-16A-1 ilaçlama makinası için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rapco/rapco-rp-5410-sirt-tirpan-800x800.webp', name: 'Rapco RP-5410 Sırt Tırpanı', brand: 'Rapco', model: 'RP-5410', category: 'Bahçe Ekipmanları', text: 'Rapco RP-5410 sırt tırpanı için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rapco/rapco-rp-5800-zincirli-testere-800x800.webp', name: 'Rapco RP-5800 Zincirli Testere', brand: 'Rapco', model: 'RP-5800', category: 'Motorlu Testereler', text: 'Rapco RP-5800 zincirli testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],
      'CAT Power Tools': [
        { image: 'assets/images/brands/cat-power-tools/catpower-sarjli-matkap-800x800.webp', name: 'CATPOWER Şarjlı Matkap', brand: 'CAT Power Tools', category: 'El Aletleri', text: 'CATPOWER akülü şarjlı matkap için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/cat-power-tools/catpower-somun-sikma-800x800.webp', name: 'CATPOWER Şarjlı Somun Sıkma', brand: 'CAT Power Tools', category: 'El Aletleri', text: 'CATPOWER akülü somun sıkma makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/cat-power-tools/catpower-kirici-delici-800x800.webp', name: 'CATPOWER Şarjlı Kırıcı Delici', brand: 'CAT Power Tools', category: 'El Aletleri', text: 'CATPOWER akülü kırıcı-delici için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],
      RTRMAX: [
        { image: 'assets/images/brands/rtrmax/rtrmax-18v-akulu-matkap-800x800.webp', name: 'RTRMAX 18V Akülü Matkap', brand: 'RTRMAX', category: 'El Aletleri', text: 'RTRMAX 18V akülü matkap için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rtrmax/rtrmax-zincirli-testere-800x800.webp', name: 'RTRMAX Zincirli Testere', brand: 'RTRMAX', category: 'Motorlu Testereler', text: 'RTRMAX zincirli testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rtrmax/rtrmax-taslama-sac-kesme-seti-800x800.webp', name: 'RTRMAX Taşlama ve Sac Kesme Seti', brand: 'RTRMAX', category: 'El Aletleri', text: 'RTRMAX taşlama ve sac kesme ürün grubu için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/rtrmax/rtrmax-power-tools-urun-grubu-800x800.webp', name: 'RTRMAX Power Tools Ürün Grubu', brand: 'RTRMAX', category: 'El Aletleri', text: 'RTRMAX matkap, testere, taşlama ve kırıcı-delici ürün grupları için fiyat ve detaylı bilgi alabilirsiniz.' }
      ],
      'Kama & Factor': [
        { image: 'assets/images/brands/kama-factor/factor-kdk10000ce3-dizel-jenerator-800x800.webp', name: 'Factor KDK10000CE3 Dizel Jeneratör', brand: 'Factor', model: 'KDK10000CE3', category: 'Jeneratörler', text: 'Factor KDK10000CE3 dizel jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kama-factor/kama-4-0is-inverter-jenerator-800x800.webp', name: 'KAMA 4.0IS Inverter Jeneratör', brand: 'Kama', model: '4.0IS', category: 'Jeneratörler', text: 'KAMA 4.0IS inverter jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kama-factor/factor-kdk6000e-benzinli-jenerator-800x800.webp', name: 'Factor KDK6000E Benzinli Jeneratör', brand: 'Factor', model: 'KDK6000E', category: 'Jeneratörler', text: 'Factor KDK6000E benzinli jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/brands/kama-factor/kama-factor-jenerator-cozumleri-800x800.webp', name: 'KAMA & Factor Jeneratör Çözümleri', brand: 'Factor', category: 'Jeneratörler', text: 'KAMA ve Factor jeneratör seçenekleri için model, kullanım alanı ve güncel fiyat bilgisini WhatsApp üzerinden alabilirsiniz.' }
      ],
      'Solakoğlu': [
        { image: 'assets/images/products/capa/03-slk-210-atmaca.webp', name: 'SLK 210 Atmaca', brand: 'Solakoğlu', model: 'SLK 210 Atmaca', category: 'Çapa Makineleri', text: 'SLK 210 Atmaca çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/04-slk-12-korkut.webp', name: 'SLK 12 Korkut', brand: 'Solakoğlu', model: 'SLK 12 Korkut', category: 'Çapa Makineleri', text: 'SLK 12 Korkut çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/05-slk-14-korkut.webp', name: 'SLK 14 Korkut', brand: 'Solakoğlu', model: 'SLK 14 Korkut', category: 'Çapa Makineleri', text: 'SLK 14 Korkut çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/06-slk-17-cobra.webp', name: 'SLK 17 Cobra', brand: 'Solakoğlu', model: 'SLK 17 Cobra', category: 'Çapa Makineleri', text: 'SLK 17 Cobra çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/07-slk-22-cobra.webp', name: 'SLK 22 Cobra', brand: 'Solakoğlu', model: 'SLK 22 Cobra', category: 'Çapa Makineleri', text: 'SLK 22 Cobra çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],
      'Çapa': [
        { image: 'assets/images/products/capa/03-slk-210-atmaca.webp', name: 'SLK 210 Atmaca', brand: 'Solakoğlu', model: 'SLK 210 Atmaca', category: 'Çapa Makineleri', text: 'SLK 210 Atmaca açık çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/04-slk-12-korkut.webp', name: 'SLK 12 Korkut', brand: 'Solakoğlu', model: 'SLK 12 Korkut', category: 'Çapa Makineleri', text: 'SLK 12 Korkut açık çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/05-slk-14-korkut.webp', name: 'SLK 14 Korkut', brand: 'Solakoğlu', model: 'SLK 14 Korkut', category: 'Çapa Makineleri', text: 'SLK 14 Korkut açık çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/06-slk-17-cobra.webp', name: 'SLK 17 Cobra', brand: 'Solakoğlu', model: 'SLK 17 Cobra', category: 'Çapa Makineleri', text: 'SLK 17 Cobra açık çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/07-slk-22-cobra.webp', name: 'SLK 22 Cobra', brand: 'Solakoğlu', model: 'SLK 22 Cobra', category: 'Çapa Makineleri', text: 'SLK 22 Cobra açık çapa makinesi için güncel fiyat ve ürün bilgisini WhatsApp üzerinden sorabilirsiniz.' }
      ],
      'Karadeniz Kapalı Çapa': [
        { image: 'assets/images/products/capa/09-karadeniz-kirmizi-kabinli-capa.webp', name: 'Karadeniz Kırmızı Kabinli Çapa Makinası', brand: 'Karadeniz Kapalı Çapa', model: '4x4 Kabinli', category: 'Çapa Makineleri', text: 'Karadeniz kırmızı kabinli çapa makinası için güncel fiyat ve teknik detayları WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/10-karadeniz-gri-kabinli-capa.webp', name: 'Karadeniz Gri Kabinli Çapa Makinası', brand: 'Karadeniz Kapalı Çapa', model: '4x4 Kabinli', category: 'Çapa Makineleri', text: 'Karadeniz gri kabinli çapa makinası için güncel fiyat ve teknik detayları WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/11-karadeniz-siyah-kabinli-capa.webp', name: 'Karadeniz Siyah Kabinli Çapa Makinası', brand: 'Karadeniz Kapalı Çapa', model: '4x4 Kabinli', category: 'Çapa Makineleri', text: 'Karadeniz siyah kabinli çapa makinası için güncel fiyat ve teknik detayları WhatsApp üzerinden sorabilirsiniz.' },
        { image: 'assets/images/products/capa/12-karadeniz-gri-4x4-kabinli-capa.webp', name: 'Karadeniz 4x4 Kabinli Çapa Makinası', brand: 'Karadeniz Kapalı Çapa', model: '4x4 Kabinli', category: 'Çapa Makineleri', text: 'Karadeniz 4x4 kabinli çapa makinası için güncel fiyat ve teknik detayları WhatsApp üzerinden sorabilirsiniz.' }
      ]
    };

    const fallbackItems = brandName => Array.from({length:4}, (_,index) => ({
      image: `assets/images/placeholders/brand-product-${String(index + 1).padStart(2,'0')}.webp`,
      name: `${brandName} Ürün ${index + 1}`,
      text: 'Ürün bilgisi ve fiyat için WhatsApp üzerinden ulaşın.'
    }));

    const showcaseLinks = {
      'Husqvarna & Qvarna': 'urunler.html?q=Husqvarna',
      'Kawashima & Rapco': 'urunler.html',
      'Kama & Factor': 'urunler.html?brand=Factor',
      'Solakoğlu': 'urunler.html?brand=Solakoğlu',
      'Çapa': 'urunler.html?cat=Çapa%20Makineleri',
      'Karadeniz Kapalı Çapa': 'urunler.html?q=Kabinli'
    };

    const show = (brandName, shouldScroll = true) => {
      buttons.forEach(b => b.classList.toggle('is-active', b.dataset.brand === brandName));
      title.textContent = `${brandName} Ürünleri`;
      if (link) link.href = showcaseLinks[brandName] || `urunler.html?brand=${encodeURIComponent(brandName)}`;
      const items = brandShowcaseData[brandName] || fallbackItems(brandName);
      grid.classList.toggle('is-two', items.length === 2);
      grid.classList.toggle('is-three', items.length === 3);
      grid.classList.toggle('is-five', items.length === 5);
      grid.classList.toggle('is-six', items.length === 6);
      const fragment = document.createDocumentFragment();

      items.forEach((product, index) => {
        const item = document.createElement('article'); item.className = 'brand-product';
        item.dataset.item = slugify(product.name);
        if (requestedItem && requestedItem === item.dataset.item) item.classList.add('is-shared-product');
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
        wa.href = whatsappUrl({ ...product, brand: product.brand || brandName, shareUrl: brandProductUrl(brandName, product.name) });
        wa.setAttribute('aria-label', `${product.name} için WhatsApp'tan fiyat sor`);
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
    const brandAliases = { Husqvarna: 'Husqvarna & Qvarna', Qvarna: 'Husqvarna & Qvarna' };
    const normalizedRequestedBrand = brandAliases[requestedBrand] || requestedBrand;
    const initialBrand = buttons.some(button => button.dataset.brand === normalizedRequestedBrand) ? normalizedRequestedBrand : 'Bosch';
    show(initialBrand, false);
    if (requestedBrand || requestedItem) {
      requestAnimationFrame(() => {
        const shared = qs('.brand-product.is-shared-product', grid);
        (shared || showcase).scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
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
