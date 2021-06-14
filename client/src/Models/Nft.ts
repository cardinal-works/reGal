export interface INft {
    _id: string;
    title: string;
    user_id: string;
    creator_name: string;
    nft_description: string;
    nft_id: number;
    date_mint: Date;
    likes: number;
    views: number;
    previous_sold: Array<Object>;
    thumbnail_image: string;
    auction_mode: boolean;
    auctions: [
        {
            seller_id: string;
            seller_name: string;
            start_date: number;
            asking_bid: number;
            end_date: number;
            bids: Array<Object>;
            watchers: Array<Object>;
        }
    ];
    tags: [{ _id: string; name: string; popularity: number }];
}