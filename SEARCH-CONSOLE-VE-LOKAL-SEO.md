# Darende Tarım — Search Console ve Lokal SEO İşlemleri

Bu sürümde ana sayfa hedeflemesi yenilendi; 10 kategori, 23 model bazlı ürün, Hakkımızda ve İletişim sayfaları oluşturuldu. `sitemap.xml` toplam 37 kalıcı URL içerir.

## 1. Yayından hemen sonra

1. ZIP içindeki **bütün dosya ve klasörleri** GitHub deposunun köküne yükleyin.
2. GitHub Pages işleminin tamamlanmasını bekleyin.
3. Gizli sekmede aşağıdaki adreslerin açıldığını doğrulayın:
   - `https://darendetarim.com/`
   - `https://darendetarim.com/capa-makineleri/`
   - `https://darendetarim.com/jeneratorler/`
   - `https://darendetarim.com/hakkimizda/`
   - `https://darendetarim.com/iletisim/`
   - `https://darendetarim.com/sitemap.xml`
4. Eski tasarım görünürse tarayıcı önbelleğini temizleyin veya `Ctrl + F5` yapın.

## 2. Google Search Console

### Sitemap gönderimi

1. Search Console’da `darendetarim.com` mülkünü açın.
2. Sol menüden **Site Haritaları** bölümüne girin.
3. Kutucuğa `sitemap.xml` yazın ve **Gönder** düğmesine basın.
4. Durumun **Başarılı** olmasını ve keşfedilen URL sayısının yaklaşık **37** görünmesini bekleyin.

### İlk indeksleme istekleri

URL Denetleme alanında önce aşağıdaki sayfaları kontrol edin:

1. `https://darendetarim.com/`
2. `https://darendetarim.com/capa-makineleri/`
3. `https://darendetarim.com/jeneratorler/`
4. `https://darendetarim.com/karadeniz-kapali-capa/`
5. `https://darendetarim.com/motorlu-testereler/`
6. `https://darendetarim.com/iletisim/`

Her sayfada **Canlı URL’yi test et** ve ardından **Dizine eklenmesini iste** işlemini bir kez yapın. Bütün ürün sayfalarını aynı gün tek tek göndermeyin; Google sitemap ve iç bağlantılardan keşfedecektir.

### Takip edilecek raporlar

- **Dizin oluşturma → Sayfalar:** “Tarandı, şu anda dizine eklenmedi” ve “Keşfedildi, şu anda dizine eklenmedi” durumlarını kontrol edin.
- **Performans → Arama sonuçları:** `darende tarım`, `darende tarım aletleri`, `darende çapa makinesi`, `darende jeneratör` sorgularını takip edin.
- **Deneyim → Core Web Vitals:** Mobil ve masaüstü alan verisi oluştuğunda sorunları kontrol edin.
- **Güvenlik ve Manuel İşlemler:** Her iki raporda da sorun bulunmamalıdır.

Search Console’a sitemap göndermek veya indeksleme istemek tek başına sıralamayı yükseltmez; Google’ın sayfaları daha hızlı keşfetmesine ve sorunların görülmesine yardımcı olur.

## 3. Google İşletme Profili — yüksek öncelik

Google İşletme Profilindeki bilgiler siteyle birebir aynı olmalıdır:

- İşletme adı: **Darende Tarım**
- Telefon: **0505 515 85 44**
- Adres: **Sungur Mahallesi, Somuncu Baba Bulvarı No:14, Darende / Malatya**
- Web sitesi: `https://darendetarim.com/`
- İşletme açıklaması ve ürün grupları
- Gerçek çalışma saatleri

İşletme adına arama kelimesi eklemek için yapay değişiklik yapmayın. Birincil kategori olarak Google’ın sunduğu seçenekler arasından gerçek faaliyeti en doğru anlatan satış kategorisini seçin. Profilde mağaza dış görünümü, iç mekân, ürün grupları ve gerçek işletme fotoğrafları yayınlayın.

Gerçek müşterilerden düzenli yorum isteyin ve bütün yorumlara doğal biçimde cevap verin. Yorum satın almayın ve sahte hesap kullanmayın.

## 4. Yüksek öncelik: sosyal profillerde işletme kimliği

Mevcut ekran görüntülerinde Facebook ve Instagram profillerinde **“Gücük Taksi”**, web sitesinden farklı telefon numarası ve kişisel içerikler bulunuyor. Bu hesaplar şu anda Darende Tarım’ın doğrulanmış resmî işletme profilleri gibi görünmüyor.

Kullanıcının talebi doğrultusunda görünür Facebook ve Instagram ikonları istenen profillere bağlanmıştır. Ancak aşağıdaki bilgiler web sitesiyle eşitlenmeden `Organization` veya `Store` schema içindeki `sameAs` alanına eklenmemelidir:

- İşletme adı ve kullanıcı adı
- Telefon numarası
- Fiziksel adres
- Web sitesi: `https://darendetarim.com/`
- İşletme açıklaması, kategori ve hizmetler
- Logo, kapak görseli ve içeriklerin işletmeyle ilişkisi

### Manuel işlem sırası

1. Hesapların gerçekten Darende Tarım’a ait olduğunu işletme sahibiyle doğrulayın.
2. Başka bir işletmeye veya kişisel kullanıma aitse Darende Tarım için ayrı işletme hesapları oluşturun.
3. Mevcut hesaplar kullanılacaksa ad, telefon, adres, web sitesi, açıklama ve görselleri eşitleyin.
4. Profillerde `https://darendetarim.com/` bağlantısını yayınlayın.
5. Bilgileri oturum kapalıyken kontrol edin.
6. Tam eşleşme ve sahiplik doğrulamasından sonra schema `sameAs` alanını güncelleyin.

`sameAs` bu pakette bilerek eklenmemiştir.

## 5. Dış güven ve bilinirlik çalışmaları

Site yayına girdikten sonra işletme adı, telefon ve adresi aynı biçimde kullanan gerçek kayıtlar oluşturun:

- Satılan markaların resmî bayi sayfaları — yalnızca gerçekten yetkili bayilik varsa
- Yerel esnaf/oda ve güvenilir firma kayıtları
- Google İşletme Profili
- İşletmeyle eşitlenmiş Facebook ve Instagram hesapları
- Gerçek yerel haber, etkinlik veya iş ortaklığı sayfaları

Toplu, ücretli ve alakasız backlink paketleri satın almayın.

## 6. Beklenti

Site yeni olduğu için tarama, indeksleme ve sıralama değişiklikleri zaman alabilir. “Darende Tarım” araması devlet kurumları ve diğer tarım kuruluşlarıyla karıştığı için ilk sıra garanti edilemez. Düzenli Search Console takibi, gerçek yorumlar, tutarlı işletme bilgileri ve güvenilir dış bağlantılar en yüksek öncelikli manuel çalışmalardır.
