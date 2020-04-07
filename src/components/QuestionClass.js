class Question {
	constructor(
		challengeId,
		category,
		question,
		answer,
		option1,
		option2,
		option3,
		option4
	) {
		this.challengeId = challengeId;
		this.category = category;
		this.question = question;
		this.answer = answer;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
	}
}

export default Question;
