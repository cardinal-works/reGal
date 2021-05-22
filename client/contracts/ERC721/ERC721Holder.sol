// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "./ERC721Receiver.sol";


abstract contract ERC721Holder is ERC721Receiver {
  function onERC721Received(address, uint256, bytes memory) virtual override public returns(bytes4) {
    return ERC721_RECEIVED;
  }
}
