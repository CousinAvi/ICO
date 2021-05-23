// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

contract Pausable {

    event Paused(address account);

    event Unpaused(address account);

    bool private _paused;

    constructor () public {
        _paused = true;
    }


    function paused() public view returns (bool) {
        return _paused;
    }

    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    function _pause() internal whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function _unpause() internal whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}