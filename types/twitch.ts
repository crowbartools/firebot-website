export type TwitchStream = {
    id: string;
    user_id: string;
    type: 'live';
    thumbnail_url: string;
    title: string;
    game_name: string;
    started_at: string;
    tags: string[];
};

export type TwitchUser = {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
    offline_image_url: string;
    stream?: TwitchStream;
    isTeamMember?: boolean;
    teamMemberRole?: string;
};

export type TwitchChannel = {
    id: string;
    broadcaster_login: string;
    display_name: string;
    thumbnail_url: string;
    title: string;
};

export type TwitchCategory = {
    id: string;
    name: string;
    box_art_url: string;
};
