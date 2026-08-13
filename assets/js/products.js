'use strict';
window.DARENDE_BRANDS = Object.freeze([
  'Bosch','Husqvarna','Qvarna','Moil','İşleyen','Kawashima','Rapco','CAT Power Tools','RTRMAX','Kama','Factor'
]);

/*
  Ürün görsellerini değiştirmek için yalnızca image alanındaki dosyayı değiştirin.
  Önerilen ürün görseli: 1000x1000 px WebP, tercihen 80-180 KB, en fazla 500 KB.
*/
window.DARENDE_PRODUCTS = Object.freeze([
  {
    id:'benzinli-capa-makinesi', name:'Benzinli Çapa Makinesi', category:'Çapa Makineleri', brand:'Genel', model:'',
    image:'assets/images/products/benzinli-capa-makinesi.webp', alt:'Benzinli çapa makinesi ürün görseli',
    shortDescription:'Bahçe ve tarla tipi toprak işleme için çapa makinesi ürün alanı.', price:null, featured:true,
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
    id:'zirai-ekipman', name:'Zirai Ekipman', category:'Zirai Ekipmanlar', brand:'İşleyen', model:'',
    image:'assets/images/products/benzinli-capa-makinesi.webp', alt:'Zirai ekipman ürün görseli',
    shortDescription:'Zirai ekipman ürünleri için ayrılmış katalog alanı.', price:null, featured:false,
    keywords:['zirai ekipman','işleyen']
  },
  {
    id:'profesyonel-el-aletleri', name:'Profesyonel El Aletleri', category:'Bahçe Ekipmanları', brand:'CAT Power Tools', model:'',
    image:'assets/images/products/romorklu-capa-makinesi.webp', alt:'Profesyonel el aletleri ürün görseli',
    shortDescription:'CAT Power Tools ürünleri için ayrılmış katalog alanı.', price:null, featured:false,
    keywords:['cat power tools','el aletleri']
  }
]);
