import { observable, action, configure, runInAction, computed } from "mobx";
import { createContext, SyntheticEvent, ChangeEvent } from "react";
import { INft } from "../Models/Nft";
import agent from "../Api/agent";

class NftStore {
    @observable nftRegistry = new Map<string, INft>();
    @observable nft: INft | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;

    @computed get getAllNfts() {
        return Array.from(this.nftRegistry.values());
    }

    @action loadNfts = async (payload?: any) => {
        this.loadingInitial = true;
        this.nftRegistry.clear();
        try {
            let response = await agent.Nft.getAll(payload);
            runInAction(() => {
                if(response) {
                    response.forEach((nft: INft) => {
                        this.nftRegistry.set(nft._id, nft);
                    })
                   
                }
                return response
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    @action loadNft = async (id: number) => {
        this.nft = null;
        try {
            let res = await agent.Nft.get(id);
            runInAction(() => {
                if(res) {
                    this.nft = res[0];
                }
            })
            return res;
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    @action createNft = async (nft: INft, id: string) => {
        console.log("Nft: ", nft);
        console.log("Id: ", id)
        this.submitting = true;
        try {
            let response = await agent.Nft.create(nft, id);
            runInAction(() => {
                if(response) {    
                    this.submitting = false;
                    this.nft = response
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

    @action updateNft = async (nft: INft) => {
        this.submitting = true;
        try {
            let response = await agent.Nft.update(nft);
            runInAction(() => {
                if(response) {
                    this.nft = response
                    this.submitting = false;
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

export default createContext( new NftStore());