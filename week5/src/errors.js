export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

//--------mission errors
//유저가 동일한 미션 도전 요청 보냄
export class DuplicateChallengeMissionError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
