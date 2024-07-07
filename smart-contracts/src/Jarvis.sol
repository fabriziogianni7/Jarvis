// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Jarvis is ERC721, Ownable {
    uint256 public s_mintFee;
    uint256 public s_tokenIds;
    
    mapping(uint256 => string) private _tokenNames;

    event Minted(address indexed minter, uint256 indexed tokenId, string tokenName);

    constructor(uint256 _mintFee) ERC721("Jarvis", "JVS") Ownable(msg.sender){
        s_mintFee = _mintFee;
    }

    function mintToken(string memory tokenName) public payable returns (uint256) {
        require(msg.value >= s_mintFee, "Insufficient fee");

        s_tokenIds +=  1;
        uint256 newTokenId = s_tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenName(newTokenId, tokenName);

        emit Minted(msg.sender, newTokenId, tokenName);

        return newTokenId;
    }

    function _setTokenName(uint256 tokenId, string memory tokenName) internal {
        _tokenNames[tokenId] = tokenName;
    }

    function getTokenName(uint256 tokenId) public view returns (string memory) {
        return _tokenNames[tokenId];
    }

    function setMintFee(uint256 _mintFee) public onlyOwner {
        s_mintFee = _mintFee;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
