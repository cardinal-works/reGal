// SPDX-License-Identifier: MIT

pragma solidity ^0.6.3;

import "./ERC721.sol";
import "./SafeMath.sol";

contract RegalAuction is ERC721 {
    
    struct History {
        address owned;
        uint256 price;
    }
    
    //variables that remain static or connstant
    struct RegalCollectible {
        address payable seller; // 0x01wd...
        uint256 minbid; // 0
        string tokenURI; // "https://..."
        bool sale; // false
        uint256 startTime; // 0
        uint256 endTime; // 0 
        mapping(uint256 => History) history; // [{ 0 :{ owned: "0x1wd...", price: 0 }}, ...]
    }
    
    struct bidding {
        uint currentHighestBid;
        address payable highestBidder;
    }
    
    mapping(uint256 => RegalCollectible) private _regalCollectibles;  //Map id to ArtItem
    address public owner;   //owner
       
    using SafeMath for uint256;  //For Future use

    //Note: Token is minted after it is sold or after auction ends
  
    //variables that are dynamic or change
    uint256 public _regalIds;  // minted
    uint256 public _collectibleIds; // not minted
    
    mapping(uint256=>mapping(address => uint256)) public fundsByBidder; //map tokenid to fundsByBidder
    
    mapping(uint256=>bidding) public bid;  //mapping tokenid to bidding

    //Events
    event LogBid(address bidder, uint bid, address highestBidder, uint highestBid);   
    event LogWithdrawal(address withdrawer, address withdrawalAccount, uint amount);
    event LogCanceled();
    

    constructor() payable public ERC721("RegalToken", "RGL") {   
        owner=msg.sender;
    }
    

    function createCollectible(string memory _tokenURI) public {
        uint _id = _collectibleIds.length + 1;
        History memory current;
        current.owner = msg.sender;
        current.price = 0;
        
        _safeMint(msg.sender, _id);
        _setTokenURI(_id, _tokenURI);
        _regalCollectibles[_id] = RegalCollectible(payable(msg.sender), 0, _tokenURI, false, 0, 0, current);
    }
    
    function startAuction(uint id) public onlyOwner(id) returns (bool success) {
        RegalCollectible memory collectible = _regalCollectibles[id];
        
    
    }
    
    
    
    modifier onlyOwner(uint256 id) {
        RegalCollectible memory collectible = _regalCollectibles[id];   
        if (msg.sender != collectible.seller) revert();
         _;
     }
     
     
     
     
     
     
     
    // require(price >= 0, "Price cannot be less than 0");
    
    
    function endAuction(uint256 id) public payable onlyOwner(id) onlyNotCanceled() returns (bool success) {
        canceled = true;
        
        if(auctionstarted==true)  //mint token if auctionstarted
        {
        ArtItem memory artItem = _artItems[id];   
        bidding storage bid = bid[id]; 
        _tokenIds++; 
        
       
        // the auction's owner should be allowed to withdraw the highestBindingBid
        
        if (bid.highestBindingBid == 0) revert();
        fundsByBidder[id][bid.highestBidder] -= bid.highestBindingBid;
        // send the funds
        if (!msg.sender.send(bid.highestBindingBid)) revert();
            } 
            
        LogCanceled();
        return true;
    }

    function withdraw(uint256 id) public payable onlyNotOwner(id) returns (bool success) {   
        require(canceled==true);
        require(auctionstarted==true);
        address payable withdrawalAccount;
        uint withdrawalAmount;
        bidding storage bid = bid[id]; 
    
        if (msg.sender == bid.highestBidder) {
            // the highest bidder should only be allowed to withdraw the difference between their
            // highest bid and the highestBindingBid
            withdrawalAccount = bid.highestBidder;
            withdrawalAmount = fundsByBidder[id][bid.highestBidder];
        }
        else {
            // anyone who participated but did not win the auction should be allowed to withdraw
            // the full amount of their funds
            withdrawalAccount = msg.sender;
            withdrawalAmount = fundsByBidder[id][withdrawalAccount];
        }

    if (withdrawalAmount == 0) revert();
    fundsByBidder[id][withdrawalAccount] -= withdrawalAmount;

    // send the funds
    if (!msg.sender.send(withdrawalAmount)) revert();
    LogWithdrawal(msg.sender, withdrawalAccount, withdrawalAmount);

    return true;
}
  
   //modifiers
    modifier onlyNotOwner(uint256 id) {  //Check if owner is calling
    
        ArtItem memory artItem = _artItems[id];   
        if (msg.sender == artItem.seller) revert();
        _;
        
    }
  
  modifier artItemExist(uint256 id) {   //check if item exists
        require(_artItems[id].exists, "Not Found");
        _;
    }
    


    modifier onlyNotCanceled{        //Auction only if is not cancelled
    if (canceled) revert();
    _;
     }
     

     
     
    modifier onlyAdmin()
     {
        if (msg.sender != owner) revert();
         _;
     } 
     
    modifier minbid(uint256 id)
    {
        ArtItem memory artItem = _artItems[id];
        if(msg.value<artItem.minbid) revert();
        _;
    }



  function getArtItem(uint256 id)   //get art item info
        public
        view
        artItemExist(id)
        returns (
            uint256,
            uint256,
            string memory,
            uint256
        )
    {
        ArtItem memory artItem = _artItems[id];
        bidding memory bid = bid[id]; 
        return (id, artItem.minbid, artItem.tokenURI, bid.highestBindingBid);
    }
    
    //auction functions : 
    
    //Cancel auction

   
   
    function cancelOverride(uint256 id) public payable
    onlyAdmin()
    onlyNotCanceled()
    returns (bool success)
   {
    canceled = true;
    
    if(auctionstarted==true)  //mint token if auctionstarted
    {
    ArtItem memory artItem = _artItems[id];   
    bidding storage bid = bid[id]; 
    _tokenIds++; 
    _safeMint(msg.sender, _tokenIds);
    _setTokenURI(_tokenIds, artItem.tokenURI);
     // the auction's owner should be allowed to withdraw the highestBindingBid
    
    if (bid.highestBindingBid == 0) revert();
    fundsByBidder[id][bid.highestBidder] -= bid.highestBindingBid;
    // send the funds
    if (!msg.sender.send(bid.highestBindingBid)) revert();
        } 
    
    LogCanceled();
    return true;
   }
   
   function placeBid(uint256 id) public
    payable
    onlyNotCanceled
    onlyNotOwner(id)
    minbid(id)
    
    returns (bool success)
{
    // reject payments of 0 ETH
    if (msg.value == 0) revert();
    
    // calculate the user's total bid based on the current amount they've sent to the contract
    // plus whatever has been sent with this transaction
    bidding storage bid = bid[id]; 
    auctionstarted = true;
    ArtItem memory artItem = _artItems[id];  

    uint newBid = fundsByBidder[id][msg.sender] + msg.value;
    

    // if the user isn't even willing to overbid the highest binding bid, there's nothing for us
    // to do except revert the transaction.
    if (newBid <= bid.highestBindingBid) revert();

    // grab the previous highest bid (before updating fundsByBidder, in case msg.sender is the
    // highestBidder and is just increasing their maximum bid).
    uint highestBid = fundsByBidder[id][bid.highestBidder];

    fundsByBidder[id][msg.sender] = newBid;

    if (newBid <= highestBid) {
        // if the user has overbid the highestBindingBid but not the highestBid, we simply
        // increase the highestBindingBid and leave highestBidder alone.

        // note that this case is impossible if msg.sender == highestBidder because you can never
        // bid less ETH than you already have.
        if(newBid+artItem.bidIncrement> highestBid)
        {
            bid.highestBindingBid = highestBid;
        }
        else
        {
            bid.highestBindingBid = newBid+artItem.bidIncrement;
        }
    } else {
        // if msg.sender is already the highest bidder, they must simply be wanting to raise
        // their maximum bid, in which case we shouldn't increase the highestBindingBid.

        // if the user is NOT highestBidder, and has overbid highestBid completely, we set them
        // as the new highestBidder and recalculate highestBindingBid.

        if (msg.sender != bid.highestBidder) {
            bid.highestBidder = msg.sender;
        if(newBid+artItem.bidIncrement> highestBid)
        {   if(firsttime==false)
            bid.highestBindingBid = highestBid;
            else
            {bid.highestBindingBid = artItem.minbid + artItem.bidIncrement;
            firsttime=true;
            }
        }
        else
        {
            bid.highestBindingBid = newBid+artItem.bidIncrement;
        }
        }
        highestBid = newBid;
    }

    LogBid(msg.sender, newBid, bid.highestBidder, highestBid, bid.highestBindingBid);
    return true;
    }
    

        
}