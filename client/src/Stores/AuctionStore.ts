import { observable, action, configure, runInAction, computed } from "mobx";
import { createContext, SyntheticEvent, ChangeEvent } from "react";
import { IAuction } from "../Models/Auction";
import agent from "../Api/agent";


class AuctionStore {
    @observable auctionRegistry = new Map<string, IAuction>();
    @observable auction: IAuction | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;

    @computed get getAllAuctions() {
        return Array.from(this.auctionRegistry.values());
    }

    @action loadAuctions = async (payload?: any) => {
        this.loadingInitial = true;
        this.auctionRegistry.clear();
        try {
            let response = await agent.Auction.getAll(payload);
            runInAction(() => {
                if(response) {
                    response.forEach((auction: IAuction) => {
                        this.auctionRegistry.set(auction._id, auction);
                    })
                   
                }
                return response
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    @action loadAuction = async (id: number) => {
        this.auction = null;
        try {
            let res = await agent.Auction.get(id);
            runInAction(() => {
                if(res) {
                    this.auction = res[0];
                }
            })
            return res[0];
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    @action createNft = async (auction: IAuction, id: string) => {
        console.log("auction: ", auction);
        console.log("Id: ", id)
        this.submitting = true;
        try {
            let response = await agent.Auction.create(auction, id);
            runInAction(() => {
                if(response) {    
                    this.submitting = false;
                    this.auction = response
                }
            })
            return response;
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            return error.message;
        }
    }

    @action updateAuction = async (auction: IAuction) => {
        this.submitting = true;
        try {
            let response = await agent.Auction.update(auction);
            runInAction(() => {
                if(response) {
                    this.auction = response
                    this.submitting = false;
                    this.auctionRegistry.set(response._id, response);
                }
            })
            return response;
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            return error.message;
        }
    }
}

export default createContext( new AuctionStore());