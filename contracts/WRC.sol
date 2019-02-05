pragma solidity >=0.4.21 <0.6.0;

contract WRC {
  address payable owner;
  constructor() public {
    owner = msg.sender;
  }

  /// @notice This function allows the owner only to kill this contract
  function kill() external{
    require(msg.sender == owner);
    selfdestruct(owner);
  }
    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    //7
  function() external{
      revert();
  }
}
