import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface SearchFilter {
  value?: string;
  onChange?: (value: string) => void;
}

const SearchFilter = (props: SearchFilter) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };
  return (
    <Form className="mx-auto" inline>
      <FormControl
        type="text"
        placeholder="Filter..."
        className="mx-auto"
        value={props.value}
        onChange={handleChange}
      />
    </Form>
  );
};

export { SearchFilter };
