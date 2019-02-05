pragma solidity >=0.4.21 <0.6.0;

contract WRC {
  address payable owner;
  enum category {vegetables, meat, dairyproducts, fatsandoil}
  enum treatmentlevel{Preliminary ,Primary,Secondary,Tertiary,Disinfection}

  struct orgName{

    address payable orgAddress;
    //Type of the business as defined in the enum Category
    string businessType;
    //Size of the busines dictates the quantity of water needed to operate the business.
    //This gives WRC to incentivice/penalize depending upon the loowoable threshold
    string businessSize;
  }
  mapping(address => orgName) public orgNames;
  //expected allowable threashold
  struct allowlableLimit{
    uint maxAllowableWaterUsage;
    uint recycleable;
    uint moreThanRecycleable;
  }

  //Actual observations read from IoT devices
  struct observations{
    uint WaterUsed;
  }
  event logAllOrgUsage(address indexed orgNameEvent, string businessTypeEvnt, string businessSizeEvnt);
  constructor() public {
    owner = msg.sender;
  }

  //New organization will register to this program
  function getAllOrgUsage(string memory _businessType, string memory _businessSize) public {

    orgNames[msg.sender] = orgName({orgAddress:msg.sender,businessType:_businessType, businessSize:_businessSize});
    emit logAllOrgUsage(msg.sender, _businessType, _businessSize);

  }

  function getPerOrgUsage(address _orgAddress) public view returns(address RetorgAddress, string memory RetbusinessType, string memory RetbusinessSize){
    orgName storage _orgName = orgNames[_orgAddress];

    RetorgAddress = _orgName.orgAddress;
    RetbusinessType = _orgName.businessType;
    RetbusinessSize = _orgName.businessSize;

    return(RetorgAddress, RetbusinessType, RetbusinessSize);
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
