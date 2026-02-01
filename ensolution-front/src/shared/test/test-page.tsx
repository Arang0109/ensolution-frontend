import { Button } from "../ui"

export const TestPage = () => {
  return (
    <div>
      <Button
        label="sm primary"
        variant="primary"
        size="sm"
        type="button"
      ></Button>
      <Button
        label="md primary"
        variant="primary"
        size="md"
        type="button"
      ></Button>
      <Button
        label="lg primary"
        variant="primary"
        size="lg"
        type="button"
      ></Button>
      <Button
        label="sm secondary"
        variant="secondary"
        size="sm"
        type="button"
      ></Button>
      <Button
        label="lg danger"
        variant="danger"
        size="lg"
        type="button"
      ></Button>
      <Button
        label="lg ghost"
        variant="ghost"
        size="lg"
        type="button"
      ></Button>
    </div>
  )
}