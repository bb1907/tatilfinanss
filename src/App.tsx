import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Wallet, 
  PlaneTakeoff, 
  Timer, 
  AlarmClock, 
  Bell, 
  BellRing, 
  Map as MapIcon, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
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
  ExternalLink
} from "lucide-react";

const translations = {
  tr: {
    nav: { howItWorks: "Nasıl Çalışır", routes: "Rotalar", deals: "Fırsatlar", security: "Güvenlik", startNow: "Hemen Başla" },
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
      lastRooms: "Son 3 Oda!", 
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
    trust: { bank: "BANKA ORTAĞI", ssl: "SSL GÜVENLİ", payment: "GÜVENLİ ÖDEME", encryption: "256-Bit Uçtan Uca Şifreleme" },
    planner: { title: "Birikim Planlayıcı", subtitle: "Hayalindeki tatil için bütçeni ve vadenı belirle.", back: "Geri Dön", destination: "Nereye Gitmek İstersin?", budget: "Toplam Bütçe", duration: "Birikim Süresi", monthlyAmount: "AYLIK BİRİKİM TUTARI", start: "Planı Başlat", secure: "Güvenli Birikim", secureDesc: "Biriktirdiğiniz tutarlar TatilFinans güvencesiyle korunur. İstediğiniz zaman planınızı iptal edebilir veya değiştirebilirsiniz.", month: "Ay", target: "Hedef", term: "Vade", total: "Toplam", destinations: { istanbul: "İstanbul", maldives: "Maldivler", bali: "Bali", santorini: "Santorini", phuket: "Phuket", rome: "Roma", london: "Londra", ankara: "Ankara" } },
    signup: { back: "Planı Düzenle", title: "Aramıza Hoş Geldin!", subtitle: "Hayallerine bir adım daha yaklaştın. Planını kaydetmek ve biriktirmeye başlamak için hesabını oluştur.", summary: "SEÇİLEN PLAN ÖZETİ", month: "Ay Vade", security: "Uluslararası Güvenlik Standartları", cancel: "Dilediğin Zaman İptal Hakkı", alerts: "Akıllı Fiyat Takip Uyarıları", firstName: "Ad", lastName: "Soyad", email: "E-posta", password: "Şifre", terms: "Kullanım Koşulları", privacy: "Gizlilik Politikası", submit: "Hesabımı Oluştur ve Başla", hasAccount: "Zaten hesabın var mı?", login: "Giriş Yap", firstNamePlaceholder: "Ahmet", lastNamePlaceholder: "Yılmaz", emailPlaceholder: "ahmet@ornek.com", agreeText: "okudum, onaylıyorum.", and: "ve" },
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
    common: { monthAbbr: "ay", installments: "TAKSİT", interestFree: "FAİZSİZ", debtFree: "BORÇSUZ", noCommission: "KOMİSYONSUZ", creditCard: "Kredi Kartı", debitCard: "ATM (Debit) Kartı", bankTransfer: "EFT / Havale" }
  },
  en: {
    nav: { howItWorks: "How it Works", routes: "Routes", deals: "Deals", security: "Security", startNow: "Start Now" },
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
    trust: { bank: "BANK PARTNER", ssl: "SSL SECURE", payment: "SECURE PAYMENT", encryption: "256-Bit End-to-End Encryption" },
    planner: { title: "Savings Planner", subtitle: "Determine your budget and term for your dream vacation.", back: "Back", destination: "Where Do You Want to Go?", budget: "Total Budget", duration: "Savings Duration", monthlyAmount: "MONTHLY SAVINGS AMOUNT", start: "Start Plan", secure: "Secure Savings", secureDesc: "Your savings are protected under TatilFinans guarantee. You can cancel or change your plan at any time.", month: "Months", target: "Target", term: "Term", total: "Total", destinations: { istanbul: "Istanbul", maldives: "Maldives", bali: "Bali", santorini: "Santorini", phuket: "Phuket", rome: "Rome", london: "London", ankara: "Ankara" } },
    signup: { back: "Edit Plan", title: "Welcome to the Family!", subtitle: "You are one step closer to your dreams. Create your account to save your plan and start saving.", summary: "SELECTED PLAN SUMMARY", month: "Months Term", security: "International Security Standards", cancel: "Right to Cancel Anytime", alerts: "Smart Price Tracking Alerts", firstName: "First Name", lastName: "Last Name", email: "Email", password: "Password", terms: "Terms of Use", privacy: "Privacy Policy", submit: "Create My Account and Start", hasAccount: "Already have an account?", login: "Log In", firstNamePlaceholder: "John", lastNamePlaceholder: "Doe", emailPlaceholder: "john@example.com", agreeText: "I have read and agree to the", and: "and" },
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
    common: { monthAbbr: "mo", installments: "INSTALLMENTS", interestFree: "INTEREST-FREE", debtFree: "DEBT-FREE", noCommission: "NO COMMISSION", creditCard: "Credit Card", debitCard: "Debit Card", bankTransfer: "Bank Transfer" }
  }
};

const Navbar = ({ onNavigate, onStart, language, setLanguage }: { 
  onNavigate?: () => void, 
  onStart?: () => void,
  language: "tr" | "en",
  setLanguage: (lang: "tr" | "en") => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].nav;

  const navLinks = [
    { name: t.howItWorks, href: "#nasil-calisir" },
    { name: t.routes, href: "#rotalar" },
    { name: t.deals, href: "#firsatlar" },
    { name: t.security, href: "#guvenlik" },
  ];

  const handleLogoClick = () => {
    if (onNavigate) onNavigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartClick = () => {
    if (onStart) onStart();
    setIsOpen(false);
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
          <button 
            onClick={onStart}
            className="hidden sm:block bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 duration-150 ease-in-out shadow-md shadow-primary/10"
          >
            {t.startNow}
          </button>
          
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
          <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
            <button 
              onClick={handleStartClick}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg"
            >
              {t.startNow}
            </button>
            <div className="flex justify-center gap-4 text-sm font-bold">
              <span 
                onClick={() => setLanguage("tr")}
                className={`${language === "tr" ? "text-primary" : "text-slate-500"} cursor-pointer`}
              >
                TR
              </span>
              <span className="text-slate-300">|</span>
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

const DealsSection = ({ language }: { language: "tr" | "en" }) => {
  const t = translations[language].deals;
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
              { route: `${translations[language].planner.destinations.istanbul} ➔ ${translations[language].planner.destinations.london}`, date: language === "tr" ? "Gidiş-Dönüş • 12-18 Nisan" : "Round Trip • April 12-18", price: "$189", tag: t.priceDropped, tagColor: "bg-green-100 text-green-700" },
              { route: `${translations[language].planner.destinations.ankara} ➔ ${translations[language].planner.destinations.rome}`, date: language === "tr" ? "Tek Yön • 5 Mayıs" : "One Way • May 5", price: "$85", tag: t.tracking, tagColor: "bg-primary/10 text-primary" }
            ].map((flight, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-bold text-secondary">{flight.route}</p>
                    <p className="text-xs text-on-surface-variant">{flight.date}</p>
                  </div>
                  <span className={`px-2 py-1 ${flight.tagColor} text-[10px] font-bold rounded uppercase`}>{flight.tag}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-on-surface-variant">{t.currentPrice}</p>
                    <p className="text-2xl font-black text-primary">{flight.price}</p>
                  </div>
                  <button className="p-2 bg-white rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
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
                <div className="h-48 overflow-hidden relative">
                  <img 
                    alt="Phuket Fırsatı" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1N1cuzJdU1Bfm8AXc1Id51caitRWRUupzncnO0fISRXshFBsBUDPfjl54oFAVOtF7E32HAVTZHiaZ-pDjLIVIP_YPkXTbTNZw7cIX8_NY3M5L3N653XsGatW1OLU6UhsmkVHZ7O-Nn0hUMo5XTDRDu7jW0r5n2MMKiY6qumrbwkOJX_v10k2DYu2-iHK7pVo90aYB09dK30jjcdXsjjRIZ3bzrdoNIJE18MJXrOGlCNrd1thsy0q9OJ4v99A5aTruqwD9jh3aczp"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-error text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                      <AlarmClock className="w-3 h-3" /> 02:14:55
                    </span>
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">{t.limitedTime}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-secondary mb-1">Phuket {t.getaway}</h4>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    7 {t.nights} • {t.allInclusive} • {t.flightIncluded}
                  </p>
                  <div className="bg-primary/5 p-3 rounded-xl mb-4 border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                      {t.saveFirst}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">$100</span>
                      <span className="text-xs font-semibold text-primary-container">/{translations[language].common.monthAbbr} (12 {translations[language].common.installments})</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-secondary text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors">{t.reserve}</button>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    alt="Santorini Fırsatı" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI4l9cTtGcYa5XJltegPcaQx1VP8jshm4CJHQST9XaJY33eEZ400JtxIHZOcUIjOQb695tG3Xq2ohyxxCJEXZqFitKv1mppbLbnzctW1B9b3MNk32nV7VTkKUE0cgKxudFpICOjnvjVAfeAlqDyjOTKP6WDPB6DqSVQSE4zwcvKKDe0r40SNn03K6AhxqXGjRczlfVSZSz93lys1BTmE_zi7O-WpqY_-qvsGz95vw9SD12yZmFY64vJ3U7wLSD4m3g9Cya_n6HoTXR"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">{t.popular}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-error">{t.lastRooms}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-secondary mb-1">{t.breeze}: Santorini</h4>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    4 {t.nights} • {t.boutiqueHotel} • {t.breakfastIncluded}
                  </p>
                  <div className="bg-primary/5 p-3 rounded-xl mb-4 border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                      {t.stepIn}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">$120</span>
                      <span className="text-xs font-semibold text-primary-container">/{translations[language].common.monthAbbr} (12 {translations[language].common.installments})</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-secondary text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors">{t.catch}</button>
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

const PackagesSection = ({ onSelect, language }: { onSelect: () => void, language: "tr" | "en" }) => {
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
                    onClick={onSelect}
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
    <section id="guvenlik" className="py-16 border-t border-outline-variant/20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex flex-wrap justify-center gap-12 grayscale">
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
          <div className="flex gap-4">
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

const SavingPlan = ({ onBack, onStartPlan, language }: { onBack: () => void, onStartPlan: (plan: { destination: string, budget: number, months: number }) => void, language: "tr" | "en" }) => {
  const t = translations[language].planner;
  const [budget, setBudget] = useState(2000);
  const [months, setMonths] = useState(12);
  const [destination, setDestination] = useState(translations[language].planner.destinations.maldives);

  const monthlyAmount = Math.round(budget / months);

  return (
    <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
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
                  min="500" 
                  max="10000" 
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xl font-black text-primary mt-2">
                  <span>$500</span>
                  <span className="bg-primary/10 px-4 py-1 rounded-lg">${budget}</span>
                  <span>$10.000</span>
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

const SignUp = ({ plan, onBack, language }: { plan: { destination: string, budget: number, months: number } | null, onBack: () => void, language: "tr" | "en" }) => {
  const t = translations[language].signup;
  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
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
            <h2 className="text-4xl font-extrabold text-secondary font-headline mb-4">{t.title}</h2>
            <p className="text-on-surface-variant text-lg">{t.subtitle}</p>
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">{t.firstName}</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder={t.firstNamePlaceholder} type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">{t.lastName}</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder={t.lastNamePlaceholder} type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase">{t.email}</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder={t.emailPlaceholder} type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase">{t.password}</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary" placeholder="••••••••" type="password" />
            </div>
            <div className="flex items-start gap-3">
              <input className="mt-1 accent-primary" type="checkbox" id="terms" />
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
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
              {t.submit}
            </button>
            <p className="text-center text-sm text-on-surface-variant">
              {t.hasAccount} <a className="text-primary font-bold hover:underline" href="#">{t.login}</a>
            </p>
          </form>
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
          <div className="text-2xl font-black text-white mb-6 font-headline tracking-tighter">TatilFinans</div>
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

export default function App() {
  const [view, setView] = useState<"landing" | "saving-plan" | "sign-up" | "about" | "contact" | "career" | "faq" | "help" | "blog">("landing");
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [selectedPlan, setSelectedPlan] = useState<{ destination: string, budget: number, months: number } | null>(null);

  useEffect(() => {
    if (view === "landing" && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [view]);

  const handleStartPlan = (plan: { destination: string, budget: number, months: number }) => {
    setSelectedPlan(plan);
    setView("sign-up");
  };

  const navigateTo = (newView: any) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (view) {
      case "sign-up":
        return <SignUp plan={selectedPlan} onBack={() => setView("saving-plan")} language={language} />;
      case "saving-plan":
        return <SavingPlan onBack={() => setView("landing")} onStartPlan={handleStartPlan} language={language} />;
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
            <Hero onStart={() => setView("saving-plan")} language={language} />
            <DealsSection language={language} />
            <ProcessSection language={language} />
            <FeaturesBento language={language} />
            <PackagesSection onSelect={() => setView("saving-plan")} language={language} />
            <TrustSection language={language} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar 
        onNavigate={() => setView("landing")} 
        onStart={() => setView("saving-plan")} 
        language={language}
        setLanguage={setLanguage}
      />
      {renderView()}
      <Footer onNavigate={navigateTo} language={language} />
    </div>
  );
}
