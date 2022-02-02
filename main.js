const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const EventEmitterArray = require("./lib/event-emitter").eventEmitterArray;
const EventEmitterMap = require("./lib/event-emitter-map").eventEmitter;

const eventsArray = new EventEmitterArray();
const eventsMap = new EventEmitterMap();

const noop = () => {};

for (let i = 0; i < 1000; i++) {
	eventsArray.listen("foo", noop);
	eventsMap.listen("foo", noop);
}

// add tests
suite
	.add("EventEmitterArray", function () {
		eventsMap.emit("foo");
	})
	.add("EventEmitterMap", function () {
		eventsArray.emit("foo");
	})

	// add listeners
	.on("cycle", function (event) {
		console.log(String(event.target));
	})
	.on("complete", function () {
		console.log("Fastest is " + this.filter("fastest").map("name"));
	})
	// run async
	.run({ async: true });
