export interface IUser {
	_id: string;
	wallet_id: string;
	display_name: string;
	email_address: string;
	bio: string;
	profile_image: string;
	profile_theme: string;
	profile_featured_id: number;
	email_list: boolean;
	website: string,
	twitter: string,
	instagram: string,
	pending_value: number;
	bidding: Array<Object>;
	collection: [
		{
			_id: string;
			title: string;
			user_id: string;
			creator_id: number;
			creator_name: string;
			nft_description: string;
			nft_id: number;
			date_mint: Date;
			likes: number;
			stars: number;
			previous_sold: Array<Object>;
			thumbnail_image: string;
			auction_mode: boolean;
			auctions: [
				{
					seller_id: number;
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
	];
	liked_nfts: [
		{
			_id: string;
			title: string;
			user_id: string;
			creator_id: number;
			creator_name: string;
			nft_description: string;
			nft_id: number;
			date_mint: Date;
			likes: number;
			stars: number;
			previous_sold: Array<Object>;
			thumbnail_image: string;
			auction_mode: boolean;
			auctions: [
				{
					seller_id: number;
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
	];
	recently_viewed_nfts: [
		{
			_id: string;
			title: string;
			user_id: string;
			creator_id: number;
			creator_name: string;
			nft_description: string;
			nft_id: number;
			date_mint: Date;
			likes: number;
			stars: number;
			previous_sold: Array<Object>;
			thumbnail_image: string;
			auction_mode: boolean;
			auctions: [
				{
					seller_id: number;
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
	];
	starred: [
		{
			_id: string;
			title: string;
			user_id: string;
			creator_id: number;
			creator_name: string;
			nft_description: string;
			nft_id: number;
			date_mint: Date;
			likes: number;
			stars: number;
			previous_sold: Array<Object>;
			thumbnail_image: string;
			auction_mode: boolean;
			auctions: [
				{
					seller_id: number;
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
	];
	date_created: Date;
}
