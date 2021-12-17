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
    },
    {
        userId: '27245513', // Darkfreakzz
        text: `I fell in love with firebot from day one. It already did SO MUCH out of the box, the devs are constantly adding and updating things, and the user base creates great things for it too. Since I started Firebot I have moved more towards it. The sheer amount of possibilities as well as the ease of use make firebot the best Twitch bot for me.`,
        textExtended: `I started using firebot after seeing the shout-out banner in someone else's stream. I was using Streamlabs Chabot at the time, because it offered the most options and it supported scripts. I fell in love with firebot from day one. It already did SO MUCH out of the box, the devs are constantly adding and updating things, and the user base creates great things for it too. Since I started Firebot I have moved more towards it. The sheer amount of possibilities as well as the ease of use make firebot the best Twitch bot for me.`,
        type: 'Variety Streamer'
    },
    {
        userId: '58215116', //MagiWasTaken
        text: `Other bots were causing a lot of issues, so I decided to try out Firebot and it works pretty well! It has all the features I need (and more) - and it definitely helped me enhance the experience with fun little shenanigans and different integrations.`,
        type: 'Variety Streamer'
    },
    {
        userId: '679283785', //Nashuja
        text: `Bevor ich den Firebot entdeckt habe, hatte ich für jede Funktion eine andere Plattform. Glücklicherweise habe ich durch den Firebot nicht nur all meine Funktionen wie Alerts, Kanalbelohnungen, Sound- und Streameffekte an einem Ort, sondern auch noch unglaublich viele Möglichkeiten, meinen Stream mit neuen Spielereien zu verbessern!`,
        type: 'Dead by Daylight Streamer'
    },
    {
        userId: '59208659', // ItsGuy
        text: `Firebot has been a great way to 'Stream'-line my setup. I was able to successfully transition from using over three separate programs into one. This has cut the strain on my PC by 70% the normal. The ability to launch one program makes prepping a stream that much easier, and not only does this program make streaming less stressful it opens the doors to SO many fun options. `,
        textExtended: `Firebot has been a great way to 'Stream'-line my setup. I was able to successfully transition from using over three separate programs into one. This has cut the strain on my PC by 70% the normal. The ability to launch one program makes prepping a stream that much easier, and not only does this program make streaming less stressful it opens the doors to SO many fun options. Whether you are a programmer, or new to stream bots, Firebot would be a mistake not to look into. The interface is intuitive and can be as complicated as you need it to be.`,
        type: 'Variety / Visual ASMR Streamer'
    },
    {
        userId: '49136137', // deadpixelTTV
        text: `I started using Firebot when my older bot just didn’t have the features I was looking for with my stream. Not only has Firebot helped add in more functionality and reduced the number of software I use for my stream by having so many features integrated already but also given the ability to get more creative with features for my stream.`,
        textExtended: `I started using Firebot when my older bot just didn’t have the features I was looking for with my stream. Not only has Firebot helped add in more functionality and reduced the number of software I use for my stream by having so many features integrated already but also given the ability to get more creative with features for my stream. Firebot offers so much in terms of its overlay system and the way it allows you to basically create a script or function within its triggers or events. I now can simply add in a new channel reward triggered on Twitch; then have Firebot activate a random or specific video, sound, OBS filter, or whole scenes and sources based on variables or conditions I’ve defined on the trigger. It’s definitely helped me to flex my creative muscle as to what I can do with having Firebot running for my channel.`,
        type: 'Variety Streamer'
    },
    {
        userId: '36787436', // JeffOverTime
        text: `I love that Firebot is an open source solution for my most critical streaming needs and more. It's so simple to setup essential features, but at no cost to the affordance of getting into the small details of how things should look, feel, and sound. The team has also given amazing support through Discord in the few occasions where I get stuck on something`,
        textExtended: `I love that Firebot is an open source solution for my most critical streaming needs and more. It's so simple to setup essential features, but at no cost to the affordance of getting into the small details of how things should look, feel, and sound. The team has also given amazing support through Discord in the few occasions where I get stuck on something. Firebot has just made everything easier for me both during and after my streams by allowing me to automate commonplace tasks, reward my viewers for showing up, and most importantly keep chat safe. I genuinely cannot recommend Firebot enough.`,
        type: 'Variety Streamer'
    },
    {
        userId: '103257879', // odddustin
        text: `I have moved all my bot based activity to Firebot. I've been using it since Mixer and the move to Twitch was so great and the new added features so advanced and easy to use I couldn't help but consolidate. Firebot has the advanced features I need to take interactivity to a whole new level for my stream.`,
        textExtended: `I have moved all my bot based activity to Firebot. I've been using it since Mixer and the move to Twitch was so great and the new added features so advanced and easy to use I couldn't help but consolidate. Firebot has the advanced features I need to take interactivity to a whole new level for my stream. I use it for myself and have helped many other people transition to it and expand their scripting to enhance their stream and automate a lot of what I used to trigger manually. I cannot say enough about the bot or the people on the Discord who have helped me with issues and questions as well.`,
        type: 'Variety Streamer'
    },
    {
        userId: '533539916', // 1LuckYGooN
        text: `Firebot stood out among other bots, such as slobs bot and nightbot when I started streaming last year. It has enhanced my stream by wowing people with simple green screen visuals and loving particular sounds upon their arrival.`,
        textExtended: `Firebot stood out among other bots, such as slobs bot and nightbot when I started streaming last year. It has enhanced my stream by wowing people with simple green screen visuals and loving particular sounds upon their arrival. Being able to control what happens for my rewards is what excites me the most about my favorite bot. Tune in and see Fire bot set the stream on fire!`,
        type: 'Variety Streamer'
    },
    {
        userId: '80990273', // Cynisia
        text: `I just recently started using Firebot. However, I love that I can have auto shoutouts when someone comes in. This helps me stay focused on my game while shouting out some of my favorite streamers (and friends of the stream). I also made a giveaway event for my birthday stream, and it made it effortless to give things away. I set up the command for followers and then subscribers, and I was able to do a cute alert on a timer to remind me to draw for the giveaway`,
        textExtended: `I just recently started using Firebot. However, I love that I can have auto shoutouts when someone comes in. This helps me stay focused on my game while shouting out some of my favorite streamers (and friends of the stream). I also made a giveaway event for my birthday stream, and it made it effortless to give things away. I set up the command for followers and then subscribers, and I was able to do a cute alert on a timer to remind me to draw for the giveaway. I have barely scratched the surface but am excited to continue to do so. People always ask me how I do certain things on my streams; for example, have a command play a video. It has made my stream more professional-looking without losing my personality.`,
        type: 'Variety Horror Streamer'
    },
    {
        userId: '61911601', // DoSoConfidently
        text: `I love how customizable the bot is with just a little bit of tweaking. My mods get special shoutouts for their hard work when they arrive. Sound and visual commands work flawlessly. It was easy to set up and easy to learn.`,
        type: 'Minecraft / Variety Streamer'
    },
    {
        userId: '121581472', // GuitarGaming4
        text: `It is a great bot I have be using it for a long time and it keeps getting better and the team is very helpful when I have issues`,
        type: 'Variety Streamer'
    },
    {
        userId: '89295598', //mindfulofgames
        text: `I love that Firebot allows me to do basically everything related to my stream in one place! It's easy to use and free!`,
        type: 'Variety Streamer'
    },
    {
        userId: '504991989', // Tokaji909
        text: `What I like most about Firebot is, that you have everything in one place and you have more control over things. It is so much easier, to make your own custom Alerts and have full control over them. The amount of customization is crazy but still easy to use, with a good learning curve. Also the support is great and they constantly work on it, to make it better. I never want to go back and I really like to experiment with things in it.`,
        type: 'Variety Streamer'
    },
    {
        userId: '643181047', //SatisFictionary
        text: `After installing Firebot, I have moved all my alerts, payment notifications and overlays over. Not only is it a superb bot for Twitch, it connects to so many other devices and applications that I have been able to stop running separate applications for lights, videos, sounds and channel point redeems, so my PC behaves a bit better as a bonus!`,
        type: 'Variety Streamer'
    },
    {
        userId: '277804155', // melScamp
        text: `I'm an artsy organic type so learning the tech behind the stream was a big challenge. Firebot has a great interface and I now understand a lot more about how it all works. It's like a bot and stream deck in one. Cloud based bots only have a few tricks. Firebot lets me do what I want and make art. Hail to the Firebot.`,
        type: 'Variety Fitness & Chatting Streamer'
    },
    {
        userId: '81734979', //SightlessKombat
        text: `The team behind Firebot clearly care about not only their bots functionality, but also its accessibility, including to screen reader users like myself.  Being able to easily fire up the bot and tweak things on the fly, even during streams, as well as have sound effects, chat, timers and pretty much anything else all in one place in an accessible package has made streaming so much less frustrating than it otherwise would be.`,
        textExtended: `
        The team behind Firebot clearly care about not only their bots functionality, but also its accessibility, including to screen reader users like myself.  Being able to easily fire up the bot and tweak things on the fly, even during streams, as well as have sound effects, chat, timers and pretty much anything else all in one place in an accessible package has made streaming so much less frustrating than it otherwise would be.
        
        If you're looking for a bot that's accessible, easy to use and very customisable, look no further.`,
        type: 'Variety Streamer'
    },
    {
        userId: '257224435', //OnedEyePete
        text: `As someone who tries their hardest to be unique from other streamers, I'm always looking out for something different and has limitless customization, Firebot has done this for me! I keep telling my friends and fellow streamers about it and everything you can do with this beautiful piece of software and the discord team has been very helpful with any issue that arises.`,
        textExtended: `As someone who tries their hardest to be unique from other streamers, I'm always looking out for something different and has limitless customization, Firebot has done this for me! I keep telling my friends and fellow streamers about it and everything you can do with this beautiful piece of software and the discord team has been very helpful with any issue that arises (mostly on my part.) The bot has so much potential that I havent even used 90% of what its capable of! Keep up the good work guys!`,
        type: 'Variety Streamer'
    },
    {
        userId: '122348187', //LewdPain
        text: `Firebot has made my streams more interactive than ever before and all of it can be done with a touch of a button. Easiest bot for slow learners and even beginners. As I have no experience in any of this. Oh and best of all the bot is free. Other bots force you to pay for such amazing features.`,
        textExtended: `Firebot literally has changed not only my streams but my life for the better in general. All the admins are so positive & chill and answer any question with ease you throw at them. I had so pretty confusing questions too. Lol But in all seriousness Firebot has made my streams more interactive than ever before and all of it can be done with a touch of a button. Easiest bot for slow learners and even beginners. As I have no experience in any of this. Oh and best of all the bot is free. Other bots force you to pay for such amazing features. I don’t know how to thank you enough Firebot Team, you guys deserve a Medal of Honor for supporting us streamers so much with these tools of success😊`,
        type: 'Anime Streamer'
    }
    // {
    //     userId: '',
    //     text: ``,
    //     textExtended: ``,
    //     type: ''
    // }
];
