import { create } from "zustand";
import {
  getDuplicateCheckEmail,
  getDuplicateCheckId,
  getDuplicateCheckNickname,
} from "../apis/api/member";

class TextFieldError extends Error {
  constructor(message: string, name: string = "error") {
    super();
    this.name = name;
    this.message = message;
  }
}

interface RegistState {
  id: string;
  idError: TextFieldError;
  setId: (by: string) => void;

  password: string;
  passwordError: TextFieldError;
  setPassword: (by: string) => void;

  passwordConfirm: string;
  passwordConfirmError: TextFieldError;
  setPasswordConfirm: (by: string) => void;

  email: string;
  emailError: TextFieldError;
  setEmail: (by: string) => void;

  nickname: string;
  nicknameError: TextFieldError;
  setNickname: (by: string) => void;

  checkId: () => Promise<boolean>;
  checkPassword: () => boolean;
  checkPasswordConfirm: () => boolean;
  checkEmail: () => Promise<boolean>;
  checkNickname: () => Promise<boolean>;

  getRegistValid: () => Promise<boolean>;
}

const useRegistStore = create<RegistState>((set, get) => ({
  id: "",
  idError: new Error(),
  setId: (by) => set(() => ({ id: by })),

  password: "",
  passwordError: new Error(),
  setPassword: (by) => set(() => ({ password: by })),

  passwordConfirm: "",
  passwordConfirmError: new Error(),
  setPasswordConfirm: (by) => set(() => ({ passwordConfirm: by })),

  email: "",
  emailError: new Error(),
  setEmail: (by) => set(() => ({ email: by })),

  nickname: "",
  nicknameError: new Error(),
  setNickname: (by) => set(() => ({ nickname: by })),

  // 아이디 유효성 검사
  checkId: async () => {
    const id = get().id;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!id) {
      error.message = "아이디를 입력해주세요.";
      set(() => ({ idError: error }));
      return false;
    }

    // 조건에 맞지 않은 경우
    // 공백 없이 영어, 숫자만 입력, 4글자 이상, 13글자 이하
    const idRegex = /^[a-z\d]{4,13}$/;
    if (!idRegex.test(id)) {
      error.message = "아이디는 4 ~ 13자의 영소문자, 숫자만 입력 가능합니다.";
      set(() => ({ idError: error }));
      return false;
    }

    // 중복된 아이디인 경우
    // const isDuplicate = await getDuplicateCheckId(id);
    const isDuplicate = false; // WARNING: API 완성되면 위의 코드로 교체해주세요.
    if (isDuplicate) {
      error.message = "이미 사용 중인 아이디입니다.";
      set(() => ({ idError: error }));
      return false;
    }

    // 모든 검사 통과!
    error.name = "valid";
    error.message = "사용 가능한 아이디입니다.";
    set(() => ({ idError: error }));
    return true;
  },

  // 비밀번호 유효성 검사
  checkPassword: () => {
    const password = get().password;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!password) {
      error.message = "비밀번호를 입력해주세요.";
      set(() => ({ passwordError: error }));
      return false;
    }

    // 조건에 맞지 않는 경우
    // 공백 없이 영어, 숫자, 특수문자만 입력, 6글자 이상, 16글자 이하
    const pwRegex = /^[a-zA-Z0-9!@*&-_]{6,16}$/;
    if (!pwRegex.test(password)) {
      error.message =
        "비밀번호는 6 ~ 16자의 영문, 숫자, 특수문자(!@*&-_)만 입력 가능합니다.";
      set(() => ({ passwordError: error }));
      return false;
    }

    // 비밀번호 확인을 입력한 적이 있다면 비밀번호 확인도 같이 검사한다.
    if (get().passwordConfirm) get().checkPasswordConfirm();

    // 모든 검사 통과!
    error.name = "valid";
    error.message = "사용 가능한 비밀번호입니다.";
    set(() => ({ passwordError: error }));
    return true;
  },

  // 비밀번호 확인 유효성 검사
  checkPasswordConfirm: () => {
    const passwordConfirm = get().passwordConfirm;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!passwordConfirm) {
      error.message = "비밀번호를 다시 한 번 입력해주세요.";
      set(() => ({ passwordConfirmError: error }));
      return false;
    }

    // 비밀번호가 다른 경우
    if (passwordConfirm !== get().password) {
      error.message = "비밀번호가 일치하지 않습니다.";
      set(() => ({ passwordConfirmError: error }));
      return false;
    }

    // 모든 검사 통과!
    error.name = "valid";
    error.message = "";
    set(() => ({ passwordConfirmError: error }));
    return true;
  },

  // 이메일 유효성 검사
  checkEmail: async () => {
    const email = get().email;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!email) {
      error.message = "이메일을 입력해주세요.";
      set(() => ({ emailError: error }));
      return false;
    }

    // 이메일 형식이 아닌 경우
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+$/;
    if (!emailRegex.test(email)) {
      error.name = "error";
      error.message = "이메일 형식이 옳바르지 않습니다.";
      set(() => ({ emailError: error }));
      return false;
    }

    // 중복된 이메일인 경우
    // const isDuplicate = await getDuplicateCheckEmail(email);
    const isDuplicate = false; // WARNING: API 완성되면 위의 코드로 교체해주세요.
    if (isDuplicate) {
      error.message = "이미 사용 중인 아이디입니다.";
      set(() => ({ idError: error }));
      return false;
    }

    // 모든 검사 통과!
    error.name = "valid";
    error.message = "";
    set(() => ({ emailError: error }));
    return true;
  },

  // 닉네임 유효성 검사
  checkNickname: async () => {
    const nickname = get().nickname;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!nickname) {
      error.message = "닉네임을 입력해주세요.";
      set(() => ({ nicknameError: error }));
      return false;
    }

    // 조건에 맞지 않은 경우
    // 공백 없이 영어, 한글, 숫자만 입력, 2글자 이상, 10글자 이하
    const nickNameRegex = /^[가-힣a-zA-Z\d]{2,10}$/;
    if (!nickNameRegex.test(nickname)) {
      error.message = "닉네임은 2 ~ 10자의 한글, 영문, 숫자만 입력 가능합니다.";
      set(() => ({ nicknameError: error }));
      return false;
    }

    // 중복된 닉네임인 경우
    // const isDuplicate = await getDuplicateCheckNickname(nickname);
    const isDuplicate = false; // WARNING: API 완성되면 위의 코드로 교체해주세요.
    if (isDuplicate) {
      error.message = "이미 사용 중인 닉네임입니다.";
      set(() => ({ nicknameError: error }));
      return false;
    }

    // 모든 검사 통과!
    error.name = "valid";
    error.message = "";
    set(() => ({ nicknameError: error }));
    return true;
  },

  // 모든 폼이 유효한지 확인
  getRegistValid: async () => {
    const idCheck = await get().checkId();
    const passwordCheck = get().checkPassword();
    const passwordConfirmCheck = get().checkPasswordConfirm();
    const emailCheck = await get().checkEmail();
    const nicknameCheck = await get().checkNickname();

    return (
      idCheck &&
      passwordCheck &&
      passwordConfirmCheck &&
      emailCheck &&
      nicknameCheck
    );
  },
}));

export default useRegistStore;
