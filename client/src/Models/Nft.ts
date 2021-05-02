export interface INft {
    _id: string,
    title: string,
    creator: string,
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
    tags: [name: string, popularity: number]
}