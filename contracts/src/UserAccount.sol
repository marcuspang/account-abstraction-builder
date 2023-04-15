// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BaawAccount.sol";

import "./plugins/PushLibrary.sol";

contract UserAccount is BaawAccount {
    address constant pushCommContract = address(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa);
address constant channelId = address(0x0);

    constructor(IEntryPoint entrypoint, address eoa_owner) BaawAccount(entrypoint) {
      owner = eoa_owner;
    }

    function onExecute(
        address dest,
        uint256 value,
        bytes calldata func
    ) internal override {
      PushLibrary.execute(
pushCommContract,
channelId,
address(this),
dest,
value,
func
);
    }
}
