import { observable, action, configure, runInAction, computed } from "mobx";
import { createContext, SyntheticEvent, ChangeEvent } from "react";
import { IUser } from "../Models/User";
import agent from "../Api/agent";

class UserStore {
    @observable user: IUser | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;

    @action loadUser = async (id: number) => {
        this.loadingInitial = true;
        if(this.user) {
            return this.user;
        }
        try {
            let user = await agent.User.get(id);
            runInAction(() => {
                if(user) {
                    this.user = user;
                    this.loadingInitial = false;
                }
            })
            return user;
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log("Error: ", error);
        }
    }

    @action createUser = async (user: IUser) => {
        this.submitting = true;
        try {
            let response = await agent.User.create(user);
            runInAction(() => {
                if(response) {
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

    @action updateUser = async (user: IUser) => {
        this.submitting = true;
        try {
            let response = await agent.User.update(user);
            runInAction(() => {
                if(response) {
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

export default createContext( new UserStore());