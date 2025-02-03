// locales/ar.ts
export default {
  playlist: {
    library: 'المكتبة',
    createFirstPlaylist: {
      title: 'أنشئ قائمة التشغيل الأولى الخاصة بك',
      description: 'الأمر سهل، فقط اضغط على الزر أعلاه.',
    },
    findPodcasts: {
      title: 'لنجد بعض البودكاست للمتابعة',
      description: 'سنبقيك على اطلاع بالحلقات الجديدة.',
    },
    createPlaylist: 'إنشاء',
    playlists: {
      title: 'قوائم التشغيل',
      errors: {
        loading: 'حدث خطأ أثناء تحميل قوائم التشغيل:',
      },
      imageAlt: 'صورة قائمة التشغيل {title}',
    },
  },
  header: {
    logoAlt: 'Speautyfayye',
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
    description: 'أعطِ اسمًا لقائمة التشغيل الخاصة بك وابدأ بإضافة المفضلة لديك',
    loading: 'جاري الإنشاء...',
    createPlaylist: 'إنشاء قائمة تشغيل',
    placeholder: 'أدخل اسم قائمة التشغيل...',
  },
  artists: {
    title: 'الموسيقيين الشعبيين',
    errors: {
      loading: 'حدث خطأ أثناء تحميل الموسيقيين:',
    },
  },
  albums: {
    title: 'ألبومات شعبية',
    errors: {
      loading: 'حدث خطأ أثناء تحميل الألبومات:',
    },
  },
} as const;
