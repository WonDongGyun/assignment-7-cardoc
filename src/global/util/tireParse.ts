interface parseValue {
	vehicle: string;
	width: number;
	ratio: number;
	construction: string;
	wheelSize: number;
}

export function tireParse(tireInfo: string) {
	const parse: parseValue = {
		vehicle: "",
		width: 0,
		ratio: 0,
		construction: "",
		wheelSize: 0
	};

	if (tireInfo === "") {
		return parse;
	}

	const [left, right] = tireInfo
		.split("/")
		.map((element) => element.match(/[\d\.]+|\D+/gi));
	if (left.length > 1) {
		parse.vehicle = left[0];
		parse.width = parseInt(left[1]);
	} else {
		parse.vehicle = "";
		parse.width = parseInt(left[0]);
	}

	parse.ratio = parseInt(right[0]);
	parse.construction = right[1];
	parse.wheelSize = parseInt(right[2]);

	return parse;
}
