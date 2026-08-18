# Darende Tarım — SEO V2

Statik GitHub Pages altyapısı için hazırlanmış, mobil uyumlu ürün kataloğu ve yerel işletme sitesidir.

## Bu sürümde bulunan yapı

- SEO hedeflemesi güncellenmiş ana sayfa
- JavaScript ürün filtresini koruyan ürün kataloğu
- 10 bağımsız kategori sayfası
- 23 model bazlı, indekslenebilir ürün sayfası
- Ayrı Hakkımızda ve İletişim sayfaları
- Breadcrumb, CollectionPage, Product, Store ve ContactPage schema yapıları
- 37 URL içeren güncel `sitemap.xml`
- Masaüstü ve mobil sosyal medya bağlantıları
- Ürün bazlı WhatsApp mesaj ve paylaşım bağlantıları

## Önemli dosyalar

- `index.html` — Ana sayfa
- `urunler.html` — Filtrelenebilir ürün kataloğu
- `capa-makineleri/`, `jeneratorler/` vb. — Kategori sayfaları
- `urun/` — Model bazlı ürün sayfaları
- `hakkimizda/` — Kurumsal tanıtım
- `iletisim/` — Telefon, adres, harita ve hizmet bölgeleri
- `assets/js/config.js` — Telefon, WhatsApp, adres, Maps ve sosyal medya
- `assets/js/products.js` — Ürün verileri
- `assets/js/main.js` — Menü, arama, filtreleme ve WhatsApp davranışları
- `scripts/generate-seo-pages.mjs` — Kategori/ürün sayfaları ve sitemap üreticisi
- `SEARCH-CONSOLE-VE-LOKAL-SEO.md` — Yayın sonrası manuel işlem listesi

## Yayınlama

ZIP içindeki bütün dosya ve klasörleri GitHub deposunun köküne yükleyin. Aşağıdakiler kök dizinde kalmalıdır:

- `index.html`
- `urunler.html`
- `robots.txt`
- `sitemap.xml`
- `CNAME`
- `assets/`
- kategori ve ürün klasörleri

GitHub Pages işlemi tamamlandıktan sonra gizli sekmede siteyi ve `https://darendetarim.com/sitemap.xml` adresini kontrol edin.

## Ürün verisi güncelleme

Yeni ürünler `assets/js/products.js` dosyasına eklenir. Ürün veya kategori verisi değiştirildikten sonra Node.js kurulu bir bilgisayarda proje kökünden şu komut çalıştırılabilir:

```bash
node scripts/generate-seo-pages.mjs
```

Komut kategori ve ürün sayfalarını yeniden üretir ve `sitemap.xml` dosyasını günceller.

Modeli ve doğrulanmış teknik bilgisi olmayan ürünler için gerçeğe dayanmayan fiyat, özellik, stok veya yorum eklemeyin.

## İletişim bilgileri

Telefon, WhatsApp, adres, harita ve sosyal medya adresleri `assets/js/config.js` içinden yönetilir. Statik SEO sayfalarında görünen işletme bilgilerinin de aynı kalması gerekir.

## Sosyal medya ve schema

Facebook ve Instagram bağlantıları görünür ikonlarda çalışır. İşletme sahibinin hesap sahipliği onayıyla iki profil de `Store` ve `Organization` schema `sameAs` alanlarına eklenmiştir. Profil adı, telefon, adres, web sitesi ve açıklama bilgilerinin Darende Tarım ile uyumu korunmalıdır.
