import { makeAutoObservable } from 'mobx';

class AppStore {
    tabBarStuck = false;

    constructor() {
        makeAutoObservable(
            this,
            {},
            {
                autoBind: true
            }
        );
    }

    setTabBarStuck(stuck: boolean) {
        this.tabBarStuck = stuck;
    }
}

export const appStore = new AppStore();
