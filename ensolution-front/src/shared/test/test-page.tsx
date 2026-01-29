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
        label="sm edit"
        variant="edit"
        size="sm"
        type="button"
      ></Button>
      <Button
        label="sm delete"
        variant="delete"
        size="sm"
        type="button"
      ></Button>
      <Button
        label="sm cancel"
        variant="cancel"
        size="sm"
        type="button"
      ></Button>
    </div>
  )
}