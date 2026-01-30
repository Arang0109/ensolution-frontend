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
        label="sm add"
        variant="add"
        size="sm"
        type="button"
      ></Button>
      <Button
        label="lg edit"
        variant="edit"
        size="lg"
        type="button"
      ></Button>
      <Button
        label="lg delete"
        variant="delete"
        size="lg"
        type="button"
      ></Button>
      <Button
        label="lg cancel"
        variant="cancel"
        size="lg"
        type="button"
      ></Button>
    </div>
  )
}