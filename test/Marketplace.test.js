const Marketplace = artifacts.require("./Marketplace.sol");

require('chai')
    .use(require('chai-as-promised'))
    .should()


// why is the address like this 

contract('Marketplace' , ([deployer,seller,buyer])=> {
    let marketplace

    before(async ()=> {
        marketplace = await Marketplace.deployed()
    })

    
    describe('deployment', async () => {
        it('deploys successfully' , async ()=> {
            const address = await marketplace.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        it('has a name', async () =>{
            const name = await marketplace.name()
            assert.equal(name,'Dapp University Marketplace')
        })
    })

    describe('products', async () => {
        let result, productCount

        before(async ()=> {
            
            result = await marketplace.createProduct("macbook", web3.utils.toWei('1','Ether'))
            productCount = await marketplace.productCount()
            
        })
        it('creates products', async () =>{
            assert.equal(productCount,1)
            const event1 = result.logs[0].args
            console.log(result.logs[0])
            assert.equal(event1.id.toNumber(),productCount.toNumber(),'id is correct');
            assert.equal(event1.name,'macbook','name is correct');
            assert.equal(event1.price,'1000000000000000000','price is correct');
            assert.equal(event1.owner,result.logs[0].args.owner , 'owner is correct');
            assert.equal(event1.purchased,false,'event is correct');

            // FAILURE

            await marketplace.createProduct('hey',0).should.be.rejected;



        })
    })


})
