const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BankAccount", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  // Contracts are deployed using the first signer/account by default
  async function deployBankAccount() {
    const [addr0, addr1, addr2, addr3] = await ethers.getSigners();

    const BankAccount = await ethers.getContractFactory("BankAccount");
    const bankAccount = await BankAccount.deploy();

    return { bankAccount, addr0, addr1, addr2, addr3 };
  }

  describe("Deployment", function () {
    it("Should deploy without error", async () => {
      await loadFixture(deployBankAccount);
    });
  });

  describe("Creating an Account", () => {
    it("Should  allpw creating a single user account", async () => {
      const { bankAccount, addr0 } = await loadFixture(deployBankAccount);

      await bankAccount.connect(addr0).createAccount([]);

      const accounts = bankAccount.connect(addr0).getAccounts();

      expect(accounts.length).to.equal(1);
    });
  });
});
