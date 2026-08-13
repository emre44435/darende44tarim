# Darende Tarım

2 sayfalı statik ürün kataloğu ve WhatsApp iletişim sitesi.

## Dosyalar

- `index.html` — Ana sayfa
- `urunler.html` — Ürün kataloğu
- `assets/css/style.css` — Tüm responsive tasarım
- `assets/js/config.js` — Telefon, WhatsApp, adres ve Maps bilgileri
- `assets/js/products.js` — Ürün verileri
- `assets/js/main.js` — Arama, filtreleme, mobil menü, marka paneli ve WhatsApp davranışları

## Görsel ölçüleri ve değiştirme yolları

Aşağıdaki placeholder dosyaları aynı isimlerle yeni WebP görsellerle değiştirin. HTML/CSS değiştirmeye gerek yoktur.

### Hero
- Dosya: `assets/images/placeholders/hero-banner.webp`
- Önerilen: **1600 × 960 px** (5:3)
- Format: WebP
- Hedef boyut: 180–350 KB, mümkünse 500 KB altında
- Ürünler görselin orta-sağ alanında kalırsa mobil kırpma daha güvenli olur.

### Kategori kartları
- `category-capa.webp`
- `category-jenerator.webp`
- `category-kaynak.webp`
- `category-kompresor.webp`
- `category-testere.webp`
- `category-bahce.webp`
- Önerilen: **800 × 800 px**, 1:1 kare
- Hedef: 60–140 KB WebP

### Öne çıkan / ürün kartları
- `product-01.webp` ... `product-08.webp`
- Önerilen: **1000 × 1000 px**, 1:1 kare
- Hedef: 80–180 KB WebP, üst sınır 500 KB
- Ürün adları ve dosya yolları `assets/js/products.js` içinden değiştirilebilir.

### Dikdörtgen ürün grubu blokları
- `feature-capa.webp`
- `feature-kaynak.webp`
- Önerilen: **1200 × 800 px** (3:2)
- Hedef: 120–220 KB WebP

### Hakkımızda / mağaza görseli
- `about-store.webp`
- Önerilen: **1200 × 900 px** (4:3)
- Hedef: 120–250 KB WebP

### Marka ürün örnekleri
- Şu an `brand-product-01.webp` ... `brand-product-04.webp` örnek slotlar olarak kullanılıyor.
- Önerilen gerçek marka ürün görselleri: **800 × 800 px** kare.
- Marka kartına tıklanınca 4 örnek slot açılır. Daha sonra gerçek ürün datasına bağlanabilir.

### Logo
- Kullanılan logo: `assets/images/ui/darende-tarim-logo.webp`
- Header ve footer aynı dosyayı kullanır.

## Ürün ekleme

`assets/js/products.js` içindeki diziye yeni obje ekleyin:

```js
{
  id: 'benzersiz-urun-slug',
  name: 'Ürün Adı',
  category: 'Çapa Makineleri',
  brand: 'Bosch',
  model: '',
  image: 'assets/images/products/urun.webp',
  alt: 'Açıklayıcı görsel alt metni',
  shortDescription: 'Kısa ürün açıklaması',
  price: null,
  featured: true,
  keywords: ['darende tarım aletleri']
}
```

Fiyat yoksa `price: null` bırakılır ve kartta “Fiyat için WhatsApp” görünür.

## İletişim bilgilerini değiştirme

`assets/js/config.js` dosyasını düzenleyin.

## Arama

Header arama kutusu ana sayfadan `urunler.html?q=...` adresine yönlenir. Ürünler sayfasında arama; ürün adı, marka, model, kategori ve `keywords` alanlarında çalışır.

## Deployment

Klasörün içeriğini domain kök dizinine yükleyin. `index.html`, `urunler.html`, `robots.txt` ve `sitemap.xml` kök dizinde kalmalıdır.
