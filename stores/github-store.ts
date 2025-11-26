import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
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

const FALLBACK_DOWNLOAD_OPTION: DownloadOption = {
    name: 'default',
    url: LATEST_RELEASE_URL,
};

class GithubStore {
    latestRelease: GithubRelease;

    windowsDownloadUrls: DownloadOption[] = [FALLBACK_DOWNLOAD_OPTION];
    macDownloadUrls: DownloadOption[] = [FALLBACK_DOWNLOAD_OPTION];
    linuxDownloadUrls: DownloadOption[] = [FALLBACK_DOWNLOAD_OPTION];

    currentVersion: string | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
        this.fetchLatestRelease();
    }

    setLatestRelease(release: GithubRelease) {
        this.latestRelease = release;
    }

    async fetchLatestRelease() {
        const response = await axios.get<GithubRelease>(LATEST_RELEASE_URL);
        runInAction(() => {
            this.latestRelease = response?.data;

            this.currentVersion = this.latestRelease?.tag_name;

            const getAssetDownloadUrlByName = (nameIncludes: string) => {
                return response?.data?.assets.find((a) =>
                    a.name.includes(nameIncludes)
                )?.browser_download_url;
            };

            this.windowsDownloadUrls = [
                {
                    name: 'x64',
                    url: getAssetDownloadUrlByName('setup.exe'),
                },
            ];
            this.macDownloadUrls = [
                {
                    name: 'Apple Silicon',
                    url: getAssetDownloadUrlByName('macos-arm64.dmg'),
                },
                {
                    name: 'Intel',
                    url: getAssetDownloadUrlByName('macos-x64.dmg'),
                },
            ];
            this.linuxDownloadUrls = [
                {
                    name: 'deb (x64)',
                    url: getAssetDownloadUrlByName('linux-x64.deb'),
                },
                {
                    name: 'rpm (x64)',
                    url: getAssetDownloadUrlByName('linux-x64.rpm'),
                },
                {
                    name: 'tar.gz (x64)',
                    url: getAssetDownloadUrlByName('linux-x64.tar.gz'),
                },
            ];
        });
    }
}

export const githubStore = new GithubStore();
