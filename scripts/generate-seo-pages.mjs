import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const domain = 'https://darendetarim.com';
const lastmod = '2026-08-18';
const phoneDisplay = '0505 515 85 44';
const phoneTel = '+905055158544';
const whatsappNumber = '905055158544';
const address = 'Sungur Mahallesi, Somuncu Baba Bulvarı No:14, Darende / Malatya';
const mapsUrl = 'https://maps.google.com?q=38.5532460,37.4935680&entry=gps';

const productContext = { window: {} };
vm.createContext(productContext);
vm.runInContext(
  fs.readFileSync(path.join(rootDir, 'assets/js/products.js'), 'utf8'),
  productContext,
  { filename: 'products.js' }
);
const products = Array.from(productContext.window.DARENDE_PRODUCTS || []);

const detailIds = new Set([
  'kawashima-jenerator-ka10000cle3','kawashima-tirpan-ka-t520','kawashima-dal-budama-testere-ka-cs260',
  'rapco-od-16a-1-ilaclama-makinasi','rapco-rp-5410-sirt-tirpan','rapco-rp-5800-zincirli-testere',
  'husqvarna-445-x-torq-testere','moil-5w-30-motor-yagi-4l','moil-5w-40-dx2-motor-yagi-4l',
  'moil-10w-40-diesel-dx3-motor-yagi-4l','slk-210-atmaca','slk-12-korkut','slk-14-korkut',
  'slk-17-cobra','slk-22-cobra','rtrmax-18v-akulu-matkap','factor-kdk10000ce3-dizel-jenerator',
  'kama-4-0is-inverter-jenerator','factor-kdk6000e-benzinli-jenerator',
  'karadeniz-kirmizi-kabinli-capa-makinasi','karadeniz-gri-kabinli-capa-makinasi',
  'karadeniz-siyah-kabinli-capa-makinasi','karadeniz-gri-4x4-kabinli-capa-makinasi'
]);

const categories = [
  {
    slug: 'capa-makineleri', category: 'Çapa Makineleri',
    title: 'Darende Çapa Makineleri | Darende Tarım',
    h1: 'Darende Çapa Makineleri',
    description: 'Darende Tarım çapa makineleri, römorklu tarım araçları, Solakoğlu ve Karadeniz kabinli çapa modelleri. Fiyat ve ürün bilgisi için ulaşın.',
    image: '/assets/images/categories/capa-makineleri.webp',
    intro: 'Darende Tarım, bahçe ve tarla işlerinde kullanılabilecek çapa makineleri ile römorklu ve kabinli tarım aracı seçeneklerini Darende ve Malatya çevresindeki kullanıcılarla buluşturur.',
    detail: 'Toprak yapısı, işlenecek alanın büyüklüğü, kullanım sıklığı ve servis erişimi doğru modeli belirler. Model seçimi yapılırken yalnızca görsele değil, üretici etiketindeki teknik bilgilere ve gerçek kullanım ihtiyacına bakılmalıdır.',
    selectionTitle: 'Çapa makinesi seçerken dikkat edilmesi gerekenler',
    bullets: ['Bahçe veya tarla alanının büyüklüğü', 'Toprak yapısı ve kullanım yoğunluğu', 'Makine ağırlığı, manevra ve taşıma ihtiyacı', 'Servis, garanti ve yedek parça erişimi'],
    filter: p => p.category === 'Çapa Makineleri'
  },
  {
    slug: 'karadeniz-kapali-capa', category: 'Çapa Makineleri',
    title: 'Karadeniz Kapalı Çapa Makineleri | Darende Tarım',
    h1: 'Karadeniz Kapalı ve Kabinli Çapa Makineleri',
    description: 'Karadeniz kapalı çapa ve 4x4 kabinli çapa makinesi modellerini Darende Tarım’da inceleyin. Güncel fiyat ve model bilgisi için WhatsApp’tan ulaşın.',
    image: '/assets/images/products/capa/12-karadeniz-gri-4x4-kabinli-capa.webp',
    intro: 'Karadeniz kapalı çapa seçenekleri, kabinli gövde ve farklı model varyantları arayan kullanıcılar için Darende Tarım ürün grubunda yer alır. Güncel model, stok ve teslim bilgisi doğrudan mağazadan doğrulanır.',
    detail: 'Kabinli çapa makinesi tercihinde kullanım alanı, zemin koşulları, motor ve aktarma özellikleri, güvenlik donanımları ve servis koşulları birlikte değerlendirilmelidir.',
    selectionTitle: 'Kabinli çapa modeli seçerken doğrulayın',
    bullets: ['Model ve üretici etiketindeki teknik değerler', 'Kullanım alanına uygunluk ve manevra ihtiyacı', 'Teslimat kapsamındaki ekipmanlar', 'Garanti, servis ve yedek parça koşulları'],
    filter: p => p.brand === 'Karadeniz Kapalı Çapa'
  },
  {
    slug: 'jeneratorler', category: 'Jeneratörler',
    title: 'Darende Jeneratör Modelleri | Darende Tarım',
    h1: 'Darende Jeneratör Modelleri',
    description: 'Darende Tarım benzinli, dizel ve inverter jeneratör modelleri. KAMA, Factor ve Kawashima jeneratör fiyatı ve ürün bilgisi için iletişime geçin.',
    image: '/assets/images/placeholders/category-jenerator.webp',
    intro: 'Ev, iş yeri, tarla veya taşınabilir güç ihtiyacında kullanılabilecek jeneratör seçeneklerini Darende Tarım ürün grubunda inceleyebilirsiniz. Satın almadan önce çalıştırılacak cihazların toplam ve ilk kalkış gücü hesaplanmalıdır.',
    detail: 'Jeneratör seçiminde yalnızca model adı yeterli değildir. Sürekli güç, maksimum güç, yakıt tipi, çalışma süresi, faz yapısı ve kullanım ortamı üretici verileri üzerinden doğrulanmalıdır.',
    selectionTitle: 'Jeneratör seçerken temel kontrol listesi',
    bullets: ['Sürekli ve ilk kalkış güç ihtiyacı', 'Benzinli, dizel veya inverter kullanım tercihi', 'Tek faz veya üç faz gereksinimi', 'Ses, yakıt, bakım ve çalışma ortamı koşulları'],
    filter: p => p.category === 'Jeneratörler'
  },
  {
    slug: 'kaynak-makineleri', category: 'Kaynak Makineleri',
    title: 'Darende Kaynak Makineleri | Darende Tarım',
    h1: 'Darende Kaynak Makineleri',
    description: 'Darende Tarım inverter kaynak makinesi ve atölye ekipmanlarını inceleyin. Kullanım ihtiyacınıza uygun ürün ve güncel fiyat için iletişime geçin.',
    image: '/assets/images/placeholders/category-kaynak.webp',
    intro: 'Atölye, bakım ve saha işlerinde kullanılabilecek kaynak makinesi seçenekleri Darende Tarım ürün kataloğunda sunulur. Uygun ürün; malzeme türüne, iş yoğunluğuna ve kullanılacak elektrik altyapısına göre belirlenmelidir.',
    detail: 'Akım aralığı, görev döngüsü, elektrot uyumluluğu, şebeke gereksinimi ve taşınabilirlik gibi değerler ürünün gerçek teknik etiketi üzerinden kontrol edilmelidir.',
    selectionTitle: 'Kaynak makinesi seçerken değerlendirin',
    bullets: ['Kaynak yapılacak malzeme ve iş yoğunluğu', 'Akım aralığı ve görev döngüsü', 'Elektrik altyapısı ve saha koşulları', 'Garanti, servis ve aksesuar kapsamı'],
    filter: p => p.category === 'Kaynak Makineleri'
  },
  {
    slug: 'hava-kompresorleri', category: 'Kompresörler',
    title: 'Darende Hava Kompresörleri | Darende Tarım',
    h1: 'Darende Hava Kompresörü Modelleri',
    description: 'Darende Tarım hava kompresörü modelleri ve atölye hava çözümleri. Factor kompresör ve güncel ürün bilgisi için WhatsApp’tan ulaşın.',
    image: '/assets/images/placeholders/category-kompresor.webp',
    intro: 'Atölye, bakım ve hava destekli ekipman ihtiyaçları için hava kompresörü seçeneklerini Darende Tarım’da inceleyebilirsiniz. Tank kapasitesi tek başına seçim için yeterli değildir.',
    detail: 'Basınç, hava debisi, tank hacmi, motor gücü, çalışma sıklığı ve kullanılacak pnömatik ekipmanların ihtiyacı birlikte değerlendirilmelidir.',
    selectionTitle: 'Kompresör seçerken kontrol edin',
    bullets: ['Gerekli hava debisi ve çalışma basıncı', 'Tank hacmi ve kullanım sıklığı', 'Elektrik altyapısı ve motor bilgisi', 'Bakım, servis ve güvenlik koşulları'],
    filter: p => p.category === 'Kompresörler'
  },
  {
    slug: 'motorlu-testereler', category: 'Motorlu Testereler',
    title: 'Darende Motorlu Testere Modelleri | Darende Tarım',
    h1: 'Darende Motorlu Testere Modelleri',
    description: 'Darende Tarım motorlu ve zincirli testere modelleri. Husqvarna, Kawashima, Rapco ve RTRMAX ürünleri için fiyat ve ürün bilgisi alın.',
    image: '/assets/images/placeholders/category-testere.webp',
    intro: 'Budama, odun kesimi ve farklı saha işleri için motorlu testere seçeneklerini Darende Tarım ürün grubunda inceleyebilirsiniz. Model tercihi kullanım amacı ve güvenlik gereksinimlerine göre yapılmalıdır.',
    detail: 'Pala boyu, motor yapısı, ağırlık, zincir ve bakım gereksinimi modele göre değişir. Kesin teknik değerler üretici belgesi ve ürün etiketi üzerinden doğrulanmalıdır.',
    selectionTitle: 'Motorlu testere seçerken dikkat edin',
    bullets: ['Budama, odun kesimi veya yoğun kullanım amacı', 'Pala ve zincir uyumluluğu', 'Ağırlık, ergonomi ve bakım ihtiyacı', 'Koruyucu ekipman ve üretici güvenlik talimatları'],
    filter: p => p.category === 'Motorlu Testereler'
  },
  {
    slug: 'bahce-ekipmanlari', category: 'Bahçe Ekipmanları',
    title: 'Darende Bahçe Ekipmanları | Darende Tarım',
    h1: 'Darende Bahçe Ekipmanları',
    description: 'Darende Tarım tırpan, budama ve bahçe bakım ekipmanları. Kawashima, Rapco ve Husqvarna ürünleri için güncel bilgi alın.',
    image: '/assets/images/placeholders/category-bahce.webp',
    intro: 'Bahçe bakımı, ot temizliği ve budama gibi işler için farklı güç ve kullanım özelliklerine sahip ekipmanlar Darende Tarım ürün grubunda yer alır.',
    detail: 'Ekipman seçimi yapılırken alanın büyüklüğü, kullanım sıklığı, taşıma ihtiyacı, bakım imkânı ve uygun koruyucu ekipmanlar birlikte değerlendirilmelidir.',
    selectionTitle: 'Bahçe ekipmanı seçerken değerlendirin',
    bullets: ['Yapılacak iş ve alan büyüklüğü', 'Ağırlık, ergonomi ve taşıma kolaylığı', 'Yakıtlı veya elektrikli kullanım tercihi', 'Servis, sarf malzeme ve yedek parça erişimi'],
    filter: p => p.category === 'Bahçe Ekipmanları'
  },
  {
    slug: 'zirai-ekipmanlar', category: 'Zirai Ekipmanlar',
    title: 'Darende Zirai Ekipmanlar | Darende Tarım',
    h1: 'Darende Zirai Ekipman ve Tarım Aletleri',
    description: 'Darende Tarım zirai ekipman ve ilaçlama makinası seçenekleri. Rapco ürünleri ve tarım aletleri için güncel fiyat ve ürün bilgisi alın.',
    image: '/assets/images/placeholders/category-zirai.webp',
    intro: 'Tarla, bahçe ve bitki bakımında kullanılan zirai ekipman seçenekleri Darende Tarım ürün kataloğunda sunulur. Ürün tercihi uygulama alanına ve üretici talimatlarına göre yapılmalıdır.',
    detail: 'İlaçlama ve diğer zirai uygulamalarda kapasite, malzeme uyumluluğu, kullanım güvenliği ve bakım şartları ürün bazında doğrulanmalıdır.',
    selectionTitle: 'Zirai ekipman seçerken kontrol edin',
    bullets: ['Uygulama alanı ve kapasite ihtiyacı', 'Kullanılacak malzemeyle ürün uyumluluğu', 'Temizlik, bakım ve yedek parça koşulları', 'Üretici güvenlik talimatları ve koruyucu ekipman'],
    filter: p => p.category === 'Zirai Ekipmanlar'
  },
  {
    slug: 'yedek-parca-aksesuar', category: 'Yedek Parçalar',
    title: 'Tarım Aletleri Yedek Parça | Darende Tarım',
    h1: 'Tarım Aletleri Yedek Parça ve Aksesuar',
    description: 'Darende Tarım tarım makineleri yedek parça, aksesuar ve Moil motor yağı seçenekleri. Model uyumu ve güncel ürün bilgisi için ulaşın.',
    image: '/assets/images/placeholders/category-yedek.webp',
    intro: 'Tarım makineleri, bahçe ekipmanları ve teknik ürünler için yedek parça, aksesuar ve motor yağı seçeneklerini Darende Tarım’da inceleyebilirsiniz.',
    detail: 'Yedek parça ve sarf malzemesinde ürün adı kadar makine modeli, üretim varyantı, ölçü ve üretici kodu da önemlidir. Sipariş öncesinde uyumluluk doğrulanmalıdır.',
    selectionTitle: 'Yedek parça siparişinden önce hazırlayın',
    bullets: ['Makinenin marka ve tam model bilgisi', 'Varsa parça veya üretici kodu', 'Ölçü, bağlantı ve uyumluluk bilgileri', 'Ürünün mevcut fotoğrafı ve kullanım amacı'],
    filter: p => p.category === 'Yedek Parçalar'
  },
  {
    slug: 'el-aletleri', category: 'El Aletleri',
    title: 'Darende Elektrikli El Aletleri | Darende Tarım',
    h1: 'Darende Elektrikli ve Akülü El Aletleri',
    description: 'Darende Tarım akülü matkap, somun sıkma, kırıcı delici ve profesyonel el aletleri. CATPOWER ve RTRMAX ürünleri için bilgi alın.',
    image: '/assets/images/brands/cat-power-tools/catpower-sarjli-matkap-800x800.webp',
    intro: 'Atölye, montaj ve saha işlerinde kullanılan elektrikli ve akülü el aletleri Darende Tarım ürün grubunda yer alır. İşe uygun güç ve ekipman seçimi kullanım güvenliği açısından önemlidir.',
    detail: 'Akü platformu, voltaj, tork, darbe özelliği, aksesuar uyumluluğu ve garanti koşulları ürün modeli üzerinden kontrol edilmelidir.',
    selectionTitle: 'El aleti seçerken değerlendirin',
    bullets: ['Yapılacak iş ve kullanım sıklığı', 'Akü, voltaj ve aksesuar uyumluluğu', 'Ergonomi, ağırlık ve taşıma ihtiyacı', 'Garanti, servis ve yedek parça koşulları'],
    filter: p => p.category === 'El Aletleri'
  }
];

const categoryByName = new Map(categories.filter(c => c.slug !== 'karadeniz-kapali-capa').map(c => [c.category, c]));
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const rootAsset = value => value.startsWith('/') ? value : `/${value}`;
const absolute = route => `${domain}${route}`;
const productRoute = product => detailIds.has(product.id) ? `/urun/${product.id}/` : '';
const categoryForProduct = product => product.brand === 'Karadeniz Kapalı Çapa'
  ? categories.find(category => category.slug === 'karadeniz-kapali-capa')
  : categoryByName.get(product.category) || categories[0];

function whatsappUrl(product, shareRoute = '') {
  const lines = [
    'Merhaba Darende Tarım,', '',
    `${product.name} hakkında güncel fiyat, stok ve teknik bilgi almak istiyorum.`,
    `Ürün: ${product.name}`
  ];
  if (product.brand && product.brand !== 'Genel') lines.push(`Marka: ${product.brand}`);
  if (product.model) lines.push(`Model: ${product.model}`);
  lines.push(`Ürün bağlantısı: ${absolute(shareRoute || productRoute(product) || '/urunler.html')}`);
  lines.push('', 'Müsait olduğunuzda bilgi paylaşabilir misiniz? Teşekkür ederim.');
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function storeSchema() {
  return {
    '@type': 'Store', '@id': `${domain}/#business`, name: 'Darende Tarım', alternateName: 'Darende Tarım Aletleri',
    url: `${domain}/`, logo: `${domain}/assets/images/ui/darende-tarim-logo.webp`,
    image: `${domain}/assets/images/ui/darende-tarim-og.webp`,
    description: 'Darende merkezli tarım aletleri, çapa makineleri, jeneratör, kaynak makinesi, motorlu testere, bahçe ve teknik ekipman satışı.',
    telephone: phoneTel,
    address: { '@type': 'PostalAddress', streetAddress: 'Sungur Mahallesi, Somuncu Baba Bulvarı No:14', addressLocality: 'Darende', addressRegion: 'Malatya', postalCode: '44700', addressCountry: 'TR' },
    geo: { '@type': 'GeoCoordinates', latitude: 38.553246, longitude: 37.493568 },
    hasMap: mapsUrl,
    areaServed: ['Darende', 'Malatya', 'Gürün', 'Elbistan'].map(name => ({ '@type': 'AdministrativeArea', name }))
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absolute(item.route) }))
  };
}

function pageHeader() {
  return `
<div class="topbar premium-topbar"><div class="container topbar-inner premium-topbar-inner">
  <a class="topbar-wa" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" height="16" src="/assets/icons/whatsapp.svg" width="16"/>7/24 WhatsApp İletişim</a>
  <div class="topbar-right"><a href="/hakkimizda/">Hakkımızda</a><a href="/iletisim/">İletişim</a><span aria-hidden="true" class="topbar-divider"></span><a aria-label="Darende Tarım Facebook profilini yeni sekmede aç" data-facebook href="https://www.facebook.com/gucuktaksi/" rel="noopener noreferrer" target="_blank"><img alt="" height="17" src="/assets/icons/facebook.svg" width="17"/></a><a aria-label="Darende Tarım Instagram profilini yeni sekmede aç" data-instagram href="https://www.instagram.com/bayram_gucukk/" rel="noopener noreferrer" target="_blank"><img alt="" height="17" src="/assets/icons/instagram.svg" width="17"/></a></div>
</div></div>
<header class="site-header premium-header"><div class="container header-main premium-header-main">
  <a aria-label="Darende Tarım ana sayfa" class="brand premium-brand" href="/"><img alt="Darende Tarım Aletleri logosu" class="brand-logo" height="934" src="/assets/images/ui/darende-tarim-logo.webp" width="1661"/></a>
  <form action="/urunler.html" class="search-form premium-search" method="get" role="search"><a aria-label="Tüm ürünlere git" class="search-category" href="/urunler.html"><img alt="" height="18" src="/assets/icons/grid.svg" width="18"/><span>Tüm Ürünler</span></a><label class="sr-only" for="seo-site-search">Ürün ara</label><input autocomplete="off" id="seo-site-search" name="q" placeholder="Ürün, marka veya kategori ara..." type="search"/><button aria-label="Ara" type="submit"><img alt="" height="19" src="/assets/icons/search.svg" width="19"/><span>Ara</span></button></form>
  <div aria-label="Hızlı iletişim" class="header-actions premium-header-actions"><a class="header-contact-card" href="tel:${phoneTel}"><span class="contact-icon"><img alt="" height="20" src="/assets/icons/phone.svg" width="20"/></span><span><strong>Bizi Arayın</strong><small>${phoneDisplay}</small></span></a><a class="header-contact-card whatsapp" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><span class="contact-icon"><img alt="" height="20" src="/assets/icons/whatsapp.svg" width="20"/></span><span><strong>WhatsApp</strong><small>Ürün bilgisi</small></span></a><a class="header-contact-card" href="${escapeHtml(mapsUrl)}" rel="noopener noreferrer" target="_blank"><span class="contact-icon"><img alt="" height="20" src="/assets/icons/map-pin.svg" width="20"/></span><span><strong>Mağazamız</strong><small>Darende / Malatya</small></span></a></div>
</div></header>
<div class="nav-wrap premium-nav-wrap"><div class="container nav-inner premium-nav-inner"><a class="nav-category" href="/urunler.html"><img alt="" height="18" src="/assets/icons/menu.svg" width="18"/><span>Tüm Kategoriler</span></a><nav aria-label="Ana menü" class="desktop-nav"><a href="/"><img alt="" class="nav-link-icon" src="/assets/icons/home.svg"/><span>Ana Sayfa</span></a><a href="/urunler.html"><img alt="" class="nav-link-icon" src="/assets/icons/grid.svg"/><span>Ürünler</span></a><a href="/capa-makineleri/"><img alt="" class="nav-link-icon" src="/assets/icons/cog.svg"/><span>Çapa Makineleri</span></a><a href="/jeneratorler/"><img alt="" class="nav-link-icon" src="/assets/icons/zap.svg"/><span>Jeneratörler</span></a><a href="/kaynak-makineleri/"><img alt="" class="nav-link-icon" src="/assets/icons/tool.svg"/><span>Kaynak Makineleri</span></a><a href="/hakkimizda/"><img alt="" class="nav-link-icon" src="/assets/icons/users.svg"/><span>Hakkımızda</span></a><a href="/iletisim/"><img alt="" class="nav-link-icon" src="/assets/icons/phone.svg"/><span>İletişim</span></a></nav><button aria-controls="mobile-nav" aria-expanded="false" class="menu-toggle" data-menu-toggle type="button"><img alt="" height="22" src="/assets/icons/menu.svg" width="22"/><span>Menü &amp; Kategoriler</span></button></div></div>
<div class="menu-backdrop" data-menu-backdrop></div><nav aria-hidden="true" aria-label="Mobil menü" class="mobile-nav" data-mobile-nav id="mobile-nav"><div class="drawer-head"><a aria-label="Darende Tarım ana sayfa" class="drawer-brand" href="/"><img alt="Darende Tarım Aletleri logosu" height="934" src="/assets/images/ui/darende-tarim-logo.webp" width="1661"/></a><button aria-label="Menüyü kapat" class="drawer-close" data-menu-close type="button"><img alt="" src="/assets/icons/close.svg"/></button></div><div class="drawer-links"><a href="/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/home.svg"/></span><span>Ana Sayfa</span><b>›</b></a><a href="/urunler.html"><span class="drawer-link-icon"><img alt="" src="/assets/icons/grid.svg"/></span><span>Ürünler</span><b>›</b></a><a href="/capa-makineleri/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/cog.svg"/></span><span>Çapa Makineleri</span><b>›</b></a><a href="/jeneratorler/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/zap.svg"/></span><span>Jeneratörler</span><b>›</b></a><a href="/motorlu-testereler/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/tool.svg"/></span><span>Motorlu Testereler</span><b>›</b></a><a href="/hakkimizda/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/users.svg"/></span><span>Hakkımızda</span><b>›</b></a><a href="/iletisim/"><span class="drawer-link-icon"><img alt="" src="/assets/icons/phone.svg"/></span><span>İletişim</span><b>›</b></a></div><div class="drawer-contact-card"><span class="drawer-contact-icon"><img alt="" src="/assets/icons/phone.svg"/></span><div><small>Bize Ulaşın</small><a href="tel:${phoneTel}">${phoneDisplay}</a><span>WhatsApp ürün desteği</span></div></div><div aria-label="Sosyal medya" class="drawer-socials"><a aria-label="Facebook" data-facebook href="https://www.facebook.com/gucuktaksi/" rel="noopener noreferrer" target="_blank"><img alt="" src="/assets/icons/facebook.svg"/></a><a aria-label="Instagram" data-instagram href="https://www.instagram.com/bayram_gucukk/" rel="noopener noreferrer" target="_blank"><img alt="" src="/assets/icons/instagram.svg"/></a><a aria-label="WhatsApp" class="wa" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" src="/assets/icons/whatsapp.svg"/></a></div></nav>`;
}

function pageFooter() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div><div class="footer-brand"><img alt="Darende Tarım Aletleri logosu" class="footer-logo" height="934" src="/assets/images/ui/darende-tarim-logo.webp" width="1661"/><div><strong>DARENDE TARIM</strong><span>TARIM ALETLERİ</span></div></div><p class="footer-desc">Darende’de tarım aletleri, çapa makineleri, jeneratör, bahçe ve teknik ekipman satışı. Malatya, Gürün ve Elbistan çevresine hizmet; Türkiye geneline kargo.</p><div class="footer-socials"><strong class="footer-socials-title">Bizi Sosyal Medyada Takip Edin</strong><div class="footer-social-links"><a aria-label="Facebook" data-facebook href="https://www.facebook.com/gucuktaksi/" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/facebook.svg" width="18"/></a><a aria-label="Instagram" data-instagram href="https://www.instagram.com/bayram_gucukk/" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/instagram.svg" width="18"/></a></div></div></div><div><h3>Kurumsal</h3><div class="footer-links"><a href="/">Ana Sayfa</a><a href="/hakkimizda/">Hakkımızda</a><a href="/urunler.html">Ürünler</a><a href="/#markalar">Markalar</a><a href="/iletisim/">İletişim</a></div></div><div><h3>Kategoriler</h3><div class="footer-links"><a href="/capa-makineleri/">Çapa Makineleri</a><a href="/jeneratorler/">Jeneratörler</a><a href="/kaynak-makineleri/">Kaynak Makineleri</a><a href="/motorlu-testereler/">Motorlu Testereler</a><a href="/bahce-ekipmanlari/">Bahçe Ekipmanları</a></div></div><div><h3>İletişim</h3><div class="footer-links"><span>${escapeHtml(address)}</span><a href="tel:${phoneTel}">${phoneDisplay}</a><a class="footer-wa" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" height="20" src="/assets/icons/whatsapp.svg" width="20"/>WhatsApp’tan Yaz</a><a href="${escapeHtml(mapsUrl)}" rel="noopener noreferrer" target="_blank">Google Maps / Yol Tarifi</a></div></div></div><div class="footer-bottom"><span>© 2026 Darende Tarım. Tüm hakları saklıdır.</span><span>darendetarim.com</span></div></div></footer>
<nav aria-label="Hızlı sosyal medya bağlantıları" class="floating-social-rail"><a aria-label="Darende Tarım Facebook profilini yeni sekmede aç" class="floating-social-button is-facebook" data-facebook href="https://www.facebook.com/gucuktaksi/" rel="noopener noreferrer" target="_blank" title="Facebook"><img alt="" height="27" src="/assets/icons/facebook.svg" width="27"/></a><a aria-label="Darende Tarım Instagram profilini yeni sekmede aç" class="floating-social-button is-instagram" data-instagram href="https://www.instagram.com/bayram_gucukk/" rel="noopener noreferrer" target="_blank" title="Instagram"><img alt="" height="27" src="/assets/icons/instagram.svg" width="27"/></a><a aria-label="Darende Tarım ile WhatsApp üzerinden iletişime geç" class="floating-social-button is-whatsapp" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank" title="WhatsApp"><img alt="" height="27" src="/assets/icons/whatsapp.svg" width="27"/></a></nav>`;
}

function pageShell({ title, description, canonicalRoute, image = '/assets/images/ui/darende-tarim-og.webp', schema, body }) {
  const canonical = absolute(canonicalRoute);
  const imageUrl = absolute(image);
  return `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/><meta content="width=device-width,initial-scale=1" name="viewport"/>
<title>${escapeHtml(title)}</title><meta content="${escapeHtml(description)}" name="description"/><meta content="index,follow,max-image-preview:large" name="robots"/><link href="${escapeHtml(canonical)}" rel="canonical"/>
<meta content="#0754B8" name="theme-color"/><meta content="website" property="og:type"/><meta content="tr_TR" property="og:locale"/><meta content="${escapeHtml(title)}" property="og:title"/><meta content="${escapeHtml(description)}" property="og:description"/><meta content="${escapeHtml(canonical)}" property="og:url"/><meta content="${escapeHtml(imageUrl)}" property="og:image"/>
<meta content="summary_large_image" name="twitter:card"/><meta content="${escapeHtml(title)}" name="twitter:title"/><meta content="${escapeHtml(description)}" name="twitter:description"/><meta content="${escapeHtml(imageUrl)}" name="twitter:image"/>
<link href="/favicon.ico" rel="shortcut icon"/><link href="/assets/images/ui/favicon-32.png" rel="icon" sizes="32x32" type="image/png"/><link href="/assets/images/ui/favicon-192.png" rel="apple-touch-icon" sizes="192x192"/><link href="/manifest.webmanifest" rel="manifest"/><link href="/assets/css/style.css?v=700" rel="stylesheet"/>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': schema })}</script>
<script defer src="/assets/js/config.js"></script><script defer src="/assets/js/main.js?v=700"></script>
</head><body class="seo-landing-page"><a class="skip-link" href="#main">İçeriğe geç</a>${pageHeader()}<main id="main">${body}</main>${pageFooter()}</body></html>`;
}

function breadcrumbMarkup(items) {
  return `<nav aria-label="Sayfa yolu" class="seo-breadcrumb">${items.map((item, index) => index === items.length - 1 ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${escapeHtml(item.route)}">${escapeHtml(item.name)}</a><b aria-hidden="true">›</b>`).join('')}</nav>`;
}

function staticProductCard(product, contextRoute = '') {
  const detailRoute = productRoute(product);
  const mediaOpen = detailRoute ? `<a aria-label="${escapeHtml(product.name)} ürün detayını incele" class="product-media" href="${detailRoute}">` : '<div class="product-media">';
  const mediaClose = detailRoute ? '</a>' : '</div>';
  const title = detailRoute ? `<a class="product-title-link" href="${detailRoute}">${escapeHtml(product.name)}</a>` : escapeHtml(product.name);
  return `<article class="product-card" id="product-${escapeHtml(product.id)}">${mediaOpen}<img alt="${escapeHtml(product.alt || product.name)}" decoding="async" height="1000" loading="lazy" src="${escapeHtml(rootAsset(product.image))}" width="1000"/>${mediaClose}<div class="product-body"><div class="product-meta"><span>${escapeHtml(product.category)}</span><span class="product-brand">${escapeHtml(product.brand || 'Darende Tarım')}</span></div><h3>${title}</h3><p>${escapeHtml(product.shortDescription || '')}</p><div class="product-footer"><span class="price-label">Fiyat için WhatsApp</span><a aria-label="${escapeHtml(product.name)} için WhatsApp'tan fiyat sor" class="product-wa" href="${escapeHtml(whatsappUrl(product, detailRoute || contextRoute))}" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/whatsapp.svg" width="18"/>Fiyat Sor</a></div></div></article>`;
}

function faqMarkup(subject) {
  return `<div class="seo-faq-list"><details><summary>${escapeHtml(subject)} fiyatı nasıl öğrenilir?</summary><p>Güncel fiyat ve stok bilgisi değişebileceği için ürün adıyla WhatsApp üzerinden doğrudan Darende Tarım’a ulaşabilirsiniz.</p></details><details><summary>Darende dışına gönderim var mı?</summary><p>Darende ve Malatya çevresine hizmet verilir; uygun ürünlerde Türkiye geneli gönderim seçeneği için teslimat koşulları sipariş öncesinde doğrulanır.</p></details><details><summary>Teknik özellikler nasıl doğrulanır?</summary><p>Model varyantları farklı olabileceği için kesin teknik özellik, garanti ve kutu içeriği ürün etiketi veya üretici belgesi üzerinden teyit edilir.</p></details></div>`;
}

function categoryPage(category, selectedProducts) {
  const route = `/${category.slug}/`;
  const itemsWithPages = selectedProducts.filter(product => detailIds.has(product.id));
  const schema = [
    { '@type': 'CollectionPage', '@id': `${absolute(route)}#webpage`, url: absolute(route), name: category.h1, description: category.description, isPartOf: { '@id': `${domain}/#website` }, about: { '@id': `${domain}/#business` }, inLanguage: 'tr-TR' },
    breadcrumbSchema([{ name: 'Ana Sayfa', route: '/' }, { name: category.h1, route }])
  ];
  if (itemsWithPages.length) {
    schema.push({ '@type': 'ItemList', name: `${category.h1} ürünleri`, itemListElement: itemsWithPages.map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.name, url: absolute(productRoute(product)) })) });
  }
  const relatedCategories = categories.filter(item => item.slug !== category.slug && item.slug !== 'karadeniz-kapali-capa').slice(0, 4);
  const body = `
<section class="page-hero seo-page-hero"><div class="container">${breadcrumbMarkup([{ name: 'Ana Sayfa', route: '/' }, { name: category.h1, route }])}<span class="eyebrow">Darende Tarım Ürün Kategorisi</span><h1>${escapeHtml(category.h1)}</h1><p>${escapeHtml(category.intro)}</p><div class="actions seo-hero-actions"><a class="btn btn-whatsapp" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/whatsapp.svg" width="18"/>Ürün Bilgisi Al</a><a class="btn btn-outline" href="tel:${phoneTel}">${phoneDisplay}</a></div></div></section>
<section class="section section-soft"><div class="container"><div class="section-heading"><div><h2>${escapeHtml(category.h1)} ürünleri</h2><p>${selectedProducts.length} ürün ve model seçeneğini inceleyin; kesin fiyat ve stok bilgisini mağazadan doğrulayın.</p></div><a class="text-link" href="/urunler.html">Tüm ürünler →</a></div><div class="catalog-grid seo-static-grid">${selectedProducts.map(product => staticProductCard(product, route)).join('')}</div></div></section>
<section class="section"><div class="container seo-content-grid"><article class="seo-copy-card"><span class="eyebrow">Ürün Seçim Rehberi</span><h2>${escapeHtml(category.selectionTitle)}</h2><p>${escapeHtml(category.detail)}</p><ul class="seo-check-list">${category.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article><aside class="seo-local-card"><img alt="${escapeHtml(category.h1)}" decoding="async" height="800" loading="lazy" src="${escapeHtml(category.image)}" width="1000"/><div><h2>Darende’den Türkiye geneline ürün desteği</h2><p>Darende, Malatya, Gürün ve Elbistan çevresi için ürün bilgisi; uygun ürünlerde Türkiye geneli kargo seçenekleri sunulur.</p><a class="btn btn-primary" href="/iletisim/">İletişim Bilgileri</a></div></aside></div></section>
<section class="section section-soft"><div class="container"><div class="section-heading"><div><h2>Sık sorulan sorular</h2><p>${escapeHtml(category.h1)} hakkında temel satın alma bilgileri.</p></div></div>${faqMarkup(category.h1)}</div></section>
<section class="section"><div class="container"><div class="section-heading"><div><h2>Diğer ürün grupları</h2><p>Darende Tarım ürün kategorileri arasında geçiş yapın.</p></div></div><div class="seo-link-grid">${relatedCategories.map(item => `<a href="/${item.slug}/"><strong>${escapeHtml(item.h1)}</strong><span>Ürünleri incele →</span></a>`).join('')}</div></div></section>
<section class="section"><div class="container cta"><div><h2>Aradığınız modeli birlikte belirleyelim</h2><p>Kullanım alanınızı ve aradığınız ürünü yazın; fiyat, stok ve model bilgisini doğrulayalım.</p></div><div class="cta-actions"><a class="btn btn-whatsapp" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/whatsapp.svg" width="18"/>WhatsApp’tan Yazın</a><a class="btn btn-outline" href="tel:${phoneTel}">${phoneDisplay}</a></div></div></section>`;
  return pageShell({ title: category.title, description: category.description, canonicalRoute: route, image: category.image, schema, body });
}

function productPage(product) {
  const route = productRoute(product);
  const category = categoryForProduct(product);
  const categoryRoute = `/${category.slug}/`;
  const description = `${product.name} için güncel fiyat, stok ve doğrulanmış ürün bilgisi Darende Tarım’da. Darende, Malatya ve Türkiye geneli gönderim seçeneklerini sorun.`;
  const schemaProduct = {
    '@type': 'Product', '@id': `${absolute(route)}#product`, url: absolute(route), name: product.name,
    image: [absolute(rootAsset(product.image))], description: product.shortDescription,
    category: product.category
  };
  if (product.brand && product.brand !== 'Genel') schemaProduct.brand = { '@type': 'Brand', name: product.brand };
  if (product.model) schemaProduct.model = product.model;
  const schema = [
    schemaProduct,
    { '@type': 'WebPage', '@id': `${absolute(route)}#webpage`, url: absolute(route), name: product.name, isPartOf: { '@id': `${domain}/#website` }, about: { '@id': `${absolute(route)}#product` }, inLanguage: 'tr-TR' },
    breadcrumbSchema([{ name: 'Ana Sayfa', route: '/' }, { name: category.h1, route: categoryRoute }, { name: product.name, route }])
  ];
  const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 4);
  const body = `
<section class="page-hero seo-page-hero"><div class="container">${breadcrumbMarkup([{ name: 'Ana Sayfa', route: '/' }, { name: category.h1, route: categoryRoute }, { name: product.name, route }])}<span class="eyebrow">${escapeHtml(product.brand && product.brand !== 'Genel' ? product.brand : 'Darende Tarım')} • ${escapeHtml(product.category)}</span><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(product.shortDescription)}</p></div></section>
<section class="section"><div class="container product-detail-grid"><div class="product-detail-media"><img alt="${escapeHtml(product.alt || product.name)}" decoding="async" fetchpriority="high" height="1000" src="${escapeHtml(rootAsset(product.image))}" width="1000"/></div><article class="product-detail-copy"><span class="eyebrow">Ürün Bilgisi</span><h2>${escapeHtml(product.name)} hakkında bilgi alın</h2><dl class="product-facts"><div><dt>Kategori</dt><dd><a href="${categoryRoute}">${escapeHtml(product.category)}</a></dd></div>${product.brand && product.brand !== 'Genel' ? `<div><dt>Marka</dt><dd>${escapeHtml(product.brand)}</dd></div>` : ''}${product.model ? `<div><dt>Model</dt><dd>${escapeHtml(product.model)}</dd></div>` : ''}<div><dt>Fiyat ve stok</dt><dd>WhatsApp üzerinden doğrulanır</dd></div></dl><p>Teknik özellik, garanti kapsamı, mevcut varyant ve teslimat içeriği sipariş öncesinde ürün etiketi veya üretici belgesi üzerinden teyit edilir.</p><div class="actions"><a class="btn btn-whatsapp" href="${escapeHtml(whatsappUrl(product, route))}" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/whatsapp.svg" width="18"/>Fiyat ve Stok Sor</a><a class="btn btn-outline" href="tel:${phoneTel}">Hemen Ara</a></div></article></div></section>
<section class="section section-soft"><div class="container seo-content-grid"><article class="seo-copy-card"><span class="eyebrow">Satın Alma Kontrolü</span><h2>${escapeHtml(product.name)} için sipariş öncesi kontrol</h2><p>${escapeHtml(category.detail)}</p><ul class="seo-check-list">${category.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article><aside class="seo-local-card seo-local-card--text"><div><h2>Darende Tarım ürün desteği</h2><p>Darende ve Malatya başta olmak üzere Gürün ve Elbistan çevresine ürün bilgisi verilir. Uygun ürünlerde Türkiye geneli kargo koşulları sipariş sırasında paylaşılır.</p><p>Doğru model için ürün adını, kullanım alanını ve varsa mevcut makinenizin model bilgisini iletmeniz yeterlidir.</p><a class="btn btn-primary" href="/iletisim/">Mağaza ve İletişim</a></div></aside></div></section>
${related.length ? `<section class="section"><div class="container"><div class="section-heading"><div><h2>Benzer ürünler</h2><p>${escapeHtml(product.category)} kategorisindeki diğer seçenekler.</p></div><a class="text-link" href="${categoryRoute}">Tüm kategoriyi gör →</a></div><div class="catalog-grid seo-static-grid">${related.map(item => staticProductCard(item, categoryRoute)).join('')}</div></div></section>` : ''}
<section class="section section-soft"><div class="container"><div class="section-heading"><div><h2>Sık sorulan sorular</h2><p>${escapeHtml(product.name)} hakkında fiyat, teslimat ve teknik bilgi.</p></div></div>${faqMarkup(product.name)}</div></section>`;
  return pageShell({ title: `${product.name} | Darende Tarım`, description, canonicalRoute: route, image: rootAsset(product.image), schema, body });
}

function aboutPage() {
  const route = '/hakkimizda/';
  const description = 'Darende Tarım; Darende ve Malatya’da tarım aletleri, çapa makineleri, jeneratör, kaynak makinesi, bahçe ve teknik ekipman satışı yapar.';
  const body = `<section class="page-hero seo-page-hero"><div class="container">${breadcrumbMarkup([{ name: 'Ana Sayfa', route: '/' }, { name: 'Hakkımızda', route }])}<span class="eyebrow">Darende Tarım</span><h1>Darende Tarım Hakkında</h1><p>Darende’de tarım aletleri ve teknik ekipman arayan müşterilere ürün bilgisi, model karşılaştırması ve hızlı iletişim desteği sunuyoruz.</p></div></section><section class="section"><div class="container seo-content-grid"><article class="seo-copy-card"><span class="eyebrow">İşletmemiz</span><h2>Tarım aletleri ve teknik ekipman mağazası</h2><p>Darende Tarım; çapa makineleri, Karadeniz kapalı çapa modelleri, jeneratörler, kaynak makineleri, hava kompresörleri, motorlu testereler, bahçe ekipmanları, zirai ürünler ve yedek parça gruplarını bir arada sunar.</p><p>Amacımız, müşterinin kullanım ihtiyacını anlayarak uygun ürün grubuna yönlendirmek ve kesin teknik bilgileri ürün etiketi veya üretici belgesi üzerinden doğrulamaktır.</p><ul class="seo-check-list"><li>Darende ve Malatya’da yerel mağaza erişimi</li><li>Gürün ve Elbistan çevresine ürün desteği</li><li>Uygun ürünlerde Türkiye geneli kargo</li><li>Telefon ve WhatsApp üzerinden hızlı bilgi</li></ul></article><aside class="seo-local-card"><img alt="Darende Tarım mağazası" decoding="async" height="1100" loading="lazy" src="/assets/images/placeholders/about-store.webp" width="1200"/><div><h2>Darende’de mağaza ve ürün desteği</h2><p>${escapeHtml(address)}</p><a class="btn btn-primary" href="/iletisim/">İletişim ve Yol Tarifi</a></div></aside></div></section><section class="section section-soft"><div class="container"><div class="section-heading"><div><h2>Başlıca ürün grupları</h2><p>İhtiyacınıza uygun kategoriyi doğrudan inceleyin.</p></div></div><div class="seo-link-grid">${categories.filter(item => item.slug !== 'karadeniz-kapali-capa').map(item => `<a href="/${item.slug}/"><strong>${escapeHtml(item.h1)}</strong><span>Ürünleri incele →</span></a>`).join('')}</div></div></section><section class="section"><div class="container cta"><div><h2>Ürün ve model bilgisi alın</h2><p>Aradığınız ürün adını veya kullanım amacınızı yazın.</p></div><div class="cta-actions"><a class="btn btn-whatsapp" href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank"><img alt="" height="18" src="/assets/icons/whatsapp.svg" width="18"/>WhatsApp’tan Yazın</a><a class="btn btn-outline" href="tel:${phoneTel}">${phoneDisplay}</a></div></div></section>`;
  return pageShell({ title: 'Darende Tarım Hakkında | Tarım Aletleri Mağazası', description, canonicalRoute: route, schema: [{ '@type': 'AboutPage', '@id': `${absolute(route)}#webpage`, url: absolute(route), name: 'Darende Tarım Hakkında', about: { '@id': `${domain}/#business` }, inLanguage: 'tr-TR' }, storeSchema(), breadcrumbSchema([{ name: 'Ana Sayfa', route: '/' }, { name: 'Hakkımızda', route }])], body });
}

function contactPage() {
  const route = '/iletisim/';
  const description = `Darende Tarım iletişim: ${phoneDisplay}. ${address}. WhatsApp, telefon ve Google Maps yol tarifi bilgileri.`;
  const body = `<section class="page-hero seo-page-hero"><div class="container">${breadcrumbMarkup([{ name: 'Ana Sayfa', route: '/' }, { name: 'İletişim', route }])}<span class="eyebrow">Telefon • WhatsApp • Yol Tarifi</span><h1>Darende Tarım İletişim</h1><p>Ürün, fiyat, stok ve model bilgisi için Darende Tarım’a telefon veya WhatsApp üzerinden ulaşabilirsiniz.</p></div></section><section class="section"><div class="container contact-grid seo-contact-grid"><div class="map-card"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=38.5532460,37.4935680&amp;z=15&amp;output=embed" title="Darende Tarım Google Maps konumu"></iframe><div class="map-caption"><div><strong>Darende Tarım Mağazası</strong><span>${escapeHtml(address)}</span></div><a class="text-link" href="${escapeHtml(mapsUrl)}" rel="noopener noreferrer" target="_blank">Google Maps / Yol Tarifi →</a></div></div><div class="contact-panel"><span class="eyebrow">İletişim Bilgileri</span><h2>Darende, Malatya ve çevresi için hızlı ulaşım</h2><div class="contact-list"><article><img alt="" src="/assets/icons/map-pin.svg"/><div><strong>Adres</strong><span>${escapeHtml(address)}</span><a href="${escapeHtml(mapsUrl)}" rel="noopener noreferrer" target="_blank">Konumu Aç</a></div></article><article><img alt="" src="/assets/icons/phone.svg"/><div><strong>${phoneDisplay}</strong><span>Telefon ile ürün bilgisi</span><a href="tel:${phoneTel}">Ara</a></div></article><article><img alt="" src="/assets/icons/whatsapp.svg"/><div><strong>WhatsApp İletişim</strong><span>Ürün adıyla fiyat ve stok sorun</span><a href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank">WhatsApp’tan Yaz</a></div></article></div><div class="service-tags"><span>Darende</span><span>Malatya</span><span>Gürün</span><span>Elbistan</span><span>Türkiye geneli kargo</span></div></div></div></section><section class="section section-soft"><div class="container seo-content-grid"><article class="seo-copy-card"><h2>İletişime geçerken hangi bilgileri gönderin?</h2><ul class="seo-check-list"><li>Aradığınız ürün veya kategori adı</li><li>Varsa marka ve tam model bilgisi</li><li>Kullanım alanı ve temel ihtiyacınız</li><li>Teslimat yapılacak il veya ilçe</li></ul></article><aside class="seo-local-card seo-local-card--text"><div><h2>Hizmet bölgeleri</h2><p>Darende ve Malatya’da yerel ürün desteği; Gürün ve Elbistan çevresine iletişim desteği sağlanır. Uygun ürünlerde Türkiye geneli kargo koşulları sipariş öncesinde paylaşılır.</p><a class="btn btn-primary" href="/urunler.html">Ürünleri İncele</a></div></aside></div></section>`;
  return pageShell({ title: 'Darende Tarım İletişim | Telefon, Adres ve Yol Tarifi', description, canonicalRoute: route, schema: [{ '@type': 'ContactPage', '@id': `${absolute(route)}#webpage`, url: absolute(route), name: 'Darende Tarım İletişim', about: { '@id': `${domain}/#business` }, inLanguage: 'tr-TR' }, storeSchema(), breadcrumbSchema([{ name: 'Ana Sayfa', route: '/' }, { name: 'İletişim', route }])], body });
}

function writeRoute(route, html) {
  const targetDir = path.join(rootDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

for (const category of categories) {
  writeRoute(category.slug, categoryPage(category, products.filter(category.filter)));
}
for (const product of products.filter(product => detailIds.has(product.id))) {
  writeRoute(path.join('urun', product.id), productPage(product));
}
writeRoute('hakkimizda', aboutPage());
writeRoute('iletisim', contactPage());

const sitemapRoutes = [
  '/', '/urunler.html', '/hakkimizda/', '/iletisim/',
  ...categories.map(category => `/${category.slug}/`),
  ...products.filter(product => detailIds.has(product.id)).map(product => productRoute(product))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map(route => `  <url>\n    <loc>${absolute(route)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${categories.length} category pages, ${detailIds.size} product pages, 2 corporate pages and sitemap.xml.`);
