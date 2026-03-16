export const usePreventSubmitOnEnter = () => {
  return (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === "Enter" &&
      e.target instanceof HTMLInputElement &&
      e.target.type !== "submit"
    ) {
      e.preventDefault();
    }
  };
};
