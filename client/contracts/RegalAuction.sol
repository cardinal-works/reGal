// SPDX-License-Identifier: MIT

pragma solidity ^0.6.3;

import "./tools/ERC721.sol";
import "./tools/SafeMath.sol";

contract RegalAuction is ERC721 {
    
    /**
    * @dev 
    */
    struct History {
        address owned;
        uint256 price;
    }
    
    
    /**
    * @dev A struct for storing the information of NFT's on the platform.
    * @param _tokenId represents a specific deed
    * @param _uri text which describes the characteristics of a given deed
    * @return whether the deed metadata was added to the repository
    */
    struct RegalCollectible {
        address payable seller; // 0x01wd...
        uint256 minbid; // 0
        string tokenURI; // "https://..."
        bool sale; // false
        uint256 startTime; // 0
        uint256 endTime; // 0 
        bool minted;
    }
    
    struct bidding {
        uint currentHighestBid;
        address payable highestBidder;
    }
    
    mapping(uint256 => RegalCollectible) public _regalCollectibles; 

    /**
    * @dev 
     */
    address public owner;  
    address [] public minters;
    
    /// * added for future use
    using SafeMath for uint256;

    //Note: Token is minted after it is sold or after auction ends
  
    //variables that are dynamic or change
    uint256 public _regalIds;  // minted
    uint256 public _collectibleIds; // not minted
    
    mapping(uint256=>mapping(address => uint256)) public fundsByBidder;
    mapping(uint256=>bidding) public bid;  //mapping tokenid to bidding

    //Events
    event LogBid(address bidder, uint bid, address highestBidder, uint highestBid);   
    event LogWithdrawal(address withdrawer, address withdrawalAccount, uint amount);
    event LogEnded();
    

    constructor() payable public ERC721("RegalToken", "RGL") {   
        owner = msg.sender;
    }
    
    /**
    * @dev A function for minting valid collectibles and storing them in our contracts memory. 
    * @param _tokenURI represents a specific collectible's IPFS URI, carrying it's discription.
    */

    function createCollectible(string memory _tokenURI) public {
        minters.push(msg.sender);
        uint _id = minters.length;
        _safeMint(msg.sender, _id);
        _setTokenURI(_id, _tokenURI);
        _regalCollectibles[_id] = RegalCollectible(payable(msg.sender), 0, _tokenURI, false, 0, 0, true);
    }

    /**
    * @dev 
    * @param _id (uint) represents the id associated to a specific .
    * @param _minbid (uint256) represents a specific collectible's IPFS URI, carrying it's discription.
    * @param _end (uint256) represents a specific collectible's IPFS URI, carrying it's discription.       
    * @return _success (bool) is returned on a sucessful invocation.  
    */

    function startAuction(uint _id, uint256 _minbid, uint256 _end) 
        public 
        onlyOwner(_id) // validates ownership of the collectible
        returns (bool _success) {
            require(_minbid >= 0, "Price cannot be less than 0");
            RegalCollectible memory collectible = _regalCollectibles[_id];
            string memory _uri = collectible.tokenURI;
            _regalCollectibles[_id] = RegalCollectible(payable(msg.sender), _minbid, _uri, true, block.timestamp, _end, true);
            return true;
    }
    
    function placeBid(uint256 id) public payable onlyOnSale(id) onlyNotOwner(id) onlyMinBid(id) returns (bool success) {
        // reject payments of 0 ETH
        if (msg.value == 0) revert();
            
            bidding storage collectibleBid = bid[id]; 
            RegalCollectible memory collectible = _regalCollectibles[id]; 
        
        if (collectible.sale == false) revert();
            
            uint highestBid = collectibleBid.currentHighestBid;
            uint newBid = fundsByBidder[id][msg.sender] + msg.value;
        
        if (newBid <= highestBid) revert();
        
        if (msg.sender == collectibleBid.highestBidder) revert();
        
            fundsByBidder[id][msg.sender] = newBid;
            collectibleBid.currentHighestBid = newBid;
            collectibleBid.highestBidder = msg.sender;
    
            LogBid(msg.sender, newBid, collectibleBid.highestBidder, collectibleBid.currentHighestBid);
            return true;
    }

    function endAuction(uint256 _id) public payable onlyOwner(_id) onlyOnSale(_id) onlyAfter(_id) returns (bool success) {
        // the auction's owner should be allowed to withdraw the highestBindingBid
        RegalCollectible memory collectible = _regalCollectibles[_id];  
        bidding storage collectibleBid = bid[_id];
        safeTransferFrom(msg.sender, collectibleBid.highestBidder, _id);
        
        string memory _uri = collectible.tokenURI;
        _regalCollectibles[_id] = RegalCollectible(payable(collectibleBid.highestBidder), 0, _uri, false, 0, 0, true);
        
        if (!msg.sender.send(collectibleBid.currentHighestBid)) revert();
        
        LogEnded();
        return true;
    }
    
    function withdraw(uint256 id) public payable onlyNotOwner(id) onlyAfter(id) returns (bool success) {   
        RegalCollectible memory collectible = _regalCollectibles[id];  
        require(collectible.sale == false);
        
        address payable withdrawalAccount;
        uint withdrawalAmount;
        bidding storage collectibleBid = bid[id]; 
    
        if (msg.sender == collectibleBid.highestBidder) {
            withdrawalAccount = collectibleBid.highestBidder;
            withdrawalAmount = collectibleBid.currentHighestBid;
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
    
    function getCollectible(uint256 id)   //get art item info
        public
        view
        collectibleExists(id)
        returns (
        uint256,
        uint256,
        string memory,
        uint256
        )
    {
        RegalCollectible memory collectible = _regalCollectibles[id];
        bidding memory collectibleBid = bid[id]; 
        return (id, collectible.minbid, collectible.tokenURI, collectibleBid.currentHighestBid);
    }
    
    
    
    modifier onlyAfter(uint256 id) {
        RegalCollectible memory collectible = _regalCollectibles[id];
        if (collectible.endTime > now) revert();
        _;
    }

    
    modifier onlyOnSale(uint256 id) { 
        RegalCollectible memory collectible = _regalCollectibles[id];
        if (collectible.sale != true) revert();
        _;
    }
    
    modifier onlyOwner(uint256 id) {
        RegalCollectible memory collectible = _regalCollectibles[id];   
        if (msg.sender != collectible.seller) revert();
         _;
     }
     
    modifier onlyNotOwner(uint256 id) { 
        RegalCollectible memory collectible = _regalCollectibles[id];
        if (msg.sender == collectible.seller) revert();
        _;
        
    }
    
    modifier onlyMinBid(uint256 id) {
        RegalCollectible memory collectible = _regalCollectibles[id];
        if(msg.value < collectible.minbid) revert();
        _;
    } 
    
    modifier collectibleExists(uint256 id) { 
        RegalCollectible memory collectible = _regalCollectibles[id];
        require(collectible.minted == true, "Not Found");
        _;
    }

    modifier onlyAdmin() {
        if (msg.sender != owner) revert();
         _;
    } 
    
}