import { makeAutoObservable, reaction, toJS } from 'mobx';
import moment from 'moment';
import { ChannelInfo, ProfileData } from '../types/profile';
import getMappedRoles, {
    getChannelInfo,
    getProfileData
} from '../utils/profile';

class ProfileStore {
    profileData: ProfileData = null;
    channelInfo: ChannelInfo = null;
    isLoading = true;
    unableToLoad = false;
    activeTabIndex = 0;

    quotesPagination = {
        currentPage: 1,
        pageSize: 25
    };

    commandsPagination = {
        currentPage: 1,
        pageSize: 25
    };

    selectedCommandSortTag: this['profileData']['sortTags'][0] | null = null;

    commandQuery = '';
    quoteQuery = '';

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        reaction(
            () => this.quoteQuery,
            () => {
                this.quotesPagination.currentPage = 1;
            }
        );

        reaction(
            () => this.commandQuery,
            () => {
                this.commandsPagination.currentPage = 1;
            }
        );
    }

    setCommandQuery(query: string) {
        this.commandQuery = query;
    }

    setQuoteQuery(query: string) {
        this.quoteQuery = query;
    }

    setSelectedCommandSortTag(sortTag: this['selectedCommandSortTag']) {
        if (sortTag.id === 'allCommands') {
            this.selectedCommandSortTag = null;
        } else {
            this.selectedCommandSortTag = sortTag;
        }
    }

    get filteredCommands() {
        return (
            this.profileData?.commands.allowedCmds.filter((c) => {
                if (
                    this.selectedCommandSortTag &&
                    !c.sortTags?.includes(this.selectedCommandSortTag.id)
                ) {
                    return false;
                }
                return c.trigger
                    .toLowerCase()
                    .includes(this.commandQuery.toLowerCase());
            }) ?? []
        );
    }

    get currentCommands() {
        const offset =
            (this.commandsPagination.currentPage - 1) *
            this.commandsPagination.pageSize;
        return this.filteredCommands.slice(
            offset,
            offset + this.commandsPagination.pageSize
        );
    }

    get filteredQuotes() {
        const normalizedQuery = this.quoteQuery.trim().toLowerCase();
        const queryIsNum = /^\d+$/.test(normalizedQuery);
        return (
            this.profileData?.quotes.quotes.filter((c) =>
                queryIsNum
                    ? c.text.toLowerCase().includes(normalizedQuery) ||
                      c._id.toString() === normalizedQuery
                    : c.text.toLowerCase().includes(normalizedQuery) ||
                      c.originator.toLowerCase().includes(normalizedQuery) ||
                      c.game.toLowerCase().includes(normalizedQuery) ||
                      moment(c.createdAt)
                          .format('M/D/YYYY')
                          .includes(normalizedQuery)
            ) ?? []
        );
    }

    get currentQuotes() {
        const offset =
            (this.quotesPagination.currentPage - 1) *
            this.quotesPagination.pageSize;
        return this.filteredQuotes.slice(
            offset,
            offset + this.quotesPagination.pageSize
        );
    }

    setActiveTabIndex(index: number) {
        this.activeTabIndex = index;
    }

    setCurrentCommandsPage(page: number) {
        this.commandsPagination.currentPage = page;
    }

    setCurrentQuotesPage(page: number) {
        this.quotesPagination.currentPage = page;
    }

    setProfileData(profileData: ProfileData) {
        if (profileData != null) {
            this.profileData = profileData;
            this.profileData.quotes.quotes = toJS(
                this.profileData.quotes.quotes
            ).reverse();
            this.profileData.commands.allowedCmds.map((c) => {
                const permissionsRestriction = c.restrictionData?.restrictions?.find(
                    (r) => r.type === 'firebot:permissions'
                );
                if (permissionsRestriction?.roleIds?.length > 0) {
                    c.permissions = {
                        roles: getMappedRoles(permissionsRestriction.roleIds)
                    };
                }
                if (c.subCommands?.length > 0) {
                    c.subCommands = c.subCommands?.filter((f) => f.active);
                    if (c.fallbackSubcommand) {
                        c.subCommands.push(c.fallbackSubcommand);
                    }
                    c.subCommands?.map((sc) => {
                        const scPermRestriction = sc.restrictionData?.restrictions?.find(
                            (r) => r.type === 'firebot:permissions'
                        );
                        if (scPermRestriction?.roleIds?.length > 0) {
                            sc.permissions = {
                                roles: getMappedRoles(scPermRestriction.roleIds)
                            };
                        }
                        return sc;
                    });
                }
                return c;
            });
            if (this.profileData.profilePage === 'quotes') {
                this.activeTabIndex = 1;
            }
        } else {
            this.unableToLoad = true;
        }
        this.isLoading = false;
    }

    setChannelInfo(channelInfo: ChannelInfo) {
        this.channelInfo = channelInfo;
    }

    getProfileData() {
        this.isLoading = true;
        this.unableToLoad = false;
        getProfileData().then((profileData) => {
            getChannelInfo(profileData.owner).then((channelInfo) => {
                this.setChannelInfo(channelInfo);
                this.setProfileData(profileData);
            });
        });
    }
}

export const profileStore = new ProfileStore();
