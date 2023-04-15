const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const owner = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner[0].address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    console.log('Number of singers:', owner.length);

    for (let i=0; i< owner.length; i++) {
      const address = await owner[i].getAddress();
      console.log('Owner',i, address);
    }
  });
});