git clone https://github.com/JawadAzizi/node-tester-async.git

cd node-tester-async

npm i

# set the options
const request = new Request({
	url: "https://www.binance.com/en",
	concurency: 200,
	requests: 200,
	method: "GET",
	token: "your token",
	cookie:"Your cookies",
});



npm run start

and that is it you would see the logs after some times to describe the performance.