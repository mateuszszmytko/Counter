export interface ICounterOptions {
	counterBoxQuery: string,
	counterCircleQuery: string,
	minsQuery: string,
	secsQuery: string
}



export class Counter {
	public static defaultOptions:ICounterOptions = {
		counterBoxQuery: ".counter__text-box",
		counterCircleQuery: ".counter__circle .cicrle__fill",
		minsQuery: ".counter__text--mins span",
		secsQuery: ".counter__text--secs span"
	}

	// wtf of type is this
	private counterInterval: any;

	private counterBox: HTMLElement;
	private counterCircle: HTMLElement;

	private counterMins: HTMLElement;
	private counterSecs: HTMLElement;

	private initialTime: number;
	private remainingTime: number;

	private get RemainingSecs(): number {
		return this.remainingTime % 60;
	}

	private get RemainingMins(): number {
		return Math.min(Math.floor(this.remainingTime / 60), 99);
	}

	private get RemainingPercent(): number {
		return (this.remainingTime / this.initialTime);
	}

	constructor(public counterElement: HTMLElement, counterOptions:ICounterOptions = Counter.defaultOptions) {
		this.counterBox = <HTMLElement> counterElement.querySelector(counterOptions.counterBoxQuery);
		this.counterCircle =  <HTMLElement> counterElement.querySelector(counterOptions.counterCircleQuery);

		this.counterMins =  <HTMLElement> counterElement.querySelector(counterOptions.minsQuery);
		this.counterSecs =  <HTMLElement> counterElement.querySelector(counterOptions.secsQuery);

		if(this.counterBox === null || this.counterCircle === null ||
			this.counterMins === null || this.counterSecs === null) {
			throw new Error("Argument null exception.");
		}

		this.Init();
	}

	private Init() {

		this.serializeTime();
		this.counterMins.innerHTML = this.RemainingMins.toString();
		this.counterSecs.innerHTML = this.RemainingSecs.toString();

		this.counterCircle.style.strokeDashoffset = (410).toString();

		this.counterInterval = setInterval(() => {
			this.Update();
		}, 1000);
	}

	private serializeTime():void {
		let timeAttr:string = this.counterElement.getAttribute("data-time"),
			timeAttrArray: string[] = timeAttr.split(":");

		this.remainingTime = this.initialTime = Number.parseInt(timeAttrArray[0]) * 60 + (timeAttr[1]? Number.parseInt(timeAttrArray[1]): 0);

		if(isNaN(this.remainingTime)) {
			throw new Error("Argument exception.");
		}
	}

	public Update():void {
		if(this.remainingTime == 0) {
			this.counterBox.style.display = "none";
			clearInterval(this.counterInterval);

			return;
		}

		this.remainingTime--;

		this.counterMins.innerHTML = this.RemainingMins.toString();
		this.counterSecs.innerHTML = this.RemainingSecs.toString();

		this.counterCircle.style.strokeDashoffset = 410 * (+this.RemainingPercent.toFixed(2))+"";
	}
}
