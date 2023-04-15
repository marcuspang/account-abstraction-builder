// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "account-abstraction/interfaces/IEntryPoint.sol";
import "./BaawBaseAccount.sol";

abstract contract BaawAccount is BaawBaseAccount {
    constructor(IEntryPoint entrypoint) BaawBaseAccount(entrypoint) {}

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) public override {
        super.execute(dest, value, func);
        onExecute(dest, value, func);
    }

    function onExecute(
        address dest,
        uint256 value,
        bytes calldata func
    ) internal virtual;
}
