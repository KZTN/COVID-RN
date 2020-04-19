


<p align="center">
    <img alt="COVID-RN" title="#app" src=".github/COVID-RN_icon.png" width="250px" />
</p>
    <h1 align="center">COVID-RN</h1>

<h4 align="center">
  🔎🦠 Real-time coronavirus case tracker in Rio Grande do Norte
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/KZTN/COVID-RN.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/KZTN/COVID-RN.svg">
  
  <a href="https://github.com/KZTN/COVID-RN/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/KZTN/COVID-RN.svg">
  </a>

  <a href="https://github.com/KZTN/COVID-RN/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/KZTN/COVID-RN.svg">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>
<p align="center">
  <img alt="COVID-RN" src=".github/COVID-RN_showcase.png" width="100%">
</p>

## ⚠️ Warning
A new version of the API is in development. In version 2.0, new query features will be included, and the old routes in version 2.0 may or may not be renamed or edited. If you’re using version 1.0 and don’t intend to migrate, don’t worry. All resources will be maintained, including documentation. But stay tuned.
`/v1/` will be included at the beginning of the URL of all calls from the old API. New documentation exclusive to V2 will be created.

     The expected development time to launch is until the end of the month


## 💻 Project

COVID-RN is a project that aims to track coronavirus cases across the territory of Rio Grande do Norte, reporting unique data for both the state and each city.
## 🤔 Reason / features

Due to the lack of the state does not have an API on the incidence of coronavirus cases and little dynamics in the publication of newsletters. The project has the scope to offer:
<ul>
   <li>A free access API REST   database for research and consultation</li>
    <li>An interface that makes the generated data available to the customer</li>
    <li>Graphs and maps focusing on cases in state</li>
</ul>

## 🔖 Layout

Based on the design of the epidemiological bulletins launched by SESAP-RN, the project followed the same model as the basis for the data structure. Subsequently gaining responsiveness for different screens, ensuring accessibility to different types of users with their respective desktop desktop and mobile 📱 devices.

## Datasource 💽

- [Secretaria de Saúde Pública do Rio Grande do Norte](http://www.saude.rn.gov.br/)

## Base url 🔌

All calls must use the base url:
```
https://covid-rn-server.herokuapp.com
```
> Use [documentation](https://insomnia-documenter-covidrn-6fgddqztj.now.sh/) for more information on how to use the API correctly

## Starting...
These instructions will provide a copy of the project running on your local machine for development and testing purposes.

### Prerequisites
What you need to install the software

```
node v12.x
yarn 1.22.4
npm 6.14.4
git
```
> For a better experience in the test environment with the API REST server, it is recommended to use the[insomnia](https://insomnia.rest/).

### Installing the project🚀
Cloning the project

```
git clone https://github.com/KZTN/COVID-RN.git
```

Go to the project folder:

```
cd COVID-RN
```

Create an .env file at the root of the project and add the following lines

```bash
REACT_APP_GOOGLE_KEY= YOUR_GOOGLE_API_HERE
REACT_APP_API_URL= https://covid-rn-server.herokuapp.com
```
> To get your own google API go to https://console.cloud.google.com/

Getting project dependencies

```bash
yarn install
```

Run the project

```bash
yarn start
```


Visit http://localhost:3000 with your browser to see the result. 🎉

## Documentation 📄

[site](https://insomnia-documenter-covidrn-6fgddqztj.now.sh/)

## How to contribute

- Fork this project
- Create a branch with your feature: `git checkout -b minha-feature`;
- Commit your changes: `git commit -m 'feat: Minha nova feature'`;
- Push to your branch: `git push origin minha-feature`.

After the merge of your pull request is done, you can delete your branch.

## TODO list

- [x] Create a REST API database
- [x] Create a web application for the project
- [x] Frontend and backend integration
- [x] Create responsive interface
- [x] Create graphs with database
- [x] Make maps with database
- [x] Deploy the application
- [ ] Generate access, query, error and debug statistics
- [ ] Generate automatic service status reports
- [ ] Create a PDF extractor
- [ ] Create a PDF to csv / json converter
- [ ] and more...

## :memo: License

This project is under the MIT license. See the archive [LICENSE](LICENSE.md) for more details.

## Help the project 🤝

<a href="https://opencollective.com/covid-rn/donate" target="_blank">
  <img src="https://opencollective.com/covid-rn/donate/button@2x.png?color=blue" width=300 />
</a>



## Authors

<table align="center">
  <tr >
    <td align="center"><a href="https://github.com/KZTN"><img src="https://avatars0.githubusercontent.com/u/6463299?s=460&u=4461e9ccc7bb327fc8183a09c3da015c832924d6&v=4" width="100px;" alt=""/><br /><sub><b>Kaio César</b></sub></a><br /><a href="https://github.com/kztn/COVID-RN/commits?author=kztn" title="Code">💻</a> <a href="#kztn" title="Design">🎨</a></td>
  <tr>
</table>

## 

<p align="center">Make with ♥ by KZTN</p>
