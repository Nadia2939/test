# Safuu REVIVE

This is the repository for the Safuu REVIVE Landing Page

---

## Table of Contents

- [General Links](#general-links)
- [Technologies Used](#technologies-used)
- [Version Control](#version-control)
- [Opinions and Stances](#opinions-and-stances)
- [Development](#development)

## Technologies Used

---

### Coding

- [TypeScript](https://www.typescriptlang.org/docs/)

### DevOps

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.com/)
- [Husky](https://typicode.github.io/husky/#/)

### Linting

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Frameworks

- [React](https://reactjs.org/)
- [NextJs](https://nextjs.org/)

### UI

- [Tailwind](https://angular.io/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/)
- [React DaisyUI](https://react.daisyui.com/)
- [MUI](https://mui.com/)

### Web3 Related

- [WAGMI](https://wagmi.sh/)
- [Ethers](https://docs.ethers.io/)
- [BigNumber (Ethers)](https://docs.ethers.io/v5/api/utils/bignumber/)
- [Decimal.js](https://github.com/MikeMcl/decimal.js)

### Solidity

- [TypeChain](https://github.com/dethcrypto/TypeChain)
- [Hardhat](https://hardhat.org/)

### IDE

- [VS Code](https://code.visualstudio.com/)

### Code Quality Tools

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Version Control

---

[Git](https://git-scm.com/) is used for version control. Feature/bug/hotfix branches are created from the `development` branch. The `main` branch is protected and requires a pull request from only `development` to merge into it. The `main` branch is deployed to production unless a staging environment is setup.

## Opinions and Stances

---

- The `package-lock.json` file will be committed to VCS, [here's a few answers why](https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5?rq=1)
- We should set up `npm shrink wrap` - [read more here](https://docs.npmjs.com/cli/v7/commands/npm-shrinkwrap)

### Assumptions

- You have [NodeJs](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed
- You have enabled `Format On Save` in VSCode for `Prettier`.

### IDE Configuration

Ensure that you have the following extensions installed:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### **Setup Prettier to format on save**

1. Open VSCode settings
2. Search for "Format On Save"
3. Enable "Format On Save"

### Deployment
