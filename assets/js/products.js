'use strict';
window.DARENDE_BRANDS = Object.freeze([
  'Bosch','Husqvarna','Qvarna','Moil','Solakoğlu','Kawashima','Rapco','CAT Power Tools','RTRMAX','Kama','Factor'
]);

/*
  Ürün görsellerini değiştirmek için yalnızca image alanındaki dosyayı değiştirin.
  Önerilen ürün görseli: 1000x1000 px WebP, tercihen 80-180 KB, en fazla 500 KB.
*/
window.DARENDE_PRODUCTS = Object.freeze([
  {
    id:'benzinli-capa-makinesi', name:'Benzinli Çapa Makinesi', category:'Çapa Makineleri', brand:'Genel', model:'',
    image:'assets/images/products/benzinli-capa-makinesi.webp', alt:'Benzinli çapa makinesi ürün görseli',
    shortDescription:'Bahçe ve tarla tipi toprak işleme için çapa makinesi ürün alanı.', price:null, featured:false,
    keywords:['darende çapa makinesi','malatya tarım aletleri','toprak işleme']
  },
  {
    id:'romorklu-capa-makinesi', name:'Römorklu Çapa Makinesi', category:'Çapa Makineleri', brand:'Genel', model:'',
    image:'assets/images/products/romorklu-capa-makinesi.webp', alt:'Römorklu çapa makinesi ürün görseli',
    shortDescription:'Römorklu kullanım için ayrılmış ürün alanı. Görsel ve model bilgisi sonradan güncellenebilir.', price:null, featured:true,
    keywords:['römorklu çapa makinesi','darende tarım aletleri']
  },
  {
    id:'inverter-kaynak-makinesi', name:'İnverter Kaynak Makinesi', category:'Kaynak Makineleri', brand:'Genel', model:'',
    image:'assets/images/products/inverter-kaynak-makinesi.webp', alt:'İnverter kaynak makinesi ürün görseli',
    shortDescription:'Atölye ve saha kullanımı için kaynak makinesi ürün alanı.', price:null, featured:true,
    keywords:['darende kaynak makinesi','inverter kaynak']
  },
  {
    id:'kawashima-mini-motorlu-testere', name:'Kawashima Mini Motorlu Testere', category:'Motorlu Testereler', brand:'Kawashima', model:'',
    image:'assets/images/products/kawashima-mini-motorlu-testere.webp', alt:'Kawashima mini motorlu testere ürün görseli',
    shortDescription:'Kawashima motorlu testere ürünleri için ayrılmış katalog alanı.', price:null, featured:true,
    keywords:['kawashima motorlu testere','darende motorlu testere']
  },
  {
    id:'tasinabilir-jenerator', name:'Taşınabilir Jeneratör', category:'Jeneratörler', brand:'Genel', model:'',
    image:'assets/images/products/tasinabilir-jenerator.webp', alt:'Taşınabilir jeneratör ürün görseli',
    shortDescription:'Portatif güç ihtiyacı için jeneratör ürün alanı.', price:null, featured:true,
    keywords:['darende jeneratör','malatya jeneratör','kama jeneratör']
  },
  {
    id:'kawashima-jenerator-ka10000cle3', name:'Kawashima Jeneratör KA10000CLE3', category:'Jeneratörler', brand:'Kawashima', model:'KA10000CLE3',
    image:'assets/images/brands/kawashima/kawashima-jenerator-ka10000cle3.webp', alt:'Kawashima KA10000CLE3 jeneratör ürün görseli',
    shortDescription:'Kawashima KA10000CLE3 jeneratör için fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['kawashima jeneratör','ka10000cle3','darende jeneratör']
  },
  {
    id:'kawashima-tirpan-ka-t520', name:'Kawashima Tırpan KA-T520', category:'Bahçe Ekipmanları', brand:'Kawashima', model:'KA-T520',
    image:'assets/images/brands/kawashima/kawashima-tirpan-ka-t520.webp', alt:'Kawashima KA-T520 tırpan ürün görseli',
    shortDescription:'Kawashima KA-T520 tırpan için fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['kawashima tırpan','ka-t520','bahçe ekipmanları']
  },
  {
    id:'kawashima-dal-budama-testere-ka-cs260', name:'Kawashima Dal Budama Testeresi KA-CS260', category:'Motorlu Testereler', brand:'Kawashima', model:'KA-CS260',
    image:'assets/images/brands/kawashima/kawashima-dal-budama-testere-ka-cs260.webp', alt:'Kawashima KA-CS260 dal budama testeresi ürün görseli',
    shortDescription:'Kawashima KA-CS260 dal budama testeresi için fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['kawashima budama testeresi','ka-cs260','motorlu testere']
  },
  {
    id:'rapco-od-16a-1-ilaclama-makinasi', name:'Rapco OD-16A-1 İlaçlama Makinası', category:'Zirai Ekipmanlar', brand:'Rapco', model:'OD-16A-1',
    image:'assets/images/brands/rapco/rapco-od-16a-1-ilaclama-makinasi-800x800.webp', alt:'Rapco OD-16A-1 ilaçlama makinası ürün görseli',
    shortDescription:'Rapco OD-16A-1 ilaçlama makinası için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rapco ilaçlama makinası','od-16a-1','zirai ekipman','darende tarım']
  },
  {
    id:'rapco-rp-5410-sirt-tirpan', name:'Rapco RP-5410 Sırt Tırpanı', category:'Bahçe Ekipmanları', brand:'Rapco', model:'RP-5410',
    image:'assets/images/brands/rapco/rapco-rp-5410-sirt-tirpan-800x800.webp', alt:'Rapco RP-5410 sırt tırpanı ürün görseli',
    shortDescription:'Rapco RP-5410 sırt tırpanı için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rapco sırt tırpanı','rp-5410','tırpan','darende bahçe ekipmanları']
  },
  {
    id:'rapco-rp-5800-zincirli-testere', name:'Rapco RP-5800 Zincirli Testere', category:'Motorlu Testereler', brand:'Rapco', model:'RP-5800',
    image:'assets/images/brands/rapco/rapco-rp-5800-zincirli-testere-800x800.webp', alt:'Rapco RP-5800 zincirli testere ürün görseli',
    shortDescription:'Rapco RP-5800 zincirli testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rapco zincirli testere','rp-5800','motorlu testere','darende testere']
  },
  {
    id:'husqvarna-445-x-torq-testere', name:'Husqvarna 445 X-Torq Motorlu Testere', category:'Motorlu Testereler', brand:'Husqvarna', model:'445 X-Torq',
    image:'assets/images/brands/husqvarna/husqvarna-445-x-torq-testere-800x800.webp', alt:'Husqvarna 445 X-Torq motorlu testere ürün görseli',
    shortDescription:'Husqvarna 445 X-Torq motorlu testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['husqvarna 445','x-torq','husqvarna motorlu testere','darende testere']
  },
  {
    id:'husqvarna-sirt-motoru-tirpan', name:'Husqvarna Sırt Motorlu Tırpan', category:'Bahçe Ekipmanları', brand:'Husqvarna', model:'',
    image:'assets/images/brands/husqvarna/husqvarna-sirt-motoru-tirpan-800x800.webp', alt:'Husqvarna sırt motorlu tırpan ürün görseli',
    shortDescription:'Husqvarna sırt motorlu tırpan için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['husqvarna sırt motoru','husqvarna tırpan','bahçe ekipmanları','darende tırpan']
  },
  {
    id:'moil-motor-yaglari-urun-grubu', name:'Moil Motor Yağları Ürün Grubu', category:'Yedek Parçalar', brand:'Moil', model:'',
    image:'assets/images/brands/moil/moil-motor-yaglari-toplu.webp', alt:'Moil 5W-30 5W-40 ve 10W-40 motor yağları ürün grubu',
    shortDescription:'Moil motor yağları ürün grubu için güncel fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['moil motor yağı','moil yağ','motor yağı darende','5w-30','5w-40','10w-40']
  },
  {
    id:'moil-5w-30-motor-yagi-4l', name:'Moil 5W-30 Motor Yağı 4L', category:'Yedek Parçalar', brand:'Moil', model:'5W-30',
    image:'assets/images/brands/moil/moil-5w-30.webp', alt:'Moil 5W-30 4 litre motor yağı ürün görseli',
    shortDescription:'Moil 5W-30 4 litre motor yağı için güncel fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['moil 5w-30','5w30 motor yağı','moil motor yağı','4 litre motor yağı']
  },
  {
    id:'moil-5w-40-dx2-motor-yagi-4l', name:'Moil 5W-40 DX2 Motor Yağı 4L', category:'Yedek Parçalar', brand:'Moil', model:'5W-40 DX2',
    image:'assets/images/brands/moil/moil-5w-40.webp', alt:'Moil 5W-40 DX2 4 litre motor yağı ürün görseli',
    shortDescription:'Moil 5W-40 DX2 4 litre motor yağı için güncel fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['moil 5w-40','5w40 motor yağı','moil dx2','4 litre motor yağı']
  },
  {
    id:'moil-10w-40-diesel-dx3-motor-yagi-4l', name:'Moil 10W-40 Diesel DX3 Motor Yağı 4L', category:'Yedek Parçalar', brand:'Moil', model:'10W-40 DX3',
    image:'assets/images/brands/moil/moil-10w-40.webp', alt:'Moil 10W-40 Diesel DX3 4 litre motor yağı ürün görseli',
    shortDescription:'Moil 10W-40 Diesel DX3 4 litre motor yağı için güncel fiyat ve detaylı bilgi WhatsApp üzerinden alınabilir.', price:null, featured:false,
    keywords:['moil 10w-40','10w40 diesel motor yağı','moil dx3','4 litre motor yağı']
  },
  {
    id:'factor-hava-kompresoru', name:'Factor Hava Kompresörü', category:'Kompresörler', brand:'Factor', model:'',
    image:'assets/images/products/factor-hava-kompresoru.webp', alt:'Factor hava kompresörü ürün görseli',
    shortDescription:'Factor hava kompresörü ürünleri için ayrılmış katalog alanı.', price:null, featured:true,
    keywords:['factor kompresör','darende hava kompresörü']
  },
  {
    id:'bahce-ekipmanlari', name:'Bahçe Ekipmanları', category:'Bahçe Ekipmanları', brand:'Genel', model:'',
    image:'assets/images/products/bahce-ekipmanlari.webp', alt:'Bahçe ekipmanları ürün görseli',
    shortDescription:'Bahçe bakım ve teknik ekipman ürünleri için ayrılmış alan.', price:null, featured:true,
    keywords:['bahçe ekipmanları','darende bahçe ekipmanları']
  },
  {
    id:'yedek-parca-aksesuar', name:'Yedek Parça ve Aksesuar', category:'Yedek Parçalar', brand:'Genel', model:'',
    image:'assets/images/products/yedek-parca-ve-aksesuar.webp', alt:'Tarım makineleri yedek parça ve aksesuar ürün görseli',
    shortDescription:'Makine, tarım ve bahçe ekipmanları için yedek parça ürün alanı.', price:null, featured:true,
    keywords:['yedek parça','tarım makinesi aksesuar']
  },
  {
    id:'zirai-ekipman', name:'Zirai Ekipman', category:'Zirai Ekipmanlar', brand:'Genel', model:'',
    image:'assets/images/products/benzinli-capa-makinesi.webp', alt:'Zirai ekipman ürün görseli',
    shortDescription:'Zirai ekipman ürünleri için ayrılmış katalog alanı.', price:null, featured:false,
    keywords:['zirai ekipman','solakoğlu']
  },
  {
    id:'cat-matkap-somun-sikma-seti', name:'CAT Matkap ve Somun Sıkma Seti', category:'El Aletleri', brand:'CAT Power Tools', model:'',
    image:'assets/images/brands/cat-power-tools/cat-matkap-somun-sikma-800x800.webp', alt:'CAT Power Tools matkap ve somun sıkma seti ürün görseli',
    shortDescription:'CAT Power Tools matkap ve somun sıkma ürün grubu. Güncel fiyat ve ürün bilgisi için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['cat power tools','cat matkap','somun sıkma','el aletleri']
  },
  {
    id:'cat-mini-testere-budama-makasi-seti', name:'CAT Mini Testere ve Budama Makası Seti', category:'Bahçe Ekipmanları', brand:'CAT Power Tools', model:'',
    image:'assets/images/brands/cat-power-tools/cat-mini-testere-budama-makasi-800x800.webp', alt:'CAT Power Tools mini testere ve budama makası seti ürün görseli',
    shortDescription:'CAT Power Tools mini testere ve budama makası ürün grubu. Güncel fiyat ve ürün bilgisi için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['cat power tools','mini testere','budama makası','bahçe ekipmanları']
  },
  {
    id:'cat-taslama-kirici-delici-seti', name:'CAT Taşlama ve Kırıcı Delici Seti', category:'El Aletleri', brand:'CAT Power Tools', model:'',
    image:'assets/images/brands/cat-power-tools/cat-taslama-kirici-delici-800x800.webp', alt:'CAT Power Tools taşlama ve kırıcı delici seti ürün görseli',
    shortDescription:'CAT Power Tools taşlama ve kırıcı delici ürün grubu. Güncel fiyat ve ürün bilgisi için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['cat power tools','taşlama','kırıcı delici','el aletleri']
  },
  {
    id:'romorklu-capa-makinasi-kabinli', name:'Kabinli Römorklu Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'',
    image:'assets/images/products/capa/01-romorklu-capa-makinasi-kabinli.webp', alt:'Darende Tarım kabinli römorklu çapa makinası',
    shortDescription:'Kabinli römorklu tarım aracı ürün görseli. Fiyat ve model detayı için WhatsApp üzerinden bilgi alabilirsiniz.', price:null, featured:true,
    keywords:['kabinli römorklu çapa makinası','darende çapa makinesi','römorklu tarım aracı']
  },
  {
    id:'romorklu-capa-makinasi-yeni', name:'Römorklu Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'',
    image:'assets/images/products/capa/02-romorklu-capa-makinasi.webp', alt:'Darende Tarım römorklu çapa makinası',
    shortDescription:'Römorklu çapa makinası ürün görseli. Fiyat, stok ve model detayı için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['römorklu çapa makinası','darende tarım aletleri','römorklu tarım aracı']
  },
  {
    id:'slk-210-atmaca', name:'SLK 210 Atmaca', category:'Çapa Makineleri', brand:'Solakoğlu', model:'SLK 210 Atmaca',
    image:'assets/images/products/capa/03-slk-210-atmaca.webp', alt:'Darende Tarım SLK 210 Atmaca çapa makinesi',
    shortDescription:'SLK 210 Atmaca çapa makinesi ürün görseli. Güncel fiyat ve ürün detayı için WhatsApp üzerinden bilgi alabilirsiniz.', price:null, featured:false,
    keywords:['slk 210 atmaca','darende çapa makinesi','çapa makinesi']
  },
  {
    id:'slk-12-korkut', name:'SLK 12 Korkut', category:'Çapa Makineleri', brand:'Solakoğlu', model:'SLK 12 Korkut',
    image:'assets/images/products/capa/04-slk-12-korkut.webp', alt:'Darende Tarım SLK 12 Korkut tarım aracı',
    shortDescription:'SLK 12 Korkut tarım aracı ürün görseli. Güncel fiyat ve model bilgisi için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['slk 12 korkut','darende tarım aracı','çapa makineleri']
  },
  {
    id:'slk-14-korkut', name:'SLK 14 Korkut', category:'Çapa Makineleri', brand:'Solakoğlu', model:'SLK 14 Korkut',
    image:'assets/images/products/capa/05-slk-14-korkut.webp', alt:'Darende Tarım SLK 14 Korkut tarım aracı',
    shortDescription:'SLK 14 Korkut tarım aracı ürün görseli. Güncel fiyat ve ürün bilgisi için WhatsApp üzerinden bilgi alabilirsiniz.', price:null, featured:false,
    keywords:['slk 14 korkut','darende tarım aracı','römorklu tarım aracı']
  },
  {
    id:'slk-17-cobra', name:'SLK 17 Cobra', category:'Çapa Makineleri', brand:'Solakoğlu', model:'SLK 17 Cobra',
    image:'assets/images/products/capa/06-slk-17-cobra.webp', alt:'Darende Tarım SLK 17 Cobra tarım aracı',
    shortDescription:'SLK 17 Cobra tarım aracı ürün görseli. Güncel fiyat ve model detayı için WhatsApp üzerinden iletişime geçebilirsiniz.', price:null, featured:false,
    keywords:['slk 17 cobra','darende tarım aracı','çapa makineleri']
  },
  {
    id:'slk-22-cobra', name:'SLK 22 Cobra', category:'Çapa Makineleri', brand:'Solakoğlu', model:'SLK 22 Cobra',
    image:'assets/images/products/capa/07-slk-22-cobra.webp', alt:'Darende Tarım SLK 22 Cobra tarım aracı',
    shortDescription:'SLK 22 Cobra tarım aracı ürün görseli. Güncel fiyat ve ürün detayı için WhatsApp üzerinden bilgi alabilirsiniz.', price:null, featured:false,
    keywords:['slk 22 cobra','darende tarım aracı','çapa makineleri']
  }
  ,{
    id:'rtrmax-18v-akulu-matkap', name:'RTRMAX 18V Akülü Matkap', category:'El Aletleri', brand:'RTRMAX', model:'18V',
    image:'assets/images/brands/rtrmax/rtrmax-18v-akulu-matkap-800x800.webp', alt:'RTRMAX 18V akülü matkap ürün görseli',
    shortDescription:'RTRMAX 18V akülü matkap için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rtrmax matkap','18v akülü matkap','rtrmax el aletleri']
  },
  {
    id:'rtrmax-zincirli-testere', name:'RTRMAX Zincirli Testere', category:'Motorlu Testereler', brand:'RTRMAX', model:'',
    image:'assets/images/brands/rtrmax/rtrmax-zincirli-testere-800x800.webp', alt:'RTRMAX zincirli testere ürün görseli',
    shortDescription:'RTRMAX zincirli testere için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rtrmax zincirli testere','rtrmax testere','motorlu testere']
  },
  {
    id:'rtrmax-taslama-sac-kesme-seti', name:'RTRMAX Taşlama ve Sac Kesme Seti', category:'El Aletleri', brand:'RTRMAX', model:'',
    image:'assets/images/brands/rtrmax/rtrmax-taslama-sac-kesme-seti-800x800.webp', alt:'RTRMAX taşlama ve sac kesme seti ürün görseli',
    shortDescription:'RTRMAX taşlama ve sac kesme ürün grubu için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['rtrmax taşlama','rtrmax sac kesme','el aletleri']
  },
  {
    id:'rtrmax-power-tools-urun-grubu', name:'RTRMAX Power Tools Ürün Grubu', category:'El Aletleri', brand:'RTRMAX', model:'',
    image:'assets/images/brands/rtrmax/rtrmax-power-tools-urun-grubu-800x800.webp', alt:'RTRMAX Power Tools ürün grubu görseli',
    shortDescription:'RTRMAX matkap, zincirli testere, taşlama ve kırıcı-delici ürün grupları için güncel fiyat ve bilgi alabilirsiniz.', price:null, featured:false,
    keywords:['rtrmax power tools','rtrmax el aletleri','rtrmax ürünleri']
  },
  {
    id:'factor-kdk10000ce3-dizel-jenerator', name:'Factor KDK10000CE3 Dizel Jeneratör', category:'Jeneratörler', brand:'Factor', model:'KDK10000CE3',
    image:'assets/images/brands/kama-factor/factor-kdk10000ce3-dizel-jenerator-800x800.webp', alt:'Factor KDK10000CE3 dizel jeneratör ürün görseli',
    shortDescription:'Factor KDK10000CE3 dizel jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['factor jeneratör','kdk10000ce3','dizel jeneratör']
  },
  {
    id:'kama-4-0is-inverter-jenerator', name:'KAMA 4.0IS Inverter Jeneratör', category:'Jeneratörler', brand:'Kama', model:'4.0IS',
    image:'assets/images/brands/kama-factor/kama-4-0is-inverter-jenerator-800x800.webp', alt:'KAMA 4.0IS inverter jeneratör ürün görseli',
    shortDescription:'KAMA 4.0IS inverter jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kama jeneratör','kama 4.0is','inverter jeneratör']
  },
  {
    id:'factor-kdk6000e-benzinli-jenerator', name:'Factor KDK6000E Benzinli Jeneratör', category:'Jeneratörler', brand:'Factor', model:'KDK6000E',
    image:'assets/images/brands/kama-factor/factor-kdk6000e-benzinli-jenerator-800x800.webp', alt:'Factor KDK6000E benzinli jeneratör ürün görseli',
    shortDescription:'Factor KDK6000E benzinli jeneratör için güncel fiyat ve ürün bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['factor kdk6000e','factor benzinli jeneratör','jeneratör']
  },
  {
    id:'kama-factor-jenerator-cozumleri', name:'KAMA & Factor Jeneratör Çözümleri', category:'Jeneratörler', brand:'Factor', model:'',
    image:'assets/images/brands/kama-factor/kama-factor-jenerator-cozumleri-800x800.webp', alt:'KAMA ve Factor jeneratör çözümleri ürün grubu görseli',
    shortDescription:'KAMA ve Factor jeneratör seçenekleri için model, kullanım alanı ve güncel fiyat bilgisini WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kama factor jeneratör','jeneratör çözümleri','factor power']
  }
  ,{
    id:'karadeniz-kirmizi-kabinli-capa-makinasi', name:'Karadeniz Kırmızı Kabinli Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'4x4 Kabinli',
    image:'assets/images/products/capa/09-karadeniz-kirmizi-kabinli-capa.webp', alt:'Karadeniz kırmızı kabinli çapa makinası',
    shortDescription:'Karadeniz kırmızı kabinli çapa makinası için güncel fiyat, model ve teknik detayları WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kabinli çapa makinası','karadeniz makina','4x4 kabinli çapa','darende çapa']
  },
  {
    id:'karadeniz-gri-kabinli-capa-makinasi', name:'Karadeniz Gri Kabinli Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'4x4 Kabinli',
    image:'assets/images/products/capa/10-karadeniz-gri-kabinli-capa.webp', alt:'Karadeniz gri kabinli çapa makinası',
    shortDescription:'Karadeniz gri kabinli çapa makinası için güncel fiyat, model ve teknik detayları WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kabinli çapa makinası','karadeniz makina','gri kabinli çapa','darende çapa']
  },
  {
    id:'karadeniz-siyah-kabinli-capa-makinasi', name:'Karadeniz Siyah Kabinli Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'4x4 Kabinli',
    image:'assets/images/products/capa/11-karadeniz-siyah-kabinli-capa.webp', alt:'Karadeniz siyah kabinli çapa makinası',
    shortDescription:'Karadeniz siyah kabinli çapa makinası için güncel fiyat, model ve teknik detayları WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kabinli çapa makinası','karadeniz makina','siyah kabinli çapa','darende çapa']
  },
  {
    id:'karadeniz-gri-4x4-kabinli-capa-makinasi', name:'Karadeniz 4x4 Kabinli Çapa Makinası', category:'Çapa Makineleri', brand:'Solakoğlu', model:'4x4 Kabinli',
    image:'assets/images/products/capa/12-karadeniz-gri-4x4-kabinli-capa.webp', alt:'Karadeniz 4x4 kabinli çapa makinası',
    shortDescription:'Karadeniz 4x4 kabinli çapa makinası için güncel fiyat, model ve teknik detayları WhatsApp üzerinden alabilirsiniz.', price:null, featured:false,
    keywords:['kabinli çapa makinası','karadeniz makina','4x4 çapa makinası','darende çapa']
  }


]);
