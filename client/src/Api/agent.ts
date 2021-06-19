import axios, { AxiosResponse } from "axios";
import { INft } from "../Models/Nft";
import { IUser } from "../Models/User";
import { IAuction } from "../Models/Auction";
import { action } from "mobx";

const apiURL = "";

axios.defaults.baseURL = `${apiURL}/api`;

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    //toast.error("Network error!");
  }

  const { status, data, config } = error.response;

  if (status == 401) {
    window.location.href = "/";
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    window.location.href = "/";
    return;
  }

  if (status === 500) {
    throw error;
  }

  throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const headers = {
  "Content-Type": "application/json",
};

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );


const requests = {
  get: (url: string) => 
    axios
      .get(url, { headers })
      //.then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body, { headers })
      //.then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body, { headers })
      // .then(sleep(1000))
      .then(responseBody),
  del: (url: string) => 
    axios
      .delete(url, { headers })
      // .then(sleep(1000))
      .then(responseBody),
};


const User = {
  get: (id: number) => requests.get(`/user/get/${id}`),
  create: (user: IUser) => requests.post("/user/create", user),
  update: (user: IUser) => requests.put(`/user/update`, user),
  updateBookmarks: (action: object) => requests.put("/user/update/bookmarks", action),
  updateRecentViews: (action: object) => requests.put("/user/update/recentviews", action),
  delete: (id: number) => requests.del(`/user/delete/${id}`),
}

const Nft = {
  getAll: (payload?: any) => requests.post(`/nft/get/all`, payload),
  get: (id: number) => requests.get(`/nft/get/${id}`),
  sort: (payload: any) => requests.post(`/nft/get/sorted`, payload),
  create: (nft: INft, id: string) => requests.post(`/nft/create/${id}`, nft),
  update: (nft: INft) => requests.put("/nft/update", nft),
  updateLikes: (action: object) => requests.put("/nft/update/likes", action),
  delete: (id: number) => requests.del(`nft/delete/${id}`)
}

const Auction = {
  getAll: (payload?: any) => requests.post(`/auction/get/all`, payload),
  get: (id: number) => requests.get(`/auction/get/${id}`),
  create: (user: IAuction, id: string) => requests.post(`/auction/create/${id}`, user),
  update: (user: IAuction) => requests.put(`/auction/update`, user),
  delete: (id: number) => requests.del(`/auction/delete/${id}`)
}

const Price = {
  get: () => requests.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'),
}

export default {
  User,
  Nft,
  Price,
  Auction
}