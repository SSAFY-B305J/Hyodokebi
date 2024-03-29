import { create } from "zustand";
import { getDuplicateCheckId } from "../apis/api/member";

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

  checkId: () => Promise<boolean>;
  checkPassword: () => boolean;
  checkPasswordConfirm: () => boolean;
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
    // const isDuplicate = await getDuplicateCheckId(value);
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
}));

export default useRegistStore;
