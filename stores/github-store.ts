import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { DownloadOption } from '../types/downloads';

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

    private getAssetDownloadUrlByName(nameIncludes: string) {
        return this.latestRelease?.assets.find((a) =>
            a.name.includes(nameIncludes)
        )?.browser_download_url;
    }

    get currentVersion() {
        return this.latestRelease?.tag_name;
    }

    get windowsDownloadUrls(): DownloadOption[] {
        return [
            {
                name: 'x64',
                url: this.getAssetDownloadUrlByName('setup.exe'),
            }
        ]
    }

    get macDownloadUrls(): DownloadOption[] {
        return [
            {
                name: 'Apple Silicon',
                url: this.getAssetDownloadUrlByName('macos-arm64.dmg'),
            },
            {
                name: 'Intel',
                url: this.getAssetDownloadUrlByName('macos-x64.dmg'),
            }
        ]
    }

    get linuxDownloadUrls(): DownloadOption[] {
        return [
            {
                name: 'deb (x64)',
                url: this.getAssetDownloadUrlByName('linux-x64.deb'),
            },
            {
                name: 'rpm (x64)',
                url: this.getAssetDownloadUrlByName('linux-x64.rpm'),
            },
            {
                name: 'tar.gz (x64)',
                url: this.getAssetDownloadUrlByName('linux-x64.tar.gz'),
            }
        ]
    }
}

export const githubStore = new GithubStore();
