const hre = require("hardhat");

async function main() {
  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();

  await accessControl.waitForDeployment();

  console.log("AccessControl deployed to:", await accessControl.getAddress());

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  
  const hasAdminRole = await accessControl.hasRole(await accessControl.DEFAULT_ADMIN_ROLE(), deployer.address);
  console.log("Deployer has admin role:", hasAdminRole);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });