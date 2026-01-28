interface SignupHintProps {
  onClick?: () => void;
}

export const SignupHint = ({ onClick }: SignupHintProps) => (
  <p className="text-xs text-neutral-600 text-center">
    계정이 없으신가요?{" "}
    <button
      type="button"
      onClick={onClick}
      className="text-primary-600 hover:text-primary-700 font-semibold"
    >
      회원가입
    </button>
  </p>
);
