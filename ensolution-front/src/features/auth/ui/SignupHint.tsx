interface SignupHintProps {
  onClick?: () => void;
}

export const SignupHint = ({ onClick }: SignupHintProps) => (
  <p className="text-xs text-brown-600 text-center">
    계정이 없으신가요?{" "}
    <button
      type="button"
      onClick={onClick}
      className="text-terracotta-600 hover:text-terracotta-700 font-semibold"
    >
      회원가입
    </button>
  </p>
);
