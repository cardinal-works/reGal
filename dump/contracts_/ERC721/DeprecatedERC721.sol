// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "./ERC721.sol";


/**
 * @title ERC-721 methods shipped in OpenZeppelin v1.7.0, removed in the latest version of the standard
 * @dev Only use this interface for compatibility with previously deployed contracts
 * @dev Use ERC721 for interacting with new contracts which are standard-compliant
 */
abstract contract DeprecatedERC721 is ERC721 {
  function takeOwnership(uint256 _tokenId) virtual public;
  function transfer(address _to, uint256 _tokenId) virtual public;
  function tokensOf(address _owner) virtual public view returns (uint256[] memory);
}
