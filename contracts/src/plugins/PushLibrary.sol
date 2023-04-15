// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

library PushLibrary {
    function execute(
        address pushCommContract,
        address channelId,
        address to,
        address dest,
        uint256 value,
        bytes calldata func
    ) public {
        IPUSHCommInterface(pushCommContract).sendNotification(
            channelId,
            to,
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        "3",
                        "+",
                        "From Smart Contract Wallet",
                        "+",
                        dest,
                        value,
                        func
                    )
                )
            )
        );
    }
}
