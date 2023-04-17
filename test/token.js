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

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
  
});