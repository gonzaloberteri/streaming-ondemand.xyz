# [https://streaming-ondemand.xyz](https://streaming-ondemand.xyz)


<div align="center">
  <img src="logo.png">
  <p>
    Streaming-ondemand.xyz is a video streaming platform built with NodeJS
  </p>
</div>

## AWS Architecture
![AWS Architecture](architecture.svg)

## Deployment Requirements

While the project can be used locally to some extent, deployed version is recommended. You will need:
- MongoDB hosting ([mongodb.com offers a free tier up to 512mb](https://www.mongodb.com/cloud/atlas/register))
- Cloud provider ([Amazon offers a free tier for 12 months](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc))
  - NodeJS hosting
  - File hosting
- Domain name
- SSL Certificate
- [Dashy](https://gitlab.com/gonzaloberteri/dashy) or similar

## Setup

```bash
npm i
npm run dev
```
## Tests

```bash
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)