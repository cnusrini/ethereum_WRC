pragma solidity ^0.5.0;
import wastageCalculator from "./waterwastageCalculation.sol";

contract WRC {
  address payable owner;
  //Various category of product in the food and agriculture industry
  enum category {vegetables, meat, dairyproducts, fatsandoil}
  //Various stages of waste water treatment
  enum treatmentlevel{Preliminary ,Primary,Secondary,Tertiary,Disinfection}

  struct orgName{

    address payable orgAddress;
    //Type of the business as defined in the enum Category
    //This is needed as this dictates the water usages
    string businessType;
    //Size of the busines dictates the quantity of water needed to operate the business.
    //This gives WRC to incentivice/penalize depending upon the loowoable threshold
    string businessSize;
    allowlableLimit _allowlableLimit;
    observations _observations;
  }
  mapping(address => orgName) orgNames;
  //expected allowable threashold
  struct allowlableLimit{
    uint maxAllowableWaterUsage;
    //Based on the industry standard, whats the minimum % of waste water which can be recycled
    uint minRecycleable;


  }

  //Actual observations read from IoT devices
  struct observations{
    uint deciveID;
    uint waterUsed;
    uint waterSupplyed;
    uint wasteWater; // =waterSupplyed - waterUsed
    uint percentageRecycled; // = % of wasteWater
  }


  struct calculations{
    uint incentive;
    uint penality;
  }
  event logPerOrgUsage(address indexed orgNameEvent, string businessTypeEvnt, string businessSizeEvnt,uint maxAllowableWaterUsageEvnt,uint recycleableEvnt,uint moreThanRecycleableEvnt);
  event logRegOrg(address indexed orgNameEvent1, string businessTypeEvnt1, string businessSizeEvnt1,uint maxAllowableWaterUsageEvnt1,uint recycleableEvnt1,uint moreThanRecycleableEvnt1);
  event recycledEvent(address indexed orgNameEvent2, uint recycledEvent );
  constructor() public {
    owner = msg.sender;
  }

  //New organization will register to this program
  function registerNewOrg(
    string memory _businessType,
    string memory _businessSize,
    uint _maxAllowableWaterUsage,
    uint _recycleable,
    uint _moreThanRecycleable
  )
    public {

      orgName storage _orgName = orgNames[msg.sender];

      _orgName.orgAddress = msg.sender;
      _orgName.businessType = _businessType;
      _orgName.businessSize = _businessSize;
      _orgName._allowlableLimit.maxAllowableWaterUsage = _maxAllowableWaterUsage;
      _orgName._allowlableLimit.recycleable = _recycleable;
      _orgName._allowlableLimit.moreThanRecycleable = _moreThanRecycleable;

      emit logRegOrg(_orgName.orgAddress,_orgName.businessType,_orgName.businessSize,_orgName._allowlableLimit.maxAllowableWaterUsage,_orgName._allowlableLimit.recycleable,_orgName._allowlableLimit.moreThanRecycleable);

    }

  function percentageRecycled() public {
    uint _supplied =0;
    uint _used =0;
    uint _waste =0;

    orgName storage _orgName = orgNames[msg.sender];
    _supplied = _orgName._observations.waterSupplyed;
    _used = _orgName._observations.waterUsed;
    _waste = wastageCalculator.wasteWater(_supplied,_used);

    recycledEvent(msg.sener,_waste);
  }
  function getPerOrgUsage(address _orgAddress) public returns(

    address RetorgAddress,
    string memory RetbusinessType,
    string memory RetbusinessSize,
    uint RetmaxAllowableWaterUsage,
    uint Retrecycleable,
    uint RetmoreThanRecycleable
){


    orgName storage _orgName = orgNames[_orgAddress];

    RetorgAddress = _orgName.orgAddress;
    RetbusinessType = _orgName.businessType;
    RetbusinessSize = _orgName.businessSize;
    RetmaxAllowableWaterUsage = _orgName._allowlableLimit.maxAllowableWaterUsage;
    Retrecycleable = _orgName._allowlableLimit.recycleable;
    RetmoreThanRecycleable = _orgName._allowlableLimit.moreThanRecycleable;

    emit logPerOrgUsage(RetorgAddress, RetbusinessType, RetbusinessSize, RetmaxAllowableWaterUsage,Retrecycleable,RetmoreThanRecycleable);
    //return (RetorgAddress, RetbusinessType, RetbusinessSize, RetmaxAllowableWaterUsage,Retrecycleable,RetmoreThanRecycleable);
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
