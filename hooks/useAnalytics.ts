import amplitude from 'amplitude-js';

const LIVE_KEY = '6b8c90da5caefdaca6febc1dd0ba68fe';
const DEV_KEY = 'ffca493c18bec7ac3ec9c722b5d7b4b9';

const isDev = process.env.NODE_ENV === 'development';
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
    amplitude.getInstance().init(isDev ? DEV_KEY : LIVE_KEY);
}

export default function useAnalytics() {
    return {
        logEvent(eventName: string, eventData?: Record<string, unknown>) {
            if (!isBrowser) return;

            amplitude.getInstance().logEvent(eventName, eventData);

            if (isDev) {
                // eslint-disable-next-line no-console
                console.log(`Amplitude Event Logged: ${eventName}`, eventData);
            }
        }
    };
}
