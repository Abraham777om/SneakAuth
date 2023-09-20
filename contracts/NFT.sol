// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string private _baseTokenURI;
    uint256 public price;  // Price in wei for purchasing the NFT

    constructor(string memory _name, string memory _symbol, string memory baseTokenURI, uint256 _price) ERC721(_name, _symbol) {
        _baseTokenURI = baseTokenURI;
        price = _price;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function safeMint(address to) external onlyOwner {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
    }

    function purchaseNFT(uint256 tokenId) external payable {
        require(msg.value >= price, "Insufficient funds");

        address owner = ownerOf(tokenId);
        require(owner != address(0), "Invalid token");
        require(_isApprovedOrOwner(owner, tokenId), "Not approved");

        // Transfer the NFT to the buyer
        safeTransferFrom(owner, msg.sender, tokenId);

        // Transfer the funds to the seller (contract owner)
        payable(owner).transfer(msg.value);
    }
}