const Adoption = artifacts.require('./Adoption.sol');

contract('Adoption Contract', accounts => {
    let adoptionInstance;

    beforeEach('Setup contract for each test', async function () {
        adoptionInstance = await Adoption.deployed();
    });

    it("Contract deployment", async () => {
        assert(adoptionInstance !== undefined, 'Adoption contract should be defined');
    });

    it('adopts fine', async () => {
        const aPet = 1;
        adoptionInstance.adopt.call(aPet, {from: accounts[0]}).then((result) => {
            assert.equal(aPet, result.toNumber(), "Adoption of pet ID 1 should be recorded.");
        });
    });

    it('retrieves adopter fine', async () => {
        const aPet = 1;
        const adopter = accounts[0];

        adoptionInstance.adopt(aPet, {from: accounts[0]});

        let returnedAdopter = await adoptionInstance.adopters(aPet);

        assert.equal(adopter, returnedAdopter, "Owner of pet ID 1 should be recorded.");
    });

    it('retrieves adopters fine', async () => {
        const aPet = 1;
        const adopter = accounts[0];

        adoptionInstance.adopt(aPet, {from: accounts[0]});

        let adopters = await adoptionInstance.getAdopters.call();

        assert.equal(adopter, adopters[aPet], "Owner of pet ID 1 should be recorded.");
    });
});