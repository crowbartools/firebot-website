import axios from 'axios';
import { makeAutoObservable } from 'mobx';

type GithubRelease = {
    tag_name: string;
    assets: Array<{
        name: string;
        browser_download_url: string;
    }>;
};

const LATEST_RELEASE_URL =
    'https://api.github.com/repos/crowbartools/firebot/releases/latest';

class GithubStore {
    latestRelease: GithubRelease;

    constructor() {
        makeAutoObservable(this);
        this.fetchLatestRelease();
    }

    setLatestRelease(release: GithubRelease) {
        this.latestRelease = release;
    }

    async fetchLatestRelease() {
        const response = await axios.get<GithubRelease>(LATEST_RELEASE_URL);
        this.setLatestRelease(response?.data);
    }

    get currentVersion() {
        return this.latestRelease?.tag_name;
    }

    get windowsDownloadUrl() {
        return this.latestRelease?.assets.find((a) =>
            a.name.includes('setup.exe')
        )?.browser_download_url;
    }

    get macDownloadUrl() {
        return this.latestRelease?.assets.find((a) =>
            a.name.includes('macos-x64.dmg')
        )?.browser_download_url;
    }

    get linuxDownloadUrl() {
        return this.latestRelease?.assets.find((a) =>
            a.name.includes('linux-x64.tar.gz')
        )?.browser_download_url;
    }
}

export const githubStore = new GithubStore();
