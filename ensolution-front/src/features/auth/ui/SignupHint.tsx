import { Button } from "@shared/ui";

interface SignupHintProps {
  onClick?: () => void;
}

export const SignupHint = ({ onClick }: SignupHintProps) => (
  <p className="text-xs text-neutral-600 text-center">
    계정이 없으신가요?{" "}
    
    <Button
      label="회원가입"
      onClick={onClick}
      variant="ghost"
      size="sm"
    />
  </p>
);