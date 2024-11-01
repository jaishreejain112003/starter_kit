pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product{
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );
    

    constructor() public {
        name = "Dapp University Marketplace";
    }

    function createProduct(string memory _name , uint _price) public{
        // Make sure that the function parameters are correct 
        // Create the product 
        // Increment productCount
        // Trigger an event 
        require(bytes(_name).length > 0);
        require(_price > 0);

        productCount++;
        products[productCount] = Product(productCount,_name,_price,msg.sender,false);
        emit ProductCreated(productCount,_name,_price,msg.sender,false);




    }

}