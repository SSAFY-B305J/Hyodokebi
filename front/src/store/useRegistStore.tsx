import { create } from "zustand";
import { getDuplicateCheckId } from "../apis/api/member";

interface RegistState {
  id: string;
  idError: TextFieldError;
  setId: (newId: string) => void;
  checkId: (id: string) => Promise<boolean>;
}

class TextFieldError extends Error {
  constructor(message: string, name: string = "error") {
    super();
    this.name = name;
    this.message = message;
  }
}

const useRegistStore = create<RegistState>((set, get) => ({
  id: "",
  idError: new Error(),
  setId: (newId) => set(() => ({ id: newId })),

  // 아이디 유효성 검사
  checkId: async () => {
    const value = get().id;
    const error = new TextFieldError("");

    // 입력값이 없을 경우
    if (!value) {
      error.message = "아이디를 입력해주세요.";
      set(() => ({ idError: error }));
      return false;
    }

    // 조건에 맞지 않은 경우
    // 공백 없이 영어, 숫자만 입력, 4글자 이상, 13글자 이하
    const idRegex = /^[a-z\d]{4,13}$/;
    if (!idRegex.test(value)) {
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
}));

export default useRegistStore;
