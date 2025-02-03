// locales/ar.ts
export default {
  playlist: {
    library: 'المكتبة',
    createFirstPlaylist: {
      title: 'أنشئ قائمة تشغيلك',
      description: 'الأمر سهل، فقط انقر على الزر أعلاه.',
    },
    findPodcasts: {
      title: 'لنجد بعض البودكاست للمتابعة',
      description: 'سنبقيك على اطلاع بالحلقات الجديدة.',
    },
    createPlaylist: 'إنشاء',
    playlists: {
      title: 'قوائم التشغيل',
      errors: {
        loading: 'خطأ في تحميل قوائم التشغيل:',
      },
      imageAlt: 'صورة قائمة التشغيل {title}',
    },
  },
  header: {
    logoAlt: 'سبيوتيفاي',
    searchPlaceholder: 'بحث',
    login: 'تسجيل الدخول',
    close: 'إغلاق',
    navigation: {
      home: 'الرئيسية',
      library: 'المكتبة',
    },
  },
  createPlaylist: {
    title: 'إنشاء قائمة تشغيل جديدة',
    description: 'أعط اسماً لقائمة تشغيلك وابدأ في إضافة المفضلة لديك',
    loading: 'جاري الإنشاء...',
    createPlaylist: 'إنشاء قائمة تشغيل',
    placeholder: 'أدخل اسم قائمة التشغيل...',
  },
  artists: {
    title: 'الفنانون المشهورون',
    errors: {
      loading: 'خطأ في تحميل الفنانين:',
    },
  },
  albums: {
    title: 'الألبومات الشعبية',
    errors: {
      loading: 'خطأ في تحميل الألبومات:',
    },
  },
  searchPage: {
    error: 'خطأ في البحث:',
    results: 'نتائج البحث عن {query}',
    resultsCount: '{count} نتيجة',
    tracks: 'المقطوعات',
    albums: 'الألبومات',
    artists: 'الفنانون',
    playlists: 'قوائم التشغيل',
    categories: 'التصنيفات',
    duration: 'المدة:',
    artist: 'الفنان',
    album: 'الألبوم',
    category: 'التصنيف',
    playlist: 'قائمة التشغيل',
    track: 'المقطع',
    releaseDate: 'تاريخ الإصدار {releaseDate}',
    day: 'يوم',
    month: 'شهر',
    year: 'سنة',
    noResults: 'لم يتم العثور على نتائج لـ "{query}"',
    sortBy: 'ترتيب حسب:',
    durationText: 'المدة',
    releaseDateText: 'تاريخ الإصدار',
    alphabeticText: 'أبجدي',
    popularityText: 'الشعبية',
  },
} as const;
