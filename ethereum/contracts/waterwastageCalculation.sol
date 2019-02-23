pragma solidity ^0.5.0;

library waterwastageCalculation {
  //It takes 2 inputes (supplied water and water used)
  //Calculates quantity of water wasted
  //returns water wasted
  function wasteWater(uint _waterSupplyed, uint _waterUsed) public returns(uint _wasteWater){

    require(_waterSupplyed >0 && _waterUsed >0);
    require(_waterSupplyed > _waterUsed);

    _wasteWater = _waterSupplyed - _waterUsed;
    return _wasteWater;
  }
}
