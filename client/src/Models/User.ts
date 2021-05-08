export interface IUser {
  _id: string;
  wallet_id: string;
  display_name: string;
  email_address: string;
  bio: string;
  profile_image: string;
  profile_bg_color: string;
  profile_featured_id: number;
  email_list: boolean;
  collection: [
    _id: string,
    title: string,
    creator: any,
    current_bid: number,
    user_id: string,
    nft_description: string,
    nft_id: number,
    thumbnail_image: string,
    raw_image: string,
    date_mint: Date,
    likes: number,
    asking_bid: number,
    previous_sold: [number],
    auction_duration: string,
    auction_startDate: string,
    auction_mode: boolean,
    auction_id: number,
    auction_started: boolean,
    tags: [{_id: string, name: string, popularity: number}]
  ];
  liked_nfts: [
    _id: string,
    title: string,
    creator: any,
    current_bid: number,
    user_id: string,
    nft_description: string,
    nft_id: number,
    thumbnail_image: string,
    raw_image: string,
    date_mint: Date,
    likes: number,
    asking_bid: number,
    previous_sold: [number],
    auction_duration: string,
    auction_startDate: string,
    auction_mode: boolean,
    auction_id: number,
    auction_started: boolean,
    tags: [{_id: string, name: string, popularity: number}]
  ];
  recently_viewed_nfts: [
    _id: string,
    title: string,
    creator: any,
    current_bid: number,
    user_id: string,
    nft_description: string,
    nft_id: number,
    thumbnail_image: string,
    raw_image: string,
    date_mint: Date,
    likes: number,
    asking_bid: number,
    previous_sold: [number],
    auction_duration: string,
    auction_startDate: string,
    auction_mode: boolean,
    auction_id: number,
    auction_started: boolean,
    tags: [{_id: string, name: string, popularity: number}]
  ];
  date_created: Date;
}
