import Select from "react-select";

export const TestPage = () => { 
  return (
    <Select
      options={[
        { value: 1, label: "서울" },
        { value: 2, label: "부산" }
      ]}
      onChange={(option) => console.log(option?.value)}
    />
  )
}