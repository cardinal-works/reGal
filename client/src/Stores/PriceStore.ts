import { observable, action, configure, runInAction, computed } from "mobx";
import { createContext, SyntheticEvent, ChangeEvent } from "react";
import agent from "../Api/agent";

class PriceStore {
    @observable loadingInitial = false;
    @observable prices: any = null;

    @action getPrices = async () => {
        this.loadingInitial = true;
        try {
            let res = await agent.Price.get();
            runInAction(() => {
                if(res) {
                    this.prices = res;
                    this.loadingInitial = false;
                }
            })
            return res;
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log("Error: ", error);
        }
    }
}
export default createContext( new PriceStore());