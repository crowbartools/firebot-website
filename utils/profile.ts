import axios from 'axios';
import { utils } from 'xlsx';
import fileDownload from 'js-file-download';
import { ChannelInfo, ProfileData } from '../types/profile';

export async function getProfileData(): Promise<ProfileData> {
    const urlParams = new URLSearchParams(window.location.search);

    const binId = urlParams.get('id');

    if (binId == null) return null;

    try {
        const response = await axios.get<ProfileData>(
            `https://bytebin.lucko.me/${binId}`
        );

        if (response.status === 200) {
            return JSON.parse(unescape(JSON.stringify(response.data)));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(
            `Failed to get profile data with id ${binId}. Has it expired?`,
            error
        );
    }

    return null;
}

export async function getChannelInfo(
    channelName: string
): Promise<ChannelInfo> {
    if (channelName == null) {
        return null;
    }

    const response = await axios.get<ChannelInfo>(
        `https://api.firebot.app/v1/channel/${channelName}`
    );

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

type FirebotRole =
    | 'ChannelEditor'
    | 'mod'
    | 'Mod'
    | 'sub'
    | 'vip'
    | 'broadcaster'
    | 'Streamer'
    | 'Owner';

const knownRoles: Array<FirebotRole | string> = [
    'ChannelEditor',
    'mod',
    'Mod',
    'sub',
    'vip',
    'broadcaster',
    'Streamer',
    'Owner',
];

export default function getMappedRoles(roleIds: string[]) {
    return [
        ...new Set(
            roleIds
                .filter((r) => knownRoles.includes(r))
                .map((r) => {
                    switch (r as FirebotRole) {
                        case 'broadcaster':
                        case 'Streamer':
                        case 'Owner':
                            return "Streamer";
                        case 'ChannelEditor':
                        case 'Mod':
                        case 'mod':
                            return 'Mods';
                        case 'sub':
                            return 'Subs';
                        case 'vip':
                            return 'VIPs';
                    }
                })
        ),
    ];
}

export function downloadDataAsCsv(data: Array<unknown[]>, channelName: string) {
    const sheet = utils.aoa_to_sheet(data);
    const csv = utils.sheet_to_csv(sheet);
    fileDownload(csv, `${channelName}-quotes.csv`);
}
