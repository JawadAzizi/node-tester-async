export class Request {
	responses = 0;

	totalTime = 0;
	totalRequestTime = 0;

	constructor({ url, concurency, requests, method, token, cookie }) {
		this.url = url;
		this.concurency = concurency;
		this.requests = requests;
		this.method = method;
		this.token = token;
		this.cookie = cookie;
	}

	async run() {
		const start = new Date().getTime();

		console.log("Requesting....");

		let promises = [];
		for (let i = 0; i < Math.min(this.concurency, this.requests); i++) {
			promises.push(this.makeRequest());
		}
		await Promise.all(promises);
		this.totalTime = new Date().getTime() - start;
	}
	async makeRequest() {
		this.responses++;
        const responsesNumber = this.responses;
		const startTime = new Date().getTime();
		try {
			const res = await fetch(this.url, {
				method: this.method ?? "GET",
				headers: {
                    'accept': '*/*',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					Authorization: `Bearer ${this.token}`,
					cookie: this.cookie,
				},
                
			});
			// console.log(await res.text());
			console.log(responsesNumber, "rediret:",res.redirected,
				res.statusText,
				res.status,
				" in: ",
				new Date().getTime() - startTime,
				"ms"
			);
		} catch (error) {
			console.log(responsesNumber,
				"After: ",
				new Date().getTime() - startTime,
				"ms",
				"Error: ",
				error.message
			);
		}
		this.totalRequestTime += new Date().getTime() - startTime;

		if (this.responses < this.requests) {
			await this.makeRequest();
		}
	}
	report() {
		console.log("Reports..................................................");
		console.log("Total Requests: ", this.responses);
		console.log("Concurent Requests: ", this.concurency);
		console.log("Total Times: ", this.totalTime / 1000, "sec");
		console.log("Total Request Times: ", this.totalRequestTime / 1000, "sec");
		console.log(
			"Average Time per request: ",
			this.totalTime / this.responses,
			"ms"
		);
		console.log(
			"Average Time per each request : ",
			this.totalRequestTime / this.responses,
			"ms"
		);
	}
}
