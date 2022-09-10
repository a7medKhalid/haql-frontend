import {
    DocumentTextIcon,
    Layout,
    Newspaper,
    SaveAs,
} from '../components/common/HeroIcons'

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const MAP_ROUTE_TO_ICON = {
    '/': <DocumentTextIcon />,
    '/issues': <Newspaper />,
    '/contributions': <SaveAs />,
    '/tasks': <Layout />,
}

export const LOCALE_WORDS = {
    en: {
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
    },
    ar: {
        open: 'مفتوح',
        closed: 'مغلق',
        archived: 'مؤرشف',
        accepted: 'معتمدة',
    },
}
