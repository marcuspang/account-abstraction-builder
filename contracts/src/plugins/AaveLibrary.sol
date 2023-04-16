// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILendingPool {
    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;
}

interface IWETH9 {
    function deposit() external payable;
}

library AaveLibrary {
    address constant WETH9_ADDRESS = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;

    function execute(
        address lendingPool,
        address wallet,
        uint256 value
    ) internal {
        if (value > 0) {
            IWETH9(WETH9_ADDRESS).deposit{value: value}(); // wraps ether
            ILendingPool(lendingPool).deposit(
                WETH9_ADDRESS,
                value / 10**9,
                wallet,
                0
            );
        }
    }
}
