export function shortenString(str, maxLength) {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength) + "...";
}

export const category = [
	"salary",
	"freelance",
	"rent",
	"groceries",
	"bills",
	"transportation",
	"loan emi",
	"medical expenses",
	"entertainment",
	"education expense",
	"others",
];
