/**
 * Ссылки и тексты, которых нет в конфиге панели Remnawave.
 * Меняются здесь, в одном месте — после правки нужна пересборка образа.
 */
export const BRAND = {
    logoSrc: '/assets/logo.png',

    links: {
        channel: 'https://t.me/vpnvtelegramm',
        bot: 'https://t.me/tolstoyVPNbot',
        video: 'https://t.me/tolstoypn_faq/165',
        support: 'https://t.me/tolstoyvpn_bot'
    },

    footerText: 'Доступ в интернет без ограничений и слежки.',

    faq: {
        ru: [
            {
                q: 'Что такое подписка?',
                a: 'Это ссылка, по которой приложение само получает список серверов и обновляет его. Добавляете её один раз — дальше всё работает автоматически.'
            },
            {
                q: 'Хочу другое приложение',
                a: 'Выберите его в списке выше. Если нужного нет, скопируйте ссылку на подписку и добавьте вручную.',
                withCopyButton: true
            },
            {
                q: 'Инструкция не для моего устройства',
                a: 'Поменяйте устройство в списке над шагами — страница определяет его автоматически, но не всегда точно.'
            }
        ],
        en: [
            {
                q: 'What is a subscription?',
                a: 'It is a link the app uses to fetch and refresh the server list on its own. Add it once and everything keeps working automatically.'
            },
            {
                q: 'I want a different app',
                a: 'Pick it from the list above. If yours is not there, copy the subscription link and add it manually.',
                withCopyButton: true
            },
            {
                q: 'The guide is for the wrong device',
                a: 'Change the device in the list above the steps — the page detects it automatically, but not always correctly.'
            }
        ]
    },

    ui: {
        ru: {
            pickDevice: 'Выберите ваше устройство из выпадающего списка',
            pickApp: 'Выберите приложение',
            setupDone: 'Подключение настроено',
            videoGuide: 'Видеоинструкция',
            helpHeader: 'Помощь',
            writeSupport: 'Написать в поддержку',
            copySubscription: 'Скопировать ссылку на подписку',
            copied: 'Ссылка скопирована',
            channel: 'Канал',
            bot: 'Бот'
        },
        en: {
            pickDevice: 'Choose your device from the list',
            pickApp: 'Choose an app',
            setupDone: 'Connection is set up',
            videoGuide: 'Video guide',
            helpHeader: 'Help',
            writeSupport: 'Message support',
            copySubscription: 'Copy subscription link',
            copied: 'Link copied',
            channel: 'Channel',
            bot: 'Bot'
        }
    }
} as const

export type TBrandUiKey = keyof (typeof BRAND.ui)['ru']

export type TBrandUi = Record<TBrandUiKey, string>

export interface IBrandFaqEntry {
    a: string
    q: string
    withCopyButton?: boolean
}

export const brandUi = (lang: string): TBrandUi =>
    lang.startsWith('ru') ? BRAND.ui.ru : BRAND.ui.en

export const brandFaq = (lang: string): readonly IBrandFaqEntry[] =>
    lang.startsWith('ru') ? BRAND.faq.ru : BRAND.faq.en
