// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;


/**
 * @title ERC721 Non-Fungible Token Standard basic interface
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract ERC721Basic {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

  function balanceOf(address _owner)  virtual public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId)  virtual public view returns (address _owner);
  function exists(uint256 _tokenId)  virtual public view returns (bool _exists);

  function approve(address _to, uint256 _tokenId)  virtual public;
  function getApproved(uint256 _tokenId)  virtual public view returns (address _operator);

  function setApprovalForAll(address _operator, bool _approved)  virtual public;
  function isApprovedForAll(address _owner, address _operator)  virtual public view returns (bool);

  function transferFrom(address _from, address _to, uint256 _tokenId)  virtual public;
  function safeTransferFrom(address _from, address _to, uint256 _tokenId)  virtual public;
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes memory _data
  )
    virtual
    public;
}
