export interface INft {
    _id: string,
    title: string,
    creator: any,
    nft_description: string,
    nft_id: number,
    user_id: string,
    thumbnail_image: string,
    raw_image: string,
    date_mint: Date,
    likes: number,
    asking_bid: number,
    previous_sold: [number],
    auction_duration: null,
    auction_startDate: null,
    auction_mode: boolean,
    auction_id: number,
    auction_started: boolean,
    tags: [{_id: string, name: string, popularity: number}]
}