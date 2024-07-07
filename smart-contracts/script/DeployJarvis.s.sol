// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import {Jarvis} from "../src/Jarvis.sol";

/
//export PRIVATE_KEY=<your-private-key>
// forge script script/DeployJarvis.s.sol --broadcast --rpc-url zzz
// address: 0x34B0d829B07Aa89dc31d2B48edb12C914b5da967
contract DeployJarvis is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Jarvis jarvis = new Jarvis(0.01 ether);
        
        // Optionally transfer ownership if needed
        // jarvis.transferOwnership(<new_owner_address>);

        vm.stopBroadcast();

    }
}
