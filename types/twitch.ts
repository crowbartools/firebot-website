export type TwitchStream = {
    id: string;
    user_id: string;
    type: 'live';
    thumbnail_url: string;
};

export type TwitchUser = {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
    offline_image_url: string;
    stream?: TwitchStream;
};
