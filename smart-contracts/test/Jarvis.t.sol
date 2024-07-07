// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "../lib/forge-std/src/Test.sol";
import "../src/Jarvis.sol";

contract JarvisTest is Test {
    Jarvis jarvis;
    address owner = address(this);

    function setUp() public {
        jarvis = new Jarvis(0.01 ether);
        jarvis.transferOwnership(owner);
        deal(address(1), 1 ether);
    }

    function testMintToken() public {
        // Mint a token
        uint256 fee = 0.01 ether;
        string memory tokenName = "TokenName";
       
        vm.prank(address(1));
        jarvis.mintToken{value: fee}(tokenName);
        
        // Verify the token ID and name
        assertEq(jarvis.getTokenName(1), tokenName);
        assertEq(jarvis.ownerOf(1), address(1));
    }

    function testSetMintFee() public {
        // Set a new mint fee
        jarvis.setMintFee(0.02 ether);
        assertEq(jarvis.s_mintFee(), 0.02 ether);
    }

}
