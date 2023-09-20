const TestContracts = artifacts.require("contract")

contract("TestContracts", () => {

    before(async () => {
        this.testContracts = await TestContracts.deployed()
    })

    it("Migrate deployed succesfully", async () => {
        const address = this.testContracts.address

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })
})