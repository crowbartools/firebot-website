export type Testimonial = {
    userId: string;
    text: string;
    textExtended?: string;
    type: string;
};

// You can use the following tool to get user ids: https://twitchinsights.net/checkuser

export const testimonials: Testimonial[] = [
    {
        userId: '85825454', // eklo
        text:
            'Literally the only bot you will ever need. My stream would not be possible without Firebot. The devs are constantly adding new features and they keep it running rock solid. It is the GBOAT (greatest bot of all time).',
        type: 'Poker Streamer'
    },
    {
        userId: '104526681', // gilias
        text:
            'Firebot has been an extremely flexible tool that has given me a lot of options for interaction in my streams, with the ability to do almost anything you can imagine, as well as a great community of streamers sharing their own ideas!',
        type: 'Variety Streamer'
    },
    {
        userId: '50989853', // zunder
        text: `Switching to Firebot was a no-brainer for me. Out of the box, it had just about everything I needed to switch from my previous bot software. But the magic of Firebot is how powerful it is as a platform. The ease with which I can create or use custom setups or scripts from the community is unparalleled. And as a software engineer, Firebot's open source code makes me feel like I can truly make it mine, tailoring it to my specific wants and needs.`,
        type: 'Variety Streamer'
    },
    {
        userId: '38816678', // snuddles
        text: `The Firebot community is always helpful and looking for new ways to utilize the bot's features. The Firebot developers are constantly listening to feedback and expanding the feature set based on the community's suggestions...`,
        textExtended: `I started using Firebot as a secondary bot for my wife's streams for hydration reminders after Stay_Hydrated_Bot stopped working. I later migrated the rest of her functions and quotes over from Streamlabs Chatbot and it is now our main bot for her main channel, our joint channel and my channel. Firebot easily allows us to swap accounts while still keeping the same commands and effects that the community knows to allow for consistency.

        This includes over a hundred sound effects and an ever-expanding chat based RPG game (i.e. grinding, dungeons, tournaments, etc.). It is crazy what can be accomplished using Firebot's built in command editor without touching the custom scripts.
        
        The Firebot community is always helpful and looking for new ways to utilize the bot's features. The Firebot developers are constantly listening to feedback and expanding the feature set based on the community's suggestions.
        
        It is definitely worth checking out if you are looking for your first bot or looking for a change!`,
        type: 'Variety Streamer'
    },
    {
        userId: '37677315', // heyaapl
        text: `I've been able to build my stream using Firebot in a way that makes it feel dynamic based on what I'm playing that day. I've been able to make chat games, build all of my stream alerts, and manage my channel rewards all using Firebot's power clicks-not-code method of building...`,
        textExtended: `Firebot has given me the ability to level-up my stream experience for viewers, and myself. I've been able to build my stream using Firebot in a way that makes it feel dynamic based on what I'm playing that day. I've been able to make chat games, build all of my stream alerts, and manage my channel rewards all using Firebot's power clicks-not-code method of building. It's a bot that simplifies the experience if you're looking for something to get you up and running quickly, but is so extensible that you can build literally whatever you need via Firebot. This is a bot that every stream should have in their toolbelt.

        Firebot is incredibly powerful, it's simple to use, and once you use it you'll start coming up with amazing new things for your community.`,
        type: 'Variety Streamer'
    },
    {
        userId: '40096123', // cassiopeia
        text: `I would recommend Firebot ANY DAY. In fact I desperately try to tell any streamer that they should consider looking into the software, especially if they use one of the web-based bots and have a PC running the stream. On occasion I show it on my own stream. This software is easy to navigate, looks good and it's able to do nearly anything you throw at it. Streamloots and lots of other integrations make things seamless and easy.`,
        type: 'Variety Streamer'
    },
    {
        userId: '46953634', // spedunkle
        text: `Firebot is an AMAZING tool that lets me leverage my creativity and give my channel some extra sparkle with very little effort. I've used a lot of Twitch bots (and Mixer bots, RIP) in the past. Between all of those, I've always felt a strong lack of features or poor integration. I don't feel that in Firebot, while also not feeling overwhelmed. I'm so excited for future updates to Firebot because I can't even fathom what they might add that's not already supported!`,
        type: 'Variety Streamer'
    },
    {
        userId: '50567551', // sushikishi
        text: `Firebot simply has features that cloud-based and the limited other locally hosted bots do not have, perhaps most importantly is a built-in, customizable, spam protection command. Advanced users can find plenty of uses...while brand new streamers will find both common and advanced features explained well... Even everyday features like !quote list and !commands are above expectations: Firebot creates a webpage holding not just your command list but also your full quote database.`,
        textExtended: `Firebot simply has features that cloud-based and the limited other locally hosted bots do not have, perhaps most importantly is a built-in, customizable, spam protection command. Advanced users can find plenty of uses for features like conditional commands and triggers, while brand new streamers will find both common and advanced features explained well, and can build their bot piece by piece to their liking. Even everyday features like !quote list and !commands are above expectations: Firebot creates a webpage holding not just your command list but also your full quote database.`,
        type: 'Speedrunning vTuber'
    },
    {
        userId: '153192414', // mocraft_20
        text: `Firebot is the best of all worlds for me. I have everything run through a single bot/application with an easy to use interface and tons of customization abilities! It's streamlined a lot of my processes and added a new layer of fun I was missing out on because my time was spread thin across multiple applications.`,
        textExtended: ``,
        type: 'Minecraft Streamer'
    }
    // {
    //     userId: '',
    //     text: ``,
    //     textExtended: ``,
    //     type: ''
    // }
];
