export const ROUTES = {
    auth: {
        sign_in: '/(auth)/sign-in/',
        sign_up: '/(auth)/sign-up/',
        forgot_password: '/(auth)/forgot-password/',
    },
    errors: {
        unauthorized: '/(errors)/401',
        not_found: '/(errors)/404',
        forbidden: '/(errors)/403',
        general: '/(errors)/500',
        maintenance: '/(errors)/503'
    },
    public: {
        contact: '/(public)/contact/',
        for_enterprises: '/(public)/for-enterprises/',
        learning: '/(public)/learning/',
        marketplace: '/(public)/marketplace/',
        privacy: '/(public)/privacy/',
        talent_pool: '/(public)/talent-pool/',
        terms: '/(public)/terms/'
    },
} as const

