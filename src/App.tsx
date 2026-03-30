import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wallet, 
  PlaneTakeoff, 
  Timer, 
  AlarmClock, 
  Bell, 
  BellRing, 
  Calculator,
  X,
  Map as MapIcon, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown,
  Trophy, 
  Share2, 
  Landmark, 
  ShieldCheck, 
  Shield,
  Mail,
  Phone,
  MapPin,
  Users,
  Lightbulb,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Search,
  ExternalLink,
  LayoutDashboard,
  Settings,
  Plus,
  Trash2,
  Edit,
  LogOut,
  LogIn,
  User as UserIcon,
  TrendingUp,
  Activity
} from "lucide-react";
import { 
  auth, 
  db, 
  signInWithGoogle, 
  logout, 
  onAuthStateChanged, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  Timestamp,
  handleFirestoreError,
  OperationType,
  FirebaseUser,
  createUserWithEmailAndPassword
} from "./firebase";

const translations = {
  tr: {
    nav: { 
      howItWorks: "Nasıl Çalışır", 
      routes: "Rotalar", 
      deals: "Fırsatlar", 
      security: "Güvenlik", 
      startNow: "Hemen Başla",
      signUp: "Üye Ol",
      individual: "Bireysel",
      corporate: "Kurumsal"
    },
    hero: { title: "Hayalindeki Tatile Önce Biriktir, Sonra Git", subtitle: "Limit blokesi yok, kredi yükü yok. Kendi hızında biriktirerek hayalindeki tatile ulaş.", cta: "Hemen Biriktir", process: "Süreç Nasıl İşler?", jarTitle: "Tatil Birikimi™", jarSubtitle: "Geleceğin Tatili İçin Bugün Biriktir" },
    deals: { 
      title: "Fırsat Köşesi", 
      subtitle: "Anlık fiyat takipleri ve sınırlı süreli özel teklifler.", 
      allAlarms: "Tüm Fiyat Alarmlarını Gör", 
      flights: "Ucuz Uçak Biletleri", 
      vacations: "Fırsat Tatilleri", 
      priceDropped: "Fiyat Düştü", 
      tracking: "Takipte", 
      currentPrice: "Şu anki fiyat", 
      limitedTime: "SINIRLI SÜRE", 
      popular: "POPÜLER SEÇİM", 
      lastRooms: "Son 2 Oda!", 
      reserve: "Hemen Rezerve Et", 
      catch: "Fırsatı Yakala",
      saveFirst: "ÖNCE BİRİKTİR, SONRA GİT",
      stepIn: "HAYALİNDEKİ TATİLE ADIM AT",
      nights: "Gece",
      allInclusive: "Her Şey Dahil",
      flightIncluded: "Uçuş Dahil",
      boutiqueHotel: "Butik Otel",
      breakfastIncluded: "Kahvaltı Dahil",
      getaway: "Kaçamağı",
      breeze: "Ege Rüzgarı"
    },
    calculator: {
      title: "Tatil Birikim Hesaplayıcı",
      target: "Hedef Tutar",
      duration: "Birikim Süresi (Ay)",
      monthly: "AYLIK BİRİKTİRMENİZ GEREKEN",
      info: "Bu hesaplama tahmini olup, seçtiğiniz tatil paketinin güncel fiyatına göre değişiklik gösterebilir.",
      start: "Hemen Başla",
      month: "Ay"
    },
    process: { title: "Üç Adımda Özgürlük", step1: "1. Tatilini Seç", step1Desc: "Dünyanın en prestijli rotaları arasından sana en uygun olanı belirle.", step2: "2. Ödeme Planını Yapılandır", step2Desc: "Bütçene göre aylık taksit miktarını ve süresini esnekçe ayarla.", step3: "3. Biriktir ve Git", step3Desc: "Hedefine ulaştığında limit blokesi olmadan hayallerine uç." },
    features: { limitTitle: "Limit Blokesi Yok", limitDesc: "Kredi kartı limitlerinizi dondurmadan, borçlanmadan ve faiz yükü altına girmeden sadece biriktirerek tatile gidin. Paranız sizin kontrolünüzde kalsın.", flexibleTitle: "Esnek Ödeme Yöntemleri", flexibleDesc: "Bütçenize en uygun yöntemi seçin, her ay zahmetsizce biriktirin.", customTitle: "Kişiye Özel Rotalar", customDesc: "Sadece popüler olanı değil, hayal ettiğiniz her detayı kapsayan özel tatil planları. Kültür turlarından tropikal kaçamaklara kadar her şey mümkün.", exploreAll: "Tüm Rotaları Keşfet" },
    packages: { 
      title: "Öne Çıkan Paketler", 
      subtitle: "12 ay taksit imkanıyla seçkin tatil fırsatları.", 
      seeAll: "Hepsini Gör", 
      monthly: "AYLIK",
      items: [
        { title: "Maldivler", desc: "Beyaz kumsallar ve turkuaz denizin kalbinde rüya gibi bir balayı veya kaçamak.", price: "$100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjIBX-w1OlNHxN5WH4q8x3IkF0tTjPNs-VqcXN0KuIePmwritUQBGfExXDGKnnS_hbcyB-nLM2MenMkWuofOC5t_Ta-FYyrF73QJD7kCUvH8wzDwN-myOT-yqcOk26oweNv26h0udhyqFlFlsLswZhSINDkukWGhuFOe7MuAfyEqs2Kg3Ysruhe6w0wLh1SvqpBVZpKMgOqgPvb0d-y9kAbQDGHQTdPG7chH2n8I9fmVB40Ew2a61MR3QzNdJmT2u_Q5FUY6GJAkZ" },
        { title: "Bali", desc: "Egzotik tapınaklar ve yemyeşil pirinç terasları arasında ruhsal bir yolculuk.", price: "$125", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAri7gyigObYm51D-BI8C2BSQbq2aVzXCvvaagXmx7fA35SYsmTKri8Y35Zzot_YJuxmUYLnTqenk0lwa9JVNPM8kNjWFW0jKs6c8f8Olu-OHL2yP_KionCin6sBluFtrIFV3uXAzQq9CkGe4WZVyOYBTzqui9OFynYIWSjZUP31KClo_LW76mG66p0UL27lMxOKciH_jBolxmV4Cb7v3D_G0kIOodUinsh16NJlWu_mo8ZzG77WxwJRCeV2ddk65vjxtyj6-QxTcpU" },
        { title: "Santorini", desc: "Ege'nin eşsiz gün batımı ve ikonik mavi kubbeli evlerinde romantizmin zirvesi.", price: "$150", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB59Wp1tgq0CjXvqjjjrXRfmaWJkfQA5_alqNIGKURCo0efmQPmIv-VUV7vykc-5ypnSZkE9_bNEyOHvSV1qQ19briZ2zbURDkoxq5n5nN6WXTp46PA798Ldug1rx0l0yBs0QS6A4KZUv7C5r9ERpe0zTw--h_uFQAMpasy4q894grmdWicaBWYB4gBA6C41IGPf307MS-Twc65pXa3s54itP-kTmDnq2rjefY5rh0GU0j-7lQ8nhQiPO_QqCo8MoiapxF6oqD_TsX1" }
      ]
    },
    trust: { bank: "EFT / HAVALE", ssl: "SSL GÜVENLİ", payment: "GÜVENLİ ÖDEME", encryption: "256-Bit Uçtan Uca Şifreleme" },
    planner: { title: "Birikim Planlayıcı", subtitle: "Hayalindeki tatil için bütçeni ve vadenı belirle.", back: "Geri Dön", destination: "Nereye Gitmek İstersin?", budget: "Toplam Bütçe", duration: "Birikim Süresi", monthlyAmount: "AYLIK BİRİKİM TUTARI", start: "Planı Başlat", secure: "Güvenli Birikim", secureDesc: "Biriktirdiğiniz tutarlar TatilFinans güvencesiyle korunur. İstediğiniz zaman planınızı iptal edebilir veya değiştirebilirsiniz.", month: "Ay", target: "Hedef", term: "Vade", total: "Toplam", destinations: { istanbul: "İstanbul", maldives: "Maldivler", bali: "Bali", santorini: "Santorini", phuket: "Phuket", rome: "Roma", london: "Londra", ankara: "Ankara" } },
    signup: { 
      back: "Planı Düzenle", 
      title: "Aramıza Hoş Geldin!", 
      subtitle: "Hayallerine bir adım daha yaklaştın. Planını kaydetmek ve biriktirmeye başlamak için hesabını oluştur.", 
      summary: "SEÇİLEN PLAN ÖZETİ", 
      month: "Ay Vade", 
      security: "Uluslararası Güvenlik Standartları", 
      cancel: "Dilediğin Zaman İptal Hakkı", 
      alerts: "Akıllı Fiyat Takip Uyarıları", 
      firstName: "Ad", 
      lastName: "Soyad", 
      email: "E-posta", 
      password: "Şifre", 
      terms: "Kullanım Koşulları", 
      privacy: "Gizlilik Politikası", 
      submit: "Hesabımı Oluştur ve Başla", 
      hasAccount: "Zaten hesabın var mı?", 
      login: "Giriş Yap", 
      firstNamePlaceholder: "Ahmet", 
      lastNamePlaceholder: "Yılmaz", 
      emailPlaceholder: "ahmet@ornek.com", 
      agreeText: "okudum, onaylıyorum.", 
      and: "ve",
      companyName: "Şirket Adı",
      taxNumber: "Vergi Numarası",
      taxOffice: "Vergi Dairesi",
      corporateTitle: "Kurumsal Üyelik",
      individualTitle: "Bireysel Üyelik",
      corporateSubtitle: "Şirketiniz için avantajlı tatil birikim planları oluşturun.",
      phone: "Telefon Numarası",
      authorizedPerson: "Yetkili Kişi",
      tcNo: "T.C. Kimlik Numarası (Opsiyonel)",
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
      success: "Üyeliğiniz başarıyla oluşturuldu! Yönlendiriliyorsunuz..."
    },
    footer: { desc: "Türkiye'nin en yenilikçi tatil birikim platformu. Hayalleriniz için güvenli ve akıllı bir yol sunuyoruz.", company: "Şirket", support: "Destek", newsletter: "Bültene Katıl", newsletterDesc: "En yeni rotalar ve fırsatlardan ilk siz haberdar olun.", send: "Gönder", rights: "TatilFinans Teknolojileri A.Ş. Tüm hakları saklıdır.", about: "Hakkımızda", contact: "İletişim", career: "Kariyer", faq: "Sıkça Sorulan Sorular", help: "Yardım Merkezi", blog: "Blog", terms: "Kullanım Koşulları", privacy: "Gizlilik Politikası", emailPlaceholder: "E-posta adresiniz" },
    about: {
      storyTitle: "Hikayemiz",
      storyDesc: "TatilFinans, tatil hayallerini borçlanmadan gerçeğe dönüştürmek isteyenler için kurulmuş Türkiye'nin ilk tatil birikim platformudur.",
      mission: "Misyonumuz",
      missionDesc: "Herkesin hayalindeki tatile finansal özgürlükle ulaşmasını sağlamak.",
      vision: "Vizyonumuz",
      visionDesc: "Seyahat planlamasında birikim kültürünü öncü hale getirmek.",
      values: "Değerlerimiz",
      valuesDesc: "Şeffaflık, güvenlik ve kullanıcı odaklılık en temel prensiplerimizdir.",
      whyTitle: "Neden TatilFinans?",
      whyDesc: "Geleneksel tatil kredileri ve kredi kartı taksitleri sizi faiz yükü altına sokarken, TatilFinans ile kendi hızınızda biriktirirsiniz. Limitleriniz bloke olmaz, tatil dönüşü borç ödemezsiniz."
    },
    contact: {
      title: "Bize Ulaşın",
      subtitle: "Sorularınız, önerileriniz veya iş birliği talepleriniz için her zaman buradayız.",
      email: "E-posta",
      phone: "Telefon",
      address: "Adres",
      nameLabel: "Ad Soyad",
      emailLabel: "E-posta",
      subjectLabel: "Konu",
      messageLabel: "Mesajınız",
      subjectPlaceholder: "Nasıl yardımcı olabiliriz?",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      send: "Gönder",
      success: "Mesajınız başarıyla gönderildi!"
    },
    career: {
      title: "Kariyer",
      subtitle: "Geleceğin seyahat teknolojilerini bizimle birlikte inşa edin. Tutkulu bir ekibin parçası olun.",
      joinTitle: "Bize Katılın",
      joinDesc: "Aradığınız pozisyonu bulamadınız mı? Bize CV'nizi gönderin, uygun bir pozisyon olduğunda sizinle iletişime geçelim."
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      subtitle: "Aklınıza takılan tüm soruların cevapları burada.",
      items: [
        { q: "TatilFinans nasıl çalışır?", a: "TatilFinans, hayalinizdeki tatil için bütçenizi belirleyip, bu bütçeyi faizsiz taksitlerle biriktirmenizi sağlayan bir platformdur. Hedefinize ulaştığınızda tatilinizi gerçekleştirirsiniz." },
        { q: "Birikimlerim güvende mi?", a: "Evet, tüm birikimleriniz anlaşmalı banka ortaklarımız nezdinde ve yasal güvence altında korunmaktadır." },
        { q: "İstediğim zaman iptal edebilir miyim?", a: "Tabii ki. Dilediğiniz zaman planınızı iptal edebilir ve birikmiş tutarınızı kesintisiz olarak geri alabilirsiniz." },
        { q: "Kredi kartı limiti bloke edilir mi?", a: "Hayır, TatilFinans bir kredi sistemi değildir. Bu nedenle kart limitiniz bloke edilmez, sadece aylık belirlediğiniz tutar çekilir." },
        { q: "Ödemelerimi nasıl yapabilirim?", a: "Kredi kartı, banka kartı veya havale/EFT yöntemleriyle ödemelerinizi kolayca gerçekleştirebilirsiniz." },
        { q: "Birden fazla birikim planı oluşturabilir miyim?", a: "Evet, farklı tatil hedefleriniz için dilediğiniz kadar farklı birikim planı oluşturup yönetebilirsiniz." }
      ]
    },
    help: {
      title: "Yardım Merkezi",
      placeholder: "Nasıl yardımcı olabiliriz?",
      categories: {
        gettingStarted: "Başlangıç",
        payments: "Ödemeler",
        security: "Güvenlik",
        account: "Hesabım"
      },
      articleCount: "Makale",
      popularTitle: "Popüler Makaleler",
      popularArticles: [
        "Birikim planı nasıl oluşturulur?",
        "Ödeme yöntemimi nasıl değiştiririm?",
        "Tatil rezervasyonu süreci",
        "İptal ve iade koşulları"
      ],
      stillNeedHelp: "Hala yardıma mı ihtiyacınız var?",
      supportDesc: "Destek ekibimiz 7/24 yanınızda.",
      liveSupport: "Canlı Destek Başlat"
    },
    blog: {
      title: "Blog",
      subtitle: "Seyahat tutkunları için ilham verici hikayeler ve ipuçları.",
      readMore: "Devamını Oku",
      popularTitle: "Popüler Makaleler",
      posts: [
        { title: "2024'ün En Popüler 5 Ekonomik Rotası", desc: "Hem cebinizi hem ruhunuzu dinlendirecek harika rotaları keşfedin.", date: "24 Mart 2024" },
        { title: "Maldivler Tatili İçin Birikim İpuçları", desc: "Rüya gibi bir tatil için bugünden yapabileceğiniz küçük değişiklikler.", date: "20 Mart 2024" },
        { title: "Seyahat Çantanızda Olması Gereken 10 Şey", desc: "Konforlu bir yolculuk için yanınıza almayı unutmamanız gerekenler.", date: "15 Mart 2024" },
        { title: "Vizesiz Gidilebilecek En Güzel Ülkeler", desc: "Pasaportunuzu kapıp hemen yola çıkabileceğiniz harika destinasyonlar.", date: "10 Mart 2024" },
        { title: "Solo Seyahat Edenler İçin Güvenlik Rehberi", desc: "Tek başına dünyayı keşfetmek isteyenler için altın değerinde tavsiyeler.", date: "05 Mart 2024" },
        { title: "Gurme Gezginlerin Mutlaka Görmesi Gereken Şehirler", desc: "Lezzet duraklarıyla ünlü, damağınızda iz bırakacak rotalar.", date: "01 Mart 2024" }
      ]
    },
    common: { monthAbbr: "ay", installments: "TAKSİT", interestFree: "FAİZSİZ", debtFree: "BORÇSUZ", noCommission: "KOMİSYONSUZ", creditCard: "Kredi Kartı", debitCard: "ATM (Debit) Kartı", bankTransfer: "EFT / Havale", login: "Giriş Yap", logout: "Çıkış Yap", adminPanel: "Yönetim Paneli" },
    admin: {
      dashboard: "Panel",
      deals: "Fırsat Yönetimi",
      users: "Kullanıcılar",
      plans: "Birikim Planları",
      stats: "İstatistikler",
      totalSavings: "Toplam Birikim",
      activePlans: "Aktif Planlar",
      totalUsers: "Toplam Kullanıcı",
      recentActivity: "Son İşlemler",
      addDeal: "Yeni Fırsat Ekle",
      editDeal: "Fırsatı Düzenle",
      title: "Başlık",
      price: "Fiyat",
      category: "Kategori",
      save: "Kaydet",
      cancel: "İptal",
      deleteConfirm: "Bu öğeyi silmek istediğinizden emin misiniz?"
    }
  },
  en: {
    nav: { 
      howItWorks: "How it Works", 
      routes: "Routes", 
      deals: "Deals", 
      security: "Security", 
      startNow: "Start Now",
      signUp: "Sign Up",
      individual: "Individual",
      corporate: "Corporate"
    },
    hero: { title: "Save First, Go Later for Your Dream Vacation", subtitle: "No limit block, no credit burden. Reach your dream vacation by saving at your own pace.", cta: "Start Saving", process: "How it Works?", jarTitle: "Vacation Savings™", jarSubtitle: "Save Today for Future Vacations" },
    deals: { 
      title: "Deals Corner", 
      subtitle: "Instant price tracking and limited-time special offers.", 
      allAlarms: "See All Price Alarms", 
      flights: "Cheap Flights", 
      vacations: "Deal Vacations", 
      priceDropped: "Price Dropped", 
      tracking: "Tracking", 
      currentPrice: "Current price", 
      limitedTime: "LIMITED TIME", 
      popular: "POPULAR CHOICE", 
      lastRooms: "Last 3 Rooms!", 
      reserve: "Reserve Now", 
      catch: "Catch the Deal",
      saveFirst: "SAVE FIRST, GO LATER",
      stepIn: "STEP INTO YOUR DREAM VACATION",
      nights: "Nights",
      allInclusive: "All Inclusive",
      flightIncluded: "Flight Included",
      boutiqueHotel: "Boutique Hotel",
      breakfastIncluded: "Breakfast Included",
      getaway: "Getaway",
      breeze: "Aegean Breeze"
    },
    process: { title: "Freedom in Three Steps", step1: "1. Choose Your Trip", step1Desc: "Select the most suitable one among the world's most prestigious routes.", step2: "2. Configure Payment Plan", step2Desc: "Flexibly adjust the monthly installment amount and duration according to your budget.", step3: "3. Save and Go", step3Desc: "Fly to your dreams without limit blocks when you reach your goal." },
    features: { limitTitle: "No Limit Block", limitDesc: "Go on vacation by just saving without freezing your credit card limits, borrowing, or incurring interest. Your money stays under your control.", flexibleTitle: "Flexible Payment Methods", flexibleDesc: "Choose the method that best fits your budget and save effortlessly every month.", customTitle: "Custom Routes", customDesc: "Not just what's popular, but special holiday plans covering every detail you imagine. Everything is possible from cultural tours to tropical getaways.", exploreAll: "Explore All Routes" },
    packages: { 
      title: "Featured Packages", 
      subtitle: "Exclusive holiday opportunities with 12-month installment options.", 
      seeAll: "See All", 
      monthly: "MONTHLY",
      items: [
        { title: "Maldives", desc: "A dream honeymoon or getaway in the heart of white sands and turquoise sea.", price: "$100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjIBX-w1OlNHxN5WH4q8x3IkF0tTjPNs-VqcXN0KuIePmwritUQBGfExXDGKnnS_hbcyB-nLM2MenMkWuofOC5t_Ta-FYyrF73QJD7kCUvH8wzDwN-myOT-yqcOk26oweNv26h0udhyqFlFlsLswZhSINDkukWGhuFOe7MuAfyEqs2Kg3Ysruhe6w0wLh1SvqpBVZpKMgOqgPvb0d-y9kAbQDGHQTdPG7chH2n8I9fmVB40Ew2a61MR3QzNdJmT2u_Q5FUY6GJAkZ" },
        { title: "Bali", desc: "A spiritual journey among exotic temples and lush green rice terraces.", price: "$125", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAri7gyigObYm51D-BI8C2BSQbq2aVzXCvvaagXmx7fA35SYsmTKri8Y35Zzot_YJuxmUYLnTqenk0lwa9JVNPM8kNjWFW0jKs6c8f8Olu-OHL2yP_KionCin6sBluFtrIFV3uXAzQq9CkGe4WZVyOYBTzqui9OFynYIWSjZUP31KClo_LW76mG66p0UL27lMxOKciH_jBolxmV4Cb7v3D_G0kIOodUinsh16NJlWu_mo8ZzG77WxwJRCeV2ddk65vjxtyj6-QxTcpU" },
        { title: "Santorini", desc: "The peak of romance in the unique sunset of the Aegean and iconic blue-domed houses.", price: "$150", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB59Wp1tgq0CjXvqjjjrXRfmaWJkfQA5_alqNIGKURCo0efmQPmIv-VUV7vykc-5ypnSZkE9_bNEyOHvSV1qQ19briZ2zbURDkoxq5n5nN6WXTp46PA798Ldug1rx0l0yBs0QS6A4KZUv7C5r9ERpe0zTw--h_uFQAMpasy4q894grmdWicaBWYB4gBA6C41IGPf307MS-Twc65pXa3s54itP-kTmDnq2rjefY5rh0GU0j-7lQ8nhQiPO_QqCo8MoiapxF6oqD_TsX1" }
      ]
    },
    trust: { bank: "EFT / WIRE TRANSFER", ssl: "SSL SECURE", payment: "SECURE PAYMENT", encryption: "256-Bit End-to-End Encryption" },
    planner: { title: "Savings Planner", subtitle: "Determine your budget and term for your dream vacation.", back: "Back", destination: "Where Do You Want to Go?", budget: "Total Budget", duration: "Savings Duration", monthlyAmount: "MONTHLY SAVINGS AMOUNT", start: "Start Plan", secure: "Secure Savings", secureDesc: "Your savings are protected under TatilFinans guarantee. You can cancel or change your plan at any time.", month: "Months", target: "Target", term: "Term", total: "Total", destinations: { istanbul: "Istanbul", maldives: "Maldives", bali: "Bali", santorini: "Santorini", phuket: "Phuket", rome: "Rome", london: "London", ankara: "Ankara" } },
    signup: { 
      back: "Edit Plan", 
      title: "Welcome to the Family!", 
      subtitle: "You are one step closer to your dreams. Create your account to save your plan and start saving.", 
      summary: "SELECTED PLAN SUMMARY", 
      month: "Months Term", 
      security: "International Security Standards", 
      cancel: "Right to Cancel Anytime", 
      alerts: "Smart Price Tracking Alerts", 
      firstName: "First Name", 
      lastName: "Last Name", 
      email: "Email", 
      password: "Password", 
      terms: "Terms of Use", 
      privacy: "Privacy Policy", 
      submit: "Create My Account and Start", 
      hasAccount: "Already have an account?", 
      login: "Log In", 
      firstNamePlaceholder: "John", 
      lastNamePlaceholder: "Doe", 
      emailPlaceholder: "john@example.com", 
      agreeText: "I have read and agree to the", 
      and: "and",
      companyName: "Company Name",
      taxNumber: "Tax Number",
      taxOffice: "Tax Office",
      corporateTitle: "Corporate Membership",
      individualTitle: "Individual Membership",
      corporateSubtitle: "Create advantageous holiday savings plans for your company.",
      phone: "Phone Number",
      authorizedPerson: "Authorized Person",
      tcNo: "ID Number (Optional)",
      error: "An error occurred. Please try again.",
      success: "Your membership has been successfully created! Redirecting..."
    },
    footer: { desc: "Turkey's most innovative holiday savings platform. We offer a secure and smart way for your dreams.", company: "Company", support: "Support", newsletter: "Join Newsletter", newsletterDesc: "Be the first to know about the newest routes and opportunities.", send: "Send", rights: "TatilFinans Technologies Inc. All rights reserved.", about: "About Us", contact: "Contact", career: "Careers", faq: "FAQ", help: "Help Center", blog: "Blog", terms: "Terms of Use", privacy: "Privacy Policy", emailPlaceholder: "Your email address" },
    about: {
      storyTitle: "Our Story",
      storyDesc: "TatilFinans is Turkey's first holiday savings platform, established for those who want to turn their holiday dreams into reality without getting into debt.",
      mission: "Our Mission",
      missionDesc: "To ensure everyone reaches their dream vacation with financial freedom.",
      vision: "Our Vision",
      visionDesc: "To make the savings culture a pioneer in travel planning.",
      values: "Our Values",
      valuesDesc: "Transparency, security, and user-centricity are our core principles.",
      whyTitle: "Why TatilFinans?",
      whyDesc: "While traditional holiday loans and credit card installments put you under the burden of interest, with TatilFinans you save at your own pace. Your limits are not blocked, and you don't pay off debt after your holiday."
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are always here for your questions, suggestions, or collaboration requests.",
      email: "Email",
      phone: "Phone",
      address: "Address",
      nameLabel: "Full Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      subjectPlaceholder: "How can we help?",
      messagePlaceholder: "Write your message here...",
      send: "Send",
      success: "Your message has been sent successfully!"
    },
    career: {
      title: "Careers",
      subtitle: "Build the travel technologies of the future with us. Be part of a passionate team.",
      joinTitle: "Join Us",
      joinDesc: "Couldn't find the position you're looking for? Send us your CV, and we'll contact you when a suitable position becomes available."
    },
    faq: {
      title: "FAQ",
      subtitle: "Answers to all your questions are here.",
      items: [
        { q: "How does TatilFinans work?", a: "TatilFinans is a platform that allows you to determine your budget for your dream vacation and save this budget with interest-free installments. You realize your vacation when you reach your goal." },
        { q: "Are my savings safe?", a: "Yes, all your savings are protected with our partner banks and under legal guarantee." },
        { q: "Can I cancel anytime?", a: "Of course. You can cancel your plan at any time and get your accumulated amount back without any deduction." },
        { q: "Is the credit card limit blocked?", a: "No, TatilFinans is not a credit system. Therefore, your card limit is not blocked, only the monthly amount you determine is withdrawn." },
        { q: "How can I make my payments?", a: "You can easily make your payments using credit cards, debit cards, or bank transfer/EFT methods." },
        { q: "Can I create more than one savings plan?", a: "Yes, you can create and manage as many different savings plans as you like for your different holiday goals." }
      ]
    },
    help: {
      title: "Help Center",
      placeholder: "How can we help?",
      categories: {
        gettingStarted: "Getting Started",
        payments: "Payments",
        security: "Security",
        account: "My Account"
      },
      articleCount: "Articles",
      popularTitle: "Popular Articles",
      popularArticles: [
        "How to create a savings plan?",
        "How do I change my payment method?",
        "Vacation reservation process",
        "Cancellation and refund terms"
      ],
      stillNeedHelp: "Still need help?",
      supportDesc: "Our support team is with you 24/7.",
      liveSupport: "Start Live Support"
    },
    blog: {
      title: "Blog",
      subtitle: "Inspiring stories and tips for travel enthusiasts.",
      readMore: "Read More",
      popularTitle: "Popular Articles",
      posts: [
        { title: "Top 5 Budget Routes of 2024", desc: "Discover great routes that will rest both your pocket and your soul.", date: "March 24, 2024" },
        { title: "Savings Tips for Maldives Vacation", desc: "Small changes you can make today for a dream vacation.", date: "March 20, 2024" },
        { title: "10 Things You Must Have in Your Travel Bag", desc: "Things you should not forget to take with you for a comfortable journey.", date: "March 15, 2024" },
        { title: "Most Beautiful Countries to Visit Without a Visa", desc: "Great destinations where you can just grab your passport and go.", date: "March 10, 2024" },
        { title: "Safety Guide for Solo Travelers", desc: "Golden advice for those who want to explore the world alone.", date: "March 05, 2024" },
        { title: "Must-See Cities for Gourmet Travelers", desc: "Routes famous for their flavor stops that will leave a mark on your palate.", date: "March 01, 2024" }
      ]
    },
    common: { monthAbbr: "mo", installments: "INSTALLMENTS", interestFree: "INTEREST-FREE", debtFree: "DEBT-FREE", noCommission: "NO COMMISSION", creditCard: "Credit Card", debitCard: "Debit Card", bankTransfer: "Bank Transfer", login: "Log In", logout: "Log Out", adminPanel: "Admin Panel" },
    admin: {
      dashboard: "Dashboard",
      deals: "Deal Management",
      users: "Users",
      plans: "Savings Plans",
      stats: "Statistics",
      totalSavings: "Total Savings",
      activePlans: "Active Plans",
      totalUsers: "Total Users",
      recentActivity: "Recent Activity",
      addDeal: "Add New Deal",
      editDeal: "Edit Deal",
      title: "Title",
      price: "Price",
      category: "Category",
      save: "Save",
      cancel: "Cancel",
      deleteConfirm: "Are you sure you want to delete this item?"
    }
  }
};

const Navbar = ({ onNavigate, onStart, onLoginClick, language, setLanguage, user, role, onAdminClick, onDashboardClick }: { 
  onNavigate?: () => void, 
  onStart?: (type?: "individual" | "corporate") => void,
  onLoginClick?: () => void,
  language: "tr" | "en",
  setLanguage: (lang: "tr" | "en") => void,
  user: FirebaseUser | null,
  role: string | null,
  onAdminClick: () => void,
  onDashboardClick: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const t = translations[language].nav;
  const common = translations[language].common;

  const navLinks = [
    { name: t.howItWorks, href: "#nasil-calisir" },
    { name: t.routes, href: "#rotalar" },
    { name: t.deals, href: "#firsatlar" },
    { name: t.security, href: "#guvenlik" },
  ];

  const handleLogoClick = () => {
    if (onNavigate) onNavigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const handleStartClick = (type: "individual" | "corporate" = "individual") => {
    if (onStart) onStart(type);
    setIsOpen(false);
    setIsSignUpOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 w-full">
        <div 
          className="text-2xl font-black text-primary tracking-tighter font-headline cursor-pointer" 
          onClick={handleLogoClick}
        >
          TatilFinans
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              className="text-slate-600 hover:text-primary transition-colors text-sm font-medium" 
              href={link.href}
              onClick={() => onNavigate && onNavigate()}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 mr-4 text-xs font-bold">
          <span 
            onClick={() => setLanguage("tr")}
            className={`${language === "tr" ? "text-primary" : "text-slate-500"} cursor-pointer hover:text-primary transition-colors`}
          >
            TR
          </span>
          <span className="text-slate-400">|</span>
          <span 
            onClick={() => setLanguage("en")}
            className={`${language === "en" ? "text-primary" : "text-slate-500"} cursor-pointer hover:text-primary transition-colors`}
          >
            EN
          </span>
        </div>

        <div className="flex items-center gap-4">
          {role === "admin" && (
            <button 
              onClick={() => {
                // In a real app, this would be window.location.href = "https://panel.tatilfinans.com"
                onAdminClick();
              }}
              className="hidden lg:flex items-center gap-2 text-primary hover:text-primary-container font-bold text-sm transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              {common.adminPanel}
            </button>
          )}

          {user && (
            <button 
              onClick={onDashboardClick}
              className="hidden sm:flex items-center gap-2 text-secondary hover:text-primary font-bold text-sm transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden lg:block">{language === "tr" ? "Panelim" : "My Panel"}</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-outline-variant/30" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-bold text-secondary hidden lg:block">{user.displayName}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-on-surface-variant hover:text-error transition-colors"
                title={common.logout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 text-secondary hover:text-primary font-bold text-sm transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:block">{common.login}</span>
            </button>
          )}

          {/* Dropdown for Sign Up */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setIsSignUpOpen(!isSignUpOpen)}
              className="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 duration-150 ease-in-out shadow-md shadow-primary/10 flex items-center gap-2"
            >
              {t.signUp}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSignUpOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSignUpOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden py-2"
                >
                  <button 
                    onClick={() => handleStartClick("individual")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3"
                  >
                    <UserIcon className="w-4 h-4" />
                    {t.individual}
                  </button>
                  <button 
                    onClick={() => handleStartClick("corporate")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3"
                  >
                    <Landmark className="w-4 h-4" />
                    {t.corporate}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-secondary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transform transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-outline-variant/20 px-6 py-8 space-y-6 shadow-xl overflow-hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name}
              className="block text-lg font-bold text-secondary hover:text-primary transition-colors" 
              href={link.href}
              onClick={() => {
                if (onNavigate) onNavigate();
                setIsOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
          
          {role === "admin" && (
            <button 
              onClick={() => {
                onAdminClick();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-primary font-bold text-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              {common.adminPanel}
            </button>
          )}

          <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ""} className="w-10 h-10 rounded-full border border-outline-variant/30" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UserIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-secondary">{user.displayName}</p>
                    <p className="text-xs text-on-surface-variant">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-surface-container-low text-error py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  {common.logout}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{t.signUp}</p>
                <button 
                  onClick={() => handleStartClick("individual")}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-5 h-5" />
                  {t.individual}
                </button>
                <button 
                  onClick={() => handleStartClick("corporate")}
                  className="w-full bg-secondary text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Landmark className="w-5 h-5" />
                  {t.corporate}
                </button>
                <button 
                  onClick={() => {
                    if (onLoginClick) onLoginClick();
                    setIsOpen(false);
                  }}
                  className="w-full bg-white border border-outline-variant/30 text-secondary py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  {common.login}
                </button>
              </div>
            )}
            <div className="flex justify-center gap-4 text-sm font-bold pt-4">
              <span 
                onClick={() => setLanguage("tr")}
                className={`${language === "tr" ? "text-primary" : "text-slate-500"} cursor-pointer`}
              >
                TR
              </span>
              <span className="text-slate-400">|</span>
              <span 
                onClick={() => setLanguage("en")}
                className={`${language === "en" ? "text-primary" : "text-slate-500"} cursor-pointer`}
              >
                EN
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onStart, language }: { onStart: () => void, language: "tr" | "en" }) => {
  const t = translations[language].hero;
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-secondary font-headline leading-[1.1]">
            {language === "tr" ? (
              <>Hayalindeki Tatile <span className="text-primary">Önce Biriktir</span>, Sonra Git</>
            ) : (
              <><span className="text-primary">Save First</span>, Go Later for Your Dream Vacation</>
            )}
          </h1>
          <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onStart}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              {t.cta}
            </button>
            <a 
              href="#nasil-calisir"
              className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-high transition-all flex items-center justify-center"
            >
              {t.process}
            </a>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img 
              alt="Modern glass saving jar with sand and palm tree on a beach" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcgmztq-ratiSwBte1FOv_JLhB-pVOjDBHqSU1YzQ3Y888uTVrsPs1n07EX-EPukPmmnMg8FVTlKT8nW7BaIvRywhz4cF1oUQw37F0J23gaOORMxXB-7fYMFFZULx8AENBVEVZTNfBzVmCvJaUB2nHxJC8Ier8PyJXuugrlSfnDDOe1Y8K8obtRVjx4ffWb29sc60m4aP5R5I1DTg9FcdBXWX1P2zFHyT8GD_GaGoQDui-bVvFvelg27UNmP-aTyOBlnPCSw_PopVL"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-8">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{t.jarTitle}</p>
                    <p className="font-headline font-bold text-secondary text-sm md:text-base">
                      {t.jarSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CountdownTimer = ({ hours, minutes, seconds }: { hours: number, minutes: number, seconds: number }) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <span className="bg-error text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
      <AlarmClock className="w-3 h-3" /> {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
    </span>
  );
};

const CalculatorModal = ({ isOpen, onClose, onStart, language }: { isOpen: boolean, onClose: () => void, onStart: (plan: { target: number, months: number }) => void, language: "tr" | "en" }) => {
  const [target, setTarget] = useState(1000);
  const [months, setMonths] = useState(12);
  const monthly = Math.round(target / months);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-secondary text-lg">Tatil Birikim Hesaplayıcı</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-10">
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Hedef Tutar</label>
              <span className="text-3xl font-black text-primary">${target.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="5000" 
              step="50"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>$50</span>
              <span>$5,000</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Birikim Süresi (Ay)</label>
              <span className="text-3xl font-black text-primary">{months} Ay</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="24" 
              step="1"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>3 AY</span>
              <span>24 AY</span>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">AYLIK BİRİKTİRMENİZ GEREKEN</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary">${monthly}</span>
                <span className="text-lg font-bold text-primary/60">/ ay</span>
              </div>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
              <Calculator className="w-32 h-32 text-primary" />
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="mt-0.5">
              <div className="w-5 h-5 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary">
                <span className="text-[10px] font-bold">i</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bu hesaplama tahmini olup, seçtiğiniz tatil paketinin güncel fiyatına göre değişiklik gösterebilir.
            </p>
          </div>

          <button 
            onClick={() => onStart({ target, months })}
            className="w-full py-5 bg-[#1a637a] text-white rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
          >
            Hemen Başla
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DealsSection = ({ language, onSelect }: { language: "tr" | "en", onSelect?: (plan: { destination: string, budget: number, months: number }) => void }) => {
  const t = translations[language].deals;
  
  const handleReserve = (destination: string, budget: number, months: number) => {
    if (onSelect) {
      onSelect({ destination, budget, months });
    }
  };

  return (
    <section id="firsatlar" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary font-headline mb-2">{t.title}</h2>
            <p className="text-on-surface-variant">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold">
            <BellRing className="w-5 h-5" />
            <button className="hover:underline">{t.allAlarms}</button>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
              <PlaneTakeoff className="w-6 h-6 text-primary" />
              {t.flights}
            </h3>
            {[
              { route: "İstanbul ➔ Maldivler", date: language === "tr" ? "Gidiş-Dönüş • 15-22 Mayıs" : "Round Trip • May 15-22", price: "$499", tag: t.priceDropped, tagColor: "bg-green-100 text-green-700" },
              { route: "İstanbul ➔ Bali", date: language === "tr" ? "Tek Yön • 10 Haziran" : "One Way • June 10", price: "$425", tag: t.tracking, tagColor: "bg-slate-100 text-slate-500" }
            ].map((flight, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-secondary">{flight.route}</p>
                  <span className={`px-2 py-1 ${flight.tagColor} text-[10px] font-bold rounded uppercase`}>{flight.tag}</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6">{flight.date}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">{t.currentPrice}</p>
                    <p className="text-2xl font-black text-primary">{flight.price}</p>
                  </div>
                  <button className="p-2.5 bg-white rounded-full text-primary shadow-sm border border-slate-100 hover:bg-primary hover:text-white transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
              <Timer className="w-6 h-6 text-primary" />
              {t.vacations}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div whileHover={{ y: -10 }} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    alt="Maldivler Rüya Tatili" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHjIBX-w1OlNHxN5WH4q8x3IkF0tTjPNs-VqcXN0KuIePmwritUQBGfExXDGKnnS_hbcyB-nLM2MenMkWuofOC5t_Ta-FYyrF73QJD7kCUvH8wzDwN-myOT-yqcOk26oweNv26h0udhyqFlFlsLswZhSINDkukWGhuFOe7MuAfyEqs2Kg3Ysruhe6w0wLh1SvqpBVZpKMgOqgPvb0d-y9kAbQDGHQTdPG7chH2n8I9fmVB40Ew2a61MR3QzNdJmT2u_Q5FUY6GJAkZ"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <CountdownTimer hours={2} minutes={14} seconds={24} />
                    <span className="bg-slate-700/80 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">SINIRLI SÜRE</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-secondary mb-1">Maldivler Rüya Tatili</h4>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    5 Gece • Su Üstü Villası • Uçuş Dahil
                  </p>
                  <div className="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">
                      {t.saveFirst}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">$180</span>
                      <span className="text-xs font-semibold text-primary-container">/ay (12 Taksit)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReserve("Maldivler", 2160, 12)}
                    className="w-full py-3 bg-[#4a5578] text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors active:scale-95"
                  >
                    Hemen Rezerve Et
                  </button>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    alt="Bali: Ruhsal Kaçış" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAri7gyigObYm51D-BI8C2BSQbq2aVzXCvvaagXmx7fA35SYsmTKri8Y35Zzot_YJuxmUYLnTqenk0lwa9JVNPM8kNjWFW0jKs6c8f8Olu-OHL2yP_KionCin6sBluFtrIFV3uXAzQq9CkGe4WZVyOYBTzqui9OFynYIWSjZUP31KClo_LW76mG66p0UL27lMxOKciH_jBolxmV4Cb7v3D_G0kIOodUinsh16NJlWu_mo8ZzG77WxwJRCeV2ddk65vjxtyj6-QxTcpU"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <CountdownTimer hours={5} minutes={41} seconds={41} />
                    <span className="bg-slate-700/80 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">POPÜLER</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-error">Son 2 Oda!</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-secondary mb-1">Bali: Ruhsal Kaçış</h4>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    7 Gece • Orman Evi • Kahvaltı Dahil
                  </p>
                  <div className="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">
                      {t.saveFirst}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">$155</span>
                      <span className="text-xs font-semibold text-primary-container">/ay (12 Taksit)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReserve("Bali", 1860, 12)}
                    className="w-full py-3 bg-[#4a5578] text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors active:scale-95"
                  >
                    Hemen Rezerve Et
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].process;
  return (
    <section id="nasil-calisir" className="py-24 bg-surface-container-low scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary font-headline mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {[
            { icon: <MapIcon className="w-8 h-8 text-primary" />, title: t.step1, desc: t.step1Desc },
            { icon: <CreditCard className="w-8 h-8 text-primary" />, title: t.step2, desc: t.step2Desc },
            { icon: <PlaneTakeoff className="w-8 h-8 text-primary" />, title: t.step3, desc: t.step3Desc }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
              <p className="text-on-surface-variant">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesBento = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].features;
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white rounded-3xl p-10 flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-4 font-headline leading-tight">{t.limitTitle}</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-md">{t.limitDesc}</p>
          </div>
          <div className="mt-8 flex gap-4">
            {[translations[language].common.interestFree, translations[language].common.debtFree, translations[language].common.noCommission].map(tag => (
              <span key={tag} className="px-4 py-2 bg-surface-container-low rounded-full text-xs font-bold text-secondary">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-10 flex flex-col justify-between shadow-xl">
          <h3 className="text-2xl font-bold font-headline mb-4">{t.flexibleTitle}</h3>
          <ul className="space-y-4">
            {[translations[language].common.creditCard, translations[language].common.debitCard, translations[language].common.bankTransfer].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-container" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80 italic">{t.flexibleDesc}</p>
          </div>
        </div>
        <div className="md:col-span-12 bg-surface-container-high rounded-3xl p-10 relative overflow-hidden group">
          <div className="relative z-10 max-w-lg">
            <h3 className="text-3xl font-bold text-secondary mb-4 font-headline">{t.customTitle}</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed">{t.customDesc}</p>
            <a className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
              {t.exploreAll} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 md:opacity-100 mix-blend-multiply group-hover:scale-110 transition-transform duration-700">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqk8KHYzrkznMgntLb1plDH-6x96vepKJx4fqzavMNZ_pvySxOIUXNBVhO_gNcdjFGwW9Fsr5akcWTwiRChuOu5AOY8EdtEzhYef6NJt0u6AHyRVtCJd_OPoMLOvtw4IufmkN_fcBBuHxZlDVWrmBgJYGOdgaIbLt__dUQHGA4utGrQrIpcFLMuDFmFhR1gEFqD1-4edRKF1mIAPyTcq_QAyDvE8Lpbz10VldH-SP4qMXO83RIIG_Z1LT7Y4k-khHST-bGGhD6Vq5L"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PackagesSection = ({ onSelect, language }: { onSelect: (plan: { destination: string, budget: number, months: number }) => void, language: "tr" | "en" }) => {
  const t = translations[language].packages;
  return (
    <section id="rotalar" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary font-headline mb-2">{t.title}</h2>
            <p className="text-on-surface-variant">{t.subtitle}</p>
          </div>
          <button className="text-primary font-bold border-b-2 border-primary pb-1">{t.seeAll}</button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.items.map((pkg, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-2xl transition-all border border-transparent hover:border-outline-variant/20">
              <div className="h-64 overflow-hidden relative">
                <img 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src={pkg.img}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-secondary">12 {translations[language].common.installments}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-secondary font-headline mb-2">{pkg.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{pkg.desc}</p>
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-6">
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{t.monthly}</p>
                    <p className="text-3xl font-black text-primary">{pkg.price}<span className="text-sm font-medium">/{translations[language].common.monthAbbr}</span></p>
                  </div>
                  <button 
                    onClick={() => {
                      const budget = parseInt(pkg.price.replace(/[^0-9]/g, '')) * 12;
                      onSelect({ destination: pkg.title, budget, months: 12 });
                    }}
                    className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustSection = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].trust;

  return (
    <section id="guvenlik" className="py-16 border-t border-outline-variant/20 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <Landmark className="w-10 h-10 text-secondary" />
              <span className="font-bold text-xl font-headline tracking-tighter text-secondary">{t.bank}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-10 h-10 text-secondary" />
              <span className="font-bold text-xl font-headline tracking-tighter text-secondary">{t.ssl}</span>
            </div>
            <div className="flex items-center gap-2 text-3xl font-bold italic font-headline tracking-tighter text-secondary">VISA</div>
            <div className="flex items-center gap-2 text-3xl font-bold italic font-headline tracking-tighter text-secondary">Mastercard</div>
          </div>
          <div className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary">{t.payment}</p>
              <p className="text-xs text-on-surface-variant">{t.encryption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SavingPlan = ({ onBack, onStartPlan, language, initialPlan }: { 
  onBack: () => void, 
  onStartPlan: (plan: { destination: string, budget: number, months: number }) => void, 
  language: "tr" | "en",
  initialPlan?: { destination: string, budget: number, months: number } | null
}) => {
  const t = translations[language].planner;
  const [budget, setBudget] = useState(initialPlan?.budget || 1000);
  const [months, setMonths] = useState(initialPlan?.months || 12);
  const [destination, setDestination] = useState(initialPlan?.destination || translations[language].planner.destinations.maldives);

  const monthlyAmount = Math.round(budget / months);

  return (
    <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-outline-variant/20 overflow-hidden"
      >
        <div className="bg-primary p-8 text-on-primary">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold opacity-80 hover:opacity-100 mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> {t.back}
          </button>
          <h2 className="text-3xl font-extrabold font-headline mb-2">{t.title}</h2>
          <p className="opacity-80">{t.subtitle}</p>
        </div>

        <div className="p-8 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">{t.destination}</label>
                <select 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-secondary font-medium focus:ring-2 focus:ring-primary"
                >
                  <option value={translations[language].planner.destinations.maldives}>{translations[language].planner.destinations.maldives}</option>
                  <option value={translations[language].planner.destinations.bali}>{translations[language].planner.destinations.bali}</option>
                  <option value={translations[language].planner.destinations.santorini}>{translations[language].planner.destinations.santorini}</option>
                  <option value={translations[language].planner.destinations.phuket}>{translations[language].planner.destinations.phuket}</option>
                  <option value={translations[language].planner.destinations.rome}>{translations[language].planner.destinations.rome}</option>
                  <option value={translations[language].planner.destinations.london}>{translations[language].planner.destinations.london}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">{t.budget} ($)</label>
                <input 
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xl font-black text-primary mt-2">
                  <span>$50</span>
                  <span className="bg-primary/10 px-4 py-1 rounded-lg">${budget}</span>
                  <span>$5.000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">{t.duration} ({t.month})</label>
                <div className="grid grid-cols-3 gap-3">
                  {[6, 12, 18].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        months === m 
                        ? "bg-primary text-white shadow-lg" 
                        : "bg-surface-container-low text-secondary hover:bg-surface-container-high"
                      }`}
                    >
                      {m} {t.month}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-6 border border-outline-variant/20">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{t.monthlyAmount}</p>
                <p className="text-5xl font-black text-primary">${monthlyAmount}</p>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{t.target}:</span>
                  <span className="font-bold text-secondary">{destination}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{t.term}:</span>
                  <span className="font-bold text-secondary">{months} {t.month}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{t.total}:</span>
                  <span className="font-bold text-secondary">${budget}</span>
                </div>
              </div>
              <button 
                onClick={() => onStartPlan({ destination, budget, months })}
                className="w-full bg-secondary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary transition-colors active:scale-95"
              >
                {t.start}
              </button>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex gap-4 items-start">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <span className="font-bold text-primary">{t.secure}:</span> {t.secureDesc}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Login = ({ onBack, onSignUp, language }: { onBack: () => void, onSignUp: () => void, language: "tr" | "en" }) => {
  const t = translations[language].signup;
  const common = translations[language].common;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className="pt-40 pb-20 px-6 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-2xl border border-outline-variant/10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-secondary font-headline mb-2">{common.login}</h2>
          <p className="text-on-surface-variant text-sm">TatilFinans hesabınıza giriş yapın</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant/30 py-3.5 rounded-xl font-bold text-secondary hover:bg-surface-container-low transition-all active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Google ile Giriş Yap
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant/20"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">veya</span>
            <div className="flex-grow border-t border-outline-variant/20"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase">{t.email}</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                placeholder={t.emailPlaceholder} 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase">{t.password}</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                placeholder="••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Giriş Yapılıyor..." : common.login}
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant">
            Hesabınız yok mu? <button onClick={onSignUp} className="text-primary font-bold hover:underline">Üye Ol</button>
          </p>
          
          <button 
            onClick={onBack}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-primary transition-colors mt-4"
          >
            Anasayfaya Dön
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const SignUp = ({ type = "individual", plan, onBack, onLogin, language }: { type?: "individual" | "corporate", plan: { destination: string, budget: number, months: number } | null, onBack: () => void, onLogin: () => void, language: "tr" | "en" }) => {
  const t = translations[language].signup;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    taxNumber: "",
    taxOffice: "",
    authorizedPerson: "",
    tcNo: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const profileData: any = {
        uid: user.uid,
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        type: type,
        createdAt: Timestamp.now(),
        role: "user"
      };

      if (type === "corporate") {
        profileData.companyName = formData.companyName;
        profileData.taxNumber = formData.taxNumber;
        profileData.taxOffice = formData.taxOffice;
        profileData.authorizedPerson = formData.authorizedPerson;
      } else {
        profileData.tcNo = formData.tcNo;
      }

      if (plan) {
        profileData.activePlan = {
          ...plan,
          startDate: Timestamp.now(),
          status: "active"
        };
      }

      await setDoc(doc(db, "users", user.uid), profileData);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload(); // Reload to trigger onAuthStateChanged and view update
      }, 2000);
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-bold text-primary mb-6"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> {t.back}
            </button>
            <h2 className="text-4xl font-extrabold text-secondary font-headline mb-4">
              {type === "corporate" ? t.corporateTitle : t.individualTitle}
            </h2>
            <p className="text-on-surface-variant text-lg">
              {type === "corporate" ? t.corporateSubtitle : t.subtitle}
            </p>
          </div>

          {plan && (
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">{t.summary}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-black text-secondary">{plan.destination}</p>
                  <p className="text-sm text-on-surface-variant">{plan.months} {t.month}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-primary">${Math.round(plan.budget / plan.months)}<span className="text-sm font-medium">/{translations[language].common.monthAbbr}</span></p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, text: t.security },
              { icon: <CheckCircle2 className="w-5 h-5" />, text: t.cancel },
              { icon: <Bell className="w-5 h-5" />, text: t.alerts }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-secondary font-medium">
                <div className="text-primary">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-outline-variant/10"
        >
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-secondary">{t.success}</h3>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              {type === "corporate" && (
                <div className="space-y-4 pb-4 border-b border-outline-variant/10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase">{t.companyName}</label>
                    <input 
                      required
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                      placeholder="TatilFinans Teknolojileri A.Ş." 
                      type="text" 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase">{t.taxNumber}</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                        placeholder="1234567890" 
                        type="text" 
                        value={formData.taxNumber}
                        onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase">{t.taxOffice}</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                        placeholder="Ümraniye" 
                        type="text" 
                        value={formData.taxOffice}
                        onChange={(e) => setFormData({...formData, taxOffice: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase">{t.authorizedPerson}</label>
                    <input 
                      required
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                      placeholder={t.firstNamePlaceholder + " " + t.lastNamePlaceholder} 
                      type="text" 
                      value={formData.authorizedPerson}
                      onChange={(e) => setFormData({...formData, authorizedPerson: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.firstName}</label>
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                    placeholder={t.firstNamePlaceholder} 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.lastName}</label>
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                    placeholder={t.lastNamePlaceholder} 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              {type === "individual" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.tcNo}</label>
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                    placeholder="12345678901" 
                    type="text" 
                    value={formData.tcNo}
                    onChange={(e) => setFormData({...formData, tcNo: e.target.value})}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.email}</label>
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                    placeholder={t.emailPlaceholder} 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.phone}</label>
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                    placeholder="05XX XXX XX XX" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">{t.password}</label>
                <input 
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" 
                  placeholder="••••••••" 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="flex items-start gap-3">
                <input required className="mt-1 accent-primary" type="checkbox" id="terms" />
                <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                  {language === "tr" ? (
                    <>
                      <a className="text-primary font-bold hover:underline" href="#">{t.terms}</a> {t.and} <a className="text-primary font-bold hover:underline" href="#">{t.privacy}</a>'nı {t.agreeText}
                    </>
                  ) : (
                    <>
                      {t.agreeText} <a className="text-primary font-bold hover:underline" href="#">{t.terms}</a> {t.and} <a className="text-primary font-bold hover:underline" href="#">{t.privacy}</a>.
                    </>
                  )}
                </label>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                ) : t.submit}
              </button>
              <p className="text-center text-sm text-on-surface-variant">
                {t.hasAccount} <button onClick={onLogin} className="text-primary font-bold hover:underline">{t.login}</button>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const AboutPage = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].about;
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-secondary font-headline mb-6">{t.storyTitle}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {t.storyDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Trophy className="w-8 h-8" />, title: t.mission, desc: t.missionDesc },
            { icon: <Lightbulb className="w-8 h-8" />, title: t.vision, desc: t.visionDesc },
            { icon: <Users className="w-8 h-8" />, title: t.values, desc: t.valuesDesc }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black text-secondary font-headline">{t.whyTitle}</h2>
            <p className="text-on-surface-variant leading-relaxed">
              {t.whyDesc}
            </p>
          </div>
          <div className="flex-1">
            <img 
              src="https://picsum.photos/seed/travel/800/600" 
              alt="Travel" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ContactPage = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-secondary font-headline mb-6">{t.title}</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <Mail className="w-6 h-6" />, title: t.email, value: "destek@tatilfinans.com" },
              { icon: <Phone className="w-6 h-6" />, title: t.phone, value: "+90 532 585 25 26" },
              { icon: <MapPin className="w-6 h-6" />, title: t.address, value: "Fatih Sultan Mehmet Mah. Balkan Cad. No:62 34770 Ümraniye - İstanbul" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-1">{item.title}</p>
                  <p className="text-lg text-on-surface-variant">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-outline-variant/10">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-secondary">{t.success}</h3>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.nameLabel}</label>
                  <input required className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="Ahmet Yılmaz" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">{t.emailLabel}</label>
                  <input required className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="ahmet@ornek.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">{t.subjectLabel}</label>
                <input required className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder={t.subjectPlaceholder} type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">{t.messageLabel}</label>
                <textarea required className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary h-32 resize-none" placeholder={t.messagePlaceholder}></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
                {t.send}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CareerPage = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].career;
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-secondary font-headline mb-6">{t.title}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Frontend Developer", type: "Full-time", location: "Remote / İstanbul" },
            { title: "Travel Consultant", type: "Full-time", location: "İstanbul" },
            { title: "Product Designer", type: "Full-time", location: "Remote" },
            { title: "Marketing Specialist", type: "Full-time", location: "İstanbul" }
          ].map((job, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm flex justify-between items-center group hover:border-primary transition-all">
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">{job.title}</h3>
                <p className="text-sm text-on-surface-variant">{job.type} • {job.location}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-[3rem] p-12 text-center space-y-8">
          <h2 className="text-3xl font-black font-headline">{t.joinTitle}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.joinDesc}
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-container transition-all">
            hr@tatilfinans.com
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FAQPage = ({ language }: { language: "tr" | "en" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[language].faq;

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-secondary font-headline mb-6">{t.title}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.items.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-surface-container-low transition-colors"
              >
                <span className="font-bold text-secondary text-lg">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-primary transition-transform ${openIndex === i ? "rotate-90" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HelpCenterPage = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].help;
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
        <div className="bg-primary rounded-[3rem] p-12 text-center text-white space-y-8">
          <h1 className="text-4xl md:text-6xl font-black font-headline">{t.title}</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.placeholder}
              className="w-full bg-white/10 border-none rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <PlaneTakeoff />, title: t.categories.gettingStarted, count: 12 },
            { icon: <CreditCard />, title: t.categories.payments, count: 8 },
            { icon: <ShieldCheck />, title: t.categories.security, count: 5 },
            { icon: <Users />, title: t.categories.account, count: 10 }
          ].map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-outline-variant/20 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{cat.title}</h3>
              <p className="text-sm text-on-surface-variant">{cat.count} {t.articleCount}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-surface-container-low p-10 rounded-[2.5rem] space-y-6">
            <h2 className="text-2xl font-bold text-secondary">{t.popularTitle}</h2>
            <ul className="space-y-4">
              {t.popularArticles.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary hover:text-primary cursor-pointer group">
                  <BookOpen className="w-4 h-4 opacity-50" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-secondary text-white p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-6">
            <MessageSquare className="w-12 h-12 text-primary" />
            <h2 className="text-2xl font-bold">{t.stillNeedHelp}</h2>
            <p className="text-slate-400">{t.supportDesc}</p>
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-container transition-all">
              {t.liveSupport}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BlogPage = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].blog;
  const posts = t.posts.map((post, i) => ({
    ...post,
    img: `https://picsum.photos/seed/blog${i + 1}/800/600`,
    isPopular: i < 3 // First 3 posts are popular for demo
  }));

  const popularPosts = posts.filter(p => p.isPopular);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-secondary font-headline mb-6">{t.title}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-outline-variant/20 hover:shadow-xl transition-all">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {post.isPopular && (
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        {t.popularTitle}
                      </div>
                    )}
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{post.date}</p>
                    <h3 className="text-2xl font-bold text-secondary font-headline group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{post.desc}</p>
                    <button className="flex items-center gap-2 text-primary font-bold pt-4">
                      {t.readMore} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                {t.popularTitle}
              </h2>
              <div className="space-y-6">
                {popularPosts.map((post, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-primary uppercase">{post.date}</p>
                      <h4 className="font-bold text-secondary text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <NewsletterForm language={language} variant="sidebar" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NewsletterForm = ({ language, variant = "footer" }: { language: "tr" | "en", variant?: "footer" | "sidebar" }) => {
  const t = translations[language].footer;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  if (variant === "sidebar") {
    return (
      <div className="bg-secondary text-white p-8 rounded-[2.5rem] space-y-6">
        <h3 className="text-xl font-bold">{t.newsletter}</h3>
        <p className="text-sm text-slate-400">{t.newsletterDesc}</p>
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full bg-white/10 border-none rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-primary"
            disabled={status !== "idle"}
            required
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-lg disabled:opacity-50"
            disabled={status !== "idle"}
          >
            {status === "loading" ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
          {status === "success" && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-xs text-primary font-bold mt-2"
            >
              {language === "tr" ? "Kaydınız alındı!" : "Subscribed!"}
            </motion.p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="col-span-2 lg:col-span-2">
      <h4 className="font-bold text-white mb-6 font-headline uppercase text-xs tracking-widest">{t.newsletter}</h4>
      <p className="text-slate-400 text-sm mb-4">{t.newsletterDesc}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-800 border-none rounded-xl px-4 py-2 text-white text-sm focus:ring-2 focus:ring-primary w-full" 
          placeholder={t.emailPlaceholder}
          disabled={status !== "idle"}
          required
        />
        <button 
          type="submit"
          className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors min-w-[80px] flex items-center justify-center"
          disabled={status !== "idle"}
        >
          {status === "loading" ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            t.send
          )}
        </button>
      </form>
      {status === "success" && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs text-primary font-bold mt-2"
        >
          {language === "tr" ? "Kaydınız başarıyla alındı!" : "Successfully subscribed!"}
        </motion.p>
      )}
    </div>
  );
};

const Footer = ({ onNavigate, language }: { onNavigate: (view: any) => void, language: "tr" | "en" }) => {
  const t = translations[language].footer;
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 max-w-7xl mx-auto w-full">
        <div className="col-span-2">
          <div 
            className="text-2xl font-black text-white mb-6 font-headline tracking-tighter cursor-pointer hover:text-primary transition-colors"
            onClick={() => onNavigate("landing")}
          >
            TatilFinans
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-8">
            {t.desc}
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 font-headline uppercase text-xs tracking-widest">{t.company}</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate("about")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.about}</button></li>
            <li><button onClick={() => onNavigate("contact")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.contact}</button></li>
            <li><button onClick={() => onNavigate("career")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.career}</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 font-headline uppercase text-xs tracking-widest">{t.support}</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate("faq")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.faq}</button></li>
            <li><button onClick={() => onNavigate("help")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.help}</button></li>
            <li><button onClick={() => onNavigate("blog")} className="text-slate-400 hover:text-white transition-colors text-sm">{t.blog}</button></li>
          </ul>
        </div>
        <NewsletterForm language={language} />
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">{t.rights}</p>
        <div className="flex gap-8">
          <a className="text-slate-500 hover:text-white text-xs" href="#">{t.terms}</a>
          <a className="text-slate-500 hover:text-white text-xs" href="#">{t.privacy}</a>
        </div>
      </div>
    </footer>
  );
};

const UserDashboard = ({ language }: { language: "tr" | "en" }) => {
  const t = language === "tr" ? {
    title: "Bireysel Panelim",
    welcome: "Hoş geldin,",
    activePlan: "Aktif Birikim Planın",
    totalSaved: "Toplam Birikim",
    monthlyTarget: "Aylık Hedef",
    remaining: "Kalan Süre",
    transactions: "Son İşlemler",
    noPlan: "Henüz aktif bir planın bulunmuyor.",
    startPlan: "Hemen Plan Oluştur"
  } : {
    title: "My Individual Dashboard",
    welcome: "Welcome,",
    activePlan: "Your Active Saving Plan",
    totalSaved: "Total Saved",
    monthlyTarget: "Monthly Target",
    remaining: "Remaining Time",
    transactions: "Recent Transactions",
    noPlan: "You don't have an active plan yet.",
    startPlan: "Create a Plan Now"
  };

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh]">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-secondary font-headline mb-2">{t.title}</h1>
        <p className="text-on-surface-variant">{t.welcome} {auth.currentUser?.displayName}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/20">
            <h2 className="text-xl font-bold text-secondary mb-6">{t.activePlan}</h2>
            <div className="flex items-center justify-center py-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                  <Wallet className="w-8 h-8" />
                </div>
                <p className="text-on-surface-variant">{t.noPlan}</p>
                <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-container transition-colors">
                  {t.startPlan}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/20">
            <h2 className="text-xl font-bold text-secondary mb-6">{t.transactions}</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary">Aylık Birikim Ödemesi</p>
                      <p className="text-xs text-on-surface-variant">24 Mart 2026</p>
                    </div>
                  </div>
                  <p className="font-black text-primary">+$150.00</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-secondary text-white p-8 rounded-3xl shadow-xl">
            <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-2">{t.totalSaved}</p>
            <p className="text-5xl font-black mb-6">$0.00</p>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">{t.monthlyTarget}</span>
                <span className="font-bold">$0.00</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-0"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/20">
            <h3 className="font-bold text-secondary mb-4">Hızlı Destek</h3>
            <p className="text-sm text-on-surface-variant mb-6">Planınla ilgili bir sorun mu var? Hemen bize ulaş.</p>
            <button className="w-full py-3 bg-white border border-outline-variant/30 rounded-xl font-bold text-secondary hover:bg-surface-container-high transition-colors">
              Müşteri Hizmetleri
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const CorporateDashboard = ({ language }: { language: "tr" | "en" }) => {
  const t = language === "tr" ? {
    title: "Kurumsal Panel",
    welcome: "Hoş geldiniz,",
    companyInfo: "Firma Bilgileri",
    employeePlans: "Çalışan Birikim Planları",
    totalCorporateSaved: "Toplam Kurumsal Birikim",
    activeEmployees: "Aktif Çalışan Sayısı",
    managePlans: "Planları Yönet",
    addEmployee: "Yeni Çalışan Ekle",
    reports: "Raporlar"
  } : {
    title: "Corporate Dashboard",
    welcome: "Welcome,",
    companyInfo: "Company Information",
    employeePlans: "Employee Saving Plans",
    totalCorporateSaved: "Total Corporate Savings",
    activeEmployees: "Active Employees",
    managePlans: "Manage Plans",
    addEmployee: "Add New Employee",
    reports: "Reports"
  };

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh]">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary font-headline mb-2">{t.title}</h1>
          <p className="text-on-surface-variant">{t.welcome} {auth.currentUser?.displayName}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-highest text-secondary px-6 py-2.5 rounded-xl font-bold hover:bg-surface-container-high transition-all flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t.reports}
          </button>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-container transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t.addEmployee}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-outline-variant/10">
          <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">{t.activeEmployees}</p>
          <p className="text-3xl font-black text-secondary">0</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-outline-variant/10">
          <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">{t.totalCorporateSaved}</p>
          <p className="text-3xl font-black text-primary">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-outline-variant/10">
          <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Bu Ayki Ödemeler</p>
          <p className="text-3xl font-black text-secondary">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-outline-variant/10">
          <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Bekleyen Onaylar</p>
          <p className="text-3xl font-black text-error">0</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-outline-variant/20 overflow-hidden">
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-secondary">{t.employeePlans}</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Çalışan ara..." 
              className="pl-10 pr-4 py-2 bg-surface-container-low rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Çalışan</th>
                <th className="px-8 py-4">Plan</th>
                <th className="px-8 py-4">Biriken</th>
                <th className="px-8 py-4">Durum</th>
                <th className="px-8 py-4">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-8 py-12 text-center text-on-surface-variant italic" colSpan={5}>
                  Henüz kayıtlı çalışan bulunmuyor.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const AdminPanel = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].admin;
  const [activeTab, setActiveTab] = useState<"dashboard" | "deals" | "users" | "plans">("dashboard");
  const [deals, setDeals] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubDeals = onSnapshot(query(collection(db, "deals"), orderBy("createdAt", "desc")), (snap) => {
      setDeals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "deals"));

    const unsubUsers = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snap) => {
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "users"));

    const unsubPlans = onSnapshot(query(collection(db, "plans"), orderBy("createdAt", "desc")), (snap) => {
      setPlans(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, "plans"));

    return () => {
      unsubDeals();
      unsubUsers();
      unsubPlans();
    };
  }, []);

  const stats = {
    totalSavings: plans.reduce((acc, p) => acc + (p.currentSavings || 0), 0),
    activePlans: plans.filter(p => p.status === "active").length,
    totalUsers: users.length,
    totalBudget: plans.reduce((acc, p) => acc + (p.totalBudget || 0), 0)
  };

  const handleDeleteDeal = async (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await deleteDoc(doc(db, "deals", id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `deals/${id}`);
      }
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.totalSavings, value: `$${stats.totalSavings.toLocaleString()}`, icon: <Wallet className="w-6 h-6" />, color: "bg-blue-500" },
          { label: t.activePlans, value: stats.activePlans, icon: <Activity className="w-6 h-6" />, color: "bg-green-500" },
          { label: t.totalUsers, value: stats.totalUsers, icon: <Users className="w-6 h-6" />, color: "bg-purple-500" },
          { label: "Target Volume", value: `$${stats.totalBudget.toLocaleString()}`, icon: <TrendingUp className="w-6 h-6" />, color: "bg-orange-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-2xl text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-secondary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <h3 className="text-xl font-bold text-secondary mb-6">{t.recentActivity}</h3>
          <div className="space-y-4">
            {plans.slice(0, 5).map((plan, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <PlaneTakeoff className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">{plan.destination}</p>
                    <p className="text-xs text-on-surface-variant">{plan.userId.substring(0, 8)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary text-sm">${plan.totalBudget}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">{plan.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <h3 className="text-xl font-bold text-secondary mb-6">User Growth</h3>
          <div className="h-64 flex items-end gap-2">
            {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-secondary">{t.deals}</h3>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" /> {t.addDeal}
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant/20">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t.title}</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t.category}</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t.price}</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={deal.imageUrl || "https://picsum.photos/seed/deal/100/100"} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="font-bold text-secondary text-sm">{deal.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">{deal.category}</span>
                </td>
                <td className="px-6 py-4 font-black text-primary">${deal.price}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteDeal(deal.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {[
            { id: "dashboard", label: t.dashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: "deals", label: t.deals, icon: <AlarmClock className="w-5 h-5" /> },
            { id: "users", label: t.users, icon: <Users className="w-5 h-5" /> },
            { id: "plans", label: t.plans, icon: <Wallet className="w-5 h-5" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-8 mt-8 border-t border-outline-variant/20">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-on-surface-variant hover:bg-surface-container-low transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" && renderDashboard()}
                {activeTab === "deals" && renderDeals()}
                {activeTab === "users" && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10">
                    <h3 className="text-2xl font-bold text-secondary mb-6">{t.users}</h3>
                    <div className="space-y-4">
                      {users.map(u => (
                        <div key={u.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {u.email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-secondary">{u.email}</p>
                              <p className="text-xs text-on-surface-variant">{u.role}</p>
                            </div>
                          </div>
                          <span className="text-xs text-on-surface-variant">{u.createdAt?.toDate().toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "plans" && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10">
                    <h3 className="text-2xl font-bold text-secondary mb-6">{t.plans}</h3>
                    <div className="space-y-4">
                      {plans.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                          <div>
                            <p className="font-bold text-secondary">{p.destination}</p>
                            <p className="text-xs text-on-surface-variant">${p.monthlyAmount}/mo • {p.durationMonths} months</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-primary">${p.totalBudget}</p>
                            <p className="text-[10px] font-bold text-on-surface-variant uppercase">{p.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<"landing" | "saving-plan" | "sign-up" | "login" | "about" | "contact" | "career" | "faq" | "help" | "blog" | "admin">("landing");
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [signUpType, setSignUpType] = useState<"individual" | "corporate">("individual");
  const [selectedPlan, setSelectedPlan] = useState<{ destination: string, budget: number, months: number } | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userType, setUserType] = useState<"individual" | "corporate" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check or create user profile
        const userRef = doc(db, "users", u.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setRole(userSnap.data().role);
            setUserType(userSnap.data().type);
          } else {
            // Default role is user
            const newRole = u.email === "bulent.bulu7@gmail.com" ? "admin" : "user";
            const newType = "individual";
            await setDoc(userRef, {
              uid: u.uid,
              email: u.email,
              firstName: u.displayName?.split(" ")[0] || "",
              lastName: u.displayName?.split(" ").slice(1).join(" ") || "",
              type: newType,
              role: newRole,
              createdAt: Timestamp.now()
            });
            setRole(newRole);
            setUserType(newType);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${u.uid}`);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      if (view === "landing" && window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [view]);

  const handleStartPlan = (plan: { destination: string, budget: number, months: number }) => {
    setSelectedPlan(plan);
    if (user) {
      navigateTo("dashboard");
    } else {
      setSignUpType("individual");
      navigateTo("sign-up");
    }
  };

  const navigateTo = (newView: any) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear hash when navigating to a new view
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }

    switch (view) {
      case "admin":
        return role === "admin" ? <AdminPanel language={language} /> : <div className="pt-32 text-center">Unauthorized</div>;
      case "dashboard":
        if (!user) return <Login onBack={() => setView("landing")} onSignUp={() => setView("sign-up")} language={language} />;
        return userType === "corporate" ? <CorporateDashboard language={language} /> : <UserDashboard language={language} />;
      case "login":
        return (
          <Login 
            onBack={() => setView("landing")} 
            onSignUp={() => setView("sign-up")} 
            language={language} 
          />
        );
      case "sign-up":
        return (
          <SignUp 
            type={signUpType}
            plan={selectedPlan} 
            onBack={() => setView(selectedPlan ? "saving-plan" : "landing")} 
            onLogin={() => setView("login")}
            language={language} 
          />
        );
      case "saving-plan":
        return <SavingPlan onBack={() => setView("landing")} onStartPlan={handleStartPlan} language={language} initialPlan={selectedPlan} />;
      case "about":
        return <AboutPage language={language} />;
      case "contact":
        return <ContactPage language={language} />;
      case "career":
        return <CareerPage language={language} />;
      case "faq":
        return <FAQPage language={language} />;
      case "help":
        return <HelpCenterPage language={language} />;
      case "blog":
        return <BlogPage language={language} />;
      default:
        return (
          <main>
            <Hero onStart={() => {
              setSelectedPlan(null);
              setView("saving-plan");
            }} language={language} />
            <DealsSection onSelect={(plan) => {
              setSelectedPlan(plan);
              setView("saving-plan");
            }} language={language} />
            <ProcessSection language={language} />
            <FeaturesBento language={language} />
            <PackagesSection onSelect={(plan) => {
              setSelectedPlan(plan);
              setView("saving-plan");
            }} language={language} />
            <TrustSection language={language} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar 
        onNavigate={() => setView("landing")} 
        onStart={(type) => {
          if (type) setSignUpType(type);
          setSelectedPlan(null);
          setView("sign-up");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoginClick={() => setView("login")}
        language={language}
        setLanguage={setLanguage}
        user={user}
        role={role}
        onAdminClick={() => setView("admin")}
        onDashboardClick={() => setView("dashboard")}
      />
      <div className="min-h-[80vh]">
        {renderView()}
      </div>
      <Footer onNavigate={navigateTo} language={language} />

      <button 
        onClick={() => setIsCalcOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#1a637a] text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95"
      >
        <Calculator className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isCalcOpen && (
          <CalculatorModal 
            isOpen={isCalcOpen} 
            onClose={() => setIsCalcOpen(false)} 
            onStart={(plan) => {
              setIsCalcOpen(false);
              setSelectedPlan({
                destination: translations[language].planner.destinations.maldives,
                budget: plan.target,
                months: plan.months
              });
              setSignUpType("individual");
              setView("sign-up");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
