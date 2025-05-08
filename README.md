# Innabox React App

This is a quick-and-dirty UI intended for use with [innabox](https://github.com/innabox/) and the [demo-esi-api](https://github.com/CCI-MOC/demo-esi-api). It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

```
$ cp env.example .env

# edit .env and set the following:
## REACT_APP_ESI_API_URL=<demo-esi-api endpoint>
## REACT_APP_FULFILLMENT_API_URL=<fulfillment api endpoint>
## REACT_APP_FULFILLMENT_API_TOKEN=<token allowing access to the fulfillment api>

$ npm install
$ npm start
```